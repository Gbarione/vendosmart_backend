import { StorageService } from "../src/_core/local_storage";

const mockLocations = [
	{ id: 1, name: "Glades", state: "FL" },
	{ id: 2, name: "Gulf", state: "FL" },
	{ id: 3, name: "Hamilton", state: "FL" },
	{ id: 4, name: "Hardee", state: "FL" },
	{ id: 5, name: "Hendry", state: "FL" },
	{ id: 6, name: "El Paso", state: "TX" },
	{ id: 7, name: "Erath", state: "TX" },
	{ id: 8, name: "Falls", state: "TX" },
	{ id: 9, name: "Fannin", state: "TX" },
	{ id: 10, name: "Fayette", state: "TX" },
	{ id: 11, name: "Fisher", state: "TX" },
];

const mockCategories = [
	{ id: 1, name: "Access Control Software" },
	{ id: 2, name: "Air Conditioning" },
	{ id: 3, name: "Landscaping" },
	{ id: 4, name: "Landscaping Maintenance" },
	{ id: 5, name: "Snow and Ice Removal" },
	{ id: 6, name: "Sewer and Water Pipelining" },
];

jest.mock("../src/_core/local_storage", () => {
	return {
		StorageService: {
			getInstance: jest.fn().mockReturnValue({
				findAll: jest.fn((entity) => {
					if (entity === "location") return mockLocations;
					if (entity === "category") return mockCategories;
					return [];
				}),
				findById: jest.fn((entity, id) => {
					if (entity === "location")
						return mockLocations.find((loc) => loc.id === id);
					if (entity === "category")
						return mockCategories.find((cat) => cat.id === id);
					return null;
				}),
				create: jest.fn(),
				update: jest.fn(),
			}),
		},
	};
});
