import { Request, Response } from 'express';
import { GestaoUseCases } from '../../application/usecases/GestaoUseCases';

export class GestaoController {
  constructor(private useCases: GestaoUseCases) {}

  async listarPlanos(req: Request, res: Response) {
    res.status(200).json(await this.useCases.listarPlanos());
  }

  async atualizarPlano(req: Request, res: Response) {
    const id = parseInt(req.params.idPlano as string);
    const { custoMensal } = req.body;
    res.status(200).json(await this.useCases.atualizarPlano(id, custoMensal));
  }

  async criarAssinatura(req: Request, res: Response) {
    res.status(201).json(await this.useCases.criarAssinatura(req.body));
  }

  async listarAssinaturas(req: Request, res: Response) {
    // Convertendo para String 
    const tipo = String(req.params.tipo).toUpperCase();
    res.status(200).json(await this.useCases.listarAssinaturas(tipo));
  }

  async listarPorCliente(req: Request, res: Response) {
    const codCli = parseInt(req.params.codcli as string);
    res.status(200).json(await this.useCases.listarAssinaturasPorCliente(codCli));
  }

  async listarPorPlano(req: Request, res: Response) {
    const codPlano = parseInt(req.params.codplano as string);
    res.status(200).json(await this.useCases.listarAssinaturasPorPlano(codPlano));
  }
}