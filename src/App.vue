<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";

onMounted(() => {
  console.log("App")
});
</script>

<template>
  <header>
    <div>
      <!--<HelloWorld msg="You did it!" />-->
      <nav>
        <v-card color="var(--tertiary-color)">
          <RouterLink to="/"
            ><v-btn color="var(--primary-color)" class="ml-5 my-5"
              >Home</v-btn
            ></RouterLink
          >
          <RouterLink to="/ganhos">
            <v-btn color="var(--primary-color)" class="ml-5 my-5">Ganhos</v-btn>
          </RouterLink>
          <RouterLink to="/about"
            ><v-btn color="var(--primary-color)" class="ml-5 my-5"
              >About</v-btn
            ></RouterLink
          >
        </v-card>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
</style>
