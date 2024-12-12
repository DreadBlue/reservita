<template>
        <v-container fluid class="pa-0 py-sm-8 py-15">
      <v-row>
        <v-col cols="12" md="3">
          <AdminBannerFilter :items="categories"/>
        </v-col>
        <v-col cols="12" md="9">
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup>
  definePageMeta({
    // middleware: 'auth',
    layout: 'admin'
  });

  const categories = {
    one: {
        name: 'VENTAS',
        icon: 'mdi-cash'
    },
    two: {
        name: 'COMISIONES',
        icon: 'mdi-domain'
    },
    three: {
        name: 'FACTURAS',
        icon: 'mdi-note-text-outline'
    }
  }
</script>