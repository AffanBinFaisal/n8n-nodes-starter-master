import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

const DEFAULT_BASE_URL = 'https://dev-avatare.ableplatform.io';

export class AutoGlassApi implements ICredentialType {
	name = 'autoGlassApi';

	displayName = 'AutoGlass API';

	icon: Icon = {
		light: 'file:../nodes/AutoGlass/autoglass.svg',
		dark: 'file:../nodes/AutoGlass/autoglass.dark.svg',
	};

	documentationUrl = 'https://your-docs-link.com';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: DEFAULT_BASE_URL,
			placeholder: DEFAULT_BASE_URL,
			description: 'API base URL (e.g. for custom or dev environments)',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
		{
			displayName: 'Sys Module ID',
			name: 'sysModuleId',
			type: 'string',
			default: 'los-retail',
			description: 'System module to authenticate against',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl || "' + DEFAULT_BASE_URL + '"}}',
			url: '/api/v1/core/auth/signin',
			method: 'POST',
			body: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.password}}',
				sys_module_id: '={{$credentials.sysModuleId}}',
			},
			json: true,
		},
	};
}
