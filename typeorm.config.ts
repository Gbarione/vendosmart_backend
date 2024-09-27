import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config();

export const AppDataSource = new DataSource({
	type: process.env.DB_TYPE as "mysql" | "mariadb",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || "3306", 10),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD ?? "",
	database: process.env.DB_NAME,
	entities: [path.join(__dirname, "**", "*.entity.{ts,js}")],
	migrations: [path.join(__dirname, "src", "migrations", "*{.ts,.js}")],
	synchronize: true,
	logging: process.env.TYPEORM_LOGGING === "true",
});

