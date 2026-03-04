import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalLoanQueueGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalLoanQueue'] };

export const dealerPortalLoanQueueDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get loan queue list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalLoanQueueGetAllDescription,
];
