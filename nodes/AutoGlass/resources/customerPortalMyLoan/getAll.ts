import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCustomerPortalMyLoanGetAll = {
	operation: ['getAll'],
	resource: ['customerPortalMyLoan'],
};

export const customerPortalMyLoanGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Agreement Number',
		name: 'agreementNumber',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForCustomerPortalMyLoanGetAll },
		description: 'Filter by agreement number',
	},
	{
		displayName: 'Disburse Date',
		name: 'disburseDate',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForCustomerPortalMyLoanGetAll },
		description: 'Filter by disburse date',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForCustomerPortalMyLoanGetAll },
		description: 'Max number of results to return',
	},
	{
		displayName: 'Maturity Date',
		name: 'maturityDate',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForCustomerPortalMyLoanGetAll },
		description: 'Filter by maturity date',
	},
	{
		displayName: 'Outstanding Amount',
		name: 'outstandingAmount',
		type: 'number',
		default: 0,
		displayOptions: { show: showOnlyForCustomerPortalMyLoanGetAll },
		description: 'Filter by outstanding amount. Leave 0 to omit.',
	},
	{
		displayName: 'Payment Amount',
		name: 'paymentAmount',
		type: 'number',
		default: 0,
		displayOptions: { show: showOnlyForCustomerPortalMyLoanGetAll },
		description: 'Filter by payment amount. Leave 0 to omit.',
	},
	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForCustomerPortalMyLoanGetAll },
		description: 'Search term',
	},
	{
		displayName: 'Total Amount',
		name: 'totalAmount',
		type: 'number',
		default: 0,
		displayOptions: { show: showOnlyForCustomerPortalMyLoanGetAll },
		description: 'Filter by total amount. Leave 0 to omit.',
	},
];
