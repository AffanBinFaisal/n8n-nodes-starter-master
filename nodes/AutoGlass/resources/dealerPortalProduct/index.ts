import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalProductGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalProduct'] };

export const dealerPortalProductDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get product list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalProductGetAllDescription,
];
