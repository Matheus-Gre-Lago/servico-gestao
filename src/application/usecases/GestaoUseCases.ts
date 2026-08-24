import { IPlanoRepository, IAssinaturaRepository } from '../../domain/repositories/Interfaces';

export class GestaoUseCases {
  constructor(
    private planoRepo: IPlanoRepository,
    private assinaturaRepo: IAssinaturaRepository
  ) {}

  async listarPlanos() { return await this.planoRepo.listarTodos(); }
  
  async atualizarPlano(id: number, custo: number) { return await this.planoRepo.atualizarCusto(id, custo); }

  async criarAssinatura(dados: any) {
    const dataHoje = new Date();
    const fimFidelidade = new Date();
    fimFidelidade.setFullYear(dataHoje.getFullYear() + 1);
    
    return await this.assinaturaRepo.criar({
      codCli: dados.codCli,
      codPlano: dados.codPlano,
      inicioFidelidade: dataHoje,
      fimFidelidade: fimFidelidade,
      dataUltimoPagamento: dataHoje
    });
  }

  // Mapear o status da assinatura
  private mapearStatus(assinaturas: any[], tipoFiltro: string = 'TODOS') {
    const hoje = new Date();
    const mapeadas = assinaturas.map(ass => {
      // ativa se o encerramento (pagamento + 30 dias)
      const limitePagamento = new Date(ass.dataUltimoPagamento);
      limitePagamento.setDate(limitePagamento.getDate() + 30);
      const status = limitePagamento > hoje ? 'ATIVO' : 'CANCELADO';
      
      return { ...ass, status };
    });

    if (tipoFiltro === 'ATIVOS') return mapeadas.filter(a => a.status === 'ATIVO');
    if (tipoFiltro === 'CANCELADOS') return mapeadas.filter(a => a.status === 'CANCELADO');
    return mapeadas;
  }

  async listarAssinaturas(tipo: string) {
    const assinaturas = await this.assinaturaRepo.listarTodas();
    return this.mapearStatus(assinaturas, tipo);
  }

  async listarAssinaturasPorCliente(codCli: number) {
    const assinaturas = await this.assinaturaRepo.listarPorCliente(codCli);
    return this.mapearStatus(assinaturas);
  }

  async listarAssinaturasPorPlano(codPlano: number) {
    const assinaturas = await this.assinaturaRepo.listarPorPlano(codPlano);
    return this.mapearStatus(assinaturas);
  }
}