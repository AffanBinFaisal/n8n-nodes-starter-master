import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSysAuditEventTypeGetAll = {
	operation: ['getAll'],
	resource: ['sysAuditEventType'],
};

export const sysAuditEventTypeGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Accept-Language',
		name: 'acceptLanguage',
		type: 'string',
		default: 'en',
		displayOptions: { show: showOnlyForSysAuditEventTypeGetAll },
		description:
			'Language for localized fields (e.g. name). Same as browser Accept-Language; use "en", "en-US", etc. so the API returns full names instead of null.',
	},
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForSysAuditEventTypeGetAll },
		description: 'Filter by audit event type ID',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForSysAuditEventTypeGetAll },
		description: 'Filter by audit event type name',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForSysAuditEventTypeGetAll },
		description: 'Max number of results to return',
	},
];
