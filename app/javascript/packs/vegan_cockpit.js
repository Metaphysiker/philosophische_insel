export function MonthlyReview(container_class, dateRanges, view_id) {
  this.container_class = container_class,
  this.dateRanges = dateRanges,
  this.view_id = view_id,
  this.table_name = this.container_class + "_table",
  this.svg_container = this.container_class + "_svg_container",
  this.date_format_options = {  year: 'numeric', month: 'long' },
  this.generate_report = function() {
    var container_class = this.container_class;
    var table_name = this.table_name;
    var svg_container = this.svg_container;
    var dateRange = this.dateRange;
    var view_id = this.view_id;
    var date_format_options = this.date_format_options;

    return new Promise(function(outer_promise_resolve, outer_promise_reject)
    {
      var data = [];

      $("." + container_class).empty();

      $("." + container_class).append(`
        <h2>Monatliche Übersicht</h2>
        <table class="${table_name} table table-striped">
          <thead>

            <tr class="head_tr">
              <th scope="col">Monat</th>
              <th scope="col">Pageviews</th>
              <th scope="col">unique Pageviews</th>
              <th scope="col">Sessions</th>
              <th scope="col">Users</th>
            </tr>

          </thead>
          <tbody class="tbody">

          </tbody>
        </table>

        <div class="${svg_container}">

        </div>
        `);

    //  $("." + table_name + " .tbody").empty();

      for (let main_index = 0, p = Promise.resolve(); main_index < dateRanges.length; main_index++)
        {
            p = p.then(() => new Promise(function(resolve, reject) {
              gapi.client.request({
                path: '/v4/reports:batchGet',
                root: 'https://analyticsreporting.googleapis.com/',
                method: 'POST',
                body: {
                  reportRequests: [
                    {
                      viewId: view_id,
                      dateRanges: [dateRanges[main_index]],
                      metrics: [
                        {
                          expression: 'ga:pageviews'
                        },
                        {
                          expression: 'ga:uniquePageviews'
                        },
                        {
                          expression: 'ga:sessions'
                        },
                        {
                          expression: 'ga:users'
                        }
                      ]
                    }
                  ]
                }
              }).then(function(response){

                var metrics = response.result.reports[0].data.rows[0].metrics;
                for (var i = 0; i < metrics.length; i++) {
                  var values = metrics[i].values;
                  $("." + table_name + " .tbody").append(`
                  <tr>
                  </tr>
                  `);
                  var date_of_current_row = new Date(dateRanges[main_index].startDate);
                  $("." + table_name + " tr:last").append(`
                    <td>${date_of_current_row.toLocaleDateString('de-DE', date_format_options)}</td>
                  `);

                  for (var inner_i = 0; inner_i < values.length; inner_i++) {
                      $("." + table_name + " tr:last").append(`
                        <td>${values[inner_i]}</td>
                      `);
                  }
                  data.push({name: date_of_current_row.toLocaleDateString('de-DE', {  year: '2-digit', month: 'short' }), value: values[3]});
                }

                resolve("done");
                if(main_index + 1 >= dateRanges.length){

                  var vertical_bar_chart = new d3Charts.VerticalBarChart("." + svg_container, data);
                  vertical_bar_chart.draw_chart();

                  outer_promise_resolve("this report is done");
                  //outer_promise_reject("error");
                }
              }, function(error){
                outer_promise_reject("error");
              })
            } // end of inner promise
        ));
      } // end of for loop
    })
  }
}

export function MonthlyMemberPageReport(container_class, dateRanges, view_id, registrations) {
  this.container_class = container_class,
  this.dateRanges = dateRanges,
  this.view_id = view_id,
  this.registrations = registrations,
  this.table_name = this.container_class + "_table",
  this.svg_container = this.container_class + "_svg_container",
  this.date_format_options = {  year: 'numeric', month: 'long' },
  this.generate_report = function() {
    var container_class = this.container_class;
    var table_name = this.table_name;
    var svg_container = this.svg_container;
    var dateRange = this.dateRange;
    var view_id = this.view_id;
    var date_format_options = this.date_format_options;
    var registrations = this.registrations;

    return new Promise(function(outer_promise_resolve, outer_promise_reject)
    {
      var data = [];

      $("." + container_class).empty();

      $("." + container_class).append(`
        <h2>Monatliche Mitgliedseite-Übersciht</h2>
        <table class="${table_name} table table-striped">
          <thead>

            <tr class="head_tr">
            <th scope="col">Monat</th>
              <th scope="col">Users</th>
            </tr>

          </thead>
          <tbody class="tbody">

          </tbody>
        </table>

        <div class="${svg_container}">

        </div>
        `);

    //  $("." + table_name + " .tbody").empty();

      for (let main_index = 0, p = Promise.resolve(); main_index < dateRanges.length; main_index++)
        {
            p = p.then(() => new Promise(function(resolve, reject) {
              gapi.client.request({
                path: '/v4/reports:batchGet',
                root: 'https://analyticsreporting.googleapis.com/',
                method: 'POST',
                body: {
                  reportRequests: [
                    {
                      viewId: VIEW_ID,
                      dateRanges: [dateRanges[main_index]],
                      metrics: [
                        {
                          expression: 'ga:users'
                        }
                      ],
                      "dimensionFilterClauses": [
                       {
                        "filters": [
                        {
                         "operator": "REGEXP",
                         "dimensionName": "ga:pagePath",
                         "expressions": [
                           "/mitglied-werden"
                          ]
                        }
                        ]
                       }
                      ]
                    }
                  ]
                }
              }).then(function(response){

                var metrics = response.result.reports[0].data.rows[0].metrics;
                for (var i = 0; i < metrics.length; i++) {
                  var values = metrics[i].values;
                  $("." + table_name + " .tbody").append(`
                  <tr>
                  </tr>
                  `);
                  var date_of_current_row = new Date(dateRanges[main_index].startDate);
                  $("." + table_name + " tr:last").append(`
                    <td>${date_of_current_row.toLocaleDateString('de-DE', date_format_options)}</td>
                  `);

                  for (var inner_i = 0; inner_i < values.length; inner_i++) {
                      $("." + table_name + " tr:last").append(`
                        <td>${values[inner_i]}</td>
                      `);
                  }

                  var value2 = 0;

                  var year_month = date_of_current_row.getFullYear() + "-" + ("0" + (date_of_current_row.getMonth() + 1)).slice(-2);
                  let registration_get = registrations.get(year_month);

                  if(registration_get){
                    value2 = registration_get;
                  }

                  $(table_name + " tr:last").append(`
                    <td>${value2}</td>
                  `);


                  data.push({name: date_of_current_row.toLocaleDateString('de-DE', {  year: '2-digit', month: 'short' }), value: values[0], value2: value2});
                }

                resolve("done");
                if(main_index + 1 >= dateRanges.length){

                  var vertical_bar_chart_grouped_two = new d3Charts.VerticalBarChartGroupedTwo("." + svg_container, data);
                  vertical_bar_chart_grouped_two.draw_chart();

                  outer_promise_resolve("this report is done");
                  //outer_promise_reject("error");
                }
              }, function(error){
                outer_promise_reject("error");
              })
            } // end of inner promise
        ));
      } // end of for loop
    })
  }
}
