import { Sequelize } from "sequelize";

/**
 * Single Sequelize connection shared across the app.
 *
 * Cached on `globalThis` because Next.js re-evaluates modules on every hot
 * reload in dev; without this each edit would open a new MySQL pool.
 */
const globalForSequelize = globalThis as unknown as {
  __flawlessSequelize?: Sequelize;
};

function createSequelize() {
  const {
    DB_HOST = "127.0.0.1",
    DB_PORT = "3306",
    DB_NAME,
    DB_USER = "root",
    DB_PASSWORD = "",
  } = process.env;

  if (!DB_NAME) {
    throw new Error("DB_NAME is not set. Copy .env.example to .env.local and fill in your MySQL details.");
  }

  return new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: "mysql",
    logging: false,
    define: {
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
    pool: { max: 5, min: 0, idle: 10_000, acquire: 30_000 },
  });
}

export const sequelize = globalForSequelize.__flawlessSequelize ?? createSequelize();

if (process.env.NODE_ENV !== "production") {
  globalForSequelize.__flawlessSequelize = sequelize;
}
