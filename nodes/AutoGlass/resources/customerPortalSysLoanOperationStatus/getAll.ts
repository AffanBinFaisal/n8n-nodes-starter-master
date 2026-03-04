import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCustomerPortalSysLoanOperationStatusGetAll = {
	operation: ['getAll'],
	resource: ['customerPortalSysLoanOperationStatus'],
};

export const customerPortalSysLoanOperationStatusGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForCustomerPortalSysLoanOperationStatusGetAll },
		description: 'Max number of results to return',
	},
];
