(this.webpackJsonpfft_frontend=this.webpackJsonpfft_frontend||[]).push([[0],{353:function(e,t,a){e.exports=a(524)},383:function(e,t,a){},524:function(e,t,a){"use strict";a.r(t);var r=a(4),n=a.n(r),o=a(94),c=a.n(o),l=a(132),i=a(320),s=a(322),u=a(56),d=a.n(u),m=a(85),p=a(134),f=a(120),v=a.n(f),h=function(){var e=Object(m.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("/countries");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INIT_COUNTRYCODES":return Object(p.a)({},e,{countryCodes:t.countryCodes});default:return e}},b={getImports:function(){var e=Object(m.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("/imports/".concat(t));case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getExports:function(){var e=Object(m.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("/exports/".concat(t));case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getTradeBalance:function(){var e=Object(m.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("/tradebalance");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),getSitc2Data:function(){var e=Object(m.a)(d.a.mark((function e(t,a){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("/SITC2/".concat(a,"/").concat(t));case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),getSitc2CountryData:function(){var e=Object(m.a)(d.a.mark((function e(t,a,r){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("/SITC2/".concat(t,"/").concat(a,"/").concat(r[0].code));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t,a,r){return e.apply(this,arguments)}}()},E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{flow:"exports"},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INIT_TRADEDATA":return Object(p.a)({},e,{exportsData:t.exportsData,importsData:t.importsData,tradeBalance:t.tradeBalance,sitc2Data:t.sitc2Data});case"SET_FLOW":return Object(p.a)({},e,{flow:t.flow});default:return e}},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{darkModeActive:!0},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_MODE":return Object(p.a)({},e,{darkModeActive:!e.darkModeActive});default:return e}},x=Object(l.combineReducers)({tradeData:E,countryData:g,colorMode:y}),w=Object(l.createStore)(x,Object(i.composeWithDevTools)(Object(l.applyMiddleware)(s.a))),k=a(133),O=a(70),j=a(173),C=a.n(j),D=a(537),F=a(535),T=(a(383),a(541)),I=a(544),A=a(542),S=a(158),M=a(538),N=a(545),B=function(e){var t=e.country,a=e.tradeData,r=e.flow;return n.a.createElement(M.a,{inverted:!0,basic:!0,compact:!0,celled:!0,selectable:!0,singleLine:!0},n.a.createElement(M.a.Header,null,n.a.createElement(M.a.Row,null,n.a.createElement(M.a.HeaderCell,{colSpan:"2",textAlign:"center"},n.a.createElement(N.a,{as:"h3",style:{color:"#fff"}},"Finland ",r," ",t[0].name)))),n.a.createElement(M.a.Body,null,a.slice(0,10).map((function(e){return n.a.createElement(M.a.Row,{key:e.group},n.a.createElement(M.a.Cell,null,e.group),n.a.createElement(M.a.Cell,null,e.value," \u20ac"))}))))},R=function(e){var t=e.country,a=e.setCountry,o=e.setCountryFilter,c=e.year,l=Object(r.useState)([]),i=Object(O.a)(l,2),s=i[0],u=i[1],d=Object(r.useState)([]),m=Object(O.a)(d,2),p=m[0],f=m[1];return Object(r.useEffect)((function(){b.getSitc2CountryData("imports",c,t).then((function(e){u(e.data)})),b.getSitc2CountryData("exports",c,t).then((function(e){f(e.data)}))}),[t,c]),0===t.length?null:0===s.length&&0===p.length?n.a.createElement(T.a,{active:!0},n.a.createElement(F.a,null)):n.a.createElement(I.a,{container:!0,stackable:!0,relaxed:!0},n.a.createElement(A.a,{icon:!0,circular:!0,onClick:function(){o(""),a([])},style:{position:"absolute",top:"1em",left:"1em"}},n.a.createElement(S.a,{name:"angle left",size:"large"})),n.a.createElement(I.a.Row,{columns:2},n.a.createElement(I.a.Column,null,n.a.createElement(B,{country:t,tradeData:s,flow:"imported from"})),n.a.createElement(I.a.Column,null,n.a.createElement(B,{country:t,tradeData:p,flow:"exported to"}))))},L=a(540),P=a(228),Y=a.n(P),_=function(e){var t=e.handleCountryFilterChange,a=e.countryCodes,o=Object(r.useState)(""),c=Object(O.a)(o,2),l=c[0],i=c[1],s=Object(r.useState)(!1),u=Object(O.a)(s,2),d=u[0],m=u[1],p=Object(r.useState)([]),f=Object(O.a)(p,2),v=f[0],h=f[1];if(void 0===a)return null;var g=a.map((function(e){return{title:e.name,key:e.code}}));return n.a.createElement(L.a,{placeholder:"Search...",loading:d,onResultSelect:function(e,a){var r=a.result;i(r.title),t(r.title)},onSearchChange:Y.a.debounce((function(e,a){var r=a.value;if(m(!0),i(r),m(!0),i(r),r.length<1)return i(""),m(!1),void h([]);var n=new RegExp(Y.a.escapeRegExp(r),"i");m(!1);var o=Y.a.filter(g,(function(e){return n.test(e.title)}));o.length>20?h([{title:"Please narrow down your search."}]):h(o),1===v.length&&t(v[0].title)}),500,{leading:!0}),results:v,resultRenderer:function(e){var t=e.title;return n.a.createElement("div",null,t)},value:l})},H=a(543),W=function(e){var t=e.darkModeActive;return n.a.createElement(H.a,{secondary:!0,className:t?"footer inverted dark-mode":"footer"},n.a.createElement(H.a.Item,{link:!0,as:"a",href:"https://github.com/joonaspartanen/finnish-foreign-trade"},"About"))},z=function(e){var t=e.flow,a=e.setFlow,r="exports"===t;return n.a.createElement("div",{style:{position:"absolute",bottom:"2em",left:"2em",zIndex:"1"}},n.a.createElement(A.a.Group,null,n.a.createElement(A.a,{toggle:!0,active:r,content:"Exports",onClick:function(e){r||a("exports")}}),n.a.createElement(A.a,{toggle:!0,active:!r,content:"Imports",onClick:function(e){r&&a("imports")}})))},G=a(330),X=a(43),Z=a(174),q=a(342),J=function(e){var t=e.imports,a=e.exports,o=e.flow,c=Object(r.useRef)(null);return X.f(q.a),Object(r.useEffect)((function(){var e=X.d("mapdiv",Z.a);e.geodata=G.a,e.projection=new Z.d.Mercator,e.zoomControl=new Z.c,e.backgroundSeries.mapPolygons.template.polygon.fill=X.b("#EEE"),e.backgroundSeries.mapPolygons.template.polygon.fillOpacity=1,e.chartContainer.wheelable=!1,window.innerHeight>window.innerWidth?(e.homeZoomLevel=5,e.minZoomLevel=5):(e.homeZoomLevel=2,e.minZoomLevel=2),e.homeGeoPoint={latitude:50,longitude:11},e.maxPanOut=0;var r=function(e){var r="exports"===e?"#5E5B78":"#C17D80",o=new Z.b;return o.name=e.charAt(0).toUpperCase()+e.slice(1),o.id=e,o.heatRules.push({property:"fill",target:o.mapPolygons.template,min:X.b(r).brighten(1.2),max:X.b(r).brighten(-.4)}),o.useGeodata=!0,o.exclude=["AQ","SJ"],o.data="exports"===e?a:t,o.tooltip.getFillFromObject=!1,o.tooltip.background.fill=X.b("#333"),o.tooltip.background.fillOpacity=.8,o.mapPolygons.template.tooltipHTML='\n      <div class="tooltip">\n        Total '.concat("exports"===e?"exports from Finland to {name}":"imports from {name} to Finland"," ({year.formatNumber('#')}):\n        <br>\n        {euros} \u20ac\n      </div>\n      "),o.tooltip.label.interactionsEnabled=!0,o.mapPolygons.template.nonScalingStroke=!0,o.mapPolygons.template.strokeWidth=.5,o.mapPolygons.template.states.create("hover").properties.fill=X.b("#555"),n(o),o},n=function(t){e.events.on("ready",(function(){var e=t.getPolygonById("FI");e.fill=X.b("#FFF"),e.tooltipText="",e.tooltipHTML=null,e.hoverable=!1}))},o=r("exports"),l=r("imports");return l.hidden=!0,e.series.push(o),e.series.push(l),c.current=e,function(){e.dispose()}}),[t,a]),Object(r.useEffect)((function(){var e=c.current.series.getIndex(0),t=c.current.series.getIndex(1);"exports"===o?(e.show(),t.hide()):(t.show(),e.hide())}),[o]),n.a.createElement("div",{id:"mapdiv",style:{width:"100%",height:"100%",overflow:"hidden"}})},U=function(e){var t=e.imports,a=e.exports,o=(e.year,Object(r.useState)("exports")),c=Object(O.a)(o,2),l=c[0],i=c[1];return console.log(t),console.log(a),void 0===t||void 0===a?n.a.createElement(T.a,{active:!0},n.a.createElement(F.a,null)):n.a.createElement(n.a.Fragment,null,n.a.createElement(z,{flow:l,setFlow:i}),n.a.createElement(J,{imports:t,exports:a,flow:l}))},Q=a(539),V=a(536),K=function(e){var t=e.year,a=e.setYear,r=e.darkModeActive,o=Object(k.b)();return n.a.createElement(H.a,{as:"nav",stackable:!0,size:"large",className:r?"navbar dark-mode":"navbar"},n.a.createElement(H.a.Item,{header:!0},"Finnish Foreign Trade Visualized"),n.a.createElement(H.a.Item,{link:!0,as:"a",href:"#trade-map"},"Trade Map"),n.a.createElement(H.a.Item,{link:!0,as:"a",href:"#trade-balance"},"Trade Balance"),n.a.createElement(H.a.Item,{link:!0,as:"a",href:"#imports-by-product"},"By product group"),n.a.createElement(H.a.Item,{link:!0,as:"a",href:"#trade-partners"},"By trade partner"),n.a.createElement(H.a.Item,null,n.a.createElement(Q.a,{onChange:function(e,t){var r=t.value;return a(r)},options:[{key:2019,text:"2019",value:2019},{key:2018,text:"2018",value:2018},{key:2017,text:"2017",value:2017},{key:2016,text:"2016",value:2016},{key:2015,text:"2015",value:2015},{key:2014,text:"2014",value:2014},{key:2013,text:"2013",value:2013},{key:2012,text:"2012",value:2012}],placeholder:"Year",selection:!0,value:t})),n.a.createElement(H.a.Item,{className:"color-mode-toggle"},n.a.createElement(S.a,{name:"moon"}),n.a.createElement(V.a,{onChange:function(){return o((function(e){e({type:"CHANGE_MODE"})}))},toggle:!0}),n.a.createElement(S.a,{name:"sun"})))},$=a(91),ee=a(226),te=a(227),ae=function(e){var t=e.sitc2Data,a=e.flow,o=e.year,c=Object(r.useRef)(null);return X.f(ee.a),X.f(te.a),Object(r.useEffect)((function(){var e=X.d("products-treemap-div",$.d);e.responsive.enabled=!0,e.data=t.exports,e.dataFields.value="value",e.dataFields.name="group",e.dataFields.children="children";var a=e.seriesTemplates.create("1"),r=a.columns.template;return r.tooltipText="{group}: {value} \u20ac",a.tooltip.pointerOrientation="down",e.legend=new $.c,e.legend.position="bottom",e.legend.paddingTop=20,e.legend.itemContainers.template.tooltipText="{group}",e.legend.labels.template.text="",e.seriesTemplates.create("0").columns.template.states.create("hover").adapter.add("fill",(function(e){return X.b(X.c.brighten(e.rgb,-.2))})),r.states.create("hover").adapter.add("fill",(function(e){return X.b(X.c.brighten(e.rgb,-.2))})),e.maxLevels=1,e.responsive.rules.push({relevant:X.a.widthXL,state:function(e,t){if(e instanceof $.c){var a=e.states.create(t);return a.sprite.itemContainers.template.clickable=!1,a.sprite.itemContainers.template.focusable=!1,a}return null}}),c.current=e,function(){e.dispose()}}),[t]),Object(r.useEffect)((function(){c.current.data=t[a]}),[t,a]),n.a.createElement("div",{style:{width:"100%",height:"100vh",paddingTop:"3em",paddingRight:"10vw",paddingLeft:"10vw",textAlign:"center"}},n.a.createElement(N.a,{inverted:!0,as:"h3"},"Finnish ",a," by product category (",o,")"),n.a.createElement("div",{id:"products-treemap-div",style:{width:"100%",height:"90%"}}))},re=function(e){var t=e.sitc2Data,a=e.year,o=Object(r.useState)("exports"),c=Object(O.a)(o,2),l=c[0],i=c[1];return void 0===t?n.a.createElement(T.a,{active:!0},n.a.createElement(F.a,null)):n.a.createElement(n.a.Fragment,null,n.a.createElement(z,{flow:l,setFlow:i}),n.a.createElement(ae,{sitc2Data:t,flow:l,year:a}))},ne=function(e){var t=e.tradeBalance;return Object(r.useEffect)((function(){X.f(ee.a),X.f(te.a);var e=X.d("chartdiv",$.f);e.responsive.enabled=!0,e.rotate=!0,e.data=t,e.marginRight="100";var a=e.xAxes.push(new $.a);a.dataFields.category="year",a.numberFormatter.numberFormat="#",a.renderer.inversed=!0,a.renderer.grid.template.location=0,a.renderer.cellStartLocation=.1,a.renderer.cellEndLocation=.9;var r=e.yAxes.push(new $.e);r.numberFormatter.numberFormat="##.##a",r.numberFormatter.bigNumberPrefixes=[{number:1e9,suffix:"B"}];var n=e.series.push(new $.b);n.name="Trade Balance",n.fill=X.b("#2E8B57"),n.strokeWidth=0,n.dataFields.valueY="tradeBalance",n.dataFields.categoryX="year",n.columns.template.height=X.e(100),n.sequencedInterpolation=!0,n.columns.template.tooltipText="{name}:\n\u20ac{valueY}",n.columns.template.adapter.add("fill",(function(e,t){return t.dataItem&&t.dataItem.valueY<0?X.b("#800000"):e}));var o=e.series.push(new $.b);o.name="Imports to Finland",o.fill=X.b("#63718B"),o.strokeWidth=0,o.dataFields.valueY="imports",o.dataFields.categoryX="year",o.columns.template.height=X.e(100),o.sequencedInterpolation=!0,o.columns.template.tooltipText="{name}:\n\u20ac{valueY}";var c=e.series.push(new $.b);return c.name="Exports from Finland",c.fill=X.b("#EBA05C"),c.strokeWidth=0,c.dataFields.valueY="exports",c.dataFields.categoryX="year",c.columns.template.height=X.e(100),c.sequencedInterpolation=!0,c.columns.template.tooltipText="{name}:\n\u20ac{valueY}",function(){e&&e.dispose()}}),[t]),n.a.createElement("div",{style:{width:"100%",height:"100%",overflow:"hidden",paddingTop:"3em",textAlign:"center"}},n.a.createElement(N.a,{inverted:!0,as:"h3"},"Finnish Trade Balance"),n.a.createElement("div",{id:"chartdiv",style:{width:"100%",height:"95%"}}))},oe=function(){var e=Object(k.b)(),t=Object(r.useState)(2019),a=Object(O.a)(t,2),o=a[0],c=a[1],l=Object(r.useState)([]),i=Object(O.a)(l,2),s=i[0],u=i[1],p=Object(r.useState)(""),f=Object(O.a)(p,2),v=f[0],g=f[1],E=Object(k.c)((function(e){return e})),y=E.tradeData,x=E.countryData.countryCodes;return console.log(E),Object(r.useEffect)((function(){e(function(e){return function(){var t=Object(m.a)(d.a.mark((function t(a){var r,n,o,c;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.getExports(e);case 2:return r=t.sent,t.next=5,b.getImports(e);case 5:return n=t.sent,t.next=8,b.getTradeBalance();case 8:return o=t.sent,t.next=11,b.getSitc2Data(e,"total");case 11:c=t.sent,a({type:"INIT_TRADEDATA",exportsData:r,importsData:n,tradeBalance:o,sitc2Data:c});case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(o)),e(function(){var e=Object(m.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h();case 2:a=e.sent,t({type:"INIT_COUNTRYCODES",countryCodes:a});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[o,e]),n.a.createElement("div",{className:E.colorMode.darkModeActive?"main-container dark-mode":"main-container"},n.a.createElement(D.a,{fluid:!0},n.a.createElement(K,{year:o,setYear:c,darkModeActive:E.colorMode.darkModeActive}),(void 0===y.importsData||void 0===y.exportsData)&&n.a.createElement("div",{style:{height:"100vh"}},n.a.createElement(F.a,{active:!0})),void 0!==y.importsData&&void 0!==y.exportsData&&n.a.createElement("div",null,n.a.createElement(C.a,{id:"trade-map"},n.a.createElement("section",{className:E.colorMode.darkModeActive?"chart-section dark-mode":"chart-section"},n.a.createElement(U,{imports:y.importsData,exports:y.exportsData}),n.a.createElement("a",{href:"#trade-balance",className:"anchor-link"},n.a.createElement("div",{className:"arrow-down"})))),n.a.createElement(C.a,{id:"trade-balance"},n.a.createElement("section",{className:E.colorMode.darkModeActive?"chart-section dark-mode":"chart-section"},n.a.createElement(ne,{tradeBalance:y.tradeBalance}),n.a.createElement("a",{href:"#imports-by-product",className:"anchor-link"},n.a.createElement("div",{className:"arrow-down"})))),n.a.createElement(C.a,{id:"imports-by-product"},n.a.createElement("section",{className:E.colorMode.darkModeActive?"chart-section dark-mode":"chart-section"},n.a.createElement(re,{sitc2Data:y.sitc2Data,year:o}),n.a.createElement("a",{href:"#trade-partners",className:"anchor-link"},n.a.createElement("div",{className:"arrow-down"})))),n.a.createElement(C.a,{id:"trade-partners"},n.a.createElement("section",{className:E.colorMode.darkModeActive?"chart-section dark-mode":"chart-section"},0===s.length&&n.a.createElement(_,{countryFilter:v,handleCountryFilterChange:function(e){g(e);var t=x.filter((function(t){return t.name===e}));u(t)},countryCodes:x}),0!==s.length&&n.a.createElement(R,{country:s,setCountry:u,setCountryFilter:g,year:o})))),n.a.createElement(W,{darkModeActive:E.colorMode.darkModeActive})))};c.a.render(n.a.createElement(k.a,{store:w},n.a.createElement(oe,null)),document.getElementById("root"))}},[[353,1,3]]]);
//# sourceMappingURL=main.70a57872.chunk.js.map