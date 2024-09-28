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
import { VendorService } from "./vendor.service";
import { CreateVendorDto } from "./dto/createVendor.dto";
import { AuthGuard } from "src/_core/guards/auth.guard";

@Controller("vendor")
export class VendorController {
	constructor(private readonly vendorService: VendorService) {}

	@Post()
	@UseGuards(AuthGuard)
	async createVendor(@Body() createVendorDto: CreateVendorDto) {
		return this.vendorService.create(createVendorDto);
	}

	@Get("potential")
	@UseGuards(AuthGuard)
	async getPotentialVendors(@Query("jobId", ParseIntPipe) jobId: number) {
		return this.vendorService.getPotentialVendors(jobId);
	}

	@Get("reachable")
	async getReachableVendors(
		@Query("locationId", ParseIntPipe) locationId: number,
		@Query("categoryId", ParseIntPipe) categoryId: number,
	) {
		if (!locationId || !categoryId) {
			throw new BadRequestException(
				"locationId and categoryId are required.",
			);
		}

		return this.vendorService.getReachableVendors(locationId, categoryId);
	}
}

