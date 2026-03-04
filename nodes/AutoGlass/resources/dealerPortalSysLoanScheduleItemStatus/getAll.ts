import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['getAll'], resource: ['dealerPortalSysLoanScheduleItemStatus'] };

export const dealerPortalSysLoanScheduleItemStatusGetAllDescription: INodeProperties[] = [
	{ displayName: 'Limit', name: 'limit', type: 'number', typeOptions: { minValue: 1, maxValue: 1000 }, default: 50, displayOptions: { show }, description: 'Max number of results to return' },
];
