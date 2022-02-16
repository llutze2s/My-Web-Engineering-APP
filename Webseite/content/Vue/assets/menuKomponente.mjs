import MenuKomponente from "./menuKomponente.mjs";

export default {
    template: `
        <div style="border: 1px solid black;">
           <headline :style=direction v-for="topic in this.content" :key="topic" :name="topic"></headline>
        </div>
    `,

    props: ['topics','vetrical'],
    computed: {
        content: function () {
            return this.topics.split(",");
        },
        direction:function () {
            return this.vetrical ? {'display': 'block'}:'';
        }
    }
}

Vue.component('headline', {
    template: '<button>{{name}}</button>',
    props: ['name']
});

new Vue({
    el: "#app",
    components: {
        MenuKomponente
    }
});