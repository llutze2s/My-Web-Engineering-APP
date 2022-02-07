import {LitElement, html, css, unsafeHTML} from 'https://mkaul.github.io/lit/lib/lit.js';

export class Code_Component extends LitElement {
    static styles = css`
        .box {
            max-width: 100%;
            max-height: 100%;
            overflow: auto;
            border-radius: 5px;
        }
        .code {
            max-width: 100%;
            max-height: 50%;
            overflow: auto;
            border-radius: 5px;
        }
        pre,code {
            white-space: pre-wrap;
            overflow-x: auto;
            text-align: left;
            tab-size: 1;
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
                <div class="box" id=${this.path}>
                    ${unsafeHTML(this.content)}
                </div>
                <button type="button" id=${this.path} @click=${(e) => this._press(e)}>Code Anzeigen</button>
            `;
        } else {
            return html`
                <div class="code" id=${this.path}>
                    <pre>
                        <code>
                            ${this.content}
                        </code>
                    </pre>
                </div>
                <button type="button" id=${this.path} @click=${(e) => this._press(e)}>Webseite Anzeigen</button>
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