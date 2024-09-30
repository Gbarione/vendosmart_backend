import { Test, TestingModule } from "@nestjs/testing";
import { JobController } from "./job.controller";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create_job.dto";
import { JobResponseDto } from "./dto/job_response.dto";
import { NotFoundException } from "@nestjs/common";

// Mock the AuthGuard module
jest.mock(
	"src/_core/guards/auth.guard",
	() => ({
		AuthGuard: jest.fn().mockImplementation(() => ({
			canActivate: jest.fn().mockReturnValue(true),
		})),
	}),
	{ virtual: true },
);

describe("JobController", () => {
	let controller: JobController;
	let jobService: JobService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [JobController],
			providers: [
				{
					provide: JobService,
					useValue: {
						create: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<JobController>(JobController);
		jobService = module.get<JobService>(JobService);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	describe("createJob", () => {
		it("should create a job successfully", async () => {
			const createJobDto: CreateJobDto = {
				categoryId: 2,
				locationId: 1,
			};

			const expectedResponse: JobResponseDto = {
				id: 1,
				category: { id: 2, name: "Category 2", vendorId: 1 }, // Add vendorId
				location: { id: 1, name: "Location 1", state: "State 1" },
			};

			(jobService.create as jest.Mock).mockResolvedValue(
				expectedResponse,
			);

			const result = await controller.createJob(createJobDto);

			expect(result).toEqual(expectedResponse);
			expect(jobService.create).toHaveBeenCalledWith(createJobDto);
		});

		it("should throw NotFoundException when job creation fails", async () => {
			const createJobDto: CreateJobDto = {
				categoryId: 999,
				locationId: 999,
			};

			(jobService.create as jest.Mock).mockRejectedValue(
				new NotFoundException("Category or location not found"),
			);

			await expect(controller.createJob(createJobDto)).rejects.toThrow(
				NotFoundException,
			);
		});
	});
});

