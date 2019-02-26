<!--
    create : 田鹏伟 2019-01-12
    desc : 富文本编辑器
-->
<template>
    <div>
        <vue-ueditor-wrap ref="ueditor"  v-model="content" :destroy="false" :config="config" @ready="ready" @beforeInit="addCustomUI"></vue-ueditor-wrap>
    </div>
</template>

<script>
    import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
    export default {
        name : 'Ueditor',
        data() {
            return {
                 content: '',
                 config: {
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 600,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                    serverUrl: location.origin+'/api/file/fileImgUpload',
                    // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                    // UEDITOR_HOME_URL: '/static/UEditor/'
                    // 配合最新编译的资源文件，你可以实现添加自定义Request Headers,详情https://github.com/HaoChuan9421/ueditor/commits/dev-1.4.3.3
                    // headers: {
                    //   access_token: '37e7c9e3fda54cca94b8c88a4b5ddbf3'
                    // }
                }
            }
        },
        props : {
            htmlCon : '',
            field : ''
        },
        components : {
            VueUeditorWrap
        },
        watch : {
            content(val) {
                this.$emit('bindData',val,this.field);
            }
        },
        created() {
            
        },
        mounted() {
            if(this.htmlCon.length > 0) {
                this.content = this.htmlCon;
            }
            console.log('富文本内容',this.htmlCon);
        },
        methods : {
            ready (editorInstance) {
                //console.log(`实例${editorInstance.key}已经初始化:`, editorInstance)
            },
            addCustomUI (editorId, editorConfig) {
                console.log(editorId + '的配置参数是:', JSON.stringify(editorConfig, null, 2))

                // 1. 自定义按钮
                window.UE.registerUI('test-button' + editorId, function (editor, uiName) {
                    // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
                    editor.registerCommand(uiName, {
                    execCommand: function () {
                        // editor.execCommand('inserthtml', `<span style="color: #${editorId.substr(-3)};">这是一段由自定义按钮添加的文字，你点击的编辑器ID是${editorId}</span>`)
                    }
                    })

                    // 创建一个 button
                    var btn = new window.UE.ui.Button({
                    // 按钮的名字
                    name: uiName,
                    // 提示
                    title: '鼠标悬停时的提示文字',
                    // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
                    cssRules: "background-image: url('/static/test-button.png') !important;background-size: cover;",
                    // 点击时执行的命令
                    onclick: function () {
                        // 这里可以不用执行命令，做你自己的操作也可
                        editor.execCommand(uiName)
                    }
                    })

                    // 当点到编辑内容上时，按钮要做的状态反射
                    editor.addListener('selectionchange', function () {
                    var state = editor.queryCommandState(uiName)
                    if (state === -1) {
                        btn.setDisabled(true)
                        btn.setChecked(false)
                    } else {
                        btn.setDisabled(false)
                        btn.setChecked(state)
                    }
                    })

                    // 因为你是添加 button，所以需要返回这个 button
                    return btn
                }, 0 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)

                // 2. 自定义表格居中按钮
                window.UE.registerUI('table-center-button' + editorId, function (editor, uiName) {
                    // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
                    editor.registerCommand(uiName, {
                    execCommand: function () {
                        var tables = editor.document.querySelectorAll('table')
                        if (tables.length) {
                        tables.forEach((table) => {
                            table.style.margin = '0 auto'
                        })
                        } else {
                        editor.trigger('showmessage', {
                            content: '没有表格',
                            timeout: 2000
                        })
                        }
                    }
                    })

                    // 创建一个 button
                    var btn = new window.UE.ui.Button({
                    // 按钮的名字
                    name: uiName,
                    // 提示
                    title: '点击设置表格居中',
                    // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
                    cssRules: "background-image: url('/static/center.png') !important;background-size: cover;",
                    // 点击时执行的命令
                    onclick: function () {
                        // 这里可以不用执行命令，做你自己的操作也可
                        editor.execCommand(uiName)
                    }
                    })

                    // 当点到编辑内容上时，按钮要做的状态反射
                    editor.addListener('selectionchange', function () {
                    var state = editor.queryCommandState(uiName)
                    if (state === -1) {
                        btn.setDisabled(true)
                        btn.setChecked(false)
                    } else {
                        btn.setDisabled(false)
                        btn.setChecked(state)
                    }
                    })

                    // 因为你是添加 button，所以需要返回这个 button
                    return btn
                }, 1 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)

                // 3. 自定义弹窗
                window.UE.registerUI('test-dialog' + editorId, function (editor, uiName) {
                    // 创建 dialog
                    var dialog = new window.UE.ui.Dialog({
                    // 指定弹出层中页面的路径，这里只能支持页面，路径参考常见问题 2
                    iframeUrl: '/static/customizeDialogPage.html',
                    // 需要指定当前的编辑器实例
                    editor: editor,
                    // 指定 dialog 的名字
                    name: uiName,
                    // dialog 的标题
                    title: '这是一个自定义的 Dialog 浮层',
                    // 指定 dialog 的外围样式
                    cssRules: 'width:600px;height:300px;',
                    // 如果给出了 buttons 就代表 dialog 有确定和取消
                    buttons: [
                        {
                        className: 'edui-okbutton',
                        label: '确定',
                        onclick: function () {
                            dialog.close(true)
                        }
                        },
                        {
                        className: 'edui-cancelbutton',
                        label: '取消',
                        onclick: function () {
                            dialog.close(false)
                        }
                        }
                    ]
                    })

                    // 参考上面的自定义按钮
                    var btn = new window.UE.ui.Button({
                    name: 'dialog-button',
                    title: '鼠标悬停时的提示文字',
                    cssRules: `background-image: url('/static/test-dialog.png') !important;background-size: cover;`,
                    onclick: function () {
                        // 渲染dialog
                        dialog.render()
                        dialog.open()
                    }
                    })

                    return btn
                }, 2 /* 指定添加到工具栏上的那个位置，默认时追加到最后 */, editorId /* 指定这个UI是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)
                }
        }

    }
</script>

<style>
    .edui-default .edui-toolbar{
        line-height:20px;
    }
</style>