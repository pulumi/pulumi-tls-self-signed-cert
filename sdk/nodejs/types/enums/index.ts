// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***


export const Algorithm = {
    RSA: "RSA",
    ECDSA: "ECDSA",
    ED25519: "ED25519",
} as const;

export type Algorithm = (typeof Algorithm)[keyof typeof Algorithm];

export const AllowedUses = {
    Any_extended: "any_extended",
    Cert_signing: "cert_signing",
    Client_auth: "client_auth",
    Code_signing: "code_signing",
    Content_commitment: "content_commitment",
    Crl_signing: "crl_signing",
    Data_encipherment: "data_encipherment",
    Decipher_only: "decipher_only",
    Digital_signature: "digital_signature",
    Email_protection: "email_protection",
    Encipher_only: "encipher_only",
    Ipsec_end_system: "ipsec_end_system",
    Ipsec_tunnel: "ipsec_tunnel",
    Ipsec_user: "ipsec_user",
    Key_agreement: "key_agreement",
    Key_encipherment: "key_encipherment",
    Microsoft_commercial_code_signing: "microsoft_commercial_code_signing",
    Microsoft_kernel_code_signing: "microsoft_kernel_code_signing",
    Microsoft_server_gated_crypto: "microsoft_server_gated_crypto",
    Netscape_server_gated_crypto: "netscape_server_gated_crypto",
    Ocsp_signing: "ocsp_signing",
    Server_auth: "server_auth",
    Timestamping: "timestamping",
} as const;

export type AllowedUses = (typeof AllowedUses)[keyof typeof AllowedUses];

export const EcdsaCurve = {
    P224: "P224",
    P256: "P256",
    P384: "P384",
    P521: "P521",
} as const;

export type EcdsaCurve = (typeof EcdsaCurve)[keyof typeof EcdsaCurve];
