import type { INodeProperties } from 'n8n-workflow';
import { customerPortalDirJobPositionGetAllDescription } from './getAll';

const showOnlyForCustomerPortalDirJobPosition = {
	resource: ['customerPortalDirJobPosition'],
};

export const customerPortalDirJobPositionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCustomerPortalDirJobPosition },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory job position list', description: 'Get list (Customer Portal dir job position)' },
		],
		default: 'getAll',
	},
	...customerPortalDirJobPositionGetAllDescription,
];
