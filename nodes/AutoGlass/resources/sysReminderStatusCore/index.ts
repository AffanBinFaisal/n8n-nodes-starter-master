import type { INodeProperties } from 'n8n-workflow';
import { sysReminderStatusCoreGetAllDescription } from './getAll';

const showOnlyForSysReminderStatusCore = {
	resource: ['sysReminderStatusCore'],
};

export const sysReminderStatusCoreDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSysReminderStatusCore,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get reminder statuses',
				description: 'Get system reminder statuses with optional filters',
			},
		],
		default: 'getAll',
	},
	...sysReminderStatusCoreGetAllDescription,
];
