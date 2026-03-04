import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalPaymentGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalPayment'] };

export const dealerPortalPaymentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get payment list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalPaymentGetAllDescription,
];
