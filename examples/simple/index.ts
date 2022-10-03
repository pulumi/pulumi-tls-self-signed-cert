import * as selfSignedCert from "@pulumi/tls-self-signed-cert";

const cert = new selfSignedCert.SelfSignedCertificate("ca", {
    dnsName: "web.lbrlabs.com",
    ipAddress: "192.168.0.1",
    validityPeriodHours: 807660,
    localValidityPeriodHours: 17520,
    subject: {
        commonName: "lbrlabs",
        organization: "lbrlabs LLC"
    },
});

export const pem = cert.pem;
export const privateKey = cert.privateKey;
export const caCert = cert.caCert;
