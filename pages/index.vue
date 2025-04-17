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
import EnhancedVideo from "~/components/views/landing/video-section/EnhancedVideo.vue";
import HeroCards from "~/components/views/landing/hero-section/HeroCards.vue";
import TreatmentCards from "~/components/views/landing/treatment-section/TreatmentSection.vue";
import HeroAbout from "~/components/views/landing/about-section/HeroAbout.vue";
import HeroCarrousel from "@/components/landing/HeroCarrousel.vue";
import HeroParalax from "@/components/landing/HeroParalax.vue";
import DiagnosticCards from "@/components/landing/DiagnosticCards.vue";
import HeroVideo from "~/components/views/landing/video-section/HeroVideo.vue";
</script>
