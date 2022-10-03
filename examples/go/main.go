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
