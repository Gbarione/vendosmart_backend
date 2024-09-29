import { Global, Injectable } from "@nestjs/common";

@Global()
@Injectable()
export class StorageService {
	private static instance: StorageService;
	private storage: Map<string, any[]> = new Map();

	constructor() {
		this.initializeStorage();
	}

	public static getInstance(): StorageService {
		if (!StorageService.instance) {
			StorageService.instance = new StorageService();
		}
		return StorageService.instance;
	}

	private initializeStorage() {
		const locations = [
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

		const categories = [
			{ id: 1, name: "Access Control Software" },
			{ id: 2, name: "Air Conditioning" },
			{ id: 3, name: "Landscaping" },
			{ id: 4, name: "Landscaping Maintenance" },
			{ id: 5, name: "Snow and Ice Removal" },
			{ id: 6, name: "Sewer and Water Pipelining" },
		];

		this.storage.set("location", locations);
		this.storage.set("category", categories);
		this.storage.set("job", []);
		this.storage.set("vendor", []);
		this.storage.set("service", []);
	}

	create(entity: string, item: any): any {
		if (!this.storage.has(entity)) {
			this.storage.set(entity, []);
		}
		const items = this.storage.get(entity);
		if (!items) {
			throw new Error(`Entity '${entity}' not found`);
		}
		const newItem = { id: items.length + 1, ...item };
		items.push(newItem);

		this.storage.set(entity, items);

		return newItem;
	}

	findAll(entity: string): any[] {
		return this.storage.get(entity) || [];
	}

	findById(entity: string, id: number): any | undefined {
		const items = this.storage.get(entity) || [];

		return items.find((item) => item.id === id);
	}

	update(entity: string, id: number, item: any): any | undefined {
		const items = this.storage.get(entity) || [];
		const index = items.findIndex((i) => i.id === id);
		if (index !== -1) {
			items[index] = { ...items[index], ...item };
			return items[index];
		}
		return undefined;
	}

	delete(entity: string, id: number): boolean {
		const items = this.storage.get(entity) || [];
		const index = items.findIndex((i) => i.id === id);
		if (index !== -1) {
			items.splice(index, 1);
			return true;
		}
		return false;
	}
}

