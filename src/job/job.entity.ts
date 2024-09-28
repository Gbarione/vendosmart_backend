import { Category } from "../category/category.entity";
import { Location } from "../location/location.entity";

export class Job {
	id: number;
	categoryId: number;
	locationId: number;
	category?: Category;
	location?: Location;
}
