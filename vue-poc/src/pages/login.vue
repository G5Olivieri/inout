<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="text-center">Login</v-card-title>
          <v-card-text>
            <v-form v-model="form" @submit.prevent="onSubmit">
              <v-text-field
                label="Usuário"
                class="mb-2"
                v-model="username"
                :readonly="loading"
                :rules="[required]"
                clearable
              ></v-text-field>
              <v-text-field
                label="Senha"
                type="password"
                class="mb-2"
                v-model="password"
                :readonly="loading"
                :rules="[required]"
                clearable
              ></v-text-field>
              <v-btn type="submit" color="primary">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const router = useRouter();
const form = ref(false);
const username = ref("");
const password = ref("");
const loading = ref(false);

const required = (v: string) => {
  return !!v || "Campo obrigatório";
};

const onSubmit = () => {
  userStore.login(username.value, password.value);
  router.push("/");
};
</script>
