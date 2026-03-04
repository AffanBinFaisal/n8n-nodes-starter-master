import type { INodeProperties } from 'n8n-workflow';
import { customerPortalPaymentGetAllDescription } from './getAll';

const showOnlyForCustomerPortalPayment = {
	resource: ['customerPortalPayment'],
};

export const customerPortalPaymentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalPayment,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get payment list',
				description: 'Get list (Customer Portal payments)',
			},
		],
		default: 'getAll',
	},
	...customerPortalPaymentGetAllDescription,
];
