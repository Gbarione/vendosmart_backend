import { Service } from "src/service/service.entity";

export class Vendor {
	id: number;
	name: string;
	locationId: number;
	services: Service[];
}
