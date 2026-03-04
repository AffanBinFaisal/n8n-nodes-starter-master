import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['getAll'], resource: ['customerPortalDirMaritalStatus'] };

export const customerPortalDirMaritalStatusGetAllDescription: INodeProperties[] = [
	{ displayName: 'Cbs Code', name: 'cbsCode', type: 'string', default: '', displayOptions: { show }, description: 'Filter by cbs_code' },
	{ displayName: 'Changed By Username', name: 'changedByUsername', type: 'string', default: '', displayOptions: { show }, description: 'Filter by changed by username' },
	{ displayName: 'Code', name: 'code', type: 'string', default: '', displayOptions: { show }, description: 'Filter by code' },
	{ displayName: 'Created', name: 'created', type: 'string', default: '', displayOptions: { show }, description: 'Filter by created' },
	{ displayName: 'ID', name: 'id', type: 'string', default: '', displayOptions: { show }, description: 'Filter by ID' },
	{ displayName: 'Limit', name: 'limit', type: 'number', typeOptions: { minValue: 1, maxValue: 1000 }, default: 50, displayOptions: { show }, description: 'Max number of results to return' },
	{ displayName: 'Name', name: 'name', type: 'string', default: '', displayOptions: { show }, description: 'Filter by name' },
	{ displayName: 'Pk Record ID', name: 'pkRecordId', type: 'string', default: '', displayOptions: { show }, description: 'Filter by pk_record_id' },
	{ displayName: 'Search', name: 'search', type: 'string', default: '', displayOptions: { show }, description: 'Search term' },
	{ displayName: 'Updated', name: 'updated', type: 'string', default: '', displayOptions: { show }, description: 'Filter by updated' },
];
