import { BaseEntity } from "../_core/entities/base_entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Vendor } from "../vendor/vendor.entity";
import { Category } from "../category/category.entity";

@Entity()
export class Service extends BaseEntity<Service> {
	@ManyToOne(() => Vendor)
	@JoinColumn({ name: "vendorId" })
	vendor: Vendor;

	@ManyToOne(() => Category)
	@JoinColumn({ name: "categoryId" })
	category: Category;

	@Column({ type: "boolean", default: false })
	compliant: boolean;
}

