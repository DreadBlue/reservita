<template>
  <v-container fluid class="px-3 px-sm-15 mt-sm-0 my-10">
    <v-row>
      <v-col cols="12" class="d-flex flex-column align-center ga-5">
        <span class="text-sm-h3 text-h4 color-main">{{$t('contactoTit')}}</span>
        <NuxtLink
          v-for="item in redes"
          class="d-flex ga-1 text-body-2 text-sm-body-1 pl-4 color-myblack"
          :to="item.link"
          style="text-decoration: none;"
          :key="item.icon"
        >
          <v-icon :icon="item.icon"></v-icon>
          <span>{{ item.texto }}</span>
      </NuxtLink>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <span class="text-sm-h3 text-h4 color-third">{{$t('llegar')}}</span>
      </v-col>
      <v-col cols="12" sm="6">
        <iframe src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d63475.7432196715!2d-75.69981283385229!3d6.099161385051505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d6.1501912!2d-75.632667!4m5!1s0x8e46874ff9ed1e73%3A0x158d2df331e75c4f!2sEco%20Parque%20la%20reservita%20Antigua%20V%C3%ADa%20Ferrocarril%20Amaga%2C%20Amag%C3%A1%2C%20Antioquia!3m2!1d6.062481099999999!2d-75.68840829999999!5e0!3m2!1ses-419!2sco!4v1728581927042!5m2!1ses-419!2sco" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>      </v-col>
      <v-col cols="12" sm="6" class="d-flex flex-column ga-1 pl-10">
        <span class="text-subtitle-2 text-sm-subtitle color-main mb-5"
          >{{$t('transporteTit')}}</span
        >
        <span class="text-body-2 text-sm-body-1 pl-4">{{$t('instruccionUno')}}</span>
        <span class="text-body-2 text-sm-body-1 pl-4">{{$t('instruccionDos')}}</span>
        <span class="text-body-2 text-sm-body-1 pl-4">{{$t('instruccionTres')}}</span>
        <span class="text-body-2 text-sm-body-1 pl-4">{{$t('instruccionCuatro')}}</span>
        <span class="text-body-2 text-sm-body-1 pl-4">{{$t('instruccionCinco')}}</span>
        <span class="text-body-2 text-sm-body-1 pl-4">{{$t('horarioBus')}}</span>
        <span class="text-subtitle-2 text-sm-subtitle color-main my-5"
          >{{$t('transportePriv')}}</span
        >
        <span class="text-body-2 text-sm-body-1 pl-4">{{$t('privDescription')}} </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const redes = {
  whatsapp: {
    texto: '+57 311 783 4136',
    icon: 'mdi-whatsapp',
    link: 'https://wa.me/573117834136'
  },
  instagram: {
    texto: 'Instagram',
    icon: 'mdi-instagram',
    link: 'https://www.instagram.com/lareservita'
  },
  correo: {
    texto: 'info@lareservita.com',
    icon: 'mdi-gmail',
    link: 'https://www.instagram.com/lareservita'
  },
};
</script>
