import { Controller, Post, Body } from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/createJob.dto";

@Controller("job")
export class JobController {
	constructor(private readonly jobService: JobService) {}

	@Post()
	async createJob(@Body() createJobDto: CreateJobDto) {
		return await this.jobService.create(createJobDto);
	}
}

