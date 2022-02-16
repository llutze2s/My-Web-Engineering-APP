import Navigator from "./navigator.mjs";

export default {
    template: `
        <div style="border: 1px solid black;">
           <headline :style="{'display': 'block'}" v-for="topic in this.headlines" :key="topic" :name="topic"></headline>
        </div>
    `
}

Vue.component('headline', {
    template: '<button @click="clicked">{{name}}</button>',
    props: ['name'],
    methods: {
        clicked: function(){}
    }
});

new Vue({
    el: "#app",
    components: {
        Navigator
    },
    data: {
        headlines: [],
        subtopics: [],
        content: [],
        references: [],
    },
    created: async function () {
        var json = await JSON.parse(await fetch("navigator_contents.json").then(response => response.text()));
        this.headlines = Object.keys(json);
        var tmp = [];
        this.headlines.forEach((index) => Object.keys(json[index]).forEach((key) => tmp[index] = key))   //Muss überarbeitet werden nur zweite Überschrift
    }
});