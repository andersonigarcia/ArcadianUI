// Modos: new, edit, view

const routes = [
  {
    path: '/',
    component: () => import('layouts/Default.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Index.vue'),
        meta: { title: 'VINCER', subtitle: 'A arte em prótese dentária' }
      },
      {
        name: 'os_list',
        path: '/ordens-servicos',
        component: () => import('pages/ordem-servico/OrdensServicos'),
        meta: { title: 'Ordens de Serviços', subtitle: 'Lista de ordens de serviços' }
      },
      {
        name: 'os_detalhe',
        path: '/ordens-servicos/detalhe/:tag?',
        component: () => import('pages/ordem-servico/OrdemServicoDetalhe'),
        meta: { title: 'Detalhes', subtitle: 'Detalhes da Ordem de Serviço' }
      },
      {
        name: 'os_new',
        path: '/ordem-servico',
        component: () => import('pages/ordem-servico/OrdemServico'),
        meta: { title: 'Ordem de Serviço', subtitle: 'Cadastro de Pedido' },
        props: { modo: 'new' }
      },
      {
        name: 'os_edit',
        path: '/ordens-servicos/edit/:tag?',
        component: () => import('pages/ordem-servico/OrdemServico'),
        meta: { title: 'Ordem de Serviço', subtitle: 'Edição de pedido' },
        props: { modo: 'edit' }
      },
      {
        name: 'servico_new',
        path: '/servico',
        component: () => import('pages/ordem-servico/Servico'),
        meta: { title: 'Serviço', subtitle: 'Cadastro de Serviço' },
        props: { modo: 'new' }
      },
      {
        name: 'servico_edit',
        path: '/servico/:id',
        component: () => import('pages/ordem-servico/Servico'),
        meta: { title: 'Serviço', subtitle: 'Edição de Serviço' },
        props: (route) => ({ modo: 'edit', servicoId: route.params.id })
      },
      {
        name: 'planejamento_list',
        path: '/planejamentos/:tag',
        component: () => import('pages/planejamento/OrdemServico'),
        meta: { title: 'Planejamento', subtitle: 'Ordem de Serviço' },
        props: true
      },
      {
        name: 'execucao_atividade',
        path: '/planejamentos/atividades/:id',
        component: () => import('pages/planejamento/Atividade'),
        meta: { title: 'Planejamento', subtitle: 'Execução da Atividade' },
        props: true
      },
      {
        path: '/planejamentos/atividades/:pid/:aid',
        component: () => import('pages/planejamento/Atividade'),
        meta: { title: 'Planejamento', subtitle: 'Planejamento da Atividade' },
        props: true
      },
      {
        name: 'inbox_list',
        path: '/inbox',
        component: () => import('pages/inbox/Inbox'),
        meta: { title: 'Minhas atividades', subtitle: 'Lista das atividades para execução' }
      },
      {
        name: 'inbox_item',
        path: '/inbox/:dia/:hora/:tag',
        component: () => import('pages/inbox/InboxItem'),
        meta: { title: 'Minas atividades', subtitle: 'Lista das atividades para execução' },
        props: true
      },
      {
        name: 'categoria_list',
        path: '/categorias',
        component: () => import('pages/categoria/Categorias'),
        meta: { title: 'Categorias', subtitle: 'Lista de categorias de produtos' }
      },
      {
        name: 'colaborador_list',
        path: '/colaboradores',
        component: () => import('pages/colaborador/Colaboradores'),
        meta: { title: 'Colaboradores', subtitle: 'Lista de colaboradores' }
      },
      {
        name: 'colaborador_new',
        path: 'colaborador',
        component: () => import('pages/colaborador/colaborador'),
        meta: { title: 'Colaborador', subtitle: 'Cadastro de colaborador' },
        props: { modo: 'new' }
      },
      {
        name: 'colaborador_edit',
        path: 'colaborador/edit/:id',
        component: () => import('pages/colaborador/colaborador'),
        meta: { title: 'Colaborador', subtitle: 'Edição de colaborador' },
        props: { modo: 'edit' }
      },
      {
        name: 'workflow_list',
        path: '/workflows',
        component: () => import('pages/workflow/Workflows'),
        meta: { title: 'Workflows', subtitle: 'Lista de Workflow de produtos' }
      },
      {
        name: 'workflow_new',
        path: 'cadastrar/workflow',
        component: () => import('pages/workflow/Workflow'),
        meta: { title: 'Workflow', subtitle: 'Cadastro de workflow' },
        props: { modo: 'new' }
      },
      {
        name: 'workflow_edit',
        path: 'workflow/edit/:id',
        component: () => import('pages/workflow/Workflow'),
        meta: { title: 'Workflow', subtitle: 'Edição de workflow' },
        props: { modo: 'edit' }
      },
      {
        path: '/produtos',
        component: () => import('pages/produto/Produtos'),
        meta: { title: 'Produtos', subtitle: 'Lista de produtos' }
      },
      {
        name: 'produto_new',
        path: '/produto',
        component: () => import('pages/produto/Produto'),
        meta: { title: 'Produto', subtitle: 'Cadastro de produto' },
        props: { modo: 'new' }
      },
      {
        name: 'produto_edit',
        path: 'produto/edit/:id',
        component: () => import('pages/produto/Produto'),
        meta: { title: 'Produto', subtitle: 'Edição de produto' },
        props: { modo: 'edit' }
      },
      {
        path: '/clientes',
        component: () => import('pages/cliente/Clientes'),
        meta: { title: 'Clientes', subtitle: 'Lista de clientes' }
      },
      {
        name: 'profissional_new',
        path: '/profissional',
        component: () => import('pages/cliente/ClienteEdit'),
        meta: { title: 'Clientes', subtitle: `Cadastro de profissional` },
        props: { modo: 'new' }
      },
      {
        name: 'empresa_new',
        path: '/empresa',
        component: () => import('pages/cliente/ClienteEdit'),
        meta: { title: 'Clientes', subtitle: `Cadastro de empresa` },
        props: { modo: 'new' }
      },
      {
        name: 'profissional_edit',
        path: 'profissional/edit/:id',
        component: () => import('pages/cliente/ClienteEdit'),
        meta: { title: 'Profissional', subtitle: 'Edição de profissional' },
        props: { modo: 'edit' }
      },
      {
        name: 'empresa_edit',
        path: 'empresa/edit/:id',
        component: () => import('pages/cliente/ClienteEdit'),
        meta: { title: 'Profissional', subtitle: 'Edição de empresa' },
        props: { modo: 'edit' }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
