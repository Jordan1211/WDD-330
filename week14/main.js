  //grab the parent fieldsets
  const parent1 = document.querySelector('[id="parent1"]');
  const parent2 = document.querySelector('[id="parent2"]');
   //grab the date input
  const dateInput = document.getElementById('dateInput');
  //grab the checkbox inputs
  const parent1Input = parent1.querySelectorAll('input[type="checkbox"]');
  const parent2Input = parent2.querySelectorAll('input[type="checkbox"]');

  //event listener for date changes
  dateInput.addEventListener('change', getStartDate);
  dateInput.addEventListener('change', populateCalendar);

  //event listener for parent time checkbox changes
  parent1.addEventListener('change', getChecks);

  //function to get checks and generate output dependant on parent 1 inputs
  function getChecks() {
    const Output = [];

    parent1Input.forEach(function (inputInfo) {
      const checked = inputInfo.checked;
      const day = inputInfo.id;
      const parent1Output = {
        id: day,
        checked: checked
      };
      Output.push(parent1Output);
    });

    Output.forEach(function (update) {
      const checked = update.checked;
      if (checked == true) {
        parent2.querySelector('[id="' + update.id + '"]').removeAttribute('checked');
      } else {
        parent2.querySelector('[id="' + update.id + '"]').setAttribute('checked', true);
      };
    });

    //shows the array of objects (id linked to checkbox and true/false)
    console.log(Output);
  }

  //function to get the start date and more importantly the start day of week (always sunday)
  function getStartDate() {
    const dateControl = document.querySelector('input[type="date"]');
    const startDate = new Date(dateControl.value.replace(/-/g, '\/').replace(/T.+/, ''));
    console.log('Start Date: ' + startDate);
    const start = startDate;
    const first = start.getDate() - start.getDay();
    const sunday = new Date(start.setDate(first));
    console.log('Start Day of Week: ' + sunday);
    return sunday;
  }

  //shows the parent 1 inputs and parent 2 inputs
  // console.log(parent1Input);
  // console.log(parent2Input);

  //interact with calendar and output formatting
  function populateCalendar() {  
    var start = getStartDate(),
      events = [];


      parent1Input.forEach(function (inputInfo, i) {
        const checked = inputInfo.checked;
        const order = 0 + i;
        const date = +new Date(start.getFullYear(), start.getMonth(), start.getDate()+ order);
        const parent1Output = {key: date,
          value: checked};
        events.push(parent1Output);
      });


      events.forEach(function (event) {
        const key = event.key;
        const value = event.value.toString();
        events[key] = value;
      });

    //show the events that wil be passed to the kendo api
     console.log(events);

    // kendo api piece that uses start date and events to populate formatting
    $("#calendar").kendoCalendar({
      value:start,
      dates:events,
      month:{
          content:'# if (typeof data.dates[+data.date] === "string") { #' +
                  '<div class="#= data.dates[+data.date] #">' +
                  '#= data.value #' +
                  '</div>' +
                  '# } else { #' +
                  '#= data.value #' +
                  '# } #'
      },
      footer: false,
      //navigation function tells the calendar which classes to assign
      navigate:function () {
          $(".true", "#calendar").parent().addClass("parent1days-style k-state-hover");
          $(".false", "#calendar").parent().addClass("parent2days-style k-state-hover");
      }
  }).data("kendoCalendar");
};