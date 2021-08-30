<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <div>
        <div class="md-layout-item md-size-100 md-small-size-100 second-step">
          <h4 style="text-align:center;">{{ this.field_name.title }}</h4>
          <p style="text-align:center;">{{ this.field_name.heading }}</p>
          <tabs :tab-name="['Privatperson', 'Gewerbe']" color-button="warning">
            <!-- here you can add your content for tab-content -->
            <template slot="tab-pane-1">
              <div class="md-layout">
                <div class="md-layout-item md-size-50 md-small-size-100">
                  <md-field>
                    <label>{{ this.field_name.ownership_first_name }}</label>
                    <md-input
                      type="text"
                      v-model="third_step.ownership_first_name"
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-50 md-small-size-100">
                  <md-field>
                    <label>{{ this.field_name.ownership_last_name }}</label>
                    <md-input
                      type="text"
                      v-model="third_step.ownership_last_name"
                    ></md-input>
                  </md-field>
                </div>
              </div>
            </template>
            <template slot="tab-pane-2">
              <div class="md-layout">
                <div class="md-layout-item md-size-100 md-small-size-100">
                  <md-field>
                    <label>{{ this.field_name.ownership_company }}</label>
                    <md-input
                      type="text"
                      v-model="third_step.ownership_company"
                    ></md-input>
                  </md-field>
                </div>
              </div>
            </template>
          </tabs>
          <div class="md-layout">
            <div class="md-layout-item md-size-50 md-small-size-100">
              <md-field>
                <label>{{ this.field_name.ownership_vehicle_number }}</label>
                <md-input
                  type="text"
                  v-model="third_step.ownership_vehicle_number"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100">
              <md-card>
                <md-card-content>
                  <md-datepicker
                    v-model="third_step.ownership_start"
                    md-immediately
                  >
                    <label>{{ this.field_name.ownership_start }}</label>
                  </md-datepicker>
                </md-card-content>
              </md-card>
            </div>
          </div>
        </div>
        <div class="errorThird" style="display:none">
          <div class="alert alert-danger">
            <span>{{ this.field_name.error }}</span>
          </div>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { Tabs } from "@/components";
import lang from "@/assets/lang/de.json";

export default {
  components: {
    Tabs
  },
  data() {
    return {
      field_name: {
        error: "",
        heading: lang.de.third_step.heading,
        title: lang.de.third_step.title,
        ownership_first_name: lang.de.third_step.ownership_first_name,
        ownership_last_name: lang.de.third_step.ownership_last_name,
        ownership_company: lang.de.third_step.ownership_company,
        ownership_vehicle_number: lang.de.third_step.ownership_vehicle_number,
        ownership_start: lang.de.third_step.ownership_start
      },
      third_step: {
        step: "third_step",
        ownership_first_name: "",
        ownership_last_name: "",
        ownership_company: "",
        ownership_vehicle_number: "",
        ownership_start: "",
        ownership_end: ""
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
          this.third_step.ownership_first_name !== "" &&
          this.third_step.ownership_last_name !== "" &&
          this.third_step.ownership_company === ""
        ) {
          checkTabDepency = true;
        } else if (
          this.third_step.ownership_first_name === "" &&
          this.third_step.ownership_last_name === "" &&
          this.third_step.ownership_company !== ""
        ) {
          checkTabDepency = true;
        }

        if (
          !checkTabDepency ||
          this.third_step.ownership_vehicle_number === "" ||
          this.third_step.ownership_start === ""
        ) {
          document.querySelector(".errorThird").style.display = "block";
          this.field_name.error = lang.de.third_step.error;
        } else {
          document.querySelector(".errorThird").style.display = "none";
          this.field_name.error = "";
          this.$emit("on-validated", this.third_step);
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
              this.third_step.ownership_first_name = "";
              this.third_step.ownership_last_name = "";
            }
            if (evt.target.textContent.trim() === "Privatperson") {
              this.third_step.ownership_company = "";
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
