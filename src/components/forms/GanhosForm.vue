<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="editedItem.nome"
            label="Nome do ganho"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field v-model="editedItem.valor" label="Valor"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="12">
          <v-text-field
            v-model="editedItem.descricao"
            label="Descrição"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps({
  objetoFormulario: {
    required: true,
    type: Object,
  },
});

//const editedIndex = ref<number>(-1);
const editedItem = reactive<any>(props.objetoFormulario);
//const defaultItem = reactive<any>(props.objetoFormulario);
</script>
