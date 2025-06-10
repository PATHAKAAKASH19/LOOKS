import{R as ae,r as s,j as c}from"./index-DM-R_KEw.js";var se=Object.defineProperty,ie=Object.defineProperties,ce=Object.getOwnPropertyDescriptors,H=Object.getOwnPropertySymbols,ue=Object.prototype.hasOwnProperty,le=Object.prototype.propertyIsEnumerable,F=(e,n,t)=>n in e?se(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,_=(e,n)=>{for(var t in n||(n={}))ue.call(n,t)&&F(e,t,n[t]);if(H)for(var t of H(n))le.call(n,t)&&F(e,t,n[t]);return e},de=(e,n)=>ie(e,ce(n)),q=ae.createContext({}),fe=q.Provider,K=()=>s.useContext(q);function ve(e,n,t=!0){const r=s.useRef();s.useEffect(()=>{r.current=e},[e]),s.useEffect(()=>{if(t&&n!==null){const o=setInterval(()=>{r.current&&r.current()},n);return()=>clearInterval(o)}},[n,t])}function pe({totalPages:e,wrapMode:n,initialPage:t}){const[r,o]=s.useState(0);return s.useEffect(()=>{t&&o(Math.max(0,Math.min(t,e)))},[t,e]),{currentPage:r,goToPage:i=>{i<0||i>=e||o(i)},goForward:()=>{o(n==="wrap"?i=>(i+1)%e:i=>Math.min(i+1,e-1))},goBack:()=>{o(n==="wrap"?i=>(i-1+e)%e:i=>Math.max(i-1,0))}}}function M(e,n){return new Array(e).fill(0).map((t,r)=>r*n)}function he(e){let n=0;return e.map(t=>n+=t)}var Q=()=>typeof window<"u";function C(...e){return e.filter(Boolean).join(" ")}function X(e){return"clientY"in e}function me(e){const[n,t]=s.useState();return s.useEffect(()=>{if(!e.current)return;const r=e.current,o=new ResizeObserver(()=>t(r.getBoundingClientRect()));return o.observe(r),()=>{o.unobserve(r)}},[e]),n}function ge({element:e,scrollDistance:n}){const[t,r]=s.useState(0),[o,a]=s.useState(M(t,0)),u=me(e);return s.useEffect(()=>{var f;const i=e.current;if(!(i&&u))return;const p=i.scrollWidth,h=i.offsetWidth,x=p-h;if(h!==0)switch(n){case"screen":{const d=Math.round(p/h);r(d),a(M(d,h));break}case"slide":{const d=((f=i.querySelector("#nuka-wrapper"))==null?void 0:f.children)||[],E=Array.from(d).map(k=>k.offsetWidth),j=he([0,...E.slice(0,-1)]),w=j.findIndex(k=>k>=x)+1;r(w),a(j);break}default:if(typeof n=="number"&&n>0){const d=Math.ceil(x/n)+1;r(d),a(M(d,n))}}},[e,n,u]),{totalPages:t,scrollOffset:o}}function z({element:e,enabled:n}){const[t,r]=s.useState(!1),o=e==null?void 0:e.current;return s.useEffect(()=>{if(o&&o.addEventListener&&n){const a=()=>r(!0),u=()=>r(!1);return o.addEventListener("mouseover",a),o.addEventListener("mouseout",u),()=>{o.removeEventListener("mouseover",a),o.removeEventListener("mouseout",u)}}},[o,n]),t}function we({element:e,enabled:n,goForward:t,goBack:r}){const o=e==null?void 0:e.current;s.useEffect(()=>{if(o&&n){const a=u=>{u.key==="ArrowLeft"?r():u.key==="ArrowRight"&&t()};return o.addEventListener("keydown",a),()=>o.removeEventListener("keydown",a)}},[n,r,t,o])}var V="(prefers-reduced-motion: no-preference)",ke=()=>Q()?!window.matchMedia(V).matches:!0;function be({enabled:e}){const[n,t]=s.useState(ke);return s.useEffect(()=>{if(!(Q()&&e))return;const r=window.matchMedia(V),o=a=>{t(!a.matches)};return r.addEventListener("change",o),()=>{r.removeEventListener("change",o)}},[e]),n}function ye(){const{currentPage:e,totalPages:n,wrapMode:t,goBack:r,goForward:o}=K(),a=t!=="nowrap",u=a||e>0,f=a||e<n-1,i=C("nuka-nav-button","nuka-nav-button-prev",u&&"nuka-nav-button-enabled"),p=C("nuka-nav-button","nuka-nav-button-next",f&&"nuka-nav-button-enabled");return c.jsxs(c.Fragment,{children:[c.jsx("div",{className:i,onClick:r,children:c.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentcolor",children:c.jsx("path",{fillRule:"evenodd",d:"M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z",clipRule:"evenodd"})})}),c.jsx("div",{className:p,onClick:o,children:c.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentcolor",children:c.jsx("path",{fillRule:"evenodd",d:"M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z",clipRule:"evenodd"})})})]})}var xe=()=>{const{totalPages:e,currentPage:n,goToPage:t}=K(),r=o=>C("nuka-page-indicator",n===o?"nuka-page-indicator-active":"");return c.jsx("div",{className:"nuka-page-container","data-testid":"pageIndicatorContainer",children:[...Array(e)].map((o,a)=>c.jsx("button",{onClick:()=>t(a),className:r(a),children:c.jsx("span",{className:"nuka-hidden",children:a+1})},a))})};function Ee(e,{insertAt:n}={}){if(typeof document>"u")return;const t=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css",n==="top"&&t.firstChild?t.insertBefore(r,t.firstChild):t.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}Ee(`.nuka-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.nuka-container {
  position: relative;
}
.nuka-slide-container {
  position: relative;
}
.nuka-overflow {
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.nuka-overflow.scroll-smooth {
  scroll-behavior: smooth;
}
.nuka-overflow.scroll-auto {
  scroll-behavior: auto;
}
.nuka-overflow::-webkit-scrollbar {
  display: none;
}
.nuka-wrapper {
  display: flex;
}
.nuka-nav-button {
  position: absolute;
  top: calc(50% - 2rem);
  margin: 1rem;
  display: none;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  background-color: rgba(146, 148, 151, 0.5);
  color: white;
  border-radius: 9999px;
  font-size: 1rem;
  user-select: none;
}
.nuka-nav-button.nuka-nav-button-prev {
  left: 0;
  margin-right: 1rem;
}
.nuka-nav-button.nuka-nav-button-next {
  right: 0;
  margin-left: 1rem;
}
.nuka-nav-button:hover {
  background-color: rgba(146, 148, 151, 0.65);
}
.nuka-nav-button-enabled {
  display: block;
}
.nuka-container-auto-hide .nuka-nav-button {
  display: none;
}
.nuka-container-auto-hide:hover .nuka-nav-button-enabled {
  display: block;
}
.nuka-page-container {
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}
.nuka-page-indicator {
  width: 0.75rem;
  height: 0.75rem;
  cursor: pointer;
  border-radius: 9999px;
  border-style: none;
  background-color: rgba(146, 148, 151, 0.65);
}
.nuka-page-indicator.nuka-page-indicator-active,
.nuka-page-indicator.nuka-page-indicator-active:hover {
  background-color: rgb(229 231 235 / 1);
}
.nuka-page-indicator:hover {
  background-color: rgb(229 231 235 / 1);
}
`);var je={arrows:c.jsx(ye,{}),autoplay:!1,autoplayInterval:3e3,dots:c.jsx(xe,{}),id:"nuka-carousel",keyboard:!0,minSwipeDistance:50,scrollDistance:"screen",showArrows:!1,showDots:!1,swiping:!0,wrapMode:"nowrap"},Se=s.forwardRef((e,n)=>{const t=_(_({},je),e),{afterSlide:r,arrows:o,autoplay:a,autoplayInterval:u,beforeSlide:f,children:i,className:p,dots:h,id:x,keyboard:d,minSwipeDistance:E,scrollDistance:j,showArrows:w,showDots:k,swiping:R,title:O,wrapMode:Y,initialPage:S}=t,L=s.useRef(null),v=s.useRef(null),I=s.useRef(-1),T=s.useRef(null),{totalPages:B,scrollOffset:N}=ge({element:v,scrollDistance:j}),{currentPage:m,goBack:b,goForward:g,goToPage:P}=pe({totalPages:B,wrapMode:Y,initialPage:S}),[A,Z]=s.useState(null),[W,D]=s.useState(null),U=l=>{R&&(D(null),Z(X(l)?l.clientX:l.targetTouches[0].clientX))},G=l=>{R&&D(X(l)?l.clientX:l.targetTouches[0].clientX)},J=()=>{if(!R||!v.current||!A||!W)return;const l=A-W,y=l>E,oe=l<-E;(y||oe)&&(y?g():b())};we({element:L,enabled:d,goForward:g,goBack:b}),s.useImperativeHandle(n,()=>({goForward:g,goBack:b,goToPage:P}),[g,b,P]);const $=z({element:v,enabled:a}),ee=z({element:T,enabled:a&&w===!0}),ne=be({enabled:a});ve(g,u,a&&!($||ne||ee)),s.useEffect(()=>{if(v.current){const l=I.current,y=m;f&&f(l,y),v.current.scrollLeft=N[m],r&&setTimeout(()=>r(y),0),I.current=m,(S===void 0||m===S)&&(v.current.classList.remove("scroll-auto"),v.current.classList.add("scroll-smooth"))}},[m,N,f,r,S]);const te=C("nuka-container",w==="hover"&&"nuka-container-auto-hide",p),re=de(_({},t),{totalPages:B,currentPage:m,scrollOffset:N,goBack:b,goForward:g,goToPage:P});return c.jsxs(fe,{value:re,children:[c.jsxs("div",{className:te,"aria-labelledby":"nuka-carousel-heading",tabIndex:d?0:void 0,ref:L,id:x,children:[O&&c.jsx("h3",{id:"nuka-carousel-heading",className:"nuka-hidden",children:O}),c.jsxs("div",{className:"nuka-slide-container",children:[c.jsx("div",{className:"nuka-overflow",ref:v,onTouchEnd:J,onTouchMove:G,onTouchStart:U,id:"nuka-overflow","data-testid":"nuka-overflow",style:{touchAction:"pan-y"},children:c.jsx("div",{className:"nuka-wrapper",id:"nuka-wrapper","data-testid":"nuka-wrapper",children:i})}),w&&c.jsx("div",{ref:T,children:o})]})]}),k&&h]})});Se.displayName="Carousel";export{Se as C};
