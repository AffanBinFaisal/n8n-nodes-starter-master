import type { INodeProperties } from 'n8n-workflow';
import { customerPortalSysLoanOperationStatusGetAllDescription } from './getAll';

const showOnlyForCustomerPortalSysLoanOperationStatus = {
	resource: ['customerPortalSysLoanOperationStatus'],
};

export const customerPortalSysLoanOperationStatusDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalSysLoanOperationStatus,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get sys loan operation status list',
				description: 'Get list (Customer Portal sys loan operation status)',
			},
		],
		default: 'getAll',
	},
	...customerPortalSysLoanOperationStatusGetAllDescription,
];
