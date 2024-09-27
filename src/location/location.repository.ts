import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Location } from "./location.entity";

@Injectable()
export class LocationRepository {
	constructor(
		@InjectRepository(Location)
		private locationRepository: Repository<Location>,
	) {}
	async findById(id: number): Promise<Location | null> {
		return this.locationRepository.findOne({ where: { id } });
	}
}

