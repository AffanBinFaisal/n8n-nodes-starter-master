import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalDirAttachmentTypeGetAllDescription } from './getAll';

const showOnlyForDealerPortalDirAttachmentType = {
	resource: ['dealerPortalDirAttachmentType'],
};

export const dealerPortalDirAttachmentTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalDirAttachmentType },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get directory attachment type list', description: 'Get list (Dealer Portal dir attachment type)' },
		],
		default: 'getAll',
	},
	...dealerPortalDirAttachmentTypeGetAllDescription,
];

