import "dotenv/config";
import { config as loadEnv } from "dotenv";

// .env.local wins for local development, matching Next.js precedence.
loadEnv({ path: ".env.local", override: true });

async function main() {
  const { migrator } = await import("../lib/db/umzug");
  const { sequelize } = await import("../lib/db/sequelize");

  const command = process.argv[2] ?? "up";

  try {
    await sequelize.authenticate();

    if (command === "up") {
      const applied = await migrator.up();
      console.log(
        applied.length
          ? `Applied ${applied.length} migration(s): ${applied.map((m) => m.name).join(", ")}`
          : "Database already up to date."
      );
    } else if (command === "down") {
      const reverted = await migrator.down();
      console.log(`Reverted: ${reverted.map((m) => m.name).join(", ") || "(nothing)"}`);
    } else if (command === "status") {
      const [pending, executed] = await Promise.all([migrator.pending(), migrator.executed()]);
      console.log("Executed:", executed.map((m) => m.name).join(", ") || "(none)");
      console.log("Pending: ", pending.map((m) => m.name).join(", ") || "(none)");
    } else {
      throw new Error(`Unknown command "${command}". Use: up | down | status`);
    }
  } finally {
    await sequelize.close();
  }
}

main().catch((error) => {
  console.error("Migration failed:\n", error);
  process.exit(1);
});
