(()=>{
  function initPages(){
    const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});
    $$('.reveal').forEach(el=>observer.observe(el));
    const filters=$$('.filter-row button'),tiles=$$('.path-tile');filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.classList.toggle('active',item===button));tiles.forEach(tile=>tile.hidden=button.dataset.filter!=='all'&&tile.dataset.category!==button.dataset.filter)}));
    $$('.goal-options button').forEach(button=>button.addEventListener('click',()=>{$$('.goal-options button').forEach(item=>item.classList.toggle('active',item===button));const label=$('#preview-goal');if(label)label.textContent=button.dataset.goal}));
    const range=$('#page-minutes');const updatePlan=()=>{if(!range)return;const count=$$('.study-days button.active').length||1;$('#weekly-total').textContent=count*Number(range.value);$$('.preview-week span').forEach((day,index)=>day.classList.toggle('active',$$('.study-days button')[index]?.classList.contains('active')))};
    if(range)range.addEventListener('input',()=>{$('#page-output').value=`${range.value} min`;updatePlan()});
    $$('.study-days button').forEach(button=>button.addEventListener('click',()=>{button.classList.toggle('active');updatePlan()}));
    $$('.join-room').forEach(button=>button.addEventListener('click',()=>{button.classList.toggle('joined');button.textContent=button.classList.contains('joined')?'Joined':'Join room'}));
  }
  initPages();window.addEventListener('leaders:route',initPages);
})();
