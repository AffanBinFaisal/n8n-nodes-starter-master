import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirIndustryGetAllDescription } from './getAll';

const showOnlyForDealerPortalDirIndustry = {
	resource: ['dealerPortalDirIndustry'],
};

export const dealerPortalDirIndustryDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalDirIndustry },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory industry list', description: 'Get list (Dealer Portal dir industry)' },
		],
		default: 'getAll',
	},
	...dealerPortalDirIndustryGetAllDescription,
];

