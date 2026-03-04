import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { userDescription } from './resources/user';
import { loanDescription } from './resources/loan';
import { sysAuditEventTypeDescription } from './resources/sysAuditEventType';
import { genericMenuDescription } from './resources/genericMenu';
import { auditLogDescription } from './resources/auditLog';
import { genericScreenDescription } from './resources/genericScreen';
import { systemStatisticsDescription } from './resources/systemStatistics';
import { sysModuleDescription } from './resources/sysModule';
import { sysLangDescription } from './resources/sysLang';
import { userCalendarReminderDescription } from './resources/userCalendarReminder';
import { sysReminderStatusCoreDescription } from './resources/sysReminderStatusCore';
import { sysReminderTimeCoreDescription } from './resources/sysReminderTimeCore';
import { customerPortalMyAppDescription } from './resources/customerPortalMyApp';
import { customerPortalMyLoanDescription } from './resources/customerPortalMyLoan';
import { customerPortalOngoingPaymentDescription } from './resources/customerPortalOngoingPayment';
import { customerPortalPaymentDescription } from './resources/customerPortalPayment';
import { customerPortalLoanAppQueueDescription } from './resources/customerPortalLoanAppQueue';
import { customerPortalKycValidationDescription } from './resources/customerPortalKycValidation';
import { customerPortalLoanQueueDescription } from './resources/customerPortalLoanQueue';
import { customerPortalProductDescription } from './resources/customerPortalProduct';
import { customerPortalDirCitizenshipDescription } from './resources/customerPortalDirCitizenship';
import { customerPortalDirCurrencyDescription } from './resources/customerPortalDirCurrency';
import { customerPortalDirCurrentMonthDaysDescription } from './resources/customerPortalDirCurrentMonthDays';
import { customerPortalDirIncomeFrequencyDescription } from './resources/customerPortalDirIncomeFrequency';
import { customerPortalDirJobPositionDescription } from './resources/customerPortalDirJobPosition';
import { customerPortalDirMaritalStatusDescription } from './resources/customerPortalDirMaritalStatus';
import { customerPortalDirPayDayDescription } from './resources/customerPortalDirPayDay';
import { customerPortalDirRepaymentIntervalDescription } from './resources/customerPortalDirRepaymentInterval';
import { customerPortalDirStateDescription } from './resources/customerPortalDirState';
import { customerPortalSysLoanOperationStatusDescription } from './resources/customerPortalSysLoanOperationStatus';
import { customerPortalSysLoanOperationTypeDescription } from './resources/customerPortalSysLoanOperationType';
import { customerPortalSysLoanScheduleItemStatusDescription } from './resources/customerPortalSysLoanScheduleItemStatus';
import { customerPortalSysLoanStatusDescription } from './resources/customerPortalSysLoanStatus';
import { customerPortalSysRateTypeDescription } from './resources/customerPortalSysRateType';
import { customerPortalSysTermTypeDescription } from './resources/customerPortalSysTermType';
import { dealerPortalKycValidationDescription } from './resources/dealerPortalKycValidation';
import { dealerPortalLoanAppQueueDescription } from './resources/dealerPortalLoanAppQueue';
import { dealerPortalLoanQueueDescription } from './resources/dealerPortalLoanQueue';
import { dealerPortalMyAppDescription } from './resources/dealerPortalMyApp';
import { dealerPortalMyLoanDescription } from './resources/dealerPortalMyLoan';
import { dealerPortalOngoingPaymentDescription } from './resources/dealerPortalOngoingPayment';
import { dealerPortalPaymentDescription } from './resources/dealerPortalPayment';
import { dealerPortalDirAnnualGrossRevenueDescription } from './resources/dealerPortalDirAnnualGrossRevenue';
import { dealerPortalDirAttachmentTypeDescription } from './resources/dealerPortalDirAttachmentType';
import { dealerPortalDirBusinessLocationDescription } from './resources/dealerPortalDirBusinessLocation';
import { dealerPortalDirBusinessRoleDescription } from './resources/dealerPortalDirBusinessRole';
import { dealerPortalDirCitizenshipDescription } from './resources/dealerPortalDirCitizenship';
import { dealerPortalDirCurrentMonthDaysDescription } from './resources/dealerPortalDirCurrentMonthDays';
import { dealerPortalDirCurrencyDescription } from './resources/dealerPortalDirCurrency';
import { dealerPortalDirIncomeFrequencyDescription } from './resources/dealerPortalDirIncomeFrequency';
import { dealerPortalDirIndustryDescription } from './resources/dealerPortalDirIndustry';
import { dealerPortalDirJobPositionDescription } from './resources/dealerPortalDirJobPosition';
import { dealerPortalDirMaritalStatusDescription } from './resources/dealerPortalDirMaritalStatus';
import { dealerPortalDirMarketingSourceDescription } from './resources/dealerPortalDirMarketingSource';
import { dealerPortalDirPayDayDescription } from './resources/dealerPortalDirPayDay';
import { dealerPortalDirRepaymentIntervalDescription } from './resources/dealerPortalDirRepaymentInterval';
import { dealerPortalDirStateDescription } from './resources/dealerPortalDirState';
import { dealerPortalApplicantDescription } from './resources/dealerPortalApplicant';
import { dealerPortalInvoiceDescription } from './resources/dealerPortalInvoice';
import { dealerPortalPartnerDescription } from './resources/dealerPortalPartner';
import { dealerPortalPartnerInfoDescription } from './resources/dealerPortalPartnerInfo';
import { dealerPortalProductDescription } from './resources/dealerPortalProduct';
import { dealerPortalSysLoanOperationStatusDescription } from './resources/dealerPortalSysLoanOperationStatus';
import { dealerPortalSysLoanOperationTypeDescription } from './resources/dealerPortalSysLoanOperationType';
import { dealerPortalSysLoanScheduleItemStatusDescription } from './resources/dealerPortalSysLoanScheduleItemStatus';
import { dealerPortalSysLoanStatusDescription } from './resources/dealerPortalSysLoanStatus';
import { dealerPortalSysTermTypeDescription } from './resources/dealerPortalSysTermType';
import { getAuthToken } from './shared/transport';
import { OPERATION_HANDLERS } from './shared/operationHandlers';

export class Autoglass implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AutoGlass',
		name: 'autoglass',
		icon: {
			light: 'file:autoglass.svg',
			dark: 'file:autoglass.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume the AutoGlass API',
		defaults: {
			name: 'AutoGlass',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'autoGlassApi',
				required: true,
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'API Category',
				name: 'apiCategory',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Core', value: 'core' },
					{ name: 'Customer Portal', value: 'customerPortal' },
					{ name: 'Dealer Portal', value: 'dealerPortal' },
				],
				default: 'core',
				description: 'High-level group of API endpoints to use',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						apiCategory: ['core'],
					},
				},
				options: [
					{ name: 'Audit Log', value: 'auditLog' },
					{ name: 'Generic Menu', value: 'genericMenu' },
					{ name: 'Generic Screen', value: 'genericScreen' },
					{ name: 'Loan', value: 'loan' },
					{ name: 'System Audit Event Type', value: 'sysAuditEventType' },
					{ name: 'System Language', value: 'sysLang' },
					{ name: 'System Module', value: 'sysModule' },
					{ name: 'System Reminder Status', value: 'sysReminderStatusCore' },
					{ name: 'System Statistic', value: 'systemStatistics' },
					{ name: 'User', value: 'user' },
					{ name: 'User Calendar Reminder', value: 'userCalendarReminder' },
				],
				default: 'user',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						apiCategory: ['customerPortal'],
					},
				},
				options: [
					{ name: 'Customer Portal Dir Citizenship', value: 'customerPortalDirCitizenship' },
					{ name: 'Customer Portal Dir Currency', value: 'customerPortalDirCurrency' },
					{ name: 'Customer Portal Dir Current Month Day', value: 'customerPortalDirCurrentMonthDays' },
					{ name: 'Customer Portal Dir Income Frequency', value: 'customerPortalDirIncomeFrequency' },
					{ name: 'Customer Portal Dir Job Position', value: 'customerPortalDirJobPosition' },
					{ name: 'Customer Portal Dir Marital Status', value: 'customerPortalDirMaritalStatus' },
					{ name: 'Customer Portal Dir Pay Day', value: 'customerPortalDirPayDay' },
					{ name: 'Customer Portal Dir Repayment Interval', value: 'customerPortalDirRepaymentInterval' },
					{ name: 'Customer Portal Dir State', value: 'customerPortalDirState' },
					{ name: 'Customer Portal KYC Validation', value: 'customerPortalKycValidation' },
					{ name: 'Customer Portal Loan App Queue', value: 'customerPortalLoanAppQueue' },
					{ name: 'Customer Portal Loan Queue', value: 'customerPortalLoanQueue' },
					{ name: 'Customer Portal My App', value: 'customerPortalMyApp' },
					{ name: 'Customer Portal My Loan', value: 'customerPortalMyLoan' },
					{ name: 'Customer Portal Ongoing Payment', value: 'customerPortalOngoingPayment' },
					{ name: 'Customer Portal Payment', value: 'customerPortalPayment' },
					{ name: 'Customer Portal Product', value: 'customerPortalProduct' },
					{ name: 'Customer Portal Sys Loan Operation Status', value: 'customerPortalSysLoanOperationStatus' },
					{ name: 'Customer Portal Sys Loan Operation Type', value: 'customerPortalSysLoanOperationType' },
					{ name: 'Customer Portal Sys Loan Schedule Item Status', value: 'customerPortalSysLoanScheduleItemStatus' },
					{ name: 'Customer Portal Sys Loan Status', value: 'customerPortalSysLoanStatus' },
					{ name: 'Customer Portal Sys Rate Type', value: 'customerPortalSysRateType' },
					{ name: 'Customer Portal Sys Term Type', value: 'customerPortalSysTermType' },
				],
				default: 'customerPortalMyApp',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						apiCategory: ['dealerPortal'],
					},
				},
				options: [
					{ name: 'Dealer Portal Applicant', value: 'dealerPortalApplicant' },
					{ name: 'Dealer Portal Dir Annual Gross Revenue', value: 'dealerPortalDirAnnualGrossRevenue' },
					{ name: 'Dealer Portal Dir Attachment Type', value: 'dealerPortalDirAttachmentType' },
					{ name: 'Dealer Portal Dir Business Location', value: 'dealerPortalDirBusinessLocation' },
					{ name: 'Dealer Portal Dir Business Role', value: 'dealerPortalDirBusinessRole' },
					{ name: 'Dealer Portal Dir Citizenship', value: 'dealerPortalDirCitizenship' },
					{ name: 'Dealer Portal Dir Currency', value: 'dealerPortalDirCurrency' },
					{ name: 'Dealer Portal Dir Current Month Day', value: 'dealerPortalDirCurrentMonthDays' },
					{ name: 'Dealer Portal Dir Income Frequency', value: 'dealerPortalDirIncomeFrequency' },
					{ name: 'Dealer Portal Dir Industry', value: 'dealerPortalDirIndustry' },
					{ name: 'Dealer Portal Dir Job Position', value: 'dealerPortalDirJobPosition' },
					{ name: 'Dealer Portal Dir Marital Status', value: 'dealerPortalDirMaritalStatus' },
					{ name: 'Dealer Portal Dir Marketing Source', value: 'dealerPortalDirMarketingSource' },
					{ name: 'Dealer Portal Dir Pay Day', value: 'dealerPortalDirPayDay' },
					{ name: 'Dealer Portal Dir Repayment Interval', value: 'dealerPortalDirRepaymentInterval' },
					{ name: 'Dealer Portal Dir State', value: 'dealerPortalDirState' },
					{ name: 'Dealer Portal Invoice', value: 'dealerPortalInvoice' },
					{ name: 'Dealer Portal KYC Validation', value: 'dealerPortalKycValidation' },
					{ name: 'Dealer Portal Loan App Queue', value: 'dealerPortalLoanAppQueue' },
					{ name: 'Dealer Portal Loan Queue', value: 'dealerPortalLoanQueue' },
					{ name: 'Dealer Portal My App', value: 'dealerPortalMyApp' },
					{ name: 'Dealer Portal My Loan', value: 'dealerPortalMyLoan' },
					{ name: 'Dealer Portal Ongoing Payment', value: 'dealerPortalOngoingPayment' },
					{ name: 'Dealer Portal Partner', value: 'dealerPortalPartner' },
					{ name: 'Dealer Portal Partner Info', value: 'dealerPortalPartnerInfo' },
					{ name: 'Dealer Portal Payment', value: 'dealerPortalPayment' },
					{ name: 'Dealer Portal Product', value: 'dealerPortalProduct' },
					{ name: 'Dealer Portal Sys Loan Operation Status', value: 'dealerPortalSysLoanOperationStatus' },
					{ name: 'Dealer Portal Sys Loan Operation Type', value: 'dealerPortalSysLoanOperationType' },
					{ name: 'Dealer Portal Sys Loan Schedule Item Status', value: 'dealerPortalSysLoanScheduleItemStatus' },
					{ name: 'Dealer Portal Sys Loan Status', value: 'dealerPortalSysLoanStatus' },
					{ name: 'Dealer Portal Sys Term Type', value: 'dealerPortalSysTermType' },
				],
				default: 'dealerPortalMyApp',
			},
			...userDescription,
			...loanDescription,
			...sysAuditEventTypeDescription,
			...genericMenuDescription,
			...auditLogDescription,
			...genericScreenDescription,
			...systemStatisticsDescription,
			...sysModuleDescription,
			...sysLangDescription,
			...userCalendarReminderDescription,
			...sysReminderStatusCoreDescription,
			...sysReminderTimeCoreDescription,
			...customerPortalMyAppDescription,
			...customerPortalDirCitizenshipDescription,
			...customerPortalDirCurrencyDescription,
			...customerPortalDirCurrentMonthDaysDescription,
			...customerPortalDirIncomeFrequencyDescription,
			...customerPortalDirJobPositionDescription,
			...customerPortalDirMaritalStatusDescription,
			...customerPortalDirPayDayDescription,
			...customerPortalDirRepaymentIntervalDescription,
			...customerPortalDirStateDescription,
			...customerPortalKycValidationDescription,
			...customerPortalLoanAppQueueDescription,
			...customerPortalLoanQueueDescription,
			...customerPortalMyLoanDescription,
			...customerPortalOngoingPaymentDescription,
			...customerPortalPaymentDescription,
			...customerPortalProductDescription,
			...customerPortalSysLoanOperationStatusDescription,
			...customerPortalSysLoanOperationTypeDescription,
			...customerPortalSysLoanScheduleItemStatusDescription,
			...customerPortalSysLoanStatusDescription,
			...customerPortalSysRateTypeDescription,
			...customerPortalSysTermTypeDescription,
			...dealerPortalKycValidationDescription,
			...dealerPortalLoanAppQueueDescription,
			...dealerPortalLoanQueueDescription,
			...dealerPortalMyAppDescription,
			...dealerPortalMyLoanDescription,
			...dealerPortalOngoingPaymentDescription,
			...dealerPortalPaymentDescription,
			...dealerPortalApplicantDescription,
			...dealerPortalDirAnnualGrossRevenueDescription,
			...dealerPortalDirAttachmentTypeDescription,
			...dealerPortalDirBusinessLocationDescription,
			...dealerPortalDirBusinessRoleDescription,
			...dealerPortalDirCitizenshipDescription,
			...dealerPortalDirCurrentMonthDaysDescription,
			...dealerPortalDirCurrencyDescription,
			...dealerPortalDirIncomeFrequencyDescription,
			...dealerPortalDirIndustryDescription,
			...dealerPortalDirJobPositionDescription,
			...dealerPortalDirMaritalStatusDescription,
			...dealerPortalDirMarketingSourceDescription,
			...dealerPortalDirPayDayDescription,
			...dealerPortalDirRepaymentIntervalDescription,
			...dealerPortalDirStateDescription,
			...dealerPortalInvoiceDescription,
			...dealerPortalPartnerDescription,
			...dealerPortalPartnerInfoDescription,
			...dealerPortalProductDescription,
			...dealerPortalSysLoanOperationStatusDescription,
			...dealerPortalSysLoanOperationTypeDescription,
			...dealerPortalSysLoanScheduleItemStatusDescription,
			...dealerPortalSysLoanStatusDescription,
			...dealerPortalSysTermTypeDescription,
		],
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const authContext = await getAuthToken.call(this);

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			try {
				const resourceHandlers = OPERATION_HANDLERS[resource];
				const handler = resourceHandlers?.[operation];

				if (!handler) {
					throw new NodeOperationError(
						this.getNode(),
						`Unsupported resource/operation: ${resource}/${operation}`,
						{ itemIndex: i },
					);
				}

				const result = await handler.call(this, i, authContext);

				if ('pushRows' in result && result.pushRows.length > 0) {
					for (const row of result.pushRows) {
						returnData.push({ json: row });
					}
				} else if ('response' in result) {
					returnData.push({ json: result.response as IDataObject });
				}
			} catch (error) {
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
