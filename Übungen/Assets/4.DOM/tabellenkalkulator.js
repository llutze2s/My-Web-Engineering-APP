function init(){
    var add_col = document.createElement('button');
    add_col.innerHTML = "+";
    add_col.addEventListener('click', addcolumn);
    document.getElementById('add_col').appendChild(add_col);

    var rem_col = document.createElement('button');
    rem_col.innerHTML = "-";
    rem_col.addEventListener('click', removecolumn);
    document.getElementById('rem_col').appendChild(rem_col);
    
    var add_row = document.createElement('button');
    add_row.innerHTML = "+";
    add_row.addEventListener('click', addrow);
    document.getElementById('add_row').appendChild(add_row);

    var rem_row = document.createElement('button');
    rem_row.innerHTML = "-";
    rem_row.addEventListener('click', removerow);
    document.getElementById('rem_row').appendChild(rem_row);
}

const Column_Index = ['A','B','C','D','E','F','G'];

function addcolumn(){
    var table = document.getElementById('table');

    for (i = 0; i < table.rows.length-2; i++) {
        if(i == 0){
            x = table.rows[i].insertCell(table.rows[0].cells.length-2);
        } else {
            x = table.rows[i].insertCell(table.rows[i].cells.length);
            x.contentEditable = true;
            x.id = Column_Index[table.rows[i].cells.length-2]+i;
            //x.innerHTML = x.id;
        }
        if(i == 0 && table.rows[i].cells.length > 3){
            x.innerHTML = Column_Index[table.rows[0].cells.length-4];
        }
    }
}
function removecolumn(){
    var table = document.getElementById('table');
    
    if(table.rows[0].cells.length > 3){
        for (i = 0; i < table.rows.length; i++) {
            if(i == 0){
                table.rows[i].deleteCell(table.rows[0].cells.length-3);
            } else {
                table.rows[i].deleteCell(table.rows[0].cells.length-2);
            }
        }
    }
}
function addrow(){          //https://www.w3schools.com/jsref/met_table_insertrow.asp
    var table = document.getElementById('table');
    var row_count = table.rows.length;
    var column_count = table.rows[0].cells.length-2;

    var row = table.insertRow(row_count-2); //-2 da Buttons auf 0 / -2 liegen
    for(i=0; i<column_count; i++){
        x = row.insertCell(i);
        if(i==0){
            x.innerHTML = row_count-2;
        } else {
            x.contentEditable = true;
            x.id = Column_Index[i-1]+(row_count-2);
            x.addEventListener("focusout", calc);
            x.addEventListener("focusin", sum);
            //x.innerHTML = x.id;
        }
    }
}

function removerow(){       //https://www.w3schools.com/jsref/met_table_deleterow.asp
    var row_count = document.getElementById('table').rows.length;

    if(row_count > 3){
        document.getElementById('table').deleteRow(row_count-3); //-2 da Buttons auf -1 / -2 liegen
    }
}

function calc(){
    //regex
        //
        //berech
};

function sum(){

};