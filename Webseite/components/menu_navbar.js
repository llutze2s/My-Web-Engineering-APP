import {LitElement, html, css} from 'https://mkaul.github.io/lit/lib/lit.js';

export class Menu_navbar extends LitElement {
  static styles = css`
  ul {
    padding: 5px;
    width: 95%;
    margin: auto;
    list-style-type: none;
  }

  button {
    border: 0.5px solid lightgrey;
    box-shadow: lightgrey 0px 4px 6px 0px;
    background-color: #FFFFFF;
    color: black;
    font-weight: bold;
    border-radius: 20px;
    box-shadow: 15px;
    min-height: 25px;
    padding: 5px;
    margin: 5px;
    transition-duration: 0.4s;
    justify-content: center;
  }
  button:hover{
    box-shadow: #290596 0px 4px 6px 0px;
  }
  button:focus{
    border: 0.5px solid #290596;
    background-color: #290596;
    color: white;
  }

  .direction {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .direction button {
    display: inline;
  }

  @media (min-width: 992px) {
    .direction {
      flex-direction: column;
    }
    .direction button {
      width: 90%;
      max-width: 300px;
      display: block;
    }
  }
  `;

  static properties = {
    items: {type: Array},
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
    return html`<div class="direction"><ul>${this.Menuitems}</ul></div>`;
  }

  _press(e) {
    alertObserver(e.path[0].id);
  }

}
customElements.define('menu-navbar', Menu_navbar);