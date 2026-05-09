import { dbService } from '../db';

export interface Pagina {
  id_pagina: number;
  titulo: string;
  id_usuario: number;
  criado_em: string;
}

export async function criarPagina(titulo: string, idUsuario: number): Promise<Pagina> {
  const db = await dbService.getDb();
  await db.run('INSERT INTO paginas (titulo, id_usuario) VALUES (?, ?)', [titulo, idUsuario]);
  const res = await db.query('SELECT * FROM paginas WHERE id_pagina = last_insert_rowid()');
  return res.values![0] as Pagina;
}

export async function listarPaginas(idUsuario: number): Promise<Pagina[]> {
  const db = await dbService.getDb();
  const resultado = await db.query(
    'SELECT * FROM paginas WHERE id_usuario = ? ORDER BY criado_em DESC',
    [idUsuario]
  );
  return (resultado.values || []) as Pagina[];
}

export async function atualizarTitulo(idPagina: number, novoTitulo: string): Promise<void> {
  const db = await dbService.getDb();
  await db.run('UPDATE paginas SET titulo = ? WHERE id_pagina = ?', [novoTitulo, idPagina]);
}

export async function deletarPagina(idPagina: number): Promise<void> {
  const db = await dbService.getDb();
  await db.run('DELETE FROM paginas WHERE id_pagina = ?', [idPagina]);
}

export async function getPagina(id: number): Promise<Pagina | null> {
  const db = await dbService.getDb();
  const res = await db.query('SELECT * FROM paginas WHERE id_pagina = ?', [id]);
  return res.values?.length ? (res.values[0] as Pagina) : null;
}