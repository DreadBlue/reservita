<template>
  <HomeBanner />
  <GeneralBannerText :model="modelFour"/>
  <section class="d-flex flex-column ga-sm-0 ga-8">
    <GeneralPresentationCard :model="modelOne"/>
    <GeneralPresentationCard :model="modelTwo"/>
    <GeneralPresentationCard :model="modelThree"/>
  </section>

</template>

<script lang="ts" setup>

const modelOne = {
  clases: 'order-2',
  title: 'ARBORISMO',
  description: 'Consiste en recorrer un circuito de altura entre 3 árboles, cruzando por una línea de equilibrio, un puente tibetano y escaleras de mano que te llevarán a la malla catamarán más alta del país (25 metros).',
  image: '/images/canyoning.webp',
  icon: {
    uno: {
      icon: 'mdi-numeric-3-circle',
      text: 'DIFICULTAD 1-5',
    },
    dos: {
      icon: 'mdi-numeric-1-circle',
      text: 'TIEMPO EN H',
    },
    tres: {
      icon: 'mdi-numeric-8-circle',
      text: 'EDAD MINIMA',
    }
  }
}
const modelTwo = {
  clases: 'order-1',
  title: 'CANYONING',
  description: 'El canyoning o torrentismo, es un deporte extremo que utiliza técnicas de cuerda (rapel) para descender por cascadas de diferentes alturas y niveles de dificultad.',
  image: '/images/arborismo.webp',
  icon: {
    uno: {
      icon: 'mdi-numeric-2-circle',
      text: 'DIFICULTAD 1-5',
    },
    dos: {
      icon: 'mdi-numeric-3-circle',
      text: 'TIEMPO EN H',
    },
    tres: {
      icon: 'mdi-numeric-8-circle',
      text: 'EDAD MINIMA',
    }
  }
}
const modelThree = {
  clases: 'order-2',
  title: 'COMBO AVENTURA',
  description: 'Vive esta promoción llena de emoción que incluye canyoning, arborismo, rapel, senderismo y más.',
  image: '/images/aventura.webp',
  icon: {
    uno: {
      icon: 'mdi-numeric-3-circle',
      text: 'DIFICULTAD 1-5',
    },
    dos: {
      icon: 'mdi-numeric-3-circle',
      text: 'TIEMPO EN H',
    },
    tres: {
      icon: 'mdi-numeric-8-circle',
      text: 'EDAD MINIMA',
    }
  }
}
const modelFour = {
  clases: 'bg-main color-white',
  descripcion: 'Somos un <span class="text-sm-h4 text-h6 text-fun">ecoparque</span> de aventura que ofrece <span class="text-sm-h4 text-h6 text-fun">experiencias</span> de cañonismo, torrentismo y arborismo. Nos <span class="text-sm-h4 text-h6 text-fun">especializamos</span> en brindar <span class="text-sm-h4 text-h6 text-fun">aventuras</span> emocionantes y seguras, inmersas en la <span class="text-sm-h4 text-h6 text-fun">naturaleza</span>, para aquellos que buscan desafiar sus límites y <span class="text-sm-h4 text-h6 text-fun">disfrutar</span> de paisajes impresionantes.',
}
</script>
