# gChart
[Google Charts](https://developers.google.com/chart/?hl=en) Wrapper Javascript Library for simply creating Google Charts without the overhead of all the extra stuff that Google Charts demands.

## Requirements
You must still include the [Google JSAPI](https://www.google.com/jsapi) script in your html code. This is a __mandatory__ requirement.

## Browser Limitations
Currently __gChart__ will work with browsers IE9 and above.

## How To Use
Pretty simple to start using gChart.

Instantiate the gChart(__ID of Where to put the Chart__, __Chart Type__)
```javascript
    <script type="application/javascript">
        var g = new gChart('chart', 'column');
```
Add the Data to the chart
```javascript
    g.data = { cols: [{id: 'col1', label: 'labels here', type: 'string'},{id: 'col2', label: 'Another label', type: 'number'},{id: 'col3', label: 'Yet Another label', type: 'number'}], rows: [{c: [ {v: 'Realm-1'}, {v: 3 }, {v: 2 }] }] };
```
Then call the __show()__ method
```javascript
    g.show();
```

That is all that is required you can add other options that I will describe later. 

### Classes
#### gChart
gChart __(ID, ChartType)__

##### ID
The ID of where the chart should be placed when it is ready.

##### ChartType
Corresponds to the gchart.chartTypes **(ENUM)** for the type of chart to be displayed.

__column__ chartTypes.COLUMN 

__pie__ chartTypes.PIE 

__bar__ chartTypes.BAR 

__line__ chartTypes.LINE 

__table__ chartTypes.TABLE 

__annotate__ chartTypes.ANNOTATE 

__area__ chartTypes.AREA 

__bubble__ chartTypes.BUBBLE 

__combo__ chartTypes.COMBO 

__sankey__ chartTypes.SANKEY 

__scatter__ chartTypes.SCATTER 

__stepped__ chartTypes.STEPPED 

__timeline__ chartTypes.TIMELINE 

__treemap__ chartTypes.TREEMAP 

__candle__ chartTypes.CANDLE 

__word__ chartTypes.WORD 

__gantt__ chartTypes.GANTT 

### Properties
`this.container` = ID of the element to contain the chart for viewing.

`this.chartType` = `chartTypes.[COLUMN,COMBO,etc...]` google.visualization.[chart type]

`this.data` = Could be either an `Array` or `google.visualization.DataTable`. [description](https://developers.google.com/chart/interactive/docs/datatables_dataviews)

`this.options` = New Object of any Chart Options as required for the chart.

`this.onMouse` = new function(){} for any mouseover event on the chart. [description](https://developers.google.com/chart/interactive/docs/events)

`this.divDashboard` = ID of the element to contain the dashboard for viewing. [description](https://developers.google.com/chart/interactive/docs/gallery/controls)

`this.controls` = Should be an `Array` containing one or numerous `google.visualization.ControlWrapper`. [description](https://developers.google.com/chart/interactive/docs/gallery/controls)

`this.gChartOpts` = New Object for anny additional specifc items needed for gChart to complete.

### Methods
#### getWrapper()
Returns `google.visualization.ChartWrapper` object for the current chart.
#### show()
Displays the chart and if thier is a control designated then it too gets rendered at the same time.
#### transpose()
Transposes the Data to by switching the column headers to the row headers and the same with the data. Very similar to the Microsoft Excel Transpose function under Paste Special.

## Full HTML Example
```html
<html>
    <head>
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    </head>
    <body>
        <div id="chart" style="width: 900px;height: 450px;">
            
        </div>
        <script type="application/javascript" src="js/gcharts.js"></script>
        <script type="application/javascript">
            var g = new gChart('chart', 'column');
            g.data = { cols: [{id: 'RealmNumber', label: 'RealmNumber', type: 'string'},{id: 'Internal', label: 'Internal', type: 'number'},{id: 'External', label: 'External', type: 'number'}], rows: [{c: [ {v: 'Realm-1'}, {v: 3 }, {v: 2 }] }] };
            g.options = {'stacked': 'true'};
            g.show();
        </script>
    </body>
</html>
```

## License
Google owns the Google Visualization library and it owns anything to do with that library.
gChart is Creative Commons 1.0 please use, modify, distribute, and have fun!
