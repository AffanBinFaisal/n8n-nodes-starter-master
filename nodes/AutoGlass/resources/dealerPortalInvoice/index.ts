import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalInvoiceGetAllDescription } from './getAll';

const showOnlyForDealerPortalInvoice = {
	resource: ['dealerPortalInvoice'],
};

export const dealerPortalInvoiceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalInvoice },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get invoice list', description: 'Get list (Dealer Portal invoice)' },
		],
		default: 'getAll',
	},
	...dealerPortalInvoiceGetAllDescription,
];

