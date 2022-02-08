import {LitElement, html, css, unsafeHTML} from 'https://mkaul.github.io/lit/lib/lit.js';

// Prism für den Pritty Print des Codes
import 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/prism.min.js';

export class Code_Component extends LitElement {
    static styles = css`
        .webseite {
            width: 95%;
            max-width: 1250px;
            max-height: 50vh;
            margin: auto;
            overflow: auto;
            border-radius: 10px;
            border-bottom-right-radius: 0;
            border: 1px solid #290596;
            padding: none;
            resize: both;
        }
        .code {
            width: 95%;
            max-width: 1250px;
            max-height: 50vh;
            margin: auto;
            overflow: auto;
            border-radius: 5px;
            border-radius: 10px;
            border: 1.5px solid #290596;
            resize: both;
        }
        pre, code {
            white-space: pre-wrap;
            overflow-x: auto;
            text-align: left;
            tab-size: 1;
        }
        /* Custom Scrollbar */
        /* https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp */
        ::-webkit-scrollbar {
            width: 10px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb {
            background: rgb(97,89,231);  /* https://cssgradient.io/gradient-backgrounds/ */
            background: linear-gradient(90deg, rgba(97,89,231,1) 0%, rgba(45,45,180,1) 20%, rgba(41,5,150,1) 50%, rgba(45,45,180,1) 80%, rgba(97,89,231,1) 100%);
            border-radius: 5px;
        }
    `

    static properties = {
        path: {type: String},
        content: {type: String},
        codeView: {type: Boolean}
    };

    constructor() {
        super();
        this.codeView = false;
    }

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
        if(this.codeView == false){
            return html`
                <div class="webseite" id=${this.path}>
                    ${unsafeHTML(this.content)}
                </div>
                </br>
                <button type="button" id=${this.path} @click=${(e) => this._press(e)}>Code Ansicht</button>
            `;
        } else {
            return html`
                <div class="code" id=${this.path}>
                    <!-- Prism für den Pritty Print des Codes -->
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/themes/prism.min.css">

                    <pre> <!-- Für Design: class language-html -->
                        <code> <!-- Für Design: class language-html -->
                            ${unsafeHTML(Prism.highlight(this.content, Prism.languages.html, 'html'))}
                        </code>
                    </pre>
                </div>
                </br>
                <button type="button" id=${this.path} @click=${(e) => this._press(e)}>Webseite Ansicht</button>
            `;
        }
    }

    _press(e) {
        if( this.codeView == true){
            this.codeView = false;
        } else {
            this.codeView = true;
        }
    }
}
customElements.define('code-component', Code_Component);