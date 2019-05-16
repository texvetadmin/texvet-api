export default [
  {
    code: 'SET-APPOINTMENT',
    name: 'Type #1',
    description: 'Test notification type',
    template_id: 1,
    requires_followup: false,
  },
  {
    code: 'APPOINTMENT-REMINDER',
    name: 'Type #2',
    description: 'Test notification type',
    template_id: 2,
    requires_followup: true,
    followup_interval: 1,
  },
];
