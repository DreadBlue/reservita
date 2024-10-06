<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-row>
          <v-col cols="12">
            <span class="color-main text-h4 text-sm-h3">DATOS DE RESERVA</span>
            {{ useBooking.price }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-form>
              <v-container fluid>
                <v-row>
                  <v-col v-for="item in Inputs" :cols="item[4]" :sm="item[0]">
                    <v-text-field
                      :label="item[1]"
                      :variant="item[3]"
                      v-model="item[7]"
                      :prepend-inner-icon="item[5]"
                      :type="item[6].type ? item[6].type : null"
                      :minlength="item[6].minl ? item[6].minl : null"
                      :min="item[6].min ? item[6].min : null"
                      :hide-spin-buttons="item[6].spin ? item[6].spin : null"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <BookingDetails/>

  <v-container fluid>
    <v-row>
      <v-col cols="12" class="text-center">
        <span class="text-h4 text-sm-h3 color-main">METODOS DE PAGO</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex flex-column ga-2">
        <div>Transferencia bancaria</div>
        <div class="d-flex">
          <v-checkbox v-model="cash" :disabled="card"></v-checkbox>
          <v-file-input
            label="Comprobante de pago"
            variant="outlined"
            prepend-inner-icon="mdi-paperclip"
            :prepend-icon="null"
            v-model="invoice"
            @update:model-value="invoice"
          ></v-file-input>
        </div>
        <div>PSE / Tarjeta de crédito - debito</div>
        <div class="d-flex">
          <v-checkbox v-model="card" :disabled="cash"></v-checkbox>
          <!-- <div class="w-50">
            <img class="w-33" src="/otros/logo-bold.png" alt="logo bold" />
          </div> -->
        </div>
        <div class="text-center">
          <v-btn
            v-if="cash"
            class="bg-second color-white"
            @click="initiateCheckout('cash')"
            :disabled="!invoice[0]"
            >PAGAR</v-btn
          >
          <v-btn
            v-if="card"
            class="bg-second color-white"
            @click="initiateCheckout('card')"
            >PAGAR</v-btn
          >
        </div>
        <span class="d-flex justify-center" v-if="warning">Faltan datos</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useBookingStore } from '/stores/booking.js';
import { getFunctions, httpsCallable } from 'firebase/functions';

export default {
  data() {
    const useBooking = useBookingStore();
    const info = useRoute().query;
    const price = computed(() => useBooking.price);
    return {
      test: true,
      card: false,
      cash: false,
      warning: false,
      invoice: [],
      Inputs: {
        InputUno: [
          '6',
          'Nombre completo',
          'text',
          'solo',
          '12',
          'mdi-account-edit',
          { type: 'text' },
          '',
        ],
        InputDos: [
          '6',
          'Número de celular',
          'number',
          'solo',
          '12',
          'mdi-cellphone',
          { type: 'number', minl: '10', spin: true },
          '',
        ],
        InputTres: [
          '6',
          'Correo Electronico',
          'text',
          'solo',
          '12',
          'mdi-email',
          { type: 'mail' },
          '',
        ],
        InputCuatro: [
          '6',
          'Número de cédula / pasaporte',
          'text',
          'solo',
          '8',
          'mdi-card-account-details-outline',
          { type: 'text' },
          '',
        ],
        InputCinco: [
          '3',
          'Acompañantes',
          'text',
          'solo',
          '4',
          'mdi-account-multiple',
          { type: 'number', min: '0', spin: false },
          '',
        ],
        InputSeis: [
          '9',
          'Nombres y cédulas de los acompañantes',
          'text',
          'solo',
          '12',
          'mdi-account-multiple',
          { type: 'text' },
          '',
        ],
      },
      useBooking, info, price,
    };
  },
  methods: {
    async initiateCheckout(payment) {
      // const orderId = 'ORDER' + Date.now() * 1e6;
      // const functions = getFunctions();

      // const generateHash = httpsCallable(functions, 'generateHash');

      try {
        // const response = await generateHash({ orderId, amount });
        // const { hash } = response.data;

        let handler = window.ePayco.checkout.configure({
          key: '431e83810ea6a56d54fed22b9a434898',
          test: true, // Set to false in production
        });

        let data = {
          //Parametros compra (obligatorio)
          name: `Reserva ${this.useBooking.activity}`,
          description: `Reserva de actividad ${this.useBooking.activity} el ${this.useBooking.date} para ${this.useBooking.quantity} personas`,
          invoice: `FAC-${this.useBooking.id}-${this.useBooking.quantity}`,
          currency: "cop",
          amount: this.price,
          tax_base: "0",
          tax: "0",
          tax_ico: "0",
          country: "co",
          lang: "es",

          //Onpage="false" - Standard="true"
          external: "false",


          //Atributos opcionales
          extra1: "extra1",
          extra2: "extra2",
          extra3: "extra3",
          confirmation: "https://reservita-7e847.web.app/reservar/confirmacion",
          response: "https://reservita-7e847.web.app/reservar/confirmacion",

          //Atributos cliente
          name_billing: "",
          address_billing: "",
          type_doc_billing: "",
          mobilephone_billing: "",
          number_doc_billing: "",
          email_billing: "",

         //atributo deshabilitación método de pago
          methodsDisable: ["SP", "CASH"]

          }

        if (this.test == false) {
          this.warning = true;
        } else {
          this.warning = false;
          if (payment == 'card') {
            // await this.useBooking.reservar(item);
            handler.open(data);
          } else if (payment == 'cash' && item.invoice[0] != undefined) {
            // await this.useBooking.reservar(item);
            // await this.useBooking.fetchGoogle(item, true, true);
            return navigateTo('/reservar/confirmacion');
          }
        }
      } catch (error) {
        console.error('Error al generar el hash:', error);
      }
    },
  },
};
</script>
