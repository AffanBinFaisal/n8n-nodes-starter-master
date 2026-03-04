import type { INodeProperties } from 'n8n-workflow';
import { customerPortalProductGetAllDescription } from './getAll';

const showOnlyForCustomerPortalProduct = {
	resource: ['customerPortalProduct'],
};

export const customerPortalProductDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalProduct,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get product list',
				description: 'Get list (Customer Portal products)',
			},
		],
		default: 'getAll',
	},
	...customerPortalProductGetAllDescription,
];
