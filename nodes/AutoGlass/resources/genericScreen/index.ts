import type { INodeProperties } from 'n8n-workflow';
import { genericScreenGetMetaDescription } from './getMeta';

const showOnlyForGenericScreen = {
	resource: ['genericScreen'],
};

export const genericScreenDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForGenericScreen,
		},
		options: [
			{
				name: 'Get Meta',
				value: 'getMeta',
				action: 'Get screen metadata',
				description: 'Get metadata for a generic screen by ID',
			},
		],
		default: 'getMeta',
	},
	...genericScreenGetMetaDescription,
];
