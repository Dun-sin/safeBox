import { addRxPlugin, createRxDatabase } from 'rxdb';

import { RuleSchema } from './RulesSchema';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration-schema';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { SettingsSchema } from './SettingsSchema';
import {
  getRxStorageMemory
} from 'rxdb/plugins/storage-memory';

addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);


export const STORAGE = getRxStorageMemory();

export const rulesCollectionName = 'rules';
export const settingsCollectionName = 'settings'

const dbName = 'safebox';
const isDevelopment =
  process.env.NODE_ENV !== 'production' || process.env.DEBUG_PROD === 'true';

const initializeDB = async () => {
  if (isDevelopment) {
    addRxPlugin(RxDBDevModePlugin);
  }

  let db;

  try {
    db = await createRxDatabase({
      name: dbName,
      storage: STORAGE,
      multiInstance: false,
      ignoreDuplicate: true,
    });
  } catch (err) {
    console.log('ERROR CREATING DATABASE', err);
  }

  try {
    await db.addCollections({
      [rulesCollectionName]: {
        schema: RuleSchema,
      },
    });

    await db.addCollections({
      [settingsCollectionName]: {
        schema: SettingsSchema
      }
    })

  } catch (err) {
    console.log('ERROR CREATING COLLECTION', err);
  }

  await db[rulesCollectionName].insert({
    name: `Rule 1`,
    label: '35/25/40 Rule',
    segments: [
      { "label": "Save", "amount": 0.35, "color": "#177AD5" },
      { "label": "Invest", "amount": 0.25, "color": "#79D2DE" },
      { "label": "Spend", "amount": 0.4, "color": "#ED6665" }
    ]
  });
  await db[rulesCollectionName].insert({
    name: `Rule 2`,
    label: '40/30/30 Rule',
    segments: [
      { "label": "Vacation", "amount": 0.4, "color": "#F53D3D" },
      { "label": "Education", "amount": 0.3, "color": "#79D2DE" },
      { "label": "Entertainment", "amount": 0.3, "color": "#ED6665" }
    ]
  });
  await db[rulesCollectionName].insert({
    name: `Rule 3`,
    label: '50/20/30 Rule',
    segments: [
      { "label": "Emergency Fund", "amount": 0.5, "color": "#610505" },
      { "label": "Investment", "amount": 0.2, "color": "#79D2DE" },
      { "label": "Personal Development", "amount": 0.3, "color": "#177AD5" }
    ]
  });

  return db;
};

export default initializeDB;