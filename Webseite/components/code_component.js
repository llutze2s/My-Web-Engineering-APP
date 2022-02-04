import {LitElement, html, css, unsafeHTML} from 'https://mkaul.github.io/lit/lib/lit.js';

export class Code_Component extends LitElement {
    static styles = css``

    static properties = {
        path: {type: String},
        content: {type: String}
    };

    connectedCallback() {
        super.connectedCallback();
        this.loadContent();
    }

    loadContent(){      
        fetch(this.path)
        .then(response => response.text())
        .then(response => {
          this.content = response;
        });
     }
    
    render() {  // https://stackoverflow.com/questions/57103073/lit-element-outputting-raw-html-from-property-string
    return html`
        <iframe frameborder="0" src="Webseite/content/einfuerung/snippet1.html"></iframe>
        ${unsafeHTML(this.content)}`; 
    }

    _press(e) {
        var code = document.getElementById(1.1).innerHTML;
        //Html encoden
        code.replaceAll("<","&lt;");
        code.replaceAll(">","&gt;");
    }
}
customElements.define('code-component', Code_Component);