import type { INodeProperties } from 'n8n-workflow';
import { sysLangGetAllDescription } from './getAll';

const showOnlyForSysLang = {
	resource: ['sysLang'],
};

export const sysLangDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSysLang,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get system languages',
				description: 'Get a list of system languages',
			},
		],
		default: 'getAll',
	},
	...sysLangGetAllDescription,
];
