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

async function sysModuleGetAll(
	this: IExecuteFunctions,
	_itemIndex: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/core/sys-module');
	return { response };
}

async function sysLangGetAll(
	this: IExecuteFunctions,
	_itemIndex: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/core/sys-lang');
	return { response };
}

async function userCalendarReminderGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, '') as string;
	const reminderDate = this.getNodeParameter('reminderDate', i, '') as string;
	const qs: Record<string, string> = {};
	if (limit) qs.limit = limit;
	if (reminderDate) qs.reminder_date = reminderDate;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/core/user_calendar_reminder', {
		qs: Object.keys(qs).length ? qs : undefined,
	});
	return { response };
}

async function sysReminderStatusCoreGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const id = this.getNodeParameter('id', i, '') as string;
	const name = this.getNodeParameter('name', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, string | number> = {};
	if (id) qs.id = id;
	if (name) qs.name = name;
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/core/sys_reminder_status_core', {
		qs,
	});
	return { response };
}

async function sysReminderTimeCoreGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const id = this.getNodeParameter('id', i, '') as string;
	const name = this.getNodeParameter('name', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, string | number> = {};
	if (id) qs.id = id;
	if (name) qs.name = name;
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/core/sys_reminder_time_core', {
		qs,
	});
	return { response };
}

async function customerPortalMyAppGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const applicationNo = this.getNodeParameter('applicationNo', i, '') as string;
	const created = this.getNodeParameter('created', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const rqLoanAmount = this.getNodeParameter('rqLoanAmount', i, 0) as number;
	const search = this.getNodeParameter('search', i, '') as string;
	const status = this.getNodeParameter('status', i, '') as string;
	const qs: Record<string, string | number> = {};
	if (applicationNo) qs.application_no = applicationNo;
	if (created) qs.created = created;
	if (limit) qs.limit = limit;
	if (rqLoanAmount !== 0) qs.rq_loan_amount = rqLoanAmount;
	if (search) qs.search = search;
	if (status) qs.status = status;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/customer-portal-retail/my-app', {
		qs,
	});
	return { response };
}

async function customerPortalMyLoanGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const agreementNumber = this.getNodeParameter('agreementNumber', i, '') as string;
	const disburseDate = this.getNodeParameter('disburseDate', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const maturityDate = this.getNodeParameter('maturityDate', i, '') as string;
	const outstandingAmount = this.getNodeParameter('outstandingAmount', i, 0) as number;
	const paymentAmount = this.getNodeParameter('paymentAmount', i, 0) as number;
	const search = this.getNodeParameter('search', i, '') as string;
	const totalAmount = this.getNodeParameter('totalAmount', i, 0) as number;
	const qs: Record<string, string | number> = {};
	if (agreementNumber) qs.agreement_number = agreementNumber;
	if (disburseDate) qs.disburse_date = disburseDate;
	if (limit) qs.limit = limit;
	if (maturityDate) qs.maturity_date = maturityDate;
	if (outstandingAmount !== 0) qs.outstanding_amount = outstandingAmount;
	if (paymentAmount !== 0) qs.payment_amount = paymentAmount;
	if (search) qs.search = search;
	if (totalAmount !== 0) qs.total_amount = totalAmount;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/customer-portal-retail/my-loan', {
		qs,
	});
	return { response };
}

async function customerPortalOngoingPaymentGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const agreementNumber = this.getNodeParameter('agreementNumber', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const paymentAmount = this.getNodeParameter('paymentAmount', i, 0) as number;
	const paymentDate = this.getNodeParameter('paymentDate', i, '') as string;
	const search = this.getNodeParameter('search', i, '') as string;
	const sysLoanScheduleItemStatusId = this.getNodeParameter('sysLoanScheduleItemStatusId', i, '') as string;
	const qs: Record<string, string | number> = {};
	if (agreementNumber) qs.agreement_number = agreementNumber;
	if (limit) qs.limit = limit;
	if (paymentAmount !== 0) qs.payment_amount = paymentAmount;
	if (paymentDate) qs.payment_date = paymentDate;
	if (search) qs.search = search;
	if (sysLoanScheduleItemStatusId) qs.sys_loan_schedule_item_status_id = sysLoanScheduleItemStatusId;
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/ongoing-payment',
		{ qs },
	);
	return { response };
}

async function customerPortalPaymentGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const agreementNumber = this.getNodeParameter('agreementNumber', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const paymentAmount = this.getNodeParameter('paymentAmount', i, 0) as number;
	const paymentDate = this.getNodeParameter('paymentDate', i, '') as string;
	const search = this.getNodeParameter('search', i, '') as string;
	const sysLoanScheduleItemStatusId = this.getNodeParameter('sysLoanScheduleItemStatusId', i, '') as string;
	const qs: Record<string, string | number> = {};
	if (agreementNumber) qs.agreement_number = agreementNumber;
	if (limit) qs.limit = limit;
	if (paymentAmount !== 0) qs.payment_amount = paymentAmount;
	if (paymentDate) qs.payment_date = paymentDate;
	if (search) qs.search = search;
	if (sysLoanScheduleItemStatusId) qs.sys_loan_schedule_item_status_id = sysLoanScheduleItemStatusId;
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/payment',
		{ qs },
	);
	return { response };
}

async function customerPortalLoanAppQueueGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const applicationNo = this.getNodeParameter('applicationNo', i, '') as string;
	const created = this.getNodeParameter('created', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const rqLoanAmount = this.getNodeParameter('rqLoanAmount', i, 0) as number;
	const search = this.getNodeParameter('search', i, '') as string;
	const status = this.getNodeParameter('status', i, '') as string;
	const qs: Record<string, string | number> = {};
	if (applicationNo) qs.application_no = applicationNo;
	if (created) qs.created = created;
	if (limit) qs.limit = limit;
	if (rqLoanAmount !== 0) qs.rq_loan_amount = rqLoanAmount;
	if (search) qs.search = search;
	if (status) qs.status = status;
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/loan-app-queue',
		{ qs },
	);
	return { response };
}

async function customerPortalKycValidationGetAll(
	this: IExecuteFunctions,
	_i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/kyc-validation',
	);
	return { response };
}

async function customerPortalLoanQueueGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const agreementNumber = this.getNodeParameter('agreementNumber', i, '') as string;
	const disburseDate = this.getNodeParameter('disburseDate', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const maturityDate = this.getNodeParameter('maturityDate', i, '') as string;
	const outstandingAmount = this.getNodeParameter('outstandingAmount', i, 0) as number;
	const paymentAmount = this.getNodeParameter('paymentAmount', i, 0) as number;
	const search = this.getNodeParameter('search', i, '') as string;
	const totalAmount = this.getNodeParameter('totalAmount', i, 0) as number;
	const qs: Record<string, string | number> = {};
	if (agreementNumber) qs.agreement_number = agreementNumber;
	if (disburseDate) qs.disburse_date = disburseDate;
	if (limit) qs.limit = limit;
	if (maturityDate) qs.maturity_date = maturityDate;
	if (outstandingAmount !== 0) qs.outstanding_amount = outstandingAmount;
	if (paymentAmount !== 0) qs.payment_amount = paymentAmount;
	if (search) qs.search = search;
	if (totalAmount !== 0) qs.total_amount = totalAmount;
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/loan-queue',
		{ qs },
	);
	return { response };
}

async function customerPortalProductGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/product',
		{ qs },
	);
	return { response };
}

async function customerPortalDirCurrencyGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/dir-currency',
		{ qs },
	);
	return { response };
}

async function customerPortalDirRepaymentIntervalGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/dir-repayment-interval',
		{ qs },
	);
	return { response };
}

async function customerPortalSysLoanOperationStatusGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/sys-loan-operation-status',
		{ qs },
	);
	return { response };
}

async function customerPortalSysLoanOperationTypeGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/sys-loan-operation-type',
		{ qs },
	);
	return { response };
}

async function customerPortalSysLoanScheduleItemStatusGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/sys-loan-schedule-item-status',
		{ qs },
	);
	return { response };
}

async function customerPortalSysLoanStatusGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/sys-loan-status',
		{ qs },
	);
	return { response };
}

async function customerPortalSysRateTypeGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/sys-rate-type',
		{ qs },
	);
	return { response };
}

async function customerPortalSysTermTypeGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(
		this,
		authContext,
		'GET',
		'/api/v1/customer-portal-retail/sys-term-type',
		{ qs },
	);
	return { response };
}

const DEALER_BASE = '/api/v1/dealer-portal-retail';

async function dealerPortalMyAppGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const applicationNo = this.getNodeParameter('applicationNo', i, '') as string;
	const created = this.getNodeParameter('created', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const rqLoanAmount = this.getNodeParameter('rqLoanAmount', i, 0) as number;
	const search = this.getNodeParameter('search', i, '') as string;
	const status = this.getNodeParameter('status', i, '') as string;
	const qs: Record<string, string | number> = {};
	if (applicationNo) qs.application_no = applicationNo;
	if (created) qs.created = created;
	if (limit) qs.limit = limit;
	if (rqLoanAmount !== 0) qs.rq_loan_amount = rqLoanAmount;
	if (search) qs.search = search;
	if (status) qs.status = status;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/my-app`, { qs });
	return { response };
}

async function dealerPortalMyLoanGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const agreementNumber = this.getNodeParameter('agreementNumber', i, '') as string;
	const disburseDate = this.getNodeParameter('disburseDate', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const maturityDate = this.getNodeParameter('maturityDate', i, '') as string;
	const outstandingAmount = this.getNodeParameter('outstandingAmount', i, 0) as number;
	const paymentAmount = this.getNodeParameter('paymentAmount', i, 0) as number;
	const search = this.getNodeParameter('search', i, '') as string;
	const totalAmount = this.getNodeParameter('totalAmount', i, 0) as number;
	const qs: Record<string, string | number> = {};
	if (agreementNumber) qs.agreement_number = agreementNumber;
	if (disburseDate) qs.disburse_date = disburseDate;
	if (limit) qs.limit = limit;
	if (maturityDate) qs.maturity_date = maturityDate;
	if (outstandingAmount !== 0) qs.outstanding_amount = outstandingAmount;
	if (paymentAmount !== 0) qs.payment_amount = paymentAmount;
	if (search) qs.search = search;
	if (totalAmount !== 0) qs.total_amount = totalAmount;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/my-loan`, { qs });
	return { response };
}

async function dealerPortalOngoingPaymentGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const agreementNumber = this.getNodeParameter('agreementNumber', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const paymentAmount = this.getNodeParameter('paymentAmount', i, 0) as number;
	const paymentDate = this.getNodeParameter('paymentDate', i, '') as string;
	const search = this.getNodeParameter('search', i, '') as string;
	const sysLoanScheduleItemStatusId = this.getNodeParameter('sysLoanScheduleItemStatusId', i, '') as string;
	const qs: Record<string, string | number> = {};
	if (agreementNumber) qs.agreement_number = agreementNumber;
	if (limit) qs.limit = limit;
	if (paymentAmount !== 0) qs.payment_amount = paymentAmount;
	if (paymentDate) qs.payment_date = paymentDate;
	if (search) qs.search = search;
	if (sysLoanScheduleItemStatusId) qs.sys_loan_schedule_item_status_id = sysLoanScheduleItemStatusId;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/ongoing-payment`, { qs });
	return { response };
}

async function dealerPortalPaymentGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const agreementNumber = this.getNodeParameter('agreementNumber', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const paymentAmount = this.getNodeParameter('paymentAmount', i, 0) as number;
	const paymentDate = this.getNodeParameter('paymentDate', i, '') as string;
	const search = this.getNodeParameter('search', i, '') as string;
	const sysLoanScheduleItemStatusId = this.getNodeParameter('sysLoanScheduleItemStatusId', i, '') as string;
	const qs: Record<string, string | number> = {};
	if (agreementNumber) qs.agreement_number = agreementNumber;
	if (limit) qs.limit = limit;
	if (paymentAmount !== 0) qs.payment_amount = paymentAmount;
	if (paymentDate) qs.payment_date = paymentDate;
	if (search) qs.search = search;
	if (sysLoanScheduleItemStatusId) qs.sys_loan_schedule_item_status_id = sysLoanScheduleItemStatusId;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/payment`, { qs });
	return { response };
}

async function dealerPortalLoanAppQueueGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const applicationNo = this.getNodeParameter('applicationNo', i, '') as string;
	const created = this.getNodeParameter('created', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const rqLoanAmount = this.getNodeParameter('rqLoanAmount', i, 0) as number;
	const search = this.getNodeParameter('search', i, '') as string;
	const status = this.getNodeParameter('status', i, '') as string;
	const qs: Record<string, string | number> = {};
	if (applicationNo) qs.application_no = applicationNo;
	if (created) qs.created = created;
	if (limit) qs.limit = limit;
	if (rqLoanAmount !== 0) qs.rq_loan_amount = rqLoanAmount;
	if (search) qs.search = search;
	if (status) qs.status = status;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/loan-app-queue`, { qs });
	return { response };
}

async function dealerPortalKycValidationGetAll(
	this: IExecuteFunctions,
	_i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/kyc-validation`);
	return { response };
}

async function dealerPortalLoanQueueGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const agreementNumber = this.getNodeParameter('agreementNumber', i, '') as string;
	const disburseDate = this.getNodeParameter('disburseDate', i, '') as string;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const maturityDate = this.getNodeParameter('maturityDate', i, '') as string;
	const outstandingAmount = this.getNodeParameter('outstandingAmount', i, 0) as number;
	const paymentAmount = this.getNodeParameter('paymentAmount', i, 0) as number;
	const search = this.getNodeParameter('search', i, '') as string;
	const totalAmount = this.getNodeParameter('totalAmount', i, 0) as number;
	const qs: Record<string, string | number> = {};
	if (agreementNumber) qs.agreement_number = agreementNumber;
	if (disburseDate) qs.disburse_date = disburseDate;
	if (limit) qs.limit = limit;
	if (maturityDate) qs.maturity_date = maturityDate;
	if (outstandingAmount !== 0) qs.outstanding_amount = outstandingAmount;
	if (paymentAmount !== 0) qs.payment_amount = paymentAmount;
	if (search) qs.search = search;
	if (totalAmount !== 0) qs.total_amount = totalAmount;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/loan-queue`, { qs });
	return { response };
}

async function dealerPortalDirCurrencyGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-currency`, { qs });
	return { response };
}

async function dealerPortalDirRepaymentIntervalGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-repayment-interval`, { qs });
	return { response };
}

async function dealerPortalProductGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/product`, { qs });
	return { response };
}

async function dealerPortalSysLoanOperationStatusGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/sys-loan-operation-status`, { qs });
	return { response };
}

async function dealerPortalSysLoanOperationTypeGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/sys-loan-operation-type`, { qs });
	return { response };
}

async function dealerPortalSysLoanScheduleItemStatusGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/sys-loan-schedule-item-status`, { qs });
	return { response };
}

async function dealerPortalSysLoanStatusGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/sys-loan-status`, { qs });
	return { response };
}

async function dealerPortalSysTermTypeGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const qs: Record<string, number> = {};
	if (limit) qs.limit = limit;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/sys-term-type`, { qs });
	return { response };
}

async function dealerPortalDirCurrentMonthDaysGetAll(
	this: IExecuteFunctions,
	_i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-current-month-days`);
	return { response };
}

async function dealerPortalDirPayDayGetAll(
	this: IExecuteFunctions,
	_i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-pay-day`);
	return { response };
}

async function dealerPortalDirStateGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-state`, { qs });
	return { response };
}

async function dealerPortalDirIncomeFrequencyGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'code', qsKey: 'code' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-income-frequency`, { qs });
	return { response };
}

async function dealerPortalDirJobPositionGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-job-position`, { qs });
	return { response };
}

async function dealerPortalDirMarketingSourceGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-marketing-source`, { qs });
	return { response };
}

async function dealerPortalDirAnnualGrossRevenueGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-annual-gross-revenue`, { qs });
	return { response };
}

async function dealerPortalDirBusinessLocationGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-business-location`, { qs });
	return { response };
}

async function dealerPortalDirIndustryGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-industry`, { qs });
	return { response };
}

async function dealerPortalDirBusinessRoleGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-business-role`, { qs });
	return { response };
}

async function dealerPortalDirMaritalStatusGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'cbsCode', qsKey: 'cbs_code' },
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'code', qsKey: 'code' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-marital-status`, { qs });
	return { response };
}

async function dealerPortalDirCitizenshipGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-citizenship`, { qs });
	return { response };
}

async function dealerPortalDirAttachmentTypeGetAll(
	this: IExecuteFunctions,
	_i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/dir-attachment-type`);
	return { response };
}

async function dealerPortalPartnerGetAll(
	this: IExecuteFunctions,
	_i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/partner`);
	return { response };
}

async function dealerPortalInvoiceGetAll(
	this: IExecuteFunctions,
	_i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/invoice`);
	return { response };
}

async function dealerPortalApplicantGetAll(
	this: IExecuteFunctions,
	_i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/applicant`);
	return { response };
}

async function dealerPortalPartnerInfoGetAll(
	this: IExecuteFunctions,
	_i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', `${DEALER_BASE}/partner-info`);
	return { response };
}

function buildDirQs(
	this: IExecuteFunctions,
	i: number,
	keys: { param: string; qsKey: string }[],
): Record<string, string | number> {
	const qs: Record<string, string | number> = {};
	for (const { param, qsKey } of keys) {
		const val = this.getNodeParameter(param, i, param === 'limit' ? 50 : '') as string | number;
		if (val !== '' && val !== undefined && (param !== 'limit' || (typeof val === 'number' && val > 0))) qs[qsKey] = val;
	}
	return qs;
}

async function customerPortalDirCitizenshipGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/customer-portal-retail/dir-citizenship', { qs });
	return { response };
}

async function customerPortalDirCurrentMonthDaysGetAll(
	this: IExecuteFunctions,
	_i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/customer-portal-retail/dir-current-month-days');
	return { response };
}

async function customerPortalDirIncomeFrequencyGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'code', qsKey: 'code' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/customer-portal-retail/dir-income-frequency', { qs });
	return { response };
}

async function customerPortalDirJobPositionGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/customer-portal-retail/dir-job-position', { qs });
	return { response };
}

async function customerPortalDirMaritalStatusGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'cbsCode', qsKey: 'cbs_code' },
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'code', qsKey: 'code' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/customer-portal-retail/dir-marital-status', { qs });
	return { response };
}

async function customerPortalDirPayDayGetAll(
	this: IExecuteFunctions,
	_i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/customer-portal-retail/dir-pay-day');
	return { response };
}

async function customerPortalDirStateGetAll(
	this: IExecuteFunctions,
	i: number,
	authContext: AuthContext,
): Promise<ExecuteResult> {
	const qs = buildDirQs.call(this, i, [
		{ param: 'changedByUsername', qsKey: 'changed_by_username' },
		{ param: 'created', qsKey: 'created' },
		{ param: 'id', qsKey: 'id' },
		{ param: 'limit', qsKey: 'limit' },
		{ param: 'name', qsKey: 'name' },
		{ param: 'pkRecordId', qsKey: 'pk_record_id' },
		{ param: 'search', qsKey: 'search' },
		{ param: 'updated', qsKey: 'updated' },
	]);
	if (typeof qs.limit === 'string') qs.limit = parseInt(qs.limit, 10) || 50;
	const response = await autoGlassApiRequest.call(this, authContext, 'GET', '/api/v1/customer-portal-retail/dir-state', { qs });
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
	sysModule: { getAll: sysModuleGetAll },
	sysLang: { getAll: sysLangGetAll },
	userCalendarReminder: { getAll: userCalendarReminderGetAll },
	sysReminderStatusCore: { getAll: sysReminderStatusCoreGetAll },
	sysReminderTimeCore: { getAll: sysReminderTimeCoreGetAll },
	customerPortalMyApp: { getAll: customerPortalMyAppGetAll },
	customerPortalMyLoan: { getAll: customerPortalMyLoanGetAll },
	customerPortalOngoingPayment: { getAll: customerPortalOngoingPaymentGetAll },
	customerPortalPayment: { getAll: customerPortalPaymentGetAll },
	customerPortalDirCitizenship: { getAll: customerPortalDirCitizenshipGetAll },
	customerPortalDirCurrency: { getAll: customerPortalDirCurrencyGetAll },
	customerPortalDirCurrentMonthDays: { getAll: customerPortalDirCurrentMonthDaysGetAll },
	customerPortalDirIncomeFrequency: { getAll: customerPortalDirIncomeFrequencyGetAll },
	customerPortalDirJobPosition: { getAll: customerPortalDirJobPositionGetAll },
	customerPortalDirMaritalStatus: { getAll: customerPortalDirMaritalStatusGetAll },
	customerPortalDirPayDay: { getAll: customerPortalDirPayDayGetAll },
	customerPortalDirRepaymentInterval: { getAll: customerPortalDirRepaymentIntervalGetAll },
	customerPortalDirState: { getAll: customerPortalDirStateGetAll },
	customerPortalKycValidation: { getAll: customerPortalKycValidationGetAll },
	customerPortalLoanAppQueue: { getAll: customerPortalLoanAppQueueGetAll },
	customerPortalLoanQueue: { getAll: customerPortalLoanQueueGetAll },
	customerPortalProduct: { getAll: customerPortalProductGetAll },
	customerPortalSysLoanOperationStatus: { getAll: customerPortalSysLoanOperationStatusGetAll },
	customerPortalSysLoanOperationType: { getAll: customerPortalSysLoanOperationTypeGetAll },
	customerPortalSysLoanScheduleItemStatus: { getAll: customerPortalSysLoanScheduleItemStatusGetAll },
	customerPortalSysLoanStatus: { getAll: customerPortalSysLoanStatusGetAll },
	customerPortalSysRateType: { getAll: customerPortalSysRateTypeGetAll },
	customerPortalSysTermType: { getAll: customerPortalSysTermTypeGetAll },
	dealerPortalKycValidation: { getAll: dealerPortalKycValidationGetAll },
	dealerPortalLoanAppQueue: { getAll: dealerPortalLoanAppQueueGetAll },
	dealerPortalLoanQueue: { getAll: dealerPortalLoanQueueGetAll },
	dealerPortalMyApp: { getAll: dealerPortalMyAppGetAll },
	dealerPortalMyLoan: { getAll: dealerPortalMyLoanGetAll },
	dealerPortalOngoingPayment: { getAll: dealerPortalOngoingPaymentGetAll },
	dealerPortalPayment: { getAll: dealerPortalPaymentGetAll },
	dealerPortalDirAnnualGrossRevenue: { getAll: dealerPortalDirAnnualGrossRevenueGetAll },
	dealerPortalDirBusinessLocation: { getAll: dealerPortalDirBusinessLocationGetAll },
	dealerPortalDirCurrentMonthDays: { getAll: dealerPortalDirCurrentMonthDaysGetAll },
	dealerPortalDirBusinessRole: { getAll: dealerPortalDirBusinessRoleGetAll },
	dealerPortalDirCitizenship: { getAll: dealerPortalDirCitizenshipGetAll },
	dealerPortalDirCurrency: { getAll: dealerPortalDirCurrencyGetAll },
	dealerPortalDirAttachmentType: { getAll: dealerPortalDirAttachmentTypeGetAll },
	dealerPortalDirIncomeFrequency: { getAll: dealerPortalDirIncomeFrequencyGetAll },
	dealerPortalDirIndustry: { getAll: dealerPortalDirIndustryGetAll },
	dealerPortalDirJobPosition: { getAll: dealerPortalDirJobPositionGetAll },
	dealerPortalDirMaritalStatus: { getAll: dealerPortalDirMaritalStatusGetAll },
	dealerPortalDirMarketingSource: { getAll: dealerPortalDirMarketingSourceGetAll },
	dealerPortalDirPayDay: { getAll: dealerPortalDirPayDayGetAll },
	dealerPortalDirRepaymentInterval: { getAll: dealerPortalDirRepaymentIntervalGetAll },
	dealerPortalDirState: { getAll: dealerPortalDirStateGetAll },
	dealerPortalApplicant: { getAll: dealerPortalApplicantGetAll },
	dealerPortalInvoice: { getAll: dealerPortalInvoiceGetAll },
	dealerPortalProduct: { getAll: dealerPortalProductGetAll },
	dealerPortalPartner: { getAll: dealerPortalPartnerGetAll },
	dealerPortalPartnerInfo: { getAll: dealerPortalPartnerInfoGetAll },
	dealerPortalSysLoanOperationStatus: { getAll: dealerPortalSysLoanOperationStatusGetAll },
	dealerPortalSysLoanOperationType: { getAll: dealerPortalSysLoanOperationTypeGetAll },
	dealerPortalSysLoanScheduleItemStatus: { getAll: dealerPortalSysLoanScheduleItemStatusGetAll },
	dealerPortalSysLoanStatus: { getAll: dealerPortalSysLoanStatusGetAll },
	dealerPortalSysTermType: { getAll: dealerPortalSysTermTypeGetAll },
};
