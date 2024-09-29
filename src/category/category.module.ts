import { Module } from "@nestjs/common";
import { StorageService } from "../_core/local_storage";

@Module({
	controllers: [],
	providers: [StorageService],
	exports: [],
})
export class CategoryModule {}

