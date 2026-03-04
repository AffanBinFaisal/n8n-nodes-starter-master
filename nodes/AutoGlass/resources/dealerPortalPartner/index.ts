import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalPartnerGetAllDescription } from './getAll';

const showOnlyForDealerPortalPartner = {
	resource: ['dealerPortalPartner'],
};

export const dealerPortalPartnerDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalPartner },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get partner list', description: 'Get list (Dealer Portal partner)' },
		],
		default: 'getAll',
	},
	...dealerPortalPartnerGetAllDescription,
];

