import {LitElement, html, css} from 'https://mkaul.github.io/lit/lib/lit.js';

export class Display_Content extends LitElement {
  static styles = css``;

  static properties = {
    topic: {type: String},
  };


  render() {
    return html`${this.topic}`;
  }


}
customElements.define('display-content', Display_Content);