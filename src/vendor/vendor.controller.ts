import {
	BadRequestException,
	Body,
	Controller,
	Get,
	ParseIntPipe,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/_core/guards/auth.guard";
import { CreateVendorDto } from "./dto/create_vendor.dto";
import { CreateVendorResponseDto } from "./dto/create_vendor_response.dto";
import { GetPotentialVendorsResponseDto } from "./dto/get_potential_vendors_response.dto";
import { GetReachableVendorsResponseDto } from "./dto/get_reachable_vendors_response.dto";
import { VendorService } from "./vendor.service";

@Controller("vendor")
export class VendorController {
	constructor(private readonly vendorService: VendorService) {}

	@Post()
	@UseGuards(AuthGuard)
	createVendor(
		@Body() createVendorDto: CreateVendorDto,
	): CreateVendorResponseDto {
		return this.vendorService.create(createVendorDto);
	}

	@Get("potential")
	@UseGuards(AuthGuard)
	getPotentialVendors(
		@Query("jobId", ParseIntPipe) jobId: number,
	): GetPotentialVendorsResponseDto[] {
		if (!jobId) {
			throw new BadRequestException("jobId is required.");
		}

		return this.vendorService.getPotentialVendors(jobId);
	}

	@Get("reachable")
	getReachableVendors(
		@Query("locationId", ParseIntPipe) locationId: number,
		@Query("categoryId", ParseIntPipe) categoryId: number,
	): GetReachableVendorsResponseDto {
		return this.vendorService.getReachableVendors(locationId, categoryId);
	}
}

