import { BaseEntity } from "../_core/entities/base_entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Location } from "../location/location.entity";

@Entity()
export class Vendor extends BaseEntity<Vendor> {
	@Column({ type: "varchar", length: 255, nullable: false })
	name: string;

	@ManyToOne(() => Location)
	@JoinColumn({ name: "locationId" })
	location: Location;
}

