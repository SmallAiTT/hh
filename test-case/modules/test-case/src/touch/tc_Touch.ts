/**
 * Created by SmallAiTT on 2015/7/3.
 */
module tc{
    unit.curModuleName = moduleName_Node;

    unit.addMenuItem('点击事件测试', function(){
        var TH = hh.Touch;
        var func = function(handler, x, y, phase){
            console.log(this.touchType, '--->', handler.target.name, x, y, phase);
        };
        var stage:hh.Node = hh.engine.stage;

        var create = function(name, size, pos, parent){
            var node = new hh.Node();
            node.name = name;
            node.w = node.h = 200;
            node.x = node.y = 200;
            var handler = node.touch;
            handler.on(TH.BEGAN, func, {touchType:'BEGAN'});
            handler.on(TH.MOVE, func, {touchType:'MOVE'});
            handler.on(TH.END, func, {touchType:'END'});
            parent.add(node);
            return node;
        };
        var node1 = create('node1', 200, 200, stage);
        var node2 = create('node2', 200, 25, node1);
        var node3 = create('node3', 100, 100, node1);// 裁剪的节点
        var node4 = create('node4', 100, 100, node3);
        node2.sx = node2.sy = 0.5;
        node2.r = Math.PI/4;
        node3.clip = hh.Node.CLIP_RECT;// 设置矩形裁剪
        node4._nodeOpt.debugRectColor = 'blue';


    });
}
