////To do's: ControlWrapper, DashboardWrapper, and lets not forget the intelligent way of loading the google library.
////Well do this shit and see what happens.
function gChart(theContainer,theChartType) {
    this.container = theContainer;
    this.chartType = this.selectChart(theChartType)||chartTypes.COLUMN;
    this.data = {};
    this.options = {};
    this.onMouse = new function(){};
    this.divDashboard = '';
    this.controls = [];
    this.gChartOpts = {};
    this.init = false;
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
        GANTT: 'GanttChart'
    },
    controlTypes:{
        CHARTRANGE: 'ChartRangeFilter',
        NUMRANGE: 'NumberRangeFilter',
        CATEGORY: 'CategoryFilter'
    },
    loadInit:function(){
        if(!this.init)
        {
//            console.info('init has not been set to true yet loading visualization');
            if(this.controls.length <1)
                switch(this.chartType){
                    case this.chartTypes.COLUMN:
                        this.init = true;
                        google.load('visualization', '1', {packages:['corechart']});
                        break;
                }
            else {
                google.load('visualization', '1.0', {'packages':['controls']});
                this.init = true;
            }
        }
    },
    getWrapper:function(){
        this.loadInit();
        return new google.visualization.ChartWrapper({
            chartType: this.chartType,
            dataTable: this.data,
            options: this.options,
            containerId: this.container
          });
    },
    setData:function(theData){
        this.loadInit();
        if(!Array.isArray(theData))
            this.data = new google.visualization.DataTable(theData);
        else
            this.data = new google.visualization.arrayToDataTable(theData);
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
    addEvent:function(theSuccess){
            google.visualization.events.addListener(this.getWrapper(), 'ready', theSuccess||this.onMouse);
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
                t.setData(t.data);
                switch(t.chartType){
                    case t.chartTypes.PIE:
                        t.transpose();
                    break;
                }
                t.getWrapper().draw();
            });
//            return this.getWrapper().draw();
        }
        else {
            this.loadInit();
            var dashboard = new google.visualization.Dashboard(this.divDashboard);
            var t = this;
            google.setOnLoadCallback(function(){
                dashboard.bind(t.controls[0],t.getWrapper());
                dashboard.draw();
            });
        }
    }
}
