import { nanoid } from "nanoid/async";
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";
import type { DeepPartial } from "typeorm";

export const ID_LENGTH = Number(process.env.ID_LENGTH);

export class BaseEntity<T> {
	constructor(partialObject?: DeepPartial<T>) {
		Object.assign(this, partialObject);
	}

	@PrimaryColumn({ type: "varchar", length: ID_LENGTH })
	id: string;

	@Column()
	@CreateDateColumn()
	createdDate: Date;

	@Column()
	@UpdateDateColumn()
	updatedDate?: Date;

	@BeforeInsert()
	async generateId() {
		if (!this.id) {
			this.id = await nanoid(ID_LENGTH);
		}
	}
}

