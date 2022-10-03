import * as pulumi from "@pulumi/pulumi";
import * as tls_self_signed_cert from "@pulumi/tls-self-signed-cert";

const cert = new tls_self_signed_cert.SelfSignedCertificate("cert", {
    dnsName: "cert.example.com",
    validityPeriodHours: 807660,
    localValidityPeriodHours: 17520,
    subject: {
        commonName: "example-cert",
        organization: "example-cert LLC",
    },
});
export const pem = cert.pem;
export const privateKey = cert.privateKey;
export const caCert = cert.caCert;
