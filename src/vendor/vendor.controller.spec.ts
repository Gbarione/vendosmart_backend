import { Test, TestingModule } from "@nestjs/testing";
import { VendorController } from "./vendor.controller";
import { VendorService } from "./vendor.service";
import { CreateVendorDto } from "./dto/create_vendor.dto";
import { NotFoundException, BadRequestException } from "@nestjs/common";

jest.mock(
	"src/_core/guards/auth.guard",
	() => ({
		AuthGuard: jest.fn().mockImplementation(() => ({
			canActivate: jest.fn().mockReturnValue(true),
		})),
	}),
	{ virtual: true },
);

jest.mock(
	"src/service/dto/create_service.dto",
	() => ({
		CreateServiceDto: class MockCreateServiceDto {},
	}),
	{ virtual: true },
);

describe("VendorController", () => {
	let controller: VendorController;
	let vendorService: VendorService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [VendorController],
			providers: [
				{
					provide: VendorService,
					useValue: {
						create: jest.fn(),
						getPotentialVendors: jest.fn(),
						getReachableVendors: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<VendorController>(VendorController);
		vendorService = module.get<VendorService>(VendorService);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	describe("create", () => {
		it("should create a vendor", () => {
			const createVendorDto: CreateVendorDto = {
				name: "Test Vendor",
				locationId: 1,
				services: [
					{ categoryId: 1, compliant: true },
					{ categoryId: 2, compliant: false },
				],
			};

			const mockCreatedVendor = {
				id: 1,
				name: "Test Vendor",
				location: { id: 1, name: "Test Location", state: "TX" },
				services: [
					{
						id: 1,
						compliant: true,
						category: { id: 1, name: "Category 1" },
					},
					{
						id: 2,
						compliant: false,
						category: { id: 2, name: "Category 2" },
					},
				],
			};

			(vendorService.create as jest.Mock).mockResolvedValue(
				mockCreatedVendor,
			);

			const result = controller.createVendor(createVendorDto);

			expect(result).toBeDefined();
			expect(vendorService.create).toHaveBeenCalledWith(createVendorDto);
		});

		it("should throw NotFoundException when vendor creation fails", () => {
			const createVendorDto: CreateVendorDto = {
				name: "Test Vendor",
				locationId: 999,
				services: [
					{
						categoryId: 1,
						compliant: true,
					},
				],
			};

			(vendorService.create as jest.Mock).mockRejectedValue(
				new NotFoundException("Location not found"),
			);

			expect(controller.createVendor(createVendorDto)).rejects.toThrow(
				NotFoundException,
			);
		});

		it("should throw NotFoundException when category not found", () => {
			const createVendorDto: CreateVendorDto = {
				name: "Test Vendor",
				locationId: 1,
				services: [{ categoryId: 999, compliant: true }],
			};

			(vendorService.create as jest.Mock).mockRejectedValue(
				new NotFoundException("Category not found"),
			);

			expect(controller.createVendor(createVendorDto)).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe("getPotentialVendors", () => {
		it("should get potential vendors", () => {
			const jobId = 1;
			const mockPotentialVendors = [
				{
					id: 1,
					name: "Vendor 1",
					location: { id: 1, name: "Location 1" },
					services: [
						{
							category: { id: 1, name: "Category 1" },
							compliant: true,
						},
					],
				},
				{
					id: 2,
					name: "Vendor 2",
					location: { id: 2, name: "Location 2" },
					services: [
						{
							category: { id: 1, name: "Category 1" },
							compliant: true,
						},
					],
				},
			];

			(vendorService.getPotentialVendors as jest.Mock).mockReturnValue(
				mockPotentialVendors,
			);

			const result = controller.getPotentialVendors(jobId);

			expect(result).toEqual(mockPotentialVendors);
			expect(vendorService.getPotentialVendors).toHaveBeenCalledWith(
				jobId,
			);
		});

		it("should throw NotFoundException when job not found", async () => {
			const jobId = 999;

			(vendorService.getPotentialVendors as jest.Mock).mockRejectedValue(
				new NotFoundException("Job not found"),
			);

			await expect(controller.getPotentialVendors(jobId)).rejects.toThrow(
				NotFoundException,
			);
		});

		it("should throw BadRequestException when jobId is not provided", () => {
			const jobId = undefined;

			expect(() => controller.getPotentialVendors(jobId as any)).toThrow(
				BadRequestException,
			);
			expect(() => controller.getPotentialVendors(jobId as any)).toThrow(
				"jobId is required.",
			);
		});
	});

	describe("getReachableVendors", () => {
		it("should get reachable vendors", () => {
			const locationId = 1;
			const categoryId = 1;
			const mockReachableVendors = {
				total: 2,
				compliant: 1,
				notCompliant: 1,
			};

			(vendorService.getReachableVendors as jest.Mock).mockReturnValue(
				mockReachableVendors,
			);

			const result = controller.getReachableVendors(
				locationId,
				categoryId,
			);

			expect(result).toEqual(mockReachableVendors);
			expect(vendorService.getReachableVendors).toHaveBeenCalledWith(
				locationId,
				categoryId,
			);
		});

		it("should throw NotFoundException when no potential vendors found", () => {
			const locationId = 999;
			const categoryId = 999;

			(vendorService.getReachableVendors as jest.Mock).mockRejectedValue(
				new NotFoundException("No potential vendors found"),
			);

			expect(
				controller.getReachableVendors(locationId, categoryId),
			).rejects.toThrow(NotFoundException);
		});
	});
});

