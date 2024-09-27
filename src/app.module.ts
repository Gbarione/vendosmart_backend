import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { VendorModule } from "./vendor/vendor.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { LocationModule } from "./location/location.module";
import { AppDataSource } from "typeorm.config";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async () => {
				await AppDataSource.initialize();
				return AppDataSource.options;
			},
		}),
		VendorModule,
		LocationModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

