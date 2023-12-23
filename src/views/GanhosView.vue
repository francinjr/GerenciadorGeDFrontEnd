<script setup lang="ts">
import GanhosEDespesas from "../components/GanhosEDespesas.vue";
import { ref, reactive, onMounted, shallowRef } from "vue";
import type GanhoInterface from "../types/GanhoInterface";
import GanhosAPI from "../services/GanhosAPI";
import TabelaDeCrud from "../components/tables/TabelaDeCrud.vue";
import GanhosForm from "@/components/forms/GanhosForm.vue";

const requisicaoConcluida = ref<boolean>(false);

const endPoint = ref<string>("/ganhos");
const cabecalhos = ref<any>([
  {
    title: "Nome",
    align: "start",
    sortable: false,
    key: "nome",
  },
  {
    title: "Valor(R$)",
    align: "start",
    sortable: false,
    key: "valor",
  },
  {
    title: "Descrição",
    align: "start",
    sortable: false,
    key: "descricao",
  },
  { title: "Ações", align: "start", sortable: false, key: "actions" },
]);

const dadosDosGanhos = reactive<GanhoInterface[]>([]);

const ganhoPadrao: GanhoInterface = {
  nome: "",
  valor: 0,
  descricao: "",
  id: 0,
};

const textoDosItensPorPagina = ref<string>("Ganhos por página");

// aqui é onde coloca o formulário que deseja que aparece ao clicar no botão Novo,
//na tabela de crud
const formularioGanhos = ref(GanhosForm);
//const formularioGanhos = shallowRef(GanhosForm);

onMounted(() => {
  mostrarTodosGanhos();
});

async function mostrarTodosGanhos(): Promise<undefined> {
  try {
    const response = await GanhosAPI.listarTodos();
    dadosDosGanhos.push(...response.data);
    console.log("Dados buscados com sucesso!");
    console.log("O ganho da posição 0 é: " + dadosDosGanhos[0].nome);
    console.log("tam array: " + dadosDosGanhos.length);
    console.log(
      "O valor do requisicaoConcluida na chamada da api: " +
        requisicaoConcluida.value
    );
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os ganhos: ", error);
  } finally {
    requisicaoConcluida.value = true;
  }
}
</script>

<template>
  <main>
    <h1 class="text-center mt-5">Gerenciador de ganhos e despesas</h1>
    <TabelaDeCrud
      :cabecalhos="cabecalhos"
      :itensDaTabela="dadosDosGanhos"
      :endPoint="endPoint"
      :objetoPadrao="ganhoPadrao"
      :textoDosItensPorPagina="textoDosItensPorPagina"
      :formularioDaTabela="formularioGanhos"
    />
    <v-container>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <GanhosEDespesas :dadosGanhos="dadosDosGanhos" class="mx-auto" />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
