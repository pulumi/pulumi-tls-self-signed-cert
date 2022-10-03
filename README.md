# Pulumi TLS Self Signed Certificate

This repo is a [Pulumi Package](https://www.pulumi.com/docs/guides/pulumi-packages/) used to provision a self-signed certificate.

It's written in TypeScript, but thanks to Pulumi's multi language SDK generating capability, it create usable SDKs for all of Pulumi's [supported languages](https://www.pulumi.com/docs/intro/languages/)

# Building and Installing

## Building from source

But if you need to build it yourself, run the following command to build and install the plugin in the correct folder (resolved automatically based on the current Operating System):

```sh
make install
```

## Install your chosen SDK

You need to install your desired language SDK using your languages package manager.

### Python

```
pip3 install pulumi_tls_self_signed_cert
```

### NodeJS

```
npm install @pulumi/tls-self-signed-cert
```

### Go

```
go get -t github.com/pulumi/pulumi-tls-self-signed-cert/sdk
```

# Usage

Once you've installed all the dependencies, you can use the library like any other Pulumi SDK. See the [examples](examples/) directory for examples of how you might use it.
