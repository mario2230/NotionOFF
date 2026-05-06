import { SQLiteDBConnection } from '@capacitor-community/sqlite';

export async function criarTabelas(db: SQLiteDBConnection): Promise<void> {

  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha_hash TEXT NOT NULL,
      criado_em TEXT DEFAULT (datetime('now','localtime'))
    );
  `);


  await db.execute(`
    CREATE TABLE IF NOT EXISTS paginas (
      id_pagina INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      id_usuario INTEGER NOT NULL,
      criado_em TEXT DEFAULT (datetime('now','localtime')),
      FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS blocos (
      id_bloco INTEGER PRIMARY KEY AUTOINCREMENT,
      id_pagina INTEGER NOT NULL,
      tipo TEXT NOT NULL,
      conteudo TEXT,
      ordem INTEGER,
      feito INTEGER DEFAULT 0,
      criado_em TEXT DEFAULT (datetime('now','localtime')),
      FOREIGN KEY (id_pagina) REFERENCES paginas(id_pagina) ON DELETE CASCADE
    );
  `);

  console.log(' Sumário criado.');
}