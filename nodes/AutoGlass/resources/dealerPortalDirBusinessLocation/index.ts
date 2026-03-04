import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirBusinessLocationGetAllDescription } from './getAll';

const showOnlyForDealerPortalDirBusinessLocation = {
	resource: ['dealerPortalDirBusinessLocation'],
};

export const dealerPortalDirBusinessLocationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalDirBusinessLocation },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory business location list', description: 'Get list (Dealer Portal dir business location)' },
		],
		default: 'getAll',
	},
	...dealerPortalDirBusinessLocationGetAllDescription,
];

