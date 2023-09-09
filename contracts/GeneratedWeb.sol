// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { Base64 } from "base64-sol/base64.sol";

/// @notice ServerMetadataRenderer for
contract GeneratedWeb is ERC721, Ownable, ReentrancyGuard {
    using Strings for uint256;

    bytes32 public holderMerkleRoot; // 20% discount
    bytes32 public fpMembersMerkleRoot; // 20% discount
    bytes32 public communitiesMerkleRoot; // 15% discount

    uint256 internal immutable FUNDS_SEND_GAS_LIMIT = 210_000;

    SalesConfig public config;

    struct SalesConfig {
        uint64 startTime;
        uint64 endTime;
        uint256 startPriceInWei; // 1 eth
        uint256 endPriceInWei; // .1 eth
        address payable fundsRecipient;
    }

    constructor()
      ERC721("Generated Web", "GENWEB")
    {
        // TODO: set this timestamp to a specific date/time
        config.startTime = uint64(block.timestamp);
        config.endTime = uint64(block.timestamp + 3600);
        config.startPriceInWei = 1000000000000000000; // 1 eth
        config.endPriceInWei = 100000000000000000; // .1 eth
        // TODO
        config.fundsRecipient = payable(0x2D63a6Ee734287955Edc1201ef3344E5Fe7E2847);

        tokenSeeds[0] = '67436375f8fdba37f92c571bfe17a887';
    }

    function getCurrentPrice() public view returns (uint256) {
        uint256 elapsedTime = block.timestamp - config.startTime;
        uint256 duration = config.endTime - config.startTime;
        uint256 halflife = 700; // adjust this to adjust speed of decay

        if (block.timestamp < config.startTime) {
            return config.startPriceInWei;
        }

        if (elapsedTime >= duration) {
            return config.endPriceInWei;
        }

        // h/t artblocks
        uint256 decayedPrice = config.startPriceInWei;
        // Divide by two (via bit-shifting) for the number of entirely completed
        // half-lives that have elapsed since auction start time.
        decayedPrice >>= elapsedTime / halflife;
        // Perform a linear interpolation between partial half-life points, to
        // approximate the current place on a perfect exponential decay curve.
        decayedPrice -= (decayedPrice * (elapsedTime % halflife)) / halflife / 2;
        if (decayedPrice < config.endPriceInWei) {
            // Price may not decay below stay `basePrice`.
            return config.endPriceInWei;
        }
        return decayedPrice;
    }

    function getUserDiscount(address userAddress) public view returns (uint256) {
        // check against merkle roots
    }

    function _mintWithChecks() internal {
        require(block.timestamp >= config.startTime && block.timestamp <= config.endTime, "Sale inactive");
        uint256 currentPrice = getCurrentPrice();
        require(msg.value >= currentPrice, "Not enough ether");
    }

    function mintSpecific(uint256 seed) external payable {

    }

    function mintRandom() external payable {

    }

    string public templateA = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><script>let e;var t,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function i(e){return e&&e.__esModule?e.default:e}var l={};l=\'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{font-size:100%;font:inherit;vertical-align:baseline;border:0;margin:0;padding:0}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:"";content:none}table{border-collapse:collapse;border-spacing:0}\';var r={};r="html,body{width:100%;height:100%;margin:0;padding:0}.container{width:100%;height:100%;display:flex;position:relative}.element{box-sizing:border-box;flex-grow:1;flex-shrink:1;min-width:0;min-height:0;display:flex}input,button{box-sizing:border-box;max-width:100%}select{width:100%}";var o={init:e=>{var t,n,i,l;e+="";let r=function(e){let t=1779033703,n=3144134277,i=1013904242,l=2773480762;for(let r=0,o;r<e.length;r++)t=n^Math.imul(t^(o=e.charCodeAt(r)),597399067),n=i^Math.imul(n^o,2869860233),i=l^Math.imul(i^o,951274213),l=t^Math.imul(l^o,2716044179);return t=Math.imul(i^t>>>18,597399067),n=Math.imul(l^n>>>22,2869860233),i=Math.imul(t^i>>>17,951274213),l=Math.imul(n^l>>>19,2716044179),[(t^n^i^l)>>>0,(n^t)>>>0,(i^t)>>>0,(l^t)>>>0]}(e),o=(t=r[0],n=r[1],i=r[2],l=r[3],function(){t>>>=0,n>>>=0,i>>>=0,l>>>=0;var e=t+n|0;return t=n^n>>>9,n=i+(i<<3)|0,i=i<<21|i>>>11,e=e+(l=l+1|0)|0,i=i+e|0,(e>>>0)/4294967296});return{value:()=>o(),range:(e=0,t=1)=>e+o()*(t-e),rangeInteger:(e=0,t=1)=>e+Math.round(o()*(t-e)),pick:e=>e[Math.floor(o()*e.length)],probability:e=>o()<e,shuffle:e=>{let t=e.length,n,i;for(;0!==t;)i=Math.floor(o()*t),t-=1,n=e[t],e[t]=e[i],e[i]=n;return e}}}};function a(e,t,n){return Math.min(Math.max(e,t),n)}var c={init:e=>{let t={r:e.rangeInteger(0,255),g:e.rangeInteger(0,255),b:e.rangeInteger(0,255)},n={min:0,max:255},i=e.rangeInteger(50);function l(){let l=e.rangeInteger(1,i);t.r+=e.rangeInteger(-l,l),t.r=a(t.r,n.min,n.max),t.g+=e.rangeInteger(-l,l),t.g=a(t.g,n.min,n.max),t.b+=e.rangeInteger(-l,l),t.b=a(t.b,n.min,n.max)}return{single:()=>(function(){l();let e={...t};return e})(),set:()=>(l(),{low:{r:a(t.r-30,n.min,n.max),g:a(t.g-30,n.min,n.max),b:a(t.b-30,n.min,n.max)},mid:{r:t.r,g:t.g,b:t.b},high:{r:a(t.r+30,n.min,n.max),g:a(t.g+30,n.min,n.max),b:a(t.b+30,n.min,n.max)}})}},stringify:(e,t=1)=>`rgba(${e.r},${e.g},${e.b}, ${t})`,distanceSquared:(e,t)=>Math.pow(e.r-t.r,2)+Math.pow(e.g-t.g,2)+Math.pow(e.b-t.b,2),rgbToHsv:e=>{let t,n=e.r/255,i=e.g/255,l=e.b/255,r=Math.max(n,i,l),o=Math.min(n,i,l),a=r-o;if(r==o)t=0;else{switch(r){case n:t=(i-l)/a+(i<l?6:0);break;case i:t=(l-n)/a+2;break;case l:t=(n-i)/a+4}t/=6}return{h:t,s:0==r?0:a/r,v:r}}};const s=o.init("JRLxSPRPSxJK"),d="Document".split("");d[0]=" "+d[0].toUpperCase();const m=s.shuffle(function(e){let t=[];return!function n(i){if(1===i)t.push([...e]);else for(let t=0;t<i;t++)n(i-1),function(t,n){let i=e[t];e[t]=e[n],e[n]=i}(i%2?0:t,i-1)}(e.length),t}(d));\nn.oid=\'';
    
    string public templateB = '\',\n[/*@__PURE__*/i(l),/*@__PURE__*/i(r)].forEach(e=>{let t=document.createElement("style");t.innerHTML=e,document.head.appendChild(t)});const f=o.init("0x5cfcf4"),g={MAX_LEVELS:5,MICRO_CLUSTER_PROBABILITY:.05},u={NONE:0,RADIO_BUTTON:1,SELECT:2,INPUT:3,BUTTON:4,IMAGE:5},h=[66,145,239,305,330,380,401,487,516,754,786,791,935],b=Array(1e3).fill(0).map(function(){let e="";for(let t=0;t<16;t++)e+=f.rangeInteger(0,256).toString(16).padStart(2,"0");return e}),p=({generate:e=>{let t=m.slice(0,e).map(e=>e.join(""));return t}}).generate(1e3),y=n.oid||((e=decodeURIComponent((window.location.search.match(RegExp("(?:[?|&]id=)([^&]+)"))||[,""])[1].replace(/\\+/g,"%20"))||null)&&b.includes(e)||(e=b[0],window.history.replaceState({},"",`?id=${e}`)),e),x=(Object.keys(t=function(e){Object.keys(e).forEach(t=>{e[t].color=c.rgbToHsv(e[t].mainColor).h});let t=Object.keys(e).map(t=>e[t].color),n=Math.min(...t),i=Math.max(...t);return Object.keys(e).forEach(t=>{e[t].color=(e[t].color-n)/(i-n)}),e}(function(e){Object.keys(e).forEach(t=>{let n=e[t].elements;e[t].fill=function(e){let t=0,n=.4*Math.min(1,1-(e.margin-70)/30)+.6;return function e(n,i){if(n.visibility&&1!==n.basis)t+=n.basis*i*n.fill*(0!==n.alignment?.5:1);else for(let t of(i*=n.basis,n.children))e(t,i)}(e,n),t}(n)});let t=Object.keys(e).reduce((t,n)=>{let i=e[n].fill;return t.min=Math.min(t.min,i),t.max=Math.max(t.max,i),t},{min:1/0,max:-1/0});return Object.keys(e).forEach(n=>{e[n].fill=(e[n].fill-t.min)/(t.max-t.min),e[n].fill=Math.max(.001,Math.min(.999,e[n].fill))}),e}(function(e){Object.keys(e).forEach(t=>{e[t].complexity=e[t].elements.descendants.length});let t=Object.keys(e).reduce((t,n)=>{let i=e[n].complexity;return t.min=Math.min(t.min,i),t.max=Math.max(t.max,i),t},{min:1/0,max:-1/0});return Object.keys(e).forEach(n=>{e[n].complexity=Math.pow((e[n].complexity-t.min)/(t.max-t.min),.5),e[n].fill=Math.max(.001,Math.min(.999,e[n].fill))}),e}(b.reduce((e,t)=>(e[t]=function(e){let t=o.init(e),n=c.init(t),i=t.value(),l={margin:{value:i>.5?i:0,min:0,max:100},variance:{value:t.value(),min:0,max:1},fragmentation:{value:t.value(),min:2,max:5},distribution:{value:t.value(),min:0,max:1},padding:{value:i>.5?t.value():0,min:0,max:.05},alignment:{value:t.value(),min:0,max:1},filtering:{value:t.value(),min:0,max:1},raise:{value:t.value(),min:0,max:3},shadow:{value:t.value(),min:0,max:1},fill:{value:t.value(),min:.5,max:1}},r=function e(i,l,r=!1){var o,a,c;if(l>=(r?g.MAX_LEVELS+1:t.rangeInteger(3,g.MAX_LEVELS)))return;let m=[],f=l===Math.floor((a=s((o=i.raise).value,0),c=o.min,a*(o.max+1-c)+c)),u=t.rangeInteger(r?1:0,8-l);0===l&&0===u&&(u=t.rangeInteger(1,i.fragmentation.max));let h=l===g.MAX_LEVELS-1||0===u,b=t.value()*l>2*t.value();for(let n=0;n<u;n++){let n=e(i,l+1,r||t.probability(g.MICRO_CLUSTER_PROBABILITY));n&&m.push(n)}let p=d(i.distribution,i.variance.value),y=Array(u).fill(0).map(()=>t.range(0,1)),x=y.reduce((e,t)=>e+t,0);y=y.map(e=>e/x).map(e=>e*p+1/u*(1-p)),m.forEach((e,t)=>{e.basis=y[t]});let v=[,,,,].fill(0).map(()=>d(i.padding,i.variance.value)),M=b?t.rangeInteger(1,3):0,k=!0;k=!!r||(l<3?!t.probability(d(i.filtering,i.variance.value)):t.probability(.2*l));let w=f?d(i.shadow,1):0,E=f?t.rangeInteger(1,5):0,I=f?d(i.fill,1):1,O=h&&!r?t.rangeInteger(0,5):0,$=n.set(),T=n.set(),C={background:$.mid,border:{top:l%2==0?$.high:$.low,left:l%2==0?$.high:$.low,bottom:l%2==0?$.low:$.high,right:l%2==0?$.low:$.high},content:T},S={basis:1,margin:0===l?d(i.margin,0):0,padding:v,alignment:M,visibility:k,shadow:w,parent:null,content:O,contentSize:t.value(),contentValue:t.value(),colors:C,zIndex:E,fill:I,children:m,link:null,descendants:[...m.map(e=>e.descendants),...m].flat()};return m.forEach(e=>{e.parent=S}),S}(l,0);if(!r.descendants.some(e=>e.visibility)){let e=t.pick(r.descendants);e.visibility=!0}if(!r.descendants.some(e=>0!==e.content&&e.visibility)){let e=t.pick(r.descendants);e.content=t.rangeInteger(1,5)}let a={id:e,mainColor:n.set().low,elements:r};return a;function s(e,n){let i=Math.max(0,e-n/2),l=Math.min(1,e+n/2);return t.range(i,l)}function d(e,t){var n,i;return n=s(e.value,t),i=e.min,n*(e.max-i)+i}}(t),e),{}))))).forEach((e,n)=>{t[e].title=p[n]}),Object.keys(t).map(e=>(delete t[e].distance,delete t[e].axis,delete t[e].direction,t[e])).filter(e=>e.id!==y).forEach(e=>{let n=[{axis:"complexity",distance:Math.abs(e.complexity-t[y].complexity)},{axis:"fill",distance:Math.abs(e.fill-t[y].fill)},{axis:"color",distance:Math.sqrt(Math.pow(e.mainColor.r/255-t[y].mainColor.r/255,2)+Math.pow(e.mainColor.g/255-t[y].mainColor.g/255,2)+Math.pow(e.mainColor.b/255-t[y].mainColor.b/255,2))}],i=n.reduce((e,{axis:t,distance:n})=>e+n,0),l=n.sort((e,t)=>e.distance-t.distance)[0].axis,r=e[l]>t[y][l]?"greater":"less";e.distance=i,e.axis=l,e.direction=r}),t),v=function(){let e=document.createElement("div");return e.classList.add("container"),document.body.appendChild(e),e}();x[y].title;const M=[];function k(e,t,n){return Object.values(e).filter(({axis:e,direction:i})=>e===t&&i===n).sort((e,t)=>e.distance-t.distance).map(({id:e})=>e)}const w={complexity:{prev:k(x,"complexity","less"),next:k(x,"complexity","greater")},fill:{prev:k(x,"fill","less"),next:k(x,"fill","greater")},color:{prev:k(x,"color","less"),next:k(x,"color","greater")},force:[]};h.includes(b.indexOf(y)+1)?w.force=[b[b.indexOf(y)+10]]:h.includes(b.indexOf(y))&&(w.force=[b[b.indexOf(y)-10]]),function(e,t,n,i){t.innerHTML="",document.title="Web - "+e.title,document.body.style.backgroundColor=c.stringify(e.mainColor);let l={complexity:{prev:0,next:0},fill:{prev:0,next:0},force:0};e.elements.descendants.forEach(t=>{if(!t.visibility)return;let r=null;if(t.content!==u.NONE){if(l.force<i.force.length)r=i.force[l.force],l.force++,M.push(r);else switch(t.content){case u.RADIO_BUTTON:r=i.complexity.prev[l.complexity.prev%i.complexity.prev.length],l.complexity.prev++;break;case u.SELECT:r=i.complexity.next[l.complexity.next%i.complexity.next.length],l.complexity.next++;break;case u.INPUT:r=i.fill.prev[l.fill.prev%i.fill.prev.length],l.fill.prev++;break;case u.BUTTON:r=i.fill.next[l.fill.next%i.fill.next.length],l.fill.next++;break;case u.IMAGE:let o=t.colors.background,a=Object.keys(n).reduce((t,i)=>{let l=n[i],r=c.distanceSquared(o,l);return r<t.distance&&i!=e.id&&(t.distance=r,t.color=o,t.id=i),t},{distance:1/0,color:null,id:null});r=a.id}}r&&(t.link=r,M.push(r))}),function e(t,n,i){let l=document.createElement("div");if(l.classList.add("element"),l.style.flexBasis=`${100*n.basis}%`,l.style.flexGrow=1,l.style.flexDirection=i%2?"column":"row",l.style.padding=n.padding.map(e=>`${100*e}%`).join(" "),l.style.margin=10*Math.round(n.margin/10)+"px",l.style.width=`${100*n.fill}%`,n.visibility&&(l.style.backgroundColor=c.stringify(n.colors.background),l.style.borderWidth="1px",l.style.borderStyle="solid",l.style.borderColor=`${c.stringify(n.colors.border.top)} ${c.stringify(n.colors.border.right)} ${c.stringify(n.colors.border.bottom)} ${c.stringify(n.colors.border.left)}`),0!==n.alignment&&(l.style.alignSelf=["start","center","end"][n.alignment-1]),0!==n.shadow&&n.visibility){let e=Math.floor(15*n.shadow+5);l.style.boxShadow=`${e}px ${e}px ${2*e}px #000C`,l.style.zIndex=n.zIndex}if(n.visibility){let e=null,t=null;switch(n.content){case u.NONE:break;case u.RADIO_BUTTON:e="change";let i=Array(Math.floor(3*n.contentSize)+2).fill(0).map(()=>\'<input type="radio" name="r">\');i[Math.floor(n.contentValue*i.length)]=\'<input type="radio" name="r" checked>\',t=`<form>${i.join("")}</form>`;break;case u.SELECT:e="change",t=`<select style="background-color: ${c.stringify(n.colors.content.high)}"">${Array.from({length:Math.floor(15*n.contentSize+2)}).fill("<option></option>").join("")}</select>`;break;case u.INPUT:e="click",t=`<input type="text" style="width: ${18*(Math.floor(6*n.contentSize)+3)}px; height: 18px; background-color: ${c.stringify(n.colors.content.high)}; border-top-color: ${c.stringify(n.colors.content.high)}; border-left-color: ${c.stringify(n.colors.content.high)}; border-right-color: ${c.stringify(n.colors.content.low)}; border-bottom-color: ${c.stringify(n.colors.content.low)};">`;break;case u.BUTTON:e="click",t=`<button style="width: ${18*(Math.floor(4*n.contentSize)+1)}px; height: 18px; background-color: ${c.stringify(n.colors.content.low)}; border-top-color: ${c.stringify(n.colors.content.high)}; border-left-color: ${c.stringify(n.colors.content.high)}; border-right-color: ${c.stringify(n.colors.content.low)}; border-bottom-color: ${c.stringify(n.colors.content.low)};"></button>`;break;case u.IMAGE:t=`<a href=${n.link?`?id=${n.link}`:"#"} style="display: block; border: none;"><img src="#" style="width: 100%; height: 100%;"></a>`}null!==t&&(l.innerHTML=t,n.link&&null!==e&&l.children[0].addEventListener(e,e=>{window.location.href=`?id=${n.link}`}))}t.appendChild(l),n.children.forEach(t=>{e(l,t,i+1)})}(t,e.elements,0)}(x[y],v,Object.keys(x).reduce((e,t)=>(e[t]=x[t].mainColor,e),{}),w);const E=document.createElement("canvas"),I=E.getContext("2d");E.width=16,E.height=16,function(e,t,n,i,l=!1){t.fillStyle=c.stringify(e.mainColor,1),t.fillRect(n,i,16,16);let r=[];e.elements.visibility&&r.push(e.elements.colors.background),r.push(...e.elements.descendants.filter(e=>e.visibility).map(e=>e.colors.background)),t.fillStyle=c.stringify(r[0],1),t.fillRect(n+2,i+2,12,12),r=r.map(e=>{let t=c.rgbToHsv(e);return{...e,...t}}).sort((e,t)=>t.s-e.s);for(let e=0;e<12;e++)for(let l=0;l<12;l++){let o=l+12*e,a=o/144,s=Math.floor(a*(r.length-1)),d=r[s];t.fillStyle=c.stringify(d,1),t.fillRect(n+2+e,i+2+l,1,1)}}(x[y],I,0,0);const O=document.createElement("link");O.type="image/x-icon",O.rel="shortcut icon",O.href=E.toDataURL("image/x-icon"),document.getElementsByTagName("head")[0].appendChild(O);</script></body></html>';

    mapping(uint256 => string) public tokenSeeds;

    // TODO: save the tokens, with IPFS links, to storage
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        string memory description = "this is our description";
        string memory finalTemplate = Base64.encode(bytes(string(abi.encodePacked(templateA, tokenSeeds[tokenId], templateB))));
        string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name":"', tokenId, '", "description":"', description, '", "animation_url":"data:text/html;base64,', finalTemplate, '"}'))));
        return string(abi.encodePacked('data:application/json;base64,', json));
    }

    // Allowlists. We can have various allowlists, some of which are at different discount tiers.
        // Artist dropholders, 20%
        // Fingerprints members, 20%
        // Selected communities, 15%

    function updateConfig(
        uint64 startTime,
        uint64 endTime,
        uint256 startPriceInWei, // 1 eth
        uint256 endPriceInWei, // .1 eth
        address payable fundsRecipient
    ) external onlyOwner {
        config.startTime = startTime;
        config.endTime = endTime;
        config.startPriceInWei = startPriceInWei;
        config.endPriceInWei = endPriceInWei;
        config.fundsRecipient = fundsRecipient;
    }

    function withdraw() external nonReentrant {
        uint256 funds = address(this).balance;

        // Payout recipient
        (bool sent, ) = config.fundsRecipient.call{
            value: funds,
            gas: FUNDS_SEND_GAS_LIMIT
        }("");
        require(sent, "Ether not withdrawn");
    }

}