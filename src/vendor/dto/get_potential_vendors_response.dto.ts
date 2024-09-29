import { Location } from "src/location/location.entity";
import { Service } from "src/service/service.entity";

export class GetPotentialVendorsResponseDto {
	id: number;
	name: string;
	location: Location;
	services: Omit<Service, "vendor">[];
}

