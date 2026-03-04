import type { INodeProperties } from 'n8n-workflow';
import { dealerPortalApplicantGetAllDescription } from './getAll';

const showOnlyForDealerPortalApplicant = {
	resource: ['dealerPortalApplicant'],
};

export const dealerPortalApplicantDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDealerPortalApplicant },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get applicant list', description: 'Get list (Dealer Portal applicant)' },
		],
		default: 'getAll',
	},
	...dealerPortalApplicantGetAllDescription,
];

