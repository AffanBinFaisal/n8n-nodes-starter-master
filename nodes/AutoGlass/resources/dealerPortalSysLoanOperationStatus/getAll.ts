import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['getAll'], resource: ['dealerPortalSysLoanOperationStatus'] };

export const dealerPortalSysLoanOperationStatusGetAllDescription: INodeProperties[] = [
	{ displayName: 'Limit', name: 'limit', type: 'number', typeOptions: { minValue: 1, maxValue: 1000 }, default: 50, displayOptions: { show }, description: 'Max number of results to return' },
];
