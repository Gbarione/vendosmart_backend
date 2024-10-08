import { Location } from "src/location/location.entity";
import { Service } from "src/service/service.entity";

export class Vendor {
	id: number;
	name: string;
	location: Location;
	locationId?: number;
	services: Service[];
}

