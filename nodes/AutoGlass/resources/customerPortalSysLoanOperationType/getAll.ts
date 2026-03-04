import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCustomerPortalSysLoanOperationTypeGetAll = {
	operation: ['getAll'],
	resource: ['customerPortalSysLoanOperationType'],
};

export const customerPortalSysLoanOperationTypeGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForCustomerPortalSysLoanOperationTypeGetAll },
		description: 'Max number of results to return',
	},
];
