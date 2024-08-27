<template>
  <v-toolbar>
    <v-dialog v-model="model" max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          prepend-icon="mdi-magnify"
          block
          class="justify-start"
        >
      <v-kbd>CTRL + K</v-kbd></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Dialog">
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-toolbar>
  <v-sheet>
    <v-list
      lines="one"
      v-if="search != ''"
      class="position-absolute elevation-24"
    >
      <v-list-item
        v-for="n in 10"
        :key="n"
        :title="'Item ' + n"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
      ></v-list-item>
    </v-list>
  </v-sheet>
  <v-container class="elevation-0">
    <v-card>
      <v-card-title>Mano alguma coisa aqui</v-card-title>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
const search = ref("");
const searchEl = ref<HTMLInputElement | null>(null);
const model = shallowRef(false);

const keyboardHandle = (e: KeyboardEvent) => {
  console.log(document.activeElement)
  if (document.body === document.activeElement) {
    model.value = true
  }
};

const buttonHandle = () => {
  console.log("button handle")
  model.value = true;
};

onMounted(() => {
  searchEl.value?.addEventListener("keydown", buttonHandle);
  window.addEventListener("keydown", keyboardHandle);
});

onBeforeUnmount(() => {
  searchEl.value?.removeEventListener("keydown", buttonHandle);
  window.removeEventListener("keydown", keyboardHandle);
});
</script>
