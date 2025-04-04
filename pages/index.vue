<template>
  <div>
    <EnhancedVideo />
    <HeroCards />
    <TreatmentCards />
    <HeroParalax />
    <HeroAbout />
    <HeroCarrousel />

    <DiagnosticCards />
  </div>
</template>
<script lang="ts" setup>
import EnhancedVideo from "@/components/landing/EnhancedVideo.vue";
import HeroCards from "@/components/landing/HeroCards.vue";
import TreatmentCards from "@/components/landing/TreatmentCards.vue";
import HeroAbout from "@/components/landing/HeroAbout.vue";
import HeroCarrousel from "@/components/landing/HeroCarrousel.vue";
import HeroParalax from "@/components/landing/HeroParalax.vue";
import DiagnosticCards from "@/components/landing/DiagnosticCards.vue";
</script>
