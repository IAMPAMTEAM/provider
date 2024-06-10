export const defaultRuleColumns = [
  {
    headerName: 'Rules',
    children: [
      {
        headerName: 'RuleName',
        field: 'RuleName',
        suppressMovable: true,
        cellRenderer: 'agGroupCellRenderer',
      },
    ],
  },
  {
    headerName: 'AWS_CONFIG',
    children: [
      {
        headerName: 'ResourceTypes',
        field: 'ResourceTypes',
        suppressMovable: true,
      },
      {
        headerName: 'Triggertype',
        field: 'Triggertype',
        suppressMovable: true,
      },

      {
        headerName: 'AWSRegion',
        field: 'AWSRegion',
        suppressMovable: true,
      },
      {
        headerName: 'Description-En',
        field: 'Description-En',
        suppressMovable: true,
        wrapText: true,
      },
      {
        headerName: 'Description-Ko',
        field: 'Description-Ko',
        suppressMovable: true,
      },
      {
        headerName: 'Criteria-En',
        field: 'Criteria-En',
        suppressMovable: true,
      },
      {
        headerName: 'Criteria-Ko',
        field: 'Criteria-Ko',
        suppressMovable: true,
      },
    ],
  },
  {
    headerName: 'prowler_rule',
    children: [
      {
        headerName: 'CheckTitle',
        field: 'CheckTitle',
        suppressMovable: true,
      },
      {
        headerName: 'Description',
        field: 'Description',
        suppressMovable: true,
      },
      {
        headerName: 'Risk',
        field: 'Risk',
        suppressMovable: true,
      },
      {
        headerName: 'Severity',
        field: 'Severity',
        suppressMovable: true,
      },
      {
        headerName: 'RemediationCodeCLI',
        field: 'RemediationCodeCLI',
        suppressMovable: true,
      },
      {
        headerName: 'RemediationRecommendationText',
        field: 'RemediationRecommendationText',
        suppressMovable: true,
      },
      {
        headerName: 'RemediationRecommendationUrl',
        field: 'RemediationRecommendationUrl',
        suppressMovable: true,
      },
    ],
  },
];
