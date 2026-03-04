import type { INodeProperties } from 'n8n-workflow';
import { customerPortalOngoingPaymentGetAllDescription } from './getAll';

const showOnlyForCustomerPortalOngoingPayment = {
	resource: ['customerPortalOngoingPayment'],
};

export const customerPortalOngoingPaymentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalOngoingPayment,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get ongoing payment list',
				description: 'Get list (Customer Portal ongoing payments)',
			},
		],
		default: 'getAll',
	},
	...customerPortalOngoingPaymentGetAllDescription,
];
