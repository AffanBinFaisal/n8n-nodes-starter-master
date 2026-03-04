import type { INodeProperties } from 'n8n-workflow';
import { customerPortalDirIncomeFrequencyGetAllDescription } from './getAll';

const showOnlyForCustomerPortalDirIncomeFrequency = {
	resource: ['customerPortalDirIncomeFrequency'],
};

export const customerPortalDirIncomeFrequencyDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCustomerPortalDirIncomeFrequency },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory income frequency list', description: 'Get list (Customer Portal dir income frequency)' },
		],
		default: 'getAll',
	},
	...customerPortalDirIncomeFrequencyGetAllDescription,
];
