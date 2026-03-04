import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCustomerPortalSysLoanStatusGetAll = {
	operation: ['getAll'],
	resource: ['customerPortalSysLoanStatus'],
};

export const customerPortalSysLoanStatusGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForCustomerPortalSysLoanStatusGetAll },
		description: 'Max number of results to return',
	},
];
