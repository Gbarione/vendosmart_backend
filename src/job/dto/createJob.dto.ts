import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateJobDto {
	@IsNotEmpty()
	@IsNumber()
	categoryId: number;

	@IsNotEmpty()
	@IsNumber()
	locationId: number;
}

