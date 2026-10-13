import path from "node:path";
import { pathToFileURL } from "node:url";
import { SequelizeStorage, Umzug } from "umzug";
import { sequelize } from "@/lib/db/sequelize";

/**
 * Migration runner. Applied migration names are tracked in a `sequelize_meta`
 * table, so `npm run db:migrate` is safe to re-run: it only applies what's new.
 */
export const migrator = new Umzug({
  migrations: {
    glob: ["migrations/*.ts", { cwd: process.cwd() }],
    resolve: ({ name, path: filepath, context }) => {
      if (!filepath) throw new Error(`Migration ${name} has no path`);
      return {
        name,
        up: async () => {
          const mod = await import(pathToFileURL(path.resolve(filepath)).href);
          return mod.up({ context });
        },
        down: async () => {
          const mod = await import(pathToFileURL(path.resolve(filepath)).href);
          return mod.down({ context });
        },
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: "sequelize_meta" }),
  logger: console,
});
