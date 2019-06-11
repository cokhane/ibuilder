(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{574:function(e,t,a){"use strict";a.r(t);var s=a(78),n=a(50),r=a.n(n),o=a(79),l=a(23),i=a(24),c=a(26),u=a(25),d=a(27),p=a(153),m=a(1),h=a.n(m),f=a(579),g=a(580),R=a(583),b=a(575),k=a(585),v=a(13),S=f.a.Column,y=(f.a.ColumnGroup,g.a.Item),x=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).getRolesCodes=function(){var e=JSON.stringify({query:"query{ moduleRolesName{ data,success,message { path,message } } }"});fetch("https://api.8uilder.com",{method:"POST",headers:{"Content-Type":"application/json",Authorization:window.localStorage.getItem("session")},body:e}).then(function(){var e=Object(o.a)(r.a.mark(function e(t){var s,n,o,l;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:for(s=e.sent,n=[],[],[],o=s.moduleRolesName.data,l=0;l<o.length;l++)"user"==o[l]?n.push({name:"User",class:o[l],id:l.toString(),key:l.toString()}):"roles_n_permission"==o[l]?n.push({name:"Roles",class:o[l],id:l.toString(),key:l.toString()}):"faq"==o[l]&&n.push({name:"FAQ",class:o[l],id:l.toString(),key:l.toString()});a.setState({getRolesCodesData:n});case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())},a.getRoles=function(){var e=JSON.stringify({query:"query{ roles{ data {roleID,name,description,create,read,delete,update,view,create} success,message { path,message } } }"});fetch("https://api.8uilder.com",{method:"POST",headers:{"Content-Type":"application/json",Authorization:window.localStorage.getItem("session")},body:e}).then(function(){var e=Object(o.a)(r.a.mark(function e(t){var s,n,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:for(o in s=e.sent,n=s.roles.data)n[o].key=o,n[o].id=o;if(!s.roles.success){e.next=9;break}a.setState({getRolesData:n}),e.next=10;break;case 9:return e.abrupt("return",!1);case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())},a.addRoles=Object(o.a)(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.stringify({query:"mutation($input:rolesFields!){ CreateRoles( input:$input ) { success,message { path,message } } }",variables:{input:{name:a.state.addRolesName,description:a.state.addRolesDescription}}}),e.next=3,fetch("https://api.8uilder.com",{method:"POST",headers:{"Content-Type":"application/json",Authorization:window.localStorage.getItem("session")},body:t}).then(function(){var e=Object(o.a)(r.a.mark(function e(t){var s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(s=e.sent,console.log(s),!s.CreateRoles.success){e.next=8;break}return e.abrupt("return",!0);case 8:a.setState({addRolesErrorMessage:s.CreateRoles.message[0].message});case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}());case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e,this)})),a.editRoles=Object(o.a)(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.stringify({query:"mutation($input:rolesUpdateFields!){ UpdateRoles( input:$input ) { success,message { path,message } } }",variables:{input:{rolesID:a.state.editRolesId,name:a.state.editRolesName,description:a.state.editRolesDescription}}}),e.next=3,fetch("https://api.8uilder.com",{method:"POST",headers:{"Content-Type":"application/json",Authorization:window.localStorage.getItem("session")},body:t}).then(function(){var e=Object(o.a)(r.a.mark(function e(t){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(a=e.sent,console.log(a),!a.UpdateRoles.success){e.next=8;break}return e.abrupt("return",!0);case 8:return e.abrupt("return",!1);case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}());case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e,this)})),a.deleteRoles=function(){var e=Object(o.a)(r.a.mark(function e(t){var s,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(s=[]).push(t),n=JSON.stringify({query:"mutation($input:DeleteRolesField!){ DeleteRoles(input:$input){ success,message { path,message } } }",variables:{input:{rolesID:s}}}),e.next=5,fetch("https://api.8uilder.com",{method:"POST",headers:{"Content-Type":"application/json",Authorization:window.localStorage.getItem("session")},body:n}).then(function(){var e=Object(o.a)(r.a.mark(function e(t){var s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(s=e.sent,console.log(s),!s.DeleteRoles.success){e.next=8;break}return e.abrupt("return",!0);case 8:a.setState({deleteRolesErrorMessage:s.DeleteRoles.message[0].message});case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}());case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.setRoles=Object(o.a)(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.stringify({query:"mutation($input:rolesUpdateFields!){ UpdateRoles( input:$input ) { success,message { path,message } } }",variables:{input:{rolesID:a.state.setRolesID,view:a.state.viewState,create:a.state.createState,read:a.state.readState,update:a.state.updateState,delete:a.state.deleteState}}}),e.next=3,fetch("https://api.8uilder.com",{method:"POST",headers:{"Content-Type":"application/json",Authorization:window.localStorage.getItem("session")},body:t}).then(function(){var e=Object(o.a)(r.a.mark(function e(t){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(a=e.sent,console.log("setRoles: ",a),!a.UpdateRoles.success){e.next=8;break}return e.abrupt("return",!0);case 8:return e.abrupt("return",!1);case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}());case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e,this)})),a.openAddRolesModal=Object(o.a)(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.setState({addRolesVisible:!0});case 1:case"end":return e.stop()}},e,this)})),a.openeditRolesModal=function(){var e=Object(o.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.setState({editRolesVisible:!0,editRolesId:t.roleID,editRolesName:t.name,editRolesDescription:t.description});case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.openSetRolesModal=function(){var e=Object(o.a)(r.a.mark(function e(t){var s,n,o,l,i,c,u,d;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("set id: ",t.roleID),e.next=3,document.getElementsByClassName("permissionCheckBox");case 3:for(s=e.sent,n=0;n<s.length;n++)s[n].checked=!1;o=a.state.getRolesCodesData,a.setState({setRolesVisible:!0,setRolesID:t.roleID,createState:[],readState:[],updateState:[],deleteState:[],viewState:[],baklangState:"maging lalake"}),l=t,i=["create","read","update","delete","view"],c=0;case 10:if(!(c<i.length)){e.next=31;break}u=0;case 12:if(!(u<o.length)){e.next=28;break}if(!l[i[c]]){e.next=25;break}if(!(l[i[c]].indexOf(o[u].class)>-1)){e.next=25;break}return d=i[c]+u+t.roleID,e.next=18,document.getElementsByName(d);case 18:e.sent[0].checked=!0,"create"==i[c]&&a.state.createState.push(o[u].class),"read"==i[c]&&a.state.readState.push(o[u].class),"update"==i[c]&&a.state.updateState.push(o[u].class),"delete"==i[c]&&a.state.deleteState.push(o[u].class),"view"==i[c]&&a.state.viewState.push(o[u].class);case 25:u++,e.next=12;break;case 28:c++,e.next=10;break;case 31:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.success=function(){R.a.success({title:"Success",maskClosable:"false"})},a.addRolesModal=function(){var e=Object(o.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,a.addRoles();case 3:if(!e.sent){e.next=11;break}a.success(),a.setState({addRolesVisible:!1}),document.getElementsByName("addRolesName")[0].value="",document.getElementsByName("addRolesDescription")[0].value="",a.getRoles(),e.next=12;break;case 11:R.a.error({title:"This is an error message",content:a.state.addRolesErrorMessage,maskClosable:"false"});case 12:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.editRolesModal=Object(o.a)(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.editRoles();case 2:if(!e.sent){e.next=8;break}a.success(),a.setState({editRolesVisible:!1}),a.getRoles(),e.next=9;break;case 8:R.a.error({title:"This is an error message",maskClosable:"false"});case 9:case"end":return e.stop()}},e,this)})),a.deleteRolesModal=function(){var e=Object(o.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.deleteRoles(t.roleID);case 2:if(!e.sent){e.next=7;break}a.success(),a.getRoles(),e.next=8;break;case 7:R.a.error({title:"This is an error message",content:a.state.deleteRolesErrorMessage,maskClosable:"false"});case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.setRolesModal=function(){var e=Object(o.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.setState({setRolesVisible:!1}),e.next=3,a.setRoles();case 3:if(!e.sent){e.next=8;break}a.success(),a.getRoles(),e.next=9;break;case 8:R.a.error({title:"This is an error message",content:a.state.deleteRolesErrorMessage,maskClosable:"false"});case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.closeAddRolesModal=function(){a.setState({addRolesVisible:!1})},a.closeEditRolesModal=function(){a.setState({editRolesVisible:!1})},a.closeSetRolesModal=function(){a.setState({setRolesVisible:!1})},a.onChange=function(e){a.setState(Object(s.a)({},e.target.name,e.target.value))},a.setPermission=function(e,t,s){console.log("checkbox: ",e.target.checked),console.log("class: ",t.class),console.log("action: ",s);var n=null;switch(s){case"createState":n=a.state.createState;break;case"readState":n=a.state.readState;break;case"updateState":n=a.state.updateState;break;case"deleteState":n=a.state.deleteState;break;case"viewState":n=a.state.viewState;break;default:console.log("error")}if(e.target.checked)n.push(t.class),console.log(n);else for(var r=0;r<n.length;r++)n[r]===t.class&&n.splice(r,1)},a.newButton=function(){a.setState(function(e){e.baklangState="gago bakla"}),console.log("haha: ",a.state.baklangState)},a.state={addRolesVisible:!1,addRolesName:null,addRolesDescription:null,addRolesErrorMessage:null,deleteRolesErrorMessage:null,editRolesVisible:!1,editRolesId:null,editRolesName:null,editRolesDescription:null,setRolesVisible:!1,setRolesID:null,getRolesData:[],getRolesCodesData:[],createState:[],readState:[],updateState:[],deleteState:[],viewState:[],baklangState:null},a.newButton=a.newButton.bind(Object(p.a)(Object(p.a)(a))),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){this.getRoles(),this.getRolesCodes()}},{key:"render",value:function(){var e=this;this.props.form.getFieldDecorator;return h.a.createElement("div",null,h.a.createElement("div",{className:"roleComponent"},h.a.createElement("h1",null,"Roles Component"),h.a.createElement("div",{className:"row",style:{marginBottom:"10px"}},h.a.createElement("div",{className:"col-sm-3"}),h.a.createElement("div",{className:"col-sm-3"}),h.a.createElement("div",{className:"col-sm-3"}),h.a.createElement("div",{className:"col-sm-3"},h.a.createElement("button",{className:"btn btn-sm btn-primary",style:{float:"right"},onClick:this.openAddRolesModal},"Add Roles"))),h.a.createElement(f.a,{dataSource:this.state.getRolesData},h.a.createElement(S,{title:"ID",dataIndex:"roleID",key:"3"}),h.a.createElement(S,{title:"Role Name",dataIndex:"name",key:"2"}),h.a.createElement(S,{title:"Description",dataIndex:"description",key:"1"}),h.a.createElement(S,{title:"Action",key:"action",render:function(t,a){return h.a.createElement("span",null,h.a.createElement("a",{href:"#",onClick:function(){return e.openeditRolesModal(a)}},"Edit"),h.a.createElement(b.a,{type:"vertical"}),h.a.createElement("a",{href:"#",onClick:function(){return e.deleteRolesModal(a)}},"Delete"),h.a.createElement(b.a,{type:"vertical"}),h.a.createElement("a",{href:"#",onClick:function(){return e.openSetRolesModal(a)}},"Set"))}}))),h.a.createElement("div",null,h.a.createElement(R.a,{title:"Add Roles",visible:this.state.addRolesVisible,onOk:this.addRolesModal,onCancel:this.closeAddRolesModal,maskClosable:!1},h.a.createElement("div",null,h.a.createElement(g.a,{className:"login-form"},h.a.createElement(y,null,h.a.createElement(k.a,{prefix:h.a.createElement(v.a,{type:"key",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"Role Name",onChange:this.onChange,name:"addRolesName"})),h.a.createElement(y,null,h.a.createElement(k.a,{prefix:h.a.createElement(v.a,{type:"key",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"Role Description",onChange:this.onChange,name:"addRolesDescription"}))))),h.a.createElement(R.a,{title:"Edit Roles",visible:this.state.editRolesVisible,onOk:this.editRolesModal,onCancel:this.closeEditRolesModal,maskClosable:!1},h.a.createElement("div",null,h.a.createElement(g.a,{className:"login-form"},h.a.createElement(y,null,h.a.createElement(k.a,{prefix:h.a.createElement(v.a,{type:"key",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"Role Name",onChange:this.onChange,name:"editRolesName",value:this.state.editRolesName})),h.a.createElement(y,null,h.a.createElement(k.a,{prefix:h.a.createElement(v.a,{type:"key",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"Role Description",onChange:this.onChange,name:"editRolesDescription",value:this.state.editRolesDescription}))))),h.a.createElement(R.a,{width:"700px",title:"Set Roles",visible:this.state.setRolesVisible,onOk:this.setRolesModal,onCancel:this.closeSetRolesModal,maskClosable:!1},h.a.createElement(f.a,{dataSource:this.state.getRolesCodesData,pagination:!1},h.a.createElement(S,{title:"Module Name",dataIndex:"name"}),h.a.createElement(S,{title:"Create",key:"create",render:function(t,a,s,n){return h.a.createElement("span",null,h.a.createElement("input",{name:"create"+s+e.state.setRolesID,className:"permissionCheckBox",onChange:function(t){return e.setPermission(t,a,"createState")},type:"checkbox"}))}}),";",h.a.createElement(S,{title:"Read",key:"read",render:function(t,a,s,n){return h.a.createElement("span",null,h.a.createElement("input",{name:"read"+s+e.state.setRolesID,className:"permissionCheckBox",onChange:function(t){return e.setPermission(t,a,"readState")},type:"checkbox"}))}}),";",h.a.createElement(S,{title:"Update",key:"update",render:function(t,a,s,n){return h.a.createElement("span",null,h.a.createElement("input",{name:"update"+s+e.state.setRolesID,className:"permissionCheckBox",onChange:function(t){return e.setPermission(t,a,"updateState")},type:"checkbox"}))}}),";",h.a.createElement(S,{title:"Delete",key:"delete",render:function(t,a,s,n){return h.a.createElement("span",null,h.a.createElement("input",{name:"delete"+s+e.state.setRolesID,className:"permissionCheckBox",onChange:function(t){return e.setPermission(t,a,"deleteState")},type:"checkbox"}))}}),";",h.a.createElement(S,{title:"View",key:"view",render:function(t,a,s,n){return h.a.createElement("span",null,h.a.createElement("input",{name:"view"+s+e.state.setRolesID,className:"permissionCheckBox",onChange:function(t){return e.setPermission(t,a,"viewState")},type:"checkbox"}))}}),";"))))}}]),t}(m.Component),w=g.a.create()(x);t.default=w}}]);
//# sourceMappingURL=6.788474ac.chunk.js.map