import {LitElement, html, css, svg} from 'https://mkaul.github.io/lit/lib/lit.js';

export class SVGKalligraphie extends LitElement {
static styles = css`  
                    svg{
                        width: 40%; 
                        display: block;
                        margin: auto;
                        border: 1px solid gray;
                    }
                    .center{
                        margin-left: auto;
                        margin-right: auto;
                    }`;

static properties = {
//name: {type: String},
};

constructor() {
super();
}

render(){
    return html`${this.printDiag()}`;
}

printDiag() {
    this.shadowRoot.innerHTML = `
    <div class="center">
        <h1 style="text-align: center;">Kalligraphie-Editor in SVG</h1>
        <svg viewbox="0 0 100 100" id="svg">
        </svg>
    </div>`

    let diag = this.shadowRoot.getElementById("svg");

    let color = "gray";

    let last_x = 0;
    let last_y = 0;
    let isDrawing = false;

    diag.addEventListener('mousedown', start);
    diag.addEventListener('mousemove', drag);
    diag.addEventListener('mouseup', end);

    function convert(x,y){
        let point = diag.createSVGPoint();
        point.x = x;
        point.y = y;

        return point.matrixTransform(diag.getScreenCTM().inverse());
    }

    function start(e){
        if(last_x == 0 && last_y == 0){
            let pos = convert(e.x,e.y);
            last_x = pos.x;
            last_y = pos.y;
            isDrawing = true;
        }
    }
    function drag(e){
        if(isDrawing){
            let pos = convert(e.x,e.y);
            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("fill","none");
            path.setAttribute("stroke", color);
            path.setAttribute("stroke-width", "0.3px");
            path.setAttribute("d", "M"+last_x+","+last_y+" L"+pos.x+","+pos.y);
            diag.appendChild(path);
            last_x = pos.x;
            last_y = pos.y;
        }
    }    
    function end(e){
        last_x = 0;
        last_y = 0;
        isDrawing = false;
    }
};
}
customElements.define('svg-kalligraphie', SVGKalligraphie);