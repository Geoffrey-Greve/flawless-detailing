import { sequelize } from "@/lib/db/sequelize";
import { Lead } from "@/lib/db/models/Lead";

/**
 * Importing this module registers every model on the shared connection.
 * Always import models from here (not from an individual file) so future
 * associations (e.g. gallery items, reviews in Phase 2) are guaranteed to be set up.
 */
export { sequelize, Lead };
