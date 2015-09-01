////To do's: ControlWrapper, DashboardWrapper, and lets not forget the intelligent way of loading the google library.
////Well do this shit and see what happens.
function gChart(theContainer,theChartType) {
    this.container = theContainer;
    this.chartType = this.selectChart(theChartType)||chartTypes.COLUMN;
    this.data = {};
    this.dataView = {};
    this.options = {};
    this.onMouse = new function(){};
    this.divDashboard = '';
    this.controls = [];
    this.moreCharts = [];
    this.gChartOpts = {};
    this.init = false;
    this.errorContainer = '';
}
function errorHandler(errorMessage) {
    console.warn(errorMessage.message);
    google.visualization.errors.removeError(errorMessage.id);
    var b = document.body.innerHTML;
    document.body.innerHTML = '<div class="gChart_Error"><p class="gChart_ErrorMessage" id="'+errorMessage.id+'">'+errorMessage.message+'</p></div>'+b;
}
gChart.prototype = {
    constructor: gChart,
    chartTypes:{
        COLUMN: 'ColumnChart',
        BAR: 'BarChart',
        LINE: 'LineChart',
        TABLE: 'Table',
        ANNOTATE: 'AnnotationChart',
        AREA: 'AreaChart',
        PIE: 'PieChart',
        BUBBLE: 'BubbleChart',
        COMBO: 'ComboChart',
        SANKEY: 'Sankey',
        SCATTER: 'ScatterChart',
        STEPPED: 'SteppedAreaChart',
        TIMELINE: 'Timeline',
        TREEMAP: 'TreeMap',
        CANDLE: 'CandlestickChart',
        WORD: 'WordTree',
        GANTT: 'GanttChart',
        GEO: 'GeoChart',
        CALENDAR: 'Calendar',
        GAUGE: 'Gauge',
        ORG: 'OrgChart'
    },
    controlTypes:{
        CHARTRANGE: 'ChartRangeFilter',
        NUMRANGE: 'NumberRangeFilter',
        CATEGORY: 'CategoryFilter'
    },
    loadCheck:function(){
        try{
            var g = new google.visualization.DataTable();
            return false;
        }
        catch(e){
            return true;
        }
    },
    loadInit:function(){
        if(!this.init)
        {
            if(this.controls.length <1)
                if(this.loadCheck())
                    this.getPackage();
            else {
                if(this.loadCheck())
                    google.load('visualization', '1.0', {'packages':['controls']});
            }
            this.init = true;
        }
    },
    getPackage:function(){
        switch(this.chartType){
            case this.chartTypes.ANNOTATE:
                return google.load('visualization', '1', {'packages':['annotationchart']});
            case this.chartTypes.BAR:
                return google.load('visualization', '1', {packages: ['corechart', 'bar']});
            case this.chartTypes.CALENDAR:
                return google.load('visualization', '1.1', {packages:['calendar']});
            case this.chartTypes.GANTT:
                return google.load('visualization', '1.1', {packages:['gantt']});
            case this.chartTypes.GAUGE:
                return google.load('visualization', '1', {packages:['corechart', 'gauge']});
            case this.chartTypes.GEO:
                return google.load('visualization', '1', {packages:['geochart']});
            case this.chartTypes.LINE:
                return google.load('visualization', '1', {packages: ['corechart', 'line']});
            case this.chartTypes.ORG:
                return google.load('visualization', '1', {packages:['orgchart']});
            case this.chartTypes.SANKEY:
                return google.load('visualization', '1.1', {packages:['corechart', 'sankey']});
            case this.chartTypes.TABLE:
                return google.load('visualization', '1.1', {packages:['table']});
            case this.chartTypes.TIMELINE:
                return google.load('visualization', '1', {packages:['timeline']});
            case this.chartTypes.TREEMAP:
                return google.load('visualization', '1', {packages:['treemap']});
            case this.chartTypes.WORD:
                return google.load('visualization', '1.1', {packages:['wordtree']});
            default:
                return google.load('visualization', '1', {packages:['corechart']});
        }
    },
    getWrapper:function(){
        this.loadInit();
        var m = new google.visualization.ChartWrapper({
            chartType: this.chartType,
            dataTable: this.data,
            options: this.options,
            containerId: this.container
          });
        google.visualization.events.addListener(m, 'error', errorHandler);
        return m;
    },
    setData:function(theData){
        this.loadInit();
        if(!Array.isArray(theData))
            this.data = new google.visualization.DataTable(theData);
        else
            this.data = new google.visualization.arrayToDataTable(theData);
    },
    setDataView:function(theColumnIndexes){
        if(this.data !== undefined && theColumnIndexes !== undefined){
            this.dataView = new google.visualization.DataView(this.data);
            this.dataView.setColumns(theColumnIndexes);
        }
    },
    addControl:function(theControlType, theContainer, theColumnLabel){
         this.controls.push( new google.visualization.ControlWrapper({
          'controlType': this.selectControl(theControlType),
          'containerId': theContainer,
          'options': {
            'filterColumnLabel': theColumnLabel
          }
        }));
    },
    addChart:function(theNewChart){
        this.moreCharts.push(theNewChart);
    },
    addEvent:function(theEventType, theSuccess){
        if(theEventType.toLowerCase() !== 'error')
            google.visualization.events.addListener(this.getWrapper(), theEventType, theSuccess||this.onMouse);
        else
            google.visualization.events.addListener(this.getWrapper(), 'error', errorHandler);
    },
    transpose:function(){
        if(this.data.getNumberOfRows() < 2 && this.data.getNumberOfColumns() > 2){
            var d = new google.visualization.DataTable();
            d.addColumn('string',this.gChartOpts.transpose||'Items');
            d.addColumn('number','Count');
            var l = this.data.getNumberOfColumns();
            for(var i=0;i < l;i++){
                d.addRow([this.data.getColumnLabel(i).toString(), this.data.getValue(0,i)]);
            }
            this.data = d;
        }
    },
    selectChart:function(theChartType){
        switch(theChartType.toLowerCase()){
            case 'column':
                return this.chartTypes.COLUMN;
                break;
            case 'pie':
                return this.chartTypes.PIE;
                break;
            case 'bar':
                return this.chartTypes.BAR;
                break;
            case 'line':
                return this.chartTypes.LINE;
                break;
            case 'table':
                return this.chartTypes.TABLE;
                break;
            case 'annotate':
                return this.chartTypes.ANNOTATE;
                break;
            case 'area':
                return this.chartTypes.AREA;
                break;
            case 'bubble':
                return this.chartTypes.BUBBLE;
                break;
            case 'combo':
                return this.chartTypes.COMBO;
                break;
            case 'sankey':
                return this.chartTypes.SANKEY;
                break;
            case 'scatter':
                return this.chartTypes.SCATTER;
                break;
            case 'stepped':
                return this.chartTypes.STEPPED;
                break;
            case 'timeline':
                return this.chartTypes.TIMELINE;
                break;
            case 'treemap':
                return this.chartTypes.TREEMAP;
                break;
            case 'candle':
                return this.chartTypes.CANDLE;
                break;
            case 'word':
                return this.chartTypes.WORD;
                break;
            case 'gantt':
                return this.chartTypes.GANTT;
                break;
            case 'geo':
                return this.chartTypes.GEO;
                break;
            case 'calendar':
                return this.chartTypes.CALENDAR;
                break;
            case 'gauge':
                return this.chartTypes.GAUGE;
                break;
            case 'org':
                return this.chartTypes.ORG;
                break
        }
    },
    selectControl:function(theControlType){
        switch(theControlType.toLowerCase()){
            case 'chart':
                return this.controlTypes.CHARTRANGE;
                break;
            case 'number':
                return this.controlTypes.NUMRANGE;
                break;
            case 'category':
                return this.controlTypes.CATEGORY;
                break;
        }
    },
    show:function(){
        if(this.divDashboard.length < 1) {
            this.loadInit();
            var t = this;
            google.setOnLoadCallback(function(){
                    if(typeof(t.dataView) === google.visualization.DataView){
                        t.setData(t.dataView);
                    }
                    else
                        t.setData(t.data);
                    switch(t.chartType){
                        case t.chartTypes.PIE:
                            t.transpose();
                        break;
                    }
                    t.getWrapper().draw();
            });
        }
        else {
            this.loadInit();
            var dashboard = new google.visualization.Dashboard(this.divDashboard);
            var t = this;
            google.setOnLoadCallback(function(){
                    if(t.moreCharts.length < 0)
                        dashboard.bind(t.controls[0],t.getWrapper());
                    else {
                        if(t.moreCharts.length === 1)
                            dashboard.bind(t.controls[0],t.getWrapper(),t.moreCharts[0].getWrapper());
                    }
                    dashboard.draw();
            });
        }
    }
}
