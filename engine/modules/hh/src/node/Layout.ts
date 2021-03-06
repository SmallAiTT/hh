/**
 * Created by SmallAiTT on 2015/7/3.
 */
module hh{
    var _defArr = [0, 0, 0, 0];
    export class Layout extends Class{
        /** 相对布局类型： 0,1,2,10,11,12,20,21,22 */
        relativeType:number;
        /** 线性布局类型：0,1,2,-1,-2 */
        linearType:number;
        /** 尺寸模式：0,1,2 */
        sizeType:number;
        x:number;
        y:number;
        w:number;
        h:number;
        /** 线性累加值 */
        linearSum:number;
        /** 子节点累加总数 */
        linearTotal:number;
        margin:number[];
        padding:number[];

        //@override
        $resetOrRecycle() {
            super.$resetOrRecycle();
            var self = this;
            self.linearSum = 0;
            self.margin = resetArr(self.margin, _defArr);
            self.padding = resetArr(self.padding, _defArr);
        }

        // handle前处理
        onBefore(node:Node){
            var self = this;
            // 清空
            var linearType = self.linearType;
            if(linearType){
                var abs = Math.abs(linearType);// 1 或 2
                var rate = abs == 1 ? 1 : -1;
                var v1 = self.padding[abs - rate*linearType/abs];
                var v2 = self.padding[abs + rate*linearType/abs];
                self.linearSum = v1;
                self.linearTotal = v1 + v2;
                if(linearType < 0){
                    // 逆向的需要先统计子节点的尺寸
                    var children = node._nodeOpt.c;
                    for (var i = 0, l_i = children.length; i < l_i; i++) {
                        var child:Node = children[i];
                        var cNodeOpt = child._nodeOpt;
                        var cLayout = cNodeOpt.layout;
                        var margin = cLayout ? cLayout.margin : [0, 0, 0, 0];
                        self.linearTotal += margin[abs - rate*linearType/abs] + margin[abs + rate*linearType/abs];
                        self.linearTotal += linearType == -1 ? cNodeOpt.h : cNodeOpt.w;
                    }
                }
            }
        }

        // handle后处理（children已经被遍历了）
        onAfter(node:Node){
            var self = this;
            var linearType = self.linearType;
            var nodeOpt = node._nodeOpt;
            if(linearType){
                var abs = Math.abs(linearType);// 1 或 2
                var rate = abs == 1 ? 1 : -1;
                self.linearSum += self.padding[abs + rate*linearType/abs];
                var sum = self.linearSum;
                if(abs == 1) nodeOpt.h = sum;
                else nodeOpt.w = sum;
            }
            self.linearSum = 0;// 清空
            self.linearTotal = 0;// 清空
        }


        handle(node:Node){
            var nodeOpt = node._nodeOpt;
            var parent:Node = nodeOpt.parent;
            // 没有父亲就直接返回
            if(!parent) return;
            var self = this;
            var pOpt = parent._nodeOpt;
            var pl:Layout = pOpt.layout;
            // 当前布局的尺寸参数
            var width = nodeOpt.w, height = nodeOpt.h;
            // 父亲尺寸
            var pWidth = pOpt.w, pHeight = pOpt.h;
            // 相对布局类型
            var relativeType = self.relativeType || 0;
            // 第几行
            var row = relativeType/10 | 0;
            // 第几列
            var col = relativeType%10;
            var rx = pWidth*col/2, ry = pHeight*row/2;
            var pLinearType = pl ? pl.linearType : 0;
            // 相对布局
            nodeOpt.x = rx + (self.x || 0)*(1-col);
            nodeOpt.y = ry + (self.y || 0)*(1-row);


            if(pLinearType){
                var margin = self.margin;
                // 使用取巧方式计算index
                var abs = Math.abs(pLinearType);// 1 或 2
                var rate = abs == 1 ? 1 : -1;
                rate = rate*pLinearType/abs;
                var m1 = margin[abs - rate];
                var m2 = margin[abs + rate];

                // 父亲的子节点线性累加总值，只有逆向的时候才需要计算
                var linearTotal = pl.linearTotal;

                // 父亲的线性布局累加值计算
                pl.linearSum += m1;
                // 父亲设置成了线性布局
                if(pLinearType == 1){
                    // 垂直向下
                    nodeOpt.y = pl.linearSum + height*nodeOpt.ay;
                }else if(pLinearType == -1){
                    // 垂直向上
                    nodeOpt.y = linearTotal - pl.linearSum - height*(1-nodeOpt.ay);
                }else if(pLinearType == 2){
                    // 水平向右
                    nodeOpt.x = pl.linearSum + width*nodeOpt.ax;
                }else{
                    // 水平向左
                    nodeOpt.x = linearTotal - pl.linearSum - width*(1-nodeOpt.ax);
                }
                pl.linearSum += abs == 1 ? height : width;
                pl.linearSum += m2;
            }else{
                // 尺寸处理
                var lWidth = self.w, lHeight = self.h;
                if(self.sizeType == 1){
                    // 根据父亲百分比设置大小
                    if(lWidth != null){
                        nodeOpt.w = pWidth*lWidth/100;
                    }
                    if(lHeight != null){
                        nodeOpt.w = pHeight*lHeight/100;
                    }
                }else if(self.sizeType == 2){
                    // 根据父亲百分比进行缩放
                    if(lWidth != null){
                        nodeOpt.sx = pWidth*lWidth/100/width;
                    }
                    if(lHeight != null){
                        nodeOpt.sy = pHeight*lHeight/100/height;
                    }
                }
            }
        }
    }
}
