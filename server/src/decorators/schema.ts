import "reflect-metadata";
import { MetadataKeys } from "./enums/MetadataKeys";
import { FastifySchema } from "fastify";

export function schema(schema: FastifySchema) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.SCHEMA, schema, target, key);
  };
}
