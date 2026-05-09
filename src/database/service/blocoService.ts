import { dbService } from '../db';

export interface Bloco {
  id_bloco: number;
  id_pagina: number;
  tipo: 'texto' | 'checklist';
  conteudo: string | null;
  ordem: number;
  feito: number;
}

export async function adicionarBloco(
  idPagina: number,
  tipo: 'texto' | 'checklist',
  conteudo: string = '',
  ordem: number = 0
): Promise<Bloco> {
  const db = await dbService.getDb();
  await db.run(
    'INSERT INTO blocos (id_pagina, tipo, conteudo, ordem) VALUES (?, ?, ?, ?)',
    [idPagina, tipo, conteudo, ordem]
  );
  const res = await db.query('SELECT * FROM blocos WHERE id_bloco = last_insert_rowid()');
  return res.values![0] as Bloco;
}

export async function listarBlocos(idPagina: number): Promise<Bloco[]> {
  const db = await dbService.getDb();
  const resultado = await db.query(
    'SELECT * FROM blocos WHERE id_pagina = ? ORDER BY ordem ASC, criado_em ASC',
    [idPagina]
  );
  return (resultado.values || []) as Bloco[];
}

export async function atualizarConteudoBloco(idBloco: number, conteudo: string): Promise<void> {
  const db = await dbService.getDb();
  await db.run('UPDATE blocos SET conteudo = ? WHERE id_bloco = ?', [conteudo, idBloco]);
}

export async function alternarCheck(idBloco: number, feito: boolean): Promise<void> {
  const db = await dbService.getDb();
  await db.run('UPDATE blocos SET feito = ? WHERE id_bloco = ?', [feito ? 1 : 0, idBloco]);
}

export async function deletarBloco(idBloco: number): Promise<void> {
  const db = await dbService.getDb();
  await db.run('DELETE FROM blocos WHERE id_bloco = ?', [idBloco]);
}