<template>
  <HomeBanner />
  <GeneralBannerText />
  <GeneralPresentationCard :model="modelOne"/>
  <GeneralPresentationCard :model="modelTwo"/>
</template>

<script lang="ts" setup>
const modelOne = {
  clases: 'order-2',
  title: 'Hola',
  description: 'Hola',
  image: '/images/canyoning.webp',
}
const modelTwo = {
  clases: 'order-1',
  title: 'Hola',
  description: 'Hola',
  image: '/images/arborismo.webp',
}
</script>
