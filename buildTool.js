/**
 * Created by smallaitt on 16/5/16.
 */
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var UglifyJS = require('uglify-js');


var baseDir = __dirname;

function handleModule(tsconfig, moduleName){
    if(!handleModule1(tsconfig, 'modules', moduleName)){
        handleModule1(tsconfig, 'frameworks', moduleName);
    }
}
function handleModule1(tsconfig, rootDir, moduleName){
    var modulePath = path.join(baseDir, rootDir, moduleName);
    if(!fs.existsSync(modulePath)) return false;
    var mjPath = path.join(modulePath, 'module.json');
    if(fs.existsSync(mjPath)){
        var mj = require(mjPath);
        handleMJModules(tsconfig, mj);
    }
    var moduleDTsPath = '../../' + rootDir + '/' + moduleName + '/bin/' + moduleName + '.d.ts';
    if(tsconfig.files.indexOf(moduleDTsPath) < 0) tsconfig.files.push(moduleDTsPath);
    return true;
}

function handleMJModules(tsconfig, json){
    var modules = json.modules || [];
    for (var i = 0, l_i = modules.length; i < l_i; i++) {
        var moduleName = modules[i];
        handleModule(tsconfig, moduleName);
    }
}

exports.genTsConfig = function(moduleDir){
    var moduleName = path.basename(moduleDir);

    var tsconfig = {
        "compilerOptions": {
            "target": "es5",
            "module": "amd",
            "listFiles": true,
            "declaration": true,
            "outFile" : "bin/" + moduleName + '.js'
        },
        "files": [
        ]
    };

    var moduleJson = require(path.join(moduleDir, 'module'));
    handleMJModules(tsconfig, moduleJson);


    var files = moduleJson.files || [];
    var root = moduleJson.root || '';
    root = root == '' ? '' : (root[root.length - 1] == '/' ? root : (root+'/'));
    for (var i = 0, l_i = files.length; i < l_i; i++) {
        var fileName = files[i];
        tsconfig.files.push(root + fileName);
    }

    fs.writeFileSync(path.join(moduleDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 4));

};

exports.build = function(moduleDir, opt){
    opt = opt || {};
    baseDir = path.join(moduleDir, '../../');
    exports.genTsConfig(moduleDir);

    process.chdir(moduleDir);
    exec('tsc', function(err, info, standarInfo){
        if(err) {
            console.error(err);
            console.log(info);
            console.log(standarInfo);
            if(opt.cb) opt.cb(err);
            return;
        }
        if(!opt.logDisabled){
            console.log(info);
            console.log(standarInfo);
        }
        if(opt.cb) opt.cb();
    });
};

function getModules(moduleName, arr){
    var moduleDir = path.join(__dirname, 'modules', moduleName);
    if(!fs.existsSync(moduleDir)) return;// 模块不在modules里面的不处理
    var moduleJson = require(path.join(moduleDir, 'module.json'));
    var modules = moduleJson.modules || [];
    for (var i = 0, l_i = modules.length; i < l_i; i++) {
        getModules(modules[i], arr);
    }
    if(arr.indexOf(moduleName) < 0) arr.push(moduleName);
}

function mini(){
    console.log('\ndoing mini...\n');
    var modulesDir = path.join(__dirname, 'modules');
    var moduleNames = fs.readdirSync(modulesDir);
    for (var i = 0, l_i = moduleNames.length; i < l_i; i++) {
        var moduleName = moduleNames[i];
        var binPath = path.join(modulesDir, moduleName, 'bin');
        var jsPath = path.join(binPath, moduleName + '.js');
        if(fs.existsSync(jsPath)){
            console.log(moduleName, 'mining...');
            var result = UglifyJS.minify([jsPath]);
            fs.writeFileSync(path.join(binPath, moduleName + '.min.js'), result.code);
            console.log(moduleName, 'mini successful!');
            console.log('---------------------');
        }
    }
}
exports.buildAll = function(){
    var modules = [];
    var modulesDir = path.join(__dirname, 'modules');
    var files = fs.readdirSync(modulesDir);
    for (var i = 0, l_i = files.length; i < l_i; i++) {
        var fileName = files[i];
        if(fs.existsSync(path.join(modulesDir, fileName, 'module.json'))) modules.push(fileName);
    }
    var arr = [];
    for (var i = 0, l_i = modules.length; i < l_i; i++) {
        var moduleName = modules[i];
        getModules(moduleName, arr);
    }
    var async = require('async');
    async.mapLimit(arr, 1, function(moduleName, cb){
        console.log(moduleName, 'building...');
        exports.build(path.join(__dirname, 'modules', moduleName), {cb:function(err){
            if(err){
                console.error(moduleName, 'failed!');
            }else{
                console.log(moduleName, 'successful!');
            }
            console.log('---------------------');
            cb(err);
        }, logDisabled:true})
    }, function(err){
        if(err) console.error(err)
        else{
            mini();
        }
    });
};