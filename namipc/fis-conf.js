/**
 * @file 使用 fis3 做开发打包工具
 *
 * 开发部署命令
 * fis3 server start
 *
 * dev: fis3 release dev -cwLr ./src
 * online1: fis3 release online -cwr ./src -d ./output-src/
 *
 * 每次执行online命令时提前删除 output-src 文件夹,因为每次js和css的文件名都会更新
 *
 */

// 指定模块化加载方案为 mod.js
// 需要安装依赖 npm install -g fis3-hook-module
fis.hook('module', {
    mode: 'commonJs'
});

// 自动加载 js 文件
// 需要安装依赖 npm install -g fis3-postpackager-loader
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true // 资源映射表内嵌
    })
});


fis.match('/mod/**.js', {
    isMod: true
});

// 模拟 pure 开启同名依赖
// fis.match('/mod/**', {
//     useSameNameRequire: true
// });

/* default */
fis.media('dev')
    .match('*.js', {
        // optimizer: fis.plugin('uglify-js')
    })
    .match('*.{css,less}', {
        // optimizer: fis.plugin('clean-css')
    })
    /*.match('*.{less,css}', {
     packTo: 'main.css'
     })*/
    .match('*.less', {
        parser: fis.plugin('less'),
        rExt: '.css'
    })
    .match('*.png', {
        // fis-optimizer-png-compressor 插件进行压缩，已内置
        optimizer: fis.plugin('png-compressor')
    })
    .match('/{js,css}/*.{js,css,less}', {
        useHash: true
    })
    .match('*.{jpg,png,gif}', {
        useHash: true
    });

fis.media('online')
    .match('*', {
        // domain: ''
    })
    .match('*.js', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('*.{css,less}', {
        optimizer: fis.plugin('clean-css')
    })
    /*.match('*.{less,css}', {
     packTo: 'main.css'
     })*/
    .match('*.less', {
        parser: fis.plugin('less'),
        rExt: '.css'
    })
    .match('*.png', {
        // fis-optimizer-png-compressor 插件进行压缩，已内置
        optimizer: fis.plugin('png-compressor')
    })
    .match('/{js,css}/*.{js,css,less}', {
        useHash: true
    })
    .match('*.{jpg,png,gif}', {
        useHash: true
    });