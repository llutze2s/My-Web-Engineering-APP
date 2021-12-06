var menuband = "";
var sidebar = "";
var additional = "";
var content = "";
var json = "";
var topic = "";

async function init(){
    menuband = document.getElementById("menuband");
    sidebar = document.getElementById("sidebar");
    additional = document.getElementById("additional");
    content = document.getElementById("content");

    json = JSON.parse(await fetch("navigator_contents.json").then(response => response.text()));
    let items = []; 
    for(let i=0;i<Object.keys(json).length;i++){
        items.push('"'+Object.keys(json)[i]+'"');
    }
    let menu = document.createElement("menu-band");
    menu.setAttribute("items", '['+items.toString()+']');
    menuband.appendChild(menu);

    //https://developers.google.com/web/tools/workbox/guides/get-started
    //https://www.chromium.org/blink/serviceworker/service-worker-faq für SSL
    if ('serviceWorker' in navigator) {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', async () => {
                try {
                    const reg = await navigator.serviceWorker.register("serviceworker.js");
                    console.log('Service worker registered!');
                } catch (err) {
                    console.log('Service worker registration failed');
                }
            });
        }
    }
}

function onpresssidebar( id ){
    if(Object.keys(json).includes(id)){
        sidebar.innerText = "";
        let items = []; 
        for(let i=0;i<Object.keys(json[id]).length; i++){
            items.push('"'+Object.keys(json[id])[i]+'"');
        }
        let menü = document.createElement("menü-band");
        menü.setAttribute("items", '['+items.toString()+']');
        menü.setAttribute("vertical", true);
        sidebar.appendChild(menü);
        topic = id;
        content.innerText = "";
        additional.innerHTML = "";
    } else {
        content.innerText = json[topic][id].content;
        for(let i=0; i < json[topic][id].references.length; i++){
            additional.innerHTML='<a href='+json[topic][id].references[i]+'>'+json[topic][id].references[i]+'</a><br>'
        }
    }
}

