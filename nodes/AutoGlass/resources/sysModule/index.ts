import type { INodeProperties } from 'n8n-workflow';
import { sysModuleGetAllDescription } from './getAll';

const showOnlyForSysModule = {
	resource: ['sysModule'],
};

export const sysModuleDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSysModule,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get system modules',
				description: 'Get a list of system modules',
			},
		],
		default: 'getAll',
	},
	...sysModuleGetAllDescription,
];
