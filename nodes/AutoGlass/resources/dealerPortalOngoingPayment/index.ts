import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalOngoingPaymentGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalOngoingPayment'] };

export const dealerPortalOngoingPaymentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get ongoing payment list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalOngoingPaymentGetAllDescription,
];
