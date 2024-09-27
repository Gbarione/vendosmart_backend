import type { DeepPartial } from "typeorm";
import {
	Column,
	CreateDateColumn,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";

export const ID_LENGTH = Number(process.env.ID_LENGTH);

export class BaseEntity<T> {
	constructor(partialObject?: DeepPartial<T>) {
		Object.assign(this, partialObject);
	}

	@PrimaryColumn({ type: "int", generated: "increment" })
	id: number;

	@Column()
	@CreateDateColumn()
	createdDate: Date;

	@Column()
	@UpdateDateColumn()
	updatedDate?: Date;
}

