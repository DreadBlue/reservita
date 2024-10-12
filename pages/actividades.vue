<template>
  <v-container fluid class="pa-sm-0 px-0 pt-10">
    <v-row>
      <v-col>
        <GeneralBanner :model="presentation"/>
        <GeneralImageDescription v-for="activity in actividades" :item="activity"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import actividades from "@/assets/actividades.json"
const presentation = {
  image: "/logo-cuadro.png",
  clases: "bg-main color-white",
  classTitle: "text-sm-h4 mb-10",
  title: "LA RESERVITA",
  descripcion: "En nuestro eco parque, cada actividad te invita a reconectar con lo esencial. El arborismo te desafía a explorar la altura de los árboles, mientras que el canyoning te sumerge en paisajes naturales. Ambas experiencias no solo son emocionantes, sino que también refuerzan el respeto por la sostenibilidad y el cuidado del entorno. Vive la aventura y contribuye al equilibrio de la naturaleza en un entorno diseñado para generar conciencia y conexión con lo que realmente importa."
}
</script>