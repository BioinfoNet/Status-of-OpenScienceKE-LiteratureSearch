/* global google */
var AOP = AOP || {};

const GOOGLE_CHARTS_VERSION = '45';
const SUPPORTED_CHART_TYPES = ['LineChart', 'ColumnChart'];
const DEFAULT_CHART_TYPE = 'LineChart';

AOP.charts = {
  checkValdChartType: function (chartType) {
    return SUPPORTED_CHART_TYPES.indexOf(chartType) === 1 ? chartType : DEFAULT_CHART_TYPE;
  },
  load: function (opts, callback) {
    opts.packages = opts.packages || ['corechart', 'bar', 'line'];
    google.charts.load(GOOGLE_CHARTS_VERSION, {packages: opts.packages});
    google.charts.setOnLoadCallback(function () {
      return callback();
    });
  },
  /**
   * If the Y axis numbers are too small, it can render oddly. In this case set the grid line count
   * to match the maximum Y Axis value, so there is an available grid line for each value. Otherwise, let
   * the charts api work out the optimal amount (-1)
   * @param yAxisMaxValue
   * @returns {number}
   */
  setVAxisGridLineCount: function (chartOptions, yAxisMaxValue) {
    const automaticGridlineComputeThreshold = 10;
    yAxisMaxValue = Number(yAxisMaxValue);
    chartOptions.vAxis.gridlines = {
      count: (yAxisMaxValue <= automaticGridlineComputeThreshold ? yAxisMaxValue + 1 : -1)
    };
  },

  /**
   * Initialise the chart and return method to draw chart
   * @param opts
   * @returns {*}
   */
  initChart: function (opts) {

    opts.chartType = this.checkValdChartType(opts.chartType);
    opts.width = opts.width || 600;
    opts.height = Math.ceil(opts.width / 2);
    opts.containerId = opts.containerId || false;
    opts.columns = opts.columns || false;
    opts.data = opts.data || false;
    opts.total = opts.total || false;
    opts.chartOptions = opts.chartOptions || false;

    if (!opts.containerId || !opts.columns || !opts.data || !opts.total) {
      return false;
    }
    var data = new google.visualization.DataTable();

    $.each(opts.columns, function (index, column) {
      data.addColumn(column[0], column[1]);
    });

    opts.chartOptions.width = opts.width;
    opts.chartOptions.height = opts.height;

    this.setVAxisGridLineCount(opts.chartOptions, opts.total);

    var translatedChartData = opts.data.map(function (row) {
      var rowValue = row[0].v;
      var valueBreakDown = rowValue.split(' ');
      valueBreakDown[0] = AOP.translate(valueBreakDown[0]);
      row[0].v = valueBreakDown.join(' ');
      return row;
    });

    data.addRows(translatedChartData);

    var draw = function (drawOpts) {
      drawOpts = drawOpts || {};
      if (drawOpts.width) {
        opts.chartOptions.width = drawOpts.width;
        opts.chartOptions.height = Math.ceil(drawOpts.width / 2);
      }
      var chart = new google.visualization[opts.chartType](document.getElementById(opts.containerId));
      chart.draw(data, opts.chartOptions);
    };

    return {
      draw: draw
    };

  }
};
