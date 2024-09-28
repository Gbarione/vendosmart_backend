import { Module } from "@nestjs/common";
import { VendorController } from "./vendor.controller";
import { VendorService } from "./vendor.service";
import { StorageService } from "src/_core/localStorage";
import { ServiceModule } from "../service/service.module";
import { ServiceService } from "src/service/service.service";

@Module({
	imports: [ServiceModule],
	controllers: [VendorController],
	providers: [VendorService, StorageService, ServiceService],
})
export class VendorModule {}

