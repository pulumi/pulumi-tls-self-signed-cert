// Copyright 2016-2021, Pulumi Corporation.
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
import * as provider from "@pulumi/pulumi/provider";

import { SelfSignedCertificate, SelfSignedCertificateArgs } from "./selfSignedCert";

export class Provider implements provider.Provider {
    constructor(readonly version: string, readonly schema: string) { }

    async construct(name: string, type: string, inputs: pulumi.Inputs,
        options: pulumi.ComponentResourceOptions): Promise<provider.ConstructResult> {

        switch (type) {
            case "tls-self-signed-cert:index:SelfSignedCertificate":
                return await constructSelfSignedCertificate(name, inputs, options);
            default:
                throw new Error(`unknown resource type ${type}`);
        }
    }
}

async function constructSelfSignedCertificate(name: string, inputs: pulumi.Inputs,
    options: pulumi.ComponentResourceOptions): Promise<provider.ConstructResult> {

    const selfSignedCertificate = new SelfSignedCertificate(name, inputs as SelfSignedCertificateArgs, options);
    return {
        urn: selfSignedCertificate.urn,
        state: {
            pem: selfSignedCertificate.pem,
            privateKey: selfSignedCertificate.privateKey,
            caCert: selfSignedCertificate.caCert,
        },
    }
}
