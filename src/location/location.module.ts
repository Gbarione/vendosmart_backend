import { Module } from "@nestjs/common";
import { LocationService } from "./location.service";
import { LocationController } from "./location.controller";
import { StorageService } from "../_core/localStorage";

@Module({
	controllers: [LocationController],
	providers: [LocationService, StorageService],
	exports: [LocationService],
})
export class LocationModule {}
