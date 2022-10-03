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
