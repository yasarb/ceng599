(this.webpackJsonpceng599=this.webpackJsonpceng599||[]).push([[0],{153:function(t,e,n){},155:function(t,e,n){},162:function(t,e,n){},165:function(t,e,n){},166:function(t,e,n){},168:function(t,e,n){},169:function(t,e,n){},170:function(t,e,n){"use strict";n.r(e);var c=n(0),a=n.n(c),r=n(28),i=n.n(r),o=n(5),l=n(30),s=n(4),u=n(18),p=n(57),j=n(12),d=n.n(j),b=n(52),h=n(13),f=n(53),m=n.n(f),v=(n(153),n(15)),O=Object(v.b)({name:"player",initialState:{playing:!1,speed:1},reducers:{updateSpeed:function(t,e){t.speed=e.payload},togglePlay:function(t,e){t.playing=!t.playing}}}),x=O.actions,y=(x.updateSpeed,x.togglePlay),g=O.reducer,P=n(2);var w=function(t){var e=Object(c.useRef)(null),n=Object(o.c)((function(t){return t.player})).playing,a=Object(o.b)();return Object(c.useLayoutEffect)((function(){if(t.data&&t.data.length>0&&e.current){var c=h.d(e.current);c.attr("transform","scale(1,-1)");var r=c.append("g").selectAll("circle").data(t.data).join("circle").attr("r",3).attr("cx",(function(t){return t[0]})).attr("cy",(function(t){return t[1]})),i=h.a(t.data);function o(){return(o=Object(b.a)(d.a.mark((function t(){var e,n,o;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:h.e("path.hull").remove(),(e=c.append("path").attr("class","hull")).transition().style("fill","#f3f4ed22"),n=d.a.mark((function t(n){var c;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=i.slice(0,n),e.attr("d","M".concat(c.join("L"),"Z")),r.style("fill",(function(t){return c.includes(t)?"orange":"#f4eee8"})),t.next=5,m.a.delay(300);case 5:case"end":return t.stop()}}),t)})),o=2;case 5:if(!(o<=i.length)){t.next=10;break}return t.delegateYield(n(o),"t0",7);case 7:o++,t.next=5;break;case 10:a(y());case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}n&&function(){o.apply(this,arguments)}()}}),[t.data,n,a]),Object(P.jsx)("svg",{ref:e})},k=[{key:"convex-hull",name:"Convex Hull"}],z=function(){return k},S=function(t){return Object.assign.apply(Object,[{}].concat(Object(p.a)(k.map((function(t){return Object(u.a)({},t.key,t.name)})))))[t]},A=function(t){return{"convex-hull":'import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.List;\nimport java.util.stream.Collectors;\n \nimport static java.util.Collections.emptyList;\n \npublic class ConvexHull {\n    private static class Point implements Comparable<Point> {\n        private int x, y;\n \n        public Point(int x, int y) {\n            this.x = x;\n            this.y = y;\n        }\n \n        @Override\n        public int compareTo(Point o) {\n            return Integer.compare(x, o.x);\n        }\n \n        @Override\n        public String toString() {\n            return String.format("(%d, %d)", x, y);\n        }\n    }\n \n    private static List<Point> convexHull(List<Point> p) {\n        if (p.isEmpty()) return emptyList();\n        p.sort(Point::compareTo);\n        List<Point> h = new ArrayList<>();\n \n        // lower hull\n        for (Point pt : p) {\n            while (h.size() >= 2 && !ccw(h.get(h.size() - 2), h.get(h.size() - 1), pt)) {\n                h.remove(h.size() - 1);\n            }\n            h.add(pt);\n        }\n \n        // upper hull\n        int t = h.size() + 1;\n        for (int i = p.size() - 1; i >= 0; i--) {\n            Point pt = p.get(i);\n            while (h.size() >= t && !ccw(h.get(h.size() - 2), h.get(h.size() - 1), pt)) {\n                h.remove(h.size() - 1);\n            }\n            h.add(pt);\n        }\n \n        h.remove(h.size() - 1);\n        return h;\n    }\n \n    // ccw returns true if the three points make a counter-clockwise turn\n    private static boolean ccw(Point a, Point b, Point c) {\n        return ((b.x - a.x) * (c.y - a.y)) > ((b.y - a.y) * (c.x - a.x));\n    }\n}'}[t]},L=function(t){return{"convex-hull":w}[t]};n(155);var N=function(){var t,e=Object(o.c)((function(t){return t.app})).activeAlgorithm,n=z();return Object(P.jsxs)("div",{children:[Object(P.jsx)("h1",{children:null!==(t=S(e))&&void 0!==t?t:"Welcome"}),Object(P.jsx)("div",{className:"sidebar-item-wrapper",children:n.map((function(t){return Object(P.jsx)(l.b,{to:"/".concat(t.key),children:Object(P.jsx)("div",{className:"sidebar-item",children:t.name},t.key)})}))}),Object(P.jsx)("ul",{})]})},E=n(31),C=n(54),H=n.n(C);n(162),n(163),n(164);var R=function(){var t=Object(o.c)((function(t){return t.app})).activeAlgorithm,e=Object(c.useState)("\n\n<-- Select an algorithm from the left to start.\n\n"),n=Object(E.a)(e,2),a=n[0],r=n[1];return Object(c.useEffect)((function(){r(A(t))}),[t]),Object(P.jsx)("div",{className:"code-editor",children:Object(P.jsx)(H.a,{mode:"java",theme:"monokai",name:"code-editor",editorProps:{$blockScrolling:!0},value:a,readOnly:!0})})};n(165);var I=function(){return Object(P.jsx)("div",{className:"editor-container",children:Object(P.jsx)("div",{className:"content",children:Object(P.jsx)(R,{})})})},J=n(55),M=n(56),T=(n(166),function(){var t=Object(o.b)(),e=Object(o.c)((function(t){return t.app})).activeAlgorithm,n=Object(o.c)((function(t){return t.player})).playing;return Object(P.jsx)("div",{className:"player-container",children:n?Object(P.jsx)("button",{class:"btn btn-playing",disabled:n,children:"Playing"}):Object(P.jsxs)("button",{class:"btn btn-play",onClick:function(){t(y())},disabled:!e,children:[Object(P.jsx)(J.a,{icon:M.a}),"Play"]})})});var W=function(){var t=Object(o.c)((function(t){return t.app})).activeAlgorithm,e=L(t),n=Object(c.useRef)(null),r=Object(c.useState)([]),i=Object(E.a)(r,2),l=i[0],s=i[1];return Object(c.useEffect)((function(){if(n.current){var t=h.b(n.current.offsetWidth-10),e=h.b(n.current.offsetHeight-20);s(h.c(25).map((function(){return[t()+10,e()+20]})))}}),[]),Object(P.jsxs)("div",{className:"viz-container",ref:n,children:[Object(P.jsx)(T,{}),e&&a.a.createElement(e,{data:l})]})},B=n(40),Y=Object(v.b)({name:"app",initialState:{activeAlgorithm:null},reducers:{updateAlgorithm:function(t,e){t.activeAlgorithm=e.payload,document.title=S(e.payload)}}}),Z=Y.actions.updateAlgorithm,$=Y.reducer;n(168);var q=function(t){var e=Object(o.b)();return Object(c.useEffect)((function(){t.match.params.algorithm&&e(Z(t.match.params.algorithm))}),[t,e]),Object(P.jsx)("div",{className:"App",children:Object(P.jsxs)(B.a,{split:"vertical",defaultSize:"15%",allowResize:!1,children:[Object(P.jsx)(N,{}),Object(P.jsxs)(B.a,{split:"vertical",defaultSize:"50%",children:[Object(P.jsx)(I,{}),Object(P.jsx)(W,{})]})]})})},D=n(10),F=Object(D.b)({app:$,player:g}),G=Object(v.a)({reducer:F});n(169);i.a.render(Object(P.jsx)(a.a.StrictMode,{children:Object(P.jsx)(o.a,{store:G,children:Object(P.jsx)(l.a,{basename:"",children:Object(P.jsxs)(s.c,{children:[Object(P.jsx)(s.a,{exact:!0,path:"/:algorithm",component:q}),Object(P.jsx)(s.a,{path:"/",component:q})]})})})}),document.getElementById("root"))}},[[170,1,2]]]);
//# sourceMappingURL=main.3691ac2a.chunk.js.map