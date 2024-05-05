<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            variant="outlined"
            v-model="props.objectFormData.name"
            label="Nome da finança"
            color="var(--primary-color)"
            :error-messages="props.objectFormDataValidation.name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            variant="outlined"
            v-model="props.objectFormData.type"
            label="Tipo de finança"
            :items="props.objetoFormulario.type"
            color="var(--primary-color)"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            variant="outlined"
            v-model="props.objectFormData.value"
            label="Valor"
            color="var(--primary-color)"
          ></v-text-field>
        </v-col>
        <!--<v-col cols="12" sm="6" md="6">
          <v-select
            variant="outlined"
            v-model="editedItem.financeType"
            label="Tipo de finança"
            :items="objetoFormulario.financeTypes"
            @update:modelValue="handleItemSelection"
            color="var(--primary-color)"
          ></v-select>
        </v-col>-->
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="props.objectFormData.startDate"
            type="date"
            label="Data de início da finança"
            variant="outlined"
            color="var(--primary-color)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="props.objectFormData.endDate"
            type="date"
            label="Data de fim da finança"
            variant="outlined"
            color="var(--primary-color)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="12">
          <v-textarea
            variant="outlined"
            v-model="props.objectFormData.description"
            label="Descrição"
            color="var(--primary-color)"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type FinanceInterface from "@/types/FinanceInterface";

const props = defineProps({
  objetoFormulario: {
    required: true,
    type: Object,
  },
  objectFormData: {
    required: true,
    type: Object,
  },
  objectFormDataValidation: {
    required: true,
    type: Object
  }
});
</script>
