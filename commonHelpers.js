import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as _,i as u}from"./assets/vendor-77e16229.js";let r=new Date,l=null;const p=document.querySelector("span[data-days]"),y=document.querySelector("span[data-hours]"),b=document.querySelector("span[data-minutes]"),g=document.querySelector("span[data-seconds]"),o=document.querySelector("button[data-start]"),s=document.querySelector("#datetime-picker"),S=e=>{const t=e[0];t.getTime()<Date.now()?(u.error({message:"Please choose a date in the future",position:"topRight",color:"#ef4040"}),o.disabled=!0):o.disabled=!1,r=t},q=e=>{s.disabled=!0,o.disabled=!0,r.getTime()<Date.now()?(s.disabled=!1,u.error({message:"Please choose a date in the future",position:"topRight",color:"#ef4040"})):l=setInterval(()=>{const t=r.getTime()-Date.now();if(t<=0)clearInterval(l),s.disabled=!1,o.disabled=!1;else{const{days:c,hours:d,minutes:i,seconds:a}=D(t);p.textContent=n(c),y.textContent=n(d),b.textContent=n(i),g.textContent=n(a)}},1e3)},v={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose:S};function D(e){const a=Math.floor(e/864e5),m=Math.floor(e%864e5/36e5),f=Math.floor(e%864e5%36e5/6e4),h=Math.floor(e%864e5%36e5%6e4/1e3);return{days:a,hours:m,minutes:f,seconds:h}}function n(e){return String(e).padStart(2,"0")}_(s,v);o.addEventListener("click",q);
//# sourceMappingURL=commonHelpers.js.map