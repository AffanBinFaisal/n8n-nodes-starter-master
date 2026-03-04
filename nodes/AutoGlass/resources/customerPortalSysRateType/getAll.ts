import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCustomerPortalSysRateTypeGetAll = {
	operation: ['getAll'],
	resource: ['customerPortalSysRateType'],
};

export const customerPortalSysRateTypeGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForCustomerPortalSysRateTypeGetAll },
		description: 'Max number of results to return',
	},
];
