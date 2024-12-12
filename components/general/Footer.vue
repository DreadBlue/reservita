<template>
  <v-container
    fluid
    class="pa-0 mt-0 text-body-2 text-sm-footer"
    style="color: white; font-size: 0.9rem"
  >
    <v-row class="bg-main px-15 mx-0">
      <v-col
        cols="12"
        sm="3"
        class="d-flex flex-column pa-0 py-5 text-center"
        style="font-style: italic"
      >
        <NuxtLink :to="localePath('/')">
          <img
            src="/logo-cuadro.png"
            alt="Logo"
            style="max-width: 30%"
            class="pb-3"
          />
        </NuxtLink>
        <span>Amagá, Antioquia</span>
        <span>info@lareservita.com</span>
      </v-col>
      <v-col
        cols="6"
        class="d-none d-sm-flex flex-column justify-center text-center align-end"
      >
      </v-col>
      <v-col
        cols="12"
        sm="3"
        class="d-flex flex-column justify-center pl-3 pl-sm-15 align-center"
      >
        <div class="pb-2">{{$t('siguenos')}}</div>
        <div class="d-flex w-25 ga-4 justify-center">
          <NuxtLink
            to="https://www.instagram.com/lareservita/"
            style="color: white"
          >
            <v-icon icon="mdi-instagram"></v-icon>
          </NuxtLink>
          <NuxtLink to="https://wa.me/573117834136" style="color: white">
            <v-icon icon="mdi-whatsapp"></v-icon>
          </NuxtLink>
        </div>
      </v-col>
    </v-row>
    <v-row class="bg-mywhite mx-0 py-2 color-myblack">
      <v-col
        cols="12"
        sm="5"
        class="d-flex ga-5 pl-6 pl-sm-15 align-center pt-0"
      >
        <NuxtLink>{{$t('terminos')}}</NuxtLink>
        <NuxtLink
          to="https://maps.app.goo.gl/jBA9pdr4HLQ8eazK"
          style="text-decoration: none;"
          class="color-myblack"
          >Maps</NuxtLink
        >
        <NuxtLink :to="localePath('/admin')" style="text-decoration: none;"
        class="color-myblack"
          >Admin</NuxtLink
        >
      </v-col>
      <v-col cols="12" sm="7" class="justify-end pt-0">
        <div class="text-end pr-10">
          {{$t('desarrollado')}}
          <NuxtLink
            to="https://dreadblue.com"
            style="text-decoration: none"
            class="color-main"
            >Dread Blue SAS</NuxtLink
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="js">
  const localePath = useLocalePath();
</script>