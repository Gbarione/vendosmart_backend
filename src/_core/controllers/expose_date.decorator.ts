import { SetMetadata } from "@nestjs/common";

export const EXPOSE_DATE_KEY = "exposeDateGroups";
export const EXPOSE_CREATED_DATE_GROUP = "exposeCreatedDate";
export const EXPOSE_UPDATED_DATE_GROUP = "exposeUpdatedDate";

export const ExposeDate = ({
	exposeUpdatedDate = false,
	exposeCreatedDate = true,
}: { exposeUpdatedDate?: boolean; exposeCreatedDate?: boolean } = {}) => {
	const classTransformerGroups: string[] = [];
	if (exposeCreatedDate) {
		classTransformerGroups.push(EXPOSE_CREATED_DATE_GROUP);
	}
	if (exposeUpdatedDate) {
		classTransformerGroups.push(EXPOSE_UPDATED_DATE_GROUP);
	}

	return SetMetadata(EXPOSE_DATE_KEY, classTransformerGroups);
};
