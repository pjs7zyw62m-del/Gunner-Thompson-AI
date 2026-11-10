/* Gunner Phase 1: safe page awareness. No network calls, no credentials.
   Include on authorized pages; call GunnerPageContext.snapshot() only when user sends a message.
   Backend must validate the signed-in user and authorize any requested context. */
(function(root){
  'use strict';
  const MAX_TEXT=4500;
  const PRIVATE='input,textarea,select,[contenteditable],script,style,noscript,[hidden],[aria-hidden="true"],[data-gunner-private],form';
  function safeText(){
    const rootNode=document.querySelector('[data-gunner-context]')||document.querySelector('main');
    if(!rootNode)return '';
    const copy=rootNode.cloneNode(true);
    copy.querySelectorAll(PRIVATE).forEach(el=>el.remove());
    return (copy.innerText||copy.textContent||'').replace(/\s+/g,' ').trim().slice(0,MAX_TEXT);
  }
  function snapshot(){
    const u=new URL(location.href);
    return {
      schema_version:1,
      page:{title:document.title.slice(0,120),path:u.pathname.slice(0,240),origin:u.origin,
        visible_text:safeText(),selected_item:null},
      captured_at:new Date().toISOString()
    };
  }
  root.GunnerPageContext=Object.freeze({snapshot});
})(window);
