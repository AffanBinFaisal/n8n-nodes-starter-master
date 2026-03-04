import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirCurrencyGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalDirCurrency'] };

export const dealerPortalDirCurrencyDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get directory currency list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalDirCurrencyGetAllDescription,
];
