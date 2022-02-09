import {LitElement, html, css, unsafeHTML} from 'https://mkaul.github.io/lit/lib/lit.js';

// Prism für den Pritty Print des Codes
import 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/prism.min.js';

export class JsInteractive_Component extends LitElement {
    static styles = css`
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
            margin:0;
            padding:0;
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
        id: {type: String},
        content: {type: String},
    };
    
    render() {  // https://stackoverflow.com/questions/57103073/lit-element-outputting-raw-html-from-property-string
        return html`
            <div class="code" id=${this.id}>
                <!-- Prism für den Pritty Print des Codes -->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/themes/prism.min.css">

                <pre><code> <!-- Für Design: class language-html -->
                    ${unsafeHTML(Prism.highlight(this.content, Prism.languages.js, 'js'))}
                </code></pre>
            </div>
        `;
    }
}
customElements.define('jsinteractive-component', JsInteractive_Component);