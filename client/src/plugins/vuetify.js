import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#009688",
        secondary: "#4caf50",
        accent: "#795e49",
        error: "#f44336",
        warning: "#ffc107",
        info: "#2196f3",
        success: "#8bc34a"
      },
    }
  }
});

export default vuetify;