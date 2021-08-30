import AuthLayout from "@/pages/EvRegistration/AuthLayout.vue";

import Register from "@/pages/EvRegistration/Register.vue";
import ThankYou from "@/pages/EvRegistration/ThankYou.vue";

const routes = [
  {
    path: "/",
    component: AuthLayout,
    name: "Authentication",
    children: [
      {
        path: "/",
        name: "Register",
        component: Register
      },
      {
        path: "/thankyou",
        name: "ThankYou",
        component: ThankYou
      }
    ]
  }
];

export default routes;
