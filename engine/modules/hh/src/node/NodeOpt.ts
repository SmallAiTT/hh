/**
 * Created by SmallAiTT on 2015/6/29.
 */
module hh{
    export class NodeOpt extends Class{

        _TargetClass:any;

        debug:boolean;
        debugRectColor:any;

        name:string;
        w:number;
        h:number;
        x:number;
        y:number;
        sx:number;
        sy:number;
        ax:number;
        ay:number;
        r:number;
        skx:number;
        sky:number;
        alpha:number;
        worldAlpha:number;
        zIndex:number;
        v:boolean;
        resizableByRes:boolean;// 是否根据资源自动调整大小，默认设置为true

        parent:Node;
        c:Node[];

        drawable:boolean;
        touchable:boolean;// 是否可点击，默认设置成不可点击，这样可以提升性能
        matrix:Matrix;

        layout:Layout;
        clip:Function;

        renderQueueRange:number[];

        drawInfo:number[];

        _initProp(){
            super._initProp();
            var self = this;
            self.c = [];
            self.renderQueueRange = [];
            self.drawInfo = [];
        }

        $resetOrRecycle(){
            var self = this;
            self.w = 0;
            self.h = 0;
            self.x = 0;
            self.y = 0;
            self.sx = 1;
            self.sy = 1;
            self.ax = 0.5;
            self.ay = 0.5;
            self.r = 0;
            self.skx = 0;
            self.sky = 0;
            self.alpha = 0;
            self.worldAlpha = 1;
            self.v = true;
            self.resizableByRes = true;
            self.drawable = false;
            self.matrix = new Matrix();
            self.c.length = 0;
            self.renderQueueRange.length = 0;
            self.drawInfo.length = 0;
        }
        $reset(key:string, NodeClass:any){
            super.$reset(key, NodeClass);
            var self = this;
            self._TargetClass = NodeClass;
            self.name = NodeClass.__n;
        }
    }
}
