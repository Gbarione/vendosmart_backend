import { Injectable, NotFoundException } from "@nestjs/common";
import { StorageService } from "../_core/localStorage";
import { CreateServiceDto } from "./dto/createService.dto";
import { Service } from "./service.entity";

@Injectable()
export class ServiceService {
	constructor(private readonly storageService: StorageService) {
		this.storageService = StorageService.getInstance();
	}

	create(vendorId: number, serviceData: Partial<Service>): Service {
		const newService = this.storageService.create("service", {
			...serviceData,
			vendorId,
		});
		return newService;
	}
}

