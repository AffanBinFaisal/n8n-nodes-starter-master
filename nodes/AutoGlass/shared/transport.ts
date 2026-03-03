import type {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

const AUTH_PATH = '/api/v1/core/auth/signin';

export async function getAuthToken(
	this: IExecuteFunctions | IExecuteSingleFunctions,
): Promise<{ token: string; apiKey: string; baseUrl: string }> {
	const credentials = await this.getCredentials('autoGlassApi');
	const baseUrl = (credentials.baseUrl as string)?.replace(/\/$/, '') ?? 'https://dev-avatare.ableplatform.io';
	const username = credentials.username as string;
	const password = credentials.password as string;
	const sysModuleId = credentials.sysModuleId as string;
	const apiKey = credentials.apiKey as string;

	const loginResponse = await this.helpers.httpRequest({
		method: 'POST',
		url: `${baseUrl}${AUTH_PATH}`,
		headers: {
			'Content-Type': 'application/json',
			'api-key': apiKey,
		},
		body: {
			username,
			password,
			sys_module_id: sysModuleId,
		},
		json: true,
	});

	const token = (loginResponse as IDataObject).accessToken as string;
	if (!token) {
		throw new NodeOperationError(this.getNode(), 'Login failed: no access token in response');
	}

	return { token, apiKey, baseUrl };
}

export interface AutoGlassRequestOptions {
	qs?: IDataObject;
	body?: IDataObject;
	/** Extra headers (e.g. Accept-Language) merged with defaults; use for localized responses */
	headers?: IDataObject;
}

export async function autoGlassApiRequest(
	this: IExecuteFunctions | IExecuteSingleFunctions,
	context: { token: string; apiKey: string; baseUrl: string },
	method: IHttpRequestMethods,
	pathOrUrl: string,
	options: AutoGlassRequestOptions = {},
): Promise<IDataObject> {
	const url = pathOrUrl.startsWith('http') ? pathOrUrl : `${context.baseUrl}${pathOrUrl}`;

	const baseHeaders: IDataObject = {
		Authorization: `Bearer ${context.token}`,
		'api-key': context.apiKey,
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};
	const headers = { ...baseHeaders, ...(options.headers ?? {}) };

	const requestOptions: IHttpRequestOptions = {
		method,
		url,
		headers,
		json: true,
		qs: options.qs,
		body: options.body,
	};

	return (await this.helpers.httpRequest(requestOptions)) as IDataObject;
}
