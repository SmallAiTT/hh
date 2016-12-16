/**
 * Created by SmallAiTT on 2015/6/29.
 */
module hh{
    export class Node extends Emitter{
        static debug:boolean = true;

        /**
         * 矩形裁剪
         * @param ctx
         * @param engine
         * @param target
         * @constructor
         */
        static CLIP_RECT:Function = function(ctx:IRenderingContext2D, engine:Engine, target:Node){
            var w = target.w, h = target.h;
            ctx.moveTo(0, 0);
            ctx.lineTo(w, 0);
            ctx.lineTo(w, h);
            ctx.lineTo(0, h);
            ctx.closePath();
        };

        static CLIP_ARC:Function = function(ctx:IRenderingContext2D, engine:Engine, target:Node){
            var w = target.w, h = target.h;
            var max = Math.max(w, h);
            var min = Math.min(w, h);
            ctx.arc(w/2, h/2, max/2, 0, Math.PI*2);
        };

        _nodeOpt:NodeOpt;

        static Touch:any = Touch;
        touch:Touch;

        //@override
        _initProp(){
            super._initProp();
            var self = this, clazz = self.__c;
            self._nodeOpt = NodeOpt.get(clazz);
            self.touch = clazz.Touch.get();
            self.touch.target = self;
        }
        _dtor(){
            super._dtor();
            var self = this;
            self._nodeOpt.recycle();// 回收自己
            self.touch.recycle();

            // 解除绑定
            delete self._nodeOpt;
            delete self.touch;
        }

        /**
         * name
         */
        _setName(name:string){
            this._nodeOpt.name = name;
        }
        public set name(name:string){
            this._setName(name);
        }
        public get name():string{
            return this._nodeOpt.name;
        }

        /**
         * 宽度
         */
        _setW(w:number){
            this._nodeOpt.w = w;
        }
        public set w(w:number){
            this._setW(w);
        }
        public get w():number{
            return this._nodeOpt.w;
        }
        /**
         * 高度
         */
        _setH(h:number){
            this._nodeOpt.h = h;
        }
        public set h(h:number){
            this._setH(h);
        }
        public get h():number{
            return this._nodeOpt.h;
        }
        /**
         * x轴位置
         */
        _setX(x:number){
            this._nodeOpt.x = x;
        }
        public set x(x:number){
            this._setX(x);
        }
        public get x():number{
            return this._nodeOpt.x;
        }
        /**
         * y轴位置
         */
        _setY(y:number){
            this._nodeOpt.y = y;
        }
        public set y(y:number){
            this._setY(y);
        }
        public get y():number{
            return this._nodeOpt.y;
        }

        /**
         * X轴缩放
         */
        _setSx(sx:number){
            this._nodeOpt.sx = sx;
        }
        public set sx(sx:number){
            this._setSx(sx);
        }
        public get sx():number{
            return this._nodeOpt.sx;
        }
        /**
         * y轴缩放
         */
        _setSy(sy:number){
            this._nodeOpt.sy = sy;
        }
        public set sy(sy:number){
            this._setSy(sy);
        }
        public get sy():number{
            return this._nodeOpt.sy;
        }

        /**
         * x轴锚点
         */
        _setAx(ax:number){
            this._nodeOpt.ax = ax;
        }
        public set ax(ax:number){
            this._setAx(ax);
        }
        public get ax():number{
            return this._nodeOpt.ax;
        }
        /**
         * y轴锚点
         */
        _setAy(ay:number){
            this._nodeOpt.ay = ay;
        }
        public set ay(ay:number){
            this._setAy(ay);
        }
        public get ay():number{
            return this._nodeOpt.ay;
        }

        /**
         * 旋转
         */
        _setR(r:number){
            this._nodeOpt.r = r;
        }
        public set r(r:number){
            this._setR(r);
        }
        public get r():number{
            return this._nodeOpt.r;
        }

        /**
         * zIndex
         */
        _setZIndex(zIndex:number){
            this._nodeOpt.zIndex = zIndex;
        }
        public set zIndex(zIndex:number){
            this._setZIndex(zIndex);
        }
        public get zIndex():number{
            return this._nodeOpt.zIndex;
        }

        /**
         * 是否可见。
         */
        _setV(v:boolean){
            this._nodeOpt.v = v;
        }
        public set v(v:boolean){
            this._setV(v);
        }
        public get v():boolean{
            return this._nodeOpt.v;
        }

        public set resizableByRes(resizableByRes:boolean){
            this._nodeOpt.resizableByRes = resizableByRes;
        }
        public get resizableByRes():boolean{
            return this._nodeOpt.resizableByRes;
        }


        /**
         * 添加子节点。
         * @param child
         * @returns {hh.Node}
         */
        public add(child:Node):Node{
            var self = this, children = self._nodeOpt.c;
            // TODO 需要根据zIndex进行排序
            if(children.indexOf(child) < 0){
                var cNodeOpt = child._nodeOpt;
                // 如果已经在别的节点上了，就先进行移除
                if(cNodeOpt.parent) cNodeOpt.parent.rm(child);
                children.push(child);
                cNodeOpt.parent = self;
            }
            return self;
        }
        /**
         * 移除子节点。
         * @param child
         * @returns {hh.Node}
         */
        public rm(child:Node):Node{
            var self = this, c = self._nodeOpt.c;
            var index = c.indexOf(child);
            if(index >= 0) {
                c.splice(index, 1);
                child._nodeOpt.parent = null;
            }
            return self;
        }

        public rmAll():Node{
            var self = this, c = self._nodeOpt.c;
            var l = c.length;
            while(l > 0){
                var child = c.pop();
                // 解除父亲绑定
                child._nodeOpt.parent = null;
                l--;
            }
            return self;
        }

        /**
         * 移除自身。
         * @returns {hh.Node}
         */
        public rmSelf():Node{
            var self = this, parent = self._nodeOpt.parent;
            if(parent) parent.rm(self);
            return self;
        }

        /**
         * 获取所有子节点。获取到的是另一个children数组，避免外部使用导致污染。
         * @returns {Node[]}
         */
        public get c():Node[]{
            var arr:Node[] = [], c = this._nodeOpt.c;
            for (var i = 0, l_i = c.length; i < l_i; i++) {
                arr.push(c[i]);
            }
            return arr;
        }

        /**
         * 布局处理器。
         */
        _setLayout(layout:Layout){
            this._nodeOpt.layout = layout;
        }
        public set layout(layout:Layout){
            this._setLayout(layout);
        }
        public get layout():Layout{
            return this._nodeOpt.layout;
        }

        /**
         * 裁剪器
         * @param clip
         * @private
         */
        _setClip(clip:Function){
            this._nodeOpt.clip = clip;
        }
        public set clip(clip:Function){
            this._setClip(clip);
        }
        public get clip():Function{
            return this._nodeOpt.clip;
        }

        _doClip(ctx:IRenderingContext2D, engine:Engine){
            ctx.save();
            ctx.beginPath();
            this._nodeOpt.clip(ctx, engine, this);
            ctx.clip();
        }
        _restoreClip(ctx:IRenderingContext2D, engine:Engine){
            ctx.restore();
        }

        /**
         * 转换节点。
         */
        _trans(engine:Engine){
            var self = this, clazz = self.__c, nodeOpt = self._nodeOpt;
            var c = nodeOpt.c;
            var touchQueue = engine._touchQueue;
            var renderQueue = engine._renderQueue;
            var touchable = nodeOpt.touchable;
            if(touchable) touchQueue.push(self, 0);// 下传阶段入队列
            nodeOpt.renderQueueRange[0] = renderQueue.length;
            // 如果该节点是可绘制的就放到绘制队列中
            if(nodeOpt.drawable && nodeOpt.w > 0 && nodeOpt.h > 0) renderQueue.push(self._draw, self);
            // 如果是测试模式则将测试的绘制代码也放到绘制列表中
            if(clazz.debug) renderQueue.push(self._drawDebug, self);
            if(nodeOpt.clip) {
                // 如果当前节点可裁剪，则推送到裁剪计算队列中
                engine._clipQueue.push(self);
                renderQueue.push(self._doClip, self);
            }
            nodeOpt.renderQueueRange[1] = renderQueue.length;

            // 如果有设置布局，则进行布局处理
            var layout = nodeOpt.layout;
            if(layout) {
                // 清空
                layout.onBefore(self);
                layout.handle(self);
            }

            // 进行世界转化，需要推送到渲染队列中，延迟到绘制前进行计算
            // 今后还会做dirty的判断，这样就可以更好的提高性能
            engine._matrixQueue.push(self._calMatrix, self);

            //遍历子节点
            for (var i = 0, l_i = c.length; i < l_i; i++) {
                var child = c[i];
                // 可见才可以继续进行转化
                if(child._nodeOpt.v) child._trans(engine);
            }

            if(layout){
                layout.onAfter(self);
            }

            nodeOpt.renderQueueRange[2] = renderQueue.length;
            if(nodeOpt.clip) renderQueue.push(self._restoreClip, self);
            nodeOpt.renderQueueRange[3] = renderQueue.length;
            if(touchable) touchQueue.push(self, 1);// 冒泡阶段入队列

        }

        /**
         * 绘制节点
         * @param ctx
         * @private
         */
        _draw(ctx:IRenderingContext2D, engine:Engine){
            var self = this, nodeOpt = self._nodeOpt;
            var matrix = nodeOpt.matrix;
            var drawInfo = nodeOpt.drawInfo;
            if(drawInfo[0] == 0) return;// 相当于不画
            else if (drawInfo[0] == 1) {// 使用转换
                ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                engine.transformed = true;
            }else if(engine.transformed){// 如果不使用转换，但是之前有使用过，需要先进行复位
                ctx.setTransform(1,0,0,1,0,0);
                engine.transformed = false;
            }
            // 开始渲染节点
            self._render(ctx, engine, drawInfo[1], drawInfo[2], drawInfo[3], drawInfo[4]);
        }
        /**
         * 渲染节点。
         * @param ctx
         * @private
         */
        _render(ctx:IRenderingContext2D, engine:Engine, x:number, y:number, w:number, h:number){
            // 子类在此实现真正的绘制
        }

        _drawDebug(ctx:IRenderingContext2D, engine:Engine){
            // 进行debug模式绘制
            var self = this, nodeOpt = self._nodeOpt;
            var matrix = nodeOpt.matrix;
            var drawInfo = nodeOpt.drawInfo;
            if(drawInfo[0] == 0) return;// 相当于不画
            else if (drawInfo[0] == 1) {// 使用转换
                ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                engine.transformed = true;
            }else if(engine.transformed){// 如果不使用转换，但是之前有使用过，需要先进行复位
                ctx.setTransform(1,0,0,1,0,0);
                engine.transformed = false;
            }
            var dx = drawInfo[1], dy = drawInfo[2], dw = drawInfo[3], dh = drawInfo[4];
            if(nodeOpt.debugRectColor) {
                ctx.fillStyle = nodeOpt.debugRectColor;
                ctx.fillRect(dx, dy, dw, dh);
            }
            ctx.strokeStyle = 'red';
            ctx.fillStyle = 'red';
            ctx.strokeRect(dx, dy, dw, dh);
            // 绘制锚点
            var ps = 1;
            ctx.fillRect(dx + dw*nodeOpt.ax - ps/2, dy + dh*nodeOpt.ay - ps/2, ps, ps);
            if(self.name) {
                ctx.font = '12px serif';
                ctx.textBaseline='middle';
                ctx.fillText(self.name, dx, dy + 6);
            }
        }

        /**
         * 计算世界转化
         * @private
         */
        _calMatrix(){
            var self = this;
            var nodeOpt = self._nodeOpt, parent = nodeOpt.parent;
            var matrix = nodeOpt.matrix;
            if(parent) {
                var pNodeOpt = parent._nodeOpt;
                var pm = pNodeOpt.matrix;
                matrix.identityMatrix(pm);
                nodeOpt.worldAlpha = pNodeOpt.worldAlpha * nodeOpt.alpha;
            }

            var offsetX = nodeOpt.w*nodeOpt.ax;
            var offsetY = nodeOpt.h*nodeOpt.ay;

            var hackMatrix = (<any>self).__hack_local_matrix;// TODO
            if (hackMatrix) {
                matrix.append(hackMatrix.a, hackMatrix.b, hackMatrix.c, hackMatrix.d, hackMatrix.tx, hackMatrix.ty);
                matrix.append(1, 0, 0, 1, -offsetX, -offsetY);
            }
            else {
                matrix.appendTransform(nodeOpt.x, nodeOpt.y, nodeOpt.sx, nodeOpt.sy, nodeOpt.r,
                    nodeOpt.skx, nodeOpt.sky, offsetX, offsetY);
            }
            //var scrollRect = do_props._scrollRect;
            //if (scrollRect) {
            //    worldTransform.append(1, 0, 0, 1, -scrollRect.x, -scrollRect.y);
            //}

//            if (this._texture_to_render){
//                var bounds:egret.Rectangle = DisplayObject.getTransformBounds(o._getSize(Rectangle.identity), o._worldTransform);
//                o._worldBounds.initialize(bounds.x, bounds.y, bounds.w, bounds.h);
//            }

            // 为了提高性能，对绘制时候时候的转换参数进行区别对待
            // 如果只有正数缩放并且没有旋转的话，就不采取setTransform的方式，因为setTransform很好性能
            var a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d, tx = matrix.tx, ty = matrix.ty;
            var x = 0, y = 0, w = nodeOpt.w, h = nodeOpt.h;
            var drawInfo:number[] = nodeOpt.drawInfo;
            drawInfo.length = 0;
            if(a == 0 && b == 0 && c == 0 && d == 0) {
                drawInfo.push(0);
                return;// 相当于不画
            }
            else if (b == 0 && c == 0 && a > 0 && d > 0) {
                x = tx;
                y = ty;
                w *= a;
                h *= d;
                drawInfo.push(2);
            }
            else {
                drawInfo.push(1);
            }
            drawInfo.push(x, y, w, h);
        }

        _runDtor(){
            // 节点的释放比较特殊，也需要走一次遍历

        }
    }
}
