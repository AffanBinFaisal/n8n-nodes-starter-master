import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalKycValidationGetAllDescription } from './getAll';

const show = { resource: ['dealerPortalKycValidation'] };

export const dealerPortalKycValidationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [{ name: 'Get Many', value: 'getAll', action: 'Get KYC validation', description: 'Get KYC validation (Dealer Portal)' }],
		default: 'getAll',
	},
	...dealerPortalKycValidationGetAllDescription,
];
