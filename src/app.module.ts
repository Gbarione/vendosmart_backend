import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "typeorm.config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LocationModule } from "./location/location.module";
import { ServiceModule } from "./service/service.module";
import { VendorModule } from "./vendor/vendor.module";
import { CategoryModule } from './category/category.module';

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
		ServiceModule,
		CategoryModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

