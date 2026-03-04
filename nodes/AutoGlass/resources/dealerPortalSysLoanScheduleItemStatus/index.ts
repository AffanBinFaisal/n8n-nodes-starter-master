import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalSysLoanScheduleItemStatusGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalSysLoanScheduleItemStatus'] };

export const dealerPortalSysLoanScheduleItemStatusDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get sys loan schedule item status list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalSysLoanScheduleItemStatusGetAllDescription,
];
