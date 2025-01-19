<template>
  <v-container fluid class="pa-3 text-body-1">
    <v-row>
      <!-- Mobile -->
      <v-col class="d-flex flex-column d-sm-none align-end h-100 bg-mywhite">
        <v-app-bar class="d-flex justify-space-between bg-white px-4" prominent>
          <NuxtLink :to="localePath('/')">
            <img
              src="/logo-completo-negro.png"
              alt="logo"
              style="width: 60%"
              class="pt-3"
            />
          </NuxtLink>
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'left' : undefined"
          temporary
          class="pa-4"
        >
          <v-list-item
            v-for="route in routes"
            :key="route.name"
            :to="route.route"
            :active="false"
            variant="plain"
            class="px-0"
          >
            {{ route.name }}</v-list-item
          >
        </v-navigation-drawer>
      </v-col>

      <!-- Desktop -->
      <v-col
        cols="12"
        class="d-none d-sm-flex justify-space-between pa-0 px-7 bg-mywhite"
      >
        <v-list-item
          v-for="route in firstHalfRoutes"
          :key="route.name"
          :to="route.route"
          :active="false"
          variant="plain"
          class="px-0 color-myblack text-center"
          :ripple="false"
          >{{ route.name }}</v-list-item
        >

        <NuxtLink :to="localePath('/')" class="d-flex align-center v-col-2">
          <img src="/logo-completo-negro.png" alt="logo" style="width: 100%" />
        </NuxtLink>

        <v-list-item
          v-for="route in secondHalfRoutes"
          :key="route.name"
          :to="route.route"
          :active="false"
          variant="plain"
          class="px-0 text-center"
          :ripple="false"
        >
          {{ route.name }}</v-list-item
        >

        <!-- <div class="d-flex align-center">
          <v-btn v-if="signOutBtn" class="bg-main color-white" @click="signOut">Cerrar sesión</v-btn>
        </div> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { getAuth, signOut } from 'firebase/auth';
// import { useGeneralStore } from '/stores/general.js';

export default {
  setup() {
    // const useGeneral = useGeneralStore();
    // const signOutBtn = computed(() => useGeneral.signOutButton);
    // return { signOutBtn, useGeneral };
    const localePath = useLocalePath();
    return { localePath };
  },
  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    routes() {
      return [
        { name: this.$t('inicio'), route: this.localePath('/') },
        { name: this.$t('actividades'), route: this.localePath('actividades') },
        {
          name: this.$t('eventos'),
          route: this.localePath('/eventos-empresariales'),
        },
        { name: this.$t('equipo'), route: this.localePath('/equipo') },
        { name: this.$t('contacto'), route: this.localePath('/contacto') },
        { name: this.$t('miReserva'), route: this.localePath('/mireserva') },
      ];
    },
    firstHalfRoutes() {
      const middleIndex = Math.ceil(this.routes.length / 2);
      return this.routes.slice(0, middleIndex);
    },
    secondHalfRoutes() {
      const middleIndex = Math.ceil(this.routes.length / 2);
      return this.routes.slice(middleIndex);
    },
  },
  // methods: {
  //   signOut() {
  //     const auth = getAuth();
  //     signOut(auth)
  //       .then(() => {
  //         //signout
  //       })
  //       .catch((error) => {
  //         // An error happened.
  //       });
  //     this.useGeneral.updateState(false, "signOutButton");
  //     return navigateTo("/admin");
  //   },
  // },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
