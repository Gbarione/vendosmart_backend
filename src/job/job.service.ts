import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateJobDto } from "./dto/createJob.dto";
import { JobRepository } from "./job.repository";
import { CategoryRepository } from "src/category/category.repository";
import { LocationRepository } from "src/location/location.repository";

@Injectable()
export class JobService {
	constructor(
		private readonly jobRepository: JobRepository,
		private readonly categoryRepository: CategoryRepository,
		private readonly locationRepository: LocationRepository,
	) {}

	async create(createJobDto: CreateJobDto) {
		const category = await this.categoryRepository.findById(
			createJobDto.categoryId,
		);
		const location = await this.locationRepository.findById(
			createJobDto.locationId,
		);

		if (!category || !location) {
			throw new NotFoundException("Category or location not found");
		}

		return await this.jobRepository.create(createJobDto);
	}
}

