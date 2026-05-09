import { dbService } from '../db';

async function hashSenha(senha: string): Promise<string> {
  const data = new TextEncoder().encode(senha);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function atualizarNome(id: number, nome: string): Promise<void> {
  const db = await dbService.getDb();
  await db.run('UPDATE usuarios SET nome = ? WHERE id_usuario = ?', [nome, id]);
}

export async function atualizarSenha(id: number, novaSenha: string): Promise<void> {
  const db = await dbService.getDb();
  const hash = await hashSenha(novaSenha);
  await db.run('UPDATE usuarios SET senha_hash = ? WHERE id_usuario = ?', [hash, id]);
}

export async function getUsuario(id: number): Promise<{ id_usuario: number; nome: string; email: string } | null> {
  const db = await dbService.getDb();
  const res = await db.query('SELECT id_usuario, nome, email FROM usuarios WHERE id_usuario = ?', [id]);
  return res.values?.length ? res.values[0] : null;
}