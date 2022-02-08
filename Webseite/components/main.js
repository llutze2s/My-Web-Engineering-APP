let content_component;

function init(){
    content = document.getElementById("content");
    content_component = document.createElement("content-component");
    content_component.setAttribute("topic","Einführung");
    content.appendChild(content_component);
}

function alertObserver(e){
    content_component.setAttribute("topic",e);
    content_component.loadContent();
}

//https://developers.google.com/web/tools/workbox/guides/get-started
//https://www.chromium.org/blink/serviceworker/service-worker-faq für SSL
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function(){
        navigator.serviceWorker.register("./Webseite/componets/serviceworker.js")
        .then(function(registration){
            console.log("ServiceWorker registered");
        }).catch(function(err){
            console.log("ServiceWorker failed");
            console.log(err);
        })
    })
} else {
    console.log("ServiceWorker not supported");
}