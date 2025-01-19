<template>
  <v-container :class="activity.background">
    <v-row>
      <v-col cols="12" sm="5">
        <div class="w-100">
          <img :src="activity.src" alt="foto-activity" class="w-100" />
        </div>
      </v-col>
      <v-col cols="12" sm="7">
        <div class="d-flex flex-column">
          <h1 class="text-h3 color-main">{{ activity.titulo }}</h1>
          <p class="text-body-1">{{ activity.descripcion }}</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" class="d-flex flex-column pl-5 text-body-1">
        <div v-for="precio in activity.precio" :key="precio">{{ precio }}</div>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex align-end justify-end">
        <div class="d-flex flex-column align-sm-center align-start pr-15">
          <span class="text-subtitle-2 color-main">Horario 9 am - 1 pm </span>
          <span class="text-body-1"
            >{{ availability[activityRendering][0].spots }} cupos</span
          >
          <v-select
            :items="selectOptions[0]"
            :label="$t('cantidad')"
            width="140"
            variant="outlined"
            class="pt-2"
            v-model="quantity[activityRendering][0].quantity"
          ></v-select>
        </div>
        <div class="d-flex flex-column align-sm-center align-start pr-15">
          <span class="text-subtitle-2 color-main">Horario 1 pm - 5 pm</span>
          <span class="text-body-1">
            {{ availability[activityRendering][1].spots }} cupos</span
          >
          <v-select
            :items="selectOptions[1]"
            :label="$t('cantidad')"
            width="140"
            variant="outlined"
            class="pt-2"
            v-model="quantity[activityRendering][1].quantity"
          ></v-select>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
  availability: {
    type: Object,
    required: true,
  },
});

const activityRendering = props.activity.availability;
const spots = ref([]);
const selectOptions = ref([]);
const quantity = reactive(props.availability);

onMounted(() => {
  for (const schedule of props.availability[activityRendering]) {
    const options = ref([]);

    for (let i = 0; i <= schedule.spots; i++) {
      options.value.push(i);
    }
    selectOptions.value.push(options.value);
    spots.value.push(options.value.length);
  }
});
</script>
