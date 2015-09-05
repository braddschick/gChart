function yaDoc(theMainObject){
    this.mainObject = theMainObject;
    this.name = '';
    this.construct = '';
    this.methods = [];
    this.properties = [];
    this.format = {"header": "","section": "", "method": "", "property": "", "type": "", "description": "" }
}
yaDoc.prototype = {
    constructor: yaDoc,
    checkFormat:function(){
        if(this.format.header.length < 1)
            this.format.header = '#';
        if(this.format.section.length < 1)
            this.format.section = '##';
        if(this.format.method.length < 1)
            this.format.method = '###';
        if(this.format.property.length < 1)
            this.format.property = '###';
        if(this.format.type.length < 1)
            this.format.type = '__{0}__';
        if(this.format.description.length < 1)
            this.format.description = '####';
    },
    make:function(){
        this.properties = this.getProps(this.mainObject);
        this.methods = this.getProps(this.mainObject.constructor[this.getUseful()[0]]);
        this.name = this.mainObject.constructor.name;
        //console.warn(this.mainObject.constructor.prototype.constructor.toString());
        this.construct = ({}).toString.call(this.mainObject.constructor);//.match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        console.warn(this.construct);
        var i = document.body.innerHTML;
        document.body.innerHTML = '<a download="'+this.name+'-template.md" href="'+this.getFile()+'" id="downloadlink">Download Document Template</a>'+i;
    },
    makeMD:function(){
        this.checkFormat();
        var o = this.getFormat('header',this.name)+'\r\n\r\n';
        o += this.getFormat('section','Properties')+'\r\n';
        for(var i=0;i<this.properties.length;i++){
            o+=this.getFormat('property',this.properties[i])+' :: ';
            o+=this.getFormat('type',this.getType(this.properties[i]))+'\r\n'+this.getFormat('description','Description')+'\r\n';
        }
        o+= '\r\n'+this.getFormat('section','Methods')+'\r\n';
        o+= this.getFormat('property','Main Constructor')+'\r\n';
        o+= '**'+this.name+'** ()\r\n';
        for(var i=0;i<this.methods.length;i++){
            o+=this.getFormat('method',this.methods[i])+'()\r\n'+this.getFormat('description','Description')+'\r\n';
        }
        return o;
    },
    getProps:function(obj){
        return Object.getOwnPropertyNames(obj);
    },
    getMethodArgs:function(theMethod){
        return '';
    },
    getUseful:function(){
        return ['prototype'];
    },
    getType:function(theObject){
        return Object.prototype.toString.call(theObject).replace(/^\[object (.+)\]$/,"$1").toLowerCase();
    },
    getFile:function(){
        var data = new Blob([this.makeMD()], {type: 'text/plain'});
        return window.URL.createObjectURL(data);
    },
    getFormat:function(theType, theValue){
        if(this.format[theType].indexOf('{') < 1)
            return this.format[theType]+' '+theValue;
        else
            return this.format[theType].replace('{0}',theValue)+' ';
    }
}
