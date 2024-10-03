<template>
  <v-container fluid class="pa-0 py-15" :class="model.clases">
    <v-row>
      <v-col cols="12">
        <p class="text-center px-15 mx-15 text-body-1">Somos un <span class="text-h4 text-fun">ecoparque</span> de aventura que ofrece <span class="text-h4 text-fun">experiencias</span> de cañonismo, torrentismo y arborismo. Nos <span class="text-h4 text-fun">especializamos</span> en brindar <span class="text-h4 text-fun">aventuras</span> emocionantes y seguras, inmersas en la <span class="text-h4 text-fun">naturaleza</span>, para aquellos que buscan desafiar sus límites y <span class="text-h4 text-fun">disfrutar</span> de paisajes impresionantes.</p>
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
