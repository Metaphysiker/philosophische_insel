(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./app/javascript/packs/vegan_cockpit.js":
/*!***********************************************!*\
  !*** ./app/javascript/packs/vegan_cockpit.js ***!
  \***********************************************/
/*! exports provided: MonthlyReview, MonthlyMemberPageReview, MonthlyDonationPageReview, MonthlyMostVisitedPagesReview, MonthlySinglePageReview, MonthlySourceForSinglePageReview, SourceForSinglePageReview, MonthlyRegexpPageReview, SourceForRegexpPageReview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonthlyReview", function() { return MonthlyReview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonthlyMemberPageReview", function() { return MonthlyMemberPageReview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonthlyDonationPageReview", function() { return MonthlyDonationPageReview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonthlyMostVisitedPagesReview", function() { return MonthlyMostVisitedPagesReview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonthlySinglePageReview", function() { return MonthlySinglePageReview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonthlySourceForSinglePageReview", function() { return MonthlySourceForSinglePageReview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourceForSinglePageReview", function() { return SourceForSinglePageReview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonthlyRegexpPageReview", function() { return MonthlyRegexpPageReview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourceForRegexpPageReview", function() { return SourceForRegexpPageReview; });
function MonthlyReview(container_class, dateRanges, view_id) {
  this.container_class = container_class, this.dateRanges = dateRanges, this.view_id = view_id, this.table_name = this.container_class + "_table", this.svg_container = this.container_class + "_svg_container", this.date_format_options = {
    year: 'numeric',
    month: 'long'
  }, this.generate_report = function () {
    var container_class = this.container_class;
    var table_name = this.table_name;
    var svg_container = this.svg_container;
    var dateRange = this.dateRange;
    var view_id = this.view_id;
    var date_format_options = this.date_format_options;
    return new Promise(function (outer_promise_resolve, outer_promise_reject) {
      var data = [];
      $("." + container_class).empty();
      $("." + container_class).append("\n        <h2>Monatliche \xDCbersicht</h2>\n        <table class=\"".concat(table_name, " table table-striped\">\n          <thead>\n\n            <tr class=\"head_tr\">\n              <th scope=\"col\">Monat</th>\n              <th scope=\"col\">Pageviews</th>\n              <th scope=\"col\">unique Pageviews</th>\n              <th scope=\"col\">Sessions</th>\n              <th scope=\"col\">Users</th>\n            </tr>\n\n          </thead>\n          <tbody class=\"tbody\">\n\n          </tbody>\n        </table>\n\n        <div class=\"").concat(svg_container, "\">\n\n        </div>\n        ")); //  $("." + table_name + " .tbody").empty();

      var _loop = function _loop(main_index, _p) {
        _p = _p.then(function () {
          return new Promise(function (resolve, reject) {
            gapi.client.request({
              path: '/v4/reports:batchGet',
              root: 'https://analyticsreporting.googleapis.com/',
              method: 'POST',
              body: {
                reportRequests: [{
                  viewId: view_id,
                  dateRanges: [dateRanges[main_index]],
                  metrics: [{
                    expression: 'ga:pageviews'
                  }, {
                    expression: 'ga:uniquePageviews'
                  }, {
                    expression: 'ga:sessions'
                  }, {
                    expression: 'ga:users'
                  }]
                }]
              }
            }).then(function (response) {
              var metrics = response.result.reports[0].data.rows[0].metrics;

              for (var i = 0; i < metrics.length; i++) {
                var values = metrics[i].values;
                $("." + table_name + " .tbody").append("\n                  <tr>\n                  </tr>\n                  ");
                var date_of_current_row = new Date(dateRanges[main_index].startDate);
                $("." + table_name + " tr:last").append("\n                    <td>".concat(date_of_current_row.toLocaleDateString('de-DE', date_format_options), "</td>\n                  "));

                for (var inner_i = 0; inner_i < values.length; inner_i++) {
                  $("." + table_name + " tr:last").append("\n                        <td>".concat(values[inner_i], "</td>\n                      "));
                }

                data.push({
                  name: date_of_current_row.toLocaleDateString('de-DE', {
                    year: '2-digit',
                    month: 'short'
                  }),
                  value: values[3]
                });
              }

              resolve("done");

              if (main_index + 1 >= dateRanges.length) {
                var vertical_bar_chart = new d3Charts.VerticalBarChart("." + svg_container, data);
                vertical_bar_chart.draw_chart();
                outer_promise_resolve("this report is done"); //outer_promise_reject("error");
              }
            }, function (error) {
              outer_promise_reject("error");
            });
          } // end of inner promise
          );
        });
        p = _p;
      };

      for (var main_index = 0, p = Promise.resolve(); main_index < dateRanges.length; main_index++) {
        _loop(main_index, p);
      } // end of for loop

    });
  };
}
function MonthlyMemberPageReview(container_class, dateRanges, view_id, registrations) {
  this.container_class = container_class, this.dateRanges = dateRanges, this.view_id = view_id, this.registrations = registrations, this.table_name = this.container_class + "_table", this.svg_container = this.container_class + "_svg_container", this.date_format_options = {
    year: 'numeric',
    month: 'long'
  }, this.generate_report = function () {
    var container_class = this.container_class;
    var table_name = this.table_name;
    var svg_container = this.svg_container;
    var dateRange = this.dateRange;
    var view_id = this.view_id;
    var date_format_options = this.date_format_options;
    var registrations = this.registrations;
    return new Promise(function (outer_promise_resolve, outer_promise_reject) {
      var data = [];
      $("." + container_class).empty();
      $("." + container_class).append("\n        <h2>Monatliche Mitgliedseite-\xDCbersicht</h2>\n        <table class=\"".concat(table_name, " table table-striped\">\n          <thead>\n\n            <tr class=\"head_tr\">\n            <th scope=\"col\">Monat</th>\n            <th scope=\"col\">Users</th>\n            <th scope=\"col\">Neue Mitglieder</th>\n            </tr>\n\n          </thead>\n          <tbody class=\"tbody\">\n\n          </tbody>\n        </table>\n\n        <div class=\"").concat(svg_container, "\">\n\n        </div>\n        ")); //  $("." + table_name + " .tbody").empty();

      var _loop2 = function _loop2(main_index, _p3) {
        _p3 = _p3.then(function () {
          return new Promise(function (resolve, reject) {
            gapi.client.request({
              path: '/v4/reports:batchGet',
              root: 'https://analyticsreporting.googleapis.com/',
              method: 'POST',
              body: {
                reportRequests: [{
                  viewId: view_id,
                  dateRanges: [dateRanges[main_index]],
                  metrics: [{
                    expression: 'ga:users'
                  }],
                  "dimensionFilterClauses": [{
                    "filters": [{
                      "operator": "REGEXP",
                      "dimensionName": "ga:pagePath",
                      "expressions": ["/mitglied-werden"]
                    }]
                  }]
                }]
              }
            }).then(function (response) {
              var metrics = response.result.reports[0].data.rows[0].metrics;

              for (var i = 0; i < metrics.length; i++) {
                var values = metrics[i].values;
                $("." + table_name + " .tbody").append("\n                  <tr>\n                  </tr>\n                  ");
                var date_of_current_row = new Date(dateRanges[main_index].startDate);
                $("." + table_name + " tr:last").append("\n                    <td>".concat(date_of_current_row.toLocaleDateString('de-DE', date_format_options), "</td>\n                  "));

                for (var inner_i = 0; inner_i < values.length; inner_i++) {
                  $("." + table_name + " tr:last").append("\n                        <td>".concat(values[inner_i], "</td>\n                      "));
                }

                var value2 = 0;
                var year_month = "registration-" + date_of_current_row.getFullYear() + "-" + ("0" + (date_of_current_row.getMonth() + 1)).slice(-2);
                var registration_get = registrations.get(year_month);

                if (registration_get) {
                  value2 = registration_get;
                }

                $("." + table_name + " tr:last").append("\n                    <td>".concat(value2, "</td>\n                  "));
                data.push({
                  name: date_of_current_row.toLocaleDateString('de-DE', {
                    year: '2-digit',
                    month: 'short'
                  }),
                  value: values[0],
                  value2: value2
                });
              }

              resolve("done");

              if (main_index + 1 >= dateRanges.length) {
                var vertical_bar_chart_grouped_two = new d3Charts.VerticalBarChartGroupedTwo("." + svg_container, data);
                vertical_bar_chart_grouped_two.draw_chart();
                outer_promise_resolve("this report is done"); //outer_promise_reject("error");
              }
            }, function (error) {
              outer_promise_reject("error");
            });
          } // end of inner promise
          );
        });
        _p2 = _p3;
      };

      for (var main_index = 0, _p2 = Promise.resolve(); main_index < dateRanges.length; main_index++) {
        _loop2(main_index, _p2);
      } // end of for loop

    });
  };
}
function MonthlyDonationPageReview(container_class, dateRanges, view_id, donations) {
  this.container_class = container_class, this.dateRanges = dateRanges, this.view_id = view_id, this.donations = donations, this.table_name = this.container_class + "_table", this.svg_container = this.container_class + "_svg_container", this.date_format_options = {
    year: 'numeric',
    month: 'long'
  }, this.generate_report = function () {
    var container_class = this.container_class;
    var table_name = this.table_name;
    var svg_container = this.svg_container;
    var dateRange = this.dateRange;
    var view_id = this.view_id;
    var date_format_options = this.date_format_options;
    var donations = this.donations;
    return new Promise(function (outer_promise_resolve, outer_promise_reject) {
      var data = [];
      $("." + container_class).empty();
      $("." + container_class).append("\n        <h2>Monatliche Spendenseite-\xDCbersicht</h2>\n        <table class=\"".concat(table_name, " table table-striped\">\n          <thead>\n\n            <tr class=\"head_tr\">\n            <th scope=\"col\">Monat</th>\n            <th scope=\"col\">Users</th>\n            <th scope=\"col\">Spenden</th>\n            </tr>\n\n          </thead>\n          <tbody class=\"tbody\">\n\n          </tbody>\n        </table>\n\n        <div class=\"").concat(svg_container, "\">\n\n        </div>\n        ")); //  $("." + table_name + " .tbody").empty();

      var _loop3 = function _loop3(main_index, _p5) {
        _p5 = _p5.then(function () {
          return new Promise(function (resolve, reject) {
            gapi.client.request({
              path: '/v4/reports:batchGet',
              root: 'https://analyticsreporting.googleapis.com/',
              method: 'POST',
              body: {
                reportRequests: [{
                  viewId: view_id,
                  dateRanges: [dateRanges[main_index]],
                  metrics: [{
                    expression: 'ga:users'
                  }],
                  "dimensionFilterClauses": [{
                    "filters": [{
                      "operator": "REGEXP",
                      "dimensionName": "ga:pagePath",
                      "expressions": ["/aktiv-werden/spenden"]
                    }]
                  }]
                }]
              }
            }).then(function (response) {
              var metrics = response.result.reports[0].data.rows[0].metrics;

              for (var i = 0; i < metrics.length; i++) {
                var values = metrics[i].values;
                $("." + table_name + " .tbody").append("\n                  <tr>\n                  </tr>\n                  ");
                var date_of_current_row = new Date(dateRanges[main_index].startDate);
                $("." + table_name + " tr:last").append("\n                    <td>".concat(date_of_current_row.toLocaleDateString('de-DE', date_format_options), "</td>\n                  "));

                for (var inner_i = 0; inner_i < values.length; inner_i++) {
                  $("." + table_name + " tr:last").append("\n                        <td>".concat(values[inner_i], "</td>\n                      "));
                }

                var value2 = 0;
                var year_month = "donation-" + date_of_current_row.getFullYear() + "-" + ("0" + (date_of_current_row.getMonth() + 1)).slice(-2);
                var donation_get = donations.get(year_month);

                if (donation_get) {
                  value2 = donation_get;
                }

                $("." + table_name + " tr:last").append("\n                    <td>".concat(value2, "</td>\n                  "));
                data.push({
                  name: date_of_current_row.toLocaleDateString('de-DE', {
                    year: '2-digit',
                    month: 'short'
                  }),
                  value: values[0],
                  value2: value2
                });
              }

              resolve("done");

              if (main_index + 1 >= dateRanges.length) {
                var vertical_bar_chart_grouped_two = new d3Charts.VerticalBarChartGroupedTwo("." + svg_container, data);
                vertical_bar_chart_grouped_two.draw_chart();
                outer_promise_resolve("this report is done"); //outer_promise_reject("error");
              }
            }, function (error) {
              outer_promise_reject("error");
            });
          } // end of inner promise
          );
        });
        _p4 = _p5;
      };

      for (var main_index = 0, _p4 = Promise.resolve(); main_index < dateRanges.length; main_index++) {
        _loop3(main_index, _p4);
      } // end of for loop

    });
  };
}
function MonthlyMostVisitedPagesReview(container_class, dateRanges, view_id) {
  this.container_class = container_class, this.dateRanges = dateRanges, this.view_id = view_id, this.table_name = this.container_class + "_table", this.svg_container = this.container_class + "_svg_container", this.date_format_options = {
    year: 'numeric',
    month: 'long'
  }, this.generate_report = function () {
    var container_class = this.container_class;
    var table_name = this.table_name;
    var svg_container = this.svg_container;
    var dateRange = this.dateRange;
    var view_id = this.view_id;
    var date_format_options = this.date_format_options;
    return new Promise(function (outer_promise_resolve, outer_promise_reject) {
      $("." + container_class).empty();

      var _loop4 = function _loop4(main_index, _p7) {
        _p7 = _p7.then(function () {
          return new Promise(function (resolve, reject) {
            gapi.client.request({
              path: '/v4/reports:batchGet',
              root: 'https://analyticsreporting.googleapis.com/',
              method: 'POST',
              body: {
                reportRequests: [{
                  viewId: view_id,
                  dateRanges: [dateRanges[main_index]],
                  "metrics": [{
                    "expression": "ga:users"
                  }],
                  "dimensions": [{
                    "name": "ga:pagePath"
                  }],
                  "orderBys": [{
                    "fieldName": "ga:users",
                    "sortOrder": "DESCENDING"
                  }]
                }]
              }
            }).then(function (response) {
              var table_name_with_index = table_name + "_" + main_index;
              var date_of_current_row = new Date(dateRanges[main_index].startDate);
              var rows = response.result.reports[0].data.rows;
              var data_for_chart = [];

              for (var rows_index = 0; rows_index < 11; rows_index++) {
                data_for_chart.push({
                  name: rows[rows_index].dimensions[0],
                  value: rows[rows_index].metrics[0].values[0]
                });
              }

              $("." + container_class).append("\n                <h2>".concat(date_of_current_row.toLocaleDateString('de-DE', date_format_options), "</h2>\n                <table class=\"table ").concat(table_name_with_index, "\">\n                  <tbody class=\"tbody\">\n\n                  </tbody>\n                </table>\n                "));

              for (var rows_index = 0; rows_index < 11; rows_index++) {
                $("." + table_name_with_index + " .tbody").append("\n                  <tr>\n\n                  </tr>\n                  ");
                $("." + table_name_with_index + " tr:last").append("\n                    <td>".concat(rows[rows_index].dimensions[0], "</td>\n                    <td>\n                      ").concat(rows[rows_index].metrics[0].values[0], "\n                    </td>\n                  "));
              }

              $("." + container_class).append("\n                <div class=\"horizontal_bar_chart_name_".concat(table_name_with_index, "\">\n\n                </div>\n                "));
              var horizontal_bar_chart = new d3Charts.HorizontalBarChart(".horizontal_bar_chart_name_" + table_name_with_index, data_for_chart);
              horizontal_bar_chart.draw_chart();
              resolve("done");

              if (main_index + 1 >= dateRanges.length) {
                outer_promise_resolve("this report is done"); //outer_promise_reject("error");
              }
            }, function (error) {
              outer_promise_reject("error");
            });
          } // end of inner promise
          );
        });
        _p6 = _p7;
      };

      for (var main_index = 0, _p6 = Promise.resolve(); main_index < dateRanges.length; main_index++) {
        _loop4(main_index, _p6);
      } // end of for loop

    });
  };
}
function MonthlySinglePageReview(container_class, dateRanges, view_id, page_name) {
  this.container_class = container_class, this.dateRanges = dateRanges, this.view_id = view_id, this.page_name = page_name, this.table_name = this.container_class + "_table", this.svg_container = this.container_class + "_svg_container", this.date_format_options = {
    year: 'numeric',
    month: 'long'
  }, this.generate_report = function () {
    var container_class = this.container_class;
    var table_name = this.table_name;
    var svg_container = this.svg_container;
    var dateRange = this.dateRange;
    var view_id = this.view_id;
    var date_format_options = this.date_format_options;
    var page_name = this.page_name;
    return new Promise(function (outer_promise_resolve, outer_promise_reject) {
      var data = [];
      $("." + container_class).empty();
      $("." + container_class).append("\n        <h2>Monatliche \xDCbersicht f\xFCr \"".concat(page_name, "\"</h2>\n        <table class=\"").concat(table_name, " table table-striped\">\n          <thead>\n\n            <tr class=\"head_tr\">\n              <th scope=\"col\">Monat</th>\n              <th scope=\"col\">Pageviews</th>\n              <th scope=\"col\">unique Pageviews</th>\n              <th scope=\"col\">Sessions</th>\n              <th scope=\"col\">Users</th>\n            </tr>\n\n          </thead>\n          <tbody class=\"tbody\">\n\n          </tbody>\n        </table>\n\n        <div class=\"").concat(svg_container, "\">\n\n        </div>\n        ")); //  $("." + table_name + " .tbody").empty();

      var _loop5 = function _loop5(main_index, _p9) {
        _p9 = _p9.then(function () {
          return new Promise(function (resolve, reject) {
            gapi.client.request({
              path: '/v4/reports:batchGet',
              root: 'https://analyticsreporting.googleapis.com/',
              method: 'POST',
              body: {
                reportRequests: [{
                  viewId: view_id,
                  dateRanges: [dateRanges[main_index]],
                  metrics: [{
                    expression: 'ga:pageviews'
                  }, {
                    expression: 'ga:uniquePageviews'
                  }, {
                    expression: 'ga:sessions'
                  }, {
                    expression: 'ga:users'
                  }],
                  "dimensionFilterClauses": [{
                    "filters": [{
                      "operator": "EXACT",
                      "dimensionName": "ga:pagePath",
                      "expressions": [page_name]
                    }]
                  }]
                }]
              }
            }).then(function (response) {
              var metrics = [];

              if (typeof response.result.reports[0].data.rows !== 'undefined') {
                metrics = response.result.reports[0].data.rows[0].metrics;
              }

              for (var i = 0; i < metrics.length; i++) {
                var values = metrics[i].values;
                $("." + table_name + " .tbody").append("\n                  <tr>\n                  </tr>\n                  ");
                var date_of_current_row = new Date(dateRanges[main_index].startDate);
                $("." + table_name + " tr:last").append("\n                    <td>".concat(date_of_current_row.toLocaleDateString('de-DE', date_format_options), "</td>\n                  "));

                for (var inner_i = 0; inner_i < values.length; inner_i++) {
                  $("." + table_name + " tr:last").append("\n                        <td>".concat(values[inner_i], "</td>\n                      "));
                }

                data.push({
                  name: date_of_current_row.toLocaleDateString('de-DE', {
                    year: '2-digit',
                    month: 'short'
                  }),
                  value: values[3]
                });
              }

              resolve("done");

              if (main_index + 1 >= dateRanges.length) {
                var vertical_bar_chart_grouped_two = new d3Charts.VerticalBarChart("." + svg_container, data);
                vertical_bar_chart_grouped_two.draw_chart();
                outer_promise_resolve("this report is done"); //outer_promise_reject("error");
              }
            }, function (error) {
              outer_promise_reject("error");
            });
          } // end of inner promise
          );
        });
        _p8 = _p9;
      };

      for (var main_index = 0, _p8 = Promise.resolve(); main_index < dateRanges.length; main_index++) {
        _loop5(main_index, _p8);
      } // end of for loop

    });
  };
}
function MonthlySourceForSinglePageReview(container_class, dateRanges, view_id, page_name) {
  this.container_class = container_class, this.dateRanges = dateRanges, this.view_id = view_id, this.page_name = page_name, this.table_name = this.container_class + "_table", this.svg_container = this.container_class + "_svg_container", this.date_format_options = {
    year: 'numeric',
    month: 'long'
  }, this.generate_report = function () {
    var container_class = this.container_class;
    var table_name = this.table_name;
    var svg_container = this.svg_container;
    var dateRange = this.dateRange;
    var view_id = this.view_id;
    var date_format_options = this.date_format_options;
    var page_name = this.page_name;
    return new Promise(function (outer_promise_resolve, outer_promise_reject) {
      var data = [];
      $("." + container_class).empty();
      $("." + container_class).append("\n        <h2>Monatliche Quellen-\xDCbersicht f\xFCr \"".concat(page_name, "\"</h2>\n\n        <table class=\"").concat(table_name, " table table-striped\">\n          <thead>\n\n            <tr class=\"head_tr\">\n              <th scope=\"col\">Monat</th>\n              <th scope=\"col\">Pageviews</th>\n              <th scope=\"col\">unique Pageviews</th>\n              <th scope=\"col\">Sessions</th>\n              <th scope=\"col\">Users</th>\n            </tr>\n\n          </thead>\n          <tbody class=\"tbody\">\n\n          </tbody>\n        </table>\n\n        <div class=\"").concat(svg_container, "\">\n\n        </div>\n        ")); //  $("." + table_name + " .tbody").empty();

      var _loop6 = function _loop6(main_index, _p11) {
        _p11 = _p11.then(function () {
          return new Promise(function (resolve, reject) {
            gapi.client.request({
              path: '/v4/reports:batchGet',
              root: 'https://analyticsreporting.googleapis.com/',
              method: 'POST',
              body: {
                reportRequests: [{
                  viewId: view_id,
                  dateRanges: [dateRanges[main_index]],
                  dimensions: [{
                    name: "ga:source"
                  }],
                  metrics: [{
                    expression: 'ga:users'
                  }],
                  "dimensionFilterClauses": [{
                    "filters": [{
                      "operator": "EXACT",
                      "dimensionName": "ga:pagePath",
                      "expressions": [page_name]
                    }]
                  }],
                  "orderBys": [{
                    "fieldName": "ga:users",
                    "sortOrder": "DESCENDING"
                  }]
                }]
              }
            }).then(function (response) {
              var data_of_sources = [];
              var rows = response.result.reports[0].data.rows;

              for (var i = 0; i < 15; i++) {
                var result_hash = {
                  name: rows[i].dimensions[0],
                  value: rows[i].metrics[0].values[0]
                };
                data_of_sources.push(result_hash);
              }

              $("." + container_class).append("\n                  <div class=\"".concat(container_class + "_" + "svg_container_" + main_index, "\">\n\n                  </div>\n                  "));
              var horizontal_bar_chart = new d3Charts.HorizontalBarChart("." + container_class + "_" + "svg_container_" + main_index, data_of_sources);
              horizontal_bar_chart.draw_chart();
              resolve("done");

              if (main_index + 1 >= dateRanges.length) {
                outer_promise_resolve("this report is done"); //outer_promise_reject("error");
              }
            }, function (error) {
              outer_promise_reject("error");
            });
          } // end of inner promise
          );
        });
        _p10 = _p11;
      };

      for (var main_index = 0, _p10 = Promise.resolve(); main_index < dateRanges.length; main_index++) {
        _loop6(main_index, _p10);
      } // end of for loop

    });
  };
}
function SourceForSinglePageReview(container_class, dateRanges, view_id, page_name) {
  this.container_class = container_class, this.dateRanges = dateRanges, this.view_id = view_id, this.page_name = page_name, this.table_name = this.container_class + "_table", this.svg_container = this.container_class + "_svg_container", this.date_format_options = {
    year: 'numeric',
    month: 'long'
  }, this.generate_report = function () {
    var container_class = this.container_class;
    var table_name = this.table_name;
    var svg_container = this.svg_container;
    var dateRange = this.dateRange;
    var view_id = this.view_id;
    var date_format_options = this.date_format_options;
    var page_name = this.page_name;
    return new Promise(function (outer_promise_resolve, outer_promise_reject) {
      var data = [];
      $("." + container_class).empty();
      $("." + container_class).append("\n        <h2>Quellen-\xDCbersicht f\xFCr \"".concat(page_name, "\"</h2>\n\n        <div class=\"").concat(svg_container, "\">\n\n        </div>\n        ")); //  $("." + table_name + " .tbody").empty();

      gapi.client.request({
        path: '/v4/reports:batchGet',
        root: 'https://analyticsreporting.googleapis.com/',
        method: 'POST',
        body: {
          reportRequests: [{
            viewId: view_id,
            dateRanges: [{
              startDate: dateRanges[0].startDate,
              endDate: dateRanges[dateRanges.length - 1].endDate
            }],
            dimensions: [{
              name: "ga:source"
            }],
            metrics: [{
              expression: 'ga:users'
            }],
            "dimensionFilterClauses": [{
              "filters": [{
                "operator": "EXACT",
                "dimensionName": "ga:pagePath",
                "expressions": [page_name]
              }]
            }],
            "orderBys": [{
              "fieldName": "ga:users",
              "sortOrder": "DESCENDING"
            }]
          }]
        }
      }).then(function (response) {
        var data_of_sources = [];
        var rows = [];

        if (typeof response.result.reports[0].data.rows !== "undefined") {
          rows = response.result.reports[0].data.rows;
        }

        for (var i = 0; i < 15; i++) {
          var row_dimension = i;

          if (typeof rows[i] !== "undefined" && typeof rows[i].dimensions[0] !== "undefined") {
            row_dimension = rows[i].dimensions[0];
          }

          var row_value = 0;

          if (typeof rows[i] !== "undefined" && typeof rows[i].metrics[0].values[0] !== "undefined") {
            row_value = rows[i].metrics[0].values[0];
          }

          var result_hash = {
            name: row_dimension,
            value: row_value
          };
          data_of_sources.push(result_hash);
        }

        $("." + container_class).append("\n                  <div class=\"".concat(container_class + "_" + "svg_container", "\">\n\n                  </div>\n                  "));
        var horizontal_bar_chart = new d3Charts.HorizontalBarChart("." + container_class + "_" + "svg_container", data_of_sources);
        horizontal_bar_chart.draw_chart();
        $("." + container_class).append("\n                    <div class=\"".concat(container_class + "_" + "svg_container_donut", "\">\n\n                    </div>\n                    "));
        var donut_chart = new d3Charts.DonutChart("." + container_class + "_" + "svg_container_donut", data_of_sources);
        donut_chart.draw_chart();
        outer_promise_resolve("done");
      }, function (error) {
        outer_promise_reject("error");
      });
    });
  };
}
function MonthlyRegexpPageReview(container_class, dateRanges, view_id, page_name) {
  this.container_class = container_class, this.dateRanges = dateRanges, this.view_id = view_id, this.page_name = page_name, this.table_name = this.container_class + "_table", this.svg_container = this.container_class + "_svg_container", this.date_format_options = {
    year: 'numeric',
    month: 'long'
  }, this.generate_report = function () {
    var container_class = this.container_class;
    var table_name = this.table_name;
    var svg_container = this.svg_container;
    var dateRange = this.dateRange;
    var view_id = this.view_id;
    var date_format_options = this.date_format_options;
    var page_name = this.page_name;
    return new Promise(function (outer_promise_resolve, outer_promise_reject) {
      var data = [];
      $("." + container_class).empty();
      $("." + container_class).append("\n        <h2>Monatliche \xDCbersicht f\xFCr alle Seiten mit \"".concat(page_name, "\"</h2>\n        <table class=\"").concat(table_name, " table table-striped\">\n          <thead>\n\n            <tr class=\"head_tr\">\n              <th scope=\"col\">Monat</th>\n              <th scope=\"col\">Pageviews</th>\n              <th scope=\"col\">unique Pageviews</th>\n              <th scope=\"col\">Sessions</th>\n              <th scope=\"col\">Users</th>\n            </tr>\n\n          </thead>\n          <tbody class=\"tbody\">\n\n          </tbody>\n        </table>\n\n        <div class=\"").concat(svg_container, "\">\n\n        </div>\n        ")); //  $("." + table_name + " .tbody").empty();

      var _loop7 = function _loop7(main_index, _p13) {
        _p13 = _p13.then(function () {
          return new Promise(function (resolve, reject) {
            gapi.client.request({
              path: '/v4/reports:batchGet',
              root: 'https://analyticsreporting.googleapis.com/',
              method: 'POST',
              body: {
                reportRequests: [{
                  viewId: view_id,
                  dateRanges: [dateRanges[main_index]],
                  metrics: [{
                    expression: 'ga:pageviews'
                  }, {
                    expression: 'ga:uniquePageviews'
                  }, {
                    expression: 'ga:sessions'
                  }, {
                    expression: 'ga:users'
                  }],
                  "dimensionFilterClauses": [{
                    "filters": [{
                      "operator": "REGEXP",
                      "dimensionName": "ga:pagePath",
                      "expressions": [page_name]
                    }]
                  }]
                }]
              }
            }).then(function (response) {
              var metrics = [];

              if (typeof response.result.reports[0].data.rows !== 'undefined') {
                metrics = response.result.reports[0].data.rows[0].metrics;
              }

              for (var i = 0; i < metrics.length; i++) {
                var values = metrics[i].values;
                $("." + table_name + " .tbody").append("\n                  <tr>\n                  </tr>\n                  ");
                var date_of_current_row = new Date(dateRanges[main_index].startDate);
                $("." + table_name + " tr:last").append("\n                    <td>".concat(date_of_current_row.toLocaleDateString('de-DE', date_format_options), "</td>\n                  "));

                for (var inner_i = 0; inner_i < values.length; inner_i++) {
                  $("." + table_name + " tr:last").append("\n                        <td>".concat(values[inner_i], "</td>\n                      "));
                }

                data.push({
                  name: date_of_current_row.toLocaleDateString('de-DE', {
                    year: '2-digit',
                    month: 'short'
                  }),
                  value: values[3]
                });
              }

              resolve("done");

              if (main_index + 1 >= dateRanges.length) {
                var vertical_bar_chart_grouped_two = new d3Charts.VerticalBarChart("." + svg_container, data);
                vertical_bar_chart_grouped_two.draw_chart();
                outer_promise_resolve("this report is done"); //outer_promise_reject("error");
              }
            }, function (error) {
              outer_promise_reject("error");
            });
          } // end of inner promise
          );
        });
        _p12 = _p13;
      };

      for (var main_index = 0, _p12 = Promise.resolve(); main_index < dateRanges.length; main_index++) {
        _loop7(main_index, _p12);
      } // end of for loop

    });
  };
}
function SourceForRegexpPageReview(container_class, dateRanges, view_id, page_name) {
  this.container_class = container_class, this.dateRanges = dateRanges, this.view_id = view_id, this.page_name = page_name, this.table_name = this.container_class + "_table", this.svg_container = this.container_class + "_svg_container", this.date_format_options = {
    year: 'numeric',
    month: 'long'
  }, this.generate_report = function () {
    var container_class = this.container_class;
    var table_name = this.table_name;
    var svg_container = this.svg_container;
    var dateRange = this.dateRange;
    var view_id = this.view_id;
    var date_format_options = this.date_format_options;
    var page_name = this.page_name;
    return new Promise(function (outer_promise_resolve, outer_promise_reject) {
      var data = [];
      $("." + container_class).empty();
      $("." + container_class).append("\n        <h2>Quellen-\xDCbersicht f\xFCr alle Seiten mit \"".concat(page_name, "\"</h2>\n\n        <div class=\"").concat(svg_container, "\">\n\n        </div>\n        ")); //  $("." + table_name + " .tbody").empty();

      gapi.client.request({
        path: '/v4/reports:batchGet',
        root: 'https://analyticsreporting.googleapis.com/',
        method: 'POST',
        body: {
          reportRequests: [{
            viewId: view_id,
            dateRanges: [{
              startDate: dateRanges[0].startDate,
              endDate: dateRanges[dateRanges.length - 1].endDate
            }],
            dimensions: [{
              name: "ga:source"
            }],
            metrics: [{
              expression: 'ga:users'
            }],
            "dimensionFilterClauses": [{
              "filters": [{
                "operator": "REGEXP",
                "dimensionName": "ga:pagePath",
                "expressions": [page_name]
              }]
            }],
            "orderBys": [{
              "fieldName": "ga:users",
              "sortOrder": "DESCENDING"
            }]
          }]
        }
      }).then(function (response) {
        var data_of_sources = [];
        var rows = response.result.reports[0].data.rows;

        for (var i = 0; i < 15; i++) {
          var result_hash = {
            name: rows[i].dimensions[0],
            value: rows[i].metrics[0].values[0]
          };
          data_of_sources.push(result_hash);
        }

        $("." + container_class).append("\n                  <div class=\"".concat(container_class + "_" + "svg_container", "\">\n\n                  </div>\n                  "));
        var horizontal_bar_chart = new d3Charts.HorizontalBarChart("." + container_class + "_" + "svg_container", data_of_sources);
        horizontal_bar_chart.draw_chart();
        $("." + container_class).append("\n                    <div class=\"".concat(container_class + "_" + "svg_container_donut", "\">\n\n                    </div>\n                    "));
        var donut_chart = new d3Charts.DonutChart("." + container_class + "_" + "svg_container_donut", data_of_sources);
        donut_chart.draw_chart();
        outer_promise_resolve("done");
      }, function (error) {
        outer_promise_reject("error");
      });
    });
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

}]);
//# sourceMappingURL=1-e64736576058aa2887d3.chunk.js.map