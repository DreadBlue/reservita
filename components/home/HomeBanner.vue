<template>
  <v-container
    fluid
    class="pa-0 py-5"
    style="
      background-image: url('/images/home.webp');
      background-size: cover;
      background-position: center;
      height: 87vh;
    "
  >
    <v-row class="mt-2 mt-sm-0 h-100 d-flex align-end justify-center">
      <v-col cols="9" sm="5">
        <general-availability-searcher />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.top-right {
  position: absolute;
  top: 4%;
  right: 0;
  margin: 16px; /* Ajusta el margen según tus necesidades */
}
</style>
