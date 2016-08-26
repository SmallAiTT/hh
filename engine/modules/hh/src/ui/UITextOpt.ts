/**
 * Created by SmallAiTT on 2015/7/1.
 */
module hh{
    export class UITextOpt extends Class{
        text:string;
        _font:string;
        _size:number;
        _fontContentTemp:string;
        fontContent:string;
        color:any;

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self._font = 'serif';
            self._size = 18;
            self._fontContentTemp = '%spx %s';
            self.fontContent = hh.STR.format(self._fontContentTemp, self._size, self._font);
            self.color = 'red';
        }

        set size(size:number){
            var self = this;
            self._size = size;
            self.fontContent = hh.STR.format(self._fontContentTemp, self._size, self._font);
        }
        get size():number{
            return this._size;
        }

        set font(font:string){
            var self = this;
            self._font = font;
            self.fontContent = hh.STR.format(self._fontContentTemp, self._size, self._font);
        }
        get font():string{
            return this._font;
        }

    }
}
