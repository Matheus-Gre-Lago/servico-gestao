import { Request, Response } from 'express';
import { ListarClientesUseCase } from '../../application/usecases/ListarClientesUseCase';

export class ClienteController {
  constructor(private listarClientesUseCase: ListarClientesUseCase) {}

  // Recebe a requisição HTTP
  async listar(req: Request, res: Response): Promise<Response> {
    try {
      const clientes = await this.listarClientesUseCase.execute();
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
}