import type { INodeProperties } from 'n8n-workflow';
import { customerPortalLoanAppQueueGetAllDescription } from './getAll';

const showOnlyForCustomerPortalLoanAppQueue = {
	resource: ['customerPortalLoanAppQueue'],
};

export const customerPortalLoanAppQueueDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalLoanAppQueue,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get loan app queue list',
				description: 'Get list (Customer Portal loan application queue)',
			},
		],
		default: 'getAll',
	},
	...customerPortalLoanAppQueueGetAllDescription,
];
