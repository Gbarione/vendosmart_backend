import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateJobDto } from "./dto/create_job.dto";
import { StorageService } from "../_core/local_storage";
import { JobResponseDto } from "./dto/job_response.dto";
import { Job } from "./job.entity";

@Injectable()
export class JobService {
	constructor(private readonly storageService: StorageService) {
		this.storageService = StorageService.getInstance();
	}

	create(createJobDto: CreateJobDto): JobResponseDto {
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

		const job: Job = this.storageService.create("job", createJobDto);

		return {
			id: job.id,
			category,
			location,
		};
	}
}

