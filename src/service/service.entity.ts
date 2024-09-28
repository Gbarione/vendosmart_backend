import { Vendor } from "../vendor/vendor.entity";
import { Category } from "../category/category.entity";

export class Service {
	id: number;
	vendorId: number;
	categoryId: number;
	compliant: boolean;
	vendor?: Vendor;
	category?: Category;
}
