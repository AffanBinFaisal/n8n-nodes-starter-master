import type {
	IExecuteFunctions,
	IDataObject,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { autoGlassApiRequest } from './transport';

export type AuthContext = { token: string; apiKey: string; baseUrl: string };

export type ExecuteResult =
	| { response: IDataObject }
	| { pushRows: IDataObject[] };

export type ExecuteHandler = (
	this: IExecuteFunctions,
	itemIndex: number,
	authContext: AuthContext,
) => Promise<ExecuteResult>;

async function userGetProfile(
	this: IExecuteFunctions,
	_itemIndex: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/core/sys-user/current',
	);
	return { response };
}

async function userGetAll(
	this: IExecuteFunctions,
	_itemIndex: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/core/sys-user',
	);
	return { response };
}

async function loanGetLoans(
	this: IExecuteFunctions,
	_itemIndex: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/loan',
	);
	return { response };
}

async function sysAuditEventTypeGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const acceptLanguage = this.getNodeParameter('acceptLanguage', i, 'en') as string;
	const id = this.getNodeParameter('id', i, '') as string;
	const name = this.getNodeParameter('name', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, string | number> = {};
	if (id) qs.id = id;
	if (name) qs.name = name;
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/core/sys-audit-event-type-core', {
		qs,
		headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : undefined,
	});
	return { response };
}

async function genericMenuGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const credentials = await this.getCredentials('autoGlassApi');
	const sysModuleId = (credentials.sysModuleId as string) || 'los-retail';
	const acceptLanguage = this.getNodeParameter('acceptLanguage', i, 'en') as string;
	const isDev = this.getNodeParameter('isDev', i, false) as boolean;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `/api/v1/core/${encodeURIComponent(sysModuleId)}/generic-menu`, {
		qs: { isDev },
		headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : undefined,
	});
	return { response };
}

async function auditLogGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const credentials = await this.getCredentials('autoGlassApi');
	const acceptLanguage = this.getNodeParameter('acceptLanguage', i, 'en') as string;
	const id = this.getNodeParameter('id', i, 0) as number;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const sysModuleIdParam = this.getNodeParameter('sysModuleId', i, '') as string;
	const sysModuleId = sysModuleIdParam || (credentials.sysModuleId as string) || undefined;
	const output = this.getNodeParameter('output', i, 'full') as 'full' | 'rows';
	const qs: Record<string, string | number> = {};
	if (id > 0) qs.id = id;
	if (limit) qs.limit = limit;
	if (sysModuleId) qs.sys_module_id = sysModuleId;
	const auditResponse = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/core/audit-log-core', {
		qs,
		headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : undefined,
	});
	if (output === 'rows') {
		const data = (auditResponse as IDataObject).data;
		const rows = Array.isArray(data) ? data : [];
		return { pushRows: rows as IDataObject[] };
	}
	return { response: auditResponse };
}

async function genericScreenGetMeta(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const screenId = this.getNodeParameter('screenId', i) as string;
	if (!screenId?.trim()) {
		throw new NodeOperationError(this.getNode(), 'Screen ID is required', { itemIndex: i });
	}
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		`/api/v1/core/core/generic-screen/${encodeURIComponent(screenId.trim())}/meta`,
	);
	return { response };
}

async function systemStatisticsGet(
	this: IExecuteFunctions,
	_itemIndex: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(this, authContext, 'POST', '/api/v1/core/system_statistics', {
		body: {},
	});
	return { response };
}

export const OPERATION_HANDLERS: Record<string, Record<string, ExecuteHandler>> = {
	user: { getProfile: userGetProfile, getAll: userGetAll },
	loan: { getLoans: loanGetLoans },
	sysAuditEventType: { getAll: sysAuditEventTypeGetAll },
	genericMenu: { getAll: genericMenuGetAll },
	auditLog: { getAll: auditLogGetAll },
	genericScreen: { getMeta: genericScreenGetMeta },
	systemStatistics: { get: systemStatisticsGet },
};
