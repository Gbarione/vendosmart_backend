import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateJobDto } from "./dto/createJob.dto";
import { StorageService } from "../_core/localStorage";

@Injectable()
export class JobService {
	constructor(private readonly storageService: StorageService) {
		this.storageService = StorageService.getInstance();
	}

	async create(createJobDto: CreateJobDto) {
		const category = this.storageService.findById(
			"category",
			createJobDto.categoryId,
		);

		const location = this.storageService.findById(
			"location",
			createJobDto.locationId,
		);

		if (!category || !location) {
			throw new NotFoundException("Category or location not found");
		}

		return this.storageService.create("job", createJobDto);
	}
}

