<template>
  <v-container fluid class="pa-0 h-100">
    <v-row class="h-auto">

      <!-- Mobile filters -->

      <v-col cols="12" class="d-flex d-md-none justify-center">
        <div
          class="d-flex w-75 bg-second rounded elevation-8 pa-3 align-center justify-space-between"
        >
          <v-btn append-icon="mdi-filter-multiple">
            Filtros
            <v-menu
              activator="parent"
              location="top"
              :close-on-content-click="false"
            >
            <v-list v-model:opened="open">
            <v-list-item
              prepend-icon="mdi-filter-multiple"
              :title="$t('filtros')"
              class="ml-0"
            ></v-list-item>

            <v-list-group value="Time" >
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-calendar-range"
                  :title="$t('periodo')"
                ></v-list-item>
              </template>

              <v-list-item>
                <GeneralDatePicker
                  v-model="filters.time.startDate"
                  style="width: 180px"
                  class="py-2"
                  :labelInput="$t('inicioLabel')"
                />
                <GeneralDatePicker
                  v-model="filters.time.endDate"
                  style="width: 180px"
                  :labelInput="$t('fin')"
                  class="pt-5"
                />
              </v-list-item>
            </v-list-group>

            <v-list-group value="activity">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-hiking"
                  :title="$t('actividad')"
                ></v-list-item>
              </template>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.activities.Arborismo"
                    :disabled="!filters.activities.Canyoning && !filters.activities.Aventura"
                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{$t('arborismoTitle')}}</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.activities.Canyoning"
                    :disabled="!filters.activities.Arborismo && !filters.activities.Aventura"

                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{$t('canyoningTitle')}}</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.activities.Aventura"
                    :disabled="!filters.activities.Canyoning && !filters.activities.Arborismo"

                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{$t('aventuraTitle')}}</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-list-group value="schedule">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-clock-outline"
                  :title="$t('horario')"
                ></v-list-item>
              </template>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                  v-model="filters.horario['09:00 - 13:00']"
                  :disabled="!filters.horario['13:00 - 17:00']" 
                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>09:00 - 13:00</v-list-item-title>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                  v-model="filters.horario['13:00 - 17:00']"
                  :disabled="!filters.horario['09:00 - 13:00']"
                  ></v-checkbox-btn>
                  <v-list-item-title>13:00 - 17:00</v-list-item-title>
                </template>
              </v-list-item>
            </v-list-group>

            <v-list-group value="Almuerzos">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-food"
                  :title="$t('almuerzos')"
                ></v-list-item>
              </template>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.comida.incluido"
                    :disabled="!filters.comida.noIncluido"
                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{$t('incluido')}}</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.comida.noIncluido"
                    :disabled="!filters.comida.incluido"
                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{ $t('noIncluido') }}</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-list-group value="Transporte">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-bus"
                  :title="$t('transporteLabel')"
                ></v-list-item>
              </template>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.transporte.incluido"
                    :disabled="!filters.transporte.noIncluido"
                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{$t('incluido')}}</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.transporte.noIncluido"
                    :disabled="!filters.transporte.incluido"

                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{ $t('noIncluido') }}</v-list-item-title>
              </v-list-item>
            </v-list-group>
          </v-list>
            </v-menu>
          </v-btn>
          <v-btn append-icon="mdi-magnify"
            >{{$t('buscar')}}<v-menu
              activator="parent"
              location="bottom"
              :close-on-content-click="false"
            >
              <v-text-field
                variant="solo"
                v-model="buscar"
              ></v-text-field></v-menu
          ></v-btn>
        </div>
      </v-col>

      <!-- Desktop filters -->

      <v-col cols="12" class="h-100 d-none d-md-block">
        <v-card class="mx-15" width="300" height="100%">
          <v-list v-model:opened="open">
            <v-list-item
              prepend-icon="mdi-filter-multiple"
              :title="$t('filtros')"
              class="ml-0"
            ></v-list-item>

            <v-list-group value="Time" >
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-calendar-range"
                  :title="$t('periodo')"
                ></v-list-item>
              </template>

              <v-list-item>
                <GeneralDatePicker
                  v-model="filters.time.startDate"
                  style="width: 180px"
                  class="py-2"
                  :labelInput="$t('inicioLabel')"
                />
                <GeneralDatePicker
                  v-model="filters.time.endDate"
                  style="width: 180px"
                  :labelInput="$t('fin')"
                  class="pt-5"
                />
              </v-list-item>
            </v-list-group>

            <v-list-group value="activity">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-hiking"
                  :title="$t('actividad')"
                ></v-list-item>
              </template>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.activities.Arborismo"
                    :disabled="!filters.activities.Canyoning && !filters.activities.Aventura"
                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{$t('arborismoTitle')}}</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.activities.Canyoning"
                    :disabled="!filters.activities.Arborismo && !filters.activities.Aventura"

                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{$t('canyoningTitle')}}</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.activities.Aventura"
                    :disabled="!filters.activities.Canyoning && !filters.activities.Arborismo"

                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{$t('aventuraTitle')}}</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-list-group value="schedule">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-clock-outline"
                  :title="$t('horario')"
                ></v-list-item>
              </template>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                  v-model="filters.horario['09:00 - 13:00']"
                  :disabled="!filters.horario['13:00 - 17:00']" 
                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>09:00 - 13:00</v-list-item-title>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                  v-model="filters.horario['13:00 - 17:00']"
                  :disabled="!filters.horario['09:00 - 13:00']"
                  ></v-checkbox-btn>
                  <v-list-item-title>13:00 - 17:00</v-list-item-title>
                </template>
              </v-list-item>
            </v-list-group>

            <v-list-group value="Almuerzos">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-food"
                  :title="$t('almuerzos')"
                ></v-list-item>
              </template>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.comida.incluido"
                    :disabled="!filters.comida.noIncluido"
                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{$t('incluido')}}</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.comida.noIncluido"
                    :disabled="!filters.comida.incluido"
                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{ $t('noIncluido') }}</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-list-group value="Transporte">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-bus"
                  :title="$t('transporteLabel')"
                ></v-list-item>
              </template>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.transporte.incluido"
                    :disabled="!filters.transporte.noIncluido"
                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{$t('incluido')}}</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend="{ isActive }">
                  <v-checkbox-btn
                    v-model="filters.transporte.noIncluido"
                    :disabled="!filters.transporte.incluido"

                  ></v-checkbox-btn>
                </template>
                <v-list-item-title>{{ $t('noIncluido') }}</v-list-item-title>
              </v-list-item>
            </v-list-group>
          </v-list>
          <div class="d-flex justify-center">
            <v-btn class="my-3 bg-main color-white" @click="filterHandler">Buscar</v-btn>
            <p v-if="warning">{{$t('filtrosWarning')}}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAdminStore } from "/stores/admin.js";
import dayjs from "dayjs";

export default {
  data() {
    const useAdmin = useAdminStore();
    return {
      open: ["Filters", "Time"],
      buscar: "",
      warning: false,
      drawer: false,
      group: null,
      filters: {
        time: {
          startDate: dayjs().endOf('month').format('YYYY-MM-DD'),
          endDate: dayjs().startOf('month').format('YYYY-MM-DD'),
        },
        activities: {
          Arborismo: true,
          Canyoning: true,
          Aventura: true,
        },
        horario: {
          '09:00 - 13:00': true,
          '13:00 - 17:00': true,
        },
        transporte: {
          incluido: true,
          noIncluido: true
        },
        comida: {
          incluido: true,
          noIncluido: true,
        },
      },
      useAdmin,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  emits: ['update:bookings', 'update:loading'],
  methods: {
    async filterHandler() {
      this.$emit('update:loading', true);
      const bookings = await this.useAdmin.adminBookings(this.filters);
      if (bookings[0] != 'Faltan filtros') {
        this.$emit('update:bookings', bookings);
        this.$emit('update:loading', false);
      } else {
        console.log(bookings)
        this.warning = true;
      }
      
    },
  },
  async mounted() {
    const bookings = await this.useAdmin.adminBookings(this.filters);
    this.$emit('update:bookings', bookings);
    this.$emit('update:loading', false);
  },
};
</script>
