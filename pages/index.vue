<template>
  <home-banner />
  <GeneralBanner :model="modelFour" />
  <section class="d-flex flex-column ga-sm-0 ga-8">
    <GeneralPresentationCard :model="modelOne" />
    <GeneralPresentationCard :model="modelTwo" />
    <GeneralPresentationCard :model="modelThree" />
    <GeneralPresentationCard :model="modelFive" />
  </section>
  <BookingModalPicker/>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { locale } = useI18n();

const modelOne = computed(() => {
  return {
    clases: 'order-2',
    title: t('arborismoTitle'),
    description: t('arborismoDescription'),
    image: '/images/arborismo.webp',
    icon: {
      uno: {
        icon: 'mdi-numeric-3-circle',
        text: t('dificultad'),
      },
      dos: {
        icon: 'mdi-numeric-1-circle',
        text: t('time'),
      },
      tres: {
        icon: 'mdi-numeric-8-circle',
        text: t('edad'),
      },
    },
  };
});
const modelTwo = computed(() => {
  return {
    clases: 'order-1',
    title: t('canyoningTitle'),
    description: t('canyoningDescription'),
    image: '/images/canyoning.webp',
    icon: {
      uno: {
        icon: 'mdi-numeric-2-circle',
        text: t('dificultad'),
      },
      dos: {
        icon: 'mdi-numeric-3-circle',
        text: t('time'),
      },
      tres: {
        icon: 'mdi-numeric-8-circle',
        text: t('edad'),
      },
    },
  };
});
const modelThree = computed(() => {
  return {
    clases: 'order-2',
    title: t('aventuraTitle'),
    description: t('aventuraDescription'),
    image: '/images/aventura.webp',
    icon: {
      uno: {
        icon: 'mdi-numeric-3-circle',
        text: t('dificultad'),
      },
      dos: {
        icon: 'mdi-numeric-3-circle',
        text: t('time'),
      },
      tres: {
        icon: 'mdi-numeric-8-circle',
        text: t('edad'),
      },
    },
  };
});
const modelFive = computed(() => {
  return {
    clases: 'order-1',
    title: 'CANYONING AVANZADO',
    description: t('canyoningDescription'),
    image: '/images/avanzado.webp',
    icon: {
      uno: {
        icon: 'mdi-numeric-5-circle',
        text: t('dificultad'),
      },
      dos: {
        icon: 'mdi-numeric-4-circle',
        text: t('time'),
      },
      tres: {
        icon: 'mdi-numeric-8-circle',
        text: t('edad'),
      },
    },
  };
});
const modelFour = computed(() => {
  if (locale.value === 'es') {
    return {
      clases: 'bg-main color-white',
      descripcion: `Somos un <span class="text-sm-h4 text-h6 text-fun">ecoparque</span> de aventura que ofrece <span class="text-sm-h4 text-h6 text-fun">experiencias</span> de cañonismo, torrentismo y arborismo. Nos <span class="text-sm-h4 text-h6 text-fun">especializamos</span> en brindar <span class="text-sm-h4 text-h6 text-fun">aventuras</span> emocionantes y seguras, inmersas en la <span class="text-sm-h4 text-h6 text-fun">naturaleza</span>, para aquellos que buscan desafiar sus límites y <span class="text-sm-h4 text-h6 text-fun">disfrutar</span> de paisajes impresionantes.`,
    };
  } else if (locale.value === 'en') {
    return {
      clases: 'bg-main color-white',
      descripcion: `We are an <span class="text-sm-h4 text-h6 text-fun">adventure ecopark</span> offering <span class="text-sm-h4 text-h6 text-fun">canyoning</span>, torrenting, and tree climbing <span class="text-sm-h4 text-h6 text-fun">experiences</span>. We <span class="text-sm-h4 text-h6 text-fun">specialize</span> in providing exciting and safe <span class="text-sm-h4 text-h6 text-fun">adventures</span> immersed in <span class="text-sm-h4 text-h6 text-fun">nature</span>, for those looking to challenge their limits and <span class="text-sm-h4 text-h6 text-fun">enjoy</span> breathtaking landscapes.
`,
    };
  } else if (locale.value === 'it') {
    return {
      clases: 'bg-main color-white',
      descripcion: `Siamo un <span class="text-sm-h4 text-h6 text-fun">ecoparco</span> di avventura che offre <span class="text-sm-h4 text-h6 text-fun">esperienze</span> di canyoning, torrentismo e arrampicata sugli alberi. Ci <span class="text-sm-h4 text-h6 text-fun">specializziamo</span> nell'offrire <span class="text-sm-h4 text-h6 text-fun">avventure</span> emozionanti e sicure, immerse nella <span class="text-sm-h4 text-h6 text-fun">natura</span>, per coloro che cercano di sfidare i propri limiti e <span class="text-sm-h4 text-h6 text-fun">godere</span> di paesaggi mozzafiato.
`,
    };
  }
  return {
    clases: 'bg-main color-white',
    descripcion: 'Default description in case of unsupported locale.',
  };
});

import { useBookingStore } from '@/stores/booking';
const useBooking = useBookingStore();
onMounted(async () => {
  await useBooking.firestoreTesting();
});
</script>
