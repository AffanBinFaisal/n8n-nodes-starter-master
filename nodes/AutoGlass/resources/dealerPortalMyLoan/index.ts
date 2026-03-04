import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalMyLoanGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalMyLoan'] };

export const dealerPortalMyLoanDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get my loan list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalMyLoanGetAllDescription,
];
