import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCustomerPortalProductGetAll = {
	operation: ['getAll'],
	resource: ['customerPortalProduct'],
};

export const customerPortalProductGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForCustomerPortalProductGetAll },
		description: 'Max number of results to return',
	},
];
