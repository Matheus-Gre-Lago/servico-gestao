import { Cliente } from '../entities/Cliente';

export interface IClienteRepository {
  listarTodos(): Promise<Cliente[]>;
}