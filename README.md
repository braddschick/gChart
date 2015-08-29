# gChart
Google Charts Wrapper Javascript Library for simply creating Google Charts without the overhead of all the extra stuff that Google Charts demands

## Requirements
You must still include the Google JSAPI script in your html code. This is a __mandatory__ requirement.

## Browser Limitations
Currently __gChart__ will work with browsers IE9 and above.

## How To Use
Pretty simple to start using gChart.
1. Instantiate the gChart(__ID of Where to put the Chart__, __Chart Type__)
```javascript
    <script type="application/javascript">
        var g = new gChart('chart', 'column');
```
2. Add the Data to the chart
```javascript
    g.data = { cols: [{id: 'col1', label: 'labels here', type: 'string'},{id: 'col2', label: 'Another label', type: 'number'},{id: 'col3', label: 'Yet Another label', type: 'number'}], rows: [{c: [ {v: 'Realm-1'}, {v: 3 }, {v: 2 }] }] };
```
3. Then call the __show()__ method
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

## License
Google owns the Google Visualization library and it owns anything to do with that library.
gChart is Creative Commons 1.0 please use, modify, distribute, and have fun!
