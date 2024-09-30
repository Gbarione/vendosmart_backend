import { Injectable, NotFoundException } from "@nestjs/common";
import { StorageService } from "../_core/local_storage";
import { CreateServiceDto } from "./dto/create_service.dto";
import { Service } from "./service.entity";

@Injectable()
export class ServiceService {
	constructor(private readonly storageService: StorageService) {
		this.storageService = StorageService.getInstance();
	}

	create(vendorId: number, serviceData: CreateServiceDto): Service {
		const foundCategory = this.storageService.findById(
			"category",
			serviceData.categoryId!,
		);
		if (!foundCategory) {
			throw new NotFoundException("Category not found");
		}
		const newService = this.storageService.create("service", {
			...serviceData,
			category: foundCategory,
			vendorId,
		});

		return newService;
	}
}

