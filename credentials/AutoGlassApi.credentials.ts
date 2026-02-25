import type {
	ICredentialType,
	INodeProperties,
	IAuthenticateGeneric,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class AutoGlassApi implements ICredentialType {
	name = 'autoGlassApi';
	displayName = 'AutoGlass Api';
	documentationUrl = 'https://your-docs-link.com';
	properties: INodeProperties[] = [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
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
			method: 'POST',
			url: 'https://dev-avatare.ableplatform.io/api/v1/core/auth/signin',
			body: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.password}}',
				sys_module_id: '={{$credentials.sysModuleId}}',
			},
			json: true,
		},
	};
}