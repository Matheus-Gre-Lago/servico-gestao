export interface IPlanoRepository {
  listarTodos(): Promise<any[]>;
  atualizarCusto(id: number, custo: number): Promise<any>;
}

export interface IAssinaturaRepository {
  criar(assinatura: any): Promise<any>;
  listarTodas(): Promise<any[]>;
  listarPorCliente(codCli: number): Promise<any[]>;
  listarPorPlano(codPlano: number): Promise<any[]>;
}