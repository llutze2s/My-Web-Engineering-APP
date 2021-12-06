import {LitElement, html, css} from 'https://mkaul.github.io/lit/lib/lit.js';

export class Menuband extends LitElement {
  static styles = css`
  ul {
    padding: 5px;
    margin: 5px;
    list-style-type: none;
  }
  button {
    background-color: #6A709F;
    color: black;
    font-weight: bold;
    border-radius: 20px;
    box-shadow: 15px;
    margin: 5px;
    text-decoration: none;
  }
  .vertical {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .vertical button {
    display: block;
    padding: 5px;
  }
  .horizontal {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .horizontal button {
    padding: 5px;
  }
  `;

  static properties = {
    //name: {type: String},
    vertical: {type: Boolean},
    items: {type: Array},
    callback: {type: Object}
  };

  static Menuitems;

  constructor() {
    super();
    this.Menuitems = [];
  }

  render() {
    var tmp = [];
    for(let i=0;i<this.items.length; i++ ) {
        tmp.push(html`<button type="button" id="${this.items[i]}" @click=${(e) => this._press(e)}>${this.items[i]}</button>`);
    }
    this.Menuitems = tmp;
    return html`${this.vertical?html`<div class="vertical"><ul>${this.Menuitems}</ul></div>`
                               :html`<div class="horizontal"><ul>${this.Menuitems}</ul></div>`}`;
  }

  _press(e) {
    onpresssidebar(e.path[0].id);
  }

}
customElements.define('menu-band', Menuband);