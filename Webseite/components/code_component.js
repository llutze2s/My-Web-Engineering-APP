import {LitElement, html, css, unsafeHTML} from 'https://mkaul.github.io/lit/lib/lit.js';

export class Code_Component extends LitElement {
    static styles = css`
        .box {
            max-width: 100%;
            max-height: 100%;
            overflow: auto;
            padding: 5px;
            border-radius: 10px;
            border: 1px solid #290596;
        }
        .code {
            max-width: 100%;
            max-height: 50%;
            overflow: auto;
            border-radius: 5px;
            padding: 5px;
            border-radius: 10px;
            border: 1.5px solid #290596;
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
                <div class="box" id=${this.path}>
                    ${unsafeHTML(this.content)}
                </div>
                </br>
                <button type="button" id=${this.path} @click=${(e) => this._press(e)}>Code Ansicht</button>
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