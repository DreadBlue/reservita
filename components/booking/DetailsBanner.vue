<template>
  <v-container fluid class="bg-mygrey rounded-lg">
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <span class="color-main text-h5 text-sm-h5">{{
            $t('detalles')
          }}</span>
        </div>
        <div class="text-body-1 pt-5 d-flex flex-column ga-1">
          <div class="d-flex pl-2 ga-2 align-center">
            <v-icon icon="mdi-calendar-range"></v-icon>
            <p>{{ dayjs(date).format('DD-MM-YYYY') }}</p>
          </div>
          <div>
            <v-card
              v-if="products.length == 0"
              style="height: 120px"
              class="d-flex align-center justify-center elevation-2 my-2"
              ><p>No has seleccionado actividades</p></v-card
            >
          </div>
          <booking-activity-card
            v-for="product in products"
            :product="product"
            class="my-2 py-3 elevation-2"
            :key="product.id"
          />
          <booking-addons-card
            v-for="addon in addons"
            :addon="addon"
            class="my-2 py-3 elevation-2"
            :key="addon.name"
          />
        </div>
        <div class="d-flex align-center pt-3 text-body-2 text-sm-body-1">
          <v-col cols="6" class="text-start">
            <span> {{ $t('codigoPre') }} </span>
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
        <v-col cols="12" class="d-flex">
          <p class="text-subtitle-2">Precio:</p>
          <p class="text-body-1 ml-2">
            ${{ bookingPrice.toLocaleString('es-co') }}
          </p>
        </v-col>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn
          v-if="props.btn"
          class="bg-main color-white"
          @click="redirection()"
          >Continuar reserva</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBookingStore } from '/stores/booking.js';
import dayjs from 'dayjs';

const props = defineProps({
  btn: {
    type: Boolean,
  },
});
const useBooking = useBookingStore();
const route = useRoute();
const router = useRouter();
const date = route.query.date;
const products = computed(() => useBooking.products);
const addons = computed(() => useBooking.addons);
const bookingPrice = computed(
  () => useBooking.addonsPrice + useBooking.productsPrice,
);

watch(products, (newProducts) => {
  const sum = ref(0);
  for (const product in newProducts) {
    sum.value = sum.value + newProducts[product].price;
  }
  return (useBooking.productsPrice = sum.value);
});

watch(addons, (newProducts) => {
  const sum = ref(0);
  for (const addon in newProducts) {
    sum.value = sum.value + newProducts[addon].price;
  }
  return (useBooking.addonsPrice = sum.value);
});

function redirection() {
  const data = route.query;
  if (route.path == '/reservar') {
    router.push({
      path: '/reservar/addons',
      query: {
        ...data,
      },
    });
  } else if (route.path == '/reservar/addons') {
    router.push({
      path: '/reservar/form',
      query: {
        ...data,
      },
    });
  }
}

const voucher = ref('');
const codeVerification = ref('');
function discounts(discount) {
  codeVerification.value = useBooking.applyDiscount(discount);
}
</script>
