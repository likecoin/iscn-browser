(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{881:function(t,e,n){var content=n(884);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(98).default)("433ce1a6",content,!0,{sourceMap:!1})},882:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return o}));n(267),n(48),n(124);function r(t){return t.startsWith("cosmos1")?45===t.length:!!t.startsWith("like1")&&43===t.length}function o(t){return t.replace(/\/\d+$/g,"")}},883:function(t,e,n){"use strict";n(881)},884:function(t,e,n){var r=n(97)(!1);r.push([t.i,"div.main[data-v-d6c579ba]{align-items:center}table[data-v-d6c579ba]{width:100%;table-layout:fixed;word-wrap:break-word}table[data-v-d6c579ba],td[data-v-d6c579ba],th[data-v-d6c579ba]{border:1px solid #000;border-collapse:collapse}td a[data-v-d6c579ba]{margin-left:5px}ul.pagination[data-v-d6c579ba]{display:inline-block;padding:0;margin:0}ul.pagination li[data-v-d6c579ba]{display:inline}ul.pagination li a[data-v-d6c579ba]{color:#000;float:left;padding:8px 16px;text-decoration:none}ul.pagination li.active a[data-v-d6c579ba]{background-color:#28646e;color:#fff}",""]),t.exports=r},885:function(t,e,n){"use strict";n.r(e);var r=n(34),o=(n(123),n(58),n(29),n(66),n(96),n(59),n(49),n(75),n(54),n(76),n(35)),c=n(22),d=(n(99),n(125),n(147),n(48),n(124),n(192),n(886),n(60),n(61),n(887),n(477),n(77)),l=n(100),v=n(882);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}function h(t){try{return void 0===t.contentMetadata.url&&t.contentFingerprints.includes("https://depub.blog")}catch(t){return!1}}var k={props:{url:String},data:function(){return{records:[],limit:12,next:"",previous:"",last:0,INDEXER:l.c}},fetch:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var n,r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return 100,n=t.$route.query.key||0,t.reverse="false"!==t.$route.query.reverse,r="".concat(t.$props.url,"&limit=").concat(100,"&key=").concat(n,"&reverse=").concat(t.reverse),e.next=6,t.$axios.$get(r);case 6:o=e.sent,t.key=o.pagination.next_key,t.records=o.records.map((function(t){var data=t.data,e=new Date(data.recordTimestamp).toLocaleString(),n=data["@id"];if(h(data)){var r=n.replace(/iscn:\/\/[^/]+\//g,"");data.contentMetadata.url="https://depub.space/".concat(r)}return data.contentMetadata.keywords&&(data.contentMetadata.keywords=data.contentMetadata.keywords.split(",").map((function(t){return t.trim()})).filter((function(t){return""!==t}))),_({iscn:n,iscnEncoded:encodeURIComponent(n),timestamp:e},data)}));case 9:case"end":return e.stop()}}),e)})))()},computed:_({},Object(d.c)("wallet",{walletAddress:function(t){return t.walletAddress}})),watch:{"$route.query.key":"$fetch","$route.query.reverse":"$fetch"},methods:{getIscnPrefix:v.a,domain_from_url:function(t){try{return new URL(t).hostname.replace("www.","")}catch(t){return""}},fingerprintLink:function(t){var e=t.split("://"),n=Object(r.a)(e,2),o=n[0],c=n[1];switch(o){case"ipfs":return[o,"".concat(l.d,"/ipfs/").concat(c)];case"ar":return[o,"".concat(l.a,"/").concat(c)];default:return[o,"/fingerprint/".concat(encodeURIComponent(t))]}},isValid:function(t){return t.contentMetadata&&t.contentFingerprints&&t.stakeholders}}},m=(n(883),n(53)),component=Object(m.a)(k,(function(){var t=this,e=t._self._c;return t.$fetchState.pending?e("p",[t._v("\n  Loading...\n")]):t.$fetchState.error?e("p",[t._v("\n  Not found\n")]):e("div",{staticClass:"main"},[e("NuxtLink",{attrs:{to:"?key=".concat(t.key,"&reverse=").concat(t.reverse)}},[t._v("\n    Next\n  ")]),t._v(" "),e("NuxtLink",{attrs:{to:"?reverse=".concat(!t.reverse)}},[t._v("\n    Reverse\n  ")]),t._v(" "),e("table",[t._m(0),t._v(" "),t._l(t.records.filter((function(e){return t.isValid(e)})),(function(n){return e("tr",{key:n.iscn},[e("td",[t._v(t._s(n.timestamp))]),t._v(" "),e("td",[t._v(t._s(n.contentMetadata.name))]),t._v(" "),e("td",t._l(n.contentMetadata.keywords,(function(n){return e("NuxtLink",{key:n,attrs:{to:"/keyword/".concat(encodeURIComponent(n))}},[t._v("\n          "+t._s(n)+"\n        ")])})),1),t._v(" "),e("td",t._l(n.stakeholders.filter((function(s){return s.entity})),(function(n){return e("NuxtLink",{key:n.entity.name,attrs:{to:"/stakeholder/".concat(encodeURIComponent(n.entity.name))}},[t._v("\n          "+t._s(n.entity.name)+"\n        ")])})),1),t._v(" "),e("td",[e("NuxtLink",{attrs:{to:"/owner/".concat(encodeURIComponent(n.owner))}},[t._v("\n          "+t._s(n.owner)+"\n        ")])],1),t._v(" "),e("td",[n.contentMetadata.url?e("a",{attrs:{rel:"noreferrer noopener",href:n.contentMetadata.url,target:"_blank"}},[t._v("\n          "+t._s(t.domain_from_url(n.contentMetadata.url))+"\n        ")]):t._e()]),t._v(" "),n.contentFingerprints?e("td",t._l(n.contentFingerprints.map(t.fingerprintLink),(function(n){var o=Object(r.a)(n,2),c=o[0],link=o[1];return e("a",{key:c,attrs:{href:link,target:"blank"}},[t._v("\n          "+t._s(c)+"\n        ")])})),0):e("td"),t._v(" "),e("td",[e("a",{attrs:{target:"_blank",href:"https://app.like.co/view/".concat(n.iscnEncoded)}},[t._v("Detail\n        ")]),t._v(" "),e("br"),t._v(" "),e("a",{attrs:{target:"_blank",href:"".concat(t.INDEXER,"/iscn/records?iscn_id=").concat(n.iscn)}},[t._v("\n          RawData\n        ")]),t._v(" "),e("br"),t._v(" "),t.walletAddress===n.owner?e("NuxtLink",{attrs:{to:"/edit/".concat(encodeURIComponent(t.getIscnPrefix(n.iscn)))}},[t._v("\n          Edit\n        ")]):t._e(),t._v(" "),e("br"),t._v(" "),t.walletAddress===n.owner?e("NuxtLink",{attrs:{to:"/transfer/".concat(encodeURIComponent(t.getIscnPrefix(n.iscn)))}},[t._v("\n          Transfer\n        ")]):t._e()],1)])}))],2),t._v(" "),e("p",[t._v("There are "+t._s(t.records.length)+" results in total.")]),t._v(" "),e("NuxtLink",{attrs:{to:"?key=".concat(t.key,"&reverse=").concat(t.reverse)}},[t._v("\n    Next\n  ")]),t._v(" "),e("NuxtLink",{attrs:{to:"?reverse=".concat(!t.reverse)}},[t._v("\n    Reverse\n  ")])],1)}),[function(){var t=this,e=t._self._c;return e("tr",[e("th",[t._v("Timestamp")]),t._v(" "),e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Keywords")]),t._v(" "),e("th",[t._v("Stakeholders")]),t._v(" "),e("th",[t._v("Owner")]),t._v(" "),e("th",[t._v("URL")]),t._v(" "),e("th",[t._v("Fingerprints")])])}],!1,null,"d6c579ba",null);e.default=component.exports}}]);