import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category.entity";

@Injectable()
export class CategoryRepository {
	constructor(
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,
	) {}
	async findById(id: number): Promise<Category | null> {
		return this.categoryRepository.findOne({ where: { id } });
	}
}

