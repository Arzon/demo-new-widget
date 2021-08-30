<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <div>
        <div class="md-layout-item md-size-100 md-small-size-100 second-step">
          <h4 style="text-align:center">{{ this.field_name.title }}</h4>
          <p style="text-align:center;">{{ this.field_name.heading }}</p>
          <tabs :tab-name="['Privatperson', 'Gewerbe']" color-button="warning">
            <template slot="tab-pane-1">
              <div class="md-layout">
                <div class="md-layout-item md-size-50 md-small-size-100">
                  <md-field>
                    <label>{{ this.field_name.first_name }}</label>
                    <md-input
                      type="text"
                      v-model="second_step.customer_first_name"
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-50 md-small-size-100">
                  <md-field>
                    <label>{{ this.field_name.last_name }}</label>
                    <md-input
                      type="text"
                      v-model="second_step.customer_last_name"
                    ></md-input>
                  </md-field>
                </div>
              </div>
            </template>
            <template slot="tab-pane-2">
              <div class="md-layout">
                <div class="md-layout-item md-size-100 md-small-size-100">
                  <md-field>
                    <label>{{ this.field_name.customer_company }}</label>
                    <md-input
                      type="text"
                      v-model="second_step.customer_company"
                    ></md-input>
                  </md-field>
                </div>
              </div>
            </template>
          </tabs>
          <div class="md-layout">
            <div class="md-layout-item md-size-50 md-small-size-100">
              <md-field>
                <label>{{ this.field_name.email }}</label>
                <md-input type="text" v-model="second_step.customer_email"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100">
              <md-field>
                <label>{{ this.field_name.customer_number }}</label>
                <md-input
                  type="text"
                  v-model="second_step.customer_number"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-80 md-small-size-100">
              <md-field>
                <label>{{ this.field_name.street }}</label>
                <md-input type="text" v-model="second_step.address_street"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-20 md-small-size-100">
              <md-field>
                <label>{{ this.field_name.housenumber }}</label>
                <md-input
                  type="text"
                  v-model="second_step.address_housenumber"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-20 md-small-size-100">
              <md-field>
                <label>{{ this.field_name.postal_code }}</label>
                <md-input
                  type="text"
                  v-model="second_step.address_postal_code"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-80 md-small-size-100">
              <md-field>
                <label>{{ this.field_name.city }}</label>
                <md-input type="text" v-model="second_step.address_city"></md-input>
              </md-field>
            </div>
          </div>
          <div class="errorSecond" style="display:none">
            <div class="alert alert-danger">
              <span>{{ this.field_name.error }}</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { Tabs } from "@/components";
import lang from "@/assets/lang/de.json";
import utils from "@/utils.js";

export default {
  components: {
    Tabs
  },
  data() {
    return {
      field_name: {
        error: "",
        title: lang.de.second_step.title,
        heading: lang.de.second_step.heading,
        first_name: lang.de.second_step.first_name,
        last_name: lang.de.second_step.last_name,
        customer_company: lang.de.second_step.customer_company,
        email: lang.de.second_step.email,
        customer_number: lang.de.second_step.customer_number,
        street: lang.de.second_step.street,
        housenumber: lang.de.second_step.housenumber,
        postal_code: lang.de.second_step.postal_code,
        city: lang.de.second_step.city
      },
      second_step: {
        step: "second_step",
        customer_first_name: "",
        customer_last_name: "",
        customer_company: "",
        customer_number: "",
        customer_email: "",
        address_street: "",
        address_housenumber: "",
        address_postal_code: "",
        address_city: ""
      }
    };
  },
  created() {
    this.mouseEventTab();
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then(res => {
        let checkTabDepency = false;
        if (
          this.second_step.customer_first_name !== "" &&
          this.second_step.customer_last_name !== "" &&
          this.second_step.customer_company === ""
        ) {
          checkTabDepency = true;
        } else if (
          this.second_step.customer_first_name === "" &&
          this.second_step.customer_last_name === "" &&
          this.second_step.customer_company !== ""
        ) {
          checkTabDepency = true;
        }

        if (
          !checkTabDepency ||
          this.second_step.customer_email === "" ||
          this.second_step.address_street === "" ||
          this.second_step.address_housenumber === "" ||
          this.second_step.address_postal_code === "" ||
          this.second_step.address_city === ""
        ) {
          document.querySelector(".errorSecond").style.display = "block";
          this.field_name.error = lang.de.second_step.error;
        } else if (!utils.emailValidation(this.second_step.customer_email)) {
          this.field_name.error = lang.de.second_step.email_error;
          document.querySelector(".errorSecond").style.display = "block";
        } else {
          document.querySelector(".errorSecond").style.display = "none";
          this.field_name.error = "";
          this.$emit("on-validated", this.second_step);
          return res;
        }
      });
    },
    mouseEventTab() {
      document.body.addEventListener(
        "click",
        evt => {
          const firstClass = evt.target.className.split(" ");
          if (firstClass[0] === "md-list-item-content") {
            if (evt.target.textContent.trim() === "Gewerbe") {
              this.second_step.customer_first_name = "";
              this.second_step.customer_last_name = "";
            }
            if (evt.target.textContent.trim() === "Privatperson") {
              this.second_step.customer_company = "";
            }
          }
        },
        false
      );
    }
  }
};
</script>
<style></style>
