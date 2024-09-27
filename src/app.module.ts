import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { VendorModule } from "./vendor/vendor.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async () => {
				const dataSource = new DataSource({
					type: process.env.DB_TYPE as "mysql" | "mariadb",
					host: process.env.DB_HOST,
					port: parseInt(process.env.DB_PORT || "3306", 10),
					username: process.env.DB_USERNAME,
					password: process.env.DB_PASSWORD ?? "",
					database: process.env.DB_NAME,
					entities: [],
					synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
				});

				await dataSource.initialize();
				return dataSource.options;
			},
		}),
		VendorModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

