(()=>{function initHome(){
const $=(selector,scope=document)=>scope.querySelector(selector);const $$=(selector,scope=document)=>[...scope.querySelectorAll(selector)];

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.13});
$$('.reveal').forEach(element=>revealObserver.observe(element));

const plannerDialog=$('#planner-dialog');if(!plannerDialog)return;

const cards=$$('.course-card');const filters=$$('.filter-row button');
function filterCourses(category='all',query=''){let shown=0;cards.forEach(card=>{const matchCategory=category==='all'||card.dataset.category===category;const matchQuery=!query||card.dataset.search.includes(query.toLowerCase())||card.textContent.toLowerCase().includes(query.toLowerCase());card.hidden=!(matchCategory&&matchQuery);if(!card.hidden)shown++});$('.empty-state').hidden=shown>0}
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.classList.toggle('active',item===button));filterCourses(button.dataset.filter)}));

let selectedGoal='Exam confidence';
function openPlanner(){plannerDialog.showModal();document.body.classList.add('modal-open');$('#planner-form').hidden=false;$('#plan-result').hidden=true}
function closePlanner(){plannerDialog.close();document.body.classList.remove('modal-open')}
$$('.planner-trigger').forEach(button=>button.addEventListener('click',openPlanner));$('.planner-close').addEventListener('click',closePlanner);plannerDialog.addEventListener('click',event=>{if(event.target===plannerDialog)closePlanner()});
plannerDialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
$$('.choice').forEach(button=>button.addEventListener('click',()=>{$$('.choice').forEach(item=>item.classList.toggle('active',item===button));selectedGoal=button.dataset.goal}));
const minutes=$('#minutes-range');minutes.addEventListener('input',()=>{$('#minutes-output').value=`${minutes.value} min`});
$$('.day-choices button').forEach(button=>button.addEventListener('click',()=>button.classList.toggle('active')));
$('.generate-plan').addEventListener('click',()=>{const sessions=$$('.day-choices button.active').length||1;$('#result-goal').textContent=selectedGoal;$('#result-sessions').textContent=sessions;$('#result-minutes').textContent=sessions*Number(minutes.value);$('#planner-form').hidden=true;$('#plan-result').hidden=false});
}initHome();window.addEventListener('leaders:route',initHome)})();
