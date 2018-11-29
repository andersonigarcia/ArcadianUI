import Axios from "../../../node_modules/axios";

export const lista = (state) => {

  console.log(Axios. get('../../json_dados/produto/produtos.json').then( (response) => {
    state.commit('setProdutos', response.data.produtos || [] )
  }
 ))
}

