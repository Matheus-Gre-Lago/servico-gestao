import { PrismaClient } from '@prisma/client';
import { IClienteRepository } from '../../domain/repositories/IClienteRepository';
import { Cliente } from '../../domain/entities/Cliente';

const prisma = new PrismaClient();

export class PrismaClienteRepository implements IClienteRepository {
  async listarTodos(): Promise<Cliente[]> {
    // Busca clientes no banco
    const clientesDb = await prisma.cliente.findMany();
    
    // Mapeia os dados do banco para as Entidades
    return clientesDb.map(c => new Cliente(c.codigo, c.nome, c.email));
  }
}