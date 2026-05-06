import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

export class DatabaseService {
  private connection: SQLiteConnection | null = null;
  private db: SQLiteDBConnection | null = null;
  private dbName = 'meu_caderninho';  

  async init(): Promise<void> {
    this.connection = new SQLiteConnection(CapacitorSQLite);

  
    if (Capacitor.getPlatform() === 'web') {
      const { JeepSqlite } = await import('jeep-sqlite/dist/components/jeep-sqlite');
      customElements.get('jeep-sqlite') ||
        customElements.define('jeep-sqlite', JeepSqlite);
      await customElements.whenDefined('jeep-sqlite');
    }

    this.db = await this.connection.createConnection(
      this.dbName,
      false,
      'no-encryption',
      1,
      false
    );
    await this.db.open();
    console.log(' Caderninho pronto!');
  }

  async getDb(): Promise<SQLiteDBConnection> {
    if (!this.db) await this.init();
    return this.db!;
  }

  async close(): Promise<void> {
    if (this.connection && this.db) {
      await this.connection.closeConnection(this.dbName, false);
    }
  }
}

export const dbService = new DatabaseService();  