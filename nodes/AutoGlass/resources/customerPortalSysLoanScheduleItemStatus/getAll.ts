import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCustomerPortalSysLoanScheduleItemStatusGetAll = {
	operation: ['getAll'],
	resource: ['customerPortalSysLoanScheduleItemStatus'],
};

export const customerPortalSysLoanScheduleItemStatusGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForCustomerPortalSysLoanScheduleItemStatusGetAll },
		description: 'Max number of results to return',
	},
];
