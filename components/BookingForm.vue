<template>
  <GeneralLoader v-if="loading" :loading-text="$t('loading')" />
  <v-container v-if="!loading" fluid class="pt-3 pt-15">
    <v-row>
      <v-col cols="12" class="text-center">
        <v-row>
          <v-col cols="12">
            <span class="color-main text-h4 text-sm-h3">{{
              $t("titularReserva")
            }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-form>
              <v-container fluid>
                <v-row>
                  <v-col
                    v-for="(item, key) in Inputs"
                    :cols="item.cols"
                    :sm="item.colsSM"
                    :key="item[0]"
                  >
                    <v-text-field
                      :label="item.label"
                      :variant="item.variant"
                      v-model="dataItem[item.key]"
                      :prepend-inner-icon="item.prependIcon"
                      :type="item.type ? item.type : null"
                      :minlength="item.minl ? item.minl : null"
                      :min="item.min ? item.min : null"
                      :hide-spin-buttons="item.spin ? item.spin : null"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-container fluid v-if="quantity > 1">
                <v-row>
                  <v-col cols="12" class="d-flex text-h5 text-sm-h4">
                    {{ $t("participantes") }}
                  </v-col>
                </v-row>
                <v-row v-for="n in quantity - 1" :key="n">
                  <v-col :cols="6" :sm="6">
                    <v-text-field
                      :label="$t('nombreParticipante') + (n + 1)"
                      variant="solo"
                      v-model="participantes[n].nombre"
                      prepend-inner-icon="mdi-account-multiple"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col :cols="6" :sm="6">
                    <v-text-field
                      :label="$t('cedulaParticipante') + (n + 1)"
                      variant="solo"
                      v-model="participantes[n].documento"
                      prepend-inner-icon="mdi-card-account-details-outline"
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

  <BookingDetails v-if="!loading" />

  <v-container v-if="!loading" fluid class="pt-10 pt-sm-5">
    <v-row>
      <v-col cols="12" class="text-center">
        <span class="text-h4 text-sm-h3 color-main">{{ $t("metodos") }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex flex-column ga-2">
        <div>{{ $t("transferencia") }}</div>
        <div class="d-flex flex-column text-body-2 ml-10 mb-3">
          <p>{{ $t("cuenta") }}</p>
          <p>{{ $t("cedulaBank") }}</p>
          <p>{{ $t("titular") }}</p>
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
        <div>{{ $t("Pago virtual") }}</div>
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
            >{{ $t("pagar") }}</v-btn
          >
          <v-btn
            v-if="card"
            class="bg-second color-white"
            @click="initiateCheckout('card')"
            >{{ $t("pagar") }}</v-btn
          >
        </div>
        <span class="d-flex justify-center" v-if="warning">{{
          $t("datosWarning")
        }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useBookingStore } from "/stores/booking.js";
import { useI18n } from 'vue-i18n';


export default {
  setup() {
    const { t } = useI18n();
    const localePath = useLocalePath()
    const useBooking = useBookingStore();
    const price = computed(
      () =>
        useBooking.bookingPrice + useBooking.addonsPrice - useBooking.discount
    );
    const quantity = computed(() => useBooking.quantity);
    const info = useRoute().query;

    const participantes = ref({});
    for (let i = 1; i < quantity.value; i++) {
      participantes.value[i] = {
        nombre: "",
        documento: "",
      };
    }
    const addons = ref([false, false]);

    const dataItem = ref({
      "name": ref(''),
      "phone": ref(''),
      "email": ref(''),
      "documentId": ref(''),
    });

    const Inputs = computed(() => [
      {
        cols: "12",
        colsSM: "6",
        label: t('nombre'),
        variant: "solo",
        prependIcon: "mdi-account-edit",
        type: "text",
        key: "name",  
      },
      {
        cols: "12",
        colsSM: "6",
        label: t('celular'),
        variant: "solo",
        prependIcon: "mdi-cellphone",
        type: "number",
        minLength: "10",
        spin: true,
        key: 'phone',
      },
      {
        cols: "12",
        colsSM: "6",        
        label: t('correo'),
        variant: "solo",
        prependIcon: "mdi-email",
        type: "email",
        key: 'email',
      },
      {
        cols: "12",
        colsSM: "6",        
        label: t('cedula'),
        variant: "solo",
        prependIcon: "mdi-card-account-details-outline",
        type: "text",
        key: 'documentId',
      },
    ]);
    return {
      participantes,
      price,
      quantity,
      useBooking,
      info,
      addons,
      Inputs,
      localePath,
      dataItem
    };
  },
  data() {
    return {
      test: true,
      card: false,
      cash: false,
      warning: false,
      loading: false,
      invoice: [],
    };
  },
  methods: {
    async initiateCheckout(payment) {
      this.loading = true;
      try {
        let handler = window.ePayco.checkout.configure({
          key: "431e83810ea6a56d54fed22b9a434898",
          test: false, // Set to false in production
        });

        let item = {
          ...this.dataItem,
          participants: this.participantes,
          invoice: this.invoice,
        };

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
          confirmation: "https://www.lareservita.com/reservar/confirmacion",
          response: "https://www.lareservita.com/reservar/confirmacion",

          //Atributos cliente
          name_billing: "",
          address_billing: "",
          type_doc_billing: "",
          mobilephone_billing: "",
          number_doc_billing: "",
          email_billing: "",

          //atributo deshabilitación método de pago
          methodsDisable: ["SP", "CASH"],
        };

        if (Object.values(item).every((value) => value !== "")) {
          this.warning = false;
          if (payment == "card") {
            await this.useBooking.makeReservation(item);
            handler.open(data);
          } else if (payment == "cash") {
            await this.useBooking.makeReservation(item);
            return navigateTo(this.localePath("/reservar/confirmacion"));
          }
        } else {
          this.warning = true;
          this.loading = false;
        }
      } catch (error) {
        console.error("Error al enviar reserva:", error);
      }
    },
  },
};
</script>
