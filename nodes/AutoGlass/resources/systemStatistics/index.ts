import type { INodeProperties } from 'n8n-workflow';
import { systemStatisticsGetDescription } from './get';

const showOnlyForSystemStatistics = {
	resource: ['systemStatistics'],
};

export const systemStatisticsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSystemStatistics,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get system statistics',
				description: 'POST to retrieve system statistics (JSON response)',
			},
		],
		default: 'get',
	},
	...systemStatisticsGetDescription,
];
