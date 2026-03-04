import type { INodeProperties } from 'n8n-workflow';
import { sysReminderTimeCoreGetAllDescription } from './getAll';

const showOnlyForSysReminderTimeCore = {
	resource: ['sysReminderTimeCore'],
};

export const sysReminderTimeCoreDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSysReminderTimeCore,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get reminder times',
				description: 'Get system reminder times with optional filters',
			},
		],
		default: 'getAll',
	},
	...sysReminderTimeCoreGetAllDescription,
];
