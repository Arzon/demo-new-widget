<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100 md-xsmall-size-100 mx-auto">
      <simple-wizard>
        <template slot="header">
          <img class="img evLogo" :src="logo" />
        </template>

        <wizard-tab :before-change="() => validateStep('step1')">
          <template slot="label">
            Start
          </template>
          <first-step ref="step1" @on-validated="onStepValidated"></first-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label">
            Stromvertrag
          </template>
          <second-step
            ref="step2"
            @on-validated="onStepValidated"
          ></second-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step3')">
          <template slot="label">
            Elektroauto
          </template>
          <third-step ref="step3" @on-validated="onStepValidated"></third-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step4')">
          <template slot="label">
            Nachweise
          </template>
          <fourth-step
            ref="step4"
            @on-validated="onStepValidated"
          ></fourth-step>
        </wizard-tab>
      </simple-wizard>
    </div>
  </div>
</template>
<script>
import FirstStep from "./Wizard/FirstStep.vue";
import SecondStep from "./Wizard/SecondStep.vue";
import ThirdStep from "./Wizard/ThirdStep.vue";
import FourthStep from "./Wizard/FourthStep.vue";
import Api from "@/services/api";
// import FifthStep from "./Wizard/FifthStep.vue";

import Swal from "sweetalert2";
import { SimpleWizard, WizardTab } from "@/components";
import { logo, baseUrl, company } from "@/config";
import { apiConfig } from "@/appConfig";

export default {
  name: "registration-wizard",
  data() {
    return {
      data: {
        first_step: {},
        second_step: {},
        third_step: {},
        fourth_step: {}
      }
    };
  },
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    FourthStep,
    SimpleWizard,
    WizardTab
  },
  props: {
    logo: {
      type: String,
      default: logo[baseUrl]
    }
  },
  methods: {
    validateStep(ref) {
      return this.$refs[ref].validate();
    },
    onStepValidated(values) {
      this.data[values.step] = values;
      if (values.step === "fourth_step") {
        this.registrationComplete();
      }
    },
    registrationComplete() {
      this.data.fourth_step.greentrax_company = company[baseUrl];
      const finalData = {
        ...this.data.first_step,
        ...this.data.second_step,
        ...this.data.third_step,
        ...this.data.fourth_step
      };
      let formData = new FormData();
      delete finalData.step;

      Object.keys(finalData).forEach(key => {
        if (key === "ownership_file" || key === "household_file") {
          formData.append(key, finalData[key]);
        } else {
          formData.set(key, finalData[key]);
        }
      });

      Api.insertDocuments(apiConfig.url+"/reg/insert-document", apiConfig.basicToken, formData)
        .then(res => {
          this.$router.push("thankyou");
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.evLogo {
  height: 80px;
}
</style>
