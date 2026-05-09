import { dbService } from '../db'
import { criarTabelas } from '../migration'

async function hashSenha(senha: string): Promise<string> {
  const data = new TextEncoder().encode(senha.trim())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function initDB() {
  const db = await dbService.getDb()
  await criarTabelas(db)
}

export async function cadastrar(nome: string, email: string, senha: string) {
  const db = await dbService.getDb()
  const hash = await hashSenha(senha)
  await db.run(
    'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
    [nome.trim(), email.trim(), hash]
  )
}

export async function login(email: string, senha: string) {
  const db = await dbService.getDb()
  const hash = await hashSenha(senha)
  const res = await db.query(
    'SELECT id_usuario, nome FROM usuarios WHERE email = ? AND senha_hash = ?',
    [email.trim(), hash]
  )
  if (res.values?.length) {
    const user = res.values[0]
    return { id_usuario: user.id_usuario, nome: user.nome }
  }
  throw new Error('E-mail ou senha inválidos.')
}