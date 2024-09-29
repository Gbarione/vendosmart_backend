import { Vendor } from "../vendor/vendor.entity";
import { Category } from "../category/category.entity";

export class Service {
	id: number;
	compliant: boolean;
	vendor: Vendor;
	vendorId?: number;
	category: Category;
}

