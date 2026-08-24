import { PrismaClient } from '@prisma/client';
import { IPlanoRepository, IAssinaturaRepository } from '../../domain/repositories/Interfaces';

const prisma = new PrismaClient();

export class PrismaPlanoRepository implements IPlanoRepository {
  async listarTodos() { return await prisma.plano.findMany(); }
  
  async atualizarCusto(id: number, custoMensal: number) {
    return await prisma.plano.update({
      where: { codigo: id },
      data: { custoMensal }
    });
  }
}

export class PrismaAssinaturaRepository implements IAssinaturaRepository {
  async criar(data: any) {
    return await prisma.assinatura.create({ data });
  }
  
  async listarTodas() { return await prisma.assinatura.findMany(); }
  async listarPorCliente(codCli: number) { return await prisma.assinatura.findMany({ where: { codCli } }); }
  async listarPorPlano(codPlano: number) { return await prisma.assinatura.findMany({ where: { codPlano } }); }
}