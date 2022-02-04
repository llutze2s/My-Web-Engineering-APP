import {LitElement, html, css, unsafeHTML} from 'https://mkaul.github.io/lit/lib/lit.js';

export class Display_Content extends LitElement {
  static styles = css`
    p {
      font-family: sans-serif;
    }

    blockquote {
      border-radius: 10px;
      color: white;
      font-family: sans-serif;
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
        path = "Webseite/content/einfuerung/einfuerung.html";
        break;
      case "Responsive Web Design":
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
customElements.define('display-content', Display_Content);