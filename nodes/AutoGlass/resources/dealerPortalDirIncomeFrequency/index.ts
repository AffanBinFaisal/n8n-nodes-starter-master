import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirIncomeFrequencyGetAllDescription } from './getAll';

const showOnlyForDealerPortalDirIncomeFrequency = {
	resource: ['dealerPortalDirIncomeFrequency'],
};

export const dealerPortalDirIncomeFrequencyDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalDirIncomeFrequency },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory income frequency list', description: 'Get list (Dealer Portal dir income frequency)' },
		],
		default: 'getAll',
	},
	...dealerPortalDirIncomeFrequencyGetAllDescription,
];

