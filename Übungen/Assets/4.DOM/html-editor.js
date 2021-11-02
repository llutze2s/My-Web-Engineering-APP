//document.execCommand(CommandName, ShowDefaultUI, ValueArgument); //Eigentlich veraltet

function command (com){
    switch (com) {
        case 'h1':
        case 'h2':
        case 'h3':
            document.execCommand('formatBlock', false, com);
            break;
        case 'justifyLeft':
        case 'justifyRight':
        case 'justifyCenter':
        case 'superscript':
        case 'subscript':
        case 'bold':
        case 'italic':
        case 'underline':
            document.execCommand(com, false, false);
            break;
        case 'createlink':
            url = prompt('Enter URL: ', 'https:\/\/');
            document.execCommand(com, false, url);
            break;
        case 'insertImage':
            url = prompt('Enter URL: ', 'https:\/\/');
            url.height='100px';
            url.width='50px';
            document.execCommand(com, false, url);
            break;
        default:
            alert('Befehl nicht gefunden!');
    }
}