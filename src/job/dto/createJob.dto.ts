import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateJobDto {
	@IsNotEmpty()
	@Type(() => Number)
	@IsNumber()
	categoryId: number;

	@IsNotEmpty()
	@Type(() => Number)
	@IsNumber()
	locationId: number;
}

