import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
	private readonly validUsername = process.env.BASIC_AUTH_USERNAME;
	private readonly validPassword = process.env.BASIC_AUTH_PASSWORD; // Pode ser hash se necessário

	canActivate(context: ExecutionContext): boolean {
		const request: Request = context.switchToHttp().getRequest();
		const authHeader = request.headers["authorization"];

		if (!authHeader || !authHeader.startsWith("Basic ")) {
			throw new UnauthorizedException(
				"Authorization header is missing or invalid.",
			);
		}

		const base64Credentials = authHeader.split(" ")[1];
		const credentials = Buffer.from(base64Credentials, "base64").toString(
			"ascii",
		);
		const [username, password] = credentials.split(":");

		if (this.isAuthenticated(username, password)) {
			return true;
		} else {
			throw new UnauthorizedException("Invalid credentials.");
		}
	}

	private isAuthenticated(username: string, password: string): boolean {
		return (
			username === this.validUsername && password === this.validPassword
		);
	}
}

