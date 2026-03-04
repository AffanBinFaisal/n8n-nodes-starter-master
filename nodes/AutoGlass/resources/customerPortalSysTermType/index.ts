import type { INodeProperties } from 'n8n-workflow';
import { customerPortalSysTermTypeGetAllDescription } from './getAll';

const showOnlyForCustomerPortalSysTermType = {
	resource: ['customerPortalSysTermType'],
};

export const customerPortalSysTermTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalSysTermType,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get sys term type list',
				description: 'Get list (Customer Portal sys term type)',
			},
		],
		default: 'getAll',
	},
	...customerPortalSysTermTypeGetAllDescription,
];
