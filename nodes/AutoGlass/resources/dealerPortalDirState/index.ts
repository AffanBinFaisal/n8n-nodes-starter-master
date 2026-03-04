import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirStateGetAllDescription } from './getAll';

const showOnlyForDealerPortalDirState = {
	resource: ['dealerPortalDirState'],
};

export const dealerPortalDirStateDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalDirState },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory state list', description: 'Get list (Dealer Portal dir state)' },
		],
		default: 'getAll',
	},
	...dealerPortalDirStateGetAllDescription,
];

