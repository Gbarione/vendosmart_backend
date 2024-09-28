import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { StorageService } from "../_core/localStorage";

@Module({
	controllers: [CategoryController],
	providers: [CategoryService, StorageService],
	exports: [CategoryService],
})
export class CategoryModule {}
