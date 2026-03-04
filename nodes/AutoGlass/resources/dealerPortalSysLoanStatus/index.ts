import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalSysLoanStatusGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalSysLoanStatus'] };

export const dealerPortalSysLoanStatusDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get sys loan status list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalSysLoanStatusGetAllDescription,
];
