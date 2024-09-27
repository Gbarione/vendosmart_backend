import { BaseEntity } from "../_core/entities/base_entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Vendor } from "../vendor/vendor.entity";

@Entity()
export class Service extends BaseEntity<Service> {
	@Column({ type: "varchar", length: 255, nullable: false })
	name: string;

	@ManyToOne(() => Vendor)
	@JoinColumn({ name: "vendorId" })
	vendor: Vendor;
}

