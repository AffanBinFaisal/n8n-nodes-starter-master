import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirCurrentMonthDaysGetAllDescription } from './getAll';

const showOnlyForDealerPortalDirCurrentMonthDays = {
	resource: ['dealerPortalDirCurrentMonthDays'],
};

export const dealerPortalDirCurrentMonthDaysDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalDirCurrentMonthDays },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory current month days', description: 'Get list (Dealer Portal dir current month days)' },
		],
		default: 'getAll',
	},
	...dealerPortalDirCurrentMonthDaysGetAllDescription,
];

