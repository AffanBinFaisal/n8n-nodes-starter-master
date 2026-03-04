import type { INodeProperties } from 'n8n-workflow';
import { customerPortalSysLoanScheduleItemStatusGetAllDescription } from './getAll';

const showOnlyForCustomerPortalSysLoanScheduleItemStatus = {
	resource: ['customerPortalSysLoanScheduleItemStatus'],
};

export const customerPortalSysLoanScheduleItemStatusDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalSysLoanScheduleItemStatus,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get sys loan schedule item status list',
				description: 'Get list (Customer Portal sys loan schedule item status)',
			},
		],
		default: 'getAll',
	},
	...customerPortalSysLoanScheduleItemStatusGetAllDescription,
];
