const tabs=[...document.querySelectorAll('.auth-tabs button')];
const panels=[...document.querySelectorAll('.auth-form-panel')];

function showPanel(tab){
  tabs.forEach(item=>item.setAttribute('aria-selected',String(item===tab)));
  panels.forEach(panel=>{panel.hidden=panel.id!==tab.getAttribute('aria-controls')});
  const heading=document.querySelector(`#${tab.getAttribute('aria-controls')} h2`);
  if(heading) heading.focus?.({preventScroll:true});
}

tabs.forEach(tab=>tab.addEventListener('click',()=>showPanel(tab)));

document.querySelectorAll('.account-form').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault();
  const status=form.querySelector('.auth-status');
  const mode=form.dataset.mode;
  status.textContent=mode==='signup'
    ? 'Your account details are ready. Connect this form to your authentication service to activate registration.'
    : 'Your sign-in details are ready. Connect this form to your authentication service to continue.';
}));
