import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAuditLogGetAll = {
	operation: ['getAll'],
	resource: ['auditLog'],
};

export const auditLogGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		default: 'full',
		displayOptions: { show: showOnlyForAuditLogGetAll },
		options: [
			{
				name: 'Full (Entity + Columns + Data)',
				value: 'full',
				description: 'Same as API: one item with entity, columns, and data array',
			},
			{
				name: 'Data Rows Only',
				value: 'rows',
				description: 'One output item per audit log record (easier to loop in workflows)',
			},
		],
		description: 'Full response matches browser; rows splits each record into its own item',
	},
	{
		displayName: 'Accept Language',
		name: 'acceptLanguage',
		type: 'string',
		default: 'en',
		displayOptions: { show: showOnlyForAuditLogGetAll },
		description:
			'Language for localized fields. Use "en", "en-US", etc. so the API returns full text instead of null.',
	},
	{
		displayName: 'ID',
		name: 'id',
		type: 'number',
		default: 0,
		displayOptions: { show: showOnlyForAuditLogGetAll },
		description: 'Filter by audit log entry ID. Leave 0 to omit.',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 1000 },
		default: 50,
		displayOptions: { show: showOnlyForAuditLogGetAll },
		description: 'Max number of results to return',
	},
	{
		displayName: 'Sys Module ID',
		name: 'sysModuleId',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForAuditLogGetAll },
		description:
			'Filter by system module. Leave empty to use the module from credentials.',
	},
];
