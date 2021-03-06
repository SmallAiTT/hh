/**
 * Created by SmallAiTT on 2015/7/1.
 */
module tc{
    unit.curModuleName = moduleName_ui;

    unit.addMenuItem('UIImg#load', function(){
        hh.UIImg.debug = true;
        var url = res_helper.getItemUrl(11001);

        var img1 = new hh.UIImg();
        img1.x = img1.y = 150;
        img1.load(url);

        hh.engine.stage.add(img1);

        var img2 = new hh.UIImg();
        img2.x = img2.y = 300;
        img2.load(url);

        hh.engine.stage.add(img2);
    });

    unit.addMenuItem('UIImg#bcsh', function(){
        hh.UIImg.debug = true;
        var url = res_helper.getItemUrl(11001);
        var img = new hh.UIImg();
        img.x = img.y = 150;
        img.load(url);

        img.setBCSH(5, 5, 5, 5);

        hh.engine.stage.add(img);
    });

    unit.addMenuItem('UIImg-缩放', function(){
        hh.UIImg.debug = true;
        var url = res_helper.getItemUrl(11001);
        hh.R.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.w, h = stage.h;
            var img = new hh.UIImg();
            img.x = 0;
            img.y = 0;
            img.ax = img.ay = 0;
            img.load(url);
            img.sx = img.sy = 0.5;
            stage.add(img);
        });

    });

    unit.addMenuItem('UIImg-数量测试100', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.R.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.w, h = stage.h;
            for(var i = 0; i < 100; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.load(url);
                stage.add(img);
            }
        });

    });

    unit.addMenuItem('UIImg-数量测试200', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.R.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.w, h = stage.h;
            for(var i = 0; i < 200; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.load(url);
                stage.add(img);
            }
        });

    });
    unit.addMenuItem('UIImg-数量测试400', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.R.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.w, h = stage.h;
            for(var i = 0; i < 400; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.load(url);
                stage.add(img);
            }
        });

    });
    unit.addMenuItem('UIImg-数量测试600', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.R.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.w, h = stage.h;
            for(var i = 0; i < 600; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.load(url);
                stage.add(img);
            }
        });

    });
    unit.addMenuItem('UIImg#clip-区域测试', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.R.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var node:hh.Node = new hh.Node();
            node.w = node.h = 100;
            node.x = node.y = 200;
            node.r = Math.PI/4;
            node.clip = hh.Node.CLIP_RECT;
            stage.add(node);

            var img = new hh.UIImg();
            img.x = img.y = 0;
            img.load(url);
            node.add(img);

            var img = new hh.UIImg();
            img.r = Math.PI/4;
            img.sx = 0.5;
            img.x = img.y = 200;
            img.load(url);
            node.add(img);
        });

    });
    unit.addMenuItem('UIImg#clip-数量2000(无clip)', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.R.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.w, h = stage.h;
            for(var i = 0; i < 2000; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.load(url);
                stage.add(img);
            }
        });

    });
    unit.addMenuItem('UIImg-clip-数量2000', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.R.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var node:hh.Node = new hh.Node();
            node.w = node.h = 100;
            node.x = node.y = 200;
            node.clip = hh.Node.CLIP_RECT;
            stage.add(node);
            var w = stage.w, h = stage.h;
            for(var i = 0; i < 2000; ++i){
                var randX = w*(Math.random()) - w/2;
                var randY = h*(Math.random()) - h/2;
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.load(url);
                node.add(img);
            }
        });

    });

    unit.addMenuItem('UIImg#grid-3宫格', function(){
        hh.UIImg.debug = true;
        var url = res_helper.getS9gUrl(1);

        // 水平模式
        var img1 = new hh.UIImg();
        img1.x = img1.y = 150;
        // 3表示三宫格模式，然后是x,w，最后第四位如果为0或者不填表示水平方向
        img1.grid = [3, 39, 2];
        img1.w = 200;
        img1.h = 100;
        img1.load(url);

        hh.engine.stage.add(img1);

        // 垂直模式
        var img2 = new hh.UIImg();
        img2.x = img2.y = 150;
        // 3表示三宫格模式，然后是y,h，最后第四位1表示垂直方向
        img2.grid = [3, 39, 2, 1];
        img2.w = 100;
        img2.h = 200;
        img2.load(url);

        hh.engine.stage.add(img2);
    });

    unit.addMenuItem('UIImg#grid-9宫格', function(){
        hh.UIImg.debug = true;
        var url = res_helper.getS9gUrl(1);
        var img1 = new hh.UIImg();
        img1.x = img1.y = 150;
        img1.grid = [9, 39, 39, 2, 2];
        img1.w = img1.h = 200;
        img1.load(url);

        hh.engine.stage.add(img1);
    });


    unit.addMenuItem('UIImg#grid-12宫格', function(){
        hh.UIImg.debug = true;
        var url = res_helper.getS9gUrl(1);
        var img1 = new hh.UIImg();
        img1.x = img1.y = 150;
        img1.grid = [12, 15, 15, 2];
        img1.w = 200;
        img1.h = 200;
        img1.load(url);

        hh.engine.stage.add(img1);
    });
    
    unit.addMenuItem('UIImg#grid-16宫格', function(){
        hh.UIImg.debug = true;
        var url = res_helper.getS9gUrl(2);
        var img1 = new hh.UIImg();
        img1.x = img1.y = 150;
        img1.grid = [16, 15, 15];
        img1.w = 200;
        img1.h = 200;
        img1.load(url);

        hh.engine.stage.add(img1);
    });

    unit.addMenuItem('UIImg#grid-9宫格-400', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getS9gUrl(1);
        hh.R.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.w, h = stage.h;
            for(var i = 0; i < 400; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.grid = [9, 39, 39, 2, 2];
                img.w = img.h = 240;
                img.resizableByRes = false;
                img.load(url);
                stage.add(img);
            }
        });

    });
}
