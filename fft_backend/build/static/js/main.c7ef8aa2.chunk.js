(this.webpackJsonpfft_frontend=this.webpackJsonpfft_frontend||[]).push([[0],{348:function(e,t,a){e.exports=a(518)},353:function(e,t,a){},518:function(e,t,a){"use strict";a.r(t);var n=a(4),r=a.n(n),l=a(115),o=a.n(l),c=a(54),i=(a(353),a(48)),s=a(170),u=a(334),d=a(317),m=function(e){var t=e.imports,a=e.exports,l=e.flow,o=(e.year,null),c="#5E5B78",m="#4B0000";return"exports"===l?(o=a,c="#5E5B78",m="#4B0000"):(o=t,c="#C17D80",m="#161331"),Object(n.useEffect)((function(){console.log(l),console.log(a),console.log(t),i.e(u.a);var e=i.c("mapdiv",s.a);e.geodata=d.a,e.projection=new s.d.Mercator,e.zoomControl=new s.c,e.backgroundSeries.mapPolygons.template.polygon.fill=i.b("#EEE"),e.backgroundSeries.mapPolygons.template.polygon.fillOpacity=1,e.chartContainer.wheelable=!1,window.innerHeight>window.innerWidth?(e.homeZoomLevel=5,e.minZoomLevel=5):(e.homeZoomLevel=2,e.minZoomLevel=2),e.homeGeoPoint={latitude:50,longitude:11},e.maxPanOut=0;var n=e.series.push(new s.b);n.heatRules.push({property:"fill",target:n.mapPolygons.template,min:i.b(c).brighten(1.4),max:i.b(c).brighten(-.6)}),n.useGeodata=!0,n.exclude=["AQ","SJ"],n.data=o;var r=n.mapPolygons.template;return r.tooltipText="{name}: {euros} \u20ac",r.nonScalingStroke=!0,r.strokeWidth=.5,e.events.on("ready",(function(){var e=n.getPolygonById("FI");e.fill=i.b("#FFF"),e.tooltipText=""})),r.states.create("hover").properties.fill=i.b(m),function(){e&&e.dispose()}}),[o,c,m,a,t,l]),r.a.createElement("div",{id:"mapdiv",style:{width:"100%",height:"100%",overflow:"hidden"}})},p=a(519),f=function(e){var t=e.setFlow,a=Object(n.useState)(!0),l=Object(c.a)(a,2),o=l[0],i=l[1];return r.a.createElement("div",{style:{position:"absolute",bottom:"2em",left:"2em"}},r.a.createElement(p.a.Group,null,r.a.createElement(p.a,{toggle:!0,active:o,content:"Exports",onClick:function(e){o||(i(!0),t("exports"))}}),r.a.createElement(p.a,{toggle:!0,active:!o,content:"Imports",onClick:function(e){o&&(i(!1),t("imports"))}})))},h=a(91),v=a(223),g=a(224),b=a(541),E=function(e){var t=e.tradeBalance;return Object(n.useEffect)((function(){i.e(v.a),i.e(g.a);var e=i.c("chartdiv",h.f);e.responsive.enabled=!0,e.rotate=!0,e.data=t,e.marginRight="100";var a=e.xAxes.push(new h.a);a.dataFields.category="year",a.numberFormatter.numberFormat="#",a.renderer.inversed=!0,a.renderer.grid.template.location=0,a.renderer.cellStartLocation=.1,a.renderer.cellEndLocation=.9;var n=e.yAxes.push(new h.e);n.numberFormatter.numberFormat="##.##a",n.numberFormatter.bigNumberPrefixes=[{number:1e9,suffix:"B"}];var r=e.series.push(new h.b);r.name="Trade Balance",r.fill=i.b("#2E8B57"),r.strokeWidth=0,r.dataFields.valueY="tradeBalance",r.dataFields.categoryX="year",r.columns.template.height=i.d(100),r.sequencedInterpolation=!0,r.columns.template.tooltipText="{name}:\n\u20ac{valueY}",r.columns.template.adapter.add("fill",(function(e,t){return t.dataItem&&t.dataItem.valueY<0?i.b("#800000"):e}));var l=e.series.push(new h.b);l.name="Imports to Finland",l.fill=i.b("#63718B"),l.strokeWidth=0,l.dataFields.valueY="imports",l.dataFields.categoryX="year",l.columns.template.height=i.d(100),l.sequencedInterpolation=!0,l.columns.template.tooltipText="{name}:\n\u20ac{valueY}";var o=e.series.push(new h.b);return o.name="Exports from Finland",o.fill=i.b("#EBA05C"),o.strokeWidth=0,o.dataFields.valueY="exports",o.dataFields.categoryX="year",o.columns.template.height=i.d(100),o.sequencedInterpolation=!0,o.columns.template.tooltipText="{name}:\n\u20ac{valueY}",function(){e&&e.dispose()}}),[t]),r.a.createElement("div",{style:{width:"100%",height:"100%",overflow:"hidden",paddingTop:"3em",textAlign:"center"}},r.a.createElement(b.a,{inverted:!0,as:"h3"},"Finnish Trade Balance"),r.a.createElement("div",{id:"chartdiv",style:{width:"100%",height:"95%"}}))},y=a(80),w=a.n(y),x=a(132),C=a.n(x),O=function(e){var t;return w.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,w.a.awrap(C.a.get("/imports/".concat(e)));case 2:return t=a.sent,a.abrupt("return",t);case 4:case"end":return a.stop()}}))},j=function(e){var t;return w.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,w.a.awrap(C.a.get("/exports/".concat(e)));case 2:return t=a.sent,a.abrupt("return",t);case 4:case"end":return a.stop()}}))},k=function(){var e;return w.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.a.awrap(C.a.get("/tradebalance"));case 2:return e=t.sent,t.abrupt("return",e);case 4:case"end":return t.stop()}}))},F=function(e,t){var a;return w.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,w.a.awrap(C.a.get("/SITC2/".concat(t,"/").concat(e)));case 2:return a=n.sent,n.abrupt("return",a);case 4:case"end":return n.stop()}}))},S=function(e,t,a){var n;return w.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,w.a.awrap(C.a.get("/SITC2/".concat(e,"/").concat(t,"/").concat(a[0].code)));case 2:return n=r.sent,r.abrupt("return",n);case 4:case"end":return r.stop()}}))},I=function(){var e;return w.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.a.awrap(C.a.get("/countries"));case 2:return e=t.sent,t.abrupt("return",e);case 4:case"end":return t.stop()}}))},T=a(538),B=a(530),R=a(540),L=a(131),N=a(536),Y=function(e){var t=e.country,a=e.tradeData,n=e.flow;return r.a.createElement(N.a,{inverted:!0,basic:!0,compact:!0,celled:!0,selectable:!0,singleLine:!0},r.a.createElement(N.a.Header,null,r.a.createElement(N.a.Row,null,r.a.createElement(N.a.HeaderCell,{colSpan:"2",textAlign:"center"},r.a.createElement(b.a,{as:"h3",style:{color:"#fff"}},"Finland ",n," ",t[0].name)))),r.a.createElement(N.a.Body,null,a.slice(0,10).map((function(e){return r.a.createElement(N.a.Row,{key:e.group},r.a.createElement(N.a.Cell,null,e.group),r.a.createElement(N.a.Cell,null,e.value," \u20ac"))}))))},A=function(e){var t=e.country,a=e.setCountry,l=e.setCountryFilter,o=e.year,i=Object(n.useState)([]),s=Object(c.a)(i,2),u=s[0],d=s[1],m=Object(n.useState)([]),f=Object(c.a)(m,2),h=f[0],v=f[1];return Object(n.useEffect)((function(){S("imports",o,t).then((function(e){d(e.data)})),S("exports",o,t).then((function(e){v(e.data)}))}),[t]),0===t.length?null:0===u.length&&0===h.length?r.a.createElement(T.a,{active:!0},r.a.createElement(B.a,null)):r.a.createElement(R.a,{container:!0,stackable:!0,relaxed:!0},r.a.createElement(p.a,{icon:!0,circular:!0,onClick:function(){l(""),a([])},style:{position:"absolute",top:"1em",left:"1em"}},r.a.createElement(L.a,{name:"angle left",size:"large"})),r.a.createElement(R.a.Row,{columns:2},r.a.createElement(R.a.Column,null,r.a.createElement(Y,{country:t,tradeData:u,flow:"imported from"})),r.a.createElement(R.a.Column,null,r.a.createElement(Y,{country:t,tradeData:h,flow:"exported to"}))))},P=a(537),D=a(225),G=a.n(D),W=function(e){var t=e.handleCountryFilterChange,a=e.countryNames,l=Object(n.useState)(""),o=Object(c.a)(l,2),i=o[0],s=o[1],u=Object(n.useState)(!1),d=Object(c.a)(u,2),m=d[0],p=d[1],f=Object(n.useState)([]),h=Object(c.a)(f,2),v=h[0],g=h[1];return r.a.createElement(P.a,{placeholder:"Search...",loading:m,onResultSelect:function(e,a){var n=a.result;s(n.title),t(n.title)},onSearchChange:G.a.debounce((function(e,n){var r=n.value;if(p(!0),s(r),p(!0),s(r),r.length<1)return s(""),p(!1),void g([]);var l=new RegExp(G.a.escapeRegExp(r),"i");p(!1);var o=G.a.filter(a,(function(e){return l.test(e.title)}));o.length>20?g([{title:"Please narrow down your search."}]):g(o),1===v.length&&t(v[0].title)}),500,{leading:!0}),results:v,resultRenderer:function(e){var t=e.title;return r.a.createElement("div",null,t)},value:i})},z=a(539),H=a(535),X=function(e){var t=e.year,a=e.setYear;return r.a.createElement(z.a,{inverted:!0,stackable:!0,size:"large",style:{backgroundColor:"#333",marginBottom:"0px"}},r.a.createElement(z.a.Item,{header:!0},"Finnish Foreign Trade Visualized"),r.a.createElement(z.a.Item,{link:!0,as:"a",href:"#trade-map"},"Trade Map"),r.a.createElement(z.a.Item,{link:!0,as:"a",href:"#trade-balance"},"Trade Balance"),r.a.createElement(z.a.Item,{link:!0,as:"a",href:"#imports-by-product"},"By product group"),r.a.createElement(z.a.Item,{link:!0,as:"a",href:"#trade-partners"},"By trade partner"),r.a.createElement(z.a.Item,null,r.a.createElement(H.a,{onChange:function(e,t){var n=t.value;return a(n)},options:[{key:2019,text:"2019",value:2019},{key:2018,text:"2018",value:2018},{key:2017,text:"2017",value:2017},{key:2016,text:"2016",value:2016},{key:2015,text:"2015",value:2015},{key:2014,text:"2014",value:2014},{key:2013,text:"2013",value:2013},{key:2012,text:"2012",value:2012}],placeholder:"Year",selection:!0,value:t})))},Z=function(){return r.a.createElement(z.a,{inverted:!0,secondary:!0,style:{backgroundColor:"#333",marginTop:"0px"}},r.a.createElement(z.a.Item,{link:!0,as:"a",href:"https://github.com/joonaspartanen/finnish-foreign-trade"},"About"))},q=a(532),J=a(169),M=a.n(J),_=function(e){var t=e.SITC2Data,a=e.flow;return Object(n.useEffect)((function(){i.e(v.a),i.e(g.a);var e=i.c("products-treemap-div",h.d);e.responsive.enabled=!0,e.data=t[a],e.dataFields.value="value",e.dataFields.name="group",e.dataFields.children="children";var n=e.seriesTemplates.create("1");return n.columns.template.tooltipText="{group}: {value} \u20ac",n.tooltip.pointerOrientation="down",e.legend=new h.c,e.legend.position="bottom",e.legend.paddingTop=20,e.legend.itemContainers.template.tooltipText="{group}",e.legend.labels.template.text="",e.responsive.rules.push({relevant:i.a.widthXL,state:function(e,t){if(e instanceof h.c){var a=e.states.create(t);return a.sprite.itemContainers.template.clickable=!1,a.sprite.itemContainers.template.focusable=!1,a}return null}}),function(){e&&e.dispose()}}),[t,a]),r.a.createElement("div",{style:{width:"100%",height:"100vh",paddingTop:"3em",paddingRight:"10vw",paddingLeft:"10vw",textAlign:"center"}},r.a.createElement(b.a,{inverted:!0,as:"h3"},"Finnish ",a," by product category"),r.a.createElement("div",{id:"products-treemap-div",style:{width:"100%",height:"90%"}}))},Q=a(533),V=function(e){var t=e.flow,a=e.setFlow;return r.a.createElement("div",null,r.a.createElement(Q.a,{inverted:!0},r.a.createElement(Q.a.Group,null,r.a.createElement(Q.a.Radio,{label:"Exports",name:"radioGroup",value:"exports",checked:"exports"===t,onChange:function(){return a("exports")}}),r.a.createElement(Q.a.Radio,{label:"Imports",name:"radioGroup",value:"imports",checked:"imports"===t,onChange:function(){return a("imports")}}))))},K=function(e){var t=e.SITC2Data,a=Object(n.useState)("exports"),l=Object(c.a)(a,2),o=l[0],i=l[1];return void 0===t?r.a.createElement(T.a,{active:!0},r.a.createElement(B.a,null)):r.a.createElement(q.a,{fluid:!0},r.a.createElement(R.a,null,r.a.createElement(R.a.Column,{width:4,verticalAlign:"middle",style:{paddingLeft:"10em"}},r.a.createElement(V,{flow:o,setFlow:i})),r.a.createElement(R.a.Column,{width:12},r.a.createElement(_,{SITC2Data:t,flow:o}))))},U=function(){var e=Object(n.useState)(2019),t=Object(c.a)(e,2),a=t[0],l=t[1],o=Object(n.useState)([]),i=Object(c.a)(o,2),s=i[0],u=i[1],d=Object(n.useState)([]),p=Object(c.a)(d,2),h=p[0],v=p[1],g=Object(n.useState)([]),b=Object(c.a)(g,2),y=b[0],w=b[1],x=Object(n.useState)({}),C=Object(c.a)(x,2),S=C[0],T=C[1],R=Object(n.useState)("exports"),L=Object(c.a)(R,2),N=L[0],Y=L[1],P=Object(n.useState)([]),D=Object(c.a)(P,2),G=D[0],z=D[1],H=Object(n.useState)(""),J=Object(c.a)(H,2),_=J[0],Q=J[1],V=Object(n.useState)([]),U=Object(c.a)(V,2),$=U[0],ee=U[1];return Object(n.useEffect)((function(){O(a).then((function(e){u(e.data)})),j(a).then((function(e){v(e.data)})),k().then((function(e){w(e.data)})),F(a,"total").then((function(e){T(e.data)})),I().then((function(e){ee(e.data)}))}),[a]),r.a.createElement("div",{style:{backgroundColor:"#333",paddingLeft:0,paddingRight:0}},r.a.createElement(q.a,{fluid:!0},r.a.createElement(X,{year:a,setYear:l}),(0===s.length||0===h.length)&&r.a.createElement("div",{style:{height:"100vh"}},r.a.createElement(B.a,{active:!0})),s.length>0&&h.length>0&&r.a.createElement("div",null,r.a.createElement(M.a,{id:"trade-map"},r.a.createElement("div",{className:"section",style:{position:"relative",height:"calc(100vh - 60px)",backgroundColor:"#333"}},r.a.createElement(m,{imports:s,exports:h,flow:N}),r.a.createElement(f,{setFlow:Y}),r.a.createElement("a",{href:"#trade-balance",style:{position:"absolute",bottom:"2em"}},r.a.createElement("div",{className:"arrow-down"})))),r.a.createElement(M.a,{id:"trade-balance"},r.a.createElement("div",{className:"section",style:{height:"100vh",backgroundColor:"#222",position:"relative",padding:"0 0 4em 0"}},r.a.createElement(E,{tradeBalance:y}),r.a.createElement("a",{href:"#imports-by-product",style:{position:"absolute",bottom:"2em"}},r.a.createElement("div",{className:"arrow-down"})))),r.a.createElement(M.a,{id:"imports-by-product"},r.a.createElement("div",{className:"section",style:{height:"100vh",backgroundColor:"#333",position:"relative",padding:"0 0 3em 0"}},r.a.createElement(K,{SITC2Data:S}),r.a.createElement("a",{href:"#trade-partners",style:{position:"absolute",bottom:"2em"}},r.a.createElement("div",{className:"arrow-down"})))),r.a.createElement(M.a,{id:"trade-partners"},r.a.createElement("div",{className:"section",style:{minHeight:"calc(100vh - 40px)",backgroundColor:"#222",position:"relative",padding:"0 0 3em 0"}},0===G.length&&r.a.createElement(W,{countryFilter:_,handleCountryFilterChange:function(e){Q(e);var t=$.filter((function(t){return t.name===e}));z(t)},countryNames:$.map((function(e){return{title:e.name,key:e.code}}))}),0!==G.length&&r.a.createElement(A,{country:G,setCountry:z,setCountryFilter:Q,year:a})))),r.a.createElement(Z,null)))};o.a.render(r.a.createElement(U,null),document.getElementById("root"))}},[[348,1,3]]]);
//# sourceMappingURL=main.c7ef8aa2.chunk.js.map