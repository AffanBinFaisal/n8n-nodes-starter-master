import type { INodeProperties } from 'n8n-workflow';
import { customerPortalSysLoanStatusGetAllDescription } from './getAll';

const showOnlyForCustomerPortalSysLoanStatus = {
	resource: ['customerPortalSysLoanStatus'],
};

export const customerPortalSysLoanStatusDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalSysLoanStatus,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get sys loan status list',
				description: 'Get list (Customer Portal sys loan status)',
			},
		],
		default: 'getAll',
	},
	...customerPortalSysLoanStatusGetAllDescription,
];
