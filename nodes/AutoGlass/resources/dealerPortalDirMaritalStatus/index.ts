import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirMaritalStatusGetAllDescription } from './getAll';

const showOnlyForDealerPortalDirMaritalStatus = {
	resource: ['dealerPortalDirMaritalStatus'],
};

export const dealerPortalDirMaritalStatusDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalDirMaritalStatus },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory marital status list', description: 'Get list (Dealer Portal dir marital status)' },
		],
		default: 'getAll',
	},
	...dealerPortalDirMaritalStatusGetAllDescription,
];

