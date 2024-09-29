import { Category } from "../category/category.entity";
import { Location } from "../location/location.entity";

export class Job {
	id: number;
	category: Category;
	location: Location;
}

