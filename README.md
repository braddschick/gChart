# gChart
Google Charts Wrapper Javascript Library for simply creating Google Charts without the overhead of all the extra stuff that Google Charts demands

## Requirements
You must still include the Google JSAPI script in your html code. This is a __mandatory__ requirement.

## Browser Limitations
Currently __gChart__ will work with browsers IE9 and above.

## How To Use
Pretty simple to start using gChart.
1. Instantiate the gChart(__ID of Where to put the Chart__, __Chart Type__)
'''<script type="application/javascript">
    var g = new gChart('chart', 'column');
2. Add the Data to the chart
'''g.data = { cols: [{id: 'col1', label: 'labels here', type: 'string'},{id: 'col2', label: 'Another label', type: 'number'},{id: 'col3', label: 'Yet Another label', type: 'number'}], rows: [{c: [ {v: 'Realm-1'}, {v: 3 }, {v: 2 }] }] };
3. Then call the __show()__ method
'''g.show();

That is all that is required you can add other options that I will describe later. 

## License
Google owns the Google Visualization library and it owns anything to do with that library.
gChart is Creative Commons 1.0 please use, modify, distribute, and have fun!