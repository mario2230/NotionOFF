import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

export class DatabaseService {
  private connection: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private dbName = 'meu_caderninho';

  constructor() {
    this.connection = new SQLiteConnection(CapacitorSQLite);
  }

  async init(): Promise<void> {
    if (this.db) return;

    this.db = await this.connection.createConnection(
      this.dbName,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();
  }

  async getDb(): Promise<SQLiteDBConnection> {
    if (!this.db) {
      await this.init();
    }

    return this.db!;
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.connection.closeConnection(this.dbName, false);
      this.db = null;
    }
  }
}

export const dbService = new DatabaseService();