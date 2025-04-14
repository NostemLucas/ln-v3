<template>
  <div>
    <HeroVideo />
    <HeroCards />
    <TreatmentCards />
    <HeroParalax />
    <HeroAbout />
    <HeroCarrousel />

    <DiagnosticCards />
  </div>
</template>
<script lang="ts" setup>
import EnhancedVideo from "~/components/pages/landing/video-section/EnhancedVideo.vue";
import HeroCards from "~/components/pages/landing/hero-section/HeroCards.vue";
import TreatmentCards from "~/components/pages/landing/treatment-section/TreatmentSection.vue";
import HeroAbout from "~/components/pages/landing/about-section/HeroAbout.vue";
import HeroCarrousel from "@/components/landing/HeroCarrousel.vue";
import HeroParalax from "@/components/landing/HeroParalax.vue";
import DiagnosticCards from "@/components/landing/DiagnosticCards.vue";
import HeroVideo from "~/components/pages/landing/video-section/HeroVideo.vue";
</script>
