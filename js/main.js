

function listWeeklyItems(link) {

    links.forEach(link => {
        let list = document.getElementById("weeklylist");
        let item = document.createElement('li');
        let hyperlink = document.createElement('a');

        list.appendChild(item);
        hyperlink.setAttribute('href',link.url);
        item.appendChild(hyperlink);
        hyperlink.textContent = link.label;
        
    });
    
}