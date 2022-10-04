# Pulumi TLS Self Signed Certificate

This repo is a [Pulumi Package](https://www.pulumi.com/docs/guides/pulumi-packages/) used to provision a self-signed certificate.

It's written in TypeScript, but thanks to Pulumi's multi language SDK generating capability, it create usable SDKs for all of Pulumi's [supported languages](https://www.pulumi.com/docs/intro/languages/)

## Usage

To use this package you will first need to install it via your language of choice's package manager. For YAML you
do not need to install, the package will be picked up automatically when you run `pulumi up`.

### TypeScript

**Install**

```
yarn add @pulumi/tls-self-signed-cert
```

**Usage**

```typescript
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
```

### Python

**Install**

```
pip3 install pulumi_tls_self_signed_cert
```

**Usage**

```python
import pulumi
import pulumi_tls_self_signed_cert as tls_self_signed_cert

cert = tls_self_signed_cert.SelfSignedCertificate("cert",
    dns_name="cert.example.com",
    validity_period_hours=807660,
    local_validity_period_hours=17520,
    subject=%!v(PANIC=Format method: interface conversion: interface {} is json.RawMessage, not python.PackageInfo))
pulumi.export("pem", cert.pem)
pulumi.export("privateKey", cert.private_key)
pulumi.export("caCert", cert.ca_cert)
```

### Go

**Install**

```
go get -t github.com/pulumi/pulumi-tls-self-signed-cert/sdk
```

**Usage**

```go
package main

import (
	selfSignedCert "github.com/pulumi/pulumi-tls-self-signed-cert/sdk/go/tls-self-signed-cert"
	"github.com/pulumi/pulumi-tls/sdk/v4/go/tls"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		cert, err := selfSignedCert.NewSelfSignedCertificate(ctx, "cert", &selfSignedCert.SelfSignedCertificateArgs{
			DnsName:                  pulumi.String("cert.example.com"),
			ValidityPeriodHours:      pulumi.Int(807660),
			LocalValidityPeriodHours: pulumi.Int(17520),
			Subject: tls.SelfSignedCertSubjectArgs{
				CommonName:   pulumi.String("example-cert"),
				Organization: pulumi.String("example-cert LLC"),
			},
		})
		if err != nil {
			return err
		}

		ctx.Export("pem", cert.Pem)
		ctx.Export("privateKey", cert.PrivateKey)
		ctx.Export("caCert", cert.CaCert)
	})
}
```

### Dotnet

**Install**

```
dotnet add package Pulumi.AwsIam
```

**Usage**

```csharp
using System.Collections.Generic;
using Pulumi;
using TlsSelfSignedCert = Pulumi.TlsSelfSignedCert;

return await Deployment.RunAsync(() =>
{
    var cert = new TlsSelfSignedCert.SelfSignedCertificate("cert", new()
    {
        DnsName = "cert.example.com",
        ValidityPeriodHours = 807660,
        LocalValidityPeriodHours = 17520,
        Subject = %!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference),
    });

    return new Dictionary<string, object?>
    {
        ["pem"] = cert.Pem,
        ["privateKey"] = cert.PrivateKey,
        ["caCert"] = cert.CaCert,
    };
});
```

### YAML

**Usage**

```yaml
name: tls-self-signed-cert
runtime: yaml
resources:
    cert:
        type: "tls-self-signed-cert:index:SelfSignedCertificate"
        properties:
            dnsName: "cert.example.com"
            validityPeriodHours: 807660
            localValidityPeriodHours: 17520
            subject:
                commonName: "example-cert"
                organization: "example-cert LLC"
outputs:
    pem: ${cert.pem}
    privateKey: ${cert.privateKey}
    caCert: ${cert.caCert}
```
