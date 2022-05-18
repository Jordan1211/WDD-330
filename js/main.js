function listWeeklyItems() {
    console.log(links)
    for (let i=0; i < links.length; i++) {
        let type = links[i].type;
        let url = links[i].url;
        let label = links[i].label;

        let list = document.getElementById("weeklyList");
        let item = document.createElement('li');
        let hyperlink = document.createElement('a');
        let activity = document.getElementById("teamActivity");
        let challenge = document.getElementById("challenge");

            if (type == "notes") {
                list.appendChild(item);
                hyperlink.setAttribute('href', url);
                item.appendChild(hyperlink);
                hyperlink.textContent = label;
            } else if (type == "challenge") {
                challenge.appendChild(item);
                hyperlink.setAttribute('href', url);
                item.appendChild(hyperlink);
                hyperlink.textContent = label;
            } else {
                activity.appendChild(item);
                hyperlink.setAttribute('href', url);
                item.appendChild(hyperlink);
                hyperlink.textContent = label;
            }
            };    

}
