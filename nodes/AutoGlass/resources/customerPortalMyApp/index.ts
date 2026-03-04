import type { INodeProperties } from 'n8n-workflow';
import { customerPortalMyAppGetAllDescription } from './getAll';

const showOnlyForCustomerPortalMyApp = {
	resource: ['customerPortalMyApp'],
};

export const customerPortalMyAppDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalMyApp,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get my app list',
				description: 'Get list (Customer Portal payment/applications)',
			},
		],
		default: 'getAll',
	},
	...customerPortalMyAppGetAllDescription,
];
