<template>
  <v-container fluid class="bg-mygrey rounded-xl">
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <span class="color-main text-h5 text-sm-h3">{{$t('detalles')}}</span>
        </div>
        <div class="text-body-1 pt-5 d-flex flex-column ga-1">
          <div class="d-flex pl-2 ga-2 align-center">
            <v-icon icon="mdi-calendar-range"></v-icon>
            <p>{{ dayjs(date).format("DD/MM/YYYY") }}</p>
          </div>
          <div class="d-flex pl-2 ga-2 align-center">
            <v-icon icon="mdi-clock-outline"></v-icon>
            <p>{{ horario }}</p>
          </div>
          <div class="d-flex pl-2 ga-2 align-center">
            <v-icon icon="mdi-hiking"></v-icon>
            <p>{{ activity }}</p>
          </div>
          <div class="d-flex pl-2 ga-2 align-center">
            <v-icon icon="mdi-account-multiple"></v-icon>
            <p>{{ quantity }}</p>
          </div>
          <div class="d-flex pl-2 ga-2 align-center">
            <v-icon icon="mdi-cash"></v-icon>
            <p>{{ price.toLocaleString("es-Co") }}</p>
          </div>
          <v-checkbox
            v-model="almuerzo"
            :label="$t('almuerzo')"
            hide-details
          ></v-checkbox>
          <section v-if="almuerzo">
            <div class="d-flex">
              <v-icon icon="mdi-"></v-icon>
              <p class="text-body-2 w-75 mr-9">{{$t('almuerzoFiambre')}}</p>
              <v-select
                v-model="fiambre"
                max-width="80"
                variant="outlined"
                :items="optionList[0]"
              ></v-select>
            </div>
            <div class="d-flex justify-start">
              <v-icon icon="mdi-"></v-icon>
              <p class="text-body-2 w-75 mr-9">{{$t('almuerzoSaludable')}}</p>
              <v-select
                v-model="saludable"
                max-width="80"
                variant="outlined"
                :items="optionList[0]"
              ></v-select>
            </div>
          </section>
          <v-checkbox
            v-model="transporte"
            :label="$t('transporte')"
            hide-details
          ></v-checkbox>
        </div>
        <div class="d-flex align-center pt-3 text-body-2 text-sm-body-1">
          <v-col cols="6" class="text-start">
            <span> {{$t('codigoPre')}} </span>
          </v-col>
          <v-col cols="6">
            <v-text-field
              prepend-inner-icon="mdi-ticket"
              :label="$t('codigoDes')"
              variant="solo"
              :hide-details="true"
              v-model="voucher"
              @keyup.enter="discounts(voucher)"
            >
            </v-text-field>
            <p>{{ codeVerification }}</p>
          </v-col>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBookingStore } from "/stores/booking.js";
const useBooking = useBookingStore();
import dayjs from "dayjs";

const { quantity, horario, activity, date } = useBooking;
const almuerzo = ref(false);
const transporte = ref(false);


const price = computed(
  () => useBooking.bookingPrice + useBooking.addonsPrice - useBooking.discount
);
const optionList = ref([]);
const fiambre = ref(0);
const saludable = ref(0);

watch([fiambre, saludable, transporte], ([value, valueDos, valueTres]) =>{
  useBooking.updateDetails({almuerzo: value + valueDos, transporte: valueTres})
})

watch([almuerzo, transporte, fiambre, saludable], ([value, valueDos, valueTres, valueCuatro]) => {
  const plates = valueCuatro + valueTres;
  const precioComida = value ? 18000 * plates : 0;
  const precioTransporte = valueDos ? 200000 : 0;
  const statusTransporte = valueDos ? 'incluido' : 'noIncluido' ;
  
  useBooking.updateDetails({ addonsPrice: precioComida + precioTransporte, transporte: statusTransporte });
});

const voucher = ref("");
const codeVerification = ref("");
function discounts(discount) {
  codeVerification.value = useBooking.applyDiscount(discount);
}

onMounted(()=> {
  const options = ref([]);
    for (let i = 0; i <= quantity; i++) {
      options.value.push(i);
    }
    optionList.value.push(options.value)
})
</script>
