import {LitElement, html, css} from 'https://mkaul.github.io/lit/lib/lit.js';

const Column_Index = ['A','B','C','D','E','F','G'];
var DOM;

export class Tabellenkalkulation extends LitElement {
  static styles = css`td {  border: 1px solid black; }`;

  static properties = {
    //name: {type: String},
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <h1>Tabellenkalkulator mit contentEditable</h1>
        <p>=SUM(X1,Y2) rechnet</p>
        <table id="table">
            <tr>
                <th id="add_col"><button @click=${this._addcolumn}>+</button></th>
                <th id="rem_col"><button @click=${this._removecolumn}>-</button></th>
            </tr>
            <tr>
                <th id="add_row"><button @click=${this._addrow}>+</button></th>
            </tr>
            <tr>
                <th id="rem_row"><button @click=${this._removerow}>-</button></th>
            </tr>
        </table>
    `;
  }
 
  _addcolumn(){
    var table = this.shadowRoot.getElementById('table');
    DOM = table;

    for (let i = 0; i < table.rows.length-2; i++) {
        let x;
        if(i == 0){
            x = table.rows[i].insertCell(table.rows[0].cells.length-2);
        } else {
            x = table.rows[i].insertCell(table.rows[i].cells.length);
            x.contentEditable = true;
            x.id = Column_Index[table.rows[i].cells.length-2]+i;
            x.addEventListener("focusout", this._calc);
            x.addEventListener("focusin", this._sum);
            //x.innerHTML = x.id;
        }
        if(i == 0 && table.rows[i].cells.length > 3){
            x.innerHTML = Column_Index[table.rows[0].cells.length-4];
        }
    }
  }

  _removecolumn(){
    var table = this.shadowRoot.getElementById('table');
    
    if(table.rows[0].cells.length > 3){
        for (let i = 0; i < table.rows.length; i++) {
            if(i == 0){
                table.rows[i].deleteCell(table.rows[0].cells.length-3);
            } else {
                table.rows[i].deleteCell(table.rows[0].cells.length-2);
            }
        }
    }
 }

 _addrow(){
    var table = this.shadowRoot.getElementById('table');
    var row_count = table.rows.length;
    var column_count = table.rows[0].cells.length-2;

    var row = table.insertRow(row_count-2); //-2 da Buttons auf 0 / -2 liegen
    for(let i=0; i<column_count; i++){
        let x = row.insertCell(i);
        if(i==0){
            x.innerHTML = row_count-2;
        } else {
            x.contentEditable = true;
            x.id = Column_Index[i-1]+(row_count-2);
            x.addEventListener("focusout", this._calc);
            x.addEventListener("focusin", this._sum);
            //x.innerHTML = x.id;
        }
    }
 }

 _removerow(){
    let row_count = this.shadowRoot.getElementById('table').rows.length;

    if(row_count > 3){
        this.shadowRoot.getElementById('table').deleteRow(row_count-3); //-2 da Buttons auf -1 / -2 liegen
    }
 }

 _calc(cell){
    if(cell.path[0].childNodes[0].data.startsWith("=")){
        if(cell.path[0].childNodes[0].data.match(/^=SUM\([A-Z][1-9]+\,[A-Z][1-9]+\)/)){
            var data = cell.path[0].childNodes[0].data;
            cell.path[0].setAttribute("formel", data.toString()); //Formel abspeichern
            let tmp = data.split(/[\(,\)]/);
            let x = tmp[1];
            let y = tmp[2];
            cell.path[0].childNodes[0].data = parseInt(cell.path[4].getElementById(x).innerHTML) + parseInt(cell.path[4].getElementById(y).innerHTML);
        }
    }
 }

 _sum(cell){
    if(cell.path[0].getAttribute("formel") != undefined){
        cell.path[0].childNodes[0].data = cell.path[0].getAttribute("formel");
    }
 }
}
customElements.define('tabellen-kalk', Tabellenkalkulation);