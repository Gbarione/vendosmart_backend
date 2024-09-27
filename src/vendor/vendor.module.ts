import { Module } from "@nestjs/common";
import { VendorService } from "./vendor.service";
import { VendorController } from "./vendor.controller";
import { Vendor } from "./vendor.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VendorCategory } from "./vendorCategory.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Vendor, VendorCategory])],
	controllers: [VendorController],
	providers: [VendorService],
})
export class VendorModule {}
