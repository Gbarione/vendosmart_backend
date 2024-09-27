import { Module } from "@nestjs/common";
import { JobService } from "./job.service";
import { JobController } from "./job.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "./job.entity";
import { JobRepository } from "./job.repository";
import { CategoryModule } from "../category/category.module";
import { LocationModule } from "../location/location.module";

@Module({
	imports: [TypeOrmModule.forFeature([Job]), CategoryModule, LocationModule],
	controllers: [JobController],
	providers: [JobService, JobRepository],
})
export class JobModule {}

