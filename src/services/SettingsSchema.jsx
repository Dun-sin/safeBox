export const SettingsSchema = {
  version: 0,
  type: 'object',
  primaryKey: 'key',
  properties: {
    key: { type: 'string', maxLength: 100 },
    value: { type: 'string' },
  },
}