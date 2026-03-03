import type { INodeProperties } from 'n8n-workflow';
import { userGetProfileDescription } from './getProfile';
import { userGetAllDescription } from './getAll';

const showOnlyForUser = {
	resource: ['user'],
};

export const userDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForUser,
		},
		options: [
			{
				name: 'Get Profile',
				value: 'getProfile',
				action: 'Get current user profile',
				description: 'Get the authenticated user profile',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get multiple users',
				description: 'Get a list of users',
			},
		],
		default: 'getProfile',
	},
	...userGetProfileDescription,
	...userGetAllDescription,
];
