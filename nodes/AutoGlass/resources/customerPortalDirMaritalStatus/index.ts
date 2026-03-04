import type { INodeProperties } from 'n8n-workflow';
import { customerPortalDirMaritalStatusGetAllDescription } from './getAll';

const showOnlyForCustomerPortalDirMaritalStatus = {
	resource: ['customerPortalDirMaritalStatus'],
};

export const customerPortalDirMaritalStatusDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCustomerPortalDirMaritalStatus },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory marital status list', description: 'Get list (Customer Portal dir marital status)' },
		],
		default: 'getAll',
	},
	...customerPortalDirMaritalStatusGetAllDescription,
];
