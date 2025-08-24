// Minimal typing + scroll-reveal + highlight cycle
(()=>{
  const el=document.querySelector('.typing-text');
  const keywords=["Efsane","Yarışma","Macera"];
  if(el){
    const original=(el.dataset.text||el.textContent||"").trim();
    // typing
    el.textContent="";
    let i=0;
    const speed=34;
    const type=()=>{ if(i<=original.length){ el.textContent=original.slice(0,i++); setTimeout(type,speed);} else afterType(); };
    const afterType=()=>{
      // highlight cycle: replace the first matching keyword with span.g
      let kIndex=0;
      const cycle=()=>{
        // Build regex to replace any of the keywords
        const base=original;
        const k=keywords[kIndex%keywords.length];
        // replace only first occurrence of any keyword with span.g
        const pattern=new RegExp("(" + keywords.join("|") + ")", "i");
        const html=base.replace(pattern,(m)=>`<span class="g">${m}</span>`);
        el.innerHTML=html;
        kIndex++;
      };
      cycle();
      setInterval(cycle, 2200);
    };
    if(original) type();
  }
  // scroll reveal
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
  },{threshold:.12});
  document.querySelectorAll('.section-animate').forEach(n=>io.observe(n));

  // Optional: project links wiring (fill here if you have real URLs)
  const links={
    "mission-budy":{
      github:"https://github.com/ViperaDev/MissionBudy",
      download:"#"
    },
    "vipodeck":{
      github:"https://github.com/ViperaDev/VipoDeck",
      download:"#"
    }
  };
  for(const [pid,urls] of Object.entries(links)){
    const card=document.getElementById(pid);
    if(!card) continue;
    const gh=card.querySelector('a.btn.secondary.icon');
    const dl=card.querySelector('a.btn.icon:not(.secondary)');
    if(gh && urls.github) gh.href=urls.github;
    if(dl && urls.download) dl.href=urls.download;
  }
})();