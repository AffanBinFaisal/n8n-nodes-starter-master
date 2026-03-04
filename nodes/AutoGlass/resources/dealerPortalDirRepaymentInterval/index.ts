import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirRepaymentIntervalGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalDirRepaymentInterval'] };

export const dealerPortalDirRepaymentIntervalDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get directory repayment interval list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalDirRepaymentIntervalGetAllDescription,
];
