import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirMarketingSourceGetAllDescription } from './getAll';

const showOnlyForDealerPortalDirMarketingSource = {
	resource: ['dealerPortalDirMarketingSource'],
};

export const dealerPortalDirMarketingSourceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalDirMarketingSource },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory marketing source list', description: 'Get list (Dealer Portal dir marketing source)' },
		],
		default: 'getAll',
	},
	...dealerPortalDirMarketingSourceGetAllDescription,
];

