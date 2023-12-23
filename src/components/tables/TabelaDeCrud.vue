<template>
  <div>
    <v-data-table
      :headers="cabecalhos"
      :items="itensDaTabela"
      class="elevation-1"
      :items-per-page-text="props.textoDosItensPorPagina"
    >
      <template v-slot:top>
        <v-toolbar flat color="var(--tertiary-color)">
          <v-toolbar-title>Tabela de Ganhos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="50%">
            <template v-slot:activator="{ props }">
              <v-btn
                color="var(--quaternary-color)"
                style="background-color: var(--primary-color)"
                v-bind="props"
              >
                Novo
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <!--<TableForm :objetoFormulario="props.objetoPadrao" />-->
                <component :is="props.formularioDaTabela" :objetoFormulario="props.objetoPadrao" />
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue-darken-1" variant="outlined" @click="save">
                  Salvar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Tem certeza que deseja deletar esse item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteItemConfirm"
                  >Sim</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          color="var(--primary-color)"
          width="95"
          height="55"
          @click="editItem(item)"
          class="my-2 mr-2"
          >Editar</v-btn
        >
        <v-btn
          color="var(--primary-color)"
          width="95"
          height="55"
          @click="deleteItem(item)"
          class="my-2 mr-2"
          >Deletar</v-btn
        >
        <!--<v-btn
          color="var(--primary-color)"
          width="95"
          height="55"
          @click="buscarItem(item)"
          class="my-2 mr-2"
          >Teste de Busca</v-btn
        >-->
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
        <v-alert
          class="mt-5"
          v-model="alertaDaAPI.alerta"
          border="top"
          :color="alertaDaAPI.cor"
          :title="alertaDaAPI.titulo"
        >
          {{ alertaDaAPI.mensagem }}
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  onMounted,
  type PropType,
  watch,
  computed,
  nextTick,
} from "vue";
import { VDataTable } from "vuetify/labs/components";
import Crud from "../../services/Crud";
import type GanhoInterface from "@/types/GanhoInterface";

const props = defineProps({
  itensDaTabela: {
    required: true,
    type: Array as PropType<any>,
  },
  cabecalhos: {
    required: true,
    type: Array as PropType<TableHeader>,
  },
  endPoint: {
    required: true,
    type: String,
  },
  objetoPadrao: {
    required: true,
    type: Object,
  },
  textoDosItensPorPagina: {
    required: true,
    type: String,
  },
  formularioDaTabela: {
    required: true,
    type: Object
  }
});


type TableHeader = InstanceType<typeof VDataTable>["headers"];
type TableItemType = typeof props.itensDaTabela;

//const meuComponente = TableForm;

const dialog = ref<boolean>(false);
const dialogDelete = ref<boolean>(false);

const editedIndex = ref<number>(-1);
const editedItem = reactive<any>(props.objetoPadrao);
const defaultItem = reactive<any>(props.objetoPadrao);

interface AlertaDeAPI {
  alerta: boolean;
  titulo: string;
  mensagem: string;
  cor: string;
}

const alertaDaAPI = reactive<AlertaDeAPI>({
  alerta: false,
  titulo: "",
  mensagem: "",
  cor: "black",
});

onMounted(() => {
  console.log("Montado");
  console.log(props.objetoPadrao.nome);
  console.log(props.objetoPadrao.valor);
  console.log(props.objetoPadrao.descricao);
  console.log(props.objetoPadrao.id);
});

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "Novo item" : "Editar o item";
});

watch(dialog, (val) => {
  if (!val) {
    close();
  }
});

watch(dialogDelete, (val) => {
  if (!val) {
    closeDelete();
  }
});

const initialize = () => {
  console.log("Initialize chamado");
};

const editItem = (item: any) => {
  console.log("O id do item no método editItem: " + item.id);
  editedIndex.value = props.itensDaTabela.indexOf(item);
  Object.assign(editedItem, item);
  dialog.value = true;
};

const deleteItem = (item: any) => {
  editedIndex.value = props.itensDaTabela.indexOf(item);
  Object.assign(editedItem, item);
  dialogDelete.value = true;
};

async function deleteItemConfirm(): Promise<any> {
  alertaDaAPI.titulo = "Deleção de Item";
  try {
    const response = await Crud.deletar(
      props.endPoint,
      props.itensDaTabela[editedIndex.value].id
    );
    console.log("Status da deleção: " + response.status);
    props.itensDaTabela.splice(editedIndex.value, 1);
    alertaDaAPI.cor = "var(--success-color)";
    alertaDaAPI.mensagem = "Item deletado com sucesso";
  } catch (error) {
    alertaDaAPI.cor = "var(--error-color)";
    alertaDaAPI.mensagem = "Não foi possível deletar o item";
    console.log("Não foi possível deletar o item: ", error);
  } finally {
    mostrarAlerta();
    closeDelete();
  }
}

//watch(() => props.itensDaTabela, () => {});

function close() {
  dialog.value = false;
  nextTick(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  });
}

function closeDelete() {
  dialogDelete.value = false;
  nextTick(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  });
}

async function save(): Promise<undefined> {
  if (editedIndex.value > -1) {
    alertaDaAPI.titulo = "Atualização de Item";
    console.log(
      "O nome do editedItem dentro do bloco if é: " + editedItem.nome
    );
    console.log("O id do editedItem dentro do bloco if é: " + editedItem.id);
    console.log("Entrou no atualizar");
    console.log("Valor dos campos que irão atualizar o item:");
    console.log(editedItem.nome);
    console.log(editedItem.valor);
    console.log(editedItem.descricao);
    console.log(editedItem.id);
    try {
      const response = await Crud.atualizar(
        props.endPoint,
        editedItem.id,
        editedItem
      );
      console.log("O response status é: ", response.status);
      const objetoAtualizado = response.data;

      Object.assign(props.itensDaTabela[editedIndex.value], objetoAtualizado);

      alertaDaAPI.cor = "var(--success-color)";
      alertaDaAPI.mensagem = "Item atualizado com sucesso";
    } catch (error) {
      alertaDaAPI.cor = "var(--error-color)";
      alertaDaAPI.mensagem = "Não foi possível atualizar o item";
      console.error("Ocorreu um erro ao atualizar o item: ", error);
    } finally {
      mostrarAlerta();
    }
  } else {
    alertaDaAPI.titulo = "Criação de Item";
    try {
      console.log(
        "O nome do editedItem dentro do bloco else é: " + editedItem.nome
      );
      console.log(
        "O id do editedItem dentro do bloco else é: " + editedItem.id
      );
      const response = await Crud.adicionar(props.endPoint, editedItem);
      const objetoCriado = response.data;
      props.itensDaTabela.push(objetoCriado);
      alertaDaAPI.cor = "var(--success-color)";
      alertaDaAPI.mensagem = "Item criado com sucesso";
    } catch (error) {
      alertaDaAPI.cor = "var(--error-color)";
      alertaDaAPI.mensagem = "Não foi possível adicionar um novo item";
      console.log("Não foi possível adicionar um novo item" + error);
    } finally {
      mostrarAlerta();
    }
  }
  close();
}

const mostrarAlerta = () => {
  alertaDaAPI.alerta = true;
  setTimeout(() => {
    alertaDaAPI.alerta = false;
  }, 5000);
};
</script>

<style scoped></style>
