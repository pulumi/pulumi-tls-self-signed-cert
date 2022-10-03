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

