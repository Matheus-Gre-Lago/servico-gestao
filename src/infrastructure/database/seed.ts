import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding do banco de dados...');

  // Limpar tabelas
  await prisma.assinatura.deleteMany();
  await prisma.plano.deleteMany();
  await prisma.cliente.deleteMany();

  //Criar 10 Clientes
  console.log('Criando 10 clientes...');
  const clientes = [];
  for (let i = 1; i <= 10; i++) {
    const cliente = await prisma.cliente.create({
      data: { nome: `Cliente Teste ${i}`, email: `cliente${i}@pucrs.br` }
    });
    clientes.push(cliente);
  }

  //Criar 5 Planos
  console.log('Criando 5 planos...');
  const planos = [];
  const custos = [50.0, 79.9, 99.9, 149.9, 199.9];
  for (let i = 1; i <= 5; i++) {
    const plano = await prisma.plano.create({
      data: {
        nome: `Plano Mega ${i}`,
        // O "as number" avisa ao TS que esse valor nunca será undefined
        custoMensal: custos[i - 1] as number,
        descricao: `Plano de internet nível ${i} com suporte 24h.`,
      }
    });
    planos.push(plano);
  }

  //Criar 5 Assinaturas
  console.log('Criando 5 assinaturas...');
  const dataHoje = new Date();
  const dataFimFidelidade = new Date();
  dataFimFidelidade.setFullYear(dataHoje.getFullYear() + 1);

  for (let i = 0; i < 5; i++) {
    await prisma.assinatura.create({
      data: {
        codCli: clientes[i]!.codigo,
        codPlano: planos[i]!.codigo,
        inicioFidelidade: dataHoje,
        fimFidelidade: dataFimFidelidade,
        dataUltimoPagamento: dataHoje
      }
    });
  }

  console.log('Seeding concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar o seed:', e);
    throw e; 
  })
  .finally(async () => {
    await prisma.$disconnect();
  });