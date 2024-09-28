import { Injectable, NotFoundException } from "@nestjs/common";
import { StorageService } from "../_core/localStorage";
import { ServiceService } from "../service/service.service";
import { CreateVendorDto } from "./dto/createVendor.dto";
import { Vendor } from "./vendor.entity";

@Injectable()
export class VendorService {
	constructor(
		private readonly storageService: StorageService,
		private readonly serviceService: ServiceService,
	) {
		this.storageService = StorageService.getInstance();
	}

	async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
		const { services, locationId, name } = createVendorDto;

		const location = this.storageService.findById("location", locationId);
		if (!location) {
			throw new NotFoundException("Location not found");
		}

		const newVendor = this.storageService.create("vendor", {
			locationId,
			name,
		});

		const createdServices = services.map((service) => {
			return this.serviceService.create(newVendor.id, service);
		});

		this.storageService.update("vendor", newVendor.id, newVendor);

		return {
			...newVendor,
			services: createdServices,
		};
	}

	async getPotentialVendors(jobId: number): Promise<Vendor[]> {
		const job = this.storageService.findById("job", jobId);

		if (!job) {
			throw new NotFoundException("Job not found");
		}

		const { locationId, categoryId } = job;
		const potentialVendors = this._getPotentialVendors(
			categoryId,
			locationId,
		);

		const allCategories = this.storageService.findAll("category");
		const foundCategory = allCategories.find(
			(category) => category.id === categoryId,
		);

		const sortedVendors = potentialVendors.sort((a: any, b: any) => {
			const aCompliant = a.services.find(
				(service: any) => service.category.id === foundCategory.id,
			)?.compliant;
			const bCompliant = b.services.find(
				(service: any) => service.category.id === foundCategory.id,
			)?.compliant;

			return aCompliant === bCompliant ? 0 : aCompliant ? -1 : 1;
		});

		return sortedVendors;
	}

	async getReachableVendors(locationId: number, categoryId: number) {
		const potentialVendors = this._getPotentialVendors(
			categoryId,
			locationId,
		);

		return {
			total: potentialVendors.length,
			compliant: potentialVendors.filter((vendor) =>
				vendor.services.some((service) => service.compliant),
			).length,
			notCompliant: potentialVendors.filter((vendor) =>
				vendor.services.some((service) => !service.compliant),
			).length,
		};
	}

	private _getPotentialVendors(categoryId: number, locationId: number) {
		const allVendors = this.storageService.findAll("vendor");
		const allServices = this.storageService.findAll("service");
		const allLocations = this.storageService.findAll("location");
		const allCategories = this.storageService.findAll("category");

		if (
			!allVendors.length ||
			!allServices.length ||
			!allLocations.length ||
			!allCategories.length
		) {
			throw new NotFoundException("Data not found");
		}

		const foundLocation = allLocations.find(
			(location) => location.id === locationId,
		);
		const foundCategory = allCategories.find(
			(category) => category.id === categoryId,
		);

		const servicesWithCategories = allServices.map((service) => {
			const category = allCategories.find(
				(category) => category.id === service.categoryId,
			);
			return { ...service, category };
		});

		const vendorsWithServicesAndLocation = allVendors.map((vendor) => {
			const services = servicesWithCategories.filter(
				(service) => service.vendorId === vendor.id,
			);
			const location = allLocations.find(
				(location) => location.id === vendor.locationId,
			);
			return { ...vendor, services, location };
		});

		const vendorsInSameLocationAsJob =
			vendorsWithServicesAndLocation.filter(
				(vendor) => vendor.location.id === foundLocation.id,
			);

		return vendorsInSameLocationAsJob.filter(
			(vendor) =>
				vendor.services.length &&
				vendor.services.some(
					(service) => service.category.id === foundCategory.id,
				),
		);
	}
}

