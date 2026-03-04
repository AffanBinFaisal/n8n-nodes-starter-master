import type { INodeProperties } from 'n8n-workflow';
import { customerPortalSysLoanOperationTypeGetAllDescription } from './getAll';

const showOnlyForCustomerPortalSysLoanOperationType = {
	resource: ['customerPortalSysLoanOperationType'],
};

export const customerPortalSysLoanOperationTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalSysLoanOperationType,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get sys loan operation type list',
				description: 'Get list (Customer Portal sys loan operation type)',
			},
		],
		default: 'getAll',
	},
	...customerPortalSysLoanOperationTypeGetAllDescription,
];
