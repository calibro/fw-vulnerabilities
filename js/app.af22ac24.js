(function(t){function e(e){for(var r,o,s=e[0],l=e[1],c=e[2],f=0,d=[];f<s.length;f++)o=s[f],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&d.push(i[o][0]),i[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);u&&u(e);while(d.length)d.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,s=1;s<n.length;s++){var l=n[s];0!==i[l]&&(r=!1)}r&&(a.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},i={app:0},a=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/fw-vulnerabilities/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"003a":function(t,e,n){"use strict";var r=n("480c"),i=n.n(r);i.a},"14fd":function(t,e,n){},"155c":function(t,e,n){"use strict";var r=n("1d59"),i=n.n(r);i.a},"1c2a":function(t,e,n){"use strict";var r=n("d5e6"),i=n.n(r);i.a},"1d59":function(t,e,n){},2849:function(t,e,n){},"2fee":function(t,e,n){},"40fe":function(t,e,n){"use strict";var r=n("ca41"),i=n.n(r);i.a},"480c":function(t,e,n){},5110:function(t,e,n){"use strict";var r=n("2fee"),i=n.n(r);i.a},"521b":function(t,e,n){"use strict";var r=n("c9a6"),i=n.n(r);i.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("div",{staticClass:"fw-header"},[r("b-container",{staticClass:"h-100"},[r("b-row",{staticClass:"h-100"},[r("b-col",[r("div",{staticClass:"d-flex h-100 align-items-center justify-content-between"},[r("div",{staticClass:"logoCont"},[r("img",{attrs:{src:n("6484"),height:"100%",width:"auto"}})]),r("h6",{staticClass:"my-0 text-uppercase"},[t._v("\n              cybersecurity datavizlab\n            ")])])])],1)],1)],1),t.showApp?r("div",{staticClass:"ui-body"},[r("div",{staticClass:"options-bar-container"},[r("options-bar")],1),r("div",{staticClass:"slide-container item-container"},[r("div",{directives:[{name:"resize",rawName:"v-resize",value:t.onResize,expression:"onResize"}],staticClass:"slide-box"},[r("slide-container",{ref:"slide"})],1),r("filter-sidebar")],1),r("div",{staticClass:"export-bar-container"},[r("export-bar",{on:{export:t.doExport}})],1)]):r("div",{staticClass:"load-data-ui"},[r("data-selector")],1)])},a=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.fetchingData?n("div",{staticClass:"loading-container"},[n("b-spinner",{attrs:{label:"Loading..."}}),t._v("\n  Loading...\n")],1):n("svg",{ref:"mainSlide",attrs:{id:"main-slide",preserveAspectRatio:"",width:t.svgWidth,height:t.svgHeight,viewBox:"0 0 "+t.slideSizeArray.join(" ")}},[n("text",{attrs:{x:"25",y:"50","font-size":"32px","font-family":"'Arial', sans-serif","font-weight":"bold"}},[t._v("\n    "+t._s(t.slideTitle)+"\n  ")]),n("beeswarm-chart",{attrs:{x:"25",y:"65",width:t.slideSizeArray[0]-25,height:t.slideSizeArray[1]-90}}),n("text",{attrs:{x:t.slideSizeArray[0]-25,y:t.slideSizeArray[1]-25,"font-size":"16px","font-family":"'Arial', sans-serif","text-anchor":"end",fill:"#aaa"}},[t._v("\n    "+t._s(t.slideSource)+"\n  ")])],1)},s=[],l=(n("8e6e"),n("ac6a"),n("456d"),n("bd86")),c=n("bc05"),u=(n("ac4d"),n("8a81"),n("5df3"),n("1c4c"),n("7f7f"),n("6b54"),n("a481"),n("6762"),n("2fdb"),n("67a3")),f=n.n(u);function d(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=p(t))){var e=0,n=function(){};return{s:n,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i,a=!0,o=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return a=t.done,t},e:function(t){o=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(o)throw i}}}}function p(t,e){if(t){if("string"===typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(t,e):void 0}}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var b="http://www.w3.org/2000/xmlns/",v="http://www.w3.org/1999/xlink",g="http://www.w3.org/2000/svg";function m(t,e){t=t.cloneNode(!0);var n=window.location.href+"#",r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,null,!1);while(r.nextNode()){var i,a=d(r.currentNode.attributes);try{for(a.s();!(i=a.n()).done;){var o=i.value;o.value.includes(n)&&(o.value=o.value.replace(n,"#"))}}catch(u){a.e(u)}finally{a.f()}}t.setAttributeNS(b,"xmlns",g),t.setAttributeNS(b,"xmlns:xlink",v);var s=new window.XMLSerializer,l=s.serializeToString(t),c=new Blob([l],{type:"image/svg+xml"});f()(c,e+".svg")}var y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("svg",{ref:"mainSVG",attrs:{x:t.x,y:t.y,height:t.height,width:t.width}},[n("svg",{ref:"mainChart",attrs:{id:"main-chart",height:t.height,width:t.width}}),n("g",{ref:"legend",attrs:{id:"legend",transform:"translate(0,"+(t.height-100)+")"}})])},O=[],x=(n("7514"),n("20d6"),n("55dd"),n("5698")),w=n("0567"),S=(n("28ad"),n("2f62"));function C(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function j(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?C(Object(n),!0).forEach((function(e){Object(l["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var k={name:"BeeswarmChart",props:["x","y","height","width"],computed:j(j({},Object(S["d"])({colorBy:function(t){return t.colorBy},groupBy:function(t){return t.groupBy},sortBy:function(t){return t.sortBy},dotSize:function(t){return t.dotSize},csvData:function(t){return t.data.csvData}})),Object(S["b"])({filteredData:"data/filteredData"})),mounted:function(){this.draw()},methods:{init:function(){var t=this.csvData,e=x["r"]().domain(["Low","Medium","High"]).range(["#00E4A2","#EAEA6A","#D4003D"]),n=x["s"]().domain([0,x["m"](t,(function(t){return t["Age"]}))]).interpolator(x["j"]),r=x["s"]().domain([0,x["m"](t,(function(t){return t["Fattore di esposizione"]}))]).interpolator(x["k"]).unknown("#ccc");this.colorScales={Priority:e,Age:n,"Fattore di esposizione":r},this.simulation=x["g"]().force("x",x["h"]().strength(1)).force("y",x["i"]()).force("collide",x["f"]().iterations(1)),this.annotations=[],this.initialized=!0},draw:function(){var t=this;!this.initialized&&this.init();var e=this,n={top:20,right:20,bottom:20,left:300},r=x["t"](this.$refs.mainChart).attr("width",this.width).attr("height",this.height);if(0==this.filteredData.length)r.selectAll("*").remove(),x["t"](this.$refs.legend).selectAll("*").remove(),r.append("text").attr("class","no-data-text").style("font-size","40px").attr("y","50%").text("No data in your selection"),this.scaleToFit(0,0,this.width,this.height);else{r.selectAll(".no-data-text").remove();var i=this.width-n.left-n.right,a=this.height-n.top-n.bottom,o=x["o"]().key((function(e){return e[t.groupBy]})).entries(this.filteredData).sort((function(t,n){return"count"==e.sortBy?t.values.length>n.values.length?-1:1:t.key>n.key?1:-1})),s=x["q"](),l=(x["m"](o,(function(t){return x["m"](t.values,(function(t){return t["CVSS Score"]}))})),x["n"](o,(function(t){return x["n"](t.values,(function(t){return t["CVSS Score"]}))})),this.$store.state.data.filters["CVSS Score"]);s.range([0,i]).domain(l);var c=x["p"]().rangeRound([0,a]).domain(o.map((function(t){return t.key}))),u=1,f=this.dotSize,d=r.select("#xAxisGroup");d.empty()&&(d=r.append("g").attr("id","xAxisGroup").attr("transform","translate("+n.left+","+n.top+")")),d.call(x["d"](s).tickSize(-a)).call((function(t){t.select(".domain").attr("d",x["l"]()([[-n.left,0],[i,0]]))}));var p=r.select("#yAxisGroup");p.empty()&&(p=r.append("g").attr("id","yAxisGroup").attr("transform","translate("+n.left+","+n.top+")")),p.call(x["b"](c).tickSize(-i)).call((function(t){t.select(".domain").remove(),t.selectAll("text").attr("font-size","16px").attr("x",-n.left).attr("text-anchor","start")}));var h=r.select("#yAxisHelperGroup");h.empty()&&(h=r.append("g").attr("id","yAxisHelperGroup").attr("transform","translate("+(i+n.left)+","+(n.top+c.bandwidth()/2)+")")),h.attr("transform","translate("+(i+n.left)+","+(n.top+c.bandwidth()/2)+")").call(x["c"](c).tickSize(-i-n.left)).call((function(t){t.selectAll("text").remove(),t.select(".domain").remove()}));var b=r.select("#chartContainer");b.empty()&&(b=r.append("g").attr("id","chartContainer").attr("transform","translate("+n.left+","+n.top+")"));var v=b.selectAll(".bee").data(this.filteredData,(function(t){return t.dataId})),g=v.enter().append("circle").attr("class","bee").on("click",(function(t){e.toggleAnnotation(t,this)}));v.exit().each((function(t){var n=e.annotations.findIndex((function(e){return e.annotations().find((function(e){return e.data.dataId==t.dataId}))}));n>=0&&(e.annotations.splice(n,1),x["t"]("#annotation-"+t.dataId).remove())})),v.exit().remove(),v=v.merge(g),v.attr("r",f).attr("fill",(function(t){return e.colorScales[e.colorBy](t[e.colorBy])})),this.simulation.force("x").x((function(t){return s(t["CVSS Score"])})),this.simulation.force("y").y((function(e){return c(e[t.groupBy])+c.bandwidth()/2})),this.simulation.force("collide").radius(f+u),this.simulation.nodes(this.filteredData).on("tick",(function(t){v.attr("cx",(function(t){return t.x})).attr("cy",(function(t){return t.y})),e.annotations.forEach((function(t){t.annotations().forEach((function(t){t.x=t.data.x,t.y=t.data.y}))}))})).alpha(1).restart()}},scaleToFit:function(t,e,n,r){var i=12;x["t"](this.$refs.mainChart).attr("viewBox","".concat(t," ").concat(n-i," ").concat(e-t," ").concat(r-n+2*i))},toggleAnnotation:function(t,e){var n=this.annotations.findIndex((function(e){return e.annotations().find((function(e){return e.data.dataId==t.dataId}))}));if(n>=0)this.annotations.splice(n,1),x["t"](e.parentNode).select("#annotation-"+t.dataId).remove();else{var r={note:{title:t["Vulnerability"]||t["Code"],label:t["CVSS Score"],bgPadding:{top:15,left:10,right:10,bottom:10}},data:t,className:"show-bg",dx:t.x>this.width/2?-50:50,dy:t.y>this.height/2?-100:100},i=w["a"].annotationCallout,a=w["a"].annotation().editMode(!0).notePadding(15).type(i).annotations([r]).accessors({x:function(t){return t.x},y:function(t){return t.y}});x["t"](e.parentNode).append("g").attr("class","annotation-group").attr("id","annotation-"+t.dataId).call(a),this.annotations.push(a);var o=x["u"]("g.annotation").select("circle.handle");o.remove()}}},watch:{filteredData:function(){this.draw()},height:function(){this.draw()},groupBy:function(){this.draw()},colorBy:function(){this.draw()},sortBy:function(){this.draw()},dotSize:function(){this.draw()}}},D=k,_=(n("003a"),n("2877")),F=Object(_["a"])(D,y,O,!1,null,null,null),E=F.exports;function P(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function A(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?P(Object(n),!0).forEach((function(e){Object(l["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var z={name:"SlideContainer",data:function(){return{svgHeight:0}},components:{BeeswarmChart:E},mounted:function(){this.$store.dispatch("data/loadTestData")},computed:A(A(A({},Object(S["d"])({slideTitle:function(t){return t.slideTitle},slideSource:function(t){return t.slideSource},fetchingData:function(t){return t.data.fetchingData}})),Object(S["b"])(["slideSizeArray"])),{},{aspectRatio:function(){return this.slideSizeArray[0]/this.slideSizeArray[1]},svgWidth:function(){return this.svgHeight*this.aspectRatio}}),methods:{exportImage:function(t,e){console.log(t,e);var n=e||"chart";switch(t){case"png":Object(c["saveSvgAsPng"])(this.$refs.mainSlide,n+".png");break;case"svg":m(this.$refs.mainSlide,n)}},resize:function(){this.svgHeight=Math.min(this.$el.parentNode.clientHeight,this.$el.parentNode.clientWidth/this.aspectRatio)}}},$=z,B=(n("7e42"),Object(_["a"])($,o,s,!1,null,"98dd7b7e",null)),T=B.exports,R=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"options-bar"},[n("b-row",[n("b-col",{attrs:{sm:"4"}},[n("data-selector")],1),n("b-col",{attrs:{sm:"2"}},[n("fw-slider",{attrs:{label:"Dot size",value:t.dotSize,min:"1",max:"10"},on:{input:t.setDotSize}})],1),n("b-col",{attrs:{sm:"2"}},[n("fw-select",{attrs:{label:"Sort by",value:t.sortBy,options:t.sortOptions},on:{change:t.setSortBy}})],1),n("b-col",{attrs:{sm:"2"}},[n("fw-select",{attrs:{label:"Group by",value:t.groupBy,options:t.groupOptions},on:{change:t.setGroupBy}})],1),n("b-col",{attrs:{sm:"2"}},[n("fw-select",{attrs:{label:"Color by",value:t.colorBy,options:t.colorOptions},on:{change:t.setColorBy}})],1)],1)],1)},V=[],K=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"data-selector"},[n("b-alert",{staticClass:"error-bar",attrs:{show:""!=t.dataError,variant:"warning"}},[t._v("\n    "+t._s(t.dataError)+"\n  ")]),n("div",{staticClass:"data-selector-line"},[n("div",{staticClass:"upload-button-container align-self-center"},[t.selectedFile?n("div",{staticClass:"upload-file-name"},[t._v("\n        "+t._s(t.selectedFile.name)+"\n      ")]):t._e(),n("fw-button",{staticClass:"upload-button",on:{click:t.openSelectFile}},[t._v("\n        Upload .csv\n        "),n("input",{ref:"fileSelector",staticStyle:{display:"none"},attrs:{type:"file",accept:"text/csv"},on:{change:t.onSelectFile}})])],1)])],1)},I=[];function N(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function M(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?N(Object(n),!0).forEach((function(e){Object(l["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var L={name:"DataSelector",mounted:function(){},computed:M({},Object(S["d"])({remoteFileList:function(t){return t.remoteFileList},selectedFile:function(t){return t.data.selectedDataSource.localFile},selectedRemote:function(t){return t.data.selectedDataSource.remoteFileUrl},dataError:function(t){return t.data.dataError}})),methods:{openSelectFile:function(){this.$refs.fileSelector.click()},onSelectFile:function(t){var e=t.target.files.length>0&&t.target.files[0];e&&this.$store.dispatch("data/loadDataFromFile",e)},selectRemoteFile:function(t){this.$store.dispatch("data/loadData",t)}}},G=L,U=(n("1c2a"),Object(_["a"])(G,K,I,!1,null,"8d9f8dfe",null)),W=U.exports;function H(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function Y(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?H(Object(n),!0).forEach((function(e){Object(l["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):H(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var J={name:"OptionsBar",components:{DataSelector:W},data:function(){return{groupOptions:[{value:"State",text:"State"},{value:"Close Code",text:"Close code"},{value:"Team Aziendale",text:"Team Aziendale"}],colorOptions:[{value:"Priority",text:"Priority"},{value:"Age",text:"Age"},{value:"Fattore di esposizione",text:"Fattore di esposizione"}],sortOptions:[{value:"count",text:"Count"},{value:"alphabetically",text:"Alphabetically"}]}},computed:Y({},Object(S["d"])(["groupBy","colorBy","sortBy","dotSize"])),methods:Y({},Object(S["c"])(["setGroupBy","setColorBy","setSortBy","setDotSize"]))},q=J,X=(n("5110"),Object(_["a"])(q,R,V,!1,null,"e2081262",null)),Q=X.exports,Z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"export-bar"},[n("b-row",[n("b-col",[n("fw-input",{attrs:{label:"Title",value:t.slideTitle,placeholder:"your slide title"},on:{input:t.setslideTitle}})],1),n("b-col",[n("div",{staticClass:"fw-option-select-label"},[t._v("export")]),n("b-row",[n("b-col",[n("b-button",{staticClass:"btn-block fw-button",attrs:{variant:"warning"},on:{click:function(){return t.onExport("svg",t.slideTitle)}}},[t._v("\n            .svg\n          ")])],1),n("b-col",[n("b-button",{staticClass:"btn-block fw-button",attrs:{variant:"warning"},on:{click:function(){return t.onExport("png",t.slideTitle)}}},[t._v("\n            .png\n          ")])],1)],1)],1),n("b-col",[n("fw-select",{attrs:{label:"Slide size",value:t.slideSize,options:t.slideSizeOptions},on:{change:t.setSlideSize}})],1),n("b-col",[n("fw-input",{attrs:{label:"Source",value:t.slideSource,placeholder:"additional information"},on:{input:t.setSlideSource}})],1)],1)],1)},tt=[];function et(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function nt(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?et(Object(n),!0).forEach((function(e){Object(l["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):et(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var rt={name:"ExportBar",data:function(){return{slideSizeOptions:[{value:"1920:1080",text:"1920 x 1080 (16:9)"},{value:"1024:768",text:"1024 x 768 (4:3)"},{value:"1191:842",text:"1191 x 842 (A3 landscape)"}]}},computed:nt({},Object(S["d"])(["slideTitle","slideSource","slideSize"])),methods:nt(nt({},Object(S["c"])(["setslideTitle","setSlideSource","setSlideSize"])),{},{onExport:function(t,e){this.$emit("export",t,e)}})},it=rt,at=(n("40fe"),Object(_["a"])(it,Z,tt,!1,null,"77fb4336",null)),ot=at.exports,st=function(){var t=this,e=this,n=e.$createElement,r=e._self._c||n;return r("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.hide,expression:"hide"}],staticClass:"filter-sidebar",class:{open:e.isOpen}},[r("div",{staticClass:"button-container"},[r("b-button",{staticClass:"button-toggle-filter d-flex align-items-center justify-content-center",attrs:{pill:"",variant:"outline-secondary"},on:{click:e.toggleSidebar}},[e.isOpen?e._e():r("b-icon-funnel"),e.isOpen?r("b-icon-x"):e._e()],1)],1),r("div",{staticClass:"filters-container"},[r("div",{staticClass:"filter-header"},[r("div",{staticClass:"filter-title"},[e._v("Filters")]),r("div",{staticClass:"filter-reset",on:{click:function(){return t["data/resetFilters"]()}}},[e._v("\n        RESET\n      ")])]),r("div",{staticClass:"filter-list",attrs:{role:"tablist"}},[r("div",{staticClass:"filter-block"},[r("div",{directives:[{name:"b-toggle",rawName:"v-b-toggle.accordion-1",modifiers:{"accordion-1":!0}}],staticClass:"filter-according-toggle",attrs:{role:"tab"}},[e._v("\n          Real target"),r("b-icon-chevron-up",{staticClass:"caret"})],1),r("b-collapse",{attrs:{id:"accordion-1",visible:"",accordion:"filter-accordion",role:"tabpanel"}},[r("div",{staticClass:"filter-body"},[r("group-list-filter",{attrs:{filterKey:"Real Target"},on:{change:e.onChangeFilter}})],1)])],1),r("div",{staticClass:"filter-block"},[r("div",{directives:[{name:"b-toggle",rawName:"v-b-toggle.accordion-2",modifiers:{"accordion-2":!0}}],staticClass:"filter-according-toggle",attrs:{role:"tab"}},[e._v("\n          CVSS Score"),r("b-icon-chevron-up",{staticClass:"caret"})],1),r("b-collapse",{attrs:{id:"accordion-2",visible:"",accordion:"filter-accordion",role:"tabpanel"}},[r("div",{staticClass:"filter-body"},[r("range-filter",{attrs:{filterKey:"CVSS Score"},on:{change:e.onChangeFilter}})],1)])],1),r("div",{staticClass:"filter-block"},[r("div",{directives:[{name:"b-toggle",rawName:"v-b-toggle.accordion-3",modifiers:{"accordion-3":!0}}],staticClass:"filter-according-toggle",attrs:{role:"tab"}},[e._v("\n          Priority"),r("b-icon-chevron-up",{staticClass:"caret"})],1),r("b-collapse",{attrs:{id:"accordion-3",visible:"",accordion:"filter-accordion",role:"tabpanel"}},[r("div",{staticClass:"filter-body"},[r("checkbox-filter",{attrs:{filterKey:"Priority"},on:{change:e.onChangeFilter}})],1)])],1),r("div",{staticClass:"filter-block"},[r("div",{directives:[{name:"b-toggle",rawName:"v-b-toggle.accordion-4",modifiers:{"accordion-4":!0}}],staticClass:"filter-according-toggle",attrs:{role:"tab"}},[e._v("\n          State"),r("b-icon-chevron-up",{staticClass:"caret"})],1),r("b-collapse",{attrs:{id:"accordion-4",visible:"",accordion:"filter-accordion",role:"tabpanel"}},[r("div",{staticClass:"filter-body"},[r("checkbox-filter",{attrs:{filterKey:"State"},on:{change:e.onChangeFilter}})],1)])],1),r("div",{staticClass:"filter-block"},[r("div",{directives:[{name:"b-toggle",rawName:"v-b-toggle.accordion-5",modifiers:{"accordion-5":!0}}],staticClass:"filter-according-toggle",attrs:{role:"tab"}},[e._v("\n          Close Code"),r("b-icon-chevron-up",{staticClass:"caret"})],1),r("b-collapse",{attrs:{id:"accordion-5",visible:"",accordion:"filter-accordion",role:"tabpanel"}},[r("div",{staticClass:"filter-body"},[r("checkbox-filter",{attrs:{filterKey:"Close Code"},on:{change:e.onChangeFilter}})],1)])],1),r("div",{staticClass:"filter-block"},[r("div",{directives:[{name:"b-toggle",rawName:"v-b-toggle.accordion-6",modifiers:{"accordion-6":!0}}],staticClass:"filter-according-toggle",attrs:{role:"tab"}},[e._v("\n          Team Aziendale"),r("b-icon-chevron-up",{staticClass:"caret"})],1),r("b-collapse",{attrs:{id:"accordion-6",visible:"",accordion:"filter-accordion",role:"tabpanel"}},[r("div",{staticClass:"filter-body"},[r("checkbox-filter",{attrs:{filterKey:"Team Aziendale"},on:{change:e.onChangeFilter}})],1)])],1),r("div",{staticClass:"filter-block"},[r("div",{directives:[{name:"b-toggle",rawName:"v-b-toggle.accordion-7",modifiers:{"accordion-7":!0}}],staticClass:"filter-according-toggle",attrs:{role:"tab"}},[e._v("\n          Year"),r("b-icon-chevron-up",{staticClass:"caret"})],1),r("b-collapse",{attrs:{id:"accordion-7",visible:"",accordion:"filter-accordion",role:"tabpanel"}},[r("div",{staticClass:"filter-body"},[r("checkbox-filter",{attrs:{filterKey:"Year"},on:{change:e.onChangeFilter}})],1)])],1)]),r("div",{staticClass:"filter-block"},[r("div",{directives:[{name:"b-toggle",rawName:"v-b-toggle.accordion-8",modifiers:{"accordion-8":!0}}],staticClass:"filter-according-toggle",attrs:{role:"tab"}},[e._v("\n          Esposizione"),r("b-icon-chevron-up",{staticClass:"caret"})],1),r("b-collapse",{attrs:{id:"accordion-8",visible:"",accordion:"filter-accordion",role:"tabpanel"}},[r("div",{staticClass:"filter-body"},[r("checkbox-filter",{attrs:{filterKey:"Esposizione"},on:{change:e.onChangeFilter}})],1)])],1)])])},lt=[],ct=n("e67d"),ut=n.n(ct),ft=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-form-group",[n("b-form-checkbox-group",{attrs:{options:t.options,name:t.filterKey},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1)},dt=[],pt={name:"CheckboxFilter",props:["filterKey"],data:function(){return{selected:null}},computed:{options:function(){var t=this.$store.state.data.filterOptions[this.filterKey];return t&&t.map((function(t){return{text:t,value:t}}))},value:{get:function(){return this.$store.state.data.filters[this.filterKey]},set:function(t,e){this.change(t)}}},methods:{change:function(t){this.$emit("change",{filterKey:this.filterKey,val:t})}}},ht=pt,bt=Object(_["a"])(ht,ft,dt,!1,null,"2808d6c8",null),vt=bt.exports,gt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"range-filter"},[n("div",{staticClass:"input-block"},[n("label",[t._v("Min")]),n("b-form-input",{ref:"minInput",attrs:{value:t.minVal,type:"number",min:t.minRange,max:Math.min(t.maxRange,t.maxVal),step:"0.01"},on:{change:t.change}})],1),n("div",{staticClass:"input-block"},[n("label",[t._v("Max")]),n("b-form-input",{ref:"maxInput",attrs:{value:t.maxVal,type:"number",min:Math.max(t.minRange,t.minVal),max:t.maxRange,step:"0.01"},on:{change:t.change}})],1)])},mt=[],yt={name:"RangeFilter",props:["filterKey"],computed:{range:function(){return this.$store.state.data.filterOptions[this.filterKey]},value:function(){return this.$store.state.data.filters[this.filterKey]},minRange:function(){return this.range&&2==this.range.length?this.range[0].toFixed(2):0},maxRange:function(){return this.range&&2==this.range.length?this.range[1].toFixed(2):10},minVal:function(){return this.value&&2==this.value.length?this.value[0].toFixed(2):0},maxVal:function(){return this.value&&2==this.value.length?this.value[1].toFixed(2):10}},methods:{change:function(t){var e=Math.max(parseFloat(this.$refs.minInput.localValue),this.minRange),n=Math.min(parseFloat(this.$refs.maxInput.localValue),this.maxRange);e=Math.min(e,n),n=Math.max(e,n),this.$refs.minInput.localValue=e,this.$refs.maxInput.localValue=n,this.$emit("change",{filterKey:this.filterKey,val:[e,n]})}}},Ot=yt,xt=(n("d72c"),Object(_["a"])(Ot,gt,mt,!1,null,"1f0cff04",null)),wt=xt.exports,St=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"group-list-filter"},[n("div",{staticClass:"group-list-filter-controls"},[n("b-form-input",{staticClass:"search-input",attrs:{placeholder:"Search"},model:{value:t.searchTerm,callback:function(e){t.searchTerm=e},expression:"searchTerm"}}),n("div",{staticClass:"select-deselect-all"},[n("span",{staticClass:"select-all",on:{click:t.selectAll}},[t._v("Select all")]),t._v(" /\n      "),n("span",{staticClass:"select-all",on:{click:t.deselectAll}},[t._v("Deselect all")])])],1),n("div",{staticClass:"group-list"},t._l(t.filteredOption,(function(e){return n("div",{key:"g"+e.id},[n("input",{staticClass:"item-checkbox",attrs:{type:"checkbox",name:e.id},domProps:{checked:t.activeValues.includes(String(e.id))},on:{click:function(n){return t.toggleValue(e.id)}}}),t._v("\n      "+t._s(e.label)+" ("+t._s(e.count)+")\n    ")])})),0)])},Ct=[],jt=n("c46f"),kt={name:"GroupListFilter",props:["filterKey"],data:function(){return{searchTerm:""}},computed:{filteredOption:function(){var t=this;return this.searchTerm.length>0?this.options.filter((function(e){return e.label.includes(t.searchTerm)})):this.options},options:function(){var t=this,e=this.$store.state.data.filterOptions[this.filterKey],n=this.$store.state.data.csvData;return e&&e.map((function(e){return{id:e,label:"Application "+e,count:n.filter((function(n){return n[t.filterKey]==e})).length}}))},activeValues:function(){return this.$store.state.data.filters[this.filterKey]}},methods:{toggleValue:function(t){var e=this.activeValues.slice();e.includes(t)?e.splice(e.indexOf(t),1):e.push(t),this.$emit("change",{filterKey:this.filterKey,val:e})},selectAll:function(){var t=this.filteredOption.map((function(t){return t.id})),e=jt["a"].union(t,this.activeValues);this.$emit("change",{filterKey:this.filterKey,val:e})},deselectAll:function(){var t=this.filteredOption.map((function(t){return t.id})),e=jt["a"].difference(this.activeValues,t);this.$emit("change",{filterKey:this.filterKey,val:e})}}},Dt=kt,_t=(n("155c"),Object(_["a"])(Dt,St,Ct,!1,null,"3c7297bc",null)),Ft=_t.exports;function Et(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function Pt(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?Et(Object(n),!0).forEach((function(e){Object(l["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Et(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var At={name:"FilterSidebar",components:{RangeFilter:wt,CheckboxFilter:vt,GroupListFilter:Ft},data:function(){return{isOpen:!1}},computed:{},methods:Pt(Pt({},Object(S["c"])(["data/setFilterValue","data/resetFilters"])),{},{onChangeFilter:function(t,e){this["data/setFilterValue"](t,e)},toggleSidebar:function(){this.isOpen=!this.isOpen},hide:function(){this.isOpen=!1}}),directives:{ClickOutside:ut.a}},zt=At,$t=(n("7929"),Object(_["a"])(zt,st,lt,!1,null,"07cf15ea",null)),Bt=$t.exports,Tt=n("428d"),Rt=n.n(Tt),Vt={name:"app",components:{SlideContainer:T,ExportBar:ot,OptionsBar:Q,FilterSidebar:Bt,DataSelector:W},computed:{showApp:function(){return!0}},methods:{doExport:function(t,e){this.$refs.slide.exportImage(t,e)},onResize:function(){this.$refs.slide.resize()}},directives:{resize:Rt.a}},Kt=Vt,It=(n("7faf"),Object(_["a"])(Kt,i,a,!1,null,null,null)),Nt=It.exports,Mt=(n("28a5"),n("96cf"),n("3b8d")),Lt=(n("4f7f"),n("75fc")),Gt=["Code","State","Priority"],Ut=[{key:"Real Target",type:"group-list"},{key:"CVSS Score",type:"range"},{key:"Priority",type:"checkbox"},{key:"State",type:"checkbox"},{key:"Close Code",type:"checkbox"},{key:"Team Aziendale",type:"checkbox"},{key:"Year",type:"checkbox"},{key:"Esposizione",type:"checkbox",multiple:!0}],Wt={namespaced:!0,state:{loaded:!1,fetchingData:!1,firstLoad:!0,dataError:"",csvData:[],selectedDataSource:{localFile:null,remoteFileUrl:null},filters:{},filterOptions:{}},getters:{filteredData:function(t){var e=t.csvData;return Object.keys(t.filters).forEach((function(n){var r=Ut.find((function(t){return t.key==n}));"checkbox"==r.type?e=r.multiple?e.filter((function(e){return jt["a"].intersection(t.filters[n],e[n]).length>0})):e.filter((function(e){return t.filters[n].includes(e[n])})):"range"==r.type?e=e.filter((function(e){return t.filters[n][0]<=e[n]&&t.filters[n][1]>=e[n]})):"group-list"==r.type&&(e=e.filter((function(e){return t.filters[n].includes(String(e[n]))})))})),e}},mutations:{setData:function(t,e){t.fetchingData=!1,jt["a"].every(Gt,(function(t){return e.columns.includes(t)}))?(t.csvData=e,t.firstLoad=!1,t.loaded=!0,e.forEach((function(t,e){t.dataId=e,Ut.forEach((function(e){"checkbox"==e.type&&(t[e.key]=t[e.key]?t[e.key]:"N/A")}));var n=t["Esposizione"].replace(/\s/g,"");t["Esposizione"]=n.split(","),t["Age"]<90?t["Sla"]="< 3":t["Age"]>=90&&t["Age"]<180?t["Sla"]="3":t["Age"]>=180&&t["Age"]<365?t["Sla"]="6":t["Age"]>365&&(t["Sla"]="> 12")})),Ut.forEach((function(n){var i=[];if("checkbox"==n.type){var a=[];a=n.multiple?Object(Lt["a"])(new Set(jt["a"].flatten(e.map((function(t){return t[n.key]}))))):Object(Lt["a"])(new Set(e.map((function(t){return t[n.key]})))),i=a.filter((function(t){return t})).sort((function(t,e){return t-e}))}else if("range"==n.type){var o=e.map((function(t){return parseFloat(t[n.key])}));i=[Math.min.apply(Math,Object(Lt["a"])(o)),Math.max.apply(Math,Object(Lt["a"])(o))]}else"group-list"==n.type&&(i=Object.keys(jt["a"].groupBy(e,(function(t){return t[n.key]}))));r["default"].set(t.filterOptions,n.key,i.slice()),r["default"].set(t.filters,n.key,i.slice())}))):(t.csvData=[],t.hierarchy=[],t.dataError="Wrong CSV format.")},setFilterValue:function(t,e){r["default"].set(t.filters,e.filterKey,e.val)},setExcludeNodes:function(t,e){r["default"].set(t.filters,"excludeNodes",e)},setDataError:function(t,e){t.loaded=!1,t.fetchingData=!1,t.dataError=e},resetFilters:function(t){var e=Object.assign({},t.filterOptions);r["default"].set(t,"filters",Object.assign({},e))}},actions:{loadTestData:function(){var t=Object(Mt["a"])(regeneratorRuntime.mark((function t(e){var n,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.state,r=e.commit,n.loaded=!1,n.fetchingData=!0,t.next=5,x["e"]("./data/test.csv",x["a"]).catch((function(t){return r("setDataError","Could not open test data")}));case 5:i=t.sent,r("setData",i),r("resetFilters");case 8:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),loadDataFromFile:function(t,e){var n=t.state,r=t.commit;if(e){n.loaded=!1,n.fetchingData=!0,n.dataError="",n.selectedDataSource={localFile:e,remoteFileUrl:null};var i=new FileReader;i.onloadend=function(){var t=Object(Mt["a"])(regeneratorRuntime.mark((function t(n){var i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=n.target.result,t.next=3,x["e"](i,x["a"]).catch((function(t){return r("setDataError","Could not open CSV file. "+t.message)}));case 3:a=t.sent,r("setData",a),r("setSlideTitleFromData",e.name,{root:!0}),r("resetFilters");case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),i.onerror=function(){var t=Object(Mt["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r("setDataError","Could not open CSV file.");case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),i.readAsDataURL(e)}},loadData:function(){var t=Object(Mt["a"])(regeneratorRuntime.mark((function t(e,n){var r,i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.state,i=e.commit,r.loaded=!1,r.fetchingData=!0,r.dataError="",r.selectedDataSource={localFile:null,remoteFileUrl:n},t.next=7,x["e"](Object({NODE_ENV:"production",BASE_URL:"/fw-vulnerabilities/"}).VUE_APP_SCRAPER_URL+"data/"+n,x["a"]).catch((function(t){i("setDataError","Could not open CSV file. "+t.message)}));case 7:a=t.sent,a&&(i("setData",a),i("setSlideTitleFromData",n,{root:!0}),i("resetFilters"));case 9:case"end":return t.stop()}}),t)})));function e(e,n){return t.apply(this,arguments)}return e}()}};n("bc3a");r["default"].use(S["a"]);var Ht=new S["a"].Store({modules:{data:Wt},state:{groupBy:"State",colorBy:"Priority",sortBy:"count",dotSize:5,slideTitle:"",slideSource:"",slideSize:"1920:1080",remoteFileList:[]},getters:{slideSizeArray:function(t){return t.slideSize.split(":")}},mutations:{setGroupBy:function(t,e){t.groupBy=e},setColorBy:function(t,e){t.colorBy=e},setSortBy:function(t,e){t.sortBy=e},setDotSize:function(t,e){t.dotSize=+e},setslideTitle:function(t,e){t.slideTitle=e},setSlideTitleFromData:function(t,e){t.slideTitle=e.substring(0,e.lastIndexOf(".")).split("T")[0]},setSlideSource:function(t,e){t.slideSource=e},setSlideSize:function(t,e){t.slideSize=e},setRemoteFileList:function(t,e){t.remoteFileList=e}},actions:{}}),Yt=n("5f5b"),Jt=n("b1e0"),qt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-button",{staticClass:"fw-button text-uppercase",attrs:{variant:"warning"},on:{click:t.onClick}},[t._t("default")],2)},Xt=[],Qt={name:"FWButton",methods:{onClick:function(t){this.$emit("click",t)}}},Zt=Qt,te=(n("dea7"),Object(_["a"])(Zt,qt,Xt,!1,null,"3d333265",null)),ee=te.exports,ne=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"fw-option-select"},[n("label",{staticClass:"fw-option-select-label"},[t._v(t._s(t.label))]),n("b-form-select",{attrs:{value:t.value,options:t.options},on:{change:t.onChange}})],1)},re=[],ie={name:"FWOptionSelect",props:["label","value","options"],methods:{onChange:function(t){this.$emit("change",t)}}},ae=ie,oe=(n("7663"),Object(_["a"])(ae,ne,re,!1,null,"364dfca4",null)),se=oe.exports,le=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"fw-input"},[n("label",{staticClass:"fw-option-select-label"},[t._v(t._s(t.label))]),n("b-form-input",{attrs:{value:t.value,placeholder:t.placeholder},on:{input:t.onInput}})],1)},ce=[],ue={name:"FWInput",props:["label","value","placeholder"],methods:{onInput:function(t){this.$emit("input",t)}}},fe=ue,de=(n("e259"),Object(_["a"])(fe,le,ce,!1,null,"9e4c7c7e",null)),pe=de.exports,he=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"fw-input"},[n("label",{staticClass:"fw-option-select-label"},[t._v(t._s(t.label)+" ("+t._s(t.value)+")")]),n("b-form-input",{attrs:{type:"range",value:t.value,min:t.min,max:t.max},on:{input:t.onInput}})],1)},be=[],ve={name:"FWInput",props:["label","value","max","min"],methods:{onInput:function(t){this.$emit("input",t)}}},ge=ve,me=(n("521b"),Object(_["a"])(ge,he,be,!1,null,"0d952d76",null)),ye=me.exports;n("f9e3"),n("2dd8");r["default"].use(Yt["a"]),r["default"].use(Jt["a"]),r["default"].component("fw-button",ee),r["default"].component("fw-select",se),r["default"].component("fw-input",pe),r["default"].component("fw-slider",ye),r["default"].config.productionTip=!1,new r["default"]({store:Ht,render:function(t){return t(Nt)}}).$mount("#app")},"591f":function(t,e,n){},"5f2c":function(t,e,n){},6484:function(t,e,n){t.exports=n.p+"img/fwlogo.b687bbeb.svg"},7663:function(t,e,n){"use strict";var r=n("591f"),i=n.n(r);i.a},7929:function(t,e,n){"use strict";var r=n("c144"),i=n.n(r);i.a},"7e42":function(t,e,n){"use strict";var r=n("5f2c"),i=n.n(r);i.a},"7faf":function(t,e,n){"use strict";var r=n("8fba"),i=n.n(r);i.a},"8fba":function(t,e,n){},"96a4":function(t,e,n){},c144:function(t,e,n){},c9a6:function(t,e,n){},ca41:function(t,e,n){},d5e6:function(t,e,n){},d72c:function(t,e,n){"use strict";var r=n("2849"),i=n.n(r);i.a},dea7:function(t,e,n){"use strict";var r=n("96a4"),i=n.n(r);i.a},e259:function(t,e,n){"use strict";var r=n("14fd"),i=n.n(r);i.a}});
//# sourceMappingURL=app.af22ac24.js.map