<template>
  <div>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="12" sm="12">
          <v-sheet color="var(--tertiary-color)" class="d-flex" elevation="2">
            <v-container fluid>
              <v-row>
                <v-col
                  v-for="financa in props.dadosGanhos"
                  :key="financa.id"
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <v-card class="ma-2">
                    <span class="ma-2">{{ financa.nome }}<br /></span>
                    <span class="ma-2">{{ financa.valor }}<br /></span>
                    <span class="ma-2">{{ financa.descricao }}<br /></span>
                    <v-btn color="var(--primary-color)" class="ma-2">E</v-btn>
                    <v-btn color="var(--primary-color)" class="ma-2">D</v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type PropType } from "vue";
import type GanhoInterface from "../types/GanhoInterface";

const props = defineProps({
  dadosGanhos: {
    required: true,
    type: Array as PropType<GanhoInterface[]>,
  },
});

onMounted(() => {});


</script>
../types/FinanceInterface