<template>
  <div>
    <div class="md-layout-item md-size-100 md-small-size-100 second-step">
      <h4>{{ this.field_name.title }}</h4>
      <p>{{ this.field_name.heading }}</p>
      <img class="img evLogo" :src="banner" />
    </div>
  </div>
</template>
<script>
import {} from "@/components";

import lang from "@/assets/lang/de.json";
export default {
  name: "thank-you",
  components: {},
  props: {
    banner: {
      type: String,
      default: require("@/assets/img/banner2.png")
    }
  },
  data() {
    return {
      field_name: {
        heading: lang.de.fifth_step[baseUrl].heading,
        title: lang.de.fifth_step[baseUrl].title
      }
    };
  }
};
</script>
<style></style>
