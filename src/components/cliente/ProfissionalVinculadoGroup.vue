<template>
    <div class="row ">
        <q-list class="rounded-borders text-brand-5 col-grow">
          <q-expansion-item dense header-class="bg-grey-2" expand-icon-class="text-grey-7" dense-toggle default-opened>
            <template v-slot:header>
              <div class="q-mr-md c-add-btn text-brand-5">{{ pessoas.length }}</div>
              <q-item-section>Profissionais vinculados</q-item-section>
            </template>

            <div v-for="(pessoa) in pessoas" :key="pessoa.pessoa_id">
              <q-item dense class="bg-white">
                <q-item-section >
                  <q-item-label caption class="a-text-dense a-lh-xs">{{pessoa.pessoa_nome}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset/>
            </div>
          </q-expansion-item>
        </q-list>
      </div>
</template>

<script>
export default {
  name: 'ProfissinalVinculadoGroup',
  props: {
    pessoas: { type: Array, default: () => [] }
  }
}
</script>

<style lang="stylus" scoped>
  .c-margin-titulo {
    margin-top: 4px;
  }

  .c-add-btn {
    @extend .c-margin-titulo;
    font-weight: bold;
    margin-left: 2px;
    position: relative;
    z-index: 100;
  }

  .c-btn-del {
    float: right;
  }
</style>
