# gChart Documentation
The minimum required to display a google.visualization chart with gChart is the following:
1. Create the gChart Object
```javascript
var g = new gChart(‘myID’, ‘bar’);
```
2. Set the Data of the Chart
```javascript
g.setData({ cols: [{id: ‘RealmNumber’, label: ‘RealmNumber’, type: ‘number’},{id: ‘MAX’, label: ‘MAX’, type: ‘number’},{id: ‘AVG’, label: ‘AVG’, type: ‘number’}], rows: [{c: [ {v: 1 }, {v: ‘1.67’}, {v: ‘0.120198412698413’}] }] });
```
3. Show the chart to the world, or at least to whomever views the web page.
```javascript
g.show();
```

Easily creates a bar chart with the data provided. 
## Properties
### container :: __string__ 
The **ID** of the element that will contain the chart object.
#### Description
### chartType :: __string__ 
#### Description
The short name for the type of chart that needs to be created. This is a _enum_ chartTypes.
- column   = chartTypes.COLUMN;
- pie = chartTypes.PIE;
- bar = chartTypes.BAR;
- line = chartTypes.LINE;
- table = chartTypes.TABLE;
- annotate = chartTypes.ANNOTATE;
- area = chartTypes.AREA;
- bubble = chartTypes.BUBBLE;
- combo = chartTypes.COMBO;
- sankey = chartTypes.SANKEY;
- scatter = chartTypes.SCATTER;
- stepped = chartTypes.STEPPED;
- timeline = chartTypes.TIMELINE;
- treemap = chartTypes.TREEMAP;
- candle = chartTypes.CANDLE;
- word = chartTypes.WORD;
- gantt = chartTypes.GANTT;
- geo = chartTypes.GEO;
- calendar = chartTypes.CALENDAR;
- gauge = chartTypes.GAUGE;
- org = chartTypes.ORG;

### data :: __object__ 
#### Description
This can be either a _Google JSON DataTable_ or an _Array_ [Google Reference](https://developers.google.com/chart/interactive/docs/reference?hl=en)

### dataView :: __Google.Visualization.DataView__ 
#### Description
_OPTIONAL_ If a DataView is needed for the display of a chart it can be added here. [Google Reference](https://developers.google.com/chart/interactive/docs/datatables_dataviews) This should be set through the __setDataView()__ method. 

### options :: __object__ 
#### Description
_OPTIONAL_ If the chart requires additional options for display they can be added here with the same standardized manner as the typical Google.Visualization.[Charts] options.

### onEvent :: __function__ 
#### Description
_OPTIONAL_ If the chart needs to have an event fired this holds the successful event.

### divDashboard :: __string__ 
#### Description
_OPTIONAL_ The **ID** of the element that will contain the dashboard object. If utilized there should also be __Controls__ added to the _controls_.

### controls :: __array__ 
#### Description
_OPTIONAL_ Any controls that are added via the __addControl()__ are stored in this array.

### moreCharts :: __array containing google.visualization[chart]__ 
#### Description
_OPTIONAL_ Any additional charts to be provided with the Dashboard View of the chart. [Google Chart Dashboards]

### gChartOpts :: __object__ 
#### Description
_OPTIONAL_ Any additional options as dictated just for the gChart object and NOT the google.visualization[chart].options in the [options property](#options).

### init :: __boolean__ 
#### Description
_PRIVATE_ Default = _false_ This checks for the loading of the google.visualization library. Once loaded successfully the property = _true_.

### errorContainer :: __string__ 
#### Description
_OPTIONAL_ The ID of the element that should contain any error messages generated by the gChart objects.

## Methods
### Main Constructor
**gChart**(_theContainer_, _theChartType_)
#### Description
_REQUIRED_ The main method to construct a gChart object. 
*theContainer* = ID of the element to contain the chart and stored in the [container](#container).
*theChartType* = [chartType](#chartType) short identifier that relates to the chart type to be displayed.
### chartTypes()
#### Description
_ENUM_ The chartType enumeration as described in the [chartType](#chartType) 
### controlTypes()
#### Description
_ENUM_ The controlType enumeration for use when google.visualization.controls is required for a dashboard. see also [addControl](#addControl)
### loadCheck()
#### Description
_PRIVATE_ The method that verifies if the google.visualization library has been already loaded.
### loadInit()
#### Description
_PRIVATE_ Method that loads the appropriate google.visualization JSAPI library. 
### getPackage()
#### Description
_PRIVATE_ Chooses the correct google.visualization JSAPI library as per the current [chartType](#chartType).
### getWrapper()
#### Description
_PUBLIC_ Returns the [google.visualization.ChartWrapper](https://developers.google.com/chart/interactive/docs/reference#chartwrapperobject) object corresponding with the appropriate chart object in gChart.
### setData(_theData_)
#### Description
_PUBLIC_ Sets the [data](#data) property. _theData_ can be a google.visualization.datatable or an Array.
### setDataView(_theColumnIndexes_)
#### Description
_PUBLIC_ Sets the [dataView](#dataView) property as per the _theColumnIndexes_ given to the method.
### addControl(_theControlType_, _theContainer_, _theColumnLabel_)
#### Description
_PUBLIC_ Pushes a google.visualization.Control into the [controls property](#controls). 
*theControlType* = short hand for the control type that needs to be created.
*theContainer* = ID of the element to contain the google.visualization.control.
*theColumnLabel* = The label of the column to be filtered by the control.
### addChart(_theNewChart_)
#### Description
_PUBLIC_ Pushes a google.visualization[chart] object into the [moreCharts](#moreCharts) property.
### addEvent(_theEventType_, _theSuccess_)
#### Description
_PUBLIC_ Adds a google.visualization.events.addListener to the gChart object for the specified event in the _theEvent_ variable. 
*theSuccess* = the function to run when _theEvent_ happens to the gChart object.
### transpose()
#### Description
_PUBLIC_ Transposes the [data](#data) object just like the command in Microsoft Excel. The Columns become the rows and the and rows become the columns. 
**Additional Information**
Currently [transpose](#transpose) verifies that the [data](#data) property has less than 2 rows but more than 2 columns. This is for a simple method and will be retracted in the future.
### selectChart(_theChartType_)
#### Description
_PRIVATE_ Selects the appropriate google.visulization.[chart] based on the lowercase version of the _theChartType_ variable.
### selectControl(_theControlType_)
#### Description
_PRIVATE_ Selects the appropriate google.visualization.[control] based on the lowercase version of the _theControlType_ variable.
### show()
#### Description
_PUBLIC_ This creates all necessary gChart objects, controls, dashboards, or any other required items to display the gChart object appropriately. 
