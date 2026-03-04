import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCustomerPortalDirRepaymentIntervalGetAll = {
	operation: ['getAll'],
	resource: ['customerPortalDirRepaymentInterval'],
};

export const customerPortalDirRepaymentIntervalGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForCustomerPortalDirRepaymentIntervalGetAll },
		description: 'Max number of results to return',
	},
];
