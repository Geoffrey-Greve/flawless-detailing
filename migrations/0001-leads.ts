import { DataTypes, QueryInterface } from "sequelize";

/**
 * Quote requests from the website contact form.
 * Email is intentionally not unique: the same person submitting twice is a
 * real signal, and de-duping at write time would hide it.
 */
export async function up({ context: qi }: { context: QueryInterface }) {
  await qi.createTable("leads", {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(120), allowNull: false },
    phone: { type: DataTypes.STRING(40), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false },
    vehicle: { type: DataTypes.STRING(160), allowNull: false },
    services: { type: DataTypes.JSON, allowNull: false },
    mobile_service: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    message: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.ENUM("new", "contacted", "quoted", "won", "lost"),
      allowNull: false,
      defaultValue: "new",
    },
    source: { type: DataTypes.STRING(64), allowNull: false, defaultValue: "website" },
    ip: { type: DataTypes.STRING(64), allowNull: true },
    user_agent: { type: DataTypes.STRING(255), allowNull: true },
    email_sent: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
  });

  await qi.addIndex("leads", ["created_at"], { name: "leads_created_at" });
  await qi.addIndex("leads", ["status"], { name: "leads_status" });
}

export async function down({ context: qi }: { context: QueryInterface }) {
  await qi.dropTable("leads");
}
