import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalSysTermTypeGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalSysTermType'] };

export const dealerPortalSysTermTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get sys term type list', description: 'Get list (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalSysTermTypeGetAllDescription,
];
