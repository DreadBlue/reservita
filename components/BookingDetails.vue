<template>
  <v-container fluid class="bg-mygrey rounded-xl">
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
            <span class="color-main text-h4 text-sm-h3">DETALLES DE RESERVA</span>
        </div>
        <div class="text-body-2 text-sm-body-1">
          <p>FECHA: {{ date }}</p>
          <p>HORARIO: {{ horario }}</p>
          <p>ACTIVIDAD: {{ actividad }}</p>
          <p>PARTICIPANTES: {{ amount }}</p>
        </div>
        <div class="d-flex align-center pt-3 text-body-2 text-sm-body-1">
            <v-col cols="6" class="text-start">
              <span> ¿Tienes código de descuento? </span>
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-inner-icon="mdi-ticket"
                label="Código"
                variant="solo"
                :hide-details="true"
                v-model="voucher"
                @keyup.enter="discounts(voucher)"
              >
              </v-text-field>
            </v-col>
          </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const route = useRoute();
const date = route.query.Cdate;
const horario = route.query.horario;
const actividad = route.query.actividad;
const amount = route.query.amount;
</script>
