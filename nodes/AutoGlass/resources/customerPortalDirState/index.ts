import type { INodeProperties } from 'n8n-workflow';
import { customerPortalDirStateGetAllDescription } from './getAll';

const showOnlyForCustomerPortalDirState = {
	resource: ['customerPortalDirState'],
};

export const customerPortalDirStateDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCustomerPortalDirState },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory state list', description: 'Get list (Customer Portal dir state)' },
		],
		default: 'getAll',
	},
	...customerPortalDirStateGetAllDescription,
];
