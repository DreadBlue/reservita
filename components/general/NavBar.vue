<template>
  <v-container fluid>
    <v-row>
      <v-col cols="7" sm="3">
        <NuxtLink to="/">
          <img src="/logo-cuadro-negro.png" alt="logo" style="width: 20%" />
        </NuxtLink>
      </v-col>
      <v-col class="d-flex flex-column d-sm-none align-end h-100">
        <v-app-bar class="d-flex justify-space-between bg-white px-7" prominent>
          <NuxtLink to="/">
            <img src="/logo-cuadro-negro.png" alt="logo" style="width: 15%" />
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
        >
          <v-list-item
            v-for="route in routes"
            :key="route.name"
            :to="route.route"
            :title="route.name"
            :active="false"
            variant="plain"
            class="px-0"
          ></v-list-item>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="9" class="d-none d-sm-flex justify-space-evenly pa-0">
        <v-list-item
          v-for="route in routes"
          :key="route.name"
          :to="route.route"
          :title="route.name"
          :active="false"
          variant="plain"
          class="px-0"
        ></v-list-item>
        <div class="d-flex align-center">
          <v-btn v-if="signOutBtn" class="bg-main color-white" @click="signOut"
            >Cerrar sesión</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { getAuth, signOut } from 'firebase/auth';
// import { useGeneralStore } from '/stores/general.js';

export default {
  // setup() {
  //   const useGeneral = useGeneralStore();
  //   const signOutBtn = computed(() => useGeneral.signOutButton);
  //   return { signOutBtn, useGeneral };
  // },
  data: () => ({
    drawer: false,
    group: null,
    routes: [
      {
        name: "INICIO",
        route: "/",
      },
      {
        name: "ACTIVIDADES",
        route: "/actividades",
      },
      {
        name: "EVENTOS EMPRESARIALES",
        route: "/eventos-empresariales",
      },
      {
        name: "EQUIPO",
        route: "equipo",
      },
      {
        name: "CONTACTO",
        route: "/contacto",
      },
      {
        name: "MI RESERVA",
        route: "/mireserva",
      },
    ],
  }),
  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          //signout
        })
        .catch((error) => {
          // An error happened.
        });
      this.useGeneral.updateState(false, "signOutButton");
      return navigateTo("/admin");
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
