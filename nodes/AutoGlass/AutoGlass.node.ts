import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

export class AutoGlass implements INodeType {

	description: INodeTypeDescription = {
		displayName: 'Autoglass',
		name: 'autoglass',
		icon: 'file:autoglass.svg',
		group: ['transform'],
		version: 1,
		description: 'Autoglass API Integration',
		defaults: { name: 'Autoglass' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],

		credentials: [
			{
				name: 'autoGlassApi',
				required: true,
			},
		],

		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{ name: 'User', value: 'user' },
					{ name: 'Loan', value: 'loan' },
				],
				default: 'user',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: { show: { resource: ['user'] } },
				options: [
					{ name: 'Get Profile', value: 'getProfile' },
				],
				default: 'getProfile',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: { show: { resource: ['loan'] } },
				options: [
					{ name: 'Get Loans', value: 'getLoans' },
				],
				default: 'getLoans',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// Get credentials
		const credentials = await this.getCredentials('autoGlassApi');
		const baseUrl = credentials.baseUrl as string;
		const username = credentials.username as string;
		const password = credentials.password as string;
		const sysModuleId = credentials.sysModuleId as string;
		const apiKey = credentials.apiKey as string;

		// 🔐 Login once per workflow execution
		let token: string;
		try {
			const loginResponse = await this.helpers.httpRequest({
				method: 'POST',
				url: 'https://dev-avatare.ableplatform.io/api/v1/core/auth/signin',
				headers: {
					'Content-Type': 'application/json',
					'api-key': apiKey,
				},
				body: {
					username,
					password,
					sys_module_id: sysModuleId,
				},
				json: true,
			});
			token = loginResponse.accessToken;
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Login failed: ' + (error as Error).message);
		}

		// Loop through items
		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			try {
				let response;

				// ================= USER =================
				if (resource === 'user' && operation === 'getProfile') {
					response = await this.helpers.httpRequest({
						method: 'GET',
						url: "https://dev-avatare.ableplatform.io/api/v1/core/sys-user/current",
						headers: {
							Authorization: `Bearer ${token}`,
							'api-key': apiKey,
						},
						json: true,
					});
				}

				// ================= LOAN =================
				if (resource === 'loan' && operation === 'getLoans') {
					response = await this.helpers.httpRequest({
						method: 'GET',
						url: `${baseUrl}/loan`,
						headers: {
							Authorization: `Bearer ${token}`,
							'api-key': apiKey,
						},
						json: true,
					});
				}

				returnData.push({ json: response });
			} catch (error) {
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}