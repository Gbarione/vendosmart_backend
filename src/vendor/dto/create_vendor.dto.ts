import { Type } from "class-transformer";
import {
	ArrayMinSize,
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsString,
	ValidateNested,
} from "class-validator";
import { CreateServiceDto } from "src/service/dto/create_service.dto";

export class CreateVendorDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsNumber()
	@Type(() => Number)
	locationId: number;

	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => CreateServiceDto)
	services: CreateServiceDto[];
}

