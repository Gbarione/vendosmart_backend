import { Category } from "src/category/category.entity";
import { Location } from "src/location/location.entity";

export class ServiceDto {
	id: number;
	compliant: boolean;
	category: Omit<Category, "vendorId">;
}

export class CreateVendorResponseDto {
	id: number;
	name: string;
	location: Location;
	services: ServiceDto[];
}

