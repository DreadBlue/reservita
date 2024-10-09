<template>
  <v-container fluid class="pa-0 py-15" :class="model.clases">
    <v-row>
      <v-col cols="12">
        <p class="text-center px-sm-15 mx-sm-15 px-10 text-sm-body-1 text-body-2">
          Somos un <span class="text-sm-h4 text-h6 text-fun">ecoparque</span> de
          aventura que ofrece
          <span class="text-sm-h4 text-h6 text-fun">experiencias</span> de
          cañonismo, torrentismo y arborismo. Nos
          <span class="text-sm-h4 text-h6 text-fun">especializamos</span> en
          brindar
          <span class="text-sm-h4 text-h6 text-fun">aventuras</span>
          emocionantes y seguras, inmersas en la
          <span class="text-sm-h4 text-h6 text-fun">naturaleza</span>, para
          aquellos que buscan desafiar sus límites y
          <span class="text-sm-h4 text-h6 text-fun">disfrutar</span> de paisajes
          impresionantes.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
defineProps({
  model: {
    type: Object,
    required: true,
  },
});
</script>
