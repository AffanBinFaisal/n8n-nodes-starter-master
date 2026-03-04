import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCustomerPortalDirCurrencyGetAll = {
	operation: ['getAll'],
	resource: ['customerPortalDirCurrency'],
};

export const customerPortalDirCurrencyGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForCustomerPortalDirCurrencyGetAll },
		description: 'Max number of results to return',
	},
];
