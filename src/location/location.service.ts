import { Injectable } from "@nestjs/common";
import { StorageService } from "../_core/localStorage";

@Injectable()
export class LocationService {
	constructor(private readonly storageService: StorageService) {}
}

