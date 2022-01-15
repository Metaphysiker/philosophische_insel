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

export function MonthlyMemberPageReview(container_class, dateRanges, view_id, registrations) {
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
        <h2>Monatliche Mitgliedseite-Übersicht</h2>
        <table class="${table_name} table table-striped">
          <thead>

            <tr class="head_tr">
            <th scope="col">Monat</th>
            <th scope="col">Users</th>
            <th scope="col">Neue Mitglieder</th>
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

                  var year_month = "registration-" + date_of_current_row.getFullYear() + "-" + ("0" + (date_of_current_row.getMonth() + 1)).slice(-2);
                  let registration_get = registrations.get(year_month);

                  if(registration_get){
                    value2 = registration_get;
                  }

                  $("." + table_name + " tr:last").append(`
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

export function MonthlyDonationPageReview(container_class, dateRanges, view_id, donations) {
  this.container_class = container_class,
  this.dateRanges = dateRanges,
  this.view_id = view_id,
  this.donations = donations,
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
    var donations = this.donations;

    return new Promise(function(outer_promise_resolve, outer_promise_reject)
    {
      var data = [];

      $("." + container_class).empty();

      $("." + container_class).append(`
        <h2>Monatliche Spendenseite-Übersicht</h2>
        <table class="${table_name} table table-striped">
          <thead>

            <tr class="head_tr">
            <th scope="col">Monat</th>
            <th scope="col">Users</th>
            <th scope="col">Spenden</th>
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
                           "/aktiv-werden/spenden"
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

                  var year_month = "donation-" + date_of_current_row.getFullYear() + "-" + ("0" + (date_of_current_row.getMonth() + 1)).slice(-2);
                  let donation_get = donations.get(year_month);

                  if(donation_get){
                    value2 = donation_get;
                  }

                  $("." + table_name + " tr:last").append(`
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


export function MonthlyMostVisitedPagesReview(container_class, dateRanges, view_id) {
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

      $("." + container_class).empty();

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
                      "metrics":
                      [
                        {"expression": "ga:users"},
                      ],
                      "dimensions":
                      [
                        {"name": "ga:pagePath"}
                      ],
                      "orderBys": [
                        {"fieldName": "ga:users", "sortOrder": "DESCENDING"},
                      ]


                    }
                  ]
                }
              }).then(function(response){

                var table_name_with_index = table_name + "_" + main_index;

                var date_of_current_row = new Date(dateRanges[main_index].startDate);

                var rows = response.result.reports[0].data.rows;

                var data_for_chart = [];

                for (var rows_index = 0; rows_index < 11; rows_index++){
                  data_for_chart.push({name: rows[rows_index].dimensions[0], value: rows[rows_index].metrics[0].values[0]});
                }




                $("." + container_class).append(`
                <h2>${date_of_current_row.toLocaleDateString('de-DE', date_format_options)}</h2>
                <table class="table ${table_name_with_index}">
                  <tbody class="tbody">

                  </tbody>
                </table>
                `);


                for (var rows_index = 0; rows_index < 11; rows_index++){
                  $("." + table_name_with_index + " .tbody").append(`
                  <tr>

                  </tr>
                  `);

                  $("." + table_name_with_index + " tr:last").append(`
                    <td>${rows[rows_index].dimensions[0]}</td>
                    <td>
                      ${rows[rows_index].metrics[0].values[0]}
                    </td>
                  `);
                }

                $("." + container_class).append(`
                <div class="horizontal_bar_chart_name_${table_name_with_index}">

                </div>
                `);

                var horizontal_bar_chart = new d3Charts.HorizontalBarChart(".horizontal_bar_chart_name_" + table_name_with_index, data_for_chart);
                horizontal_bar_chart.draw_chart();


                resolve("done");
                if(main_index + 1 >= dateRanges.length){
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

export function MonthlySinglePageReview(container_class, dateRanges, view_id, page_name) {
  this.container_class = container_class,
  this.dateRanges = dateRanges,
  this.view_id = view_id,
  this.page_name = page_name,
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
    var page_name = this.page_name;

    return new Promise(function(outer_promise_resolve, outer_promise_reject)
    {
      var data = [];

      $("." + container_class).empty();

      $("." + container_class).append(`
        <h2>Monatliche Übersicht für "${page_name}"</h2>
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
                      ],
                      "dimensionFilterClauses": [
                       {
                        "filters": [
                        {
                         "operator": "EXACT",
                         "dimensionName": "ga:pagePath",
                         "expressions": [
                           page_name
                          ]
                        }
                        ]
                       }
                      ]
                    }
                  ]
                }
              }).then(function(response){

                var metrics = [];
                if(typeof response.result.reports[0].data.rows !== 'undefined'){
                  metrics = response.result.reports[0].data.rows[0].metrics;
                }

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

                  var vertical_bar_chart_grouped_two = new d3Charts.VerticalBarChart("." + svg_container, data);
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

export function MonthlySourceForSinglePageReview(container_class, dateRanges, view_id, page_name) {
  this.container_class = container_class,
  this.dateRanges = dateRanges,
  this.view_id = view_id,
  this.page_name = page_name,
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
    var page_name = this.page_name;

    return new Promise(function(outer_promise_resolve, outer_promise_reject)
    {
      var data = [];

      $("." + container_class).empty();

      $("." + container_class).append(`
        <h2>Monatliche Quellen-Übersicht für "${page_name}"</h2>

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
                      dimensions: [
                        {
                          name: "ga:source"
                        }
                      ],
                      metrics: [
                        {
                          expression: 'ga:users'
                        }
                      ],
                      "dimensionFilterClauses": [
                       {
                        "filters": [
                        {
                         "operator": "EXACT",
                         "dimensionName": "ga:pagePath",
                         "expressions": [
                           page_name
                          ]
                        }
                        ]
                       }
                     ],
                     "orderBys": [
                       {"fieldName": "ga:users", "sortOrder": "DESCENDING"},
                     ]
                    }
                  ]
                }
              }).then(function(response){
                var data_of_sources = [];
                var rows = response.result.reports[0].data.rows;

                for (var i = 0; i < 15; i++) {
                  var result_hash = {
                    name: rows[i].dimensions[0],
                    value: rows[i].metrics[0].values[0]
                  };
                  data_of_sources.push(result_hash);
                }

                $("." + container_class).append(`
                  <div class="${container_class + "_" + "svg_container_" + main_index}">

                  </div>
                  `);

                  var horizontal_bar_chart = new d3Charts.HorizontalBarChart("." + container_class + "_" + "svg_container_" + main_index, data_of_sources);
                  horizontal_bar_chart.draw_chart();

                resolve("done");
                if(main_index + 1 >= dateRanges.length){

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

export function SourceForSinglePageReview(container_class, dateRanges, view_id, page_name) {
  this.container_class = container_class,
  this.dateRanges = dateRanges,
  this.view_id = view_id,
  this.page_name = page_name,
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
    var page_name = this.page_name;

    return new Promise(function(outer_promise_resolve, outer_promise_reject)
    {
      var data = [];

      $("." + container_class).empty();

      $("." + container_class).append(`
        <h2>Quellen-Übersicht für "${page_name}"</h2>

        <div class="${svg_container}">

        </div>
        `);

    //  $("." + table_name + " .tbody").empty();

              gapi.client.request({
                path: '/v4/reports:batchGet',
                root: 'https://analyticsreporting.googleapis.com/',
                method: 'POST',
                body: {
                  reportRequests: [
                    {
                      viewId: view_id,
                      dateRanges: [{startDate: dateRanges[0].startDate, endDate: dateRanges[dateRanges.length -1].endDate }],
                      dimensions: [
                        {
                          name: "ga:source"
                        }
                      ],
                      metrics: [
                        {
                          expression: 'ga:users'
                        }
                      ],
                      "dimensionFilterClauses": [
                       {
                        "filters": [
                        {
                         "operator": "EXACT",
                         "dimensionName": "ga:pagePath",
                         "expressions": [
                           page_name
                          ]
                        }
                        ]
                       }
                     ],
                     "orderBys": [
                       {"fieldName": "ga:users", "sortOrder": "DESCENDING"},
                     ]
                    }
                  ]
                }
              }).then(function(response){
                var data_of_sources = [];
                var rows = [];
                if(typeof response.result.reports[0].data.rows !== "undefined"){
                  rows = response.result.reports[0].data.rows;
                }

                for (var i = 0; i < 15; i++) {
                  var row_dimension = i;
                  if((typeof rows[i] !== "undefined") && (typeof rows[i].dimensions[0] !== "undefined")){
                    row_dimension = rows[i].dimensions[0];
                  }

                  var row_value = 0;
                  if((typeof rows[i] !== "undefined") && (typeof rows[i].metrics[0].values[0] !== "undefined")){
                    row_value = rows[i].metrics[0].values[0];
                  }

                  var result_hash = {
                    name: row_dimension,
                    value: row_value
                  };
                  data_of_sources.push(result_hash);
                }

                $("." + container_class).append(`
                  <div class="${container_class + "_" + "svg_container"}">

                  </div>
                  `);

                  var horizontal_bar_chart = new d3Charts.HorizontalBarChart("." + container_class + "_" + "svg_container", data_of_sources);
                  horizontal_bar_chart.draw_chart();

                outer_promise_resolve("done");

              }, function(error){
                outer_promise_reject("error");
              })


    })
  }
}

export function MonthlyRegexpPageReview(container_class, dateRanges, view_id, page_name) {
  this.container_class = container_class,
  this.dateRanges = dateRanges,
  this.view_id = view_id,
  this.page_name = page_name,
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
    var page_name = this.page_name;

    return new Promise(function(outer_promise_resolve, outer_promise_reject)
    {
      var data = [];

      $("." + container_class).empty();

      $("." + container_class).append(`
        <h2>Monatliche Übersicht für alle Seiten mit "${page_name}"</h2>
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
                      ],
                      "dimensionFilterClauses": [
                       {
                        "filters": [
                        {
                         "operator": "REGEXP",
                         "dimensionName": "ga:pagePath",
                         "expressions": [
                           page_name
                          ]
                        }
                        ]
                       }
                      ]
                    }
                  ]
                }
              }).then(function(response){

                var metrics = [];
                if(typeof response.result.reports[0].data.rows !== 'undefined'){
                  metrics = response.result.reports[0].data.rows[0].metrics;
                }
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

                  var vertical_bar_chart_grouped_two = new d3Charts.VerticalBarChart("." + svg_container, data);
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

export function SourceForRegexpPageReview(container_class, dateRanges, view_id, page_name) {
  this.container_class = container_class,
  this.dateRanges = dateRanges,
  this.view_id = view_id,
  this.page_name = page_name,
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
    var page_name = this.page_name;

    return new Promise(function(outer_promise_resolve, outer_promise_reject)
    {
      var data = [];

      $("." + container_class).empty();

      $("." + container_class).append(`
        <h2>Quellen-Übersicht für alle Seiten mit "${page_name}"</h2>

        <div class="${svg_container}">

        </div>
        `);

    //  $("." + table_name + " .tbody").empty();

              gapi.client.request({
                path: '/v4/reports:batchGet',
                root: 'https://analyticsreporting.googleapis.com/',
                method: 'POST',
                body: {
                  reportRequests: [
                    {
                      viewId: view_id,
                      dateRanges: [{startDate: dateRanges[0].startDate, endDate: dateRanges[dateRanges.length -1].endDate }],
                      dimensions: [
                        {
                          name: "ga:source"
                        }
                      ],
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
                           page_name
                          ]
                        }
                        ]
                       }
                     ],
                     "orderBys": [
                       {"fieldName": "ga:users", "sortOrder": "DESCENDING"},
                     ]
                    }
                  ]
                }
              }).then(function(response){
                var data_of_sources = [];
                var rows = response.result.reports[0].data.rows;

                for (var i = 0; i < 15; i++) {
                  var result_hash = {
                    name: rows[i].dimensions[0],
                    value: rows[i].metrics[0].values[0]
                  };
                  data_of_sources.push(result_hash);
                }

                $("." + container_class).append(`
                  <div class="${container_class + "_" + "svg_container"}">

                  </div>
                  `);

                  var horizontal_bar_chart = new d3Charts.HorizontalBarChart("." + container_class + "_" + "svg_container", data_of_sources);
                  horizontal_bar_chart.draw_chart();


                  $("." + container_class).append(`
                    <div class="${container_class + "_" + "svg_container_donut"}">

                    </div>
                    `);

                  var donut_chart = new d3Charts.DonutChart("." + container_class + "_" + "svg_container_donut", data_of_sources);
                  donut_chart.draw_chart();

                outer_promise_resolve("done");

              }, function(error){
                outer_promise_reject("error");
              })


    })
  }
}
