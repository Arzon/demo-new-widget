<template>
  <div class="md-layout thankyou">
    <div class="md-layout-item">
      <!-- <signup-card> -->
      <div class="md-layout-item md-size-100 md-small-size-100 logo">
        <img class="img logo" :src="logo" />
      </div>

      <div class="md-layout-item md-size-100 md-small-size-100 content">
        <h2>{{ this.field_name.title }}</h2>
        <p>{{ this.field_name.heading }}</p>
        <img class="img evLogo" :src="banner" />
      </div>
      <!-- </signup-card> -->
    </div>
  </div>
</template>
<script>
import { SignupCard } from "@/components";
import lang from "@/assets/lang/de.json";
import { logo, baseUrl, redirectUrl } from "@/config";
export default {
  components: {
    // SignupCard
  },
  props: {
    banner: {
      type: String,
      default: require("@/assets/img/banner2.png")
    },
    logo: {
      type: String,
      default: logo[baseUrl]
    }
  },
  data() {
    return {
      field_name: {
        heading: lang.de.fifth_step[baseUrl].heading,
        title: lang.de.fifth_step[baseUrl].title
      }
    };
  },
  mounted() {
    this.myInterval = setInterval(() => {
      window.location.href = redirectUrl[baseUrl];
    }, 5000);
  }
};
</script>
<style></style>
