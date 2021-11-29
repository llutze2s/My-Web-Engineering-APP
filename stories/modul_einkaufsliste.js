import {LitElement, html, css} from 'https://mkaul.github.io/lit/lib/lit.js';

export class Einkaufsliste extends LitElement {
  static styles = css`p { display: inline-block; }`;

  static properties = {
    //name: {type: String},
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <h1>Einkaufsliste</h1>
      <p>
        <form>
            Enter a new item: 
            <input id="item" />
            <button id="button" type="button" @click=${this._AddItem}>Add item</button>
        </form>
      </p>
      <ul id="liste">
      </ul>
    `;
  }

  get _input() {
    return (this.___input ??= this.renderRoot?.querySelector('input') ?? null);
  }
  get _liste() {
    return (this.___ul ??= this.renderRoot?.querySelector('ul') ?? null);
  }

  _AddItem(e){
    var item = this._input;

    var li = document.createElement('li');  // Baue Listenelement
    li.innerHTML = item.value+" ";          // Fülle mit Inhalt
    item.value = "";                       // leere Feld

    var del = document.createElement('button');
    del.innerHTML = "delete";
    del.addEventListener('click', function(){li.remove();});
    li.appendChild(del);

    var ul = this._liste;  // Hole Liste

    ul.appendChild(li);                     // An Liste anhängen
  }
}
customElements.define('einkaufs-liste', Einkaufsliste);