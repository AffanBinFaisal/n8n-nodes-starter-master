import type { INodeProperties } from 'n8n-workflow';
import { loanGetLoansDescription } from './getLoans';

const showOnlyForLoan = {
	resource: ['loan'],
};

export const loanDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForLoan,
		},
		options: [
			{
				name: 'Get Loans',
				value: 'getLoans',
				action: 'Get loans',
				description: 'Get loans for the authenticated context',
			},
		],
		default: 'getLoans',
	},
	...loanGetLoansDescription,
];
