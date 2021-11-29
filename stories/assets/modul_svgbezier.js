import {LitElement, html, css} from 'lit';

export class SVGBezier extends LitElement {
  static styles = css` svg{
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
    class point{
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
        }
    }
    var points = [];
    // Punkte anlegen
    points.push(new point(10,25,"blue"));
    points.push(new point(10,80,"green"));
    points.push(new point(80,10,"red"));

    this.shadowRoot.innerHTML = `
    <div class="center">
    <h1 style="text-align: center;">Animationswerkzeug für Bezierkurven</h1>
    <svg viewbox="0 0 100 100" id="svg">
    </svg>
    </div>`

    var diag = this.shadowRoot.getElementById("svg");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("id","path");
    path.setAttribute("fill","none");
    path.setAttribute("stroke", "grey");
    path.setAttribute("stroke-width", "0.3px");
    path.setAttribute("d", "M"+points[0].x+","+points[0].y+" L"+points[2].x+","+points[2].y+" L"+points[1].x+","+points[1].y+" S"+points[2].x+","+points[2].y+" "+points[0].x+","+points[0].y);
    diag.appendChild(path);

    for(let i=0;i<Object.keys(points).length;i++){
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("id",i);
        circle.setAttribute("cx", points[i].x);
        circle.setAttribute("cy", points[i].y);
        circle.setAttribute("r", 1);
        circle.setAttribute("fill", points[i].color);
        circle.setAttribute("class", "draggable")
        circle.addEventListener('mousedown', start);
        circle.addEventListener('mousemove', drag);
        circle.addEventListener('mouseup', end);
        diag.appendChild(circle);

        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("id","t"+i);
        text.setAttribute("x", points[i].x+2);
        text.setAttribute("y", points[i].y+2);
        text.innerHTML = "x:"+points[i].x+" y:"+points[i].y;
        text.style = "font-size: 5px";
        diag.appendChild(text);       
    }

    let currelement;
    function start(e) {
        if (e.target.classList.contains('draggable')) {
            currelement = e.target;
        }
    }
    function drag(e) {
        if (e.target == currelement) {
            let i = e.path[0].id;
            let oldx = points[i].x;
            let oldy = points[i].y;
            let pos = convert(e.x,e.y);
            e.path[0].setAttribute("cx", points[i].x += (oldx - pos.x));
            e.path[0].setAttribute("cy", points[i].y += (oldy - pos.y));
            let text = diag.getElementById("t"+i);
            text.setAttribute("x", points[i].x+2);
            text.setAttribute("y", points[i].y+2);
            updatepath();
        }
    }
    function end(e){
        currelement = null;
    }

    function convert(x,y){
        let point = diag.createSVGPoint();
        point.x = x;
        point.y = y;

        return point.matrixTransform(diag.getScreenCTM().inverse());
    }
    
    function updatepath(){
        diag.getElementById("path");
        path.setAttribute("d", "M"+points[0].x+","+points[0].y+" L"+points[2].x+","+points[2].y+" L"+points[1].x+","+points[1].y+" S"+points[2].x+","+points[2].y+" "+points[0].x+","+points[0].y);
    }
  };
}
customElements.define('svg-bezier', SVGBezier);
