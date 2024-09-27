import { BaseEntity } from "src/_core/entities/base_entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Vendor extends BaseEntity<Vendor> {
	@Column({ type: "varchar", length: 255, nullable: false })
	name: string;
}

