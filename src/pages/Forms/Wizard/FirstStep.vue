<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <div>
        <!--<img style ="margin-top:20px;" class="img evLogo" :src="banner" /> -->
        <div class="md-layout-item md-size-100 md-small-size-100">
          <p style="text-align:center; font-weight: 400;margin-top:30px;">{{ this.field_name.heading }}</p>
          <h4 style="text-align:center;">{{ this.field_name.title }}</h4>
          <div class="firstStep-checkbox">
            <div class="md-layout-item md-small-size-100">
              <md-checkbox v-model="first_step.confirm_ownership"></md-checkbox>
              <span class="checkboxSpan" v-html="field_name.confirm_ownership"></span>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-checkbox v-model="first_step.confirm_energy_contract">
              </md-checkbox><span class="checkboxSpan" v-html="field_name.confirm_energy_contract"></span>
             </div>
          <!--</div> -->
          <!--<div class="firstStep-checkbox"> -->
            <div class="md-layout-item md-small-size-100">
              <md-checkbox v-model="first_step.term_conditions"></md-checkbox>
              <span
                class="checkboxSpan"
                v-html="field_name.term_conditions"
              ></span>
            </div>
            <!--<div class="md-layout-item md-small-size-100">
              <md-checkbox v-model="first_step.term_conditions_greentrax"></md-checkbox>
              <span class="checkboxSpan" v-html="field_name.term_conditions_greentrax"></span>
            </div>-->
          </div>
          <div class="error" style="display:none">
            <div class="alert alert-danger">
              <span class="checkboxSpan" v-html="field_name.error"></span>
            </div>
          </div>
          <modal class="term-modal" style="display:none">
            <template slot="header">
                  <h4 class="modal-title" v-html="field_name.term_modal_title"></h4>
                  <md-button
                    class="md-simple md-just-icon md-round modal-default-button"
                    @click="classicModalHide"
                  >
                    <md-icon>clear</md-icon>
                  </md-button>
                </template>

                <template slot="body">
                  <p v-html="field_name.term_modal_body"></p>
                </template>

                <template slot="footer">
                  <md-button class="md-simple">Nice Button</md-button>
                  <md-button
                    class="md-danger md-simple"
                    @click="classicModalHide"
                    >Close</md-button
                  >
                </template>
              </modal>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { Modal } from "@/components";
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import lang from "@/assets/lang/de.json";
import { baseUrl } from "@/config";

export default {
  components: {
    Modal
  },
  props: {
    banner: {
      type: String,
      default: require("@/assets/img/banner2_big.png")
    }
  },
  data() {
    return {
      field_name: {
        error: "",
        heading: lang.de.first_step[baseUrl].heading,
        title: lang.de.first_step[baseUrl].title,
        confirm_ownership: lang.de.first_step[baseUrl].confirm_ownership,
        confirm_energy_contract: lang.de.first_step[baseUrl].confirm_energy_contract,
        term_conditions: lang.de.first_step[baseUrl].term_conditions,
        term_conditions_greentrax: lang.de.first_step[baseUrl].term_conditions_greentrax,
        term_modal_title: lang.de.first_step[baseUrl].term_modal_title,
        term_modal_body: lang.de.first_step[baseUrl].term_modal_body
      },
      first_step: {
        step: "first_step",
        confirm_ownership: false,
        confirm_energy_contract: false,
        term_conditions: false, 
        //term_conditions_greentrax: false
      }
    };
  },
  mounted() {
    document.querySelector("#term").onclick = function() {
      document.querySelector(".term-modal").style.display = "inline-table";
    };
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then(res => {
        if (
          this.first_step.confirm_ownership === false ||
          this.first_step.confirm_energy_contract === false ||
          this.first_step.term_conditions === false
          //this.first_step.term_conditions_greentrax === false
        ) {
          document.querySelector(".error").style.display = "block";
          this.field_name.error = lang.de.first_step[baseUrl].error;
        } else {
          document.querySelector(".error").style.display = "none";
          this.field_name.error = "";
          this.$emit("on-validated", this.first_step);
          return res;
        }
      });
    },
    classicModalHide: function() {
      document.querySelector(".term-modal").style.display = "none";
    },
  }
};
</script>
<style></style>
