// Copyright 2016-2024, Pulumi Corporation.

import { readFileSync, writeFileSync } from "fs";
import * as pulumi from "@pulumi/pulumi";
import * as provider from "@pulumi/pulumi/provider";
import { generateSchema } from "./schema";

type OutputsToInputs<T> = {
    [K in keyof T]: T[K] extends pulumi.Output<infer U> ? pulumi.Input<U> : never;
};

function getInputsFromOutputs<T extends pulumi.ComponentResource>(resource: T): OutputsToInputs<T> {
    const result: any = {};
    for (const key of Object.keys(resource)) {
        const value = resource[key as keyof T];
        if (pulumi.Output.isInstance(value)) {
            result[key] = value;
        }
    }
    return result as OutputsToInputs<T>;
}

type CreateComponentFunction = (type: string, name: string, inputs: pulumi.Inputs,
    options: pulumi.ComponentResourceOptions) => pulumi.ComponentResource;

class ComponentProvider implements provider.Provider {
    constructor(readonly version: string, readonly schema: string, readonly factory: CreateComponentFunction) {}

    async construct(name: string, type: string, inputs: pulumi.Inputs,
        options: pulumi.ComponentResourceOptions): Promise<provider.ConstructResult> {
        const typeName = type.split(":", 3)[2];
        const comp = this.factory(typeName, name, inputs, options);
        return {
            urn: comp.urn,
            state: getInputsFromOutputs(comp),
        }
    }
}

export function singleComponentHost<T extends pulumi.ComponentResource, A>(cons: new (ame: string, inputs: A, options: pulumi.ComponentResourceOptions) => T) {
    componentProviderHost((type, name, inputs, options) => {
        if (type == cons.name) {
            return new cons(name, inputs as any, options);
        }
        throw new Error(`unknown resource type ${type}`);
    });
}

export function componentProviderHost(factory: CreateComponentFunction) {
    const args = process.argv.slice(2);
    const packStr = readFileSync("./package.json", {encoding: "utf-8"});
    const pack = JSON.parse(packStr);

    if (args.length === 1 && args[0] === "--gen") {
        const schema = generateSchema(pack);
        writeFileSync("./schema.json", JSON.stringify(schema, null, 4));
        return;
    }

    const schema: string = readFileSync("./schema.json", {encoding: "utf-8"});
    const prov = new ComponentProvider(pack.version, schema, factory);
    return pulumi.provider.main(prov, args);
}