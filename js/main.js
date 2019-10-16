//markdown 格式简历正文
var markdownText1 = `
# 简历
## 教育经历
### 中南大学\t\t本科 \t信息管理与信息系统\t\t均分：88/100
* 全国大学生数学建模竞赛湖南省一等奖。
* 多次院级奖学金，校级“山河英才”奖学金，“恒鑫教育奖励金”。
* 优秀毕业生。
### 格拉斯哥大学\t\tMaster \t数据科学（Data Science）\tGPA：A5
* School of Computing Science: International Excellence Awards（计算机学院优秀国际学生奖学金）
## 项目经历
* Game Reviewer 游戏评论自动文本总结系统

该项目利用基于Python的Flask框架构建了一个网页应用。主要功能包括游戏评论的爬取、检索和总结。前端基于原生JavaScript&CSS，后台包括文本总结系统，爬虫系统，信息检索系统及数据库。前后端主要利用AJAX进行数据通信。文本总结系统从爬虫系统获取的Steam评论中，利用人工及自动标注算法标注了2000及20000条评论作为训练数据，分别训练了PointWise及PairWise两类共计7种排序学习模型。利用人工标注训练得到的最佳模型的NDCG@5超过了baseline模型183%，利用自动标数据训练得到的模型的ROUGE-1@5超过了baseline模型51%。文本总结系统可以将最有价值的句子自动选择出来自动构成一个摘要。信息检索系统调用了Terrier项目，实现了评论检索功能。数据库使用了MongoDB。


* [个人主页] (http://yufeichen.life)

利用原生JavaScript&CSS实现了loading界面，平滑跳转，动画，无缝轮播及留言板等功能。对移动端进行了适配。

* [涂鸦画板] (https://yufeicheniffy.github.io/canvasProject/index.html)
利用Canvas API实现了涂鸦画板，功能包括颜色及线条粗细选择、擦除、清空、保存及撤回。支持PC端及移动端。

* [动画简历] (https://yufeicheniffy.github.io/ResumeWithAnimation/)
利用原生JavaScript&CSS操作DOM演示了利用代码书写一个在线简历的过程。

* [FeiUI](https://github.com/yufeicheniffy/FeiUI) 造轮子项目，一个基于VUE的UI库

该项目参照 Framework7、Ant Design、Element UI、iView 等 UI 库思路，实现了一个基于 Vue 的简易 UI 组件库，目前已支持按钮、输入框、网格、布局、Toast、Tabs、Popover、手风琴等组件。每个组件均经历 Mocha 单元测试，并用 TravisCI 实现持续集成，最终以 VuePress 为基础制作官方文档，发布于 npmjs.org。

* [共享博客平台] (https://github.com/yufeicheniffy/ShareBlog)

该项目使用 Vue 实现了一个在线博客分享的平台。包含首页、用户文章列表、个人管理等页面，实现了登录、注册、编辑、发布等功能。项目使用 Grid 作页面布局，以 Vue CLI 为基础创建项目模版，使用 Less 作 CSS 预处理，引用 Element UI 作交互。通过 Vue Router 实现路由的跳转、异步加载、权限验证等，通过 vuex 实现状态管理，用 Axios 获取数据，并对接口进行了封装。

`

//code代码第一段
var codeTextS1 = `
/*
Hi, 我是陈宇飞。
单调的简历太千篇一律了，下面我将用代码写一份简历：）。
*/

/*首先准备一点基本样式。*/
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  transition: all 1s;
}
body{
  background:rgb(222,222,222);
  height:100vh;
}

/*代码需要高亮才清晰。*/
.token.selector{ color: #690;}
.token.property{ color: #905;}
.token.function{ color: #DD4A68;}
`
var codeTextS2 = `
/* 准备一张白纸*/
.container{
    width:50%;
    height:100%;
    position:fixed;
    }
#codeDisplay{
    margin:1em;
    padding:1em;
    height:100%;
    -webkit-transition: none;
    transition: none;
    -webkit-transform: rotateY(10deg) translateZ(-100px) ;
    transform: rotateY(10deg) translateZ(-100px) ;
    }
#paperContainer{
    right:1em;
}
#paper{
    background:white; 
    margin:1em;
    padding:2em;
    width:100%;
    height:100%;
    overflow: auto; 
    }
/*先用markdown格式录入，之后转换*/
`

mainProgram(10);

function mainProgram(timeout) {
    writeCode(codeTextS1, '', timeout).then(() => {
        preparePaper();
        return writeCode(codeTextS2, codeTextS1, timeout);
    }).then(() => {
        return writeMarkdown(markdownText1, timeout)
    })
}

// 将code写入animationStyle和codeDisplay
function writeCode(codeText, preCode, timeout) {
    return new Promise(function (resolve) {
        let n = 0;
        let clockId = setInterval(() => {
            n += 1;
            let animationStyle = document.getElementById('animationStyle');
            let codeDisplay = document.getElementById('codeDisplay');
            animationStyle.innerHTML += codeText.slice(n - 1, n);
            codeDisplay.innerHTML = Prism.highlight(preCode + codeText.slice(0, n), Prism.languages.css, 'css');
            codeDisplay.scrollTop = codeDisplay.scrollHeight;
            if (n >= codeText.length) {
                window.clearInterval(clockId);
                resolve();
            }
        }, timeout)
    })
}

//创建一张白纸
function preparePaper() {
    let paperContainer = document.createElement('div');
    let paperElement = document.createElement('pre');
    paperElement.id = 'paper';
    paperContainer.id = 'paperContainer';
    paperContainer.classList.add('container')
    paperContainer.appendChild(paperElement);
    document.body.appendChild(paperContainer);
}

//书写markdown
function writeMarkdown(markdownText, timeout) {
    return new Promise(function (resolve) {
        let n = 0;
        let paperElement = document.getElementById('paper');
        let clockId = setInterval(() => {
            n += 1;
            paperElement.innerHTML += Prism.highlight(markdownText.slice(n - 1, n), Prism.languages.markdown, 'markdown');
            if (n >= markdownText.length) {
                window.clearInterval(clockId);
                paperElement.innerHTML = markdownToHTML(markdownText);
                resolve();
            }
        }, timeout)

    })
}

function markdownToHTML(markdownText) {
    var converter = new showdown.Converter();
    return converter.makeHtml(markdownText);
}