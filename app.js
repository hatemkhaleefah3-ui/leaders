const $=(selector,scope=document)=>scope.querySelector(selector);const $$=(selector,scope=document)=>[...scope.querySelectorAll(selector)];

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.13});
$$('.reveal').forEach(element=>revealObserver.observe(element));

const navLinks=$$('.main-nav a[href^="#"]');
const sections=navLinks.map(link=>$(link.getAttribute('href'))).filter(Boolean);
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-38% 0px -55%'});
sections.forEach(section=>sectionObserver.observe(section));

const cards=$$('.course-card');const filters=$$('.filter-row button');
function filterCourses(category='all',query=''){let shown=0;cards.forEach(card=>{const matchCategory=category==='all'||card.dataset.category===category;const matchQuery=!query||card.dataset.search.includes(query.toLowerCase())||card.textContent.toLowerCase().includes(query.toLowerCase());card.hidden=!(matchCategory&&matchQuery);if(!card.hidden)shown++});$('.empty-state').hidden=shown>0}
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.classList.toggle('active',item===button));filterCourses(button.dataset.filter,$('#course-search').value.trim())}));

const searchDialog=$('#search-dialog');const searchInput=$('#course-search');
function openSearch(){searchDialog.showModal();document.body.classList.add('modal-open');setTimeout(()=>searchInput.focus(),40)}
function closeSearch(){searchDialog.close();document.body.classList.remove('modal-open')}
$('.search-trigger').addEventListener('click',openSearch);$('.search-dialog .dialog-close').addEventListener('click',closeSearch);
searchDialog.addEventListener('click',event=>{if(event.target===searchDialog)closeSearch()});
searchInput.addEventListener('input',()=>{const active=$('.filter-row button.active').dataset.filter;filterCourses(active,searchInput.value.trim())});
searchInput.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();closeSearch();$('#paths').scrollIntoView({behavior:'smooth'})}});
searchDialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();openSearch()}if(event.key==='Escape'&&searchDialog.open)closeSearch()});

const plannerDialog=$('#planner-dialog');let selectedGoal='Exam confidence';
function openPlanner(){plannerDialog.showModal();document.body.classList.add('modal-open');$('#planner-form').hidden=false;$('#plan-result').hidden=true}
function closePlanner(){plannerDialog.close();document.body.classList.remove('modal-open')}
$$('.planner-trigger').forEach(button=>button.addEventListener('click',openPlanner));$('.planner-close').addEventListener('click',closePlanner);plannerDialog.addEventListener('click',event=>{if(event.target===plannerDialog)closePlanner()});
plannerDialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
$$('.choice').forEach(button=>button.addEventListener('click',()=>{$$('.choice').forEach(item=>item.classList.toggle('active',item===button));selectedGoal=button.dataset.goal}));
const minutes=$('#minutes-range');minutes.addEventListener('input',()=>{$('#minutes-output').value=`${minutes.value} min`});
$$('.day-choices button').forEach(button=>button.addEventListener('click',()=>button.classList.toggle('active')));
$('.generate-plan').addEventListener('click',()=>{const sessions=$$('.day-choices button.active').length||1;$('#result-goal').textContent=selectedGoal;$('#result-sessions').textContent=sessions;$('#result-minutes').textContent=sessions*Number(minutes.value);$('#planner-form').hidden=true;$('#plan-result').hidden=false});
