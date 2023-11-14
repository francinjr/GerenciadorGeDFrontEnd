<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="6" md="6" sm="12">
          <v-card
            color="var(--tertiary-color)"
            width="500"
            height="800"
            class="mx-auto my-8"
          >
            <v-card-title>Ganhos</v-card-title>
            <v-divider></v-divider>
            <v-list lines="one" style="background-color: var(--tertiary-color)">
              <v-list-item v-for="ganho in dadosGanhos" :key="ganho.id">
                {{ ganho.nome }} - R$ {{ ganho.valor }}<br />
                {{ ganho.descricao }}
                <v-divider></v-divider>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="6" md="6" sm="12">
          <v-card
            color="var(--tertiary-color)"
            width="500"
            height="800"
            class="mx-auto my-8"
          >
            <v-card-title>Despesas</v-card-title>
            <v-list lines="one" style="background-color: var(--tertiary-color)">
              <v-list-item v-for="ganho in dadosGanhos" :key="ganho.id">
                {{ ganho.nome }} - R$ {{ ganho.valor }}
              </v-list-item>
            </v-list>
          </v-card>
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
