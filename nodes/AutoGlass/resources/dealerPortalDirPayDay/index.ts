import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirPayDayGetAllDescription } from './getAll';

const showOnlyForDealerPortalDirPayDay = {
	resource: ['dealerPortalDirPayDay'],
};

export const dealerPortalDirPayDayDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalDirPayDay },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory pay day', description: 'Get list (Dealer Portal dir pay day)' },
		],
		default: 'getAll',
	},
	...dealerPortalDirPayDayGetAllDescription,
];

