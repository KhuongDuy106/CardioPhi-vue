<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<!-- Need to affect global values, so not scoped -->
<style lang="scss">

@media print {
  body {
    overflow: hidden;
    height: auto;
  }
  .v-content {
  padding: 0 !important;
  }

}

.js-plotly-plot{
    height: 100%;
}

</style>
