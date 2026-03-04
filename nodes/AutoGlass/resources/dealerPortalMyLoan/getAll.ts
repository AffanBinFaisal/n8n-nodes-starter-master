import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['getAll'], resource: ['dealerPortalMyLoan'] };

export const dealerPortalMyLoanGetAllDescription: INodeProperties[] = [
	{ displayName: 'Agreement Number', name: 'agreementNumber', type: 'string', default: '', displayOptions: { show }, description: 'Filter by agreement number' },
	{ displayName: 'Disburse Date', name: 'disburseDate', type: 'string', default: '', displayOptions: { show }, description: 'Filter by disburse date' },
	{ displayName: 'Limit', name: 'limit', type: 'number', typeOptions: { minValue: 1, maxValue: 1000 }, default: 50, displayOptions: { show }, description: 'Max number of results to return' },
	{ displayName: 'Maturity Date', name: 'maturityDate', type: 'string', default: '', displayOptions: { show }, description: 'Filter by maturity date' },
	{ displayName: 'Outstanding Amount', name: 'outstandingAmount', type: 'number', default: 0, displayOptions: { show }, description: 'Filter by outstanding amount. Leave 0 to omit.' },
	{ displayName: 'Payment Amount', name: 'paymentAmount', type: 'number', default: 0, displayOptions: { show }, description: 'Filter by payment amount. Leave 0 to omit.' },
	{ displayName: 'Search', name: 'search', type: 'string', default: '', displayOptions: { show }, description: 'Search term' },
	{ displayName: 'Total Amount', name: 'totalAmount', type: 'number', default: 0, displayOptions: { show }, description: 'Filter by total amount. Leave 0 to omit.' },
];
