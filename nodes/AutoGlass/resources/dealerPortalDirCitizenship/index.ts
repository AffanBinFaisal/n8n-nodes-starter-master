import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirCitizenshipGetAllDescription } from './getAll';

const showOnlyForDealerPortalDirCitizenship = {
	resource: ['dealerPortalDirCitizenship'],
};

export const dealerPortalDirCitizenshipDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalDirCitizenship },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory citizenship list', description: 'Get list (Dealer Portal dir citizenship)' },
		],
		default: 'getAll',
	},
	...dealerPortalDirCitizenshipGetAllDescription,
];

