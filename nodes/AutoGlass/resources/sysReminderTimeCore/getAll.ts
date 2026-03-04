import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSysReminderTimeCoreGetAll = {
	operation: ['getAll'],
	resource: ['sysReminderTimeCore'],
};

export const sysReminderTimeCoreGetAllDescription: INodeProperties[] = [
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForSysReminderTimeCoreGetAll },
		description: 'Filter by reminder time ID',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForSysReminderTimeCoreGetAll },
		description: 'Filter by reminder time name',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForSysReminderTimeCoreGetAll },
		description: 'Max number of results to return',
	},
];
