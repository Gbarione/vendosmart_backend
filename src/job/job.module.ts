import { Module } from "@nestjs/common";
import { JobService } from "./job.service";
import { JobController } from "./job.controller";
import { StorageService } from "../_core/localStorage";

@Module({
	controllers: [JobController],
	providers: [JobService, StorageService],
})
export class JobModule {}

