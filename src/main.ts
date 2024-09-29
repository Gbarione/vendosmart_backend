import * as dotenv from "dotenv";
dotenv.config();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./_core/pipes/validation.pipe";
import { HttpExceptionFilter } from "./_core/interceptors/http.interceptor";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new HttpExceptionFilter());
	await app.listen(process.env.PORT || 8090);
}
bootstrap();

