import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCustomerPortalSysTermTypeGetAll = {
	operation: ['getAll'],
	resource: ['customerPortalSysTermType'],
};

export const customerPortalSysTermTypeGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForCustomerPortalSysTermTypeGetAll },
		description: 'Max number of results to return',
	},
];
