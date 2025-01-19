<template>
  <GeneralLoader v-if="loading" :loading-text="$t('loading')" />
  <v-container v-if="!loading" fluid class="pt-3 pt-15">
    <v-row>
      <v-col cols="12" class="text-center">
        <v-form>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <span cols="12" class="d-flex text-h5 text-sm-h4 color-main">
                  {{ $t('titularReserva') }}
                </span>
              </v-col>
              <v-col
                v-for="(input, key) in Inputs"
                :cols="input.cols"
                :sm="input.colsSM"
                :key="input[0]"
              >
                <v-text-field
                  :label="input.label"
                  :variant="input.variant"
                  v-model="dataItem[input.key]"
                  :prepend-inner-icon="input.prependIcon"
                  :type="input.type ? input.type : null"
                  :minlength="input.minl ? input.minl : null"
                  :min="input.min ? input.min : null"
                  :hide-spin-buttons="input.spin ? input.spin : null"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex text-h5 text-sm-h4 color-main">
                {{ $t('participantes') }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" sm="12" class="d-flex flex-column">
                <v-text-field
                  label="Nombre completo, tipo de documento y número de documento de los participantes"
                  variant="solo"
                  v-model="participantes"
                  prepend-inner-icon="mdi-account-multiple"
                >
                </v-text-field>
                <span class="text-body-1 align-self-start"
                  >*Con esta información serán tramitados los seguros</span
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

  <booking-details-banner v-if="!loading" :btn="false" />

  <v-container v-if="!loading" fluid class="pt-10 pt-sm-5">
    <v-row>
      <v-col cols="12" class="text-center">
        <span class="text-h5 text-sm-h4 color-main">{{ $t('metodos') }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex flex-column ga-2">
        <div>{{ $t('transferencia') }}</div>
        <div class="d-flex flex-column text-body-2 ml-10 mb-3">
          <p>{{ $t('cuenta') }}</p>
          <p>{{ $t('cedulaBank') }}</p>
          <p>{{ $t('titular') }}</p>
        </div>
        <div class="d-flex">
          <v-checkbox v-model="cash" :disabled="card"></v-checkbox>
          <v-file-input
            :label="$t('comprobante')"
            variant="outlined"
            prepend-inner-icon="mdi-paperclip"
            :prepend-icon="null"
            v-model="invoice"
            @update:model-value="invoice"
          ></v-file-input>
        </div>
        <div>{{ $t('pago') }}</div>
        <div class="d-flex">
          <v-checkbox v-model="card" :disabled="cash"></v-checkbox>
          <div class="w-50">
            <img
              class="w-sm-33 w-75 pt-3 pt-sm-1"
              src="/images/epayco-logo-fondo-oscuro.png"
              alt="logo Epayco"
            />
          </div>
        </div>
        <div class="text-center">
          <v-btn
            v-if="cash"
            class="bg-second color-white"
            @click="initiateCheckout('cash')"
            >{{ $t('pagar') }}</v-btn
          >
          <v-btn
            v-if="card"
            class="bg-second color-white"
            @click="initiateCheckout('card')"
            >{{ $t('pagar') }}</v-btn
          >
        </div>
        <span class="d-flex justify-center" v-if="warning">{{
          $t('datosWarning')
        }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBookingStore } from '/stores/booking.js';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const useBooking = useBookingStore();
const card = ref(false);
const cash = ref(false);
const warning = ref(false);
const loading = ref(false);
const invoice = ref([]);
const price = computed(
  () => useBooking.bookingPrice + useBooking.addonsPrice - useBooking.discount,
);

const participantes = ref('');
const dataItem = ref({
  name: ref(''),
  phone: ref(''),
  email: ref(''),
  documentId: ref(''),
});

const Inputs = computed(() => [
  {
    cols: '12',
    colsSM: '6',
    label: t('nombre'),
    variant: 'solo',
    prependIcon: 'mdi-account-edit',
    type: 'text',
    key: 'name',
  },
  {
    cols: '12',
    colsSM: '6',
    label: t('celular'),
    variant: 'solo',
    prependIcon: 'mdi-cellphone',
    type: 'number',
    minLength: '10',
    spin: true,
    key: 'phone',
  },
  {
    cols: '12',
    colsSM: '6',
    label: t('correo'),
    variant: 'solo',
    prependIcon: 'mdi-email',
    type: 'email',
    key: 'email',
  },
  {
    cols: '12',
    colsSM: '6',
    label: t('cedula'),
    variant: 'solo',
    prependIcon: 'mdi-card-account-details-outline',
    type: 'text',
    key: 'documentId',
  },
]);

async function initiateCheckout(payment) {
  loading.value = true;
  try {
    let handler = ePayco.checkout.configure({
      key: '431e83810ea6a56d54fed22b9a434898',
      test: false, // Set to false in production
    });
    const orderId = 'ORDER' + Date.now() * 1e6;

    let item = {
      ...dataItem.value,
      participants: participantes.value,
      invoice: invoice.value,
    };

    let data = {
      name: `Reserva ${dataItem.value.name}`,
      description: `Reserva de actividad extrema`,
      invoice: `FAC-${orderId}`,
      currency: 'cop',
      amount: price.value,
      tax_base: '0',
      tax: '0',
      tax_ico: '0',
      country: 'co',
      lang: 'es',

      //Onpage="false" - Standard="true"
      external: 'false',

      //Atributos opcionales
      extra1: 'extra1',
      extra2: 'extra2',
      extra3: 'extra3',
      confirmation: 'https://www.lareservita.com/reservar/confirmacion',
      response: 'https://www.lareservita.com/reservar/confirmacion',

      //Atributos cliente
      name_billing: '',
      address_billing: '',
      type_doc_billing: '',
      mobilephone_billing: '',
      number_doc_billing: '',
      email_billing: '',

      //atributo deshabilitación método de pago
      methodsDisable: ['SP', 'CASH'],
    };

    if (Object.values(item).every((value) => value !== '')) {
      warning.value = false;
      if (payment == 'card') {
        await useBooking.makeReservation(item);
        handler.open(data);
      } else if (payment == 'cash') {
        await useBooking.makeReservation(item);
        return navigateTo('/reservar/confirmacion');
      }
    } else {
      warning.value = true;
      loading.value = false;
    }
  } catch (error) {
    console.error('Error al enviar reserva:', error);
  }
}
</script>
