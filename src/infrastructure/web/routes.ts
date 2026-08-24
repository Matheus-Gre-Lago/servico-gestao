import { Router } from 'express';
import { PrismaClienteRepository } from '../../adapters/repositories/PrismaClienteRepository';
import { ListarClientesUseCase } from '../../application/usecases/ListarClientesUseCase';
import { ClienteController } from '../../adapters/controllers/ClienteController';
import { PrismaPlanoRepository, PrismaAssinaturaRepository } from '../../adapters/repositories/PrismaRepositories';
import { GestaoUseCases } from '../../application/usecases/GestaoUseCases';
import { GestaoController } from '../../adapters/controllers/GestaoController';

const router = Router();

// Dependências Clientes
const clienteRepo = new PrismaClienteRepository();
const clienteCtrl = new ClienteController(new ListarClientesUseCase(clienteRepo));

// Dependências Gestão 
const planoRepo = new PrismaPlanoRepository();
const assinaturaRepo = new PrismaAssinaturaRepository();
const gestaoCtrl = new GestaoController(new GestaoUseCases(planoRepo, assinaturaRepo));

// Rotas template.postman_collection.json
router.get('/gerenciaplanos/clientes', (req, res) => clienteCtrl.listar(req, res));
router.get('/gerenciaplanos/planos', (req, res) => gestaoCtrl.listarPlanos(req, res));
router.patch('/gerenciaplanos/planos/:idPlano', (req, res) => gestaoCtrl.atualizarPlano(req, res));
router.post('/gerenciaplanos/assinaturas', (req, res) => gestaoCtrl.criarAssinatura(req, res));
router.get('/gerenciaplanos/assinaturas/:tipo', (req, res) => gestaoCtrl.listarAssinaturas(req, res));
router.get('/gerenciaplanos/asscli/:codcli', (req, res) => gestaoCtrl.listarPorCliente(req, res));
router.get('/gerenciaplanos/assinaturaplano/:codplano', (req, res) => gestaoCtrl.listarPorPlano(req, res));

export { router };