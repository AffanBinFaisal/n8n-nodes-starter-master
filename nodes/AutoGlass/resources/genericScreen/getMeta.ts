import type { INodeProperties } from 'n8n-workflow';

const showOnlyForGenericScreenGetMeta = {
	operation: ['getMeta'],
	resource: ['genericScreen'],
};

export const genericScreenGetMetaDescription: INodeProperties[] = [
	{
		displayName: 'Screen ID',
		name: 'screenId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForGenericScreenGetMeta },
		description: 'ID of the generic screen (e.g. "home")',
		placeholder: 'e.g. home',
	},
];
