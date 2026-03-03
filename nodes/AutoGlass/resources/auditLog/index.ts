import type { INodeProperties } from 'n8n-workflow';
import { auditLogGetAllDescription } from './getAll';

const showOnlyForAuditLog = {
	resource: ['auditLog'],
};

export const auditLogDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAuditLog,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get audit log entries',
				description: 'Get audit log entries with optional filters',
			},
		],
		default: 'getAll',
	},
	...auditLogGetAllDescription,
];
