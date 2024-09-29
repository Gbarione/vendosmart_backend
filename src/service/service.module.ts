import { Module } from "@nestjs/common";
import { StorageService } from "../_core/local_storage";
import { ServiceService } from "./service.service";

@Module({
	controllers: [],
	providers: [ServiceService, StorageService],
	exports: [ServiceService],
})
export class ServiceModule {}

