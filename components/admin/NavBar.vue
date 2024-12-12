<template>
  <v-container fluid class="pa-3">
    <v-row>
      <!-- Mobile -->
      <v-col class="d-flex flex-column d-sm-none align-end h-100 bg-mywhite">
        <v-app-bar class="d-flex justify-space-between bg-white px-4" prominent>
          <NuxtLink :to="localePath('/admin/reservas')">
            <img src="/admin/adminLogo.png" alt="logo" style="width: 60%" class="pt-3" />
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
            :title="route.name"
            :active="false"
            variant="plain"
            class="px-0"
          ></v-list-item>
        </v-navigation-drawer>
      </v-col>
      
      <!-- Desktop -->
      <v-col cols="12" class="d-none d-sm-flex justify-space-between pa-0 px-7 bg-mywhite">
        <v-list-item
          v-for="route in firstHalfRoutes"
          :key="route.name"
          :to="route.route"
          :title="route.name"
          :active="false"
          variant="plain"
          class="px-0 color-myblack v-col-1 text-center"
          :ripple="false"
        ></v-list-item>
        
        <NuxtLink to="/admin/reservas" class="d-flex align-center v-col-2">
          <img src="/admin/adminLogo.png" alt="logo" style="width: 100%"/>
        </NuxtLink>
        
        <v-list-item
          v-for="route in secondHalfRoutes"
          :key="route.name"
          :to="route.route"
          :title="route.name"
          :active="false"
          variant="plain"
          class="px-0 v-col-1 text-center"
          :ripple="false"
        ></v-list-item>
        
        <div class="d-flex align-center">
          <v-btn class="bg-main color-white" @click="signOut">{{$t('logout')}}</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { getAuth, signOut } from 'firebase/auth';
// import { useGeneralStore } from '/stores/general.js';
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { t } = useI18n();
    const localePath = useLocalePath()
    // const useGeneral = useGeneralStore();
    // const signOutBtn = computed(() => useGeneral.signOutButton);
    return { t, localePath };
  },
  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    firstHalfRoutes() {
      const middleIndex = Math.ceil(this.routes.length / 2);
      return this.routes.slice(0, middleIndex);
    },
    secondHalfRoutes() {
      const middleIndex = Math.ceil(this.routes.length / 2);
      return this.routes.slice(middleIndex);
    },
    routes() {
      const localePath = useLocalePath()
      return [ 
        {
          name: this.t('inicio'),
          route: localePath('/'),
        },
        {
          name: this.t('reservas'),
          route: localePath('/admin/reservas'),
        },
        {
          name: this.t('gestion'),
          route: localePath('/admin/gestion'),
        },
        {
          name: this.t('finanzas'),
          route: localePath('/admin/finanzas'),
        },
        {
          name: this.t('solicitudes'),
          route: localePath('/admin/solicitudes'),
        },
      ];
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

