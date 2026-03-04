import type { INodeProperties } from 'n8n-workflow';
import { customerPortalSysRateTypeGetAllDescription } from './getAll';

const showOnlyForCustomerPortalSysRateType = {
	resource: ['customerPortalSysRateType'],
};

export const customerPortalSysRateTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalSysRateType,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get sys rate type list',
				description: 'Get list (Customer Portal sys rate type)',
			},
		],
		default: 'getAll',
	},
	...customerPortalSysRateTypeGetAllDescription,
];
