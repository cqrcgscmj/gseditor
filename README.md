# gseditor
An formula editor,  with single js file.
Demo url http://pk.rcde.cn/gseditor/index.html

You can integration in your H5 editor.

Demo code:
let gshtm='<math><math><mrow><mroot><mi>5</mi></mroot></mrow></math><mrow><mo>+</mo><mrow><mroot><mi>4</mi><mi>2</mi></mroot></mrow></mrow></math>';
let gsobj=new gsEditorClass(gshtm,function(gshtm){
	console.log(gshtm);
});
