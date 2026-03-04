import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalSysLoanOperationStatusGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalSysLoanOperationStatus'] };

export const dealerPortalSysLoanOperationStatusDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get sys loan operation status list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalSysLoanOperationStatusGetAllDescription,
];
