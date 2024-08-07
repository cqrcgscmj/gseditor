/*
*  Write by gscmj@qq.com
*  https://github.com/cqrcgscmj/gseditor.git
*  Please keep these lines when using, and respect the author's labor, thank you!
*  使用时请保留这几行，尊重作者劳动成果，谢谢!
* 
*  mathhtml  原始公式
*  funok(mathhtml,font_size)  公式编辑完成后的回调函数
*  font_size 字体大小，单位是rem
*/
function gsEditorClass(mathhtml,funok,font_size){
	let G=this;
	let pobj=null;
	if(font_size==null)font_size=2;
	//pobj.contenteditable=true;
	
	G.F={
		stxt:`
.cmj_gs_foot{height: 50px; background-color: #ccc;}
.cmj_gs_foot>button{margin:10px 5px 10px 5px;height: 30px;}
.cmj_gs_box{position: fixed; left: 0;right: 0; top: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 999; display: flex; align-items: center;}
.cmj_gs_box>div{ width:100%;max-width: 500px;height: 430px; background-color: #fff;margin: 0 auto;position: relative;}
.cmj_gs_tool{padding: 2px;background-color: #ccc;}
.cmj_gs_tool_btn{width: 37px; height: 37px; margin: 2px; background-image: url(data:image/png;base64,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); display: inline-block; border: 1px solid #fff;}
.cmj_gs_tool_btn:hover{border:1px solid #999;}
.cmj_gs_body{min-height: 300px;overflow: scroll;padding: 5px;}
.cmj_gs_body>math{min-width:100%;min-height:300px;outline: none;}
.cmj_gs_menu_box{position: absolute;width: 100%; border: 1px solid #000; background-color: #FFC;z-index: 999;max-height: 300px; overflow-y: scroll;}
.cmj_gs_menu_box>div{padding: 5px;text-align: center; display: inline-block;width: 50px; height: 30px;}
.cmj_gs_menu_box>div:hover{background: #99f;color:#fff;}
.cmj_gs_edit{width: 3rem;font-size: 1rem;}
.lineafter,.linebefore{display: inline-block;}
.lineafter::after,.linebefore::before{content: "|";color: #000;font-size: 1em;}
		`,
		ok:funok,
		m:
		function(pobj,dtag,dclass,dtxt,domid,next,isafer){
			var obj=document.createElementNS('http://www.w3.org/1998/Math/MathML',dtag);
			if (dtxt != null) obj.innerHTML = dtxt;
			if (dclass != null) obj.setAttribute("class", dclass);
			if(next==null)
				pobj.appendChild(obj);
			else
				if(isafer){
					pobj.insertBefore(obj,next.nextSibling);
				}else{
					pobj.insertBefore(obj,next);
				}
			return obj;
		},
		a:
		function(pobj, dtag, dclass, dtxt, domid,next){
			var obj = document.createElement(dtag);
			if (dtxt != null) obj.innerHTML = dtxt;
			if (dclass != null) obj.setAttribute("class", dclass);
			if (domid != null) obj.setAttribute("id", domid);
			if(next==null)
				pobj.appendChild(obj);
			else
				pobj.insertBefore(obj,next);
			return obj;
		},
		add:
		function(pobj, dtag, dclass, dtxt, domid){//domnew
			var obj = document.createElement(dtag);
			if (dtxt != null) obj.innerHTML = dtxt;
			if (dclass != null) obj.setAttribute("class", dclass);
			if (domid != null) obj.setAttribute("id", domid);
			obj.onclick=function(e){
				e.stopPropagation();
				this.setAttribute('contentEditable',true);
				this.focus();
			}
			obj.onblur=function(e){
				e.stopPropagation();
				this.removeAttribute('contentEditable');
			}
			pobj.appendChild(obj);
			return obj;
		},
		init:
		function(){
			// G.B.m1=G.F.add(G.B.m,'mi',null,'f');
			// G.B.m2=G.F.add(G.B.m,'mrow');
			// G.B.m3=G.F.add(G.B.m,'mo',null,'(sfasdfasdfas');
			G.B.tool.init();
			G.B.body.init();
			G.B.foot.init();
			G.B.body.box.onclick=function(){
				G.B.tool.menu.box.style.display='none';
			}
		},
		start:
		function(){
			let rootbox=document.getElementById('cmj_gs_box');
			if(rootbox==null){
				rootbox=G.F.a(document.body,'div','cmj_gs_box');
				rootbox.id='cmj_gs_box';
			}
			G.F.a(rootbox,'style',null,G.F.stxt);
			console.log(G.F.style);
			pobj=G.F.a(rootbox,'div');
		},
		close:
		function(){
			G.B.box.parentNode.parentNode.removeChild(G.B.box.parentNode);
		},
		data://返回data后，无法继续编辑
		function(){
			G.B.math.style.remove(G.B.box,true);
			let dtxt=G.B.body.box.innerHTML
			dtxt=dtxt.replaceAll(' tabindex="0"','').replaceAll(' style=""','');
			return dtxt;
		}
	};
	G.F.start();
	G.B={
		box:pobj,
		tool:{//mpadded  ░ ❏ ▓
			box:G.F.a(pobj,'div','cmj_gs_tool'),
			data:[
				{txt:'分式',
					data:[
						{tag:'',txt:'上下',html:'<mfrac><mi>❏</mi><mi>❏</mi></mfrac>'},
						{tag:'',txt:'左右',html:'<mi>❏</mi><mo>/</mo><mi>❏</mi>'},
						{tag:'',txt:'左右',html:'<mfrac bevelled="true"><mi>❏</mi><mi>❏</mi></mfrac>'},
					],
				},
				{txt:'上下标',ico:'',data:[
					{tag:'',txt:'上标',html:'<msup><mi>❏</mi><mn>❏</mn></msup>'},
					{tag:'',txt:'下标',html:'<msub><mi>❏</mi><mn>❏</mn></msub'},
					{tag:'',txt:'上下标',html:'<msubsup><mi>❏</mi><mn>❏</mn><mn>❏</mn></msubsup>'},
					{tag:'',txt:'前标',html:'<mmultiscripts><mi>❏</mi><mprescripts /><mn>❏</mn><mn>❏</mn></mmultiscripts>'},
					{tag:'',txt:'全标',html:'<mmultiscripts><mi>❏</mi><mn>❏</mn><mn>❏</mn><mprescripts /><mn>❏</mn><mn>❏</mn></mmultiscripts>'},
					{tag:'',txt:'下',html:'<munder><mi>❏</mi><mo>❏</mo></munder>'},
					{tag:'',txt:'和',html:'<munderover><mo>❏</mo><mi>❏</mi><mi>❏</mi></munderover>'},
					{tag:'',txt:'下括号',html:'<mover accent="true"><mi>❏</mi><mo>❏</mo></mover>'},
					{tag:'',txt:'下括号',html:'<munder accentunder="true"><mi>❏</mi><mo>❏</mo></munder>'},
				]},
				{txt:'根式',ico:'',data:[
					{tag:'',txt:'竖式',html:'<msqrt><mi>❏</mi></msqrt>'},
					{tag:'',txt:'横式',html:'<mroot><mi>❏</mi><mi>❏</mi></mroot>'},
					{tag:'',txt:'贯穿1',html:'<mover><mi>❏</mi><mi>❏</mi></mover>'}
				]},
				{txt:'大型运算符',ico:'',data:[
					{tag:'',txt:'积分',html:'<msubsup><mo>&#x222B;</mo><mn>❏</mn><mn>❏</mn></msubsup>'},
					{tag:'',txt:'横式',html:'<munderover><mo movablelimits="false">∑</mo><mi>❏</mi></munderover>'},
					{tag:'',txt:'和',html:'<munderover><mo movablelimits="false">∑</mo><mi>❏</mi><mi>❏</mi></munderover>'},
					{tag:'',txt:'上',html:'<mover><mi>∑</mi><mo>❏</mo></mover>'},
					{tag:'',txt:'下',html:'<munder><mi>∑</mi><mo>❏</mo></munder>'},
					{tag:'',txt:'和',html:'<munderover><mo>=</mo><mi>❏</mi><mi>❏</mi></munderover>'},
				]},
				{txt:'括号',ico:'',data:[
					{tag:'',txt:'竖式',html:'<mo>(</mo><mi>❏</mi><mo>)</mo>'},
					{tag:'',txt:'横式',html:'<mo>{</mo><mi>❏</mi><mo>}</mo>'},
					{tag:'',txt:'上括号',html:'<mover accent="true"><mi>❏</mi><mo>&#x23DE;</mo></mover>'},
					{tag:'',txt:'下括号',html:'<munder accentunder="true"><mi>❏</mi><mo>&#x23DF;</mo></munder>'},

				]},
				{txt:'特殊符号',ico:'',data:[
					{tag:'',txt:'A',ico:'',other:'[U+0021-U+07FF]'},
					{tag:'',txt:'𝓡',ico:'',other:'[U+1D400-U+1D7C9]'},
					{tag:'',txt:'±',ico:'',other:'{U+002B}, {U+002D}, {U+002F}, {U+00B1}, {U+00F7}, {U+0322}, {U+2044}, [U+2212–U+2216], [U+2227–U+222A], {U+2236}, {U+2238}, [U+228C–U+228E], [U+2293–U+2296], {U+2298}, [U+229D–U+229F], [U+22BB–U+22BD], [U+22CE–U+22CF], [U+22D2–U+22D3], [U+2795–U+2797], {U+29B8}, {U+29BC}, [U+29C4–U+29C5], [U+29F5–U+29FB], [U+2A1F–U+2A2E], [U+2A38–U+2A3A], {U+2A3E}, [U+2A40–U+2A4F], [U+2A51–U+2A63], {U+2ADB}, {U+2AF6}, {U+2AFB}, {U+2AFD}'},
					{tag:'',txt:'×',ico:'',other:'{U+0025}, {U+002A}, {U+002E}, [U+003F–U+0040], {U+005E}, {U+00B7}, {U+00D7}, {U+0323}, {U+032E}, {U+2022}, {U+2043}, [U+2217–U+2219], {U+2240}, {U+2297}, [U+2299–U+229B], [U+22A0–U+22A1], {U+22BA}, [U+22C4–U+22C7], [U+22C9–U+22CC], [U+2305–U+2306], {U+27CB}, {U+27CD}, [U+29C6–U+29C8], [U+29D4–U+29D7], {U+29E2}, [U+2A1D–U+2A1E], [U+2A2F–U+2A37], [U+2A3B–U+2A3D], {U+2A3F}, {U+2A50}, [U+2A64–U+2A65], [U+2ADC–U+2ADD], {U+2AFE}'},
					{tag:'',txt:'⇎',ico:'',other:'[U+2190–U+2195], [U+219A–U+21AE], [U+21B0–U+21B5], {U+21B9}, [U+21BC–U+21D5], [U+21DA–U+21F0], [U+21F3–U+21FF],[U+2238-U+2294],{U+2794}, {U+2799}, [U+279B–U+27A1], [U+27A5–U+27A6], [U+27A8–U+27AF], {U+27B1}, {U+27B3}, {U+27B5}, {U+27B8}, [U+27BA–U+27BE], [U+27F0–U+27F1], [U+27F4–U+27FF], [U+2900–U+2920], [U+2934–U+2937], [U+2942–U+2975], [U+297C–U+297F], [U+2B04–U+2B07], [U+2B0C–U+2B11], [U+2B30–U+2B3E], [U+2B40–U+2B4C], [U+2B60–U+2B65], [U+2B6A–U+2B6D], [U+2B70–U+2B73], [U+2B7A–U+2B7D], [U+2B80–U+2B87], {U+2B95}, [U+2BA0–U+2BAF], {U+2BB8}'},
					{tag:'',txt:'⦨',ico:'',other:'[U+23E9-U+23FA],{U+0021}, {U+002B}, {U+002D}, {U+00AC}, {U+00B1}, {U+0331}, {U+2018}, {U+201C}, [U+2200–U+2201], [U+2203–U+2204], {U+2207}, [U+2212–U+2213], [U+221F–U+2222], [U+2234–U+2235], {U+223C}, [U+22BE–U+22BF], {U+2310}, {U+2319}, [U+2795–U+2796], {U+27C0}, [U+299B–U+29AF], [U+2AEC–U+2AED]'},
					{tag:'',txt:'℃',ico:'',other:'U+2103,U+23E8,[U+0021–U+0022], [U+0025–U+0027], {U+0060}, {U+00A8}, {U+00B0}, [U+00B2–U+00B4], [U+00B8–U+00B9], [U+02CA–U+02CB], [U+02D8–U+02DA], {U+02DD}, {U+0311}, {U+0320}, {U+0325}, {U+0327}, {U+0331}, [U+2019–U+201B], [U+201D–U+201F], [U+2032–U+2037], {U+2057}, [U+20DB–U+20DC], {U+23CD}'},
					{tag:'',txt:'(',ico:'',other:'U+0028, U+005B, U+007B, U+007C, U+2016, U+2308, U+230A, U+2329, U+2772, U+27E6, U+27E8, U+27EA, U+27EC, U+27EE, U+2980, U+2983, U+2985, U+2987, U+2989, U+298B, U+298D, U+298F, U+2991, U+2993, U+2995, U+2997, U+2999, U+29D8, U+29DA, U+29FC'},
					{tag:'',txt:')',ico:'',other:'U+0029, U+005D, U+007C, U+007D, U+2016, U+2309, U+230B, U+232A, U+2773, U+27E7, U+27E9, U+27EB, U+27ED, U+27EF, U+2980, U+2984, U+2986, U+2988, U+298A, U+298C, U+298E, U+2990, U+2992, U+2994, U+2996, U+2998, U+2999, U+29D9, U+29DB, U+29FD'},
					{tag:'',txt:'∫',ico:'',other:'[U+222B–U+2233], [U+2A0B–U+2A1C]'},
					{tag:'',txt:'⌢',ico:'',other:'[U+005E–U+005F], {U+007E}, {U+00AF}, [U+02C6–U+02C7], {U+02C9}, {U+02CD}, {U+02DC}, {U+02F7}, {U+0302}, {U+203E}, [U+2322–U+2323], [U+23B4–U+23B5], [U+23DC–U+23E1]'},
					{tag:'',txt:'∑',ico:'',other:'[U+220F–U+2211], [U+22C0–U+22C3], [U+2A00–U+2A0A], [U+2A1D–U+2A1E], {U+2AFC}, {U+2AFF}'},
					{tag:'',txt:'∈',ico:'',other:'[U+2200-U+222A],[U+2238-U+2237],[U+2295-U+22ED],[U+22F2-U+23E7]'},
					{tag:'',txt:'∛',ico:'',other:'[U+2145–U+2146], {U+2202}, [U+221A–U+221C]'},
					{tag:'',txt:'∴',ico:'',other:'U+002C, U+003A, U+003B,[U+2234-U+2237],[U+22EE-U+22F1]'},
				]},
				{txt:'矩阵',ico:'',data:[
					{tag:'jz',txt:'2×1',html:'<mtable><mtr><mtd><mi>❏</mi></mtd><mtd><mi>❏</mi></mtd></mtr></mtable>'},
					{tag:'jz',txt:'2×2',html:'<mtable><mtr><mtd><mi>❏</mi></mtd><mtd><mi>❏</mi></mtd></mtr><mtr><mtd><mi>❏</mi></mtd><mtd><mi>❏</mi></mtd></mtr></mtable>'},
					{tag:'jz',txt:'3×1',html:''},
					{tag:'jz',txt:'3×2',html:''},
					{tag:'jz',txt:'3×3',html:''},
					{tag:'jz',txt:'x×y',html:''},
				]},
			],
			curr:-1,
			demo:[],
			menu:{
				box:G.F.a(pobj,'div','cmj_gs_menu_box'),
				currhtml:'',
				showother: //特殊字符
				function(str){
					str=str.replaceAll('{','').replaceAll('}','').replaceAll('[','').replaceAll(']','').replaceAll(' ','').replaceAll('–','-');
					ss=str.split(',');
					G.B.tool.menu.box.innerHTML='';
					for(let s=0;s<ss.length;s++){
						if(ss[s].length>0){
							if(ss[s].indexOf('-')>0){//U+222B–U+2233
								let d=ss[s].split('-');
								let start=eval('0x'+d[0].substring(2));
								let end=eval('0x'+d[1].substring(2));
								for(let c=start;c<=end;c++){
									let html='&#x'+c.toString(16).toUpperCase()+';';
									let d=G.F.a(G.B.tool.menu.box,'div',null,html);
									d.setAttribute('title',c.toString(16).toUpperCase());
									d.onmouseenter=function(){
										G.B.tool.menu.currother=this.innerText;
									};
								}
							}else{
								let html='&#x'+ss[s].substring(2)+';';
								let d=G.F.a(G.B.tool.menu.box,'div',null,html);
								d.setAttribute('title',ss[s].substring(2));
								d.onmouseenter=function(){
									G.B.tool.menu.currother=this.innerText;
								};
							}
						}
					}
					G.B.tool.menu.box.style.display='';
					G.B.tool.menu.box.onclick=function(e){
						this.style.display='none';
						G.B.math.insertother(G.B.tool.menu.currother);
					};
				},
				show:
				function(obj){
					G.B.tool.menu.other=null;
					let n=obj.getAttribute('data-i');
					//if(n==G.B.tool.curr)return;
					G.B.tool.curr=n;
					G.B.tool.demo=[];
					let m=G.B.tool.data[n];
					G.B.tool.menu.box.innerHTML='';
					for(let i=0;i<m.data.length;i++){
						let html=m.data[i].txt;
						if(m.data[i].html)html='<math>'+m.data[i].html+'</math>';
						let d=G.F.a(G.B.tool.menu.box,'div',null,html);
						d.setAttribute('data-i',i);
						d.onmouseenter=function(){
							let i=this.getAttribute('data-i');

							G.B.tool.menu.other=m.data[i].other;
							G.B.tool.menu.tag=m.data[i].tag;
							G.B.tool.menu.txt=m.data[i].txt;

							G.B.tool.menu.currhtml=this.childNodes[0].innerHTML;
						};
						G.B.tool.demo.push(d);
					}
					G.B.tool.menu.box.style.display='';
					G.B.tool.menu.box.onclick=function(e){
						this.style.display='none';
						if(G.B.tool.menu.other!=null){
							G.B.tool.menu.showother(G.B.tool.menu.other);
							return;
						}
						if(G.B.tool.menu.tag!=null && G.B.tool.menu.tag!=""){
							let xy=G.B.tool.menu.txt.split('×');
							let txt='';
							if(xy[0]=='x'){
								txt=prompt('请输入队列的行和列(行列间用星号或者逗号分开)：','4，5');
								xy=txt.replaceAll(' ',',').replaceAll('，',',').replaceAll('*',',').replaceAll('×',',').split(',');
							}
							if(xy.length<2 || xy[0]<=0 || xy[1]<=0){
								alert('无效队列数字！');return;
							}
							txt='<mtable>';
							for(let i=0;i<xy[1];i++){
								txt+='<mtr>';
								for(let j=0;j<xy[0];j++){
									txt+='<mtd><mi>❏</mi></mtd>';
								}
								txt+='</mtr>';
							}
							txt+='</mtable>';
							G.B.math.insert(txt);
							return;
						}
						//console.log(G.B.tool.menu.other);
						G.B.math.insert(G.B.tool.menu.currhtml);
					};
					// G.B.tool.menu.box.mouseleave=function(){
					// 	this.style.display='none';
					// 	//let thismenu=this;
					// 	//setTimeout(function(){thismenu.style.display='none';},500);
					// }
				}
			},
			init:
			function(){
				G.B.tool.menu.box.style.display='none';
				G.B.tool.box.innerHTML='';
				let k=9;
				for(let i=0;i<G.B.tool.data.length;i++){
					G.B.tool.data[i].dom=G.F.a(G.B.tool.box,'div','cmj_gs_tool_btn');
					G.B.tool.data[i].dom.setAttribute('data-i',i);
					G.B.tool.data[i].dom.style.backgroundPosition=(-i*43-k)+"px -0px";
					G.B.tool.data[i].dom.onclick=function(){G.B.tool.menu.show(this);};
				}
			}
		},
		math:{
			fontSize:font_size,  //1rem
			dom:null,
			inputstate:0,  //1表示input输入框
			style:{
				remove:
				function(obj,removeSpace){
					obj.removeAttribute('style');
					if(removeSpace==true){
						if(obj.textContent=='❏'){
							console.log(obj);
							obj.parentNode.removeChild(obj);
							return;
						}
					}else{
						if(obj.textContent=='❏'){
							if(obj.tagName=='mo'){
								obj.style.color='#999';
							}else{
								obj.style.color='#ddd';
							}
						}
					}
					//obj.removeAttribute('class');
					for(let i=obj.children.length-1;i>=0;i--){
						G.B.math.style.remove(obj.children[i],removeSpace);
					}
				},
				reset:
				function(obj,readd){
					// if(readd){
					// 	G.B.body.event.doms.length=[];
					// 	G.B.body.event.add(G.B.body.box);
					// }
					// for(let i=0;i<G.B.body.event.doms.length;i++){
					// 	G.B.body.event.doms[i].dom.removeAttribute('style');
					// }
					G.B.math.style.remove(G.B.math.dom);
					if(obj!=null){
						//obj.style.border='1px solid #99f';
						if(obj.textContent=='❏'){
							obj.style.color='#99f';
						}else{
							if(G.B.math.wz==1){//之后
								//obj.setAttribute('class','lineafter');
								obj.style.borderRight='3px solid #99f';
							}else{
								//obj.setAttribute('class','linebefore');
								obj.style.borderLeft='3px solid #99f';
							}
						}
					}
				}
			},
			keydown:
			function(e){
				let f=G.B.math.keyfun;
				let k=e.keyCode;
				if(f[k]){
					f[k][0](f[k][1]);
				}else{
					if(e.key.length==1)G.B.math.input(e.key);
				}
				console.log(e.key,e.keyCode);
			},
			wz:1, //1在之后 插入 0在之前插入
			move:
			function(fx){ //0 forward  1 back 3 4
				let nobj=null;
				let cobj=G.B.body.currdom;
				let isok=0;
				
				if(fx==0 && G.B.math.wz==1){
					G.B.math.wz=0;
					isok=1;
				}
				if(fx==1 && G.B.math.wz==0){
					G.B.math.wz=1;
					isok=1;
				}
				
				if(isok==0){
					if(fx==0 && cobj!=G.B.math.dom)nobj=cobj.previousSibling;
					if(fx==1)nobj=cobj.nextSibling;
					if(fx==2 && cobj!=null && cobj.children.length>0)nobj=cobj.firstElementChild;
					if(fx==3 && cobj!=G.B.math.dom)nobj=cobj.parentNode;
					
					if(nobj==null){
						nobj=G.B.body.currdom;
						if(fx==0)G.B.math.wz=0;else G.B.math.wz=1;
					}
				}else{
					nobj=G.B.body.currdom;
				}
				G.B.body.currdom=nobj;
				G.B.math.style.reset(nobj);
			},
			del:
			function(fx,isdigui){//0 del 1 backspace
				console.log('fx',fx);
				if(G.B.body.currdom==null || G.B.body.currdom==G.B.math.dom)return;
				let nobj=null;
				let pobj=G.B.body.currdom.parentNode;
				let txt=G.B.body.currdom.textContent;
				let nextobj=G.B.body.currdom;
				let isok=0;
				
				if((G.B.math.wz==1 && fx==1) || (G.B.math.wz==0 && fx==0)){//删除自己
					nobj=G.B.body.currdom;
					if(fx==1)nextobj=G.B.body.currdom.previousSibling;
					if(fx==0)nextobj=G.B.body.currdom.nextSibling;
				}
				if(G.B.math.wz==1 && fx==0){//删除右边
					nobj=G.B.body.currdom.nextSibling;
				}
				if(G.B.math.wz==0 && fx==1){//删除左边
					nobj=G.B.body.currdom.previousSibling;
				}
				if(G.B.body.currdom.textContent=='❏')nobj=G.B.body.currdom;
				
				if(nobj!=null){
					if(pobj.children.length==1 && txt!='❏'){
						G.B.body.currdom.textContent='❏';	
						nextobj=G.B.body.currdom;
					}else{
						pobj.removeChild(nobj);
					}
					isok=1;
				}
				
				if(isok==1){
					if(pobj.children.length<=0){//递归删除空dom
						G.B.body.currdom=pobj;
						G.B.math.del(fx,1);
					}else{
						G.B.body.currdom=nextobj;
						G.B.math.style.reset(G.B.body.currdom);
					}
				}
			},
			input: //按键
			function(str){
				let txt='';
				let isok=0;
				let c=str.charCodeAt(0);
				if(c>47 && c<58)
					txt='mn';
				else{
					if((c>96 && c<123) || (c>64 && c<91)){
						txt='mi';
					}else{
						txt='mo';
					}
				}
				let bb=null;
				if(G.B.body.currdom!=null){
					if(G.B.body.currdom.textContent=='❏'){
						G.B.body.currdom.textContent=str;
						bb=G.B.body.currdom;
						isok=1;
					}
				}
				if(isok==0){
					if(G.B.body.currdom==null || G.B.body.currdom==G.B.math.dom){
						bb=G.F.m(G.B.math.dom,txt,null,str);
					}else{
						if(G.B.body.currdom.parentNode.tagName!='mrow'){
							let robj=G.F.m(G.B.body.currdom.parentNode,'mrow',null,null,null,G.B.body.currdom);
							robj.appendChild(G.B.body.currdom);
							bb=G.F.m(robj,txt,null,str,null,G.B.body.currdom,true);
						}else{
							if(G.B.math.wz==1){//之后 
								bb=G.F.m(G.B.body.currdom.parentNode,txt,null,str,null,G.B.body.currdom,true);
							}else{//之前插入
								bb=G.F.m(G.B.body.currdom.parentNode,txt,null,str,null,G.B.body.currdom,false);
							}
						}
					}
				}
				G.B.math.wz=1;
				G.B.body.currdom=bb;
				G.B.math.style.reset(bb);
				G.B.math.event.reset();
			},
			insertother:
			function(txt){
				let bb=null;
				if(G.B.body.currdom==G.B.math.dom){
					//G.B.body.currdom.textContent=txt;
					//bb=G.B.body.currdom;
					bb=G.F.m(G.B.math.dom,'mo',null,txt);
				}else{
					 let nobj=G.B.body.currdom;
					// if(nobj==null)nobj=G.B.math.dom;
					// if(nobj==G.B.math.dom){
					// 	bb=G.F.m(nobj,'mo',null,txt);
					// }else{
						if(G.B.math.wz==1){
							bb=G.F.m(nobj.parentNode,'mo',null,txt,null,nobj,true);
						}else{
							bb=G.F.m(nobj.parentNode,'mo',null,txt,null,nobj,false);
						}
					// }
				}
				
				G.B.math.wz=1;
				G.B.body.currdom=bb;
				G.B.math.dom.focus();
				G.B.math.event.reset();
				G.B.math.style.reset(bb);
			},
			insert: //插入公式
			function(html){
				let bb=null;
				let nobj=G.B.body.currdom;
				
				if(G.B.body.currdom!=null){
					if(G.B.body.currdom.textContent=='❏'){
						//G.B.body.currdom.innerHTML=str;
						bb=G.F.m(nobj.parentNode,'mrow',null,html,null,nobj,true);
						nobj.parentNode.removeChild(nobj);
					}
				}
				if(bb==null){
					if(nobj==null)nobj=G.B.math.dom;
					if(nobj==G.B.math.dom){
						bb=G.F.m(nobj,'mrow',null,html);
					}else{
						if(G.B.math.wz==1){
							bb=G.F.m(nobj.parentNode,'mrow',null,html,null,nobj,true);
						}else{
							bb=G.F.m(nobj.parentNode,'mrow',null,html,null,nobj,false);
						}
						
					}
				}
				
				G.B.math.wz=1;
				G.B.body.currdom=bb;
				G.B.math.dom.focus();
				G.B.math.event.reset();
				G.B.math.style.reset(bb);
			},
			event:{
				inputstate:0, //输入合子是否打开
				add:
				function(obj){
					let ns=obj.children;
					if(ns && ns.length>0){
						for(let i=0;i<ns.length;i++){
							G.B.math.event.add(ns[i]);
						}
					}else{
						obj.onmousedown=function(e){
							e.stopPropagation();
							if(G.B.body.currdom==this && this!=G.B.math.dom){
								G.B.math.edit(this);
							}else{
								if(G.B.math.event.inputstate==1)G.B.math.editclose();
								G.B.body.currdom=this;
								G.B.math.style.reset(this);
							}
						}
					}
				},
				reset:
				function(){
					G.B.math.event.add(G.B.math.dom);
				}
			},
			init:
			function(){
				G.B.math.keyfun={
					8: [G.B.math.del,1], //backbase
					46:[G.B.math.del,0], //del
					37:[G.B.math.move,0], //left
					39:[G.B.math.move,1], //right
					38:[G.B.math.move,2], //up
					40:[G.B.math.move,3],  //down
				}
			},
			edit:
			function(obj){
				if(G.B.math.event.inputstate==1)return;
				G.B.math.inputobj=obj;
				G.B.math.event.inputstate=1;
				let txt=obj.textContent;
				if(txt=='❏')txt='';
				obj.textContent='';
				G.B.math.inputbox=G.F.a(obj,'input','cmj_gs_edit');
				G.B.math.inputbox.value=txt;
				G.B.math.inputbox.onkeydown=function(e){
					//e.preventDefault();
					e.stopPropagation();
				};
				G.B.math.inputbox.onblur=function(){G.B.math.editclose();};
			},
			editclose:
			function(){
				if(G.B.math.inputbox==null)return;
				let txt=G.B.math.inputbox.value;
				if(txt=='')txt='❏';
				if(G.B.math.inputobj!=null){
					G.B.math.inputobj.textContent=txt;
				}
				G.B.math.event.inputstate=0;
				G.B.math.inputbox=null;
			}
		},
		body:{
			box:G.F.a(pobj,'div','cmj_gs_body'),
			currdom:null,
			init:
			function(){
				G.B.math.init();

				G.B.body.box.style.fontSize=G.B.math.fontSize+'rem';
				G.B.math.dom=G.F.m(G.B.body.box,'math',null,mathhtml);
				G.B.math.dom.setAttribute('tabindex',0);
				//G.B.math.dom.style.outline='none';
				//G.B.math.dom.setAttribute('display','block');
				G.B.body.currdom=G.B.math.dom;
				G.B.body.box.onmousedown=function(e){
					e.stopPropagation();
					if(G.B.math.event.inputstate==1)G.B.math.editclose();
					G.B.math.style.reset();
					if(G.B.math.dom.children.length>0){
						G.B.body.currdom=G.B.math.dom.lastElementChild;
					}else{
						G.B.body.currdom=G.B.math.dom;
					}
					G.B.math.wz=1;
					G.B.math.style.reset(G.B.body.currdom);
				}
				
				G.B.math.dom.onkeydown=function(e){
					e.preventDefault();
					e.stopPropagation();
					G.B.math.keydown(e);
				}
				G.B.math.event.reset();
			}
		},
		foot:{
			box:G.F.a(pobj,'div','cmj_gs_foot'),
			btns:[
				{
					txt:'放大',
					fun:
					function(){
						G.B.math.fontSize+=0.2;
						G.B.body.box.style.fontSize=G.B.math.fontSize+'rem';
					}
				},
				{
					txt:'缩小',
					fun:
					function(){
						if(G.B.math.fontSize<=0.4)return;
						G.B.math.fontSize-=0.2;
						G.B.body.box.style.fontSize=G.B.math.fontSize+'rem';
					}
				},
				{
					txt:'确定',
					float:'right',
					fun:
					function(){
						if(G.F.ok!=null)G.F.ok(G.F.data(),G.B.math.fontSize);
						G.F.close();
					}
				},
				{
					txt:'取消',
					float:'right',
					fun:
					function(){
						G.F.close();
					}
				}
			],
			init:function(){
				for(let i=0;i<G.B.foot.btns.length;i++){
					let btn=G.F.a(G.B.foot.box,'button',null,G.B.foot.btns[i].txt);
					if(G.B.foot.btns[i].float)btn.style.float=G.B.foot.btns[i].float;
					btn.onclick=G.B.foot.btns[i].fun;
					
				}
			}
		}
	}
	
	G.F.init();
	return G;
}
