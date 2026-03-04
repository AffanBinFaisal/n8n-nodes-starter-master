import type { INodeProperties } from 'n8n-workflow';
import { customerPortalKycValidationGetAllDescription } from './getAll';

const showOnlyForCustomerPortalKycValidation = {
	resource: ['customerPortalKycValidation'],
};

export const customerPortalKycValidationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomerPortalKycValidation,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get KYC validation',
				description: 'Get KYC validation (Customer Portal)',
			},
		],
		default: 'getAll',
	},
	...customerPortalKycValidationGetAllDescription,
];
