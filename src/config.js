export const logo = {
  localhost: require("@/assets/img/innogy.svg"),
  innogy: require("@/assets/img/innogy.svg"),
  marke: require("@/assets/img/marke.svg"),
  enviam: require("@/assets/img/enviaM.jpg"),
  demo: require("@/assets/img/innogy.svg")
};
/**
 * in pdroduction indexOf should be . instead of :
 * */
export const company = {
  localhost: "innogy",
  innogy: "innogy",
  marke: "marke",
  enviam: "enviam",
  demo: "demo"
};

export const redirectUrl = {
  localhost: "https://www.innogy-emobility.com/elektromobilitaet",
  innogy: "https://www.innogy-emobility.com/elektromobilitaet",
  marke: "https://www.mark-e.de/",
  enviam: "https://www.enviam.de/elektromobilitaet",
  demo: "https://www.innogy-emobility.com/elektromobilitaet"
};

// export const baseUrl =
//   window.location.host === "localhost:8080"
//     ? window.location.host
//         .substr(0, window.location.host.indexOf(":"))
//         .replace("-", "")
//     : window.location.host
//         .substr(0, window.location.host.indexOf("."))
//         .replace("-", "");

export const baseUrl = "innogy";
