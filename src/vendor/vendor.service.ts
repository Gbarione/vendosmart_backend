import { Injectable, NotFoundException } from "@nestjs/common";
import { StorageService } from "../_core/local_storage";
import { ServiceService } from "../service/service.service";
import { CreateVendorDto } from "./dto/create_vendor.dto";
import { Vendor } from "./vendor.entity";
import {
	CreateVendorResponseDto,
	ServiceDto,
} from "./dto/create_vendor_response.dto";
import { Service } from "src/service/service.entity";
import { GetPotentialVendorsResponseDto } from "./dto/get_potential_vendors_response.dto";
import { GetReachableVendorsResponseDto } from "./dto/get_reachable_vendors_response.dto";
import { Category } from "src/category/category.entity";
import { Location } from "src/location/location.entity";
import { CreateServiceDto } from "src/service/dto/create_service.dto";

@Injectable()
export class VendorService {
	constructor(
		private readonly storageService: StorageService,
		private readonly serviceService: ServiceService,
	) {
		this.storageService = StorageService.getInstance();
	}

	create(createVendorDto: CreateVendorDto): CreateVendorResponseDto {
		const { services, locationId, name } = createVendorDto;

		const location = this.storageService.findById("location", locationId);
		if (!location) {
			throw new NotFoundException("Location not found");
		}

		const newVendor = this.storageService.create("vendor", {
			locationId,
			name,
		});

		const createdServices = services.map((service: CreateServiceDto) => {
			const createdService = this.serviceService.create(
				newVendor.id,
				service,
			);
			return {
				id: createdService.id,
				compliant: createdService.compliant,
				category: createdService.category,
			};
		});

		this.storageService.update("vendor", newVendor.id, newVendor);

		return {
			id: newVendor.id,
			name: newVendor.name,
			location: location,
			services: createdServices,
		};
	}

	getPotentialVendors(jobId: number): GetPotentialVendorsResponseDto[] {
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

		if (!foundCategory) {
			throw new NotFoundException("Category not found");
		}

		const sortedVendors = potentialVendors.sort((a: any, b: any) => {
			const aCompliant = a.services.find(
				(service: any) => service.category.id === foundCategory.id,
			)?.compliant;
			const bCompliant = b.services.find(
				(service: any) => service.category.id === foundCategory.id,
			)?.compliant;

			return aCompliant === bCompliant ? 0 : aCompliant ? -1 : 1;
		});

		return sortedVendors.map((vendor) => {
			return {
				id: vendor.id,
				name: vendor.name,
				location: vendor.location!,
				services: vendor.services.map((service) => {
					return {
						id: service.id,
						compliant: service.compliant,
						category: service.category,
					};
				}),
			};
		});
	}

	getReachableVendors(
		locationId: number,
		categoryId: number,
	): GetReachableVendorsResponseDto {
		const potentialVendors = this._getPotentialVendors(
			categoryId,
			locationId,
		);

		if (!potentialVendors.length) {
			throw new NotFoundException("No potential vendors found");
		}

		return {
			total: potentialVendors.length,
			compliant: potentialVendors.filter((vendor: Vendor) =>
				vendor.services.some((service: Service) => service.compliant),
			).length,
			notCompliant: potentialVendors.filter((vendor: Vendor) =>
				vendor.services.some((service: Service) => !service.compliant),
			).length,
		};
	}

	private _getPotentialVendors(categoryId: number, locationId: number) {
		const allVendors: Vendor[] = this.storageService.findAll("vendor");
		const allServices: Service[] = this.storageService.findAll("service");
		const allLocations: Location[] =
			this.storageService.findAll("location");
		const allCategories: Category[] =
			this.storageService.findAll("category");

		if (
			!allVendors.length ||
			!allServices.length ||
			!allLocations.length ||
			!allCategories.length
		) {
			throw new NotFoundException("Data not found");
		}

		const foundLocation: Location | undefined = allLocations.find(
			(location: Location) => location.id === locationId,
		);

		if (!foundLocation) {
			throw new NotFoundException("Location not found");
		}

		const foundCategory: Category | undefined = allCategories.find(
			(category: Category) => category.id === categoryId,
		);

		if (!foundCategory) {
			throw new NotFoundException("Category not found");
		}

		const servicesWithCategories: Service[] = allServices.map((service) => {
			const category: Category | undefined = allCategories.find(
				(category: Category) => category.id === service.category.id,
			);

			if (!category) {
				throw new NotFoundException("Category not found");
			}

			return { ...service, category };
		});

		const vendorsWithServicesAndLocation: Vendor[] = allVendors.map(
			(vendor) => {
				const services: Service[] = servicesWithCategories.filter(
					(service: Service) => service.vendorId === vendor.id,
				);

				const location: Location | undefined = allLocations.find(
					(location: Location) => location.id === vendor.locationId,
				);

				if (!location) {
					throw new NotFoundException("Location not found");
				}

				return { ...vendor, services, location };
			},
		);

		const vendorsInSameLocationAsJob: Vendor[] =
			vendorsWithServicesAndLocation.filter((vendor: Vendor) => {
				return vendor.location!.id === foundLocation?.id;
			});

		return vendorsInSameLocationAsJob.filter(
			(vendor: Vendor) =>
				vendor.services.length &&
				vendor.services.some(
					(service: Service) =>
						service.category?.id === foundCategory?.id,
				),
		);
	}
}

