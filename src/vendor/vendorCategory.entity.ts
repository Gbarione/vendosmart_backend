import { BaseEntity } from "../_core/entities/base_entity";
import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { Vendor } from "./vendor.entity";
import { Category } from "../category/category.entity";

@Entity()
export class VendorCategory extends BaseEntity<VendorCategory> {
	@ManyToOne(() => Vendor, (vendor) => vendor.vendorCategories)
	@JoinColumn({ name: "vendorId" })
	vendor: Vendor;

	@ManyToOne(() => Category)
	@JoinColumn({ name: "categoryId" })
	category: Category;
}

