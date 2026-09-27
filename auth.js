(()=>{
  function initAuth(){
    const tabs=[...document.querySelectorAll('.auth-tabs button')],panels=[...document.querySelectorAll('.account-form-panel')];
    tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(item=>{item.classList.toggle('active',item===tab);item.setAttribute('aria-selected',String(item===tab))});panels.forEach(panel=>panel.hidden=panel.id!==tab.getAttribute('aria-controls'))}));
    document.querySelectorAll('.account-form').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();const status=form.querySelector('.account-status');status.textContent=form.dataset.mode==='signup'?'Your study space is ready for connection to the account service.':'Your details are ready for connection to the sign-in service.'}));
  }
  initAuth();window.addEventListener('leaders:route',initAuth);
})();
