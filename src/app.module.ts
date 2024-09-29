import { Module } from "@nestjs/common";
import { StorageService } from "./_core/local_storage";
import { CategoryModule } from "./category/category.module";
import { JobModule } from "./job/job.module";
import { LocationModule } from "./location/location.module";
import { ServiceModule } from "./service/service.module";
import { VendorModule } from "./vendor/vendor.module";
@Module({
	imports: [
		VendorModule,
		LocationModule,
		ServiceModule,
		CategoryModule,
		JobModule,
	],
	controllers: [],
	providers: [
		{
			provide: StorageService,
			useFactory: () => StorageService.getInstance(),
		},
	],
})
export class AppModule {}

