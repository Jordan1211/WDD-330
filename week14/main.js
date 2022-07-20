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
  //shows the parent 1input and parent 2 inputs
  console.log(parent1Input);
  // console.log(parent2Input);

  //atempt to interact with calendar and output formatting
  function populateCalendar() {$(document).ready(function () {
    var start = getStartDate(),
      // events = [
      //   +new Date(start.getFullYear(), start.getMonth(), 8),
      //   +new Date(start.getFullYear(), start.getMonth(), 12),
      //   +new Date(start.getFullYear(), start.getMonth(), 24),
      //   +new Date(start.getFullYear(), start.getMonth() + 1, 6),
      //   +new Date(start.getFullYear(), start.getMonth() + 1, 7),
      //   +new Date(start.getFullYear(), start.getMonth() + 1, 25),
      //   +new Date(start.getFullYear(), start.getMonth() + 1, 27),
      //   +new Date(start.getFullYear(), start.getMonth() - 1, 3),
      //   +new Date(start.getFullYear(), start.getMonth() - 1, 5),
      //   +new Date(start.getFullYear(), start.getMonth() - 2, 22),
      //   +new Date(start.getFullYear(), start.getMonth() - 2, 27)
      // ];
      
      
      events = [];
      parent1Input.forEach(function (inputInfo, i) {
        const checked = inputInfo.checked;
        const day = inputInfo.id;
        const order = 0 + i;
        // console.log(start);
        // console.log(order);
        const date = start + order;
        console.log(date);
        const parent1Output = +new Date(start.getFullYear(), start.getMonth(), start.getDate()+ order)+' = "'+checked+'"';
        events.push(parent1Output);
      });

      console.log(events);

    $("#calendar").kendoCalendar({
      value: start,
      dates: events,
      weekNumber: true,
      month: {
        // template for dates in month view
        content: '# if ($.inArray(+data.date, data.dates) != -1) { #' +
          '<div class="' +
          '# if (data.value < 10) { #' +
          "parent1days" +
          '# } else if ( data.value < 20 ) { #' +
          "parent2days" +
          '# } else { #' +
          "cocktail" +
          '# } #' +
          '">#= data.value #</div>' +
          '# } else { #' +
          '#= data.value #' +
          '# } #',
        weekNumber: '<a class="italic">#= data.weekNumber #</a>'
      },
      footer: false
    });
  });
};