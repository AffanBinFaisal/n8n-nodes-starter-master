import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalLoanAppQueueGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalLoanAppQueue'] };

export const dealerPortalLoanAppQueueDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get loan app queue list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalLoanAppQueueGetAllDescription,
];
