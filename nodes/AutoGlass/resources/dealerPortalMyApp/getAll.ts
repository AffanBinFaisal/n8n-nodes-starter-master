import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['getAll'], resource: ['dealerPortalMyApp'] };

export const dealerPortalMyAppGetAllDescription: INodeProperties[] = [
	{ displayName: 'Application No', name: 'applicationNo', type: 'string', default: '', displayOptions: { show }, description: 'Filter by application number' },
	{ displayName: 'Created', name: 'created', type: 'string', default: '', displayOptions: { show }, description: 'Filter by created date' },
	{ displayName: 'Limit', name: 'limit', type: 'number', typeOptions: { minValue: 1, maxValue: 1000 }, default: 50, displayOptions: { show }, description: 'Max number of results to return' },
	{ displayName: 'Rq Loan Amount', name: 'rqLoanAmount', type: 'number', default: 0, displayOptions: { show }, description: 'Filter by requested loan amount. Leave 0 to omit.' },
	{ displayName: 'Search', name: 'search', type: 'string', default: '', displayOptions: { show }, description: 'Search term' },
	{ displayName: 'Status', name: 'status', type: 'string', default: '', displayOptions: { show }, description: 'Filter by status' },
];
