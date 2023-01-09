// Copyright 2016-2022, Pulumi Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as pulumi from "@pulumi/pulumi";
import * as tls from "@pulumi/tls";

type Algorithm = "RSA" | "ECDSA" | "ED25519";
type EcdsaCurve =  "P224" | "P256" | "P384" | "P521";
type AllowedUses = "any_extended" | "cert_signing" | "client_auth" | "code_signing" |
    "content_commitment" | "crl_signing" | "data_encipherment" | "decipher_only" |
    "digital_signature" | "email_protection" | "encipher_only" | "ipsec_end_system" |
    "ipsec_tunnel" | "ipsec_user" | "key_agreement" | "key_encipherment" | "microsoft_commercial_code_signing" |
    "microsoft_kernel_code_signing" | "microsoft_server_gated_crypto" | "netscape_server_gated_crypto" |
    "ocsp_signing" | "server_auth" | "timestamping";


export interface SelfSignedCertificateArgs {
    algorithm: pulumi.Input<Algorithm>;
    ecdsaCurve: pulumi.Input<EcdsaCurve>;
    rsaBits: pulumi.Input<number>;
    validityPeriodHours: pulumi.Input<number>;
    localValidityPeriodHours: pulumi.Input<number>;
    subject: tls.types.input.SelfSignedCertSubject;
    allowedUses: pulumi.Input<AllowedUses[]>;
    dnsName: pulumi.Input<string>;
    ipAddress: pulumi.Input<string>;
}

export class SelfSignedCertificate extends pulumi.ComponentResource {
    public readonly pem: pulumi.Output<string>;
    public readonly privateKey: pulumi.Output<string>;
    public readonly caCert: pulumi.Output<string>;

    constructor(name: string, args: SelfSignedCertificateArgs, opts?: pulumi.ComponentResourceOptions) {
        super("tls-self-signed-cert:index:SelfSignedCertificate", name, args, opts);

        const algorithm = args.algorithm || "RSA";
        const rsaBits = args.rsaBits || 2048;
        const ecdsaCurve = args.ecdsaCurve || "P224";
        const allowedUses = args.allowedUses || [ "key_encipherment",  "digital_signature" ];

        if (!args.dnsName && !args.ipAddress) {
            throw new Error("At least one of `dnsName` or `ipAddress` must be provided as an input.");
        }

        // create a CA private key
        const caKey = new tls.PrivateKey(`${name}-ca`, {
            algorithm,
            ecdsaCurve,
            rsaBits,
        }, { parent: this });

        // create a CA certificate
        const caCert = new tls.SelfSignedCert(`${name}-ca`, {
            privateKeyPem: caKey.privateKeyPem,
            isCaCertificate: true,
            validityPeriodHours: args.validityPeriodHours,
            subject: args.subject,
            allowedUses,
        }, { parent: caKey });

        // Create a certificate private key
        const key = new tls.PrivateKey(`${name}-privateKey`, {
            algorithm,
            ecdsaCurve,
            rsaBits,
        });

        const certRequest = new tls.CertRequest("certRequest", {
            privateKeyPem: key.privateKeyPem,
            dnsNames: [ args.dnsName ],
            ipAddresses: args.ipAddress ? [ args.ipAddress ] : [],
            subject: {
                ...args.subject,
                commonName: args.dnsName,
            },
        }, { parent: key });

        const cert = new tls.LocallySignedCert("cert", {
            certRequestPem: certRequest.certRequestPem,
            caPrivateKeyPem: caKey.privateKeyPem,
            caCertPem: caCert.certPem,
            validityPeriodHours: args.localValidityPeriodHours,
            allowedUses,
        }, { parent: certRequest });

        this.pem = cert.certPem;
        this.privateKey = key.privateKeyPem;
        this.caCert = cert.caCertPem;

        this.registerOutputs({
            pem: cert.certPem,
            privateKey: key.privateKeyPem,
            caCert: cert.caCertPem,
        });
    }
}
