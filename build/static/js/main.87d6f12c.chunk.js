(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{247:function(e,t,a){e.exports=a(479)},252:function(e,t,a){},254:function(e,t,a){},266:function(e,t,a){},271:function(e,t){},273:function(e,t){},310:function(e,t){},311:function(e,t){},470:function(e,t,a){},479:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(9),c=a.n(l),o=(a(252),a(23)),s=a(24),u=a(26),i=a(25),m=a(27),p=a(591),d=a(588),h=a(590),g=(a(254),a(217)),E=a.n(g)()(),f=(a(259),a(230)),b=a(52),v=a(220),y=a(221),k={loginData:""},x=Object(b.c)({posts:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_POST":return Object(y.a)({},e,{loginData:t.payload});default:return e}}}),S=[v.a],N=Object(b.d)(x,{},b.a.apply(void 0,S)),w=a(78),j=a(50),Z=a.n(j),C=a(79),W=(a(266),a(580)),L=a(138),P=a(106),D=a(75),F=a.n(D),A=W.a.Item,T=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(i.a)(t).call(this,e))).login=Object(C.a)(Z.a.mark(function e(){var t;return Z.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("yeah"),t=JSON.stringify({query:"query($input:credentials!){ AdminLogin(input:$input) { data { token,exp,firstname,lastname,email,passwordStatus } success,message,{ path,message } } }",variables:{input:{username:a.state.loginUsername,password:a.state.loginPassword}}}),e.next=4,fetch("https://api.8uilder.com",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Authorization"},body:t}).then(function(){var e=Object(C.a)(Z.a.mark(function e(t){var n;return Z.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(!(n=e.sent).AdminLogin.success){e.next=8;break}return a.setThisLogin(n.AdminLogin.data),e.abrupt("return",!0);case 8:return e.abrupt("return",!1);case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}());case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}},e,this)})),a.setThisLogin=function(e){a.setState({loginData:e})},a.onChange=function(e){a.setState(Object(w.a)({},e.target.name,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.loginModal()},a.checkValidToken=function(){var e=a.state.loginData.token;try{F.a.verify(e,"7ZuK49myCgqfWqYwE#JtgghSydq3aY4SrSLDLUTpP2ch7VkKKhb&nj=mp?&D*#n$%rQCb3kxnzGp+TA#_4GmFQ285gRF428y9RF@WYJTzvy@DfUTt_2ePx3n6+E8MLv2YVCnrR6km?DfXhP-kY5bRtKYWn!VfrZ#CNRn&k+QA5fjZEtg+$!8jL@Z$EqLB+wQz_4H5a4k%Q=AdT##eD=77AMNjqHGy?PYCjTFUNqw#S?chZpaF55ALH7MfkHnqSPB!#fzNg+eCg_mgp^xYg!47Dd?uKsf=+Sbx=VnF-L4cK8pXRE*z8eJuMS#gHaXZqePZQJGZDqXEguEf?-9rGLqAHVAvJ9V=Q-SM__NZLe7-&W7^aCT4n3E2&G28*G#^GM6$g4yj_#KeFpPPTFW+qnnJELRYLp_H6Ng^wT&J-fR4nMDuy8YJRw!9TgQZ7kfUvtdU7LkFB_ZjzqWgzXN@+WH+FXFr8uh^Zhm@x?P8KcD$fNu5nJ75Vnw_8r=rKrhqxWYKG2-%7Qn!Tt3LffdybQhkGkT83$Y?jL!mag!@DJ$fx5SstVC2gAZepa@VC=#%p7MtQ$W-nP$$6^TV!ZuqZ^^$N^_?%^Hc9y86ZySam*2BtzzFu^9uwfQseNp=j7Y*LNu+Ptz2w79KH!z5X=qzNkPUq*dy535q3HhBTY_S5fG&*6#F+ZvTEExJELZa?b!rvtP+nKfZePW#x6gY4pT!2E8vDuBvf-vFLDZZH+57*C2ts_Vgt#-9=68=pX@p@$!_n?6tw^E34pq+p6zwbWc_6tzNawYv9wERK4cZBygHBh5Wp-3N&bx2t$BgR@V&G82b^78vgJ^CmVS*C3#VM#+C!gxHX#VyqF4X=BMEfApsDR@ZaFsJnEuE$f!*LWtjCZxPdt*k9WT*+Dn$3LB#767nz?W$?4Zfy9#N^hzy^&y=Bp#qt^*-je+67sZb6%fcHH=+vdD=j8f=Bs#-FN!WZgdnbVMGSqAwpd*BPLVNtSNGu&jzfJL8cpWtYtGN&HE2+br$+rDtXHKUQad6tKWzS23*?r4M=2huxEGuMss*?x@*72T?Be@gt872aPE*FUka&+LZJfDQg2ZyC*88HrsJPKRaLY^dQeQdhjfLC3n*r4-mp?nafV%V*_CaqNEh5sf@$zJ^ZhmTeSgfcZKdb4!NR^J&a&?5TKWLTg$y$t4f9kx6Ezr$z=L^EHd66v+tA@Sp5hZEr&PRz7@*rcv4W2ntpqv9UVPJtrcWFw+Ju^hd^#s8T7A$S?3T#*G^UW+gUZmZC$FWfUhYxNbE=sW+vLZj+x9XF&CzNG7mD4mbq^pR?tg!_6*w_#vb9+jPWVbxu%EtzC*Uy_u!#B!KTr+GnpXaY8Ns&r2xpT39X&FJ_+BcBst8FpJkbK5TEGYee$uFy=bqG2Ph2LaZFt3UPW#VRK9jEpTFCjV#E8K89msLuyDhdDMWSefB-v%N=*eHCGU+?*U#qGGrxnucU++uB5MRY^Ke86!x*4hacPxyhSgNv&c!FFQNEDDus_-zUH2kU39!8nt$kkjcu#@^KckSp3c_T2V4FkNXA^qDd5GqDuZZRmhq8R6AmZPKrZJ+f3X32SdEg9tdTnt%FKpFA9j3r@Xr7Y%EELW4839J74gdJwSvNDMuF?&@B!E7A%9z&eh8VHhg5^rhe4tN#Ya+HcVwa+SzSe8^Xw77hA$Arv2RkfNN#TRru!$KBSZ*SbpzxDH$VU8?yW3nWzE3EsBm!GK8xR7QuxKW-?=WVnsjfuJ?B%q37BprbEs5!t2Q$S!ayxeQLfR9YV%=c@28%d6EZRxR_g65CLHGWUx!UNbt**NCL*7Vy_$ht=YC6wubAMyaVyL-#pJW2P=qe?AN&DW^^hL?jmFQh9Vxj#abEPwCTsQ8hPTKDK2jYFMZv#5J4WAeGH%!^DCk78G?WPXaPccEh$=MmUJYB^ZGQvvXvU@Bfm?ShgPkMsernv!zWaC*!xrh&P22HmCse3E@WEwx56?x46RDc@=Y$E-3#VCVPr5SB_z8T_rpS=v7Kc^YxxK$h-3%Y$U#zUaCGHX6&SqCrD7");window.localStorage.setItem("session",e),alert("success login!"),E.replace("/")}catch(t){console.log(t)}},a.state={loginUsername:"",loginPassword:"",loginData:""},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){var e=window.localStorage.getItem("session");try{F.a.verify(e,"data:i4AAQSkZJRgABAQEAkACQAADmage/jpeg;asdasasddasasdadsdasdas,/9j/4AAQSkZJasdasd4AAQSkZJRgABAQEAkACQAADasRgABAQEAkACQAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRof");console.log("go back"),E.replace("/")}catch(t){E.replace("/login")}}},{key:"loginModal",value:function(){var e=Object(C.a)(Z.a.mark(function e(){return Z.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.login();case 2:if(!e.sent){e.next=6;break}this.checkValidToken(),e.next=7;break;case 6:console.log(!1);case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return r.a.createElement("div",{className:"loginBox"},r.a.createElement("div",{className:"animated fadeIn login"},r.a.createElement("div",{className:"loginContent displayflexcenter"},r.a.createElement(W.a,{onSubmit:this.handleSubmit,className:"login-form"},r.a.createElement(A,null,r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Username...",onChange:this.onChange,name:"loginUsername"})),r.a.createElement(A,null,r.a.createElement("input",{type:"password",className:"form-control",placeholder:"Password...",onChange:this.onChange,name:"loginPassword"})),r.a.createElement(A,null,e("remember",{valuePropName:"checked",initialValue:!0})(r.a.createElement(L.a,null,r.a.createElement("span",{style:{color:"white"}},"Remember me"))),r.a.createElement("a",{className:"login-form-forgot",href:"#"},r.a.createElement("span",{style:{color:"white",textDecoration:"underline"}},"Forget Password")),r.a.createElement("div",null,r.a.createElement(P.a,{type:"primary",htmlType:"submit",className:"login-form-button"},"Log in"),r.a.createElement("p",null," ",r.a.createElement("a",{href:""},r.a.createElement("span",{style:{color:"white"}},"Register now!")))))))))}}]),t}(n.Component),q=W.a.create()(T),V=a(586),$=a(569),B=a(13),H=a(215),K=a(571),z=a(572),G=(a(470),V.a.Header),J=(V.a.Content,V.a.Footer,V.a.Sider,function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(i.a)(t).call(this,e))).logout=function(){localStorage.removeItem("session"),alert("logout"),E.push("/login")},a.state={},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=r.a.createElement($.a,null,r.a.createElement($.a.Item,null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer"},"1st menu item")),r.a.createElement($.a.Item,null,r.a.createElement("a",{rel:"noopener noreferrer"},"2nd menu item")),r.a.createElement($.a.Item,null,r.a.createElement("a",{rel:"noopener noreferrer"},"3rd menu item")),r.a.createElement($.a.Item,null,r.a.createElement("a",{rel:"noopener noreferrer",onClick:this.logout},"Logout")));return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(V.a,{style:{marginBottom:"1px"}},r.a.createElement(G,{className:"header",style:{background:"#191919",border:"1px solid black"}},r.a.createElement("div",{className:"gutter-example"},r.a.createElement(K.a,{gutter:5},r.a.createElement(z.a,{className:"gutter-row",span:4},r.a.createElement("div",{className:"gutter-box",style:{float:"left"}},r.a.createElement("div",{style:{marginLeft:"-10px"}},r.a.createElement("span",null,r.a.createElement(B.a,{type:"ant-design",theme:"outlined"}))))),r.a.createElement(z.a,{className:"gutter-row",span:4},r.a.createElement("div",{className:"gutter-box"})),r.a.createElement(z.a,{className:"gutter-row",span:4},r.a.createElement("div",{className:"gutter-box"})),r.a.createElement(z.a,{className:"gutter-row",span:4},r.a.createElement("div",{className:"gutter-box"})),r.a.createElement(z.a,{className:"gutter-row",span:4},r.a.createElement("div",{className:"gutter-box"})),r.a.createElement(z.a,{className:"gutter-row",span:4},r.a.createElement("div",{className:"gutter-box",style:{float:"right"}},r.a.createElement(H.a,{overlay:e},r.a.createElement("a",{className:"ant-dropdown-link",href:"#"},r.a.createElement("span",{style:{color:"white"}},"Menu")," ",r.a.createElement(B.a,{type:"down",style:{color:"white"}})))))))))))}}]),t}(n.Component)),U=a(582),R=a(63),Y=a.n(R);function Q(){return r.a.createElement("div",null,"Loading...")}var _=Y()({loader:function(){return Promise.all([a.e(0),a.e(11),a.e(5)]).then(a.bind(null,573))},loading:Q}),M=Y()({loader:function(){return Promise.all([a.e(0),a.e(1),a.e(6)]).then(a.bind(null,574))},loading:Q}),O=Y()({loader:function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(7)]).then(a.bind(null,576))},loading:Q}),X=Y()({loader:function(){return Promise.all([a.e(0),a.e(1),a.e(3),a.e(8)]).then(a.bind(null,577))},loading:Q}),I=Y()({loader:function(){return Promise.all([a.e(2),a.e(9)]).then(a.bind(null,578))},loading:Q}),ee=[{path:"/",exact:!0,name:"Home",component:oe},{path:"/dashboard",name:"Dashboard",component:_},{path:"/faq",name:"Faq",component:O},{path:"/froala",name:"Faq",component:I},{path:"/user",name:"User",component:X},{path:"/roles",name:"Roles",component:M}],te=a(587),ae=(V.a.Header,V.a.Content,V.a.Footer,V.a.Sider,function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(V.a,null,r.a.createElement(te.a,{style:{padding:"13px"}},r.a.createElement(te.a.Item,null,"Home"),r.a.createElement(te.a.Item,null,"List"),r.a.createElement(te.a.Item,null,"App"))))}}]),t}(n.Component)),ne=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(i.a)(t).call(this,e))).changeRedirectState=function(){window.localStorage.getItem("session")?a.setState({redirectState:"/roles"}):a.setState({redirectState:"/login"})},a.state={redirectState:"/login"},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){this.changeRedirectState()}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(ae,null)),r.a.createElement("div",{className:"switch",style:{padding:"24px"}},r.a.createElement(d.a,null,ee.map(function(e,t){return e.component?r.a.createElement(h.a,{key:t,path:e.path,exact:e.exact,name:e.name,render:function(t){return r.a.createElement(e.component,t)}}):null}),r.a.createElement(U.a,{from:"/",to:this.state.redirectState}))))}}]),t}(n.Component),re=(V.a.Header,V.a.Content,V.a.Footer,V.a.Sider),le=($.a.SubMenu,function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(i.a)(t).call(this,e))).toggle=function(){a.setState({collapsed:!a.state.collapsed})},a.handleClick=function(e){console.log("click ",e);var t=e.key;a.setState({passUrl:t}),E.replace(t)},a.state={collapsed:!0,passUrl:"/roles"},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:{background:"#191919"}},r.a.createElement(re,{style:{height:"876px",background:"#191919",marginTop:"-1px"},trigger:null,collapsible:!1,collapsed:!this.state.collapsed},r.a.createElement($.a,{theme:"dark",mode:"inline",defaultSelectedKeys:[this.state.passUrl],style:{background:"#191919"},onClick:function(t){return e.handleClick(t)}},r.a.createElement($.a.Item,{key:"/dashboard"},r.a.createElement(B.a,{type:"radar-chart",theme:"outlined"}),r.a.createElement("span",null,"Dashboard")),r.a.createElement($.a.Item,{key:"/user"},r.a.createElement(B.a,{type:"user",theme:"outlined"}),r.a.createElement("span",null,"User")),r.a.createElement($.a.Item,{key:"/roles"},r.a.createElement(B.a,{type:"lock",theme:"outlined"}),r.a.createElement("span",null,"Roles")),r.a.createElement($.a.Item,{key:"/faq"},r.a.createElement(B.a,{type:"pushpin",theme:"outlined"}),r.a.createElement("span",null,"Faq")))))}}]),t}(n.Component)),ce=(V.a.Header,V.a.Content),oe=(V.a.Footer,V.a.Sider,function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(i.a)(t).call(this,e))).state={passUrl:a.props.location.pathname},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){var e=window.localStorage.getItem("session");e||E.push("/login");try{F.a.verify(e,"7ZuK49myCgqfWqYwE#JtgghSydq3aY4SrSLDLUTpP2ch7VkKKhb&nj=mp?&D*#n$%rQCb3kxnzGp+TA#_4GmFQ285gRF428y9RF@WYJTzvy@DfUTt_2ePx3n6+E8MLv2YVCnrR6km?DfXhP-kY5bRtKYWn!VfrZ#CNRn&k+QA5fjZEtg+$!8jL@Z$EqLB+wQz_4H5a4k%Q=AdT##eD=77AMNjqHGy?PYCjTFUNqw#S?chZpaF55ALH7MfkHnqSPB!#fzNg+eCg_mgp^xYg!47Dd?uKsf=+Sbx=VnF-L4cK8pXRE*z8eJuMS#gHaXZqePZQJGZDqXEguEf?-9rGLqAHVAvJ9V=Q-SM__NZLe7-&W7^aCT4n3E2&G28*G#^GM6$g4yj_#KeFpPPTFW+qnnJELRYLp_H6Ng^wT&J-fR4nMDuy8YJRw!9TgQZ7kfUvtdU7LkFB_ZjzqWgzXN@+WH+FXFr8uh^Zhm@x?P8KcD$fNu5nJ75Vnw_8r=rKrhqxWYKG2-%7Qn!Tt3LffdybQhkGkT83$Y?jL!mag!@DJ$fx5SstVC2gAZepa@VC=#%p7MtQ$W-nP$$6^TV!ZuqZ^^$N^_?%^Hc9y86ZySam*2BtzzFu^9uwfQseNp=j7Y*LNu+Ptz2w79KH!z5X=qzNkPUq*dy535q3HhBTY_S5fG&*6#F+ZvTEExJELZa?b!rvtP+nKfZePW#x6gY4pT!2E8vDuBvf-vFLDZZH+57*C2ts_Vgt#-9=68=pX@p@$!_n?6tw^E34pq+p6zwbWc_6tzNawYv9wERK4cZBygHBh5Wp-3N&bx2t$BgR@V&G82b^78vgJ^CmVS*C3#VM#+C!gxHX#VyqF4X=BMEfApsDR@ZaFsJnEuE$f!*LWtjCZxPdt*k9WT*+Dn$3LB#767nz?W$?4Zfy9#N^hzy^&y=Bp#qt^*-je+67sZb6%fcHH=+vdD=j8f=Bs#-FN!WZgdnbVMGSqAwpd*BPLVNtSNGu&jzfJL8cpWtYtGN&HE2+br$+rDtXHKUQad6tKWzS23*?r4M=2huxEGuMss*?x@*72T?Be@gt872aPE*FUka&+LZJfDQg2ZyC*88HrsJPKRaLY^dQeQdhjfLC3n*r4-mp?nafV%V*_CaqNEh5sf@$zJ^ZhmTeSgfcZKdb4!NR^J&a&?5TKWLTg$y$t4f9kx6Ezr$z=L^EHd66v+tA@Sp5hZEr&PRz7@*rcv4W2ntpqv9UVPJtrcWFw+Ju^hd^#s8T7A$S?3T#*G^UW+gUZmZC$FWfUhYxNbE=sW+vLZj+x9XF&CzNG7mD4mbq^pR?tg!_6*w_#vb9+jPWVbxu%EtzC*Uy_u!#B!KTr+GnpXaY8Ns&r2xpT39X&FJ_+BcBst8FpJkbK5TEGYee$uFy=bqG2Ph2LaZFt3UPW#VRK9jEpTFCjV#E8K89msLuyDhdDMWSefB-v%N=*eHCGU+?*U#qGGrxnucU++uB5MRY^Ke86!x*4hacPxyhSgNv&c!FFQNEDDus_-zUH2kU39!8nt$kkjcu#@^KckSp3c_T2V4FkNXA^qDd5GqDuZZRmhq8R6AmZPKrZJ+f3X32SdEg9tdTnt%FKpFA9j3r@Xr7Y%EELW4839J74gdJwSvNDMuF?&@B!E7A%9z&eh8VHhg5^rhe4tN#Ya+HcVwa+SzSe8^Xw77hA$Arv2RkfNN#TRru!$KBSZ*SbpzxDH$VU8?yW3nWzE3EsBm!GK8xR7QuxKW-?=WVnsjfuJ?B%q37BprbEs5!t2Q$S!ayxeQLfR9YV%=c@28%d6EZRxR_g65CLHGWUx!UNbt**NCL*7Vy_$ht=YC6wubAMyaVyL-#pJW2P=qe?AN&DW^^hL?jmFQh9Vxj#abEPwCTsQ8hPTKDK2jYFMZv#5J4WAeGH%!^DCk78G?WPXaPccEh$=MmUJYB^ZGQvvXvU@Bfm?ShgPkMsernv!zWaC*!xrh&P22HmCse3E@WEwx56?x46RDc@=Y$E-3#VCVPr5SB_z8T_rpS=v7Kc^YxxK$h-3%Y$U#zUaCGHX6&SqCrD7")}catch(t){localStorage.removeItem("session"),E.push("/login")}}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(J,null),r.a.createElement(V.a,null,r.a.createElement(le,{passUrl:this.state.passUrl}),r.a.createElement(ce,{style:{background:"#fff",margin:0,minHeight:280}},r.a.createElement(ne,null)))))}}]),t}(n.Component)),se=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(f.a,{store:N},r.a.createElement(p.a,{history:E},r.a.createElement(d.a,null,r.a.createElement(h.a,{exact:!0,path:"/login",name:"Login Page",component:q}),r.a.createElement(h.a,{path:"/",name:"Home",component:oe}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(se,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[247,12,10]]]);
//# sourceMappingURL=main.87d6f12c.chunk.js.map