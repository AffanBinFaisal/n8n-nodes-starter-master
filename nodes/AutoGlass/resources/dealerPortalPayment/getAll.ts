import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['getAll'], resource: ['dealerPortalPayment'] };

export const dealerPortalPaymentGetAllDescription: INodeProperties[] = [
	{ displayName: 'Agreement Number', name: 'agreementNumber', type: 'string', default: '', displayOptions: { show }, description: 'Filter by agreement number' },
	{ displayName: 'Limit', name: 'limit', type: 'number', typeOptions: { minValue: 1, maxValue: 1000 }, default: 50, displayOptions: { show }, description: 'Max number of results to return' },
	{ displayName: 'Payment Amount', name: 'paymentAmount', type: 'number', default: 0, displayOptions: { show }, description: 'Filter by payment amount. Leave 0 to omit.' },
	{ displayName: 'Payment Date', name: 'paymentDate', type: 'string', default: '', displayOptions: { show }, description: 'Filter by payment date' },
	{ displayName: 'Search', name: 'search', type: 'string', default: '', displayOptions: { show }, description: 'Search term' },
	{ displayName: 'Sys Loan Schedule Item Status ID', name: 'sysLoanScheduleItemStatusId', type: 'string', default: '', displayOptions: { show }, description: 'Filter by loan schedule item status ID' },
];
