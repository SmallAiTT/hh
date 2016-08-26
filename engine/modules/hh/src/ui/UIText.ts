/**
 * Created by SmallAiTT on 2015/7/7.
 */
module hh{
    var _canvas = document.createElement('canvas');
    _canvas.width = _canvas.height = 0;
    var _ctx = _canvas.getContext('2d');

    export class UIText extends Node{

        _textOpt:UITextOpt;

        //@override
        _initProp(){
            super._initProp();
            var self = this;
            self._nodeOpt.drawable = true;
            self._textOpt = new UITextOpt();
            self._setS(self._textOpt.size);
        }

        _setS(size:number){
            var self = this, textOpt = self._textOpt;
            textOpt.size = size;
            self.h = size;
            self._setText(textOpt.text);
        }
        set s(size:number){
            this._setS(size);
        }
        get s():number{
            return this._textOpt.size;
        }

        /**
         * 文本内容
         */
        _setText(text:any){
            var self = this, textOpt = self._textOpt;
            _ctx.font = textOpt.fontContent;
            textOpt.text = text;
            self.w = _ctx.measureText(text).width;
        }
        public set text(text:any){
            this._setText(text);
        }
        public get text():any{
            return this._textOpt.text;
        }


        // @override
        _render(ctx:IRenderingContext2D, engine:Engine, x:number, y:number, width:number, height:number){
            var self = this, textOpt = self._textOpt;
            ctx.fillStyle = textOpt.color;
            ctx.font = textOpt.fontContent;
            ctx.textBaseline='middle';
            ctx.fillText(textOpt.text, x, y + height/2);
        }

    }
}
