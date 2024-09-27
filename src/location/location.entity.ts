import { Column, Entity } from "typeorm";
import { BaseEntity } from "../_core/entities/base_entity";

@Entity()
export class Location extends BaseEntity<Location> {
	@Column({ type: "varchar", length: 255, nullable: false })
	name: string;

	@Column({ type: "varchar", length: 2, nullable: false })
	state: string;
}

