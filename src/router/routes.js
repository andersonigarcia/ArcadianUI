
export default [
  {
    path: '/',  component: () => import('layouts/default'),
    children: [
      { path: '/',
        component: () => import('pages/index'),
      },

      { path: 'Produto',
        name: 'produto',
        component: () => import('pages/produto/consulta'),
        breadcrumb:[
          {name:'pagina', link:'pages'},
          {name:'produto', link:'cadastro'},
          {name:'produto', link:'lista'}
        ]
      },

      { path: 'cadastrar',
        component: () => import('pages/produto/cadastro')
      },

      { path: 'tarefas',
        component: () => import('pages/usuario/tarefas')
      },

      { path: 'logar',
        component: () => import('pages/gestao/login')
      },

      { path: 'exemplo',
        component: () => import('pages/zmodelos_exemplos/exemplos')
      },

      { path: 'flexCss',
        component: () => import('pages/zmodelos_exemplos/flex_css')
      }

      // {path: 'ccFormProduto',
      //   component: () => import('pages/produto/formProduto')
      // }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/controle/404')
  }
]
