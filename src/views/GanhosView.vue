<script setup lang="ts">
import GanhosEDespesas from "../components/GanhosEDespesas.vue";
import { ref, reactive, onMounted, shallowRef } from "vue";
import type FinanceInterface from "../types/FinanceInterface";
import GanhosAPI from "../services/GanhosAPI";
import TabelaDeCrud from "../components/tables/TabelaDeCrud.vue";
import GanhosForm from "@/components/forms/GanhosForm.vue";

onMounted(() => {
  mostrarTodosGanhos();
});

async function mostrarTodosGanhos(): Promise<undefined> {
  try {
    const response = await GanhosAPI.listarTodos();
    dadosDosGanhos.push(...response.data);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os ganhos: ", error);
  }
}

const endPoint = ref<string>("api/finances/v1");
const cabecalhos = ref<any>([
  {
    title: "Nome",
    align: "start",
    sortable: false,
    key: "name",
  },
  {
    title: "Valor(R$)",
    align: "start",
    sortable: false,
    key: "value",
  },
  {
    title: "Descrição",
    align: "start",
    sortable: false,
    key: "description",
  },
  {
    title: "Tipo de finança",
    align: "start",
    sortable: false,
    key: "type",
  },
  { title: "Ações", align: "start", sortable: false, key: "actions" },
]);

const dadosDosGanhos = reactive<FinanceInterface[]>([]);

const ganhoPadrao: FinanceInterface = {
  name: "",
  value: null,
  description: "",
  type: ["Ganho", "Despesa"],
  startDate: null,
  endDate: null,
  id: 0,
};

const objectFormData = reactive<FinanceInterface>({
  name: "",
  value: null,
  description: "",
  type: "",
  startDate: null,
  endDate: null,
  id: 0,
});

function setSpecialFields() {
  console.log("Entrou no setSpecialFields. O valor de objectFormData.name é: " + objectFormData.name)
  console.log("Entrou no setSpecialFields. O valor de objectFormData.financeTypes é: " + objectFormData.type)
  switch (objectFormData.type) {
    case "Ganho":
      console.log("Dentro do case Ganho: " + objectFormData.type);
      objectFormData.type = "EARNING";
      console.log("Dentro do case Ganho: " + objectFormData.type);
      break;

    case "Despesa":
      console.log("Dentro do case Despesa: " + objectFormData.type);
      objectFormData.type = "EXPENSE";
      console.log("Dentro do case Despesa: " + objectFormData.type);
      break;

    default:
      console.log("Deu F amigao");
      break;
  }
}

const textoDosItensPorPagina = ref<string>("Ganhos por página");

// aqui é onde coloca o formulário que deseja que apareça ao clicar no botão Novo,
//na tabela de crud
const formularioGanhos = ref(GanhosForm);
//const formularioGanhos = shallowRef(GanhosForm);
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
      :objectFormData="objectFormData"
      :setSpecialFields="setSpecialFields"
    />
    <GanhosEDespesas :dadosGanhos="dadosDosGanhos" class="mx-auto" />
    <!--<v-container>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <GanhosEDespesas :dadosGanhos="dadosDosGanhos" class="mx-auto" />
        </v-col>
      </v-row>
    </v-container>-->
  </main>
</template>../types/FinanceInterface
