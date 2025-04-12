(()=>{var e={};e.id=384,e.ids=[384],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},56037:e=>{"use strict";e.exports=require("mongoose")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},70340:(e,r,t)=>{"use strict";t.d(r,{A:()=>i});var n=t(56037),s=t.n(n);let a=new(s()).Schema({brand:{type:String,required:!0},name:{type:String,required:!0},price:{type:Number},experience:{type:String,enum:["Beginner","Intermediate","Advanced"]},profile:{umami:{type:Number,required:!0},grassy:{type:Number,required:!0},nutty:{type:Number,required:!0},sweetness:{type:Number,required:!0}},usage:[String],cultivars:[String]}),i=s().models.Matcha||s().model("Matcha",a)},75745:(e,r,t)=>{"use strict";t.d(r,{A:()=>o});var n=t(56037),s=t.n(n);let a=process.env.MONGODB_URI,i=global._mongoose||{conn:null,promise:null};global._mongoose=i;let o=async function(){return i.conn||(i.promise||(i.promise=s().connect(a,{dbName:"test"}).then(e=>e)),i.conn=await i.promise),i.conn}},78335:()=>{},90600:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>v,routeModule:()=>g,serverHooks:()=>h,workAsyncStorage:()=>x,workUnitAsyncStorage:()=>y});var n={};t.r(n),t.d(n,{POST:()=>l});var s=t(96559),a=t(48088),i=t(37719),o=t(32190),u=t(75745),c=t(70340);let p=["koicha","usucha","latte","culinary"],m={Beginner:0,Intermediate:1,Advanced:2};function d(e,r,t){var n;let s=e=>"object"==typeof e&&null!==e&&"profile"in e,a=s(e)?e.profile:e,i=a.umami??3,o=a.grassy??3,u=a.nutty??3,c=a.sweetness??3,d=(s(e),e.price??30),l=e.experience??"Intermediate",g=(s(e),n=e.usage??[],p.map(e=>+!!n.includes(e))).map(e=>.5*e),x=function(e){let r=[0,0,0];return r[m[e]]=1,r}(l),y=[i,o,u,c,d];return[...r&&t?y.map((e,n)=>(e-r[n])/(t[n]||1)):y,...x,...g]}async function l(e){try{let r=await e.json();await (0,u.A)();let t=(await c.A.find().lean()).map(e=>({_id:e._id?.toString(),brand:e.brand,name:e.name,price:e.price??null,experience:e.experience??"Intermediate",profile:e.profile,usage:e.usage,cultivars:e.cultivars})),n=function(e,r,t=3){let n=r.map(e=>{let r=e.profile;return[r.umami??3,r.grassy??3,r.nutty??3,r.sweetness??3,e.price??30]}),s=n[0].map((e,r)=>n.reduce((e,t)=>e+t[r],0)/n.length),a=n[0].map((e,r)=>Math.sqrt(n.reduce((e,t)=>e+(t[r]-s[r])**2,0)/n.length)),i=d(e,s,a);return r.map(e=>{var r;return{matcha:e,dist:(r=d(e,s,a),Math.sqrt(i.reduce((e,t,n)=>e+(t-r[n])**2,0)))}}).sort((e,r)=>e.dist-r.dist).slice(0,t).map(e=>e.matcha)}(r,t);return o.NextResponse.json({results:n})}catch(e){return console.error("Error in recommend API:",e),o.NextResponse.json({error:"Failed to recommend matchas"},{status:500})}}let g=new s.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/recommend/route",pathname:"/api/recommend",filename:"route",bundlePath:"app/api/recommend/route"},resolvedPagePath:"/Users/WilliamHuang/Documents/GitHub/matcha-match/src/app/api/recommend/route.ts",nextConfigOutput:"",userland:n}),{workAsyncStorage:x,workUnitAsyncStorage:y,serverHooks:h}=g;function v(){return(0,i.patchFetch)({workAsyncStorage:x,workUnitAsyncStorage:y})}},96487:()=>{}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),n=r.X(0,[447,580],()=>t(90600));module.exports=n})();