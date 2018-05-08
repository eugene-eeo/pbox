function done_typing(t,e){var n=e.start||function(){},r=e.stop||function(){},c=e.delay||200,i=!0,o=null;function s(t){i&&(n(t),i=!1),clearTimeout(o)}function a(t){o=setTimeout(function(){i=!(o=null),r(t)},c)}return t.addEventListener("keydown",s),t.addEventListener("keyup",a),function(){t.removeEventListener("keydown",s),t.removeEventListener("keyup",a)}}!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(t):"function"==typeof define&&define.amd?define(e):e(t)}("undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:this,function(e){"use strict";var n,r=e.Base64;if("undefined"!=typeof module&&module.exports)try{n=require("buffer").Buffer}catch(t){}var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=function(t){for(var e={},n=0,r=t.length;n<r;n++)e[t.charAt(n)]=n;return e}(c),o=String.fromCharCode,s=function(t){if(t.length<2)return(e=t.charCodeAt(0))<128?t:e<2048?o(192|e>>>6)+o(128|63&e):o(224|e>>>12&15)+o(128|e>>>6&63)+o(128|63&e);var e=65536+1024*(t.charCodeAt(0)-55296)+(t.charCodeAt(1)-56320);return o(240|e>>>18&7)+o(128|e>>>12&63)+o(128|e>>>6&63)+o(128|63&e)},a=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,l=function(t){return t.replace(a,s)},h=function(t){var e=[0,2,1][t.length%3],n=t.charCodeAt(0)<<16|(1<t.length?t.charCodeAt(1):0)<<8|(2<t.length?t.charCodeAt(2):0);return[c.charAt(n>>>18),c.charAt(n>>>12&63),2<=e?"=":c.charAt(n>>>6&63),1<=e?"=":c.charAt(63&n)].join("")},u=e.btoa?function(t){return e.btoa(t)}:function(t){return t.replace(/[\s\S]{1,3}/g,h)},f=n?n.from&&n.from!==Uint8Array.from?function(t){return(t.constructor===n.constructor?t:n.from(t)).toString("base64")}:function(t){return(t.constructor===n.constructor?t:new n(t)).toString("base64")}:function(t){return u(l(t))},d=function(t,e){return e?f(String(t)).replace(/[+\/]/g,function(t){return"+"==t?"-":"_"}).replace(/=/g,""):f(String(t))},p=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),m=function(t){switch(t.length){case 4:var e=((7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3))-65536;return o(55296+(e>>>10))+o(56320+(1023&e));case 3:return o((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return o((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},y=function(t){return t.replace(p,m)},g=function(t){var e=t.length,n=e%4,r=(0<e?i[t.charAt(0)]<<18:0)|(1<e?i[t.charAt(1)]<<12:0)|(2<e?i[t.charAt(2)]<<6:0)|(3<e?i[t.charAt(3)]:0),c=[o(r>>>16),o(r>>>8&255),o(255&r)];return c.length-=[0,0,2,1][n],c.join("")},j=e.atob?function(t){return e.atob(t)}:function(t){return t.replace(/[\s\S]{1,4}/g,g)},v=n?n.from&&n.from!==Uint8Array.from?function(t){return(t.constructor===n.constructor?t:n.from(t,"base64")).toString()}:function(t){return(t.constructor===n.constructor?t:new n(t,"base64")).toString()}:function(t){return y(j(t))},t=function(t){return v(String(t).replace(/[-_]/g,function(t){return"-"==t?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};if(e.Base64={VERSION:"2.4.3",atob:j,btoa:u,fromBase64:t,toBase64:d,utob:l,encode:d,encodeURI:function(t){return d(t,!0)},btou:y,decode:t,noConflict:function(){var t=e.Base64;return e.Base64=r,t}},"function"==typeof Object.defineProperty){var b=function(t){return{value:t,enumerable:!1,writable:!0,configurable:!0}};e.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",b(function(){return t(this)})),Object.defineProperty(String.prototype,"toBase64",b(function(t){return d(this,t)})),Object.defineProperty(String.prototype,"toBase64URI",b(function(){return d(this,!0)}))}}return e.Meteor&&(Base64=e.Base64),"undefined"!=typeof module&&module.exports?module.exports.Base64=e.Base64:"function"==typeof define&&define.amd&&define([],function(){return e.Base64}),{Base64:e.Base64}});var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(t){this.toString=function(){return"CORRUPT: "+this.message},this.message=t},invalid:function(t){this.toString=function(){return"INVALID: "+this.message},this.message=t},bug:function(t){this.toString=function(){return"BUG: "+this.message},this.message=t},notReady:function(t){this.toString=function(){return"NOT READY: "+this.message},this.message=t}}};function t(t,e,n){if(4!==e.length)throw new sjcl.exception.invalid("invalid aes block size");var r=t.b[n],c=e[0]^r[0],i=e[n?3:1]^r[1],o=e[2]^r[2];e=e[n?1:3]^r[3];var s,a,l,h,u=r.length/4-2,f=4,d=[0,0,0,0];t=(s=t.s[n])[0];var p=s[1],m=s[2],y=s[3],g=s[4];for(h=0;h<u;h++)s=t[c>>>24]^p[i>>16&255]^m[o>>8&255]^y[255&e]^r[f],a=t[i>>>24]^p[o>>16&255]^m[e>>8&255]^y[255&c]^r[f+1],l=t[o>>>24]^p[e>>16&255]^m[c>>8&255]^y[255&i]^r[f+2],e=t[e>>>24]^p[c>>16&255]^m[i>>8&255]^y[255&o]^r[f+3],f+=4,c=s,i=a,o=l;for(h=0;h<4;h++)d[n?3&-h:h]=g[c>>>24]<<24^g[i>>16&255]<<16^g[o>>8&255]<<8^g[255&e]^r[f++],s=c,c=i,i=o,o=e,e=s;return d}function u(t,e){var n,r,c,i=t.F,o=t.b,s=i[0],a=i[1],l=i[2],h=i[3],u=i[4],f=i[5],d=i[6],p=i[7];for(n=0;n<64;n++)n<16?r=e[n]:(r=e[n+1&15],c=e[n+14&15],r=e[15&n]=(r>>>7^r>>>18^r>>>3^r<<25^r<<14)+(c>>>17^c>>>19^c>>>10^c<<15^c<<13)+e[15&n]+e[n+9&15]|0),r=r+p+(u>>>6^u>>>11^u>>>25^u<<26^u<<21^u<<7)+(d^u&(f^d))+o[n],p=d,d=f,f=u,u=h+r|0,h=l,l=a,s=r+((a=s)&l^h&(a^l))+(a>>>2^a>>>13^a>>>22^a<<30^a<<19^a<<10)|0;i[0]=i[0]+s|0,i[1]=i[1]+a|0,i[2]=i[2]+l|0,i[3]=i[3]+h|0,i[4]=i[4]+u|0,i[5]=i[5]+f|0,i[6]=i[6]+d|0,i[7]=i[7]+p|0}function A(t,e){var n,r=sjcl.random.K[t],c=[];for(n in r)r.hasOwnProperty(n)&&c.push(r[n]);for(n=0;n<c.length;n++)c[n](e)}function C(t,e){"undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?t.addEntropy(window.performance.now(),e,"loadtime"):t.addEntropy((new Date).valueOf(),e,"loadtime")}function y(t){t.b=z(t).concat(z(t)),t.L=new sjcl.cipher.aes(t.b)}function z(t){for(var e=0;e<4&&(t.h[e]=t.h[e]+1|0,!t.h[e]);e++);return t.L.encrypt(t.h)}function B(t,e){return function(){e.apply(t,arguments)}}sjcl.cipher.aes=function(t){this.s[0][0][0]||this.O();var e,n,r,c,i=this.s[0][4],o=this.s[1],s=1;if(4!==(e=t.length)&&6!==e&&8!==e)throw new sjcl.exception.invalid("invalid aes key size");for(this.b=[r=t.slice(0),c=[]],t=e;t<4*e+28;t++)n=r[t-1],(0==t%e||8===e&&4==t%e)&&(n=i[n>>>24]<<24^i[n>>16&255]<<16^i[n>>8&255]<<8^i[255&n],0==t%e&&(n=n<<8^n>>>24^s<<24,s=s<<1^283*(s>>7))),r[t]=r[t-e]^n;for(e=0;t;e++,t--)n=r[3&e?t:t-4],c[e]=t<=4||e<4?n:o[0][i[n>>>24]]^o[1][i[n>>16&255]]^o[2][i[n>>8&255]]^o[3][i[255&n]]},sjcl.cipher.aes.prototype={encrypt:function(e){return t(this,e,0)},decrypt:function(e){return t(this,e,1)},s:[[[],[],[],[],[]],[[],[],[],[],[]]],O:function(){var t,e,n,r,c,i,o,s=this.s[0],a=this.s[1],l=s[4],h=a[4],u=[],f=[];for(t=0;t<256;t++)f[(u[t]=t<<1^283*(t>>7))^t]=t;for(e=n=0;!l[e];e^=r||1,n=f[n]||1)for(i=(i=n^n<<1^n<<2^n<<3^n<<4)>>8^255&i^99,o=16843009*(c=u[t=u[r=u[h[l[e]=i]=e]]])^65537*t^257*r^16843008*e,c=257*u[i]^16843008*i,t=0;t<4;t++)s[t][e]=c=c<<24^c>>>8,a[t][i]=o=o<<24^o>>>8;for(t=0;t<5;t++)s[t]=s[t].slice(0),a[t]=a[t].slice(0)}},sjcl.bitArray={bitSlice:function(t,e,n){return t=sjcl.bitArray.$(t.slice(e/32),32-(31&e)).slice(1),void 0===n?t:sjcl.bitArray.clamp(t,n-e)},extract:function(t,e,n){var r=Math.floor(-e-n&31);return(-32&(e+n-1^e)?t[e/32|0]<<32-r^t[e/32+1|0]>>>r:t[e/32|0]>>>r)&(1<<n)-1},concat:function(t,e){if(0===t.length||0===e.length)return t.concat(e);var n=t[t.length-1],r=sjcl.bitArray.getPartial(n);return 32===r?t.concat(e):sjcl.bitArray.$(e,r,0|n,t.slice(0,t.length-1))},bitLength:function(t){var e=t.length;return 0===e?0:32*(e-1)+sjcl.bitArray.getPartial(t[e-1])},clamp:function(t,e){if(32*t.length<e)return t;var n=(t=t.slice(0,Math.ceil(e/32))).length;return e&=31,0<n&&e&&(t[n-1]=sjcl.bitArray.partial(e,t[n-1]&2147483648>>e-1,1)),t},partial:function(t,e,n){return 32===t?e:(n?0|e:e<<32-t)+1099511627776*t},getPartial:function(t){return Math.round(t/1099511627776)||32},equal:function(t,e){if(sjcl.bitArray.bitLength(t)!==sjcl.bitArray.bitLength(e))return!1;var n,r=0;for(n=0;n<t.length;n++)r|=t[n]^e[n];return 0===r},$:function(t,e,n,r){var c;for(void(c=0)===r&&(r=[]);32<=e;e-=32)r.push(n),n=0;if(0===e)return r.concat(t);for(c=0;c<t.length;c++)r.push(n|t[c]>>>e),n=t[c]<<32-e;return c=t.length?t[t.length-1]:0,t=sjcl.bitArray.getPartial(c),r.push(sjcl.bitArray.partial(e+t&31,32<e+t?n:r.pop(),1)),r},i:function(t,e){return[t[0]^e[0],t[1]^e[1],t[2]^e[2],t[3]^e[3]]},byteswapM:function(t){var e,n;for(e=0;e<t.length;++e)n=t[e],t[e]=n>>>24|n>>>8&65280|(65280&n)<<8|n<<24;return t}},sjcl.codec.utf8String={fromBits:function(t){var e,n,r="",c=sjcl.bitArray.bitLength(t);for(e=0;e<c/8;e++)0==(3&e)&&(n=t[e/4]),r+=String.fromCharCode(n>>>8>>>8>>>8),n<<=8;return decodeURIComponent(escape(r))},toBits:function(t){t=unescape(encodeURIComponent(t));var e,n=[],r=0;for(e=0;e<t.length;e++)r=r<<8|t.charCodeAt(e),3==(3&e)&&(n.push(r),r=0);return 3&e&&n.push(sjcl.bitArray.partial(8*(3&e),r)),n}},sjcl.codec.hex={fromBits:function(t){var e,n="";for(e=0;e<t.length;e++)n+=(0xf00000000000+(0|t[e])).toString(16).substr(4);return n.substr(0,sjcl.bitArray.bitLength(t)/4)},toBits:function(t){var e,n,r=[];for(n=(t=t.replace(/\s|0x/g,"")).length,t+="00000000",e=0;e<t.length;e+=8)r.push(0^parseInt(t.substr(e,8),16));return sjcl.bitArray.clamp(r,4*n)}},sjcl.codec.base32={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",X:"0123456789ABCDEFGHIJKLMNOPQRSTUV",BITS:32,BASE:5,REMAINING:27,fromBits:function(t,e,n){var r=sjcl.codec.base32.BASE,c=sjcl.codec.base32.REMAINING,i="",o=0,s=sjcl.codec.base32.B,a=0,l=sjcl.bitArray.bitLength(t);for(n&&(s=sjcl.codec.base32.X),n=0;i.length*r<l;)i+=s.charAt((a^t[n]>>>o)>>>c),o<r?(a=t[n]<<r-o,o+=c,n++):(a<<=r,o-=r);for(;7&i.length&&!e;)i+="=";return i},toBits:function(t,e){t=t.replace(/\s|=/g,"").toUpperCase();var n,r,c=sjcl.codec.base32.BITS,i=sjcl.codec.base32.BASE,o=sjcl.codec.base32.REMAINING,s=[],a=0,l=sjcl.codec.base32.B,h=0,u="base32";for(e&&(l=sjcl.codec.base32.X,u="base32hex"),n=0;n<t.length;n++){if((r=l.indexOf(t.charAt(n)))<0){if(!e)try{return sjcl.codec.base32hex.toBits(t)}catch(t){}throw new sjcl.exception.invalid("this isn't "+u+"!")}o<a?(a-=o,s.push(h^r>>>a),h=r<<c-a):h^=r<<c-(a+=i)}return 56&a&&s.push(sjcl.bitArray.partial(56&a,h,1)),s}},sjcl.codec.base32hex={fromBits:function(t,e){return sjcl.codec.base32.fromBits(t,e,1)},toBits:function(t){return sjcl.codec.base32.toBits(t,1)}},sjcl.codec.base64={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(t,e,n){var r="",c=0,i=sjcl.codec.base64.B,o=0,s=sjcl.bitArray.bitLength(t);for(n&&(i=i.substr(0,62)+"-_"),n=0;6*r.length<s;)r+=i.charAt((o^t[n]>>>c)>>>26),c<6?(o=t[n]<<6-c,c+=26,n++):(o<<=6,c-=6);for(;3&r.length&&!e;)r+="=";return r},toBits:function(t,e){t=t.replace(/\s|=/g,"");var n,r,c=[],i=0,o=sjcl.codec.base64.B,s=0;for(e&&(o=o.substr(0,62)+"-_"),n=0;n<t.length;n++){if((r=o.indexOf(t.charAt(n)))<0)throw new sjcl.exception.invalid("this isn't base64!");26<i?(i-=26,c.push(s^r>>>i),s=r<<32-i):s^=r<<32-(i+=6)}return 56&i&&c.push(sjcl.bitArray.partial(56&i,s,1)),c}},sjcl.codec.base64url={fromBits:function(t){return sjcl.codec.base64.fromBits(t,1,1)},toBits:function(t){return sjcl.codec.base64.toBits(t,1)}},sjcl.hash.sha256=function(t){this.b[0]||this.O(),t?(this.F=t.F.slice(0),this.A=t.A.slice(0),this.l=t.l):this.reset()},sjcl.hash.sha256.hash=function(t){return(new sjcl.hash.sha256).update(t).finalize()},sjcl.hash.sha256.prototype={blockSize:512,reset:function(){return this.F=this.Y.slice(0),this.A=[],this.l=0,this},update:function(t){"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t));var e,n=this.A=sjcl.bitArray.concat(this.A,t);if(e=this.l,9007199254740991<(t=this.l=e+sjcl.bitArray.bitLength(t)))throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");if("undefined"!=typeof Uint32Array){var r=new Uint32Array(n),c=0;for(e=512+e-(512+e&511);e<=t;e+=512)u(this,r.subarray(16*c,16*(c+1))),c+=1;n.splice(0,16*c)}else for(e=512+e-(512+e&511);e<=t;e+=512)u(this,n.splice(0,16));return this},finalize:function(){var t,e=this.A,n=this.F;for(t=(e=sjcl.bitArray.concat(e,[sjcl.bitArray.partial(1,1)])).length+2;15&t;t++)e.push(0);for(e.push(Math.floor(this.l/4294967296)),e.push(0|this.l);e.length;)u(this,e.splice(0,16));return this.reset(),n},Y:[],b:[],O:function(){function t(t){return 4294967296*(t-Math.floor(t))|0}for(var e,n,r=0,c=2;r<64;c++){for(n=!0,e=2;e*e<=c;e++)if(0==c%e){n=!1;break}n&&(r<8&&(this.Y[r]=t(Math.pow(c,.5))),this.b[r]=t(Math.pow(c,1/3)),r++)}}},sjcl.mode.ccm={name:"ccm",G:[],listenProgress:function(t){sjcl.mode.ccm.G.push(t)},unListenProgress:function(t){-1<(t=sjcl.mode.ccm.G.indexOf(t))&&sjcl.mode.ccm.G.splice(t,1)},fa:function(t){var e,n=sjcl.mode.ccm.G.slice();for(e=0;e<n.length;e+=1)n[e](t)},encrypt:function(t,e,n,r,c){var i,o=e.slice(0),s=sjcl.bitArray,a=s.bitLength(n)/8,l=s.bitLength(o)/8;if(c=c||64,r=r||[],a<7)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(i=2;i<4&&l>>>8*i;i++);return i<15-a&&(i=15-a),n=s.clamp(n,8*(15-i)),e=sjcl.mode.ccm.V(t,e,n,r,c,i),o=sjcl.mode.ccm.C(t,o,n,e,c,i),s.concat(o.data,o.tag)},decrypt:function(t,e,n,r,c){c=c||64,r=r||[];var i=sjcl.bitArray,o=i.bitLength(n)/8,s=i.bitLength(e),a=i.clamp(e,s-c),l=i.bitSlice(e,s-c);s=(s-c)/8;if(o<7)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(e=2;e<4&&s>>>8*e;e++);if(e<15-o&&(e=15-o),n=i.clamp(n,8*(15-e)),a=sjcl.mode.ccm.C(t,a,n,l,c,e),t=sjcl.mode.ccm.V(t,a.data,n,r,c,e),!i.equal(a.tag,t))throw new sjcl.exception.corrupt("ccm: tag doesn't match");return a.data},na:function(t,e,n,r,c,i){var o=[],s=sjcl.bitArray,a=s.i;if(r=[s.partial(8,(e.length?64:0)|r-2<<2|i-1)],(r=s.concat(r,n))[3]|=c,r=t.encrypt(r),e.length)for((n=s.bitLength(e)/8)<=65279?o=[s.partial(16,n)]:n<=4294967295&&(o=s.concat([s.partial(16,65534)],[n])),o=s.concat(o,e),e=0;e<o.length;e+=4)r=t.encrypt(a(r,o.slice(e,e+4).concat([0,0,0])));return r},V:function(t,e,n,r,c,i){var o=sjcl.bitArray,s=o.i;if((c/=8)%2||c<4||16<c)throw new sjcl.exception.invalid("ccm: invalid tag length");if(4294967295<r.length||4294967295<e.length)throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");for(n=sjcl.mode.ccm.na(t,r,n,c,o.bitLength(e)/8,i),r=0;r<e.length;r+=4)n=t.encrypt(s(n,e.slice(r,r+4).concat([0,0,0])));return o.clamp(n,8*c)},C:function(t,e,n,r,c,i){var o,s=sjcl.bitArray;o=s.i;var a=e.length,l=s.bitLength(e),h=a/50,u=h;if(n=s.concat([s.partial(8,i-1)],n).concat([0,0,0]).slice(0,4),r=s.bitSlice(o(r,t.encrypt(n)),0,c),!a)return{tag:r,data:[]};for(o=0;o<a;o+=4)h<o&&(sjcl.mode.ccm.fa(o/a),h+=u),n[3]++,c=t.encrypt(n),e[o]^=c[0],e[o+1]^=c[1],e[o+2]^=c[2],e[o+3]^=c[3];return{tag:r,data:s.clamp(e,l)}}},sjcl.mode.ocb2={name:"ocb2",encrypt:function(t,e,n,r,c,i){if(128!==sjcl.bitArray.bitLength(n))throw new sjcl.exception.invalid("ocb iv must be 128 bits");var o,s=sjcl.mode.ocb2.S,a=sjcl.bitArray,l=a.i,h=[0,0,0,0];n=s(t.encrypt(n));var u,f=[];for(r=r||[],c=c||64,o=0;o+4<e.length;o+=4)h=l(h,u=e.slice(o,o+4)),f=f.concat(l(n,t.encrypt(l(n,u)))),n=s(n);return u=e.slice(o),e=a.bitLength(u),o=t.encrypt(l(n,[0,0,0,e])),h=l(h,l((u=a.clamp(l(u.concat([0,0,0]),o),e)).concat([0,0,0]),o)),h=t.encrypt(l(h,l(n,s(n)))),r.length&&(h=l(h,i?r:sjcl.mode.ocb2.pmac(t,r))),f.concat(a.concat(u,a.clamp(h,c)))},decrypt:function(t,e,n,r,c,i){if(128!==sjcl.bitArray.bitLength(n))throw new sjcl.exception.invalid("ocb iv must be 128 bits");c=c||64;var o,s,a=sjcl.mode.ocb2.S,l=sjcl.bitArray,h=l.i,u=[0,0,0,0],f=a(t.encrypt(n)),d=sjcl.bitArray.bitLength(e)-c,p=[];for(r=r||[],n=0;n+4<d/32;n+=4)u=h(u,o=h(f,t.decrypt(h(f,e.slice(n,n+4))))),p=p.concat(o),f=a(f);if(s=d-32*n,u=h(u,o=h(o=t.encrypt(h(f,[0,0,0,s])),l.clamp(e.slice(n),s).concat([0,0,0]))),u=t.encrypt(h(u,h(f,a(f)))),r.length&&(u=h(u,i?r:sjcl.mode.ocb2.pmac(t,r))),!l.equal(l.clamp(u,c),l.bitSlice(e,d)))throw new sjcl.exception.corrupt("ocb: tag doesn't match");return p.concat(l.clamp(o,s))},pmac:function(t,e){var n,r=sjcl.mode.ocb2.S,c=sjcl.bitArray,i=c.i,o=[0,0,0,0],s=i(s=t.encrypt([0,0,0,0]),r(r(s)));for(n=0;n+4<e.length;n+=4)s=r(s),o=i(o,t.encrypt(i(s,e.slice(n,n+4))));return n=e.slice(n),c.bitLength(n)<128&&(s=i(s,r(s)),n=c.concat(n,[-2147483648,0,0,0])),o=i(o,n),t.encrypt(i(r(i(s,r(s))),o))},S:function(t){return[t[0]<<1^t[1]>>>31,t[1]<<1^t[2]>>>31,t[2]<<1^t[3]>>>31,t[3]<<1^135*(t[0]>>>31)]}},sjcl.mode.gcm={name:"gcm",encrypt:function(t,e,n,r,c){var i=e.slice(0);return e=sjcl.bitArray,r=r||[],t=sjcl.mode.gcm.C(!0,t,i,r,n,c||128),e.concat(t.data,t.tag)},decrypt:function(t,e,n,r,c){var i=e.slice(0),o=sjcl.bitArray,s=o.bitLength(i);if(r=r||[],(c=c||128)<=s?(e=o.bitSlice(i,s-c),i=o.bitSlice(i,0,s-c)):(e=i,i=[]),t=sjcl.mode.gcm.C(!1,t,i,r,n,c),!o.equal(t.tag,e))throw new sjcl.exception.corrupt("gcm: tag doesn't match");return t.data},ka:function(t,e){var n,r,c,i,o,s=sjcl.bitArray.i;for(c=[0,0,0,0],i=e.slice(0),n=0;n<128;n++){for((r=0!=(t[Math.floor(n/32)]&1<<31-n%32))&&(c=s(c,i)),o=0!=(1&i[3]),r=3;0<r;r--)i[r]=i[r]>>>1|(1&i[r-1])<<31;i[0]>>>=1,o&&(i[0]^=-520093696)}return c},j:function(t,e,n){var r,c=n.length;for(e=e.slice(0),r=0;r<c;r+=4)e[0]^=4294967295&n[r],e[1]^=4294967295&n[r+1],e[2]^=4294967295&n[r+2],e[3]^=4294967295&n[r+3],e=sjcl.mode.gcm.ka(e,t);return e},C:function(t,e,n,r,c,i){var o,s,a,l,h,u,f,d,p=sjcl.bitArray;for(u=n.length,f=p.bitLength(n),d=p.bitLength(r),s=p.bitLength(c),o=e.encrypt([0,0,0,0]),96===s?(c=c.slice(0),c=p.concat(c,[1])):(c=sjcl.mode.gcm.j(o,[0,0,0,0],c),c=sjcl.mode.gcm.j(o,c,[0,0,Math.floor(s/4294967296),4294967295&s])),s=sjcl.mode.gcm.j(o,[0,0,0,0],r),h=c.slice(0),r=s.slice(0),t||(r=sjcl.mode.gcm.j(o,s,n)),l=0;l<u;l+=4)h[3]++,a=e.encrypt(h),n[l]^=a[0],n[l+1]^=a[1],n[l+2]^=a[2],n[l+3]^=a[3];return n=p.clamp(n,f),t&&(r=sjcl.mode.gcm.j(o,s,n)),t=[Math.floor(d/4294967296),4294967295&d,Math.floor(f/4294967296),4294967295&f],r=sjcl.mode.gcm.j(o,r,t),a=e.encrypt(c),r[0]^=a[0],r[1]^=a[1],r[2]^=a[2],r[3]^=a[3],{tag:p.bitSlice(r,0,i),data:n}}},sjcl.misc.hmac=function(t,e){this.W=e=e||sjcl.hash.sha256;var n,r=[[],[]],c=e.prototype.blockSize/32;for(this.w=[new e,new e],t.length>c&&(t=e.hash(t)),n=0;n<c;n++)r[0][n]=909522486^t[n],r[1][n]=1549556828^t[n];this.w[0].update(r[0]),this.w[1].update(r[1]),this.R=new e(this.w[0])},sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(t){if(this.aa)throw new sjcl.exception.invalid("encrypt on already updated hmac called!");return this.update(t),this.digest(t)},sjcl.misc.hmac.prototype.reset=function(){this.R=new this.W(this.w[0]),this.aa=!1},sjcl.misc.hmac.prototype.update=function(t){this.aa=!0,this.R.update(t)},sjcl.misc.hmac.prototype.digest=function(){var t=this.R.finalize();t=new this.W(this.w[1]).update(t).finalize();return this.reset(),t},sjcl.misc.pbkdf2=function(t,e,n,r,c){if(n=n||1e4,r<0||n<0)throw new sjcl.exception.invalid("invalid params to pbkdf2");"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t)),"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e)),t=new(c=c||sjcl.misc.hmac)(t);var i,o,s,a,l=[],h=sjcl.bitArray;for(a=1;32*l.length<(r||1);a++){for(c=i=t.encrypt(h.concat(e,[a])),o=1;o<n;o++)for(i=t.encrypt(i),s=0;s<i.length;s++)c[s]^=i[s];l=l.concat(c)}return r&&(l=h.clamp(l,r)),l},sjcl.prng=function(t){this.c=[new sjcl.hash.sha256],this.m=[0],this.P=0,this.H={},this.N=0,this.U={},this.Z=this.f=this.o=this.ha=0,this.b=[0,0,0,0,0,0,0,0],this.h=[0,0,0,0],this.L=void 0,this.M=t,this.D=!1,this.K={progress:{},seeded:{}},this.u=this.ga=0,this.I=1,this.J=2,this.ca=65536,this.T=[0,48,64,96,128,192,256,384,512,768,1024],this.da=3e4,this.ba=80},sjcl.prng.prototype={randomWords:function(t,e){var n,r,c=[];if((n=this.isReady(e))===this.u)throw new sjcl.exception.notReady("generator isn't seeded");if(n&this.J){n=!(n&this.I),r=[];var i,o=0;for(this.Z=r[0]=(new Date).valueOf()+this.da,i=0;i<16;i++)r.push(4294967296*Math.random()|0);for(i=0;i<this.c.length&&(r=r.concat(this.c[i].finalize()),o+=this.m[i],this.m[i]=0,n||!(this.P&1<<i));i++);for(this.P>=1<<this.c.length&&(this.c.push(new sjcl.hash.sha256),this.m.push(0)),this.f-=o,o>this.o&&(this.o=o),this.P++,this.b=sjcl.hash.sha256.hash(this.b.concat(r)),this.L=new sjcl.cipher.aes(this.b),n=0;n<4&&(this.h[n]=this.h[n]+1|0,!this.h[n]);n++);}for(n=0;n<t;n+=4)0==(n+1)%this.ca&&y(this),r=z(this),c.push(r[0],r[1],r[2],r[3]);return y(this),c.slice(0,t)},setDefaultParanoia:function(t,e){if(0===t&&"Setting paranoia=0 will ruin your security; use it only for testing"!==e)throw new sjcl.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");this.M=t},addEntropy:function(t,e,n){n=n||"user";var r,c,i=(new Date).valueOf(),o=this.H[n],s=this.isReady(),a=0;switch(void 0===(r=this.U[n])&&(r=this.U[n]=this.ha++),void 0===o&&(o=this.H[n]=0),this.H[n]=(this.H[n]+1)%this.c.length,typeof t){case"number":void 0===e&&(e=1),this.c[o].update([r,this.N++,1,e,i,1,0|t]);break;case"object":if("[object Uint32Array]"===(n=Object.prototype.toString.call(t))){for(c=[],n=0;n<t.length;n++)c.push(t[n]);t=c}else for("[object Array]"!==n&&(a=1),n=0;n<t.length&&!a;n++)"number"!=typeof t[n]&&(a=1);if(!a){if(void 0===e)for(n=e=0;n<t.length;n++)for(c=t[n];0<c;)e++,c>>>=1;this.c[o].update([r,this.N++,2,e,i,t.length].concat(t))}break;case"string":void 0===e&&(e=t.length),this.c[o].update([r,this.N++,3,e,i,t.length]),this.c[o].update(t);break;default:a=1}if(a)throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string");this.m[o]+=e,this.f+=e,s===this.u&&(this.isReady()!==this.u&&A("seeded",Math.max(this.o,this.f)),A("progress",this.getProgress()))},isReady:function(t){return t=this.T[void 0!==t?t:this.M],this.o&&this.o>=t?this.m[0]>this.ba&&(new Date).valueOf()>this.Z?this.J|this.I:this.I:this.f>=t?this.J|this.u:this.u},getProgress:function(t){return t=this.T[t||this.M],this.o>=t?1:this.f>t?1:this.f/t},startCollectors:function(){if(!this.D){if(this.a={loadTimeCollector:B(this,this.ma),mouseCollector:B(this,this.oa),keyboardCollector:B(this,this.la),accelerometerCollector:B(this,this.ea),touchCollector:B(this,this.qa)},window.addEventListener)window.addEventListener("load",this.a.loadTimeCollector,!1),window.addEventListener("mousemove",this.a.mouseCollector,!1),window.addEventListener("keypress",this.a.keyboardCollector,!1),window.addEventListener("devicemotion",this.a.accelerometerCollector,!1),window.addEventListener("touchmove",this.a.touchCollector,!1);else{if(!document.attachEvent)throw new sjcl.exception.bug("can't attach event");document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector)}this.D=!0}},stopCollectors:function(){this.D&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,!1),window.removeEventListener("mousemove",this.a.mouseCollector,!1),window.removeEventListener("keypress",this.a.keyboardCollector,!1),window.removeEventListener("devicemotion",this.a.accelerometerCollector,!1),window.removeEventListener("touchmove",this.a.touchCollector,!1)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.D=!1)},addEventListener:function(t,e){this.K[t][this.ga++]=e},removeEventListener:function(t,e){var n,r,c=this.K[t],i=[];for(r in c)c.hasOwnProperty(r)&&c[r]===e&&i.push(r);for(n=0;n<i.length;n++)delete c[r=i[n]]},la:function(){C(this,1)},oa:function(t){var e,n;try{e=t.x||t.clientX||t.offsetX||0,n=t.y||t.clientY||t.offsetY||0}catch(t){n=e=0}0!=e&&0!=n&&this.addEntropy([e,n],2,"mouse"),C(this,0)},qa:function(t){t=t.touches[0]||t.changedTouches[0],this.addEntropy([t.pageX||t.clientX,t.pageY||t.clientY],1,"touch"),C(this,0)},ma:function(){C(this,2)},ea:function(t){if(t=t.accelerationIncludingGravity.x||t.accelerationIncludingGravity.y||t.accelerationIncludingGravity.z,window.orientation){var e=window.orientation;"number"==typeof e&&this.addEntropy(e,1,"accelerometer")}t&&this.addEntropy(t,2,"accelerometer"),C(this,0)}},sjcl.random=new sjcl.prng(6);t:try{var D,E,F,G;if(G="undefined"!=typeof module&&module.exports){var H;try{H=require("crypto")}catch(t){H=null}G=E=H}if(G&&E.randomBytes)D=E.randomBytes(128),D=new Uint32Array(new Uint8Array(D).buffer),sjcl.random.addEntropy(D,1024,"crypto['randomBytes']");else if("undefined"!=typeof window&&"undefined"!=typeof Uint32Array){if(F=new Uint32Array(32),window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(F);else{if(!window.msCrypto||!window.msCrypto.getRandomValues)break t;window.msCrypto.getRandomValues(F)}sjcl.random.addEntropy(F,1024,"crypto['getRandomValues']")}}catch(t){"undefined"!=typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(t))}sjcl.json={defaults:{v:1,iter:1e4,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},ja:function(t,e,n,r){n=n||{},r=r||{};var c,i=sjcl.json,o=i.g({iv:sjcl.random.randomWords(4,0)},i.defaults);if(i.g(o,n),n=o.adata,"string"==typeof o.salt&&(o.salt=sjcl.codec.base64.toBits(o.salt)),"string"==typeof o.iv&&(o.iv=sjcl.codec.base64.toBits(o.iv)),!sjcl.mode[o.mode]||!sjcl.cipher[o.cipher]||"string"==typeof t&&o.iter<=100||64!==o.ts&&96!==o.ts&&128!==o.ts||128!==o.ks&&192!==o.ks&&256!==o.ks||o.iv.length<2||4<o.iv.length)throw new sjcl.exception.invalid("json encrypt: invalid parameters");return"string"==typeof t?(t=(c=sjcl.misc.cachedPbkdf2(t,o)).key.slice(0,o.ks/32),o.salt=c.salt):sjcl.ecc&&t instanceof sjcl.ecc.elGamal.publicKey&&(c=t.kem(),o.kemtag=c.tag,t=c.key.slice(0,o.ks/32)),"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e)),"string"==typeof n&&(o.adata=n=sjcl.codec.utf8String.toBits(n)),c=new sjcl.cipher[o.cipher](t),i.g(r,o),r.key=t,o.ct="ccm"===o.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&e instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.encrypt(c,e,o.iv,n,o.ts):sjcl.mode[o.mode].encrypt(c,e,o.iv,n,o.ts),o},encrypt:function(t,e,n,r){var c=sjcl.json,i=c.ja.apply(c,arguments);return c.encode(i)},ia:function(t,e,n,r){n=n||{},r=r||{};var c,i,o=sjcl.json;if(c=(e=o.g(o.g(o.g({},o.defaults),e),n,!0)).adata,"string"==typeof e.salt&&(e.salt=sjcl.codec.base64.toBits(e.salt)),"string"==typeof e.iv&&(e.iv=sjcl.codec.base64.toBits(e.iv)),!sjcl.mode[e.mode]||!sjcl.cipher[e.cipher]||"string"==typeof t&&e.iter<=100||64!==e.ts&&96!==e.ts&&128!==e.ts||128!==e.ks&&192!==e.ks&&256!==e.ks||!e.iv||e.iv.length<2||4<e.iv.length)throw new sjcl.exception.invalid("json decrypt: invalid parameters");return"string"==typeof t?(t=(i=sjcl.misc.cachedPbkdf2(t,e)).key.slice(0,e.ks/32),e.salt=i.salt):sjcl.ecc&&t instanceof sjcl.ecc.elGamal.secretKey&&(t=t.unkem(sjcl.codec.base64.toBits(e.kemtag)).slice(0,e.ks/32)),"string"==typeof c&&(c=sjcl.codec.utf8String.toBits(c)),i=new sjcl.cipher[e.cipher](t),c="ccm"===e.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&e.ct instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.decrypt(i,e.ct,e.iv,e.tag,c,e.ts):sjcl.mode[e.mode].decrypt(i,e.ct,e.iv,c,e.ts),o.g(r,e),r.key=t,1===n.raw?c:sjcl.codec.utf8String.fromBits(c)},decrypt:function(t,e,n,r){var c=sjcl.json;return c.ia(t,c.decode(e),n,r)},encode:function(t){var e,n="{",r="";for(e in t)if(t.hasOwnProperty(e)){if(!e.match(/^[a-z0-9]+$/i))throw new sjcl.exception.invalid("json encode: invalid property name");switch(n+=r+'"'+e+'":',r=",",typeof t[e]){case"number":case"boolean":n+=t[e];break;case"string":n+='"'+escape(t[e])+'"';break;case"object":n+='"'+sjcl.codec.base64.fromBits(t[e],0)+'"';break;default:throw new sjcl.exception.bug("json encode: unsupported type")}}return n+"}"},decode:function(t){if(!(t=t.replace(/\s/g,"")).match(/^\{.*\}$/))throw new sjcl.exception.invalid("json decode: this isn't json!");t=t.replace(/^\{|\}$/g,"").split(/,/);var e,n,r={};for(e=0;e<t.length;e++){if(!(n=t[e].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i)))throw new sjcl.exception.invalid("json decode: this isn't json!");null!=n[3]?r[n[2]]=parseInt(n[3],10):null!=n[4]?r[n[2]]=n[2].match(/^(ct|adata|salt|iv)$/)?sjcl.codec.base64.toBits(n[4]):unescape(n[4]):null!=n[5]&&(r[n[2]]="true"===n[5])}return r},g:function(t,e,n){if(void 0===t&&(t={}),void 0===e)return t;for(var r in e)if(e.hasOwnProperty(r)){if(n&&void 0!==t[r]&&t[r]!==e[r])throw new sjcl.exception.invalid("required parameter overridden");t[r]=e[r]}return t},sa:function(t,e){var n,r={};for(n in t)t.hasOwnProperty(n)&&t[n]!==e[n]&&(r[n]=t[n]);return r},ra:function(t,e){var n,r={};for(n=0;n<e.length;n++)void 0!==t[e[n]]&&(r[e[n]]=t[e[n]]);return r}},sjcl.encrypt=sjcl.json.encrypt,sjcl.decrypt=sjcl.json.decrypt,sjcl.misc.pa={},sjcl.misc.cachedPbkdf2=function(t,e){var n,r=sjcl.misc.pa;return n=(e=e||{}).iter||1e3,(n=(r=r[t]=r[t]||{})[n]=r[n]||{firstSalt:e.salt&&e.salt.length?e.salt.slice(0):sjcl.random.randomWords(2,0)})[r=void 0===e.salt?n.firstSalt:e.salt]=n[r]||sjcl.misc.pbkdf2(t,r,e.iter),{key:n[r].slice(0),salt:r.slice(0)}},"undefined"!=typeof module&&module.exports&&(module.exports=sjcl),"function"==typeof define&&define([],function(){return sjcl}),function(){"use strict";function t(e){var n,r,c,t=i.value;0<t.length?e(t):(n=function(t){i.value=t,e(t)},r="",c=setInterval(function(){if(sjcl.random.isReady(10)){for(;r.length<30;){var t=sjcl.random.randomWords(10)[0];r+=Base64.encode(t)}r=r.substr(0,30),n(r),clearInterval(c)}},10))}var i=document.getElementById("lock"),r=document.getElementById("to-encrypt"),c=document.getElementById("encrypted"),e=document.getElementById("decrypt"),n=document.getElementById("copy"),o=document.getElementById("error");function s(){if(""!==i.value)if(""!==r.value){var t=JSON.parse(sjcl.encrypt(i.value,r.value));c.value=t.ct+":"+t.iv+":"+t.salt}else c.value=""}function a(){t(function(t){document.getElementById("lockart").innerHTML=jdenticon.toSvg(t,80),s()})}done_typing(r,{delay:200,start:function(){o.textContent=""},stop:s}),e.onclick=function(){if(""!==i.value){o.textContent="";var t=c.value.split(":");if(3===t.length){var e,n=JSON.stringify({adata:"",cipher:"aes",ct:t[0],iter:1e4,iv:t[1],ks:128,mode:"ccm",salt:t[2],ts:64,v:1});try{e=sjcl.decrypt(i.value,n)}catch(t){return void(o.textContent=""+t)}r.value=e}else o.textContent="bad data"}},n.onclick=function(){null!==lock&&(s(),c.focus(),c.select(),document.execCommand("copy"))},a(),i.onchange=a,r.value="",c.value=""}();
