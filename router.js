(()=>{
  const cache=new Map(),routes=new Set(['index.html','paths.html','planner.html','community.html','auth.html']);
  const fileName=url=>url.pathname.split('/').pop()||'index.html';
  async function navigate(input,{history=true}={}){
    const url=new URL(input,location.href),name=fileName(url);if(url.origin!==location.origin||!routes.has(name))return location.assign(url.href);
    document.documentElement.classList.add('route-loading');
    try{
      let markup=cache.get(url.pathname);if(!markup){const response=await fetch(url.href,{headers:{'X-Leaders-Navigation':'1'}});if(!response.ok)throw new Error(`HTTP ${response.status}`);markup=await response.text();cache.set(url.pathname,markup)}
      const incoming=new DOMParser().parseFromString(markup,'text/html'),nextMain=incoming.querySelector('main');if(!nextMain)throw new Error('Missing route content');
      document.querySelector('main')?.replaceWith(nextMain);document.querySelectorAll('body > footer,body > dialog').forEach(node=>node.remove());incoming.querySelectorAll('body > footer,body > dialog').forEach(node=>document.body.append(node));
      document.body.className=incoming.body.className;document.title=incoming.title;document.querySelectorAll('.main-nav a,.mobile-nav a').forEach(link=>link.classList.toggle('active',fileName(new URL(link.href))===name));
      if(history)window.history.pushState({route:name},'',url.href);window.scrollTo({top:0,behavior:'instant'});window.dispatchEvent(new Event('leaders:route'));
    }catch(error){location.assign(url.href)}finally{document.documentElement.classList.remove('route-loading')}
  }
  document.addEventListener('click',event=>{const link=event.target.closest('a[href]');if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target||link.hasAttribute('download'))return;const url=new URL(link.href,location.href);if(url.origin===location.origin&&routes.has(fileName(url))){event.preventDefault();if(url.pathname===location.pathname){window.scrollTo({top:0,behavior:'smooth'});return}navigate(url)}});
  window.addEventListener('popstate',()=>navigate(location.href,{history:false}));
})();
