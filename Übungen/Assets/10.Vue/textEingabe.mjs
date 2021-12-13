import textEingabe from "./textEingabe.mjs";

export default {
    template: `
        <div>
            <input @input="analysis" ref="input">
            <p>a) Buchstaben: {{buchstaben}}</p>
            <p>b) Leerzeichen: {{leerzeichen}}</p>
            <p>c) Wörter: {{woerter}}</p>
        </div>
    `,

    data () {
        return {
            buchstaben: 0,
            leerzeichen: 0,
            woerter: 0
        }
    },

    methods:{
        analysis() {
            let input = this.$refs.input.value;
            this.buchstaben = input.length;
            input = input.split(/\s/);
            this.leerzeichen = input.length-1;
            this.buchstaben = this.buchstaben - this.leerzeichen;
            this.woerter = input.length;
        }
    }
}

new Vue({
    el: "#app",
    components: {
        textEingabe
    }
});