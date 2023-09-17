import { knex, Knex } from "knex";
import logger from "../services/logging";
import { appName, dbFilePath } from "../config";
import { join } from "path";


const knexConfig: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: join(dbFilePath, `${appName}.db`),
  },
  useNullAsDefault: true,
};

export const db = knex(knexConfig);

async function createTable(
  tableName: string,
  tableDefinition: (table: Knex.TableBuilder, db: Knex<any, unknown[]>) => void
) {
  try {
    const exists = await db.schema.hasTable(tableName);

    if (!exists) {
      await db.schema.createTable(tableName, (table) => {
        tableDefinition(table, db);
      });
      logger.info(`Table '${tableName}' created successfully.`);
    } else {
      logger.info(`Table '${tableName}' already exist, Ignored.`);
    }
  } catch (error) {
    throw error;
  }
}

export async function dbPopulate() {
  try {
    const tables: {
      name: string;
      definition: (table: Knex.TableBuilder, db: Knex<any, unknown[]>) => void;
    }[] = [
      {
        name: "tasks",
        definition(table, db) {
          table.bigIncrements("id");
          table.string("description").notNullable();
          table.boolean("completed").defaultTo(0);
        },
      },
    ];

    for (const { name, definition } of tables) {
      try {
        await createTable(name, definition);
      } catch (error) {
        logger.error(`Error creating table '${name}':`, error);
      }
    }
  } catch (error) {
    throw error;
  }
}
