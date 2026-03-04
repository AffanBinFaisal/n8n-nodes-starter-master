import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalMyAppGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalMyApp'] };

export const dealerPortalMyAppDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get my app list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalMyAppGetAllDescription,
];
