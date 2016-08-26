/**
 * Created by smallaitt on 20/8/16.
 */
module hh {


    var _OWNER_ON:string = 'on';
    var _OWNER_ON_NT:string = 'onNextTick';
    var _OWNER_ONCE:string = 'once';
    var _OWNER_ONCE_NT:string = 'onceNextTick';
    var _OWNER_ON_ASYNC:string = 'onAsync';
    var _OWNER_ONCE_ASYNC:string = 'onceAsync';

    var _emittersNextTick:Emitter[] = [];
    var _tempEmittersNextTick:Emitter[] = [];
    var _tempEmitters:Emitter[] = [];
    var _tempEventArr:any = [];
    var _tempArgsArr:any = [];
    export class Emitter extends Class{

        /**
         * 监听某个事件。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        on(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.add(_OWNER_ON, event, listener, ctx, null);
            return self;
        }

        /**
         * 通过优先级进行事件监听注册。通过emit触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        onPriority(event:string, priority:number, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.add(_OWNER_ON, event, listener, ctx, priority);
            return self;
        }

        /**
         * 监听某个事件。可以注册多个。通过emit触发。（异步模式，listener的第一个传参为异步需要执行的cb）
         * @param event
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        onAsync(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.add(_OWNER_ON_ASYNC, event, listener, ctx, null);
            return self;
        }

        /**
         * 通过优先级进行事件监听注册。通过emit触发。（异步模式，listener的第一个传参为异步需要执行的cb）
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        onAsyncPriority(event:string, priority:number, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.add(_OWNER_ON_ASYNC, event, listener, ctx, priority);
            return self;
        }

        /**
         * 监听某个事件，在下一帧执行。可以注册多个。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        onNextTick(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.add(_OWNER_ON_NT, event, listener, ctx, null);
            return self;
        }

        /**
         * 通过优先级进行事件监听注册。通过emitNextTick触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        onPriorityNextTick(event:string, priority:number, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.add(_OWNER_ON_NT, event, listener, ctx, priority);
            return self;
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        once(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.add(_OWNER_ONCE, event, listener, ctx, null);
            return self;
        }

        /**
         * 通过优先级进行事件监听注册。通过emit触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        oncePriority(event:string, priority:number, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.add(_OWNER_ONCE, event, listener, ctx, priority);
            return self;
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        onceAsync(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.add(_OWNER_ONCE_ASYNC, event, listener, ctx, null);
            return self;
        }

        /**
         * 通过优先级进行事件监听注册。通过emit触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        onceAsyncPriority(event:string, priority:number, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.add(_OWNER_ONCE_ASYNC, event, listener, ctx, priority);
            return self;
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        onceNextTick(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.add(_OWNER_ONCE_NT, event, listener, ctx, null);
            return self;
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emitNextTick触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        oncePriorityNextTick(event:string, priority:number, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.add(_OWNER_ONCE, event, listener, ctx, priority);
            return self;
        }

        /**
         * 注册单个监听，每次都被最新注册的替换。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        single(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.addSingle(_OWNER_ON, event, listener, ctx);
            return self;
        }

        /**
         * 注册单个监听，每次都被最新注册的替换。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        singleAsync(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.addSingle(_OWNER_ON_ASYNC, event, listener, ctx);
            return self;
        }

        /**
         * 注册单个监听，每次都被最新注册的替换。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        singleNextTick(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.addSingle(_OWNER_ON_NT, event, listener, ctx);
            return self;
        }

        /**
         * 移除事件监听。
         * @param event
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        un(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.del(_OWNER_ON, event, listener, ctx);
            return self;
        }

        /**
         * 移除下一帧类型的事件监听。
         * @param event
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        unNextTick(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.del(_OWNER_ON_NT, event, listener, ctx);
            return self;
        }

        /**
         * 移除一次性的事件监听。
         * @param event
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        unOnce(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.del(_OWNER_ONCE, event, listener, ctx);
            return self;
        }

        /**
         * 移除下一帧执行的一次性的监听。
         * @param event
         * @param listener
         * @param ctx
         * @returns {hh.Emitter}
         */
        unOnceNextTick(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.del(_OWNER_ONCE_NT, event, listener, ctx);
            return self;
        }

        /**
         * 移除单个类型的事件监听。
         * @param event
         * @returns {hh.Emitter}
         */
        unSingle(event:string):Emitter {
            var self = this;
            self._store.delSingle(_OWNER_ON, event);
            return self;
        }

        /**
         * 移除单个类型的并且是下一帧执行类型的事件监听。
         * @param event
         * @returns {hh.Emitter}
         */
        unSingleNextTick(event:string):Emitter {
            var self = this;
            self._store.delSingle(_OWNER_ON_NT, event);
            return self;
        }

        /**
         * 移除所有立即执行类型的事件监听。
         * 如果arguments.length == 0 那么就表示移除所有监听。
         * 如果arguments.length == 1 那么就表示移除指定类型的所有监听。
         * @param event
         * @returns {hh.Emitter}
         */
        unAll(event?:string):Emitter {
            var self = this;
            var l = arguments.length;
            var arr = [_OWNER_ON, _OWNER_ONCE];
            var store = self._store;
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var owner = arr[i];
                if (l == 0) {
                    store.delAll(owner);
                } else {
                    store.delAll(owner, event);
                }
            }
            return self;
        }

        /**
         * 移除所有下一帧执行类型的事件监听。
         * 如果arguments.length == 0 那么就表示移除所有监听。
         * 如果arguments.length == 1 那么就表示移除指定类型的所有监听。
         * @param event
         * @returns {hh.Emitter}
         */
        unAllNextTick(event?:string):Emitter {
            var self = this;
            var arr = [_OWNER_ON_NT, _OWNER_ONCE_NT];
            var l = arguments.length;
            var store = self._store;
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var owner = arr[i];
                if (l == 0) {
                    store.delAll(owner);
                } else {
                    store.delAll(owner, event);
                }
            }
            return self;
        }

        // 对注册的监听信息列表进行事件分发
        _emitArr(owner:string, event:string, arr, args:any[]) {
            if (arr) {
                var self = this;
                arr = arr instanceof Array ? arr : [arr];// 如果不是数组则转成数组
                if (arr.length == 0) return;// 没有内容直接返回
                var tempArgs = self._store.getTempArgs(owner, event, args);// 获取模板参数，避免污染
                tempArgs.push(event);//事件类型放在倒数第二位置
                tempArgs.push(self);//发送者放在最后一个位置
                for (var i = 0, l_i = arr.length; i < l_i; i++) {
                    var info = arr[i];// 获取监听信息
                    var listener = info.listener;// 监听方法
                    if (listener) {
                        listener.apply(info.ctx, tempArgs);
                    }
                }
                arr.length = 0;//清空引用
                tempArgs.length = 0;//清空参数
            }
        }

        /**
         * 立即发射事件。
         * @param event
         * @param args
         * @returns {hh.Emitter}
         */
        emit(event:string, ...args):Emitter {
            var self = this, store = self._store, single, tempArr;
            //实例级别的注册
            //先执行单个的
            single = store.getSingle(_OWNER_ON, event);
            self._emitArr(_OWNER_ON, event, single, args);
            //再执行一次性的
            tempArr = store.getTempArr(_OWNER_ONCE, event);
            store.clear(_OWNER_ONCE, event);//进行清除
            self._emitArr(_OWNER_ONCE, event, tempArr, args);
            //最后执行多次的
            tempArr = store.getTempArr(_OWNER_ON, event);
            self._emitArr(_OWNER_ON, event, tempArr, args);

            //类级别的注册
            store = self.__c._store;
            //先执行单个的
            single = store.getSingle(_OWNER_ON, event);
            self._emitArr(_OWNER_ON, event, single, args);
            //再执行一次性的
            tempArr = store.getTempArr(_OWNER_ONCE, event);
            store.clear(_OWNER_ONCE, event);//进行清除
            self._emitArr(_OWNER_ONCE, event, tempArr, args);
            //最后执行多次的
            tempArr = store.getTempArr(_OWNER_ON, event);
            self._emitArr(_OWNER_ON, event, tempArr, args);

            return self;
        }

        /**
         * 立即发射事件。
         * @param event
         * @param args
         * @returns {hh.Emitter}
         */
        emitAsync(event:string, onEnd:Function, ctx:any, ...args):Emitter {
            var self = this, store = self._store, single, tempArr;
            var arr = [];

            //实例级别的注册
            //先执行单个的
            single = store.getSingle(_OWNER_ON_ASYNC, event);
            if (single) arr.push(arr);
            //再执行一次性的
            tempArr = store.getTempArr(_OWNER_ONCE_ASYNC, event);
            if (tempArr) {
                for (var i = 0, l_i = tempArr.length; i < l_i; i++) {
                    arr.push(tempArr[i]);
                }
            }
            store.clear(_OWNER_ONCE_ASYNC, event);//进行清除
            //最后执行多次的
            tempArr = store.getTempArr(_OWNER_ON_ASYNC, event);
            if (tempArr) {
                for (var i = 0, l_i = tempArr.length; i < l_i; i++) {
                    arr.push(tempArr[i]);
                }
            }

            //类级别的注册
            store = self.__c._store;
            //先执行单个的
            single = store.getSingle(_OWNER_ON_ASYNC, event);
            if (single) arr.push(arr);
            //再执行一次性的
            tempArr = store.getTempArr(_OWNER_ONCE_ASYNC, event);
            if (tempArr) {
                for (var i = 0, l_i = tempArr.length; i < l_i; i++) {
                    arr.push(tempArr[i]);
                }
            }
            store.clear(_OWNER_ONCE_ASYNC, event);//进行清除
            //最后执行多次的
            tempArr = store.getTempArr(_OWNER_ON_ASYNC, event);
            if (tempArr) {
                for (var i = 0, l_i = tempArr.length; i < l_i; i++) {
                    arr.push(tempArr[i]);
                }
            }

            var tempArgs:any[] = [null].concat(args);
            tempArgs.push(event);
            tempArgs.push(self);
            var asyncPool = new hh.AsyncPool(arr, 0, function (info, index, cb1) {
                tempArgs[0] = cb1;
                info.listener.apply(info.ctx, tempArgs);
            }, onEnd, ctx);
            asyncPool.flow();

            return self;
        }

        /**
         * 在下一帧才发射事件。而且，发射的事件只会发射最后调用emitNextTick的那次。
         * @param event
         * @param args
         * @returns {hh.Emitter}
         */
        emitNextTick(event:string, ...args):Emitter {
            var self = this;
            self._store.setValue(_OWNER_ON_NT, event, args);
            if (_emittersNextTick.indexOf(self) < 0) _emittersNextTick.push(self);
            return self;
        }

        /**
         * 同时进行emit和emitNextTick事件分发
         * @param event
         * @param args
         * @returns {hh.Emitter}
         */
        emitBoth(event:string, ...args):Emitter{
            var self = this;
            self.emit.apply(self, arguments);
            self.emitNextTick.apply(self, arguments);
            return self;
        }


        //++++++++++++++++++++++++++++++静态方法 开始+++++++++++++++++++++++++++++++++

        static _store:Store = new Store();


        /**
         * 监听某个事件。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static on(event:string, listener:Function, ctx?:any):any {
            return this.prototype.on.apply(this, arguments);
        }

        /**
         * 通过优先级进行事件监听注册。通过emit触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         */
        static onPriority(event:string, priority:number, listener:Function, ctx?:any):any {
            return this.prototype.onPriority.apply(this, arguments);
        }

        /**
         * 监听某个事件。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static onAsync(event:string, listener:Function, ctx?:any):any {
            return this.prototype.onAsync.apply(this, arguments);
        }

        /**
         * 通过优先级进行事件监听注册。通过emit触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         */
        static onAsyncPriority(event:string, priority:number, listener:Function, ctx?:any):any {
            return this.prototype.onAsyncPriority.apply(this, arguments);
        }

        /**
         * 监听某个事件，在下一帧执行。可以注册多个。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static onNextTick(event:string, listener:Function, ctx?:any):any {
            return this.prototype.onNextTick.apply(this, arguments);
        }

        /**
         * 通过优先级进行事件监听注册。通过emitNextTick触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         */
        static onPriorityNextTick(event:string, priority:number, listener:Function, ctx?:any):any {
            return this.prototype.onPriorityNextTick.apply(this, arguments);
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static once(event:string, listener:Function, ctx?:any):any {
            return this.prototype.once.apply(this, arguments);
        }

        /**
         * 通过优先级进行一次性事件监听注册。通过emit触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         */
        static oncePriority(event:string, priority:number, listener:Function, ctx?:any):any {
            return this.prototype.oncePriority.apply(this, arguments);
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static onceAsync(event:string, listener:Function, ctx?:any):any {
            return this.prototype.onceAsync.apply(this, arguments);
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static onceAsyncPriority(event:string, priority:number, listener:Function, ctx?:any):any {
            return this.prototype.onceAsyncPriority.apply(this, arguments);
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static onceNextTick(event:string, listener:Function, ctx?:any):any {
            return this.prototype.onceNextTick.apply(this, arguments);
        }

        /**
         * 通过优先级注册一次性监听，触发了就移除。可以注册多个。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static oncePriorityNextTick(event:string, priority:number, listener:Function, ctx?:any):any {
            return this.prototype.oncePriorityNextTick.apply(this, arguments);
        }

        /**
         * 注册单个监听，每次都被最新注册的替换。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static single(event:string, listener:Function, ctx?:any):any {
            return this.prototype.single.apply(this, arguments);
        }

        /**
         * 注册单个监听，每次都被最新注册的替换。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static singleAsync(event:string, listener:Function, ctx?:any):any {
            return this.prototype.singleAsync.apply(this, arguments);
        }

        /**
         * 注册单个监听，每次都被最新注册的替换。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static singleNextTick(event:string, listener:Function, ctx?:any):any {
            return this.prototype.singleNextTick.apply(this, arguments);
        }

        /**
         * 移除事件监听。
         * @param event
         * @param listener
         * @param ctx
         */
        static un(event:string, listener:Function, ctx?:any):any {
            return this.prototype.un.apply(this, arguments);
        }

        /**
         * 移除下一帧类型的事件监听。
         * @param event
         * @param listener
         * @param ctx
         */
        static unNextTick(event:string, listener:Function, ctx?:any):any {
            return this.prototype.unNextTick.apply(this, arguments);
        }

        /**
         * 移除一次性的事件监听。
         * @param event
         * @param listener
         * @param ctx
         */
        static unOnce(event:string, listener:Function, ctx?:any):any {
            return this.prototype.unOnce.apply(this, arguments);
        }

        /**
         * 移除下一帧执行的一次性的监听。
         * @param event
         * @param listener
         * @param ctx
         */
        static unOnceNextTick(event:string, listener:Function, ctx?:any):any {
            return this.prototype.unOnceNextTick.apply(this, arguments);
        }

        /**
         * 移除单个类型的事件监听。
         * @param event
         */
        static unSingle(event:string):any {
            return this.prototype.unSingle.apply(this, arguments);
        }

        /**
         * 移除单个类型的并且是下一帧执行类型的事件监听。
         * @param event
         */
        static unSingleNextTick(event:string):any {
            return this.prototype.unSingleNextTick.apply(this, arguments);
        }

        /**
         * 移除所有立即执行类型的事件监听。
         * 如果arguments.length == 0 那么就表示移除所有监听。
         * 如果arguments.length == 1 那么就表示移除指定类型的所有监听。
         * @param event
         */
        static unAll(event?:string):any {
            return this.prototype.unAll.apply(this, arguments);
        }

        /**
         * 移除所有下一帧执行类型的事件监听。
         * 如果arguments.length == 0 那么就表示移除所有监听。
         * 如果arguments.length == 1 那么就表示移除指定类型的所有监听。
         * @param event
         */
        static unAllNextTick(event?:string):any {
            return this.prototype.unAllNextTick.apply(this, arguments);
        }

    }

    // 为下一帧事件进行分发
    var _emit4NextTick = function () {
        _tempEmittersNextTick.length = 0;// 每次都会先将之前缓存的列表删除掉，确保引用清除
        if (_emittersNextTick.length > 0) {
            // 将信息转移到缓存列表中
            for (var i = 0, l_i = _emittersNextTick.length; i < l_i; i++) {
                var emitter = _emittersNextTick[i];
                var store = emitter._store;
                var map = store.valuePool[_OWNER_ON_NT];
                for (var eventKey in map) {
                    _tempEmitters.push(emitter);
                    _tempEventArr.push(eventKey);
                    _tempArgsArr.push(map[eventKey]);
                    delete map[eventKey];//当前帧已经可以清除了
                }

            }
            _emittersNextTick.length = 0;// 清空了

            // 开始进行分发
            for (var i = 0, l_i = _tempEmitters.length; i < l_i; i++) {
                var emitter:Emitter = _tempEmitters[i];
                var event:string = _tempEventArr[i];
                var args = _tempArgsArr[i];

                var single, tempArr;
                //先执行单个的
                single = store.getSingle(_OWNER_ON_NT, event);
                emitter._emitArr(_OWNER_ON_NT, event, single, args);
                //再执行一次性的
                tempArr = store.getTempArr(_OWNER_ONCE_NT, event);
                store.clear(_OWNER_ONCE_NT, event);//进行清除
                emitter._emitArr(_OWNER_ONCE_NT, event, tempArr, args);
                //最后执行多次的
                tempArr = store.getTempArr(_OWNER_ON_NT, event);
                emitter._emitArr(_OWNER_ON_NT, event, tempArr, args);

                //类级别的注册
                store = emitter.__c._store;
                //先执行单个的
                single = store.getSingle(_OWNER_ON_NT, event);
                emitter._emitArr(_OWNER_ON_NT, event, single, args);
                //再执行一次性的
                tempArr = store.getTempArr(_OWNER_ONCE_NT, event);
                store.clear(_OWNER_ONCE_NT, event);//进行清除
                emitter._emitArr(_OWNER_ONCE_NT, event, tempArr, args);
                //最后执行多次的
                tempArr = store.getTempArr(_OWNER_ON_NT, event);
                emitter._emitArr(_OWNER_ON_NT, event, tempArr, args);
            }
            _tempEmitters.length = 0;
            _tempEventArr.length = 0;
            _tempArgsArr.length = 0;
        }
    };

    export class Engine extends Emitter {
        /** 循环事件，外部不要轻易使用，而是通过hh.tick进行注册 */
        static __TICK:string = '__tick';
        /** 下一帧执行事件，外部不要轻易使用，而是通过hh.nextTick进行注册 */
        static __NEXT_TICK:string = '__nextTick';
        /** 计算裁剪相关 */
        static __CAL_CLIP:string = '__calClip';
        /** 区域擦除事件，外部不要轻易使用 */
        static __CLEAR_RECT:string = '__clearRect';
        /** 绘制之后的循环，外部不要轻易使用 */
        static __TICK_AFTER_DRAW:string = '__tickAfterDraw';
        /** 处理点击事件，外部不要轻易使用 */
        static __HANDLE_TOUCH:string = '_handleTouch';
        /** 绘制帧率，外部不要轻易使用 */
        static __DRAW_FPS:string = '__drawFPS';
        /** 初始化引擎，外部不要轻易使用 */
        static __INIT_CTX:string = '__initCtx';

        /** 配置文件初始化后监听 */
        static AFTER_CFG:string = 'afterCfg';
        /** 引擎初始化后监听 */
        static AFTER_CTX:string = 'afterCtx';
        /** 启动后监听 */
        static AFTER_BOOT:string = 'afterBoot';

        /** 开始时间戳 */
        _startTime:number;
        /** 上一次时间戳 */
        _time:number;xxx
        /** requestAnimationFrameId */
        _reqAniFrameId:number;
        /** 主循环是否已经执行 */
        _isMainLooping:boolean;
        /** canvas对象 */
        _canvas:any;
        /** canvas对应的context，注意这个不一定是最终的renderContext，因为引擎中还可能会根据具体需求定义renderContext */
        canvasCtx:IRenderingContext2D;
        /** 判断引擎是否已经初始化完毕 */
        isCtxInited:boolean;

        /** 点击事件处理队列，里面的格式为：[node0,0,node1,0,node1,1,node0,1]，其中0表示下传，1表示冒泡 */
        _touchQueue:any[];
        /** 矩阵计算队列 */
        _matrixQueue:any[];
        /** 裁剪计算队列 */
        _clipQueue:any[];
        /** 渲染命令队列 */
        _renderQueue:any[];

        /** 舞台，由具体实现传递 */
        stage:any;
        design:any;
        transformed:boolean;

        __fpsInfo:any;

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            // 矩阵队列，存放模式一定是[listener1, ctx1, listener2, ctx2, ...]
            self._matrixQueue = [];
            // 裁剪队列，存放模式一定是[listener1, ctx1, listener2, ctx2, ...]
            self._clipQueue = [];
            // 渲染队列，存放模式一定是[listener1, ctx1, listener2, ctx2, ...]
            self._renderQueue = [];
            // 设计分辨率
            self.design = {width:0, height:0};
            self.__fpsInfo = {
                // 次数
                count : 0,
                frameTime : 0,
                fps : 60,
                draw : 0,
                drawCount : 0,

                transCostCount : 0,// 主循环转换开销次数
                matrixCostCount : 0,// 矩阵换算开销次数
                clipCostCount : 0,// 裁剪计算开销次数
                renderCostCount : 0,// 渲染开销次数
                touchCostCount : 0,// 点击开销次数

                transCost : 0,// 主循环转换开销
                matrixCost : 0,// 矩阵换算开销
                clipCost : 0,// 裁剪开销
                renderCost : 0,// 渲染开销
                touchCost : 0 // 点击开销
            };
        }

        //执行主循环
        /*
         主循环主要进行以下逻辑操作
         进行nextTick的事件分发
         进行tick的事件分发
         进行节点的转换
         进行矩阵换算
         进行裁剪的计算
         进行上下文的擦除
         进行节点渲染
         进行绘制后事件分发
         进行点击事件分发
         进行下一帧分发
         绘制fps
         */
        run(){
            var self = this, clazz = self.__c;
            //设置开始时间
            self._startTime = Date.now();
            self._time = 0;
            self._isMainLooping = false;
            var _mainLoop = function () {
                var fpsInfo = self.__fpsInfo;
                // nextTick相关事件的分发
                if(self._isMainLooping) _emit4NextTick();
                self._isMainLooping = true;
                var curTime = Date.now() - self._startTime;
                var deltaTime = curTime - self._time;
                // 主循环tick传时间差
                self.emit(clazz.__TICK, deltaTime);
                // 如果舞台已经初始化好了，就可以开始进行转化了
                var d1 = Date.now();
                if(self.stage) self.stage._trans(self);
                var d2 = Date.now();

                // 执行矩阵换算
                var matrixQueue = self._matrixQueue;
                while(matrixQueue.length > 0){
                    var calFunc = matrixQueue.shift();//命令方法
                    var calFuncCtx = matrixQueue.shift();//命令上下文
                    calFunc.call(calFuncCtx, engine);
                }
                var d3 = Date.now();

                self.emit(clazz.__CAL_CLIP, self._clipQueue);
                var d4 = Date.now();

                // 进行上下文绘制区域擦除
                var ctx = self.canvasCtx;
                if(ctx){
                    self.emit(clazz.__CLEAR_RECT, ctx);
                    // 进行主渲染
                    var queue = self._renderQueue;
                    while(queue.length > 0){
                        var cmd = queue.shift();//命令方法
                        var cmdCtx = queue.shift();//命令上下文
                        if(cmd) cmd.call(cmdCtx, ctx, self);
                    }
                    // 主循环tick传时间差
                    self.emit(clazz.__TICK_AFTER_DRAW, deltaTime);
                }
                var d5 = Date.now();
                // 点击处理放在绘制完之后，这样可以使得坐标转换使用_trans之后获得的矩阵，可以提高性能
                self.emit(clazz.__HANDLE_TOUCH, deltaTime);
                var d6 = Date.now();
                // 进行下一帧分发
                self.emitNextTick(clazz.__NEXT_TICK);


                if(ctx){
                    fpsInfo.count++;
                    fpsInfo.frameTime += deltaTime;
                    fpsInfo.transCostCount += d2 - d1;
                    fpsInfo.matrixCostCount += d3 - d2;
                    fpsInfo.clipCostCount += d4 - d3;
                    fpsInfo.renderCostCount += d5 - d4;
                    fpsInfo.touchCostCount += d6 - d5;
                    var count = fpsInfo.count;
                    if(count == 10){
                        fpsInfo.fps = Math.round(count*1000/fpsInfo.frameTime);
                        fpsInfo.draw = Math.round(fpsInfo.drawCount/count);
                        fpsInfo.transCost = Math.round(fpsInfo.transCostCount/count);
                        fpsInfo.matrixCost = Math.round(fpsInfo.matrixCostCount/count);
                        fpsInfo.clipCost = Math.round(fpsInfo.clipCostCount/count);
                        fpsInfo.renderCost = Math.round(fpsInfo.renderCostCount/count);
                        fpsInfo.touchCost = Math.round(fpsInfo.touchCostCount/count);

                        fpsInfo.count = 0;
                        fpsInfo.frameTime = 0;
                        fpsInfo.drawCount = 0;
                        fpsInfo.transCostCount = 0;
                        fpsInfo.matrixCostCount = 0;
                        fpsInfo.clipCostCount = 0;
                        fpsInfo.renderCostCount = 0;
                        fpsInfo.touchCostCount = 0;
                    }
                    self.emit(clazz.__DRAW_FPS, ctx, fpsInfo);
                }

                self._reqAniFrameId = requestAnimationFrame(_mainLoop);
                self._time = curTime;
            };
            _mainLoop();
        }

        /**
         * 初始化canvas
         * @private
         */
        _initCanvas(){
            var self = this;
            var canvasId = CFG.canvas;
            var canvas:any = self._canvas = canvasId ? document.getElementById(canvasId) : document.getElementsByTagName('canvas')[0];
            var design = self.design;
            var w = design.width = CFG.design.width;
            var h = design.height = CFG.design.height;
            if(!canvas) throw '请添加canvas元素！';
            canvas.width = w;
            canvas.height = h;
            self.canvasCtx = canvas.getContext('2d');
        }
    }

    // 引擎主循环tick的触发器，内部使用
    export var engine:Engine = new Engine();

    export function tick(listener:Function, ctx?:any) {
        engine.on(Engine.__TICK, listener, ctx);
    }

    export function unTick(listener:Function, ctx?:any) {
        engine.un(Engine.__TICK, listener, ctx);
    }

    export function nextTick(listener:Function, ctx?:any) {
        engine.onceNextTick(Engine.__NEXT_TICK, listener, ctx);
    }

    export function unNextTick(listener:Function, ctx?:any) {
        engine.unOnceNextTick(Engine.__NEXT_TICK, listener, ctx);
    }

    // js加载完之后处理
    var _onAfterJs = function(cb?:Function){
        // 启动主循环，但事实上，绘制的主循环还没被注册进去
        engine.run();
        // 加载完js之后，首先先加载配置文件，这样才能保证引擎相关初始化能够直接通过配置文件读取
        CFG.load(function(){
            var titleEle = document.getElementsByTagName('title')[0];
            if(titleEle){
                titleEle.innerHTML = hh.CFG.appName;
            }else{
                titleEle = document.createElement('title');
                titleEle.innerHTML = hh.CFG.appName;
                document.getElementsByTagName('head')[0].appendChild(titleEle);
            }

            // 进行日志初始化
            LOG.initByConfig(CFG);

            // 分发配置文件加载后监听
            engine.emit(Engine.AFTER_CFG);
            // 分发异步方式的配置文件加载后监听
            engine.emitAsync(Engine.AFTER_CFG, function(){
                //初始化canvas相关
                engine._initCanvas();
                // 分发引擎初始化监听，此时进行引擎的初始化操作
                engine.emit(Engine.__INIT_CTX);
                // 分发引擎初始化后监听
                engine.emit(Engine.AFTER_CTX);
                // 分发异步方式的引擎初始化后监听
                engine.emitAsync(Engine.AFTER_CTX, function(){
                    // 分发启动后监听
                    engine.emit(Engine.AFTER_BOOT);
                    // 分发异步方式的启动后监听
                    engine.emitAsync(Engine.AFTER_BOOT, function(){
                        if(cb) cb();
                    }, null);
                }, null);
            }, null);
        });
    };

    export function boot(cb?:Function){
        _onAfterJs(cb);
    }
}