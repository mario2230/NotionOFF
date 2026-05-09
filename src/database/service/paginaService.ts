import { dbService } from "../db";

export interface Pagina { // A tabela das paginas
  id_pagina: number;
  titulo: string;
  id_usuario: number;
  criado_em: string;
}

export async function criarPagina(
  titulo: string, // o que ele vai usar na function
  idUsuario: number,
): Promise<Pagina> { // Aqui utiliza o tabela 
  const db = await dbService.getDb(); // Pega o banco
  await db.run("INSERT INTO paginas ( titulo, id_usuario) VALUES (?, ?)", [
    titulo,
    idUsuario,
  ]); // Roda o sql

  const res = await db.query(
    "SELECT * FROM paginas WHERE id_pagina = last_insert_rowid()", 
  );
  return res.values![0] as Pagina; // retorna a ultima inserida 
}

export async function listarPaginas(idUsuario: number): Promise<Pagina[]> {
  const db = await dbService.getDb();
  const resultado = await db.query(
    "SELECT * FROM paginas WHERE id_usuario = ? ORDER BY criado_em DESC",
    [idUsuario],
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
