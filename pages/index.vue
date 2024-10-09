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
  description: 'El arborismo consiste en recorrer circuitos entre árboles con plataformas, puentes colgantes y tirolinas. Ideal para quienes buscan adrenalina con naturaleza, promoviendo equilibrio y destreza física.',
  image: '/images/canyoning.webp',
  icon: {
    uno: {
      icon: 'mdi-numeric-1-circle',
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
const modelTwo = {
  clases: 'order-1',
  title: 'CANYONING',
  description: 'El canyoning o torrentismo, es un deporte extremo que utiliza técnicas de cuerda (rapel) para descender por cascadas de diferentes alturas y niveles de dificultad.',
  image: '/images/arborismo.webp',
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
  description: 'Somos un ecoparque de aventura que ofrece experiencias de barranquismo, torrentismo y arborismo. Nos especializamos en brindar aventuras emocionantes y seguras, inmersas en la naturaleza, para aquellos que buscan desafiar sus límites y disfrutar de paisajes impresionantes.',
}
</script>
