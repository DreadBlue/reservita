<template>
  <HomeBanner />
  <GeneralBannerText :model="modelFour"/>
  <GeneralPresentationCard :model="modelOne"/>
  <GeneralPresentationCard :model="modelTwo"/>
  <GeneralPresentationCard :model="modelThree"/>

</template>

<script lang="ts" setup>

const modelOne = {
  clases: 'order-2',
  title: 'Arborismo',
  description: 'Hola',
  image: '/images/canyoning.webp',
}
const modelTwo = {
  clases: 'order-1',
  title: 'Canyoning',
  description: 'Hola',
  image: '/images/arborismo.webp',
}
const modelThree = {
  clases: 'order-2',
  title: 'Canyoning',
  description: 'Hola',
  image: '/images/arborismo.webp',
}
const modelFour = {
  clases: 'bg-main color-white',
  description: 'Somos un ecoparque de aventura que ofrece experiencias de barranquismo, torrentismo y arborismo. Nos especializamos en brindar aventuras emocionantes y seguras, inmersas en la naturaleza, para aquellos que buscan desafiar sus límites y disfrutar de paisajes impresionantes.',
}
</script>
