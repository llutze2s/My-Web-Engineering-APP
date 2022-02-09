function init(){
    var add = document.getElementById('button');
    add.addEventListener('click', AddItem); //hier ohne ()
}

function AddItem(){
    var item = document.getElementById('item'); //Hole Item

    var li = document.createElement('li');  // Baue Listenelement
    li.innerHTML = item.value+" ";             // Fülle mit Inhalt
    item.value = "";                       // leere Feld

    var del = document.createElement('button');
    del.innerHTML = "delete";
    del.addEventListener('click', function(){li.remove();});
    li.appendChild(del);

    var ul = document.getElementById('liste');  // Hole Liste

    ul.appendChild(li);                     // An Liste anhängen
}

