import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create_job.dto";
import { AuthGuard } from "src/_core/guards/auth.guard";
import { JobResponseDto } from "./dto/job_response.dto";

@Controller("job")
export class JobController {
	constructor(private readonly jobService: JobService) {}

	@Post()
	@UseGuards(AuthGuard)
	createJob(@Body() createJobDto: CreateJobDto): JobResponseDto {
		return this.jobService.create(createJobDto);
	}
}

