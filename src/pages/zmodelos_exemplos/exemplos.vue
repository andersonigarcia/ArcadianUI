<template>
  <q-page padding>
    <h6>Exemplo utilização de componente</h6>
    <dropdownlist></dropdownlist>

    <hr>
    <h6>Ex JS diretamente no html</h6>
    <p>{{ 2+2 }}</p>
    <p>{{ "teste".toUpperCase() }}</p>
    <p>Produto {{ nome }} - R$ {{ preco }}</p>

    <hr>
    <h6>Exemplo de link com v-bind (:)</h6>
    <p>{{ link }}</p>
    <p>
      <a :href="link">Canal</a>
    </p>

    <hr>
    <h6>Exemplo de v-model</h6>
    <input type="text" v-model="descricao">
    <span>{{ descricao }}</span>

    <hr>
    <h6>Exemplo de evento com v-on (@)</h6>
    <q-btn round icon="add" color="primary" @click="add" name="add">
      <q-spinner-oval slot="loading"/>
    </q-btn>

    <span>{{ contador }}</span>

    <q-btn round icon="remove" color="red" @click="contador -= 1" name="menos">
      <q-spinner-oval slot="loading"/>
    </q-btn>

    <h6>Exemplo de evento mousemove, keyup.enter passando parametro</h6>
    <p @mousemove="atualizarPosicao">
      Coordenadas: {{ x }} e {{ y }}
      <span @mousemove.stop>Parar coordenadas</span>
    </p>
    <input type="text" @keyup.enter="alerta">

    <h6>Diretivas v-if, v-for e v-show</h6>
    <p>V-show, rendereiza e esconde o elemento na página</p>
    <p>V-IF, não rendereiza o elemento na página</p>
    <br>
    <p v-for="(aluno, i) in alunos" :key="aluno.nome">
      {{i+1}} ) {{aluno.nome}} {{aluno.nota}}
      <span v-if="aluno.nota >= 9">- Quado de honra</span>
      <span v-else-if="aluno.nota >= 7">- Aprovado</span>
      <span v-else-if="aluno.nota >= 3">- Recuperação</span>
      <span v-else>- Reprovado</span>
    </p>

    <br>
    <h6>Lista simples</h6>
    <ul style="list-style: none;">
      <li v-for="n in 5" :key="n">
        <span v-show="n > 3">Item {{n}}</span>
      </li>
    </ul>

    <h6>Classe Css condicional</h6>
    <span @click="aplicarCor = !aplicarCor" :class="{vermelho: aplicarCor}">Teste</span>
  </q-page>
</template>

<script>
import dropdownlist from "../../components/atomicos/BaseDropdown";
import listitemsimple from "../../components/atomicos/lista";

export default {
  name: "PageTeste_exemplos",
  components: {
    dropdownlist,
    listitemsimple
  },
  data() {
    return {
      nome: "Imex",
      descricao: "...",
      preco: 6.89,
      link: "https://www.schoolofnet.com",
      contador: 0,
      x: 0,
      y: 0,

      alunos: [
        { nome: "Ana", nota: 7.8 },
        { nome: "Bia", nota: 9.1 },
        { nome: "Carlos", nota: 6.8 },
        { nome: "Daniel", nota: 2.8 }
      ],

      aplicarCor: false,

      titulo: "VueJs",
      subtitulo: "Framework Progressivo"
    };
  },
  methods: {
    add() {
      this.contador++;
    },
    atualizarPosicao(e) {
      console.log("atualizarPosicao");
      this.x = e.clientX;

      this.y = e.clientY;
    },
    alerta() {
      alert("Enter!");
    }
  },
  //Responde a qualquer alteração feita no atributo;
  watch: {
    descricao(novoValor) {
      console.log(novoValor.toUpperCase());
    }
  }
};
</script>

<style>
hr {
  border-color: #aaa;
  box-sizing: border-box;
  width: 100%;
}
.vermelho {
  background-color: red;
}
</style>
