let content_component;

function init(){
    content = document.getElementById("content");
    content_component = document.createElement("display-content");
    content_component.setAttribute("topic","Einführung");
    content.appendChild(content_component);
}

function alertObserver(e){
    content_component.setAttribute("topic",e);
}
