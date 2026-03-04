import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirJobPositionGetAllDescription } from './getAll';

const showOnlyForDealerPortalDirJobPosition = {
	resource: ['dealerPortalDirJobPosition'],
};

export const dealerPortalDirJobPositionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalDirJobPosition },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory job position list', description: 'Get list (Dealer Portal dir job position)' },
		],
		default: 'getAll',
	},
	...dealerPortalDirJobPositionGetAllDescription,
];

