<template>
  <div class="md-layout">
    <div class="md-layout-item ev-registration">
      <registration-wizard></registration-wizard>
    </div>
  </div>
</template>
<script>
import RegistrationWizard from "../Forms/Wizard";
export default {
  components: {
    RegistrationWizard
  },
  data() {
    return {};
  }
};
</script>
