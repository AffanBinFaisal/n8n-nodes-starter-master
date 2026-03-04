import type { INodeProperties } from 'n8n-workflow';
import { customerPortalMyLoanGetAllDescription } from './getAll';

const showOnlyForCustomerPortalMyLoan = {
	resource: ['customerPortalMyLoan'],
};

export const customerPortalMyLoanDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalMyLoan,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get my loan list',
				description: 'Get list (Customer Portal loans)',
			},
		],
		default: 'getAll',
	},
	...customerPortalMyLoanGetAllDescription,
];
