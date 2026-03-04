import type { INodeProperties } from 'n8n-workflow';
import { customerPortalDirCitizenshipGetAllDescription } from './getAll';

const showOnlyForCustomerPortalDirCitizenship = {
	resource: ['customerPortalDirCitizenship'],
};

export const customerPortalDirCitizenshipDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCustomerPortalDirCitizenship },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory citizenship list', description: 'Get list (Customer Portal dir citizenship)' },
		],
		default: 'getAll',
	},
	...customerPortalDirCitizenshipGetAllDescription,
];
