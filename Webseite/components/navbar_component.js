import {LitElement, html, css} from 'https://mkaul.github.io/lit/lib/lit.js';

export class Navbar_Component extends LitElement {
  static styles = css`
  ul {
    padding: 10px;
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
    font-family: sans-serif;
    border-radius: 20px;
    box-shadow: 15px;
    min-height: 25px;
    padding: 10px;
    margin: 5px;
    transition-duration: 0.4s;
    justify-content: center;
  }
  button:hover{
    border: 0.5px solid #290596;
    box-shadow: #290596 0px 4px 6px 0px;
  }
  button:focus{
    border: 0.5px solid #290596;
    box-shadow: #290596 0px 4px 6px 0px;
    background: rgb(97,89,231);  /* https://cssgradient.io/gradient-backgrounds/ */
    background: linear-gradient(90deg, rgba(97,89,231,1) 0%, rgba(45,45,180,1) 20%, rgba(41,5,150,1) 50%, rgba(45,45,180,1) 80%, rgba(97,89,231,1) 100%);
    color: white;
  }
  button:active{
    border: 0.5px solid #290596;
    box-shadow: #290596 0px 4px 6px 0px;
  }

  .direction {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .direction button {
    display: inline;
    min-width: 60px;
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

  static menuitems;

  constructor() {
    super();
    this.menuitems = [];
  }

  render() {
    var tmp = [];
    for(let i=0;i<this.items.length; i++ ) {
        tmp.push(html`<button type="button" id="${this.items[i]}" @click=${(e) => this._press(e)}>${this.items[i]}</button>`);
    }
    this.menuitems = tmp;
    return html`<div class="direction"><ul>${this.menuitems}</ul></div>`;
  }

  _press(e) {
    alertObserver(e.path[0].id);
  }

}
customElements.define('navbar-component', Navbar_Component);