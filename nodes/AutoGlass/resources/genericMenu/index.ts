import type { INodeProperties } from 'n8n-workflow';
import { genericMenuGetAllDescription } from './getAll';

const showOnlyForGenericMenu = {
	resource: ['genericMenu'],
};

export const genericMenuDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForGenericMenu,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get generic menu',
				description: 'Get generic menu for the system module',
			},
		],
		default: 'getAll',
	},
	...genericMenuGetAllDescription,
];
