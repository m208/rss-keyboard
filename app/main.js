(()=>{"use strict";class e{constructor(e,t){const s=document.createElement(t.tag||"div");t.classes&&s.classList.add(t.classes),e.append(s),this.node=s}}class t{constructor(){const t=new e(document.body,{classes:"description-wrapper"});["Keyboard was created in Windows","Switch language with left Ctrl + left Alt","Hotkeys: Ctrl + A, Ctrl + C, Ctrl + V, Ctrl + X"].forEach((s=>{new e(t.node,{classes:"description",tag:"p"}).node.textContent=s}))}}const s=[["Tilda","1","2","3","4","5","6","7","8","9","0","-","+","Backspace"],["Tab","q","w","e","r","t","y","u","i","o","p","[","]","BackSlash","Del"],["CapsLock","a","s","d","f","g","h","j","k","l","Semicolon","Quote","Enter"],["Shift","z","x","c","v","b","n","m",",",".","/","ArrowUp","ShiftRight"],["Ctrl","Win","Alt","Space","AltRight","ArrowLeft","ArrowDown","ArrowRight","CtrlRight"]],n={Tilda:{en:"`",enUp:"~",ru:"ё",ruUp:"Ё",code:"Backquote"},1:{en:"1",enUp:"!",ru:"1",ruUp:"!",code:"Digit1"},2:{en:"2",enUp:"@",ru:"2",ruUp:'"',code:"Digit2"},3:{en:"3",enUp:"#",ru:"3",ruUp:"№",code:"Digit3"},4:{en:"4",enUp:"$",ru:"4",ruUp:";",code:"Digit4"},5:{en:"5",enUp:"%",ru:"5",ruUp:"%",code:"Digit5"},6:{en:"6",enUp:"^",ru:"6",ruUp:":",code:"Digit6"},7:{en:"7",enUp:"&",ru:"7",ruUp:"?",code:"Digit7"},8:{en:"8",enUp:"*",ru:"8",ruUp:"*",code:"Digit8"},9:{en:"9",enUp:"(",ru:"9",ruUp:"(",code:"Digit9"},0:{en:"0",enUp:")",ru:"0",ruUp:")",code:"Digit0"},"-":{en:"-",enUp:"_",ru:"-",ruUp:"_",code:"Minus"},"+":{en:"=",enUp:"+",ru:"=",ruUp:"+",code:"Equal"},q:{en:"q",enUp:"Q",ru:"й",ruUp:"Й",code:"KeyQ"},w:{en:"w",enUp:"W",ru:"ц",ruUp:"Ц",code:"KeyW"},e:{en:"e",enUp:"E",ru:"у",ruUp:"У",code:"KeyE"},r:{en:"r",enUp:"R",ru:"к",ruUp:"К",code:"KeyR"},t:{en:"t",enUp:"T",ru:"е",ruUp:"Е",code:"KeyT"},y:{en:"y",enUp:"Y",ru:"н",ruUp:"Н",code:"KeyY"},u:{en:"u",enUp:"U",ru:"г",ruUp:"Г",code:"KeyU"},i:{en:"i",enUp:"I",ru:"ш",ruUp:"Ш",code:"KeyI"},o:{en:"o",enUp:"O",ru:"щ",ruUp:"Щ",code:"KeyO"},p:{en:"p",enUp:"P",ru:"з",ruUp:"З",code:"KeyP"},a:{en:"a",enUp:"A",ru:"ф",ruUp:"Ф",code:"KeyA"},s:{en:"s",enUp:"S",ru:"ы",ruUp:"Ы",code:"KeyS"},d:{en:"d",enUp:"D",ru:"в",ruUp:"В",code:"KeyD"},f:{en:"f",enUp:"F",ru:"а",ruUp:"А",code:"KeyF"},g:{en:"g",enUp:"G",ru:"п",ruUp:"П",code:"KeyG"},h:{en:"h",enUp:"H",ru:"р",ruUp:"Р",code:"KeyH"},j:{en:"j",enUp:"J",ru:"о",ruUp:"О",code:"KeyJ"},k:{en:"k",enUp:"K",ru:"л",ruUp:"Л",code:"KeyK"},l:{en:"l",enUp:"L",ru:"д",ruUp:"Д",code:"KeyL"},z:{en:"z",enUp:"Z",ru:"я",ruUp:"Я",code:"KeyZ"},x:{en:"x",enUp:"X",ru:"ч",ruUp:"Ч",code:"KeyX"},c:{en:"c",enUp:"C",ru:"с",ruUp:"С",code:"KeyC"},v:{en:"v",enUp:"V",ru:"м",ruUp:"М",code:"KeyV"},b:{en:"b",enUp:"B",ru:"и",ruUp:"И",code:"KeyB"},n:{en:"n",enUp:"N",ru:"т",ruUp:"Т",code:"KeyN"},m:{en:"m",enUp:"M",ru:"ь",ruUp:"Ь",code:"KeyM"},"[":{en:"[",enUp:"{",ru:"х",ruUp:"Х",code:"BracketLeft"},"]":{en:"]",enUp:"}",ru:"ъ",ruUp:"Ъ",code:"BracketRight"},BackSlash:{en:"\\",enUp:"|",ru:"\\",ruUp:"/",code:"Backslash"},Semicolon:{en:";",enUp:":",ru:"ж",ruUp:"Ж",code:"Semicolon"},Quote:{en:"'",enUp:'"',ru:"э",ruUp:"Э",code:"Quote"},",":{en:",",enUp:"<",ru:"б",ruUp:"Б",code:"Comma"},".":{en:".",enUp:">",ru:"ю",ruUp:"Ю",code:"Period"},"/":{en:"/",enUp:"?",ru:".",ruUp:",",code:"Slash"},Space:{en:" ",enUp:" ",ru:" ",ruUp:" ",code:"Space"},Backspace:{en:"Backspace",code:"Backspace"},Tab:{en:"Tab",code:"Tab"},Del:{en:"Del",code:"Delete"},CapsLock:{en:"CapsLock",code:"CapsLock"},Enter:{en:"Enter",code:"Enter"},Shift:{en:"Shift",code:"ShiftLeft"},ShiftRight:{en:"Shift",code:"ShiftRight"},Ctrl:{en:"Ctrl",code:"ControlLeft"},CtrlRight:{en:"Ctrl",code:"ControlRight"},Win:{en:"Win",code:"MetaLeft"},Alt:{en:"Alt",code:"AltLeft"},AltRight:{en:"Alt",code:"AltRight"},ArrowUp:{en:"↑",code:"ArrowUp"},ArrowLeft:{en:"←",code:"ArrowLeft"},ArrowDown:{en:"↓",code:"ArrowDown"},ArrowRight:{en:"→",code:"ArrowRight"}},o={Space:{style:"key-long"},Backspace:{style:"key-long",type:"Command"},Tab:{style:"key-long",type:"Command"},Del:{style:"key-long",type:"Command"},Enter:{style:"key-long",type:"Command"},CapsLock:{style:"key-long",type:"Functional"},Shift:{style:"key-long",type:"Functional"},ShiftRight:{style:"key-long-fixed",type:"Functional"},Ctrl:{type:"Functional"},CtrlRight:{type:"Functional"},Win:{type:"Functional"},Alt:{type:"Functional"},AltRight:{type:"Functional"},ArrowUp:{type:"Command"},ArrowLeft:{type:"Command"},ArrowDown:{type:"Command"},ArrowRight:{type:"Command"}};class i extends e{active=!1;led=!1;constructor(t,s,n,o){super(t,s),this.values=n.values,this.type=n.type||"default",n.styles&&this.node.classList.add(n.styles),this.value=n.values[o]||n.values.en,"default"===this.type&&(this.secondary=new e(this.node,{classes:"secondary",tag:"div"}),this.primary=new e(this.node,{classes:"primary",tag:"div"}),this.spacer=new e(this.node,{classes:"spacer",tag:"div"}),this.secondary.value=this.values[`${o}Up`]),this.renderValues();let i=null,a=null;this.node.onmousedown=()=>{this.active=!0,this.highLight(),n.mouseDown(),"Functional"!==this.type&&(a=setTimeout((()=>{i=setInterval(n.mouseDown,75)}),500))},this.node.onmouseup=()=>{this.active=!1,this.highLight(),clearTimeout(a),clearInterval(i),n.mouseUp()},this.node.onmouseout=this.node.onmouseup}lightLed(){this.led?this.node.classList.add("active-led"):this.node.classList.remove("active-led")}highLight(){this.active?this.node.classList.add("active"):this.node.classList.remove("active")}keyUp(){this.active=!1,this.highLight()}keyDown(){this.active=!0,this.highLight()}redrawCaption(e,t){if("default"!==this.type)return;const s=`${e}${t.Shift?"Up":""}`;t.CapsLock&&t.Shift?this.value=this.values[s].toLowerCase():t.CapsLock?this.value=this.values[e].toUpperCase():this.value=this.values[s];const n=`${e}${t.Shift?"":"Up"}`;this.secondary.value=this.values[n],this.renderValues()}renderValues(){"default"===this.type?(this.secondary.node.innerHTML=this.isMultiCaption()?this.secondary.value:"",this.primary.node.innerHTML=this.value):this.node.innerHTML=this.value}isMultiCaption(){return!!this.secondary&&this.value.toUpperCase()!==this.secondary.value.toUpperCase()}}class a{buttons={};holdable={Shift:!1,Control:!1,Alt:!1,CapsLock:!1};holdableKeys=["ShiftLeft","ControlLeft","AltLeft","ShiftRight","ControlRight","AltRight"];langSwitchKeys=["ControlLeft","AltLeft"];hotkeysControl=["A","C","V","X"];constructor(t,a){this.app=t,this.lang=a;const r=new e(document.body,{classes:"keyboard"});s.forEach((t=>{const s=new e(r.node,{classes:"key-line"});t.forEach((e=>{const t={values:n[e],styles:o[e]?o[e].style:null,type:o[e]?o[e].type:null,mouseDown:()=>{this.keyClick(n[e].code)},mouseUp:()=>{this.keyClickUp()}},r=new i(s.node,{classes:"key"},t,a),{code:l}=n[e];this.buttons[l]=r}))}))}keyClickUp(){this.app.fosusOutput()}keyClick(e){const t=this.buttons[e];if("Functional"===t.type)this.handleFunctionalKeys(e,"keyClick");else if("Command"===t.type)this.app.sendCommand(e);else if(this.holdable.Control){const e=t.value.toUpperCase();this.hotkeysControl.includes(e)&&this.app.sendCommand(`Control+${e}`)}else this.app.sendKey(t.value)}keyDown(e){const t=this.buttons[e];if(t)if(t.keyDown(),"Functional"===t.type)this.handleFunctionalKeys(e,"keyDown");else if("Command"===t.type)this.app.sendCommand(e);else if(this.holdable.Control){const t=e.replace("Key","");this.hotkeysControl.includes(t)&&this.app.sendCommand(`Control+${t}`)}else this.app.sendKey(t.value)}keyUp(e){const t=this.buttons[e];t&&(t.keyUp(),"Functional"===t.type&&this.handleFunctionalKeys(e,"keyUp"))}handleFunctionalKeys(e,t){if("CapsLock"===e&&"keyDown"!==t&&this.handleCapsLock(),this.holdableKeys.includes(e)){const s=e.replace("Left","").replace("Right","");let n;"keyDown"===t&&(n=!0),"keyUp"===t&&(n=!1),"keyClick"===t&&(n=!this.holdable[s]),this.handleHoldableKey(e,n)}if(this.langSwitchKeys.includes(e)){if("keyUp"!==t){const[e,s]=this.langSwitchKeys.map((e=>e.replace("Left","").replace("Right","")));this.holdable[e]&&this.holdable[s]?(this.switchLang.alreadySwitched||this.switchLang(),this.switchLang.alreadySwitched=!0):"keyClick"===t&&(this.switchLang.alreadySwitched=!1)}"keyUp"===t&&(this.switchLang.alreadySwitched=!1)}}handleHoldableKey(e,t){const s=e.replace("Left","").replace("Right","");this.holdable[s]!==t&&(this.holdable[s]=t,[`${s}Left`,`${s}Right`].forEach((e=>{this.buttons[e].led=t,this.buttons[e].lightLed()})),"Shift"===s&&this.redrawLayout())}handleCapsLock(){this.holdable.CapsLock=!this.holdable.CapsLock,this.buttons.CapsLock.led=this.holdable.CapsLock,this.buttons.CapsLock.lightLed(),this.redrawLayout()}switchLang(){this.lang="en"===this.lang?"ru":"en",this.redrawLayout(),this.app.switchLang(this.lang)}redrawLayout(){const e={CapsLock:this.holdable.CapsLock,Shift:this.holdable.Shift};Object.values(this.buttons).forEach((t=>{t.redrawCaption(this.lang,e)}))}focusOut(){Object.keys(this.holdable).forEach((e=>{this.holdable[e]=!1})),Object.keys(this.buttons).forEach((e=>{const t=this.buttons[e];t.active=!1,t.led=!1,t.highLight(),t.lightLed()})),this.redrawLayout()}}class r extends e{constructor(e,t,s){super(e,t),this.node.style.display="none",this.ctx=this.node.getContext("2d"),this.ctx.font=s.font}measureText(e){return this.ctx.measureText(e).width}}class l{constructor(e,t){this.el=e;const s={font:`${t.fontSize} ${t.font}`};this.cmeasurer=new r(document.body,{tag:"canvas"},s)}findPos(e,t,s){if(!e)return t;const n=this.slpitLines(e);let o=n.length-1;n.forEach(((e,s)=>{e.isinRange(t)&&(o=s)}));const i="up"===s?o-1:o+1;if(i<0)return 0;if(i>n.length-1)return n[n.length-1].end;const a=t-n[o].start,r=n[i];let l=t;return l=r.len>=a?r.start+a:r.end,l}getMaxChars(){const e=window.getComputedStyle(this.el),t=this.el.offsetWidth-parseFloat(e.paddingLeft)-parseFloat(e.paddingRight),s=this.cmeasurer.measureText("0");return Math.trunc(t/s)}slpitLines(e){const t=[],s=this.getMaxChars(),n=e.split("\n"),o=e=>{let t=!1,n="",o=0,i=null;if(e.length<=s)return e;for(;!t&&o<e.length;)" "!==e[o]&&"-"!==e[o]||(n.length>s?t=!0:i=n+e[o]),n+=e[o],o+=1;return i||e.slice(0,s)};let i=0;return n.forEach((e=>{let s=`\n${e}`;for(;s.length>0;){const e=o(s),n=i+e.length-1,a={val:e,len:e.length,start:i,end:n,isinRange(e){return e>=this.start&&e<=this.end}};i+=e.length,t.push(a),s=s.slice(e.length,s.length)}})),t}}class c{style={font:"Courier",fontSize:"16px",padding:"8px"};constructor(t){this.app=t;const s=new e(document.body,{classes:"output-wrapper"}),n=new e(s.node,{classes:"output",tag:"textarea"});this.el=n.node,this.el.rows=14,this.el.autofocus=!0,this.el.style=`font-family: ${this.style.font}; font-size: ${this.style.fontSize}; padding: ${this.style.padding};`,this.matrix=new l(this.el,this.style)}sendKey(e,t=this.getCaretPos()){let s=this.getValue();const n=t.start<0?0:t.start,o=t.end,i=s.slice(0,n),a=s.slice(o,s.length);s=i+e+a;const r=i.length+e.length;this.outputValue(s,r),this.app.playSound()}async sendCommand(e){const t=this.getValue(),s=this.getCaretPos();if("Tab"===e&&this.sendKey("    "),"Enter"===e&&this.sendKey("\n"),"Backspace"===e&&(s.end-s.start>0?this.sendKey(""):this.sendKey("",{start:s.start-1,end:s.end})),"Delete"===e&&(s.end-s.start>0?this.sendKey(""):this.sendKey("",{start:s.start,end:s.end+1})),"Control+V"===e){const e=await this.app.clipboardAction();this.sendKey(e)}if("Control+C"===e){const e=document.getSelection();this.app.clipboardAction(e)}if("Control+X"===e){const e=document.getSelection();this.app.clipboardAction(e),this.sendKey("")}if("Control+A"===e&&(this.el.setSelectionRange(0,t.length),this.focus()),["ArrowUp","ArrowLeft","ArrowDown","ArrowRight"].includes(e)){let n=s.start;"ArrowUp"===e&&(n=this.matrix.findPos(t,s.start,"up")),"ArrowDown"===e&&(n=this.matrix.findPos(t,s.start,"down")),"ArrowLeft"===e&&(n=s.start-1,n=n>=0?n:0),"ArrowRight"===e&&(n=s.start+1),this.setCaretPos(n),this.app.playSound()}}getCaretPos(){return{start:this.el.selectionStart,end:this.el.selectionEnd}}setCaretPos(e){this.el.selectionStart=e,this.el.selectionEnd=e}getValue(){return this.el.value}focus(){this.el.focus()}outputValue(e,t=null){this.el.value=e,null!=t&&this.setCaretPos(t)}}class h{constructor(t){new e(document.body,{classes:"heading",tag:"h1"}).node.textContent=t}}class d{constructor(){this.lang=this.storage("lang")??"en",this.title=new h("RSS Virtual Keyboard"),this.output=new c(this),this.keyboard=new a(this,this.lang),this.desc=new t,this.clickSound=new Audio("./sound/clc1.mp3"),this.clipboard=navigator.clipboard;const e=Object.values(n).map((e=>e.code));document.body.addEventListener("keydown",(t=>{e.includes(t.code)&&(t.preventDefault(),this.keyboard.keyDown(t.code))})),document.body.addEventListener("keyup",(t=>{e.includes(t.code)&&(t.preventDefault(),this.keyboard.keyUp(t.code))})),window.addEventListener("blur",(()=>{this.keyboard.focusOut()}))}storage(e,t=null){return t?(localStorage.setItem(e,JSON.stringify(t)),this.lang):JSON.parse(localStorage.getItem(e))}async clipboardAction(e=null){if(null!==e){const t=new Blob([e],{type:"text/plain"}),{ClipboardItem:s}=window;return this.clipboard.write([new s({[t.type]:t})]),!1}return"denied"===(await navigator.permissions.query({name:"clipboard-read"})).state?"":await this.clipboard.readText()}sendKey(e){this.output.sendKey(e)}sendCommand(e){this.output.sendCommand(e)}fosusOutput(){this.output.focus()}switchLang(e){this.storage("lang",e)}playSound(){this.clickSound.play()}}document.addEventListener("DOMContentLoaded",(()=>{window.app=new d}))})();