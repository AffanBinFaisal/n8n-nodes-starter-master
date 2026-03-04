import type { INodeProperties } from 'n8n-workflow';
import { customerPortalDirRepaymentIntervalGetAllDescription } from './getAll';

const showOnlyForCustomerPortalDirRepaymentInterval = {
	resource: ['customerPortalDirRepaymentInterval'],
};

export const customerPortalDirRepaymentIntervalDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalDirRepaymentInterval,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get directory repayment interval list',
				description: 'Get list (Customer Portal directory repayment interval)',
			},
		],
		default: 'getAll',
	},
	...customerPortalDirRepaymentIntervalGetAllDescription,
];
