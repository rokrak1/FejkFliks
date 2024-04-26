import "reflect-metadata";
import { AppRouter } from "../router";
import { MetadataKeys } from "./enums/MetadataKeys";
import { Methods } from "./enums/Methods";
import jsonwebtokenAuth from "../middlewares/jsonwebtokenAuth";

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    for (let key of Object.getOwnPropertyNames(target.prototype)) {
      if (key === "constructor") {
        continue;
      }

      const routeHandler = target.prototype[key];
      //Get endpoint of api
      const path = Reflect.getMetadata(
        MetadataKeys.PATH,
        target.prototype,
        key
      );

      //Get type of API request - CRUD
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.METHOD,
        target.prototype,
        key
      );

      //Inject middlewares into api call
      const middlewares =
        Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) ||
        [];

      const schema =
        Reflect.getMetadata(MetadataKeys.SCHEMA, target.prototype, key) || [];

      // Supabase token validation
      middlewares.unshift(jsonwebtokenAuth);
      if (path) {
        router[method](
          `/api${routePrefix}${path}`,
          {
            schema: schema,
            preHandler: middlewares,
          },
          routeHandler
        );
      }
    }
  };
}
