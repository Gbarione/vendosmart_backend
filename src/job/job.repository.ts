import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Job } from "./job.entity";
import { CreateJobDto } from "./dto/createJob.dto";

@Injectable()
export class JobRepository {
	constructor(
		@InjectRepository(Job)
		private jobRepository: Repository<Job>,
	) {}
	async create(createJobDto: CreateJobDto): Promise<Job> {
		const newJob = this.jobRepository.create({
			category: { id: createJobDto.categoryId },
			location: { id: createJobDto.locationId },
		});

		return this.jobRepository.save(newJob);
	}
}

