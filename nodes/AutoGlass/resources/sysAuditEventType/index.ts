import type { INodeProperties } from 'n8n-workflow';
import { sysAuditEventTypeGetAllDescription } from './getAll';

const showOnlyForSysAuditEventType = {
	resource: ['sysAuditEventType'],
};

export const sysAuditEventTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSysAuditEventType,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get system audit event types',
				description: 'Get system audit event types with optional filters',
			},
		],
		default: 'getAll',
	},
	...sysAuditEventTypeGetAllDescription,
];
