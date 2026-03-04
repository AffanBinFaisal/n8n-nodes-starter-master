import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirBusinessRoleGetAllDescription } from './getAll';

const showOnlyForDealerPortalDirBusinessRole = {
	resource: ['dealerPortalDirBusinessRole'],
};

export const dealerPortalDirBusinessRoleDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalDirBusinessRole },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory business role list', description: 'Get list (Dealer Portal dir business role)' },
		],
		default: 'getAll',
	},
	...dealerPortalDirBusinessRoleGetAllDescription,
];

