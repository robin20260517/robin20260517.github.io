
/* v89: the amount field is entered in points; show the PKR the user will receive
   in real time. Exchange rate is fixed at 20 pts = 1 PKR (same as the rest of app). */
(function(){
  var PTS_PER_PKR = 20;
  var MIN_PTS = 2000;
  function readState(){ try { return JSON.parse(localStorage.getItem('cashtask_state_v10') || '{}') || {}; } catch(e){ return {}; } }
  function lang(){
    var l = (readState().lang || document.documentElement.lang || 'en').toString().toLowerCase();
    if(l.indexOf('zh') === 0) return 'zh';
    if(l.indexOf('ur') === 0) return 'ur';
    return 'en';
  }
  function fmtPKR(v){
    v = Math.round(v * 100) / 100;
    return Number.isInteger(v) ? v.toLocaleString() : v.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
  }
  function recalc(){
    var input = document.getElementById('withdrawAmountInput');
    var hint = document.getElementById('withdrawConvertHint');
    if(!input || !hint) return;
    var l = lang();
    var pts = parseFloat(input.value);
    if(!pts || pts <= 0){
      hint.classList.add('is-empty');
      hint.textContent = l==='zh' ? '输入积分后自动换算到账金额 · 20 积分 = 1 PKR'
                       : (l==='ur' ? 'پوائنٹس درج کریں · 20 pts = 1 PKR'
                       : 'Enter points to see the amount · 20 pts = 1 PKR');
      return;
    }
    hint.classList.remove('is-empty');
    var pkr = fmtPKR(pts / PTS_PER_PKR);
    var main = l==='zh' ? ('≈ <b>' + pkr + ' PKR</b> 到账金额')
             : (l==='ur' ? ('≈ <b>' + pkr + ' PKR</b> ملیں گے')
             : ('≈ <b>' + pkr + ' PKR</b> you\u2019ll receive'));
    var note = '';
    if(pts < MIN_PTS){
      var minPkr = fmtPKR(MIN_PTS / PTS_PER_PKR);
      note = l==='zh' ? (' · <span class="wc-min">最低 ' + MIN_PTS.toLocaleString() + ' 积分（' + minPkr + ' PKR）</span>')
           : (l==='ur' ? (' · <span class="wc-min">کم از کم ' + MIN_PTS.toLocaleString() + ' pts</span>')
           : (' · <span class="wc-min">min ' + MIN_PTS.toLocaleString() + ' pts (' + minPkr + ' PKR)</span>'));
    }
    hint.innerHTML = main + note;
  }
  document.addEventListener('input', function(e){
    if(e.target && e.target.id === 'withdrawAmountInput') recalc();
  });
  // Refresh when the withdraw modal opens (the amount is pre-filled then) and on language change.
  var modal = document.getElementById('withdrawModal');
  if(modal){
    new MutationObserver(function(){
      if(modal.classList.contains('show')) setTimeout(recalc, 30);
    }).observe(modal, {attributes:true, attributeFilter:['class']});
  }
  document.addEventListener('click', function(e){
    if(e.target && e.target.closest && e.target.closest('#langToggle')) setTimeout(recalc, 60);
  });
  document.addEventListener('DOMContentLoaded', recalc);
  recalc();
})();
</script>

<style id="v95-withdraw-onboarding-security-style">
/* v95: first-withdraw onboarding guide and pending account-security states. */
.security-row.is-pending .security-copy span{
  color:#9a8a58!important;
}
.security-row.is-pending .security-action{
  background:#eef8f4!important;
  color:#0caf76!important;
}
.withdraw-onboarding-guide{
  margin:14px 16px 0;
  padding:16px;
  border-radius:22px;
  background:#121936;
  color:#fff;
  box-shadow:0 12px 24px rgba(14,40,36,.08);
}
.withdraw-guide-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  font-size:15px;
  font-weight:950;
}
.withdraw-guide-head b{
  font-size:16px;
  color:#fff;
}
.withdraw-guide-bar{
  height:5px;
  margin:12px 0 14px;
  border-radius:999px;
  background:rgba(255,255,255,.22);
  overflow:hidden;
}
.withdraw-guide-bar i{
  display:block;
  height:100%;
  min-width:0;
  border-radius:inherit;
  background:#ffb12b;
  transition:width .22s ease;
}
.withdraw-guide-list{
  display:grid;
  gap:12px;
}
.withdraw-guide-item{
  display:grid;
  grid-template-columns:22px minmax(0,1fr) auto;
  gap:10px;
  align-items:center;
  min-height:74px;
  padding:12px 12px;
  border-radius:16px;
  border:1px solid rgba(255,255,255,.12);
  background:rgba(255,255,255,.04);
}
.withdraw-guide-dot{
  width:18px;
  height:18px;
  border-radius:50%;
  border:2px solid rgba(255,255,255,.35);
  position:relative;
}
.withdraw-guide-item.done .withdraw-guide-dot{
  border-color:#09b7b2;
  background:#09b7b2;
}
.withdraw-guide-item.done .withdraw-guide-dot:after{
  content:"";
  position:absolute;
  left:5px;
  top:2px;
  width:5px;
  height:9px;
  border:solid #fff;
  border-width:0 2px 2px 0;
  transform:rotate(45deg);
}
.withdraw-guide-copy strong{
  display:block;
  color:#fff;
  font-size:15px;
  line-height:1.2;
  font-weight:950;
}
.withdraw-guide-copy p{
  margin:6px 0 0;
  color:#cfd5fb;
  font-size:12px;
  line-height:1.35;
  font-weight:650;
}
.withdraw-guide-copy em{
  display:inline-flex;
  margin-top:9px;
  padding:6px 12px;
  border-radius:999px;
  background:rgba(180,91,42,.62);
  color:#fff;
  font-style:normal;
  font-size:12px;
  font-weight:950;
}
.withdraw-guide-item button{
  min-width:58px;
  height:36px;
  padding:0 12px;
  border:0;
  border-radius:999px;
  background:#ff6a1a;
  color:#fff;
  font-size:12px;
  font-weight:950;
}
.withdraw-guide-done{
  min-width:58px;
  height:30px;
  padding:0 10px;
  border-radius:999px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  background:rgba(9,183,178,.14);
  color:#9ff5ef;
  font-size:12px;
  font-weight:950;
}
@media(max-width:360px){
  .withdraw-onboarding-guide{margin:12px 12px 0;padding:14px}
  .withdraw-guide-item{grid-template-columns:20px minmax(0,1fr);align-items:flex-start}
  .withdraw-guide-item button,.withdraw-guide-done{grid-column:2;width:max-content}
}
</style>

<style id="v94-login-gate-email-magic-style">
/* v94: first screen email magic-link login. */
#loginGate .auth-gate-login-btn[data-gate-provider="phone"],
#loginGate .auth-gate-login-btn[data-gate-provider="email"]{
  display:none!important;
}
#loginGate .gate-email-magic{
  width:100%;
  display:flex;
  flex-direction:column;
  gap:12px;
  margin-top:8px;
}
#loginGate .gate-email-or{
  display:flex;
  align-items:center;
  gap:12px;
  color:#68727a;
  font-size:13px;
  font-weight:600;
  text-align:center;
  margin:2px 0 4px;
}
#loginGate .gate-email-or:before,
#loginGate .gate-email-or:after{
  content:"";
  height:1px;
  flex:1;
  background:rgba(17,24,39,.12);
}
#loginGate .gate-email-label{
  color:#12171b;
  font-size:14px;
  line-height:1;
  font-weight:900;
  text-align:left;
}
#loginGate .gate-email-input{
  width:100%;
  height:52px;
  border:0;
  border-radius:26px;
  background:#fff;
  color:#1e2428;
  padding:0 18px;
  font-size:16px;
  font-weight:600;
  outline:none;
  box-shadow:0 1px 0 rgba(0,0,0,.05), 0 10px 22px rgba(14,40,36,.08);
}
#loginGate .gate-email-input::placeholder{
  color:#87919b;
  font-weight:500;
}
#loginGate .gate-email-continue{
  width:100%;
  height:62px;
  border:0;
  border-radius:31px;
  background:#e9e9ea;
  color:#c0c3c8;
  font-size:16px;
  font-weight:900;
  cursor:not-allowed;
  box-shadow:none;
}
#loginGate .gate-email-continue.ready{
  background:#16c783;
  color:#fff;
  cursor:pointer;
  box-shadow:0 12px 24px rgba(22,199,131,.24);
}
.magic-link-modal-v94{
  position:fixed;
  inset:0;
  z-index:7200;
  display:none;
  align-items:center;
  justify-content:center;
  padding:22px;
  background:rgba(20,20,23,.58);
}
.magic-link-modal-v94.show{
  display:flex;
}
.magic-link-card-v94{
  position:relative;
  width:100%;
  max-width:340px;
  border-radius:26px;
  background:#f8f8f9;
  color:#2d3035;
  padding:34px 22px 28px;
  text-align:center;
  box-shadow:0 28px 74px rgba(0,0,0,.34);
}
.magic-link-close-v94{
  position:absolute;
  top:12px;
  right:14px;
  width:30px;
  height:30px;
  border:0;
  background:transparent;
  color:#686c73;
  font-size:30px;
  line-height:1;
}
.magic-link-icon-v94{
  width:70px;
  height:70px;
  margin:6px auto 18px;
  border-radius:24px;
  display:grid;
  place-items:center;
  color:#fff;
  background:linear-gradient(145deg,#ff9d45,#ef5c3c 58%,#dc3f62);
  box-shadow:0 12px 30px rgba(239,92,60,.25);
}
.magic-link-icon-v94 svg{
  width:40px;
  height:40px;
}
.magic-link-title-v94{
  margin:0 0 12px;
  font-size:22px;
  line-height:1.16;
  font-weight:950;
  color:#2b2d31;
}
.magic-link-copy-v94{
  margin:0;
  color:#777a82;
  font-size:14px;
  line-height:1.45;
  font-weight:550;
}
.magic-link-copy-v94 strong{
  color:#35383e;
  font-weight:900;
}
.magic-link-spam-v94{
  margin-top:8px;
}
.magic-link-resend-v94{
  width:100%;
  height:62px;
  margin-top:22px;
  border:0;
  border-radius:31px;
  background:#e9e9ea;
  color:#c2c5ca;
  font-size:16px;
  font-weight:850;
}
.magic-link-resend-v94.ready{
  background:#16c783;
  color:#fff;
}
@media(max-width:360px){
  #loginGate .gate-email-input{height:50px}
  #loginGate .gate-email-continue{height:58px}
  .magic-link-card-v94{padding:32px 20px 26px}
}
</style>

<script id="v94-login-gate-email-magic-script">
/* v94: replace Phone/Email first-screen buttons with an email magic-link form. */
(function(){
  if(window.__loginGateEmailMagicV94) return;
  window.__loginGateEmailMagicV94 = true;

  var lastEmail = '';
  var resendTimer = null;
  var resendSeconds = 0;

  function qs(sel){ return document.querySelector(sel); }
  function isEmail(value){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || '').trim()); }
  function text(key){
    var dict = {
      email:'Email',
      placeholder:'Enter your email',
      continue:'Continue',
      invalid:'Enter a valid email address',
      title:'Link Sent Successfully!',
      before:'A login link has been sent to your ',
      after:' email. Please check your inbox and follow the instructions.',
      spam:"Can't see it? Try checking your spam folder or resend it.",
      resend:'Resend'
    };
    return dict[key] || key;
  }
  function toast(msg){
    if(typeof showToast === 'function') showToast(msg);
  }
  function ensureGateForm(){
    var wrap = qs('#loginGate .auth-gate-buttons');
    if(!wrap || qs('#gateEmailMagicV94')) return;
    var form = document.createElement('div');
    form.className = 'gate-email-magic';
    form.id = 'gateEmailMagicV94';
    form.innerHTML =
      '<div class="gate-email-or">or</div>' +
      '<div class="gate-email-label">' + text('email') + '</div>' +
      '<input class="gate-email-input" id="gateEmailInputV94" type="email" inputmode="email" autocomplete="email" placeholder="' + text('placeholder') + '">' +
      '<button class="gate-email-continue" id="gateEmailContinueV94" type="button">' + text('continue') + '</button>';
    wrap.appendChild(form);
    syncButton();
  }
  function syncButton(){
    var input = qs('#gateEmailInputV94');
    var button = qs('#gateEmailContinueV94');
    if(!input || !button) return;
    var ready = isEmail(input.value);
    button.disabled = !ready;
    button.classList.toggle('ready', ready);
  }
  function ensureSentModal(){
    var modal = qs('#magicLinkModalV94');
    if(modal) return modal;
    modal = document.createElement('div');
    modal.id = 'magicLinkModalV94';
    modal.className = 'magic-link-modal-v94';
    modal.innerHTML =
      '<div class="magic-link-card-v94" role="dialog" aria-modal="true" aria-label="Magic link sent">' +
        '<button class="magic-link-close-v94" type="button" aria-label="Close">&times;</button>' +
        '<div class="magic-link-icon-v94" aria-hidden="true">' +
          '<svg viewBox="0 0 48 48" fill="none"><path d="M8 15.5A5.5 5.5 0 0 1 13.5 10h21A5.5 5.5 0 0 1 40 15.5v17A5.5 5.5 0 0 1 34.5 38h-21A5.5 5.5 0 0 1 8 32.5v-17Z" fill="rgba(255,255,255,.96)"/><path d="m12 16 12 10 12-10" stroke="#ef6b42" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="m12.5 33 8.5-8m14.5 8-8.5-8" stroke="#ef6b42" stroke-width="3" stroke-linecap="round"/></svg>' +
        '</div>' +
        '<h2 class="magic-link-title-v94"></h2>' +
        '<p class="magic-link-copy-v94 magic-link-main-v94"></p>' +
        '<p class="magic-link-copy-v94 magic-link-spam-v94"></p>' +
        '<button class="magic-link-resend-v94" type="button"></button>' +
      '</div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', function(e){
      if(e.target === modal || e.target.closest('.magic-link-close-v94')) modal.classList.remove('show');
      if(e.target.closest('.magic-link-resend-v94') && !e.target.closest('.magic-link-resend-v94').disabled) sendMagicLink(lastEmail, true);
    });
    return modal;
  }
  function startCountdown(){
    var button = qs('#magicLinkModalV94 .magic-link-resend-v94');
    if(!button) return;
    clearInterval(resendTimer);
    resendSeconds = 59;
    function render(){
      button.disabled = true;
      button.classList.remove('ready');
      button.textContent = text('resend') + ' (00:' + String(resendSeconds).padStart(2, '0') + ')';
      if(resendSeconds <= 0){
        clearInterval(resendTimer);
        button.disabled = false;
        button.classList.add('ready');
        button.textContent = text('resend');
      }
      resendSeconds -= 1;
    }
    render();
    resendTimer = setInterval(render, 1000);
  }
  function showSent(email){
    var modal = ensureSentModal();
    modal.querySelector('.magic-link-title-v94').textContent = text('title');
    modal.querySelector('.magic-link-main-v94').innerHTML = text('before') + '<strong></strong>' + text('after');
    modal.querySelector('.magic-link-main-v94 strong').textContent = email;
    modal.querySelector('.magic-link-spam-v94').textContent = text('spam');
    modal.classList.add('show');
    startCountdown();
  }
  function maybeBackendSend(email){
    var cfg = window.CASHTASK_MAGIC_LINK_CONFIG || {};
    if(!cfg.sendUrl || typeof fetch !== 'function') return Promise.resolve();
    return fetch(cfg.sendUrl, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:email, source:'whatsapp-h5-login-gate'})
    }).catch(function(){});
  }
  function sendMagicLink(email, resend){
    email = String(email || '').trim();
    if(!isEmail(email)){
      toast(text('invalid'));
      return;
    }
    lastEmail = email;
    maybeBackendSend(email).then(function(){
      try {
        localStorage.setItem('cashtask_magic_link_email_v94', email);
        localStorage.setItem('cashtask_magic_link_sent_at_v94', String(Date.now()));
      } catch(e) {}
      showSent(email);
      if(resend) toast(text('title'));
    });
  }
  function consumeMagicLoginLink(){
    try {
      var href = String(location.href);
      if(href.indexOf('magic_login=1') === -1 && href.indexOf('login_token=') === -1 && href.indexOf('magic_token=') === -1) return;
      if(typeof loginSuccess === 'function') loginSuccess('email', false, '');
    } catch(e) {}
  }

  document.addEventListener('input', function(e){
    if(e.target && e.target.id === 'gateEmailInputV94') syncButton();
  }, true);
  document.addEventListener('click', function(e){
    if(e.target && e.target.closest && e.target.closest('#gateEmailContinueV94')){
      e.preventDefault();
      var input = qs('#gateEmailInputV94');
      sendMagicLink(input ? input.value : '', false);
    }
  }, true);
  document.addEventListener('DOMContentLoaded', function(){
    ensureGateForm();
    consumeMagicLoginLink();
  });
  ensureGateForm();
})();
</script>



<style id="v96-whatsapp-onboarding-cashout-redesign">
/* v96: WhatsApp project onboarding + dynamic first cashout card. Keep existing colors, no preview changes. */
#firstWithdrawPanel{
  background:#121936!important;
  color:#fff!important;
  border:1px solid rgba(255,255,255,.08)!important;
  box-shadow:0 18px 42px rgba(0,0,0,.20)!important;
  padding:18px!important;
  border-radius:24px!important;
}
#firstWithdrawPanel:before{background:rgba(255,255,255,.06)!important;}
#firstWithdrawPanel .first-withdraw-head h2{color:#fff!important;font-size:16px!important;letter-spacing:.1px!important;}
#firstWithdrawPanel .first-withdraw-head p{color:#cfd5fb!important;font-size:12px!important;}
#firstWithdrawPanel .first-withdraw-action{background:#ff6a1a!important;color:#fff!important;box-shadow:none!important;}
#firstWithdrawPanel .first-withdraw-progress-meta{color:#cfd5fb!important;}
#firstWithdrawPanel .first-withdraw-progress-meta strong{color:#fff!important;}
#firstWithdrawPanel .first-withdraw-bar{height:6px!important;background:rgba(255,255,255,.20)!important;}
#firstWithdrawPanel .first-withdraw-bar i{background:#ffb12b!important;box-shadow:none!important;}
.profile-onboarding-list-v96{display:grid;gap:12px;margin-top:16px;}
.profile-onboarding-item-v96{
  min-height:84px;
  display:grid;
  grid-template-columns:22px minmax(0,1fr) auto;
  gap:10px;
  align-items:center;
  padding:13px 12px;
  border-radius:16px;
  border:1px solid rgba(255,255,255,.12);
  background:rgba(255,255,255,.04);
  overflow:hidden;
  transition:max-height .32s ease, opacity .24s ease, transform .24s ease, margin .24s ease, padding .24s ease;
}
.profile-onboarding-item-v96.is-removing{max-height:0!important;opacity:0;transform:translateY(-8px);margin:0!important;padding-top:0!important;padding-bottom:0!important;border-width:0!important;}
.profile-onboarding-dot-v96{width:18px;height:18px;border-radius:50%;border:2px solid rgba(255,255,255,.35);position:relative;}
.profile-onboarding-item-v96.done .profile-onboarding-dot-v96{background:#09b7b2;border-color:#09b7b2;}
.profile-onboarding-item-v96.done .profile-onboarding-dot-v96:after{content:"";position:absolute;left:5px;top:2px;width:5px;height:9px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
.profile-onboarding-copy-v96 strong{display:block;color:#fff;font-size:15px;line-height:1.2;font-weight:950;}
.profile-onboarding-copy-v96 p{margin:6px 0 0;color:#cfd5fb;font-size:12px;line-height:1.35;font-weight:650;}
.profile-onboarding-reward-v96{display:inline-flex;margin-top:9px;padding:6px 12px;border-radius:999px;background:rgba(180,91,42,.62);color:#fff;font-size:12px;font-weight:950;}
.profile-onboarding-start-v96{min-width:58px;height:36px;padding:0 12px;border-radius:999px;background:#ff6a1a!important;color:#fff!important;font-size:12px;font-weight:950;}
.profile-onboarding-done-v96{min-width:58px;height:30px;padding:0 10px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;background:rgba(9,183,178,.14);color:#9ff5ef;font-size:12px;font-weight:950;}
.profile-onboarding-empty-v96{padding:12px;border-radius:16px;background:rgba(9,183,178,.12);color:#9ff5ef;font-size:12px;font-weight:850;line-height:1.45;}
#accountSecurityCard.v96-locked{display:none!important;}
#accountSecurityCard .security-row.v96-hidden{display:none!important;}
.security-row.v96-complete{background:#f5fffa!important;border-color:rgba(18,196,127,.18)!important;}
.security-row.v96-complete .security-action{background:#10203a!important;color:#9ff0c3!important;}
.first-cashout-card-v96{
  margin:14px 16px 0;
  padding:16px;
  border-radius:22px;
  background:#121936;
  color:#fff;
  border:1px solid rgba(255,255,255,.08);
  box-shadow:0 12px 24px rgba(14,40,36,.10);
  overflow:hidden;
  position:relative;
}
.first-cashout-card-v96:before{content:"";position:absolute;right:-38px;top:-48px;width:138px;height:138px;border-radius:50%;background:rgba(255,255,255,.06);pointer-events:none;}
.first-cashout-top-v96{position:relative;z-index:1;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
.first-cashout-top-v96 h3{margin:0;color:#fff;font-size:17px;line-height:1.18;letter-spacing:.1px;}
.first-cashout-top-v96 p{margin:7px 0 0;color:#cfd5fb;font-size:12px;line-height:1.42;}
.first-cashout-percent-v96{font-size:15px;font-weight:950;color:#fff;white-space:nowrap;}
.first-cashout-target-v96{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:16px;color:#fff;font-weight:950;}
.first-cashout-target-v96 span{font-size:13px;color:#fff;}
.first-cashout-target-v96 b{display:flex;align-items:center;gap:6px;font-size:16px;color:#fff;}
.first-cashout-coin-v96{width:20px;height:20px;border-radius:50%;display:inline-grid;place-items:center;background:#ff8a16;color:#fff;font-size:12px;box-shadow:0 0 0 3px rgba(255,138,22,.18);}
.first-cashout-bar-v96{position:relative;z-index:1;height:6px;margin-top:10px;border-radius:999px;background:rgba(255,255,255,.22);overflow:hidden;}
.first-cashout-bar-v96 i{display:block;height:100%;border-radius:inherit;background:#ffb12b;transition:width .32s ease;}
.first-cashout-bottom-v96{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;}
.first-cashout-left-v96{display:inline-flex;align-items:center;gap:7px;color:#dfe6ff;font-size:13px;font-weight:850;}
.first-cashout-btn-v96{min-width:86px;height:36px;padding:0 14px;border-radius:999px;background:#ff6a1a;color:#fff;font-size:12px;font-weight:950;}
.first-cashout-btn-v96.disabled{background:rgba(255,255,255,.12)!important;color:#7f8798!important;pointer-events:auto;}
@media(max-width:360px){.profile-onboarding-item-v96{grid-template-columns:20px minmax(0,1fr);align-items:flex-start}.profile-onboarding-start-v96,.profile-onboarding-done-v96{grid-column:2;width:max-content}.first-cashout-bottom-v96{align-items:flex-start;flex-direction:column}.first-cashout-btn-v96{width:100%;}}
</style>

<script id="v96-whatsapp-onboarding-cashout-redesign-script">
(function(){
  var STORE_KEY='cashtask_state_v10';
  var lastDoneKeys='';
  function qs(s,r){return (r||document).querySelector(s)}
  function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
  function readState(){try{return JSON.parse(localStorage.getItem(STORE_KEY)||'{}')||{}}catch(e){return {}}}
  function writeState(s){try{localStorage.setItem(STORE_KEY,JSON.stringify(s))}catch(e){}}
  function lang(s){return (s&&s.lang)||document.documentElement.lang||'en'}
  function isZh(s){return lang(s)==='zh'||lang(s)==='zh-CN'}
  function t(s, en, zh){return isZh(s)?zh:en}
  function hasEmail(s){var e=String((s.profile&&s.profile.email)||'').trim();return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)&&e.toLowerCase()!=='123@123.com'}
  function hasPhone(s){var d=String((s.profile&&s.profile.phone)||'').replace(/\D/g,'');return d.length>=7&&d!=='923001234567'&&d!=='3001234567'}
  function hasPayout(s){return !!(s.onboardingGuideLocks&&s.onboardingGuideLocks.payout)||!!(s.onboardingGuideRewards&&s.onboardingGuideRewards.payout)||(Array.isArray(s.savedCards)&&s.savedCards.length>0)||!!String(s.withdrawAccount||'').trim()}
  function hasWhatsapp(s){return !!s.whatsappBound || (Array.isArray(s.whatsappAccounts)&&s.whatsappAccounts.length>0)}
  function items(s){return [
    {key:'whatsapp',done:hasWhatsapp(s),title:t(s,'Bind WhatsApp','绑定 WhatsApp'),desc:t(s,'Connect WhatsApp to receive daily task delivery and cashout alerts.','连接 WhatsApp，用于接收每日任务和提现提醒。'),action:'whatsapp'},
    {key:'payout',done:hasPayout(s),title:t(s,'Add payout account','添加收款账户'),desc:t(s,'Save JazzCash or Easypaisa so your first cashout is ready.','保存 JazzCash 或 Easypaisa，让首次提现更快完成。'),action:'payout'},
    {key:'email',done:hasEmail(s),title:t(s,'Confirm your email','确认邮箱'),desc:t(s,'Confirm your email to protect your task earnings.','确认邮箱，用于保护你的任务收益。'),action:'email'},
    {key:'phone',done:hasPhone(s),title:t(s,'Add phone number','添加手机号'),desc:t(s,'Add a phone number for account recovery and withdrawal verification.','添加手机号，用于账户找回和提现验证。'),action:'phone'}
  ]}
  function dynamicTitle(s,done,total){
    if(done<=0) return t(s,'Finish onboarding','完成账户引导');
    if(done===1) return t(s,'Great start, finish 3 more steps','已完成第一步，还差 3 项');
    if(done===2) return t(s,'Halfway done, unlock your account tools','已完成一半，继续解锁账户工具');
    if(done===3) return t(s,'One step left to secure your account','最后一步，完成账户保护');
    return t(s,'Account ready for cashout','账户已准备好提现');
  }
  function showProfileOnboardingToast(txt){
    if (typeof window.showToast === 'function') return window.showToast(txt);
    var el=qs('#toast');
    if(!el){alert(txt);return}
    el.textContent=txt; el.classList.add('show'); clearTimeout(showProfileOnboardingToast._t); showProfileOnboardingToast._t=setTimeout(function(){el.classList.remove('show')},2200);
  }
  function grantRewards(s){
    s.profile=s.profile||{}; s.onboardingGuideRewards=s.onboardingGuideRewards||{};
    if(!s.onboardingGuideRewardsInitialized){
      items(s).forEach(function(it){ if(it.done) s.onboardingGuideRewards[it.key]=true; });
      s.onboardingGuideRewardsInitialized=true;
      writeState(s);
      return;
    }
    var earned=0, newly=[];
    items(s).forEach(function(it){ if(it.done&&!s.onboardingGuideRewards[it.key]){s.onboardingGuideRewards[it.key]=true; earned+=100; newly.push(it.title)} });
    if(earned>0){
      s.balance=Number(s.balance||0)+earned;
      s.totalEarnings=Number(s.totalEarnings||0)+earned;
      s.virtualCardBalance=Number(s.virtualCardBalance||0)+earned;
      s.todayEarnings=Number(s.todayEarnings||0)+earned;
      writeState(s);
      showProfileOnboardingToast('+'+earned+' pts · '+(isZh(s)?'账户引导奖励已到账':'Onboarding reward credited'));
    }
  }
  function renderProfileOnboarding(){
    var panel=qs('#firstWithdrawPanel'); if(!panel) return;
    var s=readState(); grantRewards(s); s=readState();
    var list=items(s), done=list.filter(function(x){return x.done}).length, pct=Math.round(done/list.length*100);
    var set=function(id,val){var el=qs('#'+id); if(el) el.textContent=val};
    set('firstWithdrawTitle', dynamicTitle(s,done,list.length));
    set('firstWithdrawSub', t(s,'Complete these setup steps to protect your WhatsApp task earnings and unlock cashout tools.','完成这些设置，保护 WhatsApp 任务收益并解锁提现工具。'));
    set('firstWithdrawMetaLabel', t(s,'Setup progress','绑定进度'));
    set('firstWithdrawCurrent', done);
    set('firstWithdrawGoal', list.length+' '+t(s,'steps','项'));
    var bar=qs('#firstWithdrawBar'); if(bar) bar.style.width=pct+'%';
    var btn=qs('#firstWithdrawalAction'); if(btn) btn.textContent = done===list.length ? t(s,'Withdraw','去提现') : t(s,'Start','开始');
    var old=qs('#profileOnboardingListV96'); if(!old){ old=document.createElement('div'); old.id='profileOnboardingListV96'; old.className='profile-onboarding-list-v96'; panel.appendChild(old); }
    var pending=list.filter(function(x){return !x.done});
    if(!pending.length){
      old.innerHTML='<div class="profile-onboarding-empty-v96">'+t(s,'All setup steps are complete. Account Security is now unlocked below.','所有引导已完成，账户安全功能已在下方解锁。')+'</div>';
    }else{
      old.innerHTML=pending.map(function(it){return '<div class="profile-onboarding-item-v96" data-profile-guide-key="'+it.key+'"><span class="profile-onboarding-dot-v96"></span><div class="profile-onboarding-copy-v96"><strong>'+it.title+'</strong><p>'+it.desc+'</p><span class="profile-onboarding-reward-v96">+100 pts</span></div><button class="profile-onboarding-start-v96" type="button" data-v96-start="'+it.action+'">'+t(s,'Start','开始')+'</button></div>'}).join('');
    }
    var now=list.filter(function(x){return x.done}).map(function(x){return x.key}).join('|');
    if(lastDoneKeys && now!==lastDoneKeys){
      lastDoneKeys.split('|').forEach(function(k){});
    }
    lastDoneKeys=now;
  }
  function ensureSecurityRows(){
    var card=qs('#accountSecurityCard'); if(!card) return;
    if(!qs('#securityWhatsappBtn')){
      var row=document.createElement('button'); row.className='security-row'; row.id='securityWhatsappBtn'; row.type='button';
      row.innerHTML='<span class="security-icon">WA</span><span class="security-copy"><strong>WhatsApp</strong><span id="securityWhatsappValue">Not linked</span></span><span class="security-action">Manage</span>';
      var first=qs('#changeEmailBtn'); card.insertBefore(row, first||card.lastChild);
    }
    if(!qs('#securityPayoutBtn')){
      var row2=document.createElement('button'); row2.className='security-row'; row2.id='securityPayoutBtn'; row2.type='button';
      row2.innerHTML='<span class="security-icon">₨</span><span class="security-copy"><strong>Payout Account</strong><span id="securityPayoutValue">Not added</span></span><span class="security-action">Manage</span>';
      var email=qs('#changeEmailBtn'); card.insertBefore(row2, email||card.lastChild);
    }
  }
  function renderSecurityUnlock(){
    ensureSecurityRows();
    var s=readState(), card=qs('#accountSecurityCard'); if(!card) return;
    var ok={whatsapp:hasWhatsapp(s),payout:hasPayout(s),email:hasEmail(s),phone:hasPhone(s)};
    var any=ok.whatsapp||ok.payout||ok.email||ok.phone;
    card.classList.toggle('v96-locked',!any);
    var map={whatsapp:'#securityWhatsappBtn',payout:'#securityPayoutBtn',email:'#changeEmailBtn',phone:'#changePhoneBtn'};
    Object.keys(map).forEach(function(k){var row=qs(map[k]); if(row){row.classList.toggle('v96-hidden',!ok[k]); row.classList.toggle('v96-complete',!!ok[k]);}});
    var pass=qs('#changePasswordBtn'); if(pass){pass.classList.toggle('v96-hidden',!(ok.email&&ok.phone)); pass.classList.toggle('v96-complete',ok.email&&ok.phone);}
    var wa=qs('#securityWhatsappValue'); if(wa) wa.textContent= ok.whatsapp ? (s.whatsappNumber ? ((s.whatsappDialCode||'')+' '+s.whatsappNumber) : 'Connected') : 'Not linked';
    var po=qs('#securityPayoutValue'); if(po){var c=(s.savedCards&&s.savedCards[0])||null; po.textContent= ok.payout ? ((c&&c.channel?c.channel:'Account')+' · '+((c&&c.account)||'Saved')) : 'Not added';}
  }
  function renderCashoutCard(){
    var cash=qs('#cashTabPanel'); if(!cash) return;
    var bal=qs('.withdraw-balance-card',cash);
    var card=qs('#firstCashoutCardV96');
    if(!card){card=document.createElement('div'); card.id='firstCashoutCardV96'; card.className='first-cashout-card-v96'; if(bal&&bal.parentNode) bal.parentNode.insertBefore(card,bal.nextSibling); else cash.insertBefore(card,cash.firstChild)}
    var old=qs('#withdrawOnboardingGuide'); if(old) old.style.display='none';
    var s=readState(), goal=Math.max(1,Number(s.withdrawalGoal||2000)), current=Math.max(0,Math.round(Number(s.balance||0))), left=Math.max(0,goal-current), pct=Math.max(0,Math.min(100,Math.round(current/goal*100))), ready=left<=0;
    var title=ready?t(s,'Your first cashout is ready','首次提现已准备好'):t(s,'Get ready for your first cashout','准备完成首次提现');
    var sub=ready?t(s,'You have enough points to submit a withdrawal request.','积分已达到提现门槛，可以提交提现申请。'):t(s,'Keep WhatsApp online and finish tasks to unlock your first withdrawal.','保持 WhatsApp 在线并完成任务，解锁首次提现。');
    card.innerHTML='<div class="first-cashout-top-v96"><div><h3>'+title+'</h3><p>'+sub+'</p></div><div class="first-cashout-percent-v96">'+pct+'%</div></div><div class="first-cashout-target-v96"><span>'+t(s,'Cashout target','提现目标')+'</span><b><span class="first-cashout-coin-v96 v105-cashout-coin"><img class="v105-img-icon" src="https://raw.githubusercontent.com/robin20260517/robin20260517.github.io/5bc3051373c7cee495d9f85f86f7d544b7bc383a/whatsapp-h5/icons/pakistan_rupee_coins_transparent.png" alt="Cash" loading="lazy"></span>'+goal.toLocaleString()+' pts</b></div><div class="first-cashout-bar-v96"><i style="width:'+pct+'%"></i></div><div class="first-cashout-bottom-v96"><div class="first-cashout-left-v96"><span class="first-cashout-coin-v96 v105-cashout-coin"><img class="v105-img-icon" src="https://raw.githubusercontent.com/robin20260517/robin20260517.github.io/5bc3051373c7cee495d9f85f86f7d544b7bc383a/whatsapp-h5/icons/pakistan_rupee_coins_transparent.png" alt="Cash" loading="lazy"></span><span>'+(ready?t(s,'Ready to withdraw','可以提现'):left.toLocaleString()+' pts '+t(s,'left','还差'))+'</span></div><button type="button" class="first-cashout-btn-v96 '+(ready?'':'disabled')+'" id="firstCashoutBtnV96">'+(ready?t(s,'Cash out now','立即提现'):t(s,'Withdraw','提现'))+'</button></div>';
  }
  function startAction(action){
    if(action==='whatsapp'){ var b=qs('#bindStartBtn'); if(b) b.click(); else qs('#whatsappBindModal')&&qs('#whatsappBindModal').classList.add('show'); return; }
    if(action==='payout'){ var m=qs('#addCardModal'); if(m){m.classList.add('show'); document.body.classList.add('modal-lock')} return; }
    if(action==='email'){ var e=qs('#changeEmailBtn'); if(e) e.click(); return; }
    if(action==='phone'){ var p=qs('#changePhoneBtn'); if(p) p.click(); return; }
  }
  function bindClicks(){
    if(bindClicks.done) return; bindClicks.done=true;
    document.addEventListener('click',function(e){
      var st=e.target.closest&&e.target.closest('[data-v96-start]');
      if(st){e.preventDefault(); startAction(st.getAttribute('data-v96-start')); return;}
      var wa=e.target.closest&&e.target.closest('#securityWhatsappBtn');
      if(wa){e.preventDefault(); startAction('whatsapp'); return;}
      var po=e.target.closest&&e.target.closest('#securityPayoutBtn');
      if(po){e.preventDefault(); startAction('payout'); return;}
      var cash=e.target.closest&&e.target.closest('#firstCashoutBtnV96');
      if(cash){
        var s=readState(), goal=Number(s.withdrawalGoal||2000), current=Number(s.balance||0);
        if(current>=goal){ cash.closest('#withdrawModal')||null; showToast(isZh(s)?'请填写提现账户并提交申请':'Fill in your payout details and submit.'); }
        else { var tab=qs('.tab[data-go="tasks"]'); if(tab) tab.click(); else location.hash='#tasks'; showToast(isZh(s)?'继续完成任务，达到提现门槛。':'Complete more tasks to reach the cashout target.'); }
      }
    },true);
  }
  function renderAll(){renderProfileOnboarding(); renderSecurityUnlock(); renderCashoutCard();}
  document.addEventListener('DOMContentLoaded',function(){bindClicks(); renderAll(); setTimeout(renderAll,200); setTimeout(renderAll,800);});
  bindClicks(); renderAll();
  setInterval(renderAll,1200);
})();
</script>

<style id="v97-onboarding-fixes-style">
/* v97: stabilize completed setup UI and empty account-edit fields. */
.first-status-chip.done{
  background:#12c47f!important;
  border-color:#12c47f!important;
  box-shadow:0 12px 24px rgba(18,196,127,.20)!important;
}
.first-status-chip.done b,
.first-status-chip.done span{
  color:#fff!important;
}
.account-edit-empty-current{
  display:none!important;
}
</style>

<script id="v97-onboarding-fixes-script">
/* v97: hide empty current email/phone rows and keep payout completion synced. */
(function(){
  var KEY='cashtask_state_v10';
  function qs(sel){return document.querySelector(sel)}
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return {}}}
  function write(s){try{localStorage.setItem(KEY,JSON.stringify(s||{}))}catch(e){}}
  function syncGlobalState(patch){
    try{
      if(typeof state !== 'undefined'){
        Object.keys(patch||{}).forEach(function(k){state[k]=patch[k]});
        if(typeof saveState==='function') saveState();
      }
    }catch(e){}
  }
  function hasEmail(s){
    var e=String((s.profile&&s.profile.email)||'').trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)&&e.toLowerCase()!=='123@123.com';
  }
  function hasPhone(s){
    var d=String((s.profile&&s.profile.phone)||'').replace(/\D/g,'');
    return d.length>=7&&d!=='923001234567'&&d!=='3001234567';
  }
  function hasPayout(s){
    return !!(s.onboardingGuideLocks&&s.onboardingGuideLocks.payout)||!!(s.onboardingGuideRewards&&s.onboardingGuideRewards.payout)||(Array.isArray(s.savedCards)&&s.savedCards.length>0)||!!String(s.withdrawAccount||'').trim();
  }
  function stabilizePayout(){
    var s=read();
    if(!hasPayout(s)) return;
    s.onboardingGuideLocks=s.onboardingGuideLocks||{};
    s.onboardingGuideLocks.payout=true;
    s.onboardingGuideRewards=s.onboardingGuideRewards||{};
    if(!s.onboardingGuideRewards.payout) s.onboardingGuideRewards.payout=true;
    write(s);
    syncGlobalState({
      savedCards:s.savedCards||[],
      selectedPayment:s.selectedPayment,
      withdrawName:s.withdrawName||'',
      withdrawAccount:s.withdrawAccount||'',
      onboardingGuideLocks:s.onboardingGuideLocks,
      onboardingGuideRewards:s.onboardingGuideRewards
    });
  }
  function hideEmptyCurrentRows(){
    var modal=qs('#accountSecurityModal');
    if(!modal||!modal.classList.contains('show')) return;
    var wrap=qs('#accountEditCurrentWrap');
    var current=qs('#accountEditCurrentInput');
    var title=(qs('#accountEditTitle')&&qs('#accountEditTitle').textContent||'').toLowerCase();
    if(!wrap||!current) return;
    var s=read();
    var isEmail=title.indexOf('email')>-1||title.indexOf('邮箱')>-1||title.indexOf('閭')>-1;
    var isPhone=title.indexOf('phone')>-1||title.indexOf('手机')>-1||title.indexOf('鎵')>-1;
    var empty=(isEmail&&!hasEmail(s))||(isPhone&&!hasPhone(s));
    wrap.classList.toggle('account-edit-empty-current',!!empty);
    if(empty) current.value='';
  }
  document.addEventListener('click',function(e){
    if(e.target&&e.target.closest&&e.target.closest('#saveAddCardBtn')){
      setTimeout(function(){
        stabilizePayout();
        try{ if(typeof renderAll==='function') renderAll(); if(typeof updateAll==='function') updateAll(); }catch(err){}
      },120);
    }
    if(e.target&&e.target.closest&&e.target.closest('[data-v96-start],#changeEmailBtn,#changePhoneBtn')){
      setTimeout(hideEmptyCurrentRows,80);
      setTimeout(hideEmptyCurrentRows,240);
    }
  },true);
  var modal=qs('#accountSecurityModal');
  if(modal){
    new MutationObserver(function(){setTimeout(hideEmptyCurrentRows,40)}).observe(modal,{attributes:true,attributeFilter:['class']});
  }
  setInterval(function(){stabilizePayout();hideEmptyCurrentRows()},900);
  stabilizePayout();
  hideEmptyCurrentRows();
})();
</script>

<style id="v98-onboarding-green-cleanup-style">
/* v98: hide redundant status chips. Keep original onboarding colors. */
#firstWithdrawPanel .first-withdraw-status-grid{
  display:none!important;
}
</style>

<style id="v99-agent-tabs-redesign-style">
/* v99: restyle the original agent modules into Affiliates / Referrals / Redeem tabs without replacing their logic. */
#team{
  min-height:100dvh!important;
  padding:0 0 92px!important;
  background:#1b1b1b!important;
  color:#fff!important;
}
#team > :not(#agentTabsV99){
  display:none!important;
}
#agentTabsV99,
#agentTabsV99 *{
  box-sizing:border-box;
}
#agentTabsV99{
  width:100%;
  max-width:none;
  margin:0 auto;
  color:#fff;
}
.agent-v99-shell{
  background:#242424;
  min-height:calc(100dvh - 92px);
  border-radius:0;
  padding:12px 10px 22px;
  box-shadow:none;
}
.agent-v99-tabs{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:4px;
  padding:4px;
  margin:0 0 24px;
  background:#2d2d2d;
  border-radius:16px;
}
.agent-v99-tab{
  min-height:44px;
  border:0;
  border-radius:11px;
  background:transparent;
  color:#fff;
  font-size:16px;
  font-weight:950;
  cursor:pointer;
}
.agent-v99-tab.active{
  background:#5b5b5b;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.08);
}
.agent-v99-panel{
  display:none;
}
.agent-v99-panel.active{
  display:block;
}
.agent-v99-title{
  margin:0 6px 16px;
  color:#fff;
  font-size:28px;
  line-height:1.1;
  font-weight:950;
  text-align:center;
}
.agent-v99-sub{
  margin:-8px 6px 18px;
  color:rgba(255,255,255,.78);
  font-size:13px;
  line-height:1.45;
  font-weight:800;
  text-align:center;
}
#agentTabsV99 #agentPanel,
#agentTabsV99 #downlineActivationCard,
#agentTabsV99 #manualBindPanel{
  display:block!important;
  width:100%!important;
  margin:0!important;
  color:#fff!important;
}
#agentTabsV99 #agentPanel{
  padding:0!important;
  background:transparent!important;
  border:0!important;
  box-shadow:none!important;
}
#agentTabsV99 #agentPanel:before,
#agentTabsV99 #downlineActivationCard:before,
#agentTabsV99 #manualBindPanel:before{
  display:none!important;
}
#agentTabsV99 #agentPanel .agent-marquee{
  display:none!important;
}
#agentTabsV99 #agentPanel h3{
  margin:0 6px 16px!important;
  color:#fff!important;
  font-size:28px!important;
  line-height:1.1!important;
  font-weight:950!important;
  text-align:center!important;
}
#agentTabsV99 #agentPanel h3:before{
  content:''!important;
}
#agentTabsV99 #agentPanel .agent-sub{
  margin:0 6px 14px!important;
  color:rgba(255,255,255,.78)!important;
  font-size:13px!important;
  line-height:1.45!important;
  font-weight:800!important;
  text-align:center!important;
}
#agentTabsV99 #agentPanel .agent-trigger-box,
#agentTabsV99 #agentPanel .agent-calculator,
#agentTabsV99 #downlineActivationCard,
#agentTabsV99 #manualBindPanel{
  border-radius:18px!important;
  background:#303030!important;
  border:1px solid rgba(255,255,255,.14)!important;
  color:#fff!important;
  box-shadow:none!important;
}
#agentTabsV99 #agentPanel .agent-trigger-box{
  padding:16px!important;
  margin:0 0 12px!important;
  font-size:15px!important;
  line-height:1.45!important;
  font-weight:850!important;
}
#agentTabsV99 #agentPanel .agent-trigger-box strong{
  color:#fff!important;
}
#agentTabsV99 #agentPanel .agent-commission-grid{
  display:grid!important;
  grid-template-columns:repeat(3,minmax(0,1fr))!important;
  gap:10px!important;
  margin:0 0 12px!important;
}
#agentTabsV99 #agentPanel .agent-commission-grid div,
#agentTabsV99 #manualBindPanel .manual-income-box,
#agentTabsV99 #manualBindPanel .manual-level-card,
#agentTabsV99 #downlineActivationCard .activation-stats div{
  background:#3a3a3a!important;
  border:1px solid rgba(255,255,255,.13)!important;
  color:#fff!important;
}
#agentTabsV99 #agentPanel .agent-commission-grid strong,
#agentTabsV99 #downlineActivationCard .activation-stats strong,
#agentTabsV99 #manualBindPanel .manual-income-box strong,
#agentTabsV99 #manualBindPanel .manual-level-card strong{
  color:#fff!important;
}
#agentTabsV99 #agentPanel .agent-calculator{
  padding:16px!important;
  margin:0 0 16px!important;
}
#agentTabsV99 #agentPanel .calc-grid{
  display:grid!important;
  grid-template-columns:1fr 1fr!important;
  gap:10px!important;
}
#agentTabsV99 #agentPanel .calc-grid label{
  color:#fff!important;
  font-size:12px!important;
  font-weight:900!important;
}
#agentTabsV99 #agentPanel .calc-grid input,
#agentTabsV99 #manualBindPanel input{
  width:100%!important;
  border:0!important;
  border-radius:16px!important;
  background:#4f4f4f!important;
  color:#fff!important;
  outline:0!important;
}
#agentTabsV99 #agentPanel .calc-grid input[type=number]{
  position:absolute!important;
  opacity:0!important;
  pointer-events:none!important;
  width:1px!important;
  height:1px!important;
}
#agentTabsV99 .agent-calc-visual{
  margin-top:8px;
  padding:10px;
  border-radius:16px;
  background:#3a3a3a;
  border:1px solid rgba(255,255,255,.12);
}
#agentTabsV99 .agent-calc-control{
  display:grid;
  grid-template-columns:34px 1fr 34px;
  align-items:center;
  gap:8px;
}
#agentTabsV99 .agent-calc-btn{
  width:34px;
  height:34px;
  border:0;
  border-radius:12px;
  background:#242424;
  color:#fff;
  font-size:20px;
  font-weight:950;
  line-height:1;
}
#agentTabsV99 .agent-calc-value{
  min-width:0;
  height:42px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#555;
  color:#fff;
  font-size:18px;
  font-weight:950;
}
#agentTabsV99 .agent-calc-track{
  height:6px;
  margin-top:10px;
  border-radius:999px;
  background:#242424;
  overflow:hidden;
}
#agentTabsV99 .agent-calc-track i{
  display:block;
  height:100%;
  width:0;
  border-radius:inherit;
  background:#ffad2f;
}
#agentTabsV99 .agent-calc-hint{
  display:block;
  margin-top:7px;
  color:rgba(255,255,255,.68);
  font-size:11px;
  line-height:1.25;
  font-weight:800;
  text-align:center;
}
#agentTabsV99 #agentPanel .calc-result{
  margin-top:14px!important;
  color:#fff!important;
  font-size:15px!important;
  font-weight:900!important;
}
#agentTabsV99 #agentEstimateText,
#agentTabsV99 [data-agent-estimate-text]{
  color:#fff!important;
}
#agentTabsV99 #applyAgentBtn,
#agentTabsV99 #manualBindBtn,
#agentTabsV99 #activationRemindBtn{
  width:100%!important;
  min-height:62px!important;
  border:0!important;
  border-radius:30px!important;
  background:#ff6518!important;
  color:#fff!important;
  font-size:18px!important;
  font-weight:950!important;
  box-shadow:0 14px 26px rgba(255,101,24,.22)!important;
}
#agentTabsV99 #downlineActivationCard,
#agentTabsV99 #manualBindPanel{
  padding:14px!important;
}
#agentTabsV99 .activation-head h2,
#agentTabsV99 .manual-bind-head h3{
  color:#fff!important;
  font-size:21px!important;
}
#agentTabsV99 .activation-head p,
#agentTabsV99 .manual-bind-head p,
#agentTabsV99 .manual-bind-note,
#agentTabsV99 .manual-income-rule,
#agentTabsV99 .activation-milestone{
  color:rgba(255,255,255,.75)!important;
}
#agentTabsV99 .activation-bonus,
#agentTabsV99 .manual-bind-lock{
  background:#753f22!important;
  color:#fff!important;
}
#agentTabsV99 .activation-progress{
  background:#666!important;
}
#agentTabsV99 .activation-progress i{
  background:#ffad2f!important;
}
#agentTabsV99 .activation-user-chip,
#agentTabsV99 .manual-downline-item{
  background:#2b2b2b!important;
  border:1px solid rgba(255,255,255,.13)!important;
  color:#fff!important;
}
#agentTabsV99 .activation-user-chip span,
#agentTabsV99 .manual-downline-item span,
#agentTabsV99 .manual-downline-empty{
  color:rgba(255,255,255,.72)!important;
}
#agentTabsV99 .manual-downline-item strong{
  color:#fff!important;
}
.agent-v99-rank-wrap{
  margin-top:18px;
}
.agent-v99-stats{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
  margin:0 0 14px;
}
.agent-v99-stat{
  min-height:84px;
  display:grid;
  place-items:center;
  text-align:center;
  border:1px solid rgba(255,255,255,.16);
  border-radius:16px;
  background:#2f2f2f;
}
.agent-v99-stat strong{
  display:block;
  color:#fff;
  font-size:28px;
  line-height:1;
  font-weight:950;
}
.agent-v99-stat span{
  display:block;
  margin-top:8px;
  color:#f1f1f1;
  font-size:13px;
  font-weight:800;
}
.agent-v99-overview{
  width:max-content;
  margin:0 auto 18px;
  border-bottom:1px solid #fff;
  color:#fff;
  font-size:16px;
  font-weight:900;
}
.agent-v99-mascot{
  width:142px;
  height:120px;
  margin:0 auto -4px;
  position:relative;
}
.agent-v99-mascot:before{
  content:"";
  position:absolute;
  left:30px;
  top:22px;
  width:86px;
  height:74px;
  border-radius:42% 42% 44% 44%;
  background:linear-gradient(145deg,#ff7b1c,#f4b563);
  box-shadow:0 16px 24px rgba(0,0,0,.22);
}
.agent-v99-mascot:after{
  content:"PKR";
  position:absolute;
  left:17px;
  top:50px;
  width:48px;
  height:48px;
  border-radius:50%;
  display:grid;
  place-items:center;
  background:#653bb8;
  color:#fff;
  border:4px solid #9b74ff;
  font-size:11px;
  font-weight:950;
}
.agent-v99-leaders{
  border-radius:18px;
  background:#303030;
  padding:18px 16px 16px;
}
.agent-v99-chip{
  width:max-content;
  margin:0 auto 10px;
  padding:5px 10px;
  border-radius:13px;
  background:#453d83;
  color:#fff;
  font-size:12px;
  font-weight:900;
}
.agent-v99-section-title{
  margin:0 0 18px;
  text-align:center;
  color:#fff;
  font-size:26px;
  line-height:1.1;
  font-weight:950;
}
.agent-v99-leader-list{
  display:grid;
  gap:10px;
}
.agent-v99-leader{
  display:grid;
  grid-template-columns:auto 1fr auto;
  align-items:center;
  gap:10px;
  min-height:54px;
  padding:8px 10px;
  border-radius:14px;
  background:#2b2b2b;
  color:#fff;
}
.agent-v99-leader.top{
  background:#3b335f;
}
.agent-v99-rank{
  width:38px;
  height:38px;
  border-radius:14px;
  display:grid;
  place-items:center;
  background:#5b46a3;
  color:#fff;
  font-weight:950;
}
.agent-v99-leader-name{
  min-width:0;
  font-size:14px;
  font-weight:900;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.agent-v99-leader-points{
  display:flex;
  align-items:center;
  gap:8px;
  font-size:13px;
  font-weight:950;
}
.agent-v99-bonus{
  padding:6px 8px;
  border-radius:13px;
  background:#1c6670;
  color:#fff;
  font-size:12px;
  font-weight:950;
}
@media (max-width:360px){
  .agent-v99-tab{font-size:14px;}
  .agent-v99-title,#agentTabsV99 #agentPanel h3{font-size:24px!important;}
  #agentTabsV99 #agentPanel .calc-grid{grid-template-columns:1fr!important;}
  .agent-v99-leader{grid-template-columns:auto 1fr;}
  .agent-v99-leader-points{grid-column:2;}
}
</style>

<script id="v99-agent-tabs-redesign-script">
(function(){
  if(window.__agentTabsV99Ready) return;
  window.__agentTabsV99Ready=true;
  var KEY='cashtask_state_v10';
  var TAB_KEY='agentTabsV99Active';
  function qs(sel,root){return (root||document).querySelector(sel)}
  function qsa(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel))}
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return {}}}
  function lang(){var s=read();return s.lang||((document.documentElement.lang||'').indexOf('zh')===0?'zh':'en')}
  function isZh(){return lang()==='zh'}
  function pick(zh,en,ur){var l=lang();return l==='zh'?zh:(l==='ur'?(ur||en):en)}
  function txt(sel,zh,en,ur){var el=qs(sel);if(el) el.textContent=pick(zh,en,ur)}
  function html(sel,zh,en,ur){var el=qs(sel);if(el) el.innerHTML=pick(zh,en,ur)}
  function ph(sel,zh,en,ur){var el=qs(sel);if(el) el.placeholder=pick(zh,en,ur)}
  function fmt(n){return Number(n||0).toLocaleString('en-US')}
  function calcRange(id){
    return id==='agentUsersInput' ? {min:1,max:200,step:1} : {min:10,max:200,step:1};
  }
  function ensureCalcVisual(){
    qsa('#agentPanel .calc-grid label').forEach(function(label){
      var input=label.querySelector('input[type=number]');
      if(!input || label.querySelector('.agent-calc-visual')) return;
      var wrap=document.createElement('div');
      wrap.className='agent-calc-visual';
      wrap.setAttribute('data-calc-for',input.id);
      wrap.innerHTML='<div class="agent-calc-control"><button class="agent-calc-btn" type="button" data-calc-step="-1">-</button><div class="agent-calc-value"></div><button class="agent-calc-btn" type="button" data-calc-step="1">+</button></div><div class="agent-calc-track"><i></i></div><span class="agent-calc-hint"></span>';
      label.appendChild(wrap);
    });
    updateCalcVisual();
  }
  function updateCalcVisual(){
    qsa('#agentPanel .agent-calc-visual').forEach(function(wrap){
      var id=wrap.getAttribute('data-calc-for');
      var input=qs('#'+id);
      if(!input) return;
      var range=calcRange(id);
      var value=Math.max(range.min,Math.min(range.max,Number(input.value||range.min)));
      input.value=value;
      var valueEl=qs('.agent-calc-value',wrap);
      var bar=qs('.agent-calc-track i',wrap);
      var hint=qs('.agent-calc-hint',wrap);
      if(valueEl) valueEl.textContent=value;
      if(bar) bar.style.width=Math.max(4,Math.min(100,(value-range.min)/(range.max-range.min)*100))+'%';
      if(hint) hint.textContent=id==='agentUsersInput'
        ? pick('模拟下级规模','Simulated team size','Simulated team size')
        : pick('模拟每日任务活跃度','Simulated daily activity','Simulated daily activity');
    });
  }
  function totals(){
    var s=read();
    var list=Array.isArray(s.manualDownlines)?s.manualDownlines:[];
    var joined=Number(s.downlineCount||s.referralCount||list.length||0);
    var earned=Number(s.agentIncomeTotal||s.totalAgentIncome||s.referralRewards||0);
    if(!earned && list.length){
      earned=list.length*360;
    }
    return {joined:joined,earned:earned};
  }
  function ensureShell(){
    var team=qs('#team');
    if(!team) return null;
    var shell=qs('#agentTabsV99');
    if(!shell){
      shell=document.createElement('div');
      shell.id='agentTabsV99';
      team.appendChild(shell);
    }
    if(!qs('.agent-v99-shell',shell)){
      shell.innerHTML=
        '<div class="agent-v99-shell">'+
          '<div class="agent-v99-tabs" role="tablist">'+
            '<button class="agent-v99-tab active" type="button" data-agent-tab="affiliates"></button>'+
            '<button class="agent-v99-tab" type="button" data-agent-tab="referrals"></button>'+
            '<button class="agent-v99-tab" type="button" data-agent-tab="redeem"></button>'+
          '</div>'+
          '<section class="agent-v99-panel active" data-agent-panel="affiliates"><div id="agentV99AgentMount"></div><div class="agent-v99-rank-wrap" id="agentV99RankWrap"></div></section>'+
          '<section class="agent-v99-panel" data-agent-panel="referrals"><h2 class="agent-v99-title" id="agentV99ActivationTitle"></h2><p class="agent-v99-sub" id="agentV99ActivationSub"></p><div id="agentV99ActivationMount"></div></section>'+
          '<section class="agent-v99-panel" data-agent-panel="redeem"><h2 class="agent-v99-title" id="agentV99BindTitle"></h2><p class="agent-v99-sub" id="agentV99BindSub"></p><div id="agentV99ManualMount"></div></section>'+
        '</div>';
    }
    return shell;
  }
  function mount(id,targetId){
    var el=qs('#'+id), target=qs('#'+targetId);
    if(el&&target&&!target.contains(el)) target.appendChild(el);
  }
  function setTab(name){
    var shell=qs('#agentTabsV99');
    if(!shell) return;
    qsa('[data-agent-tab]',shell).forEach(function(btn){btn.classList.toggle('active',btn.getAttribute('data-agent-tab')===name)});
    qsa('[data-agent-panel]',shell).forEach(function(panel){panel.classList.toggle('active',panel.getAttribute('data-agent-panel')===name)});
    try{localStorage.setItem(TAB_KEY,name)}catch(e){}
  }
  function renderRank(){
    var host=qs('#agentV99RankWrap');
    if(!host) return;
    var t=totals();
    // Build the static skeleton only once. On language switches we update text
    // nodes in place instead of wiping innerHTML, which previously caused the
    // leaderboard to flash/flicker on every toggle.
    if(!qs('.agent-v99-stats',host)){
      var rows=[
        ['IB','I. Baloch','1,413,000','+50%'],
        ['S','Simon B.','1,168,000','+20%'],
        ['J','Jsuniq','1,010,840','+10%'],
        ['L','Lola M.','698,600','+2%'],
        ['A','Ayesha K.','642,900','+2%']
      ];
      host.innerHTML=
        '<div class="agent-v99-stats">'+
          '<div class="agent-v99-stat"><strong data-rank-stat="joined"></strong><span data-rank-i18n="joined"></span></div>'+
          '<div class="agent-v99-stat"><strong data-rank-stat="earned"></strong><span data-rank-i18n="earned"></span></div>'+
        '</div>'+
        '<div class="agent-v99-overview" data-rank-i18n="overview"></div>'+
        '<div class="agent-v99-mascot" aria-hidden="true"></div>'+
        '<div class="agent-v99-leaders">'+
          '<div class="agent-v99-chip" data-rank-i18n="chip"></div>'+
          '<h2 class="agent-v99-section-title" data-rank-i18n="leaders"></h2>'+
          '<div class="agent-v99-leader-list">'+rows.map(function(row,idx){
            return '<div class="agent-v99-leader '+(idx<3?'top':'')+'"><div class="agent-v99-rank">'+row[0]+'</div><div class="agent-v99-leader-name">'+(idx+1)+'. '+row[1]+'</div><div class="agent-v99-leader-points"><span>'+row[2]+'</span><b class="agent-v99-bonus">'+row[3]+'</b></div></div>';
          }).join('')+'</div>'+
        '</div>';
    }
    // Update data-driven numbers in place.
    var sj=qs('[data-rank-stat="joined"]',host); if(sj) sj.textContent=fmt(t.joined);
    var se=qs('[data-rank-stat="earned"]',host); if(se) se.textContent=fmt(t.earned);
    // Update language-dependent labels in place (no DOM destruction).
    var lj=qs('[data-rank-i18n="joined"]',host);   if(lj) lj.textContent=pick('下级用户','Users joined','Users joined');
    var le=qs('[data-rank-i18n="earned"]',host);   if(le) le.textContent=pick('累计补贴','Total earned','Total earned');
    var ov=qs('[data-rank-i18n="overview"]',host); if(ov) ov.textContent=pick('概览','Overview','Overview');
    var ch=qs('[data-rank-i18n="chip"]',host);     if(ch) ch.textContent=pick('近30天','Last 30 days','Last 30 days');
    var ld=qs('[data-rank-i18n="leaders"]',host);  if(ld) ld.textContent=pick('代理排行榜','Affiliate Leaders','Affiliate Leaders');
  }
  function localize(){
    var shell=qs('#agentTabsV99');
    if(!shell) return;
    qsa('[data-agent-tab]',shell).forEach(function(btn){
      var key=btn.getAttribute('data-agent-tab');
      if(key==='affiliates') btn.textContent=pick('成为代理','Affiliates','Affiliates');
      if(key==='referrals') btn.textContent=pick('激活任务','Referrals','Referrals');
      if(key==='redeem') btn.textContent=pick('绑定下级','Redeem','Redeem');
    });
    txt('#agentPanel h3','成为代理，日赚PKR 5,000+','Become an Agent, Earn PKR 5,000+ / day','Become an Agent');
    txt('#agentPanel .agent-sub','通过你的邀请链接注册并绑定 WhatsApp 的用户，会自动进入你的代理团队。先使用计算器预估收益，再申请成为代理。','Users who register and bind WhatsApp through your invite link automatically join your agent team. Use the calculator first, then apply to become an agent.','Users who register through your invite link join your agent team.');
    html('#agentPanel .agent-trigger-box','<strong>代理触发条件：</strong>通过你的邀请链接注册 + 绑定 WhatsApp。<br><strong>三级分销：</strong>直属下级 +30% / 二级 +10% / 三级 +5%。佣金由平台额外补贴，不扣除下级积分。','<strong>Agent trigger:</strong> Register through your invite link + bind WhatsApp.<br><strong>3-level commission:</strong> Direct +30% / Level 2 +10% / Level 3 +5%. Commission is paid by the platform and never deducts user points.','<strong>Agent trigger:</strong> Register through your invite link + bind WhatsApp.<br><strong>3-level commission:</strong> Direct +30% / Level 2 +10% / Level 3 +5%.');
    var levels=[
      [pick('直属下级','Direct','Direct'),'30%'],
      [pick('第二级','Level 2','Level 2'),'10%'],
      [pick('第三级','Level 3','Level 3'),'5%']
    ];
    qsa('#agentPanel .agent-commission-grid div').forEach(function(el,i){if(levels[i]) el.innerHTML=levels[i][0]+'<strong>'+levels[i][1]+'</strong>'});
    var labels=qsa('#agentPanel .calc-grid label');
    if(labels[0]&&labels[0].childNodes[0]) labels[0].childNodes[0].nodeValue=pick('下级人数','Downline users','Downline users');
    if(labels[1]&&labels[1].childNodes[0]) labels[1].childNodes[0].nodeValue=pick('每人日均发送条数','Avg messages / user','Avg messages / user');
    ensureCalcVisual();
    var estimate=qs('#agentPanel .calc-result'), estimateText=qs('#agentEstimateText,[data-agent-estimate-text]');
    if(estimate){
      var estPrefix=pick('预计今日佣金：','Estimated commission today: ','Estimated commission today: ');
      var estStrong=qs('#agentEstimateText,[data-agent-estimate-text]',estimate);
      if(estStrong){
        // Keep the <strong> (and its running animation/value) intact; swap only the leading label text.
        if(estimate.firstChild && estimate.firstChild.nodeType===3){ estimate.firstChild.nodeValue=estPrefix; }
        else { estimate.insertBefore(document.createTextNode(estPrefix), estimate.firstChild); }
      } else {
        estimate.innerHTML=estPrefix+'<strong data-agent-estimate-text>'+(estimateText?estimateText.textContent:'PKR 4,500')+'</strong>';
      }
    }
    txt('#applyAgentBtn','申请成为代理','Apply to Become an Agent','Apply to Become an Agent');
    txt('#agentV99ActivationTitle','下级激活任务','Downline Activation Task','Downline Activation Task');
    txt('#agentV99ActivationSub','推动已注册用户绑定 WhatsApp，解锁代理补贴奖励。','Get registered users to bind WhatsApp and unlock agent subsidy rewards.','Get registered users to bind WhatsApp.');
    txt('#activationTitle','下级激活任务','Downline Activation Task','Downline Activation Task');
    txt('#activationSub','推动已注册用户绑定 WhatsApp，解锁代理补贴奖励。','Get registered users to bind WhatsApp and unlock agent subsidy rewards.','Get registered users to bind WhatsApp.');
    txt('#activationRegisteredLabel','已注册','Registered','Registered');
    txt('#activationBoundLabel','已绑定 WhatsApp','WhatsApp Bound','WhatsApp Bound');
    txt('#activationPendingLabel','待激活','Pending','Pending');
    txt('#activationProgressLabel','激活进度','Activation Progress','Activation Progress');
    txt('#activationRemindBtn','提醒下级绑定','Remind to Bind','Remind to Bind');
    txt('#activationViewBtn','查看待激活用户','View Pending Users','View Pending Users');
    qsa('#activationPendingList .activation-user-chip span').forEach(function(el){el.textContent=pick('待绑定','Need bind','Need bind')});
    txt('#agentV99BindTitle','绑定下级用户','Bind Downline User','Bind Downline User');
    txt('#agentV99BindSub','绑定直属下级并查看每日任务补贴明细。','Bind direct downline users and review daily task subsidy details.','Bind downline users and review subsidy details.');
    txt('#manualBindTitle','绑定下级用户','Bind Downline User','Bind Downline User');
    txt('#manualBindSub','输入用户ID，绑定为你的直属下级。系统会校验是否已被其他代理线占用。','Enter a user ID and bind it as your direct downline. The system checks whether it is already used by another agent line.','Enter a user ID and bind it as your direct downline.');
    txt('#manualBindLock','三级唯一代理线','Unique 3-level agent line','Unique 3-level agent line');
    ph('#manualUserIdInput','请输入用户ID / CT1024','Enter User ID / CT1024','Enter User ID / CT1024');
    txt('#manualBindBtn','绑定','Bind','Bind');
    txt('#manualBindNote','规则：一个用户只能存在于一条代理线；已绑定、已在其他代理团队、或你的上级/自己都不能重复绑定。','Rule: one user can only exist in one agent line. Already-bound users, users in another agent team, your upstream, or yourself cannot be bound again.','Rule: one user can only exist in one agent line.');
    txt('#manualTodayIncomeLabel','今日下级补贴','Today subsidy','Today subsidy');
    txt('#manualRecentIncomeLabel','近7日补贴','Last 7 days','Last 7 days');
    txt('#manualIncomeRule','补贴按下级每日任务积分计算：直属下级 30%，二级代理 10%，三级代理 5%；由平台额外补贴，不扣下级积分。','Subsidy is calculated from downline daily task points: direct 30%, level-2 10%, level-3 5%; paid by the platform, no deduction from users.','Subsidy is paid by the platform; user points are not deducted.');
    var l1=qs('#manualL1Label'), l2=qs('#manualL2Label'), l3=qs('#manualL3Label');
    if(l1&&l1.childNodes[0]) l1.childNodes[0].nodeValue=pick('一级下级','Level 1','Level 1');
    if(l2&&l2.childNodes[0]) l2.childNodes[0].nodeValue=pick('二级下级','Level 2','Level 2');
    if(l3&&l3.childNodes[0]) l3.childNodes[0].nodeValue=pick('三级下级','Level 3','Level 3');
    var list=qs('#manualDownlineList');
    if(list&&!qs('#agentV99IncomeTitle')){
      var title=document.createElement('div');
      title.id='agentV99IncomeTitle';
      title.className='agent-v99-title';
      title.style.cssText='font-size:20px!important;text-align:left!important;margin:14px 4px 10px!important;';
      list.parentNode.insertBefore(title,list);
    }
    txt('#agentV99IncomeTitle','下级补贴明细','Downline Subsidy Details','Downline Subsidy Details');
    var empty=qs('#manualDownlineList .manual-downline-empty');
    if(empty) empty.textContent=pick('暂无绑定下级。输入用户ID后，下级补贴明细会显示在这里。','No bound users yet. Enter a user ID to show subsidy details here.','No bound users yet.');
    renderRank();
  }
  function render(){
    var shell=ensureShell();
    if(!shell) return;
    mount('agentPanel','agentV99AgentMount');
    mount('downlineActivationCard','agentV99ActivationMount');
    mount('manualBindPanel','agentV99ManualMount');
    var saved='affiliates';
    try{saved=localStorage.getItem(TAB_KEY)||'affiliates'}catch(e){}
    setTab(saved);
    localize();
    var users=qs('#agentUsersInput');
    if(users){try{users.dispatchEvent(new Event('input',{bubbles:true}))}catch(e){}}
    updateCalcVisual();
  }
  document.addEventListener('click',function(e){
    var tab=e.target.closest&&e.target.closest('#agentTabsV99 [data-agent-tab]');
    if(tab){setTab(tab.getAttribute('data-agent-tab'));setTimeout(localize,40);}
    var calcBtn=e.target.closest&&e.target.closest('#agentTabsV99 .agent-calc-btn');
    if(calcBtn){
      var wrap=calcBtn.closest('.agent-calc-visual');
      var input=wrap&&qs('#'+wrap.getAttribute('data-calc-for'));
      if(input){
        var range=calcRange(input.id);
        var direction=Number(calcBtn.getAttribute('data-calc-step')||0);
        var next=Math.max(range.min,Math.min(range.max,Number(input.value||range.min)+direction*range.step));
        input.value=next;
        input.dispatchEvent(new Event('input',{bubbles:true}));
        updateCalcVisual();
      }
    }
  },true);
  document.addEventListener('input',function(e){
    if(e.target&&/agent(Users|Msgs)Input/.test(e.target.id||'')) updateCalcVisual();
  },true);
  var langBtn=qs('#langToggle');
  if(langBtn) langBtn.addEventListener('click',function(){
    // Single, non-destructive pass on language change. Previously this fired
    // render() then localize() ~300ms apart, rebuilding the team DOM twice and
    // causing a visible flicker. localize() now updates all text in place.
    setTimeout(function(){
      if(!qs('#agentTabsV99 .agent-v99-shell')){ render(); }
      else { localize(); updateCalcVisual(); }
    },120);
  });
  document.addEventListener('DOMContentLoaded',function(){setTimeout(render,180);setTimeout(render,700);});
  render();
  setInterval(function(){if(qs('#agentTabsV99')) localize();},1200000);
})();
</script>

<style id="v100-team-real-data-and-modal-fixes-style">
/* v100: team page uses real backend data only, matching dark team styling and no decorative animation. */
#team .agent-panel:before,
#team .downline-activation-card:before,
#team .manual-bind-panel:before,
#agentTabsV99 #agentPanel:before,
#agentTabsV99 #downlineActivationCard:before,
#agentTabsV99 #manualBindPanel:before,
#agentTabsV99 .agent-trigger-box:before,
#agentTabsV99 .agent-calculator:before{
  content:none!important;
  display:none!important;
  animation:none!important;
}
#team *,
#agentTabsV99 *{
  animation-name:none!important;
}
#agentTabsV99 .manual-level-card:after{
  color:#cfd8ff!important;
}
#agentTabsV99 .activation-milestone,
#agentTabsV99 .manual-income-rule,
#agentTabsV99 .downline-level-rule,
#agentTabsV99 .agent-income-rule-card{
  background:#303030!important;
  color:#f3f5ff!important;
  border:1px solid rgba(255,255,255,.14)!important;
}
#agentTabsV99 .activation-milestone b,
#agentTabsV99 .manual-income-rule b{
  color:#ffad2f!important;
}
#downlineLevelModal,
#agentIncomeModal{
  align-items:stretch!important;
  padding:14px!important;
  background:rgba(0,0,0,.72)!important;
}
#downlineLevelModal .downline-level-card,
#agentIncomeModal .agent-income-card{
  width:100%!important;
  max-width:430px!important;
  max-height:calc(100dvh - 28px)!important;
  margin:auto!important;
  overflow-y:auto!important;
  -webkit-overflow-scrolling:touch!important;
  background:#242424!important;
  color:#fff!important;
  border:1px solid rgba(255,255,255,.14)!important;
  border-radius:24px!important;
  box-shadow:0 26px 60px rgba(0,0,0,.38)!important;
}
#downlineLevelModal .downline-level-top h2,
#agentIncomeModal .agent-income-top h2{
  color:#fff!important;
}
#downlineLevelModal .downline-level-top p,
#agentIncomeModal .agent-income-top p{
  color:rgba(255,255,255,.72)!important;
}
#downlineLevelModal .downline-level-rate,
#agentIncomeModal .agent-income-badge{
  background:#1c5a41!important;
  color:#9ff0c3!important;
}
#downlineLevelModal .downline-level-summary div,
#agentIncomeModal .agent-income-stat,
#agentIncomeModal .agent-income-break div{
  background:#303030!important;
  border:1px solid rgba(255,255,255,.13)!important;
  color:#f3f5ff!important;
}
#downlineLevelModal .downline-level-summary span,
#agentIncomeModal .agent-income-stat span,
#agentIncomeModal .agent-income-row p,
#agentIncomeModal .agent-income-break div{
  color:rgba(255,255,255,.72)!important;
}
#downlineLevelModal .downline-level-summary strong,
#agentIncomeModal .agent-income-stat strong,
#agentIncomeModal .agent-income-row-head em{
  color:#29e69a!important;
}
#downlineLevelModal .downline-level-rule,
#agentIncomeModal .agent-income-rule-card{
  background:#303030!important;
  color:#f3f5ff!important;
  border:1px solid rgba(255,255,255,.14)!important;
}
#downlineLevelModal .downline-level-list,
#agentIncomeModal .agent-income-list{
  max-height:none!important;
  overflow:visible!important;
}
#downlineLevelModal .downline-user-row,
#agentIncomeModal .agent-income-row{
  background:#2b2b2b!important;
  border:1px solid rgba(255,255,255,.12)!important;
}
#downlineLevelModal .downline-user-main strong,
#agentIncomeModal .agent-income-row-head strong{
  color:#fff!important;
}
#downlineLevelModal .downline-user-main span,
#downlineLevelModal .downline-empty{
  color:rgba(255,255,255,.72)!important;
}
#downlineLevelModal .downline-empty,
#agentIncomeModal .agent-income-empty{
  background:#2b2b2b!important;
  border:1px dashed rgba(255,255,255,.18)!important;
  color:rgba(255,255,255,.72)!important;
}
body.team-v101-fullscreen .topbar{
  display:none!important;
}
body.team-v101-fullscreen main{
  padding-top:0!important;
  margin-top:0!important;
}
body.team-v101-fullscreen #team{
  min-height:100dvh!important;
  padding-top:0!important;
}
body.team-v101-fullscreen #agentTabsV99{
  min-height:100dvh!important;
}
body.team-v101-fullscreen #agentTabsV99 .agent-v99-shell{
  min-height:100dvh!important;
  padding-top:10px!important;
  border-radius:0!important;
}
body.team-v101-fullscreen #agentTabsV99 .agent-v99-tabs{
  position:sticky!important;
  top:0!important;
  z-index:20!important;
  margin:0 0 24px!important;
  box-shadow:0 10px 22px rgba(0,0,0,.18)!important;
}
#agentTabsV99 .manual-income-rule,
#agentTabsV99 .activation-milestone,
#agentTabsV99 .manual-bind-note{
  background:#2f2f2f!important;
  color:#f7f8ff!important;
  border:1px solid rgba(255,255,255,.16)!important;
}
#agentTabsV99 .manual-income-rule *,
#agentTabsV99 .activation-milestone *,
#agentTabsV99 .manual-bind-note *{
  color:inherit!important;
}
#agentTabsV99 .manual-level-card,
#agentTabsV99 .activation-stats div{
  background:#303030!important;
  color:#fff!important;
}
#agentTabsV99 .manual-level-card:after{
  color:#f7f8ff!important;
}
#agentTabsV99 #manualIncomeRule,
#agentTabsV99 .manual-income-rule{
  background:#fff1c2!important;
  color:#3b2a05!important;
  border:1px solid rgba(255,190,55,.42)!important;
  text-shadow:none!important;
}
#agentTabsV99 #manualIncomeRule *,
#agentTabsV99 .manual-income-rule *{
  color:#3b2a05!important;
  text-shadow:none!important;
}
#agentTabsV99 #manualDownlineList .manual-downline-empty{
  color:#7a4a12!important;
}
#agentIncomeModal #agentIncomeRuleText,
#agentIncomeModal .agent-income-rule-card{
  background:#fff1c2!important;
  color:#3b2a05!important;
  border:1px solid rgba(255,190,55,.42)!important;
  text-shadow:none!important;
}
#agentIncomeModal #agentIncomeRuleText *,
#agentIncomeModal .agent-income-rule-card *{
  color:#3b2a05!important;
  text-shadow:none!important;
}
</style>

<script id="v100-team-real-data-and-modal-fixes-script">
(function(){
  var KEY='cashtask_state_v10';
  function qs(sel,root){return (root||document).querySelector(sel)}
  function qsa(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel))}
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return {}}}
  function write(s){try{localStorage.setItem(KEY,JSON.stringify(s||{}))}catch(e){}}
  function lang(){var s=read();return s.lang||((document.documentElement.lang||'').indexOf('zh')===0?'zh':'en')}
  function pick(zh,en,ur){var l=lang();return l==='zh'?zh:(l==='ur'?(ur||en):en)}
  function fmt(n){return Math.round(Number(n)||0).toLocaleString()+' pts'}
  function normalizeId(raw){return String(raw||'').trim().toUpperCase().replace(/[^A-Z0-9_-]/g,'')}
  function apiConfig(){
    var backend=window.CashTaskBackendConfig||window.CASHTASK_API_CONFIG||{};
    var api=window.CASHTASK_API||{};
    return {
      enabled:!!backend.useBackend,
      baseUrl:backend.baseUrl||'',
      checkUser:(api.agent&&api.agent.checkUser)||'/api/agent/check-user',
      bindDownline:(api.agent&&api.agent.bindDownline)||'/api/agent/bind-downline',
      tree:(api.agent&&api.agent.tree)||'/api/agent/tree'
    };
  }
  function apiUserId(){
    var s=read();
    return s.userId||s.user_id||s.profile?.userId||s.profile?.id||s.inviteCode||'LOCAL_USER';
  }
  function toast(msg){
    var t=qs('#toast');
    if(t){t.textContent=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},1800);return;}
    alert(msg);
  }
  function openInfoSafe(title,msg){
    try{ if(typeof openInfo==='function') return openInfo(title,msg); }catch(e){}
    toast(title+'：'+msg);
  }
  async function postJSON(endpoint,payload){
    var cfg=apiConfig();
    if(!cfg.enabled) throw new Error('backend-disabled');
    var res=await fetch((cfg.baseUrl||'')+endpoint,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload||{})
    });
    var data={};
    try{data=await res.json()}catch(e){}
    if(!res.ok || data.ok===false) throw new Error(data.message||data.error||('HTTP '+res.status));
    return data;
  }
  function normalizeBackendNode(raw,level){
    raw=raw||{};
    var id=normalizeId(raw.id||raw.user_id||raw.userId||raw.code||raw.invite_code);
    if(!id) return null;
    var children=Array.isArray(raw.children)?raw.children:(Array.isArray(raw.downlines)?raw.downlines:[]);
    return {
      id:id,
      backendVerified:true,
      source:'backend',
      level:Number(raw.level||level||1),
      time:raw.bound_at||raw.created_at||raw.time||new Date().toLocaleDateString(),
      whatsappBound:raw.whatsapp_bound!==false && raw.whatsappBound!==false,
      dailyTaskPoints:Number(raw.daily_task_points||raw.dailyTaskPoints||raw.today_task_points||raw.todayTaskPoints||0),
      todaySubsidy:Number(raw.today_subsidy||raw.todaySubsidy||raw.subsidy_today||0),
      weekSubsidy:Number(raw.week_subsidy||raw.weekSubsidy||raw.subsidy_7d||0),
      subsidyHistory:Array.isArray(raw.subsidy_history)?raw.subsidy_history:(Array.isArray(raw.subsidyHistory)?raw.subsidyHistory:[]),
      children:children.map(function(c){return normalizeBackendNode(c,Number(raw.level||level||1)+1)}).filter(Boolean)
    };
  }
  function sanitizeTree(){
    var s=read();
    var list=Array.isArray(s.manualDownlines)?s.manualDownlines:[];
    var clean=list.map(function(item){return normalizeBackendNode(item,1)}).filter(function(item){
      return item && (item.backendVerified || item.source==='backend');
    });
    if(JSON.stringify(clean)!==JSON.stringify(list)){
      s.manualDownlines=clean;
      s.downlineCount=clean.length;
      write(s);
    }
    return clean;
  }
  function flatten(list,level){
    var rows=[];
    list=list||sanitizeTree();
    if(level===1) return list;
    list.forEach(function(a){
      (a.children||[]).forEach(function(b){
        if(level===2) rows.push(Object.assign({parentId:a.id},b));
        (b.children||[]).forEach(function(c){
          if(level===3) rows.push(Object.assign({parentId:b.id,rootId:a.id},c));
        });
      });
    });
    return rows;
  }
  function rateFor(level){return level===1?0.30:(level===2?0.10:0.05)}
  function subsidyOf(row,level){
    if(Number(row.todaySubsidy)>0) return Number(row.todaySubsidy);
    return Math.floor(Number(row.dailyTaskPoints||0)*rateFor(level));
  }
  function findNode(id){
    id=normalizeId(id);
    var all=flatten(sanitizeTree(),1).concat(flatten(sanitizeTree(),2),flatten(sanitizeTree(),3));
    return all.find(function(x){return normalizeId(x.id)===id});
  }
  function renderRealManual(){
    var list=sanitizeTree();
    var box=qs('#manualDownlineList');
    var c1=qs('#manualL1Count'), c2=qs('#manualL2Count'), c3=qs('#manualL3Count');
    if(c1) c1.textContent=flatten(list,1).length;
    if(c2) c2.textContent=flatten(list,2).length;
    if(c3) c3.textContent=flatten(list,3).length;
    var today=flatten(list,1).reduce(function(s,x){return s+subsidyOf(x,1)},0);
    var week=flatten(list,1).reduce(function(s,x){return s+Number(x.weekSubsidy||subsidyOf(x,1))},0);
    if(qs('#manualTodayIncome')) qs('#manualTodayIncome').textContent=fmt(today);
    if(qs('#manualRecentIncome')) qs('#manualRecentIncome').textContent=fmt(week);
    if(!box) return;
    if(!list.length){
      box.innerHTML='<div class="manual-downline-empty">'+pick('暂无真实绑定下级。请接入后台后，通过用户ID查询并绑定真实用户。','No real bound downlines yet. Connect the backend, then bind a real user by user ID.','No real bound downlines yet.')+'</div>';
      return;
    }
    box.innerHTML=list.map(function(item){
      var l2=(item.children||[]).length;
      var l3=(item.children||[]).reduce(function(sum,c){return sum+(c.children||[]).length},0);
      return '<button class="manual-downline-item" data-real-agent-income-id="'+item.id+'"><div class="manual-downline-avatar">'+item.id.slice(0,2)+'</div><div><strong>'+item.id+'</strong><span>'+pick('直属下级 · 后台已验证','Direct downline · backend verified','Backend verified')+(item.time?' · '+item.time:'')+'</span><span class="manual-income-mini">'+pick('今日补贴','Today subsidy','Today subsidy')+' +'+fmt(subsidyOf(item,1))+' · L2 '+l2+' / L3 '+l3+'</span></div><div class="manual-downline-tag">L1<span class="detail-dot">'+pick('明细','Detail','Detail')+'</span></div></button>';
    }).join('');
  }
  function renderRealIncome(id){
    var item=findNode(id);
    if(!item) return toast(pick('未找到真实下级数据','Real downline data not found','Real downline data not found'));
    var rows=Array.isArray(item.subsidyHistory)?item.subsidyHistory:[];
    var today=Number(item.todaySubsidy||subsidyOf(item,item.level||1));
    var week=Number(item.weekSubsidy||rows.reduce(function(s,r){return s+Number(r.total||r.subsidy||0)},0)||today);
    if(qs('#agentIncomeTitle')) qs('#agentIncomeTitle').textContent=item.id+' '+pick('补贴奖励明细','subsidy details','subsidy details');
    if(qs('#agentIncomeSub')) qs('#agentIncomeSub').textContent=pick('以下数据来自后台数据库，不再使用随机明细。','The records below come from the backend database. No generated details are used.','Backend records only.');
    if(qs('#agentIncomeBadge')) qs('#agentIncomeBadge').textContent=pick('平台额外补贴','Platform subsidy','Platform subsidy');
    if(qs('#incomeTodayValue')) qs('#incomeTodayValue').textContent=fmt(today);
    if(qs('#incomeWeekValue')) qs('#incomeWeekValue').textContent=fmt(week);
    if(qs('#incomeRateValue')) qs('#incomeRateValue').textContent='30% / 10% / 5%';
    if(qs('#agentIncomeRuleText')) qs('#agentIncomeRuleText').innerHTML=pick('补贴按后台记录的下级每日任务积分计算：直属下级 30%，二级代理 10%，三级代理 5%；不扣下级积分。','Subsidy is calculated from backend task records: direct 30%, level-2 10%, level-3 5%; no downline points are deducted.','Backend records only.');
    var list=qs('#agentIncomeList');
    if(list){
      if(!rows.length){
        list.innerHTML='<div class="agent-income-empty" style="padding:18px 14px;border-radius:16px;text-align:center;font-size:13px;line-height:1.45;">'+pick('后台暂无该用户的补贴明细记录。','No backend subsidy records for this user yet.','No backend records yet.')+'</div>';
      }else{
        list.innerHTML=rows.map(function(r){
          var total=Number(r.total||r.subsidy||r.amount||0);
          return '<div class="agent-income-row"><div class="agent-income-row-head"><strong>'+(r.date||r.created_at||'')+'</strong><em>+'+fmt(total)+'</em></div><p>'+pick('后台任务补贴记录。','Backend task subsidy record.','Backend record.')+'</p></div>';
        }).join('');
      }
    }
    var modal=qs('#agentIncomeModal');
    if(modal){modal.classList.add('show');document.body.classList.add('modal-lock');}
  }
  function renderRealLevel(level){
    var rows=flatten(sanitizeTree(),level);
    var rate=rateFor(level), totalTask=rows.reduce(function(s,r){return s+Number(r.dailyTaskPoints||0)},0), totalIncome=rows.reduce(function(s,r){return s+subsidyOf(r,level)},0);
    var titles={
      1:[pick('我的一级下级','My Level 1 Downlines','My Level 1 Downlines'),pick('直属用户 · 平台补贴 30%','Direct users · platform subsidy 30%','Direct users')],
      2:[pick('我的二级下级','My Level 2 Downlines','My Level 2 Downlines'),pick('团队扩展 · 平台补贴 10%','Team expansion · platform subsidy 10%','Team expansion')],
      3:[pick('我的三级下级','My Level 3 Downlines','My Level 3 Downlines'),pick('深层团队 · 平台补贴 5%','Deep team · platform subsidy 5%','Deep team')]
    };
    if(qs('#downlineLevelTitle')) qs('#downlineLevelTitle').textContent=titles[level][0];
    if(qs('#downlineLevelSub')) qs('#downlineLevelSub').textContent=titles[level][1];
    if(qs('#downlineLevelRate')) qs('#downlineLevelRate').textContent=Math.round(rate*100)+'%';
    if(qs('#downlineLevelCount')) qs('#downlineLevelCount').textContent=rows.length;
    if(qs('#downlineLevelTaskPts')) qs('#downlineLevelTaskPts').textContent=fmt(totalTask);
    if(qs('#downlineLevelIncome')) qs('#downlineLevelIncome').textContent=fmt(totalIncome);
    if(qs('#downlineLevelRule')) qs('#downlineLevelRule').textContent=pick('补贴数据来自后台数据库，不再生成随机下级或随机补贴。','Data comes from the backend database. No generated downlines or subsidy records are used.','Backend records only.');
    var list=qs('#downlineLevelList');
    if(list){
      if(!rows.length){
        list.innerHTML='<div class="downline-empty">'+pick('暂无真实下级用户。用户通过后台验证并绑定 WhatsApp 后才会显示。','No real downline users yet. Users appear only after backend verification and WhatsApp binding.','No real users yet.')+'</div>';
      }else{
        list.innerHTML=rows.map(function(r){
          return '<button class="downline-user-row" data-real-agent-income-id="'+r.id+'"><div class="downline-user-avatar">'+r.id.slice(0,2)+'</div><div class="downline-user-main"><strong>'+r.id+'</strong><span>'+pick('今日任务','Today task','Today task')+' '+fmt(r.dailyTaskPoints||0)+(r.parentId?' · '+pick('上级','Parent','Parent')+': '+r.parentId:'')+'</span><em class="downline-status '+(r.whatsappBound?'':'pending')+'">'+(r.whatsappBound?pick('已激活','Active','Active'):pick('待绑定 WhatsApp','Waiting WhatsApp','Waiting WhatsApp'))+'</em></div><div class="downline-user-income"><b>+'+fmt(subsidyOf(r,level))+'</b><small>'+pick('我的补贴','My subsidy','My subsidy')+'</small></div></button>';
        }).join('');
      }
    }
    var modal=qs('#downlineLevelModal');
    if(modal){modal.classList.add('show');document.body.classList.add('modal-lock');}
  }
  async function refreshBackendTree(){
    var cfg=apiConfig();
    if(!cfg.enabled){renderRealManual();return;}
    try{
      var data=await postJSON(cfg.tree,{user_id:apiUserId()});
      var tree=Array.isArray(data.tree)?data.tree:(Array.isArray(data.downlines)?data.downlines:[]);
      var s=read();
      s.manualDownlines=tree.map(function(x){return normalizeBackendNode(x,1)}).filter(Boolean);
      s.downlineCount=s.manualDownlines.length;
      write(s);
    }catch(e){}
    renderRealManual();
  }
  async function bindRealDownline(){
    var input=qs('#manualUserIdInput');
    var id=normalizeId(input&&input.value);
    if(!id || id.length<4) return toast(pick('请输入有效用户ID','Enter a valid user ID','Enter a valid user ID'));
    var cfg=apiConfig();
    if(!cfg.enabled){
      return openInfoSafe(pick('需要接入后台数据库','Backend database required','Backend required'),pick('当前是本地 HTML 预览，不能索引真实用户。请开启 useBackend 并接入 /api/agent/check-user 与 /api/agent/bind-downline 后再绑定。','This local HTML preview cannot index real users. Enable useBackend and connect /api/agent/check-user plus /api/agent/bind-downline before binding.','Backend required.'));
    }
    try{
      var checked=await postJSON(cfg.checkUser,{user_id:id,agent_id:apiUserId()});
      var user=checked.user||checked.downline||checked;
      if(!user || checked.exists===false || checked.found===false){
        return openInfoSafe(pick('未找到用户','User not found','User not found'),pick('后台数据库没有索引到该用户ID，不能绑定。','The backend database did not find this user ID, so it cannot be bound.','User not found.'));
      }
      var bound=await postJSON(cfg.bindDownline,{agent_id:apiUserId(),downline_user_id:id});
      var node=normalizeBackendNode(bound.downline||bound.user||user,1);
      if(!node) return openInfoSafe(pick('绑定失败','Binding failed','Binding failed'),pick('后台返回的数据缺少用户ID。','The backend response did not include a user ID.','Missing user ID.'));
      var s=read();
      var list=s.manualDownlines=Array.isArray(s.manualDownlines)?s.manualDownlines:[];
      list=list.filter(function(x){return normalizeId(x.id)!==node.id});
      list.unshift(node);
      s.manualDownlines=list;
      s.downlineCount=list.length;
      write(s);
      if(input) input.value='';
      renderRealManual();
      openInfoSafe(pick('绑定成功','Bound successfully','Bound successfully'),node.id+' '+pick('已通过后台验证并绑定为你的直属下级。','has been verified by the backend and bound as your direct downline.','backend verified.'));
      refreshBackendTree();
    }catch(e){
      openInfoSafe(pick('绑定失败','Binding failed','Binding failed'),String(e.message||e));
    }
  }
  document.addEventListener('click',function(e){
    if(e.target.closest&&e.target.closest('#manualBindBtn')){
      e.preventDefault();e.stopImmediatePropagation();
      bindRealDownline();
      return;
    }
    var income=e.target.closest&&e.target.closest('[data-real-agent-income-id],#manualDownlineList [data-agent-income-id]');
    if(income){
      e.preventDefault();e.stopImmediatePropagation();
      renderRealIncome(income.getAttribute('data-real-agent-income-id')||income.getAttribute('data-agent-income-id'));
      return;
    }
    var levelCard=e.target.closest&&e.target.closest('.manual-level-card');
    if(levelCard){
      var id=levelCard.id||'';
      var level=id.indexOf('L2')>-1?2:(id.indexOf('L3')>-1?3:1);
      setTimeout(function(){renderRealLevel(level)},30);
    }
  },true);
  document.addEventListener('keydown',function(e){
    if(e.key==='Enter' && e.target && e.target.id==='manualUserIdInput'){
      e.preventDefault();e.stopImmediatePropagation();bindRealDownline();
    }
  },true);
  document.addEventListener('DOMContentLoaded',function(){setTimeout(refreshBackendTree,400);setTimeout(renderRealManual,900);});
  setTimeout(refreshBackendTree,600);
  setInterval(renderRealManual,1200000);
})();
</script>

<script id="v101-team-fullscreen-top-script">
(function(){
  function qs(sel){return document.querySelector(sel)}
  function sync(){
    var team=qs('#team');
    var active=!!(team&&team.classList.contains('active'));
    document.body.classList.toggle('team-v101-fullscreen',active);
  }
  document.addEventListener('click',function(){setTimeout(sync,30);setTimeout(sync,180);},true);
  window.addEventListener('hashchange',sync);
  document.addEventListener('DOMContentLoaded',function(){sync();setTimeout(sync,300);});
  sync();
  setInterval(sync,1200000);
})();
</script>

<script id="v102-team-language-sync-script">
(function(){
  var KEY='cashtask_state_v10';
  function qs(sel,root){return (root||document).querySelector(sel)}
  function qsa(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel))}
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return {}}}
  function lang(){
    var s=read();
    if(s.lang) return s.lang;
    var h=(document.documentElement.lang||'').toLowerCase();
    if(h.indexOf('zh')===0) return 'zh';
    if(h.indexOf('ur')===0) return 'ur';
    return 'en';
  }
  function pick(zh,en,ur){var l=lang();return l==='zh'?zh:(l==='ur'?(ur||en):en)}
  function text(sel,zh,en,ur){var el=qs(sel);if(el) el.textContent=pick(zh,en,ur)}
  function html(sel,zh,en,ur){var el=qs(sel);if(el) el.innerHTML=pick(zh,en,ur)}
  function ph(sel,zh,en,ur){var el=qs(sel);if(el) el.placeholder=pick(zh,en,ur)}
  function apply(){
    var shell=qs('#agentTabsV99');
    if(!shell) return;
    qsa('[data-agent-tab]',shell).forEach(function(btn){
      var key=btn.getAttribute('data-agent-tab');
      if(key==='affiliates') btn.textContent=pick('\u6210\u4e3a\u4ee3\u7406','Affiliates','Affiliates');
      if(key==='referrals') btn.textContent=pick('\u6fc0\u6d3b\u4efb\u52a1','Referrals','Referrals');
      if(key==='redeem') btn.textContent=pick('\u7ed1\u5b9a\u4e0b\u7ea7','Redeem','Redeem');
    });
    text('#agentPanel h3','\u6210\u4e3a\u4ee3\u7406\uff0c\u65e5\u8d5aPKR 5,000+','Become an Agent, Earn PKR 5,000+ / day','Become an Agent');
    text('#agentPanel .agent-sub','\u901a\u8fc7\u4f60\u7684\u9080\u8bf7\u94fe\u63a5\u6ce8\u518c\u5e76\u7ed1\u5b9a WhatsApp \u7684\u7528\u6237\uff0c\u4f1a\u81ea\u52a8\u8fdb\u5165\u4f60\u7684\u4ee3\u7406\u56e2\u961f\u3002\u5148\u4f7f\u7528\u8ba1\u7b97\u5668\u9884\u4f30\u6536\u76ca\uff0c\u518d\u7533\u8bf7\u6210\u4e3a\u4ee3\u7406\u3002','Users who register and bind WhatsApp through your invite link automatically join your agent team. Use the calculator first, then apply to become an agent.','Users who register through your invite link join your agent team.');
    html('#agentPanel .agent-trigger-box','<strong>\u4ee3\u7406\u89e6\u53d1\u6761\u4ef6\uff1a</strong>\u901a\u8fc7\u4f60\u7684\u9080\u8bf7\u94fe\u63a5\u6ce8\u518c + \u7ed1\u5b9a WhatsApp\u3002<br><strong>\u4e09\u7ea7\u5206\u9500\uff1a</strong>\u76f4\u5c5e\u4e0b\u7ea7 +30% / \u4e8c\u7ea7 +10% / \u4e09\u7ea7 +5%\u3002\u4f63\u91d1\u7531\u5e73\u53f0\u989d\u5916\u8865\u8d34\uff0c\u4e0d\u6263\u9664\u4e0b\u7ea7\u79ef\u5206\u3002','<strong>Agent trigger:</strong> Register through your invite link + bind WhatsApp.<br><strong>3-level commission:</strong> Direct +30% / Level 2 +10% / Level 3 +5%. Commission is paid by the platform and never deducts user points.','<strong>Agent trigger:</strong> Register through your invite link + bind WhatsApp.<br><strong>3-level commission:</strong> Direct +30% / Level 2 +10% / Level 3 +5%.');
    var levelText=[
      [pick('\u76f4\u5c5e\u4e0b\u7ea7','Direct','Direct'),'30%'],
      [pick('\u7b2c\u4e8c\u7ea7','Level 2','Level 2'),'10%'],
      [pick('\u7b2c\u4e09\u7ea7','Level 3','Level 3'),'5%']
    ];
    qsa('#agentPanel .agent-commission-grid div').forEach(function(el,i){if(levelText[i]) el.innerHTML=levelText[i][0]+'<strong>'+levelText[i][1]+'</strong>'});
    var labels=qsa('#agentPanel .calc-grid label');
    if(labels[0]&&labels[0].childNodes[0]) labels[0].childNodes[0].nodeValue=pick('\u4e0b\u7ea7\u4eba\u6570','Downline users','Downline users');
    if(labels[1]&&labels[1].childNodes[0]) labels[1].childNodes[0].nodeValue=pick('\u6bcf\u4eba\u65e5\u5747\u53d1\u9001\u6761\u6570','Avg messages / user','Avg messages / user');
    text('#applyAgentBtn','\u7533\u8bf7\u6210\u4e3a\u4ee3\u7406','Apply to Become an Agent','Apply to Become an Agent');
    qsa('#agentPanel .agent-calc-hint').forEach(function(el,i){el.textContent=i===0?pick('\u6a21\u62df\u4e0b\u7ea7\u89c4\u6a21','Simulated team size','Simulated team size'):pick('\u6a21\u62df\u6bcf\u65e5\u4efb\u52a1\u6d3b\u8dc3\u5ea6','Simulated daily activity','Simulated daily activity')});
    var statLabels=qsa('#agentV99RankWrap .agent-v99-stat span');
    if(statLabels[0]) statLabels[0].textContent=pick('\u4e0b\u7ea7\u7528\u6237','Users joined','Users joined');
    if(statLabels[1]) statLabels[1].textContent=pick('\u7d2f\u8ba1\u8865\u8d34','Total earned','Total earned');
    text('#agentV99RankWrap .agent-v99-overview','\u6982\u89c8','Overview','Overview');
    text('#agentV99RankWrap .agent-v99-chip','\u8fd130\u5929','Last 30 days','Last 30 days');
    text('#agentV99RankWrap .agent-v99-section-title','\u4ee3\u7406\u6392\u884c\u699c','Affiliate Leaders','Affiliate Leaders');
    text('#agentV99ActivationTitle','\u4e0b\u7ea7\u6fc0\u6d3b\u4efb\u52a1','Downline Activation Task','Downline Activation Task');
    text('#agentV99ActivationSub','\u63a8\u52a8\u5df2\u6ce8\u518c\u7528\u6237\u7ed1\u5b9a WhatsApp\uff0c\u89e3\u9501\u4ee3\u7406\u8865\u8d34\u5956\u52b1\u3002','Get registered users to bind WhatsApp and unlock agent subsidy rewards.','Get registered users to bind WhatsApp.');
    text('#activationTitle','\u4e0b\u7ea7\u6fc0\u6d3b\u4efb\u52a1','Downline Activation Task','Downline Activation Task');
    text('#activationSub','\u63a8\u52a8\u5df2\u6ce8\u518c\u7528\u6237\u7ed1\u5b9a WhatsApp\uff0c\u89e3\u9501\u4ee3\u7406\u8865\u8d34\u5956\u52b1\u3002','Get registered users to bind WhatsApp and unlock agent subsidy rewards.','Get registered users to bind WhatsApp.');
    text('#activationRegisteredLabel','\u5df2\u6ce8\u518c','Registered','Registered');
    text('#activationBoundLabel','\u5df2\u7ed1\u5b9a WhatsApp','WhatsApp Bound','WhatsApp Bound');
    text('#activationPendingLabel','\u5f85\u6fc0\u6d3b','Pending','Pending');
    text('#activationProgressLabel','\u6fc0\u6d3b\u8fdb\u5ea6','Activation Progress','Activation Progress');
    text('#activationRemindBtn','\u63d0\u9192\u4e0b\u7ea7\u7ed1\u5b9a','Remind to Bind','Remind to Bind');
    text('#activationViewBtn','\u67e5\u770b\u5f85\u6fc0\u6d3b\u7528\u6237','View Pending Users','View Pending Users');
    qsa('#activationPendingList .activation-user-chip span').forEach(function(el){el.textContent=pick('\u5f85\u7ed1\u5b9a','Need bind','Need bind')});
    text('#agentV99BindTitle','\u7ed1\u5b9a\u4e0b\u7ea7\u7528\u6237','Bind Downline User','Bind Downline User');
    text('#agentV99BindSub','\u7ed1\u5b9a\u76f4\u5c5e\u4e0b\u7ea7\u5e76\u67e5\u770b\u6bcf\u65e5\u4efb\u52a1\u8865\u8d34\u660e\u7ec6\u3002','Bind direct downline users and review daily task subsidy details.','Bind downline users and review subsidy details.');
    text('#manualBindTitle','\u7ed1\u5b9a\u4e0b\u7ea7\u7528\u6237','Bind Downline User','Bind Downline User');
    text('#manualBindSub','\u8f93\u5165\u7528\u6237ID\uff0c\u7ed1\u5b9a\u4e3a\u4f60\u7684\u76f4\u5c5e\u4e0b\u7ea7\u3002\u7cfb\u7edf\u4f1a\u6821\u9a8c\u662f\u5426\u5df2\u88ab\u5176\u4ed6\u4ee3\u7406\u7ebf\u5360\u7528\u3002','Enter a user ID and bind it as your direct downline. The system checks whether it is already used by another agent line.','Enter a user ID and bind it as your direct downline.');
    text('#manualBindLock','\u4e09\u7ea7\u552f\u4e00\u4ee3\u7406\u7ebf','Unique 3-level agent line','Unique 3-level agent line');
    ph('#manualUserIdInput','\u8bf7\u8f93\u5165\u7528\u6237ID / CT1024','Enter User ID / CT1024','Enter User ID / CT1024');
    text('#manualBindBtn','\u7ed1\u5b9a','Bind','Bind');
    text('#manualBindNote','\u89c4\u5219\uff1a\u4e00\u4e2a\u7528\u6237\u53ea\u80fd\u5b58\u5728\u4e8e\u4e00\u6761\u4ee3\u7406\u7ebf\uff1b\u5df2\u7ed1\u5b9a\u3001\u5df2\u5728\u5176\u4ed6\u4ee3\u7406\u56e2\u961f\u3001\u6216\u4f60\u7684\u4e0a\u7ea7/\u81ea\u5df1\u90fd\u4e0d\u80fd\u91cd\u590d\u7ed1\u5b9a\u3002','Rule: one user can only exist in one agent line. Already-bound users, users in another agent team, your upstream, or yourself cannot be bound again.','Rule: one user can only exist in one agent line.');
    text('#manualTodayIncomeLabel','\u4eca\u65e5\u4e0b\u7ea7\u8865\u8d34','Today subsidy','Today subsidy');
    text('#manualRecentIncomeLabel','\u8fd17\u65e5\u8865\u8d34','Last 7 days','Last 7 days');
    text('#manualIncomeRule','\u8865\u8d34\u6309\u4e0b\u7ea7\u6bcf\u65e5\u4efb\u52a1\u79ef\u5206\u8ba1\u7b97\uff1a\u76f4\u5c5e\u4e0b\u7ea7 30%\uff0c\u4e8c\u7ea7\u4ee3\u7406 10%\uff0c\u4e09\u7ea7\u4ee3\u7406 5%\uff1b\u7531\u5e73\u53f0\u989d\u5916\u8865\u8d34\uff0c\u4e0d\u6263\u4e0b\u7ea7\u79ef\u5206\u3002','Subsidy is calculated from downline daily task points: direct 30%, level-2 10%, level-3 5%; paid by the platform, no deduction from users.','Subsidy is paid by the platform; user points are not deducted.');
    var cards=[['#manualL1Label','\u4e00\u7ea7\u4e0b\u7ea7','Level 1'],['#manualL2Label','\u4e8c\u7ea7\u4e0b\u7ea7','Level 2'],['#manualL3Label','\u4e09\u7ea7\u4e0b\u7ea7','Level 3']];
    cards.forEach(function(c){var el=qs(c[0]);if(el&&el.childNodes[0]) el.childNodes[0].nodeValue=pick(c[1],c[2],c[2]);});
    text('#agentV99IncomeTitle','\u4e0b\u7ea7\u8865\u8d34\u660e\u7ec6','Downline Subsidy Details','Downline Subsidy Details');
    var empty=qs('#manualDownlineList .manual-downline-empty');
    if(empty) empty.textContent=pick('\u6682\u65e0\u7ed1\u5b9a\u4e0b\u7ea7\u3002\u8f93\u5165\u7528\u6237ID\u540e\uff0c\u4e0b\u7ea7\u8865\u8d34\u660e\u7ec6\u4f1a\u663e\u793a\u5728\u8fd9\u91cc\u3002','No bound users yet. Enter a user ID to show subsidy details here.','No bound users yet.');
  }
  document.addEventListener('click',function(e){
    if(e.target.closest&&e.target.closest('#langToggle,[data-go="team"],#agentTabsV99 [data-agent-tab]')){
      setTimeout(apply,120);
      setTimeout(apply,420);
      setTimeout(apply,900);
    }
  },true);
  document.addEventListener('DOMContentLoaded',function(){setTimeout(apply,500);setTimeout(apply,1200);});
  window.addEventListener('storage',function(e){if(e.key===KEY) setTimeout(apply,80);});
  setTimeout(apply,700);
  setInterval(apply,1200000);
})();
</script>
<style id="v101-mypage-onboarding-light-green-redesign">
/* v101: profile ("我的") first-withdraw onboarding panel recolor.
   - dark-blue panel -> white
   - progress bar -> green (#07e078, from reference image)
   - task cards -> softer, low-pressure borders on white
   - the three task "开始" buttons -> green (#07e078)
   Scoped entirely under #firstWithdrawPanel; loaded last so it wins over v95/v96. */

/* Panel: dark blue -> white */
#firstWithdrawPanel{
  background:#ffffff!important;
  color:#14233a!important;
  border:1px solid rgba(20,35,58,.08)!important;
  box-shadow:0 14px 34px rgba(20,35,58,.08)!important;
}
#firstWithdrawPanel:before{background:rgba(7,224,120,.05)!important;}

/* Header text readable on white */
#firstWithdrawPanel .first-withdraw-head h2{color:#14233a!important;}
#firstWithdrawPanel .first-withdraw-head p{color:#6b7b8c!important;}
#firstWithdrawPanel .first-withdraw-progress-meta{color:#6b7b8c!important;}
#firstWithdrawPanel .first-withdraw-progress-meta strong{color:#14233a!important;}

/* Progress bar: orange -> green */
#firstWithdrawPanel .first-withdraw-bar{background:rgba(7,224,120,.16)!important;}
#firstWithdrawPanel .first-withdraw-bar i{
  background:#07e078!important;
  box-shadow:0 2px 8px rgba(7,224,120,.35)!important;
}

/* Task cards: lower the border pressure on the white panel */
#firstWithdrawPanel .profile-onboarding-item-v96{
  background:#f6f8fb!important;
  border:1px solid rgba(20,35,58,.05)!important;
  box-shadow:0 1px 3px rgba(20,35,58,.05)!important;
}
#firstWithdrawPanel .profile-onboarding-copy-v96 strong{color:#14233a!important;}
#firstWithdrawPanel .profile-onboarding-copy-v96 p{color:#7a8aa0!important;}

/* Step dot: visible on white; completed -> green */
#firstWithdrawPanel .profile-onboarding-dot-v96{border-color:rgba(20,35,58,.22)!important;}
#firstWithdrawPanel .profile-onboarding-item-v96.done .profile-onboarding-dot-v96{
  background:#07e078!important;border-color:#07e078!important;
}

/* "+100 pts" reward pill -> soft green */
#firstWithdrawPanel .profile-onboarding-reward-v96{
  background:rgba(7,224,120,.12)!important;
  color:#0a8f4e!important;
}

/* The three task "开始" buttons -> green (image 2) */
#firstWithdrawPanel .profile-onboarding-start-v96{
  background:#07e078!important;
  color:#063d22!important;
  box-shadow:0 6px 16px rgba(7,224,120,.30)!important;
}

/* Done / empty states recolored so they stay readable on white */
#firstWithdrawPanel .profile-onboarding-done-v96{
  background:rgba(7,224,120,.14)!important;
  color:#0a8f4e!important;
}
#firstWithdrawPanel .profile-onboarding-empty-v96{
  background:rgba(7,224,120,.10)!important;
  color:#0a8f4e!important;
}
</style>

<style id="v102-community-chat-withdraw-gate-style">
/* v102: community chat is gated. Users without a single withdrawal over
   2,000 PKR see a grayed-out, locked input + send button. Tapping shows an
   animated, language-aware hint and shakes the bar. */
#communityChatModal .community-chat-input.chat-locked-v102 input{
  background:#2a2f50!important;
  color:#7e87b3!important;
  -webkit-text-fill-color:#7e87b3!important;
  border-color:rgba(255,255,255,.06)!important;
  box-shadow:none!important;
  cursor:not-allowed!important;
  animation:none!important;
}
#communityChatModal .community-chat-input.chat-locked-v102 input::placeholder{color:#6b73a0!important;}
#communityChatModal .community-chat-input.chat-locked-v102 button{
  background:#3a3f63!important;
  color:#8089b3!important;
  box-shadow:none!important;
  border-color:rgba(255,255,255,.08)!important;
  filter:grayscale(1) opacity(.9)!important;
  cursor:not-allowed!important;
}
.chat-lock-overlay-v102{
  position:absolute;inset:0;z-index:8;cursor:not-allowed;background:transparent;
  -webkit-tap-highlight-color:transparent;
}
.chat-lock-overlay-v102 .chat-lock-icon-v102{
  position:absolute;right:16px;top:50%;transform:translateY(-50%);
  font-size:15px;opacity:.72;pointer-events:none;
}
.chat-lock-hint-v102{
  position:absolute;left:8px;right:8px;bottom:calc(100% + 8px);z-index:40;
  background:#101a3f;color:#eef3ff;border:1px solid rgba(24,220,126,.40);
  border-radius:14px;padding:11px 13px;font-size:13px;line-height:1.45;font-weight:800;
  box-shadow:0 16px 34px rgba(0,0,0,.42);display:flex;gap:9px;align-items:flex-start;
  opacity:0;transform:translateY(8px) scale(.98);pointer-events:none;
}
.chat-lock-hint-v102 .ico{flex:0 0 auto;font-size:15px;line-height:1.4;}
.chat-lock-hint-v102.show{animation:chatLockHintV102 2.6s cubic-bezier(.2,.7,.2,1) forwards;}
@keyframes chatLockHintV102{
  0%{opacity:0;transform:translateY(10px) scale(.96);}
  9%{opacity:1;transform:translateY(0) scale(1);}
  84%{opacity:1;transform:translateY(0) scale(1);}
  100%{opacity:0;transform:translateY(6px) scale(.98);}
}
#communityChatModal .community-chat-input.chat-shake-v102{animation:chatLockShakeV102 .5s ease;}
@keyframes chatLockShakeV102{
  0%,100%{transform:translateX(0);}
  15%{transform:translateX(-6px);}
  30%{transform:translateX(6px);}
  45%{transform:translateX(-5px);}
  60%{transform:translateX(4px);}
  75%{transform:translateX(-3px);}
}
</style>
<script id="v102-community-chat-withdraw-gate">
(function(){
  var KEY='cashtask_state_v10';
  var CFG=(window.CASHTASK_CHAT_GATE=window.CASHTASK_CHAT_GATE||{});
  if(CFG.thresholdPKR==null) CFG.thresholdPKR=2000;   // must have a withdrawal strictly greater than this
  if(CFG.ptsPerPKR==null)   CFG.ptsPerPKR=20;          // 20 pts = 1 PKR (matches the rest of the app)
  var pollTimer=null;
  function qs(s,r){return (r||document).querySelector(s);}
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch(e){return {};}}
  function lang(){
    var s=read();var l=String(s.lang||document.documentElement.lang||'en').toLowerCase();
    return l.indexOf('zh')===0?'zh':(l.indexOf('ur')===0?'ur':'en');
  }
  // Largest single withdrawal, expressed in PKR. Records store amounts in points.
  function maxWithdrawPKR(){
    var s=read();
    var recs=Array.isArray(s.withdrawalRecords)?s.withdrawalRecords:[];
    var best=0;
    for(var i=0;i<recs.length;i++){
      var r=recs[i]||{};
      var pkr=(r.amountPKR!=null)?Number(r.amountPKR):(Number(r.amount||0)/CFG.ptsPerPKR);
      if(isFinite(pkr)&&pkr>best) best=pkr;
    }
    return best;
  }
  function isUnlocked(){
    if(window.__chatGateForceUnlock===true) return true;   // QA override
    if(window.__chatGateForceLock===true) return false;     // QA override
    return maxWithdrawPKR()>Number(CFG.thresholdPKR);
  }
  function lockPlaceholder(){
    var l=lang();
    if(l==='zh') return '提现满 2000 PKR 后可发言';
    if(l==='ur') return '2000 PKR withdrawal کے بعد پیغام بھیجیں';
    return 'Unlocks after a withdrawal over 2,000 PKR';
  }
  function lockMessage(){
    var l=lang();
    if(l==='zh') return '需要完成一笔超过 2000 PKR 的提现后才能在群里发言。';
    if(l==='ur') return 'گروپ میں بات کرنے کے لیے 2000 PKR سے زیادہ کی ایک withdrawal مکمل کریں۔';
    return 'Complete a single withdrawal over 2,000 PKR to chat in this room.';
  }
  function inputEl(){return qs('#communityChatInputV93')||qs('#communityChatInput');}
  function barEl(){return qs('#communityChatModal .community-chat-input');}
  function showHint(){
    var nowT=Date.now();
    if(showHint._last && (nowT-showHint._last)<350) return; // de-dupe pointerdown+click on one tap
    showHint._last=nowT;
    var bar=barEl(); if(!bar) return;
    var hint=qs('.chat-lock-hint-v102',bar);
    if(!hint){
      hint=document.createElement('div');
      hint.className='chat-lock-hint-v102';
      hint.innerHTML='<span class="ico">🔒</span><span class="msg"></span>';
      bar.appendChild(hint);
    }
    var msg=qs('.msg',hint); if(msg) msg.textContent=lockMessage();
    hint.dir=(lang()==='ur')?'rtl':'ltr';
    // restart the animation each tap
    hint.classList.remove('show'); void hint.offsetWidth; hint.classList.add('show');
    bar.classList.remove('chat-shake-v102'); void bar.offsetWidth; bar.classList.add('chat-shake-v102');
  }
  function onLockTap(e){
    e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    showHint();
    return false;
  }
  function ensureOverlay(bar){
    var ov=qs('.chat-lock-overlay-v102',bar);
    if(!ov){
      ov=document.createElement('div');
      ov.className='chat-lock-overlay-v102';
      ov.innerHTML='<span class="chat-lock-icon-v102">🔒</span>';
      ov.addEventListener('click',onLockTap,true);
      ov.addEventListener('pointerdown',function(e){e.preventDefault();onLockTap(e);},true);
      bar.appendChild(ov);
    }
    return ov;
  }
  function removeOverlay(bar){
    var ov=qs('.chat-lock-overlay-v102',bar); if(ov&&ov.parentNode) ov.parentNode.removeChild(ov);
    var hint=qs('.chat-lock-hint-v102',bar); if(hint&&hint.parentNode) hint.parentNode.removeChild(hint);
  }
  function apply(){
    var bar=barEl(); if(!bar) return;
    var input=inputEl();
    if(isUnlocked()){
      bar.classList.remove('chat-locked-v102');
      removeOverlay(bar);
      if(input){
        input.readOnly=false;
        if(input.getAttribute('data-locked-v102')==='1'){
          input.removeAttribute('tabindex');
          var orig=input.getAttribute('data-orig-ph');
          if(orig!=null) input.placeholder=orig;
          input.removeAttribute('data-locked-v102');
        }
      }
      return;
    }
    // locked
    bar.classList.add('chat-locked-v102');
    if(input){
      if(input.getAttribute('data-locked-v102')!=='1'){
        input.setAttribute('data-orig-ph', input.placeholder||'');
        input.setAttribute('data-locked-v102','1');
      }
      input.readOnly=true;
      input.tabIndex=-1;
      input.value='';
      input.placeholder=lockPlaceholder();
      try{input.blur();}catch(_){}
    }
    ensureOverlay(bar);
  }
  function startPoll(){
    if(pollTimer) return;
    pollTimer=setInterval(function(){
      var modal=qs('#communityChatModal');
      if(modal&&modal.classList.contains('show')) apply();
    },800);
  }
  // Re-apply whenever the chat modal opens (v93 may rebuild the controls).
  function watchModal(){
    var modal=qs('#communityChatModal'); if(!modal||modal.__gate102) return;
    modal.__gate102=true;
    new MutationObserver(function(){
      if(modal.classList.contains('show')){ setTimeout(apply,60); setTimeout(apply,260); }
    }).observe(modal,{attributes:true,attributeFilter:['class']});
  }
  // Public hook for QA / after a withdrawal completes.
  window.__chatGateRefresh=function(){ apply(); };
  document.addEventListener('click',function(){ setTimeout(function(){ var m=qs('#communityChatModal'); if(m&&m.classList.contains('show')) apply(); },80); },true);
  window.addEventListener('storage',function(e){ if(e.key===KEY) apply(); });
  document.addEventListener('DOMContentLoaded',function(){ watchModal(); startPoll(); setTimeout(apply,300); });
  watchModal(); startPoll(); setTimeout(apply,300);
})();
</script>

<style id="v104-checkin-7day-chest-redesign">
/* v104: spacious, game-like 7-day check-in track. Large swappable chest icons
   on top, day number (天数) below, horizontally swipeable. Scoped to #checkinModal. */

/* Old month chrome + old coin styles no longer used. */
#checkinModal .month-pill,
#checkinModal .week-row{display:none!important;}

#checkinModal .calendar-panel{
  background:linear-gradient(180deg,#fffdf6 0%,#fff7e6 100%)!important;
  border:1px solid #f0e3c2!important;
  padding:14px 6px 16px!important;
  position:relative!important;
  overflow:hidden!important;
}
/* soft edge fades to hint that the row scrolls */
#checkinModal .calendar-panel:before,
#checkinModal .calendar-panel:after{
  content:"";position:absolute;top:0;bottom:64px;width:26px;z-index:3;pointer-events:none;
}
#checkinModal .calendar-panel:before{left:0;background:linear-gradient(90deg,#fffdf6,rgba(255,253,246,0));}
#checkinModal .calendar-panel:after{right:0;background:linear-gradient(270deg,#fff7e6,rgba(255,247,230,0));}

/* The swipeable track */
#checkinModal .checkin-7day-track{
  display:flex!important;
  align-items:flex-start;
  gap:16px;
  margin:2px 0 4px;
  padding:6px 14px 14px;
  overflow-x:auto;
  -webkit-overflow-scrolling:touch;
  scroll-snap-type:x proximity;
  scrollbar-width:none;
}
#checkinModal .checkin-7day-track::-webkit-scrollbar{display:none;}

/* Each day cell — roomy, never crowded */
#checkinModal .c7-item{
  flex:0 0 auto;
  width:92px;
  display:flex;flex-direction:column;align-items:center;gap:10px;
  padding:12px 6px 10px;
  border-radius:20px;
  scroll-snap-align:center;
  transition:transform .22s ease, background-color .22s ease, box-shadow .22s ease;
}

/* Reward pill above the icon */
#checkinModal .c7-reward{
  display:inline-flex;align-items:center;gap:5px;
  padding:4px 11px;border-radius:999px;
  background:#fff3cf;color:#9a6a12;
  font-size:13px;font-weight:950;line-height:1;
  box-shadow:0 2px 6px rgba(214,170,60,.22);
}
#checkinModal .c7-coindot{
  width:11px;height:11px;border-radius:50%;
  background:radial-gradient(circle at 35% 30%,#ffe9a6,#f3b53a 60%,#e09a1e);
  box-shadow:inset 0 -1px 1px rgba(150,100,10,.4);
}

/* Large icon container (chest goes here; easy to swap later) */
#checkinModal .c7-icon{
  position:relative;
  width:76px;height:76px;
  display:grid;place-items:center;
  filter:drop-shadow(0 8px 12px rgba(214,150,40,.30));
  transition:transform .22s ease, filter .22s ease;
}
#checkinModal .c7-chest{width:72px;height:60px;display:block;}

/* Day number (天数) below */
#checkinModal .c7-day{
  font-size:13px;font-weight:900;color:#8a93a0;white-space:nowrap;letter-spacing:.2px;
}

/* State badges on the icon */
#checkinModal .c7-badge{
  position:absolute;z-index:4;right:2px;top:-2px;
  width:22px;height:22px;border-radius:50%;
  display:grid;place-items:center;font-size:12px;font-weight:900;
  border:2px solid #fffdf6;
}
#checkinModal .c7-badge-ok{background:#16c47f;color:#fff;box-shadow:0 3px 7px rgba(22,196,127,.4);}
#checkinModal .c7-badge-lock{background:#b9a36a;color:#fff;font-size:10px;}

/* ---- CLAIMED: dim, desaturated chest ---- */
#checkinModal .c7-item.is-claimed .c7-icon{filter:grayscale(.85) opacity(.55) drop-shadow(0 5px 8px rgba(120,120,120,.18));}
#checkinModal .c7-item.is-claimed .c7-reward{background:#edeff2;color:#9aa3ad;box-shadow:none;}
#checkinModal .c7-item.is-claimed .c7-coindot{background:#c7cdd5;box-shadow:none;}
#checkinModal .c7-item.is-claimed .c7-day{color:#aab2bd;}

/* ---- TODAY: big, glowing, bouncing chest (the hero) ---- */
#checkinModal .c7-item.is-today{
  background:radial-gradient(120% 90% at 50% 25%,#fff4c2 0%,#ffeaa0 60%,rgba(255,234,160,0) 100%);
}
#checkinModal .c7-item.is-today .c7-icon{
  transform:scale(1.22);
  filter:drop-shadow(0 10px 16px rgba(246,170,30,.55));
  animation:c7Bounce 1.7s ease-in-out infinite;
}
#checkinModal .c7-item.is-today .c7-reward{
  background:linear-gradient(180deg,#ffd76a,#f3a52a);color:#5e3c00;
  box-shadow:0 4px 12px rgba(243,165,42,.5);transform:scale(1.05);
}
#checkinModal .c7-item.is-today .c7-day{color:#b9851a;font-weight:950;}
@keyframes c7Bounce{
  0%,100%{transform:scale(1.22) translateY(0);}
  50%{transform:scale(1.22) translateY(-6px);}
}

/* ---- LOCKED: muted gold chest, lock badge, day number shown ---- */
#checkinModal .c7-item.is-locked .c7-icon{filter:saturate(.7) brightness(1.02) opacity(.9) drop-shadow(0 6px 9px rgba(200,175,110,.25));}
#checkinModal .c7-item.is-locked .c7-reward{background:#f3ecd6;color:#b39a5e;box-shadow:none;}
#checkinModal .c7-item.is-locked .c7-coindot{background:#d9c894;box-shadow:none;}
#checkinModal .c7-item.is-locked .c7-day{color:#b3a06c;}

/* tighter screens: keep it generous but fit the close button area */
@media(max-width:360px){
  #checkinModal .c7-item{width:84px;}
  #checkinModal .c7-icon{width:70px;height:70px;}
  #checkinModal .c7-chest{width:66px;height:55px;}
}
</style>
<style id="v105-icon-swap-style">
.v105-img-icon{display:block;width:100%;height:100%;object-fit:contain}
.brand-logo{background:transparent!important;box-shadow:none!important;border-radius:0!important;overflow:visible!important}
.brand-logo .v105-img-icon{width:28px;height:28px}
.avatar-trigger{background:transparent!important;box-shadow:none!important;overflow:hidden;color:transparent!important}
.avatar-trigger .v105-img-icon{width:100%;height:100%;object-fit:cover;border-radius:50%}
.auth-gate-logo{background:transparent!important;box-shadow:none!important}
.auth-gate-logo i{display:none!important}
.auth-gate-logo .v105-img-icon{width:76px;height:76px;object-fit:contain}
.auth-gate-icon svg,.auth-v45-social-icon svg{width:22px;height:22px;display:block}
.auth-gate-icon.google,.auth-v45-social-icon.google-g{background:transparent!important;color:inherit!important;font-size:0!important}
.auth-gate-icon.facebook,.auth-v45-social-icon.facebook-f{background:transparent!important;color:inherit!important;font-size:0!important}
.money-art{display:grid!important;place-items:center}
.money-art svg{display:none!important}
.money-art .v105-img-icon{width:112px;height:112px;filter:drop-shadow(0 16px 18px rgba(4,73,63,.16))}
.task-icon{background:transparent!important;color:transparent!important;box-shadow:none!important;overflow:visible!important}
.task-icon .v105-img-icon{width:54px;height:54px;object-fit:contain;filter:drop-shadow(0 8px 12px rgba(14,40,36,.10))}
.tab>svg,.tab.center .center-orb>svg{display:none!important}
.tab .v105-tab-icon{width:22px;height:22px;object-fit:contain;display:block}
.tab.center .center-orb{background:transparent!important;border:0!important;box-shadow:none!important}
.tab.center .center-orb .v105-tab-icon{width:54px;height:54px;filter:drop-shadow(0 13px 20px rgba(4,166,109,.22))}
.pay-logo.v105-pay-logo{font-size:0!important;line-height:0!important;display:flex!important;align-items:center!important;justify-content:center}
.pay-logo.v105-pay-logo .v105-img-icon{max-width:58px;max-height:24px;width:auto;height:auto}
.pay-icon-badge.v105-pay-logo{background:#fff!important;color:transparent!important;font-size:0!important;box-shadow:0 8px 16px rgba(12,33,29,.08)!important;overflow:hidden}
.pay-icon-badge.v105-pay-logo .v105-img-icon{width:34px;height:34px;object-fit:contain}
.wa-chat-icon{background:transparent!important;font-size:0!important}
.wa-chat-icon .v105-img-icon{width:66px;height:66px;object-fit:contain;filter:drop-shadow(0 10px 18px rgba(18,196,127,.22))}
.chat-fab{font-size:0!important;background:transparent!important;box-shadow:none!important}
.chat-fab>.v105-img-icon{width:58px;height:58px;object-fit:contain;filter:drop-shadow(0 16px 28px rgba(18,27,60,.22))}
.security-icon.v105-security-icon{background:transparent!important;color:transparent!important;font-size:0!important;overflow:visible!important}
.security-icon.v105-security-icon .v105-img-icon{width:40px;height:40px;object-fit:contain}
.first-cashout-coin-v96.v105-cashout-coin{background:transparent!important;box-shadow:none!important;color:transparent!important;font-size:0!important}
.first-cashout-coin-v96.v105-cashout-coin .v105-img-icon{width:22px;height:22px;object-fit:contain}
</style>
<style id="v106-wa-icon-fix">
/* v106: fix WhatsApp bind modal icon/title overlap.
   The v105 layer injects a 66px logo, but .wa-chat-icon was pinned to a smaller
   fixed box, so the logo overflowed onto the title. Let the container shrink-wrap
   the logo and keep a clean gap below it. Scoped to the bind modal only. */
.wa-bind-v12 .wa-chat-icon,
.wa-bind-v12.has-accounts .wa-chat-icon{
  width:auto!important;
  height:auto!important;
  min-height:0!important;
  display:block!important;
  line-height:0!important;
  margin:0 auto 16px!important;
}
.wa-bind-v12 .wa-chat-icon .v105-img-icon{
  width:66px!important;
  height:66px!important;
  display:block!important;
  margin:0 auto!important;
}
.wa-bind-v12.has-accounts .wa-chat-icon{
  margin-bottom:12px!important;
}
.wa-bind-v12.has-accounts .wa-chat-icon .v105-img-icon{
  width:48px!important;
  height:48px!important;
}
</style>
<script id="v105-icon-swap-script">
(function(){
  var BASE='https://raw.githubusercontent.com/robin20260517/robin20260517.github.io/5bc3051373c7cee495d9f85f86f7d544b7bc383a/whatsapp-h5/icons/';
  var ICON={
    loginLogo:BASE+'login_logo_cash_task.png',
    topLogo:BASE+'logo-cashtask-top.svg',
    avatar:BASE+'icon_avatar_default.png.png',
    money:BASE+'home_money_bag.png',
    wa:BASE+'icon_whatsapp_bind.png',
    chat:BASE+'fab_chat_community.png%20.png',
    coin:BASE+'pakistan_rupee_coins_transparent.png',
    payJazz:BASE+'pay_jazzcash_logo.png',
    payEasy:BASE+'pay_easypaisa_logo.png',
    tabHome:BASE+'tab_home.png',
    tabTasks:BASE+'tab_tasks.png',
    tabRanking:BASE+'tab_ranking.png',
    tabTeam:BASE+'tab_team.png',
    tabMy:BASE+'tab_my.png',
    taskFirst:BASE+'task_icon_first_login.png',
    taskBind:BASE+'task_icon_bind_ws.png',
    taskSend:BASE+'task_icon_send_message.png',
    taskOnline:BASE+'task_icon_online.png',
    taskShare:BASE+'task_icon_invite_share.png',
    taskCheckin:BASE+'task_icon_checkin.png',
    taskInvite:BASE+'task_icon_invite_friends.png',
    taskDraw:BASE+'task_icon_welfare_draw_full.png'
  };
  function qs(s,r){return (r||document).querySelector(s)}
  function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
  function img(src,cls,alt){return '<img class="v105-img-icon '+(cls||'')+'" src="'+src+'" alt="'+(alt||'')+'" loading="lazy">'}
  function setImg(el,src,cls,alt){if(el&&!el.querySelector('.v105-img-icon')) el.innerHTML=img(src,cls,alt)}
  function googleSvg(){
    return '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65Z"/><path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.75 24c0-1.59.28-3.13.78-4.59l-7.98-6.19A23.94 23.94 0 0 0 0 24c0 3.86.92 7.5 2.56 10.78l7.97-6.19Z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"/></svg>';
  }
  function facebookSvg(){
    return '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="24" fill="#1877F2"/><path fill="#fff" d="M29.9 25.4h-4.1V40h-6.1V25.4h-3V20h3v-3.5c0-2.5 1.2-6.5 6.5-6.5l4.8.02v5.34h-3.47c-.57 0-1.37.28-1.37 1.5V20h5.13l-.69 5.4Z"/></svg>';
  }
  function applySocialSvg(){
    qsa('.auth-gate-icon.google,.auth-v45-social-icon.google-g').forEach(function(el){if(!el.querySelector('svg')) el.innerHTML=googleSvg()});
    qsa('.auth-gate-icon.facebook,.auth-v45-social-icon.facebook-f').forEach(function(el){if(!el.querySelector('svg')) el.innerHTML=facebookSvg()});
  }
  function applyStaticIcons(){
    setImg(qs('#loginGate .auth-gate-logo'),ICON.loginLogo,'','55Rich');
    setImg(qs('.brand-logo'),ICON.topLogo,'','55Rich');
    setImg(qs('#avatarTrigger'),ICON.avatar,'','User');
    setImg(qs('.money-art'),ICON.money,'','Money');
    setImg(qs('.wa-chat-icon'),ICON.wa,'','WhatsApp');
    setImg(qs('#chatFab'),ICON.chat,'','Chat');
    var tabs=[
      ['.bottom-nav .tab[data-go="home"]',ICON.tabHome],
      ['.bottom-nav .tab[data-go="tasks"]',ICON.tabTasks],
      ['.bottom-nav .tab[data-go="ranking"] .center-orb',ICON.tabRanking],
      ['.bottom-nav .tab[data-go="team"]',ICON.tabTeam],
      ['.bottom-nav #profileTab',ICON.tabMy]
    ];
    tabs.forEach(function(t){var el=qs(t[0]); if(el&&!el.querySelector('.v105-tab-icon')) el.insertAdjacentHTML('afterbegin','<img class="v105-tab-icon" src="'+t[1]+'" alt="" loading="lazy">')});
  }
  function applyTaskIcons(){
    var map=[
      ['taskRegisterBtn',ICON.taskFirst],['taskBindBtn',ICON.taskBind],['taskMessageBtn',ICON.taskSend],
      ['taskOnlineBtn',ICON.taskOnline],['quickShare',ICON.taskShare],['quickCheckin',ICON.taskCheckin],
      ['taskInviteBtn',ICON.taskInvite],['taskLotteryBtn',ICON.taskDraw]
    ];
    map.forEach(function(pair){
      var btn=qs('#'+pair[0]), card=btn&&btn.closest('.task-card'), icon=card&&qs('.task-icon',card);
      setImg(icon,pair[1],'','');
    });
  }
  function applyPaymentIcons(){
    qsa('.pay-logo.jazz').forEach(function(el){el.classList.add('v105-pay-logo'); setImg(el,ICON.payJazz,'','JazzCash')});
    qsa('.pay-logo.easy').forEach(function(el){el.classList.add('v105-pay-logo'); setImg(el,ICON.payEasy,'','Easypaisa')});
    qsa('.pay-icon-badge.jazz').forEach(function(el){el.classList.add('v105-pay-logo'); setImg(el,ICON.payJazz,'','JazzCash')});
    qsa('.pay-icon-badge.easy').forEach(function(el){el.classList.add('v105-pay-logo'); setImg(el,ICON.payEasy,'','Easypaisa')});
  }
  function applyDynamicIcons(){
    qsa('.security-icon').forEach(function(el){
      var txt=(el.textContent||'').trim();
      if(txt==='WA'||txt==='☎'){el.classList.add('v105-security-icon'); setImg(el,ICON.wa,'','WhatsApp')}
      if(txt==='₨'){el.classList.add('v105-security-icon'); setImg(el,ICON.coin,'','Cash')}
    });
    qsa('.first-cashout-coin-v96').forEach(function(el){el.classList.add('v105-cashout-coin'); setImg(el,ICON.coin,'','Cash')});
  }
  function apply(){
    applySocialSvg();
    applyStaticIcons();
    applyTaskIcons();
    applyPaymentIcons();
    applyDynamicIcons();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply); else apply();
  var timer=0;
  new MutationObserver(function(){
    clearTimeout(timer);
    timer=setTimeout(apply,80);
  }).observe(document.documentElement,{childList:true,subtree:true});
})();
</script>
<style id="v106-team-real-only-agent-apply-style">
/* v106: Team page only - remove trigger text panel and keep team data backend-only. */
#team .agent-trigger-box{display:none!important}
#team #agentPanel .agent-sub{display:none!important}
#team .agent-v99-mascot{display:none!important}
#team .agent-v99-leaders{display:block!important}
#team .agent-v99-leader-empty{
  border-radius:14px;
  padding:16px 12px;
  background:rgba(255,255,255,.08);
  color:#efe3c8;
  font-size:13px;
  line-height:1.45;
  text-align:center;
  font-weight:850;
}
#team #applyAgentBtn.agent-link-ready{
  background:#1f2937!important;
  color:#fff!important;
  border:1px solid rgba(255,255,255,.16)!important;
}
</style>
<script id="v106-team-real-only-agent-apply-script">
(function(){
  var KEY='cashtask_state_v10';
  function qs(s,r){return (r||document).querySelector(s)}
  function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return {}}}
  function write(s){try{localStorage.setItem(KEY,JSON.stringify(s||{}))}catch(e){}}
  function lang(){var s=read();return s.lang||((document.documentElement.lang||'').indexOf('zh')===0?'zh':'en')}
  function pick(zh,en,ur){var l=lang();return l==='zh'?zh:(l==='ur'?(ur||en):en)}
  function toast(msg){
    var t=qs('#toast');
    if(t){t.textContent=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},1800);return}
    try{alert(msg)}catch(e){}
  }
  function isBackendNode(x){return !!(x && (x.backendVerified===true || x.source==='backend' || x.source==='api'))}
  function cleanNode(x,level){
    if(!isBackendNode(x)) return null;
    var id=String(x.id||x.user_id||x.userId||'').trim().toUpperCase();
    if(!id) return null;
    var children=Array.isArray(x.children)?x.children:[];
    return {
      id:id,
      backendVerified:true,
      source:'backend',
      level:Number(x.level||level||1),
      time:x.time||x.bound_at||x.created_at||'',
      whatsappBound:x.whatsappBound!==false && x.whatsapp_bound!==false,
      dailyTaskPoints:Number(x.dailyTaskPoints||x.daily_task_points||x.todayTaskPoints||x.today_task_points||0),
      todaySubsidy:Number(x.todaySubsidy||x.today_subsidy||0),
      weekSubsidy:Number(x.weekSubsidy||x.week_subsidy||0),
      subsidyHistory:Array.isArray(x.subsidyHistory)?x.subsidyHistory:(Array.isArray(x.subsidy_history)?x.subsidy_history:[]),
      children:children.map(function(c){return cleanNode(c,Number(x.level||level||1)+1)}).filter(Boolean)
    };
  }
  function backendTree(){
    var s=read();
    var list=Array.isArray(s.manualDownlines)?s.manualDownlines:[];
    var clean=list.map(function(x){return cleanNode(x,1)}).filter(Boolean);
    if(JSON.stringify(clean)!==JSON.stringify(list)){
      s.manualDownlines=clean;
      s.downlineCount=clean.length;
      s.referralCount=clean.length;
      write(s);
    }
    return clean;
  }
  function flatten(list,level){
    list=list||backendTree();
    if(level===1) return list.slice();
    var rows=[];
    list.forEach(function(a){
      (a.children||[]).forEach(function(b){
        if(level===2) rows.push(Object.assign({parentId:a.id},b));
        (b.children||[]).forEach(function(c){
          if(level===3) rows.push(Object.assign({parentId:b.id,rootId:a.id},c));
        });
      });
    });
    return rows;
  }
  function subsidy(row,level){
    var rate=level===1?0.30:(level===2?0.10:0.05);
    return Number(row.todaySubsidy||0)||Math.floor(Number(row.dailyTaskPoints||0)*rate);
  }
  function fmt(n){return Math.round(Number(n)||0).toLocaleString('en-US')+' pts'}
  function approved(s){
    var a=s.agent||{};
    return s.isAgent===true || s.agentApproved===true || s.agentStatus==='approved' || a.approved===true || a.status==='approved';
  }
  function inviteLink(s){
    return s.agentInviteLink || s.inviteLink || (s.agent&&s.agent.inviteLink) || ('cashtask.app/invite/'+(s.inviteCode||'CT1024'));
  }
  function copyText(text){
    if(navigator.clipboard&&navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    var ta=document.createElement('textarea');
    ta.value=text;ta.style.position='fixed';ta.style.left='-9999px';
    document.body.appendChild(ta);ta.select();
    try{document.execCommand('copy')}catch(e){}
    document.body.removeChild(ta);
    return Promise.resolve();
  }
  function applyAgentButton(){
    var btn=qs('#applyAgentBtn'); if(!btn) return;
    var s=read();
    if(approved(s)){
      btn.classList.add('agent-link-ready');
      btn.setAttribute('data-agent-approved','1');
      btn.textContent=pick('专属链接','Exclusive Link','Exclusive Link');
    }else{
      btn.classList.remove('agent-link-ready');
      btn.removeAttribute('data-agent-approved');
      btn.textContent=pick('申请成为代理','Apply to Become an Agent','Apply to Become an Agent');
    }
  }
  function openAgentSupport(){
    var trigger=qs('#openCommunityFromMsg');
    if(trigger) trigger.click();
    else {
      var modal=qs('#supportAgentChatModal');
      if(modal){modal.classList.add('show');document.body.classList.add('modal-lock')}
    }
    setTimeout(function(){
      var input=qs('#supportAgentInput');
      var send=qs('#supportAgentSend');
      if(input&&send){
        input.value=pick('我想申请成为代理，请帮我审核该账号。','I want to apply to become an agent. Please review this account.','I want to apply to become an agent.');
        send.click();
      }
    },160);
  }
  function syncActivation(){
    var list=backendTree();
    var l1=flatten(list,1), l2=flatten(list,2), l3=flatten(list,3);
    var all=l1.concat(l2,l3);
    var registered=l1.length;
    var bound=l1.filter(function(x){return x.whatsappBound!==false}).length;
    var pending=Math.max(0,registered-bound);
    var set=function(id,val){var el=qs('#'+id);if(el) el.textContent=val};
    set('activationRegistered',registered);
    set('activationBound',bound);
    set('activationPending',pending);
    set('activationProgressText',registered?bound+'/'+registered:'0/0');
    var bar=qs('#activationProgressBar'); if(bar) bar.style.width=(registered?Math.min(100,Math.round(bound/registered*100)):0)+'%';
    set('activationMilestone',registered?pick('真实后台下级激活进度','Real backend activation progress','Backend activation progress'):pick('暂无后台验证下级','No backend-verified downlines yet','No backend users yet'));
    var pendingList=qs('#activationPendingList');
    if(pendingList){
      var rows=l1.filter(function(x){return x.whatsappBound===false});
      pendingList.innerHTML=rows.length?rows.map(function(x){
        return '<div class="activation-user-chip"><span class="av">'+x.id.slice(0,2)+'</span><strong>'+x.id+'</strong><span>'+pick('待绑定','Need bind','Need bind')+'</span></div>';
      }).join(''):'';
    }
    var c1=qs('#manualL1Count'), c2=qs('#manualL2Count'), c3=qs('#manualL3Count');
    if(c1) c1.textContent=l1.length;
    if(c2) c2.textContent=l2.length;
    if(c3) c3.textContent=l3.length;
    var today=l1.reduce(function(sum,x){return sum+subsidy(x,1)},0);
    var week=l1.reduce(function(sum,x){return sum+Number(x.weekSubsidy||subsidy(x,1))},0);
    set('manualTodayIncome',fmt(today));
    set('manualRecentIncome',fmt(week));
    var box=qs('#manualDownlineList');
    if(box&&!l1.length){
      box.innerHTML='<div class="manual-downline-empty">'+pick('暂无真实绑定下级。用户通过后台验证并绑定 WhatsApp 后才会显示。','No real bound downlines yet. Users appear only after backend verification and WhatsApp binding.','No real users yet.')+'</div>';
    }
    var rank=qs('#agentV99RankWrap');
    if(rank){
      var joined=qs('[data-rank-stat="joined"]',rank), earned=qs('[data-rank-stat="earned"]',rank);
      if(joined) joined.textContent=String(l1.length);
      if(earned) earned.textContent=String(today);
      syncLeaderboard(rank);
    }
  }
  function leaderboardRows(){
    return [
      {name:'I. Baloch',points:1413000,bonus:'+50%'},
      {name:'Simon B.',points:1168000,bonus:'+20%'},
      {name:'Jsuniq',points:1010840,bonus:'+10%'},
      {name:'Lola M.',points:698600,bonus:'+2%'},
      {name:'Ayesha K.',points:642900,bonus:'+2%'}
    ];
  }
  function syncLeaderboard(rank){
    var wrap=qs('.agent-v99-leaders',rank);
    if(!wrap) return;
    var title=qs('.agent-v99-section-title',wrap);
    if(title) title.textContent=pick('代理排行榜','Affiliate Leaders','Affiliate Leaders');
    var chip=qs('.agent-v99-chip',wrap);
    if(chip) chip.textContent=pick('近30天','Last 30 days','Last 30 days');
    var list=qs('.agent-v99-leader-list',wrap);
    if(!list) return;
    var rows=leaderboardRows();
    var nextHtml=rows.slice(0,10).map(function(r,idx){
      var name=String(r.name||r.nickname||r.user_id||r.userId||r.id||('User '+(idx+1)));
      var points=Number(r.points||r.score||r.earned||r.total||0).toLocaleString('en-US');
      var bonus=r.bonus||r.reward||'';
      return '<div class="agent-v99-leader '+(idx<3?'top':'')+'"><div class="agent-v99-rank">'+(idx+1)+'</div><div class="agent-v99-leader-name">'+(idx+1)+'. '+name+'</div><div class="agent-v99-leader-points"><span>'+points+'</span><b class="agent-v99-bonus">'+bonus+'</b></div></div>';
    }).join('');
    if(list.getAttribute('data-v106-rank-html')!==nextHtml){
      list.setAttribute('data-v106-rank-html',nextHtml);
      list.innerHTML=nextHtml;
    }
  }
  function localizeTeamCopy(){
    var trigger=qs('#agentPanel .agent-trigger-box');
    if(trigger) trigger.innerHTML='';
    var sub=qs('#agentPanel .agent-sub');
    if(sub) sub.textContent='';
    qsa('#agentPanel .agent-calc-hint').forEach(function(el,i){
      el.textContent=i===0?pick('预估下级规模','Estimated team size','Estimated team size'):pick('预估每日任务活跃度','Estimated daily activity','Estimated daily activity');
    });
    var empty=qs('#manualDownlineList .manual-downline-empty');
    if(empty) empty.textContent=pick('暂无真实绑定下级。用户通过后台验证并绑定 WhatsApp 后才会显示。','No real bound downlines yet. Users appear only after backend verification and WhatsApp binding.','No real users yet.');
  }
  function sync(){
    backendTree();
    localizeTeamCopy();
    applyAgentButton();
    syncActivation();
  }
  document.addEventListener('click',function(e){
    var btn=e.target.closest&&e.target.closest('#applyAgentBtn');
    if(!btn) return;
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    var s=read();
    if(approved(s)){
      var link=inviteLink(s);
      copyText(link).then(function(){toast(pick('专属链接已复制，可直接分享。','Exclusive link copied. You can share it now.','Exclusive link copied.'))});
    }else{
      openAgentSupport();
    }
  },true);
  document.addEventListener('click',function(e){
    if(e.target.closest&&e.target.closest('[data-go="team"],#langToggle,#agentTabsV99 [data-agent-tab]')){
      setTimeout(sync,120);
      setTimeout(sync,520);
      setTimeout(sync,980);
    }
  },true);
  window.addEventListener('storage',function(e){if(e.key===KEY) setTimeout(sync,80)});
  document.addEventListener('DOMContentLoaded',function(){setTimeout(sync,80);setTimeout(sync,700)});
  setTimeout(sync,80);
  setInterval(sync,1200000);
})();
