import { IsBoolean, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateServiceDto {
	@IsBoolean()
	compliant: boolean;

	@IsNumber()
	@Type(() => Number)
	categoryId: number;
}

