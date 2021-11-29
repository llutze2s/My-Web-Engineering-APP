import {LitElement, html, css} from 'lit';

export class SVGDiagram extends LitElement {
  static styles = css`tr,td,th {
                        border: 1px solid black;
                    }
                    table{
                        border-collapse: collapse;
                        margin-left:auto; 
                        margin-right:auto;
                    }
                    svg{
                        width: 50%; 
                        height: 30%;
                        display: block;
                        margin: auto;
                        border: 1px solid gray;
                    }`;

  static properties = {
    //name: {type: String},
  };

  constructor() {
    super();
  }

  render(){
      return html`
      <div>
      <h1 style="text-align: center;">Sitzverteilung 18. Bundestag</h1>

        <table>
            <tr>
                <th>Fraktion</th>
                <th>Anzahl</th>
            </tr>
            <tr>
                <td>CDU/CSU</td>
                <td>310</td>
            </tr>
            <tr>
                <td>SPD</td>
                <td>193</td>
            </tr>
            <tr>
                <td>Die Linke</td>
                <td>64</td>
            </tr>
            <tr>
                <td>Grüne</td>
                <td>63</td>
            </tr>
            <tr>
                <td>Gesamt</td>
                <td>630</td>
            </tr>
        </table>
        <p style="text-align: center;">
            Quelle <a href="http://webarchiv.bundestag.de/cgi/show.php?id=1284&jahr=2016">Webarchiv Bundestag</a>
        </p>
        <svg viewbox="0 0 130 100" id="svg">
            ${this.printDiag()}
        </svg>
    </div>`;
  }

  printDiag() {
    fetch("sitze.json")
    .then(response => response.json())
    .then(json => createDiagram(json.data, this.shadowRoot));

    function createDiagram(data, shadowRoot){
        let svg = shadowRoot.getElementById("svg");

        for(let i = 0; i < Object.keys(data).length - 1; i++){
            var rect =  document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", 25);
            rect.setAttribute("y", Math.ceil((100/Object.keys(data).length)*(i)+10));
            rect.setAttribute("height", Math.ceil((100/Object.keys(data).length)-10));
            rect.setAttribute("width", Math.ceil((data[i].sitze/data.at(-1).gesamt)*100));
            rect.setAttribute("fill",  data[i].farbe);

            svg.appendChild(rect);

            var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", 1);
            text.setAttribute("y", Math.ceil((100/Object.keys(data).length)*(i)+16));
            text.innerHTML = data[i].fraktion;
            text.style = "font-size: 5px";

            svg.appendChild(text);
 
            var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text2.setAttribute("x", Math.ceil((data[i].sitze/data.at(-1).gesamt)*100)+30);
            text2.setAttribute("y", Math.ceil((100/Object.keys(data).length)*(i)+16));
            text2.innerHTML = data[i].sitze;
            text2.style = "font-size: 5px";

            svg.appendChild(text2);
        }
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 25);
        line.setAttribute("x2", 25);
        line.setAttribute("y1", 5);
        line.setAttribute("y2", 95);
        line.style = "stroke: lightgray";
    }
  };
}
customElements.define('svg-diagram', SVGDiagram);
