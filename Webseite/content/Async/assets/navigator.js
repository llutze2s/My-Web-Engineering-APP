var menuband = "";
var sidebar = "";
var additional = "";
var content = "";
var json = "";

async function init(){
    menuband = document.getElementById("menuband");
    sidebar = document.getElementById("sidebar");
    additional = document.getElementById("additional");
    content = document.getElementById("content");

    json = JSON.parse(await fetch("navigator_contents.json").then(response => response.text()));
    build();
}

function build(){
    for(let i=0;i<Object.keys(json).length;i++){
        let tmp = document.createElement("button");
        tmp.innerText = Object.keys(json)[i];
        tmp.addEventListener('click', function(){
            onpresssidebar(tmp);
            tmp.style.background = "grey";
            content.innerText = "";
            additional.innerHTML = "";
        });
        menuband.appendChild(tmp);
    }
}

function onpresssidebar( button ){
    sidebar.innerText = "";
    for(let i=0;i<Object.keys(json[button.innerText]).length; i++){
        let tmp = document.createElement("button");
        tmp.innerText = Object.keys(json[button.innerText])[i];
        tmp.addEventListener('click', function(){
            onpresscontent(button,tmp);
            setcolor();
            button.style.background = "grey";
        });
        sidebar.appendChild(tmp);
    }
}

function onpresscontent( topic , subtopic ){
    content.innerText = json[topic.innerText][subtopic.innerText].content;
    setcolor();
    topic.style.background = "grey";
    subtopic.style.background = "grey";
    for(let i=0; i < json[topic.innerText][subtopic.innerText].references.length; i++){
        additional.innerHTML='<a href='+json[topic.innerText][subtopic.innerText].references[i]+'>'+json[topic.innerText][subtopic.innerText].references[i]+'</a><br>'
    }
}

function setcolor(){
    let buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.background = "#6A709F";
    }
}

