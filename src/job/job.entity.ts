import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../_core/entities/base_entity";
import { Category } from "../category/category.entity";
import { Location } from "../location/location.entity";

@Entity()
export class Job extends BaseEntity<Job> {
	@ManyToOne(() => Category)
	@JoinColumn({ name: "categoryId" })
	category: Category;

	@ManyToOne(() => Location)
	@JoinColumn({ name: "locationId" })
	location: Location;
}

