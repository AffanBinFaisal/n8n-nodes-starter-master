import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserCalendarReminderGetAll = {
	operation: ['getAll'],
	resource: ['userCalendarReminder'],
};

export const userCalendarReminderGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Reminder Date',
		name: 'reminderDate',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForUserCalendarReminderGetAll },
		description: 'Filter by reminder date',
		placeholder: 'e.g. 2026-03-15',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForUserCalendarReminderGetAll },
		description: 'Max number of results to return',
	},
];
