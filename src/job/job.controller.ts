import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/createJob.dto";
import { AuthGuard } from "src/_core/guards/auth.guard";

@Controller("job")
export class JobController {
	constructor(private readonly jobService: JobService) {}

	@Post()
	@UseGuards(AuthGuard)
	async createJob(@Body() createJobDto: CreateJobDto) {
		return await this.jobService.create(createJobDto);
	}
}

