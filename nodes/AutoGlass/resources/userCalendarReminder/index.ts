import type { INodeProperties } from 'n8n-workflow';
import { userCalendarReminderGetAllDescription } from './getAll';

const showOnlyForUserCalendarReminder = {
	resource: ['userCalendarReminder'],
};

export const userCalendarReminderDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForUserCalendarReminder,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get user calendar reminders',
				description: 'Get user calendar reminders with optional filters',
			},
		],
		default: 'getAll',
	},
	...userCalendarReminderGetAllDescription,
];
