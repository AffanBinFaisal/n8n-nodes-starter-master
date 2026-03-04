import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalSysLoanOperationTypeGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalSysLoanOperationType'] };

export const dealerPortalSysLoanOperationTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get sys loan operation type list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalSysLoanOperationTypeGetAllDescription,
];
