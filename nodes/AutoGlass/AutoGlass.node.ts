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
import { getAuthToken } from './shared/transport';
import { OPERATION_HANDLERS } from './shared/operationHandlers';

export class AutoGlass implements INodeType {
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
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'User', value: 'user' },
					{ name: 'Loan', value: 'loan' },
					{ name: 'System Audit Event Type', value: 'sysAuditEventType' },
					{ name: 'Generic Menu', value: 'genericMenu' },
					{ name: 'Audit Log', value: 'auditLog' },
					{ name: 'Generic Screen', value: 'genericScreen' },
					{ name: 'System Statistics', value: 'systemStatistics' },
				],
				default: 'user',
			},
			...userDescription,
			...loanDescription,
			...sysAuditEventTypeDescription,
			...genericMenuDescription,
			...auditLogDescription,
			...genericScreenDescription,
			...systemStatisticsDescription,
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
