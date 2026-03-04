import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirAnnualGrossRevenueGetAllDescription } from './getAll';

const showOnlyForDealerPortalDirAnnualGrossRevenue = {
	resource: ['dealerPortalDirAnnualGrossRevenue'],
};

export const dealerPortalDirAnnualGrossRevenueDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalDirAnnualGrossRevenue },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory annual gross revenue list', description: 'Get list (Dealer Portal dir annual gross revenue)' },
		],
		default: 'getAll',
	},
	...dealerPortalDirAnnualGrossRevenueGetAllDescription,
];

