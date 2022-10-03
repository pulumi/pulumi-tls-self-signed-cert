# coding=utf-8
# *** WARNING: this file was generated by Pulumi SDK Generator. ***
# *** Do not edit by hand unless you're certain you know what you are doing! ***

from enum import Enum

__all__ = [
    'Algorithm',
    'AllowedUses',
    'EcdsaCurve',
]


class Algorithm(str, Enum):
    RSA = "RSA"
    ECDSA = "ECDSA"
    ED25519 = "ED25519"


class AllowedUses(str, Enum):
    ANY_EXTENDED = "any_extended"
    CERT_SIGNING = "cert_signing"
    CLIENT_AUTH = "client_auth"
    CODE_SIGNING = "code_signing"
    CONTENT_COMMITMENT = "content_commitment"
    CRL_SIGNING = "crl_signing"
    DATA_ENCIPHERMENT = "data_encipherment"
    DECIPHER_ONLY = "decipher_only"
    DIGITAL_SIGNATURE = "digital_signature"
    EMAIL_PROTECTION = "email_protection"
    ENCIPHER_ONLY = "encipher_only"
    IPSEC_END_SYSTEM = "ipsec_end_system"
    IPSEC_TUNNEL = "ipsec_tunnel"
    IPSEC_USER = "ipsec_user"
    KEY_AGREEMENT = "key_agreement"
    KEY_ENCIPHERMENT = "key_encipherment"
    MICROSOFT_COMMERCIAL_CODE_SIGNING = "microsoft_commercial_code_signing"
    MICROSOFT_KERNEL_CODE_SIGNING = "microsoft_kernel_code_signing"
    MICROSOFT_SERVER_GATED_CRYPTO = "microsoft_server_gated_crypto"
    NETSCAPE_SERVER_GATED_CRYPTO = "netscape_server_gated_crypto"
    OCSP_SIGNING = "ocsp_signing"
    SERVER_AUTH = "server_auth"
    TIMESTAMPING = "timestamping"


class EcdsaCurve(str, Enum):
    P224 = "P224"
    P256 = "P256"
    P384 = "P384"
    P521 = "P521"