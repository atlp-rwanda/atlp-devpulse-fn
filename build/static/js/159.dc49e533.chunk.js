"use strict";(self.webpackChunkatlp_devpulse_fn=self.webpackChunkatlp_devpulse_fn||[]).push([[159],{8159:function(e,t,r){r.r(t),r.d(t,{default:function(){return S}});var a=r(2791),n=r(7689),s=r(184),i=function(){return(0,s.jsx)("div",{children:(0,s.jsx)("nav",{className:"w-full font-serif flex justify-center pt-10 mt-40",children:(0,s.jsxs)("ul",{className:"w-2/3 flex justify-between bg-blue-600 text-3xl p-20 mb-30 rounded-xl",children:[(0,s.jsx)("li",{className:"bg-green-300 text-red-600 font-bold p-3 rounded-md",children:"Home"}),(0,s.jsx)("li",{className:"bg-green-600 p-3 rounded-md",children:"About"}),(0,s.jsx)("li",{className:"bg-green-900 p-3 rounded-md",children:"Signup"}),(0,s.jsx)("li",{className:"bg-green-100 p-3 rounded-md",children:"Login"})]})})})},l=r(885),c=r(8617),d=r(8820),o=function(e){var t=e.contentPerPage,r=e.count,n=(0,a.useState)(1),s=(0,l.Z)(n,2),i=s[0],c=s[1],d=(0,a.useState)({before:!1,paginationGroup:[],after:!0}),o=(0,l.Z)(d,2),x=o[0],m=o[1],u=Math.ceil(r/t),p=i*t,g=p-t,h=(0,a.useState)([]),b=(0,l.Z)(h,2),f=b[0],y=b[1];(0,a.useEffect)((function(){if(u>2){var e=new Array(u-2).fill(1).map((function(e,t){return t+2}));y(e)}}),[u]),(0,a.useEffect)((function(){var e=f.indexOf(i),t=[],r=!1,a=!1;t=1===i?f.slice(0,3):i===u||i===u-1||i===u-2?f.slice(-3,u):2===i?f.slice(e,e+3):[i-1,i,i+1],u<=5?(r=!1,a=!1):(r=!1,a=!1,t[0]>2&&(r=!0),t[2]<u-1&&(a=!0)),m({paginationGroup:t,before:r,after:a})}),[i,f,u]);var j=function(e){c((function(t){return e?t===u?t:t+1:1===t?t:t-1}))};return{totalPages:u,nextPage:function(){return j(!0)},prevPage:function(){return j(!1)},setPaging:function(e){c(e>u?u:e<1?1:e)},firstContentIndex:g,lastContentIndex:p,paging:i,gaps:x}},x=r(5206),m=(r(4666),r(4165)),u=r(5861),p=r(1429),g=r(7339),h=r(1044),b=r(8687);var f=(0,b.$j)((function(e){return{alltrainees:e.trainee}}),{createTrainee:function(e){var t=e.firstName,r=e.lastName,a=e.email;return function(){var e=(0,u.Z)((0,m.Z)().mark((function e(n){return(0,m.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,h.Z)({url:"http://localhost:4000/",method:"post",data:{query:"\n          mutation CreateNewTraineeApplicant($input: newTraineeApplicantInput) {\n            createNewTraineeApplicant(input: $input) {\n              lastName\n              firstName\n              email\n            }\n          }",variables:{input:{firstName:t,lastName:r,email:a}}}}).then((function(e){if(null!==e.data.data)x.Am.success("Successfully created."),n((0,p.Z)(g.FS,e.data.data.createApplicationCycle));else{var t=e.data.errors[0].message;x.Am.error(t),n((0,p.Z)(g.ab,t))}})).catch((function(e){n((0,p.Z)(g.ab,e))}));case 3:e.sent,e.next=10;break;case 6:return e.prev=6,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",n((0,p.Z)(g.ab,e.t0)));case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}()}})((function(e){var t=(0,a.useState)(!1),r=(0,l.Z)(t,2),n=r[0],i=r[1],c=(0,a.useState)(""),o=(0,l.Z)(c,2),m=o[0],u=o[1],p=(0,a.useState)(""),g=(0,l.Z)(p,2),h=g[0],b=g[1],f=(0,a.useState)(""),y=(0,l.Z)(f,2),j=y[0],v=y[1];function N(){location.reload()}var k=function(){var t={firstName:m,lastName:h,email:j};e.createTrainee(t)&&(u(""),b(""),v(""),i(!1),setTimeout(N,3e3))};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:"bg-white dark:bg-dark-bg w-full sm:w-3/4  xl:w-4/12 rounded-lg p-4 pb-8",children:[(0,s.jsxs)("div",{className:"card-title w-full flex  flex-wrap justify-center items-center  ",children:[(0,s.jsxs)("h3",{className:"font-bold text-sm dark:text-white text-center w-11/12 ",children:[(0,s.jsx)(d.oHP,{className:"float-right text-3xl cursor-pointer",onClick:function(){return location.reload(),void i(!n)}}),"New Trainee"]}),(0,s.jsx)("hr",{className:" bg-primary border-b my-3 w-full"})]}),(0,s.jsx)("div",{className:"card-body",children:(0,s.jsxs)("section",{className:" py-3 px-8",children:[(0,s.jsx)("div",{className:"input my-3 h-9 ",children:(0,s.jsx)("div",{className:"grouped-input flex items-center h-full w-full rounded-md",children:(0,s.jsx)("input",{type:"text",name:"gpa",className:" dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4",placeholder:"FirstName",value:m,onChange:function(e){u(e.target.value)}})})}),(0,s.jsx)("div",{className:"input my-3 h-9 ",children:(0,s.jsx)("div",{className:"grouped-input flex items-center h-full w-full rounded-md",children:(0,s.jsx)("input",{type:"text",name:"definition",className:" dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full pt-4",placeholder:"LastName",value:h,onChange:function(e){b(e.target.value)}})})}),(0,s.jsx)("div",{className:"input my-3 h-9 ",children:(0,s.jsx)("div",{className:"grouped-input flex items-center h-full w-full rounded-md",children:(0,s.jsx)("input",{type:"text",name:"grade",className:" dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full pt-4",placeholder:"Email",value:j,onChange:function(e){v(e.target.value)}})})}),(0,s.jsx)("button",{className:"flex bg-primary rounded-md py-2 px-4 text-white font-medium cursor-pointer m-auto",onClick:function(){""===m&&x.Am.error("Enter your firstname"),""===h&&x.Am.error("Enter your Lastname"),""===j?x.Am.error("Enter your Email"):k()},children:"save"})]})})]})})})),y=r(3116),j=(0,b.$j)((function(e){return{alltrainees:e.trainee}}),{getAllTraineess:function(e){var t=e.page,r=e.itemsPerPage,a=e.All;return function(){var e=(0,u.Z)((0,m.Z)().mark((function e(n){var s,i;return(0,m.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,h.Z)({url:"http://localhost:4000/",method:"post",data:{query:"\n        query AllTraineesDetails($input: pagination) {\n          allTraineesDetails(input: $input) {\n            gender\n            cohort\n            trainee_id {\n              lastName\n              firstName\n              email\n            }\n          }\n        }\n      ",variables:{input:{page:t,itemsPerPage:r,All:a}}}});case 3:return s=e.sent,e.next=6,s.data.data.allTraineesDetails;case 6:i=e.sent,console.log(i),n((0,p.Z)(g.hu,i)),e.next=15;break;case 11:if(e.prev=11,e.t0=e.catch(0),!e.t0){e.next=15;break}return e.abrupt("return",console.log(e.t0));case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}()}})((function(e){var t,r=(0,a.useState)(!1),n=(0,l.Z)(r,2),i=n[0],m=n[1];var u=e.alltrainees,p=(0,a.useState)(0),g=(0,l.Z)(p,2),h=g[0],b=(g[1],(0,a.useState)(0)),j=(0,l.Z)(b,2),v=j[0],N=(j[1],(0,a.useState)(!0)),k=(0,l.Z)(N,2),w=k[0],Z=(k[1],{page:h,itemsPerPage:v,All:w});(0,a.useEffect)((function(){e.getAllTraineess(Z)}),[]);var P=u.data,A=o({contentPerPage:10,count:P.length}),C=A.firstContentIndex,S=A.lastContentIndex,O=A.nextPage,T=A.prevPage,J=(A.paging,A.gaps),F=A.setPaging,H=A.totalPages;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(x.Ix,{}),(0,s.jsx)("div",{className:"h-screen w-screen z-20 bg-black bg-opacity-30 backdrop-blur-sm absolute flex items-center justify-center  px-4 ".concat(!0===i?"block":"hidden"),children:(0,s.jsx)(f,{})}),(0,s.jsx)("div",{className:"flex flex-col  h-screen absolute w-[100%]",children:(0,s.jsx)("div",{className:"flex flex-row",children:(0,s.jsx)("div",{className:"w-full",children:(0,s.jsx)("div",{children:(0,s.jsxs)("div",{className:"bg-light-bg dark:bg-dark-frame-bg  min-h-screen overflow-y-hidden overflow-x-hidden",children:[(0,s.jsx)("div",{className:"flex items-left px-7 lg:px-64 pt-24",children:(0,s.jsxs)("div",{className:"flex px-5 py-2 pb-8 w-fit",children:[(0,s.jsxs)("button",{onClick:function(){m(!0)},className:"flex bg-primary rounded-md py-2 px-4 text-white font-medium cursor-pointer",children:[(0,s.jsx)(d.Lfi,{className:"mt-1 mr-1 font-bold"}),"  Trainee"]}),(0,s.jsx)("div",{})]})}),(0,s.jsxs)("div",{className:"px-3 md:px-8",children:[(0,s.jsx)("div",{className:"bg-white  dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-60 mb-10",children:(0,s.jsx)("div",{children:(0,s.jsx)("div",{className:"-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto",children:(0,s.jsx)("div",{className:"inline-block w-full h-[55vh] lg:min-w-full shadow rounded-lg overflow-y-scroll",children:(0,s.jsxs)("table",{className:"min-w-full leading-normal",children:[(0,s.jsx)("thead",{className:" w-full px-32 sticky top-0",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider",children:"firstname"}),(0,s.jsx)("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider",children:"lastname"}),(0,s.jsx)("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider",children:"gender"}),(0,s.jsx)("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider",children:"email"}),(0,s.jsx)("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider",children:"cycle"}),(0,s.jsx)("th",{className:"border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider",children:"action"})]})}),(0,s.jsx)("tbody",{className:"overflow-y-auto",children:null===(t=P.slice(C,S))||void 0===t?void 0:t.map((function(e,t){return(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{className:"px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm",children:(0,s.jsx)("div",{className:"flex",children:(0,s.jsx)("div",{className:"",children:(0,s.jsx)("p",{className:"text-gray-900 float-left dark:text-white whitespace-no-wrap",children:e.trainee_id.firstName})})})}),(0,s.jsx)("td",{className:"px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm",children:(0,s.jsx)("div",{className:"flex items-center",children:(0,s.jsx)("div",{className:"",children:(0,s.jsx)("p",{className:"text-gray-900 text-center dark:text-white whitespace-no-wrap",children:e.trainee_id.lastName})})})}),(0,s.jsx)("td",{className:"px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm",children:(0,s.jsx)("div",{className:"flex items-center",children:(0,s.jsx)("div",{className:"",children:(0,s.jsx)("p",{className:"text-gray-900 items-center dark:text-white whitespace-no-wrap",children:e.gender})})})}),(0,s.jsx)("td",{className:"px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm",children:(0,s.jsx)("div",{className:"flex items-center",children:(0,s.jsx)("div",{className:"",children:(0,s.jsx)("p",{className:"text-gray-900 dark:text-white whitespace-no-wrap",children:e.trainee_id.email})})})}),(0,s.jsx)("td",{className:"px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm",children:(0,s.jsx)("div",{className:"flex  items-center",children:(0,s.jsx)("div",{className:"",children:(0,s.jsx)("p",{className:"text-gray-900 items-center dark:text-white whitespace-no-wrap",children:e.cohort})})})}),(0,s.jsx)("td",{className:"border-b border-gray-200 dark:border-dark-tertiary text-sm",children:(0,s.jsx)("div",{className:"flex",children:(0,s.jsx)(c.LkB,{className:" text-black text-3xl ml-6 font-size-6 cursor-pointer"})})})]})}))})]})})})})}),(0,s.jsxs)("div",{className:"flex relative items-center justify-center gap-1  mb-10 lg:left-[100px]",children:[(0,s.jsx)("button",{onClick:T,"data-testid":"prev",className:"page py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ".concat(1===h&&"disabled"),children:"Prev"}),(0,s.jsx)("button",{onClick:function(){return F(1)},"data-testid":"page1",className:"page py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ".concat(1===h&&"disabled"),children:"1"}),J.paginationGroup.map((function(e){return(0,s.jsx)("button",{onClick:function(){return F(e)},"data-testid":"page2",className:"page py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ".concat(h===e?"active":""),children:e},e)})),(0,s.jsx)("button",{onClick:function(){return F(H)},"data-testid":"page3",className:"page py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ".concat(h===H&&"disabled"),children:H}),(0,s.jsx)("button",{onClick:O,"data-testid":"next",className:"page py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ".concat(h===H&&"disabled"),children:"Next"})]})]})]})})})})}),(0,s.jsx)(y.Z,{})]})})),v=(r(9825),r(1413)),N=r(1188),k=r(1358);var w=function(e){var t=e.data,r=e.columns,a=e.title,n=t,i=r,l=(0,k.useTable)({data:n,columns:i,initialState:{pageSize:3}},k.useGlobalFilter,k.useSortBy,k.usePagination),c=(0,N.$)().t,d=l.getTableProps,o=(l.setGlobalFilter,l.getTableBodyProps),x=l.page,m=(l.nextPage,l.previousPage,l.canPreviousPage,l.canNextPage,l.gotoPage,l.pageCount,l.setPageSize,l.pageOptions,l.headerGroups),u=l.prepareRow,p=l.state;return p.globalFilter,p.pageIndex,p.pageSize,(0,s.jsx)("div",{className:"px-3 md:px-8",children:(0,s.jsx)("div",{className:"bg-white white:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-60 mb-10",children:(0,s.jsx)("div",{children:(0,s.jsxs)("div",{className:"-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto",children:[(0,s.jsx)("div",{className:"-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto",children:(0,s.jsx)("h2",{className:"text-black-800 dark:text-black font-semibold text-xl",children:c(a)})}),(0,s.jsx)("div",{className:"inline-block w-full lg:min-w-full shadow rounded-lg overflow-hidden",children:(0,s.jsxs)("table",(0,v.Z)((0,v.Z)({className:"min-w-full leading-normal"},d()),{},{children:[(0,s.jsx)("thead",{className:"w-full px-32",children:m.map((function(e){return(0,s.jsx)("tr",{className:e.getHeaderGroupProps(),children:e.headers.map((function(e){return(0,s.jsx)("th",(0,v.Z)((0,v.Z)({className:"p-6 border-b-2 border-gray-200 bg-gray-100 white:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text- uppercase tracking-wider"},e.getHeaderProps(e.getSortByToggleProps())),{},{children:e.render("Header")}))}))})}))}),(0,s.jsx)("tbody",(0,v.Z)((0,v.Z)({},o()),{},{children:x.map((function(e){u(e);var t=e.index%2!==0?"bg-light-bg dark:bg-dark-tertiary":"bg-white dark:bg-dark-bg";return(0,s.jsx)("tr",(0,v.Z)((0,v.Z)({className:" ".concat(t,"} ")},e.getRowProps()),{},{children:e.cells.map((function(e){return(0,s.jsx)("td",(0,v.Z)((0,v.Z)({className:"p-6 border-b border-gray-200 dark:border-dark-tertiary text-sm"},e.getCellProps()),{},{children:e.render("Cell")}))}))}))}))}))]}))})]})})})})},Z=JSON.parse('[{"firstname":"Arthur","lastname":"Junior","gender":"Male","email":"arthur@gmail.com","cycle":"cohort 1"},{"firstname":"Iturushimbabazi","lastname":"Gilbert","gender":"Male","email":"gilbert@gmail.com","cycle":"cohort 1"}]');var P=function(){var e=[{Header:"FIRST NAME",accessor:"firstname"},{Header:"LAST NAME",accessor:"lastname"},{Header:"Email",accessor:"email"},{Header:"Gender",accessor:"gender"},{Header:"cycle",accessor:"cycle"},{Header:"Action",accessor:"",Cell:function(e){e.row;return(0,s.jsx)("div",{className:" items-center"+((null===Z||void 0===Z?void 0:Z.length)>0?" flex":" hidden"),children:(0,s.jsx)(c.LkB,{className:" text-black text-3xl ml-6 font-size-6 cursor-pointer"})})}}];console.log(Z,"hey");var t=[];return Z&&Z.length>0&&(null===Z||void 0===Z||Z.map((function(e,r){t[r]={},t[r].firstname=e.firstname,t[r].lastname=e.lastname,t[r].email=e.email,t[r].gender=e.gender,t[r].cycle=e.cycle}))),(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(w,{data:(null===Z||void 0===Z?void 0:Z.length)>0?t:[{}],columns:e,title:"Trainee applicants"})})},A=a.lazy((function(){return r.e(667).then(r.bind(r,2667))})),C=a.lazy((function(){return Promise.all([r.e(939),r.e(84)]).then(r.bind(r,1084))}));var S=function(){return(0,s.jsxs)(n.Z5,{children:[(0,s.jsx)(n.AW,{path:"/test_redux",element:(0,s.jsx)(A,{})}),(0,s.jsx)(n.AW,{path:"/test_tailwind",element:(0,s.jsx)(i,{})}),(0,s.jsx)(n.AW,{path:"/Trainee",element:(0,s.jsx)(j,{})}),(0,s.jsx)(n.AW,{path:"/sidebar",element:(0,s.jsx)(y.Z,{})}),(0,s.jsx)(n.AW,{path:"/table",element:(0,s.jsx)(P,{})}),(0,s.jsx)(n.AW,{path:"/cycles",element:(0,s.jsx)(C,{})})]})}},3116:function(e,t,r){r.d(t,{Z:function(){return c}});r(2791);var a=r(2711),n=r(184),s=[{path:"/dashboard",icon:(0,n.jsx)(a.JO,{icon:"fontisto:pie-chart-1"}),title:"Dashboard"},{path:"/organisations",icon:(0,n.jsx)(a.JO,{icon:"fluent:people-team-20-filled"}),title:"Organisations"},{path:"/admins",icon:(0,n.jsx)(a.JO,{icon:"ic:round-people"}),title:"Admins"},{path:"/domains",icon:(0,n.jsx)(a.JO,{icon:"akar-icons:globe"}),title:"Domains"},{path:"/trainees",icon:(0,n.jsx)(a.JO,{icon:"ic:round-people"}),title:"Trainees"},{path:"/attendance",icon:(0,n.jsx)(a.JO,{icon:"teenyicons:clipboard-tick-solid"}),title:"Attendance"},{path:"/performance",icon:(0,n.jsx)(a.JO,{icon:"fa6-solid:arrow-trend-up"}),title:"Performance"},{path:"/sessions",icon:(0,n.jsx)(a.JO,{icon:"fluent:clipboard-bullet-list-ltr-16-filled"}),title:"Sessions"},{path:"/coordinators",icon:(0,n.jsx)(a.JO,{icon:"fluent:people-team-20-filled"}),title:"Coordinators"},{path:"/cohorts",icon:(0,n.jsx)(a.JO,{icon:"fa6-solid:graduation-cap"}),title:"Cohorts"},{path:"/updatedRatings",icon:(0,n.jsx)(a.JO,{icon:"charm:refresh"}),title:"Updated Ratings"},{path:"/grading",icon:(0,n.jsx)(a.JO,{icon:"bxs:dashboard"}),title:"Grading System"},{path:"/rolesandaccess",icon:(0,n.jsx)(a.JO,{icon:"heroicons:key-20-solid"}),title:"Roles & Access"},{path:"/notifications",icon:(0,n.jsx)(a.JO,{icon:"heroicons-solid:inbox-in"}),title:"Notifications"},{path:"/calendar",icon:(0,n.jsx)(a.JO,{icon:"ant-design:calendar-filled"}),title:"Calendar"}],i=[{path:"/documents",icon:(0,n.jsx)(a.JO,{icon:"heroicons:document-20-solid"}),title:"Docs"},{path:"/help",icon:(0,n.jsx)(a.JO,{icon:"nimbus:globe"}),title:"Help"}],l=[{path:"/settings",icon:(0,n.jsx)(a.JO,{icon:"akar-icons:settings-vertical"})},{path:"/settings",icon:(0,n.jsx)(a.JO,{icon:"eva:settings-2-outline"})}],c=function(){return(0,n.jsxs)("div",{className:" bg-[#fff] min-h-screen w-64 block pb-10 pt-1 relative font-sans",children:[(0,n.jsx)("div",{className:"mb-5 border-b border-[#979797]",children:(0,n.jsx)("ul",{className:"pl-4 block mt-6",children:s.map((function(e,t){return(0,n.jsx)("li",{className:"justify-content-start mb-1 align-items-center text-[#173B3F] text-base",children:(0,n.jsxs)("a",{href:e.path,className:"p-1 flex align-items-center leading-3 cursor-pointer font-semibold hover:font-bold",children:[(0,n.jsx)("label",{className:"mr-3 p-1",children:e.icon}),(0,n.jsxs)("label",{className:"p-1",children:[e.title," "]})]})},t)}))})}),(0,n.jsx)("div",{className:"mb-5",children:(0,n.jsx)("ul",{className:"pl-4 block mt-2",children:i.map((function(e,t){return(0,n.jsx)("li",{className:"justify-content-start  align-items-center text-[#173B3F]",children:(0,n.jsxs)("a",{href:e.path,className:"p-1 flex align-items-center leading-3 cursor-pointer text-base font-semibold hover:font-bold",children:[(0,n.jsx)("label",{className:"mr-3 p-1",children:e.icon}),(0,n.jsxs)("label",{className:"p-1",children:[e.title," "]})]})},t)}))})}),(0,n.jsx)("div",{className:" absolute inset-x-0 bottom-2 ",children:(0,n.jsx)("ul",{className:"px-20 flex justify-content-center",children:l.map((function(e,t){return(0,n.jsx)("li",{className:"flex justify-content-center mb-1 align-items-center text-[#173B3F]",children:(0,n.jsx)("a",{href:e.path,className:"p-1 flex align-items-center leading-5 cursor-pointer text-base",children:(0,n.jsx)("label",{className:"mr-3 p-1",children:e.icon})})},t)}))})})]})}},1429:function(e,t){t.Z=function(e,t){return{type:e,payload:t}}}}]);
//# sourceMappingURL=159.dc49e533.chunk.js.map