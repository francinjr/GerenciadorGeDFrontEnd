<template>
  <div>
    <v-data-table
      :headers="cabecalhos"
      :items="itensDaTabela"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="var(--tertiary-color)">
          <v-toolbar-title>Tabela de Ganhos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
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
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="5">
                      <v-text-field
                        v-model="editedItem.nome"
                        label="Nome do ganho"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.valor"
                        label="Valor"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.descricao"
                        label="Descrição"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
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
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
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

//const itemsPorPagina = ref<number>(10);
const props = defineProps({
  itensDaTabela: {
    required: true,
    type: Array as PropType<any>,
  },
  cabecalhos: {
    required: true,
    type: Array as PropType<TableHeader>,
  },
});

type TableHeader = InstanceType<typeof VDataTable>["headers"];
type TableItemType = typeof props.itensDaTabela;

//const itensDaTabela = ref<any[]>(props.itensTabela);

const dialog = ref<boolean>(false);
const dialogDelete = ref<boolean>(false);

const editedIndex = ref<number>(-1);
const editedItem = reactive<any>({
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
});
const defaultItem = reactive<any>({
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
});

onMounted(() => {
  console.log("Montado");
});

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "Novo item" : "Editar  o item";
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
  console.log("Initialize chamado amigo");
};

const editItem = (item: any) => {
  editedIndex.value = props.itensDaTabela.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
};

const deleteItem = (item: any) => {
  editedIndex.value = props.itensDaTabela.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
};

function deleteItemConfirm() {
  props.itensDaTabela.splice(editedIndex.value, 1);
  closeDelete();
}

function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem);
    editedIndex.value = -1;
  });
}

function closeDelete() {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem);
    editedIndex.value = -1;
  });
}

function save() {
  if (editedIndex.value > -1) {
    Object.assign(props.itensDaTabela[editedIndex.value], editedItem);
  } else {
    props.itensDaTabela.push(editedItem);
  }
  close();
}
</script>

<style scoped></style>
