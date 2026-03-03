import type { INodeProperties } from 'n8n-workflow';

const showOnlyForGenericMenuGetAll = {
	operation: ['getAll'],
	resource: ['genericMenu'],
};

export const genericMenuGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Accept-Language',
		name: 'acceptLanguage',
		type: 'string',
		default: 'en',
		displayOptions: { show: showOnlyForGenericMenuGetAll },
		description:
			'Language for localized fields (e.g. title). Use "en", "en-US", etc. so the API returns full titles instead of null.',
	},
	{
		displayName: 'Is Dev',
		name: 'isDev',
		type: 'boolean',
		default: false,
		displayOptions: { show: showOnlyForGenericMenuGetAll },
		description: 'Whether to return dev menu entries',
	},
];
