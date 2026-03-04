import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSysReminderStatusCoreGetAll = {
	operation: ['getAll'],
	resource: ['sysReminderStatusCore'],
};

export const sysReminderStatusCoreGetAllDescription: INodeProperties[] = [
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForSysReminderStatusCoreGetAll },
		description: 'Filter by reminder status ID',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForSysReminderStatusCoreGetAll },
		description: 'Filter by reminder status name',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForSysReminderStatusCoreGetAll },
		description: 'Max number of results to return',
	},
];
