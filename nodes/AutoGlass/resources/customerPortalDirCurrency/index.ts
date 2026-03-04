import type { INodeProperties } from 'n8n-workflow';
import { customerPortalDirCurrencyGetAllDescription } from './getAll';

const showOnlyForCustomerPortalDirCurrency = {
	resource: ['customerPortalDirCurrency'],
};

export const customerPortalDirCurrencyDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalDirCurrency,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get directory currency list',
				description: 'Get list (Customer Portal directory currency)',
			},
		],
		default: 'getAll',
	},
	...customerPortalDirCurrencyGetAllDescription,
];
