import type { INodeProperties } from 'n8n-workflow';
import { customerPortalLoanQueueGetAllDescription } from './getAll';

const showOnlyForCustomerPortalLoanQueue = {
	resource: ['customerPortalLoanQueue'],
};

export const customerPortalLoanQueueDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalLoanQueue,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get loan queue list',
				description: 'Get list (Customer Portal loan queue)',
			},
		],
		default: 'getAll',
	},
	...customerPortalLoanQueueGetAllDescription,
];
