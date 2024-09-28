import { Module } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { ServiceController } from "./service.controller";
import { StorageService } from "../_core/localStorage";

@Module({
	controllers: [ServiceController],
	providers: [ServiceService, StorageService],
	exports: [ServiceService],
})
export class ServiceModule {}

