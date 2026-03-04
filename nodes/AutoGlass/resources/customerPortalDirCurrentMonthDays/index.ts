import type { INodeProperties } from 'n8n-workflow';
import { customerPortalDirCurrentMonthDaysGetAllDescription } from './getAll';

const showOnlyForCustomerPortalDirCurrentMonthDays = {
	resource: ['customerPortalDirCurrentMonthDays'],
};

export const customerPortalDirCurrentMonthDaysDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCustomerPortalDirCurrentMonthDays },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory current month days', description: 'Get list (Customer Portal dir current month days)' },
		],
		default: 'getAll',
	},
	...customerPortalDirCurrentMonthDaysGetAllDescription,
];
