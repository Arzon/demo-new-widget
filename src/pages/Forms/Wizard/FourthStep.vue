<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <div>
        <div class="md-layout-item md-size-100 md-small-size-100 second-step">
          <h4 style="text-align:center;">{{ this.field_name.title }}</h4>
          <p style="text-align:center;">{{ this.field_name.heading }}</p>
          <div class="md-layout" style="text-align:center;margin-top:20px;">
            <label class="md-layout-item md-size-50 md-xsmall-size-100 md-form-label" style="text-align:center;padding:0;">
              {{ this.field_name.ownership_file }}
            </label>
            <div class="md-layout-item md-xsmall-size-100 adjust">
              <input style="width:100%;"
                type="file"
                id="ownership_file"
                accept="image/jpeg,image/png,application/pdf"
                @change="updateMelliCodeFrontScan"
                required
              />
            </div>
          </div>
          <div class="md-layout" style="text-align:center;">
            <label class="md-layout-item md-size-50 md-xsmall-size-100 md-form-label" style="text-align:center;padding:0;">
              {{ this.field_name.proof_file }}
            </label>
            <div class="md-layout-item md-xsmall-size-100 adjust">
              <input style="width:100%;"
                type="file"
                id="proof_file"
                accept="image/jpeg,image/png,application/pdf"
                @change="updateMelliCodeFrontScan"
              />
            </div>
          </div>
          
          <md-card-content>
            <md-table v-model="tableData" table-header-color="green">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Situation">{{
                  item.key
                }}</md-table-cell>
                <md-table-cell md-label="Nachweise">{{
                  item.value
                }}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>

          <div class="errorFourth" style="display:none">
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
import {} from "@/components";
import lang from "@/assets/lang/de.json";
import Swal from "sweetalert2";

export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          key: "Name (Privatperson oder Unternehmen) von Stromvertrag und Zulassung stimmen überein.",
          value: "nur Fahrzeugschein"
        },
        {
          key:
            "Halter des Elektroautos hat anderen Namen aber die selbe Adresse.",
          value: "Fahrzeugschein + Personalausweis (Rückseite)"
        },
        {
          key:
            "Das Elektroauto ist ein Dienstwagen und auf ein Unternehmen zugelassen.",
          value: "Fahrzeugschein + Bescheinigung Dienstwagen"
        }
      ],
      field_name: {
        error: "",
        heading: lang.de.fourth_step.heading,
        title: lang.de.fourth_step.title,
        ownership_file: lang.de.fourth_step.ownership_file,
        proof_file: lang.de.fourth_step.proof_file
      },
      fourth_step: {
        step: "fourth_step",
        ownership_file: "",
        proof_file: ""
      }
    };
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then(res => {
        if (
          this.fourth_step.ownership_file === "" 
         // || this.fourth_step.proof_file === ""
        ) {
          document.querySelector(".errorFourth").style.display = "block";
          this.field_name.error = lang.de.fourth_step.error;
        } else {
          document.querySelector(".errorFourth").style.display = "none";
          this.field_name.error = "";
          this.$emit("on-validated", this.fourth_step);
          return res;
        }
      });
    },
    updateMelliCodeFrontScan(e) {
      let file = e.target.files;
      if (
        (file[0]["type"] === "application/pdf" ||
          file[0]["type"] === "image/png" ||
          file[0]["type"] === "image/jpeg") &&
        file[0]["size"] <= 5242880
      ) {
        if (e.target.id === "ownership_file") {
          this.fourth_step.ownership_file = file[0];
        } else if (e.target.id === "proof_file") {
          this.fourth_step.proof_file = file[0];
        }
      } else {
        document.getElementById(e.target.id).value = "";
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text:
            "Deine Datei hat ein falsches Dateiformat (erforderlich ist entweder .pdf, .jpeg oder .png). Oder deine Datei ist zu groß (15 MB). Bitte versuche es erneut."
        });
      }
    }
  }
};
</script>
<style></style>
