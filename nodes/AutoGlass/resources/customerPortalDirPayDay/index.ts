import type { INodeProperties } from 'n8n-workflow';
import { customerPortalDirPayDayGetAllDescription } from './getAll';

const showOnlyForCustomerPortalDirPayDay = {
	resource: ['customerPortalDirPayDay'],
};

export const customerPortalDirPayDayDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCustomerPortalDirPayDay },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory pay day', description: 'Get list (Customer Portal dir pay day)' },
		],
		default: 'getAll',
	},
	...customerPortalDirPayDayGetAllDescription,
];
