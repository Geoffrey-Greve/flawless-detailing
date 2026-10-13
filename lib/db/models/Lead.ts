import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "@/lib/db/sequelize";

export const LEAD_STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** A quote request submitted from the website's contact form. */
export class Lead extends Model<InferAttributes<Lead>, InferCreationAttributes<Lead>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare phone: string;
  declare email: string;
  declare vehicle: string;
  declare services: CreationOptional<string[]>;
  declare mobileService: CreationOptional<boolean>;
  declare message: CreationOptional<string | null>;
  declare status: CreationOptional<LeadStatus>;
  declare source: CreationOptional<string>;
  declare ip: CreationOptional<string | null>;
  declare userAgent: CreationOptional<string | null>;
  /** True once the notification email to Chris went out. */
  declare emailSent: CreationOptional<boolean>;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Lead.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(120), allowNull: false },
    phone: { type: DataTypes.STRING(40), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false },
    vehicle: { type: DataTypes.STRING(160), allowNull: false },
    services: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    mobileService: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    message: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.ENUM(...LEAD_STATUSES),
      allowNull: false,
      defaultValue: "new",
    },
    source: { type: DataTypes.STRING(64), allowNull: false, defaultValue: "website" },
    ip: { type: DataTypes.STRING(64), allowNull: true },
    userAgent: { type: DataTypes.STRING(255), allowNull: true },
    emailSent: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, modelName: "Lead", tableName: "leads" }
);
