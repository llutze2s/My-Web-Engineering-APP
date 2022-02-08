import {LitElement, html, css, unsafeHTML} from 'https://mkaul.github.io/lit/lib/lit.js';
import { Code_Component } from './code_component.js';
import { Embed_Component } from './embed_component.js';

export class Content_Component extends LitElement {
  static styles = css`
    p,h1,h2 {
      font-family: sans-serif;
      font-size: 1em;
    }

    h1 {
      font-size: 2.5em;
    }

    h2 {
      font-size: 1.5em;
    }

    blockquote {
      border-radius: 10px;
      color: white;
      font-family: sans-serif;
      font-size: 1em;
      padding: 5px;
      border: 0.5px solid #290596;
      border-radius: 10px;
      box-shadow: #290596 0px 4px 6px 0px;
      background: rgb(97,89,231);  /* https://cssgradient.io/gradient-backgrounds/ */
      background: linear-gradient(90deg, rgba(97,89,231,1) 0%, rgba(45,45,180,1) 20%, rgba(41,5,150,1) 50%, rgba(45,45,180,1) 80%, rgba(97,89,231,1) 100%);
    }
  `;

  static properties = {
    topic: {type: String},
    content: {type: String}
  };

  connectedCallback() {
    super.connectedCallback();
    this.loadContent();
  }

  loadContent(){
    var path = "";
    
    switch (this.topic){
      case "Einführung":
        path = "Webseite/content/Einfuerung/content.html";
        break;
      case "Responsive Web Design":
        path = "Webseite/content/ResponsiveWebDesign/content.html";
        break;
      case "Java Script":
        break;
      case "DOM":
        break;
      case "Async":
        break;
      case "SVG":
        break;
      case "Node.js":
        break;
      case "Modular":
        break;
      case "PWA":
        break;
      case "Vue":
        break;
      default:
        console.log("No Topic");
        break;
    }
    
    fetch(path)
    .then(response => response.text())
    .then(response => {
      this.content = response;
    });
  }

  render() {  // https://stackoverflow.com/questions/57103073/lit-element-outputting-raw-html-from-property-string
    return html`${unsafeHTML(this.content)}`; 
  }
}
customElements.define('content-component', Content_Component);