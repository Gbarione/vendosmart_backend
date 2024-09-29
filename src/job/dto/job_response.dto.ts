import { Category } from "src/category/category.entity";
import { Location } from "src/location/location.entity";

export class JobResponseDto {
	id: number;
	category: Category;
	location: Location;
}

