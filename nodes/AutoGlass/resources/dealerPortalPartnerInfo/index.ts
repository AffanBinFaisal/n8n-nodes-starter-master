import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalPartnerInfoGetAllDescription } from './getAll';

const showOnlyForDealerPortalPartnerInfo = {
	resource: ['dealerPortalPartnerInfo'],
};

export const dealerPortalPartnerInfoDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalPartnerInfo },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get partner info list', description: 'Get list (Dealer Portal partner info)' },
		],
		default: 'getAll',
	},
	...dealerPortalPartnerInfoGetAllDescription,
];

