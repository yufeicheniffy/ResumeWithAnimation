//简历正文
var markdownText1=`
# 简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
这是我的简历
`

mainProgram(10);

function mainProgram(timeout) {
    writeCode(codeTextS1, '',timeout).then(() => {
        preparePaper();
        return writeCode(codeTextS2,codeTextS1,timeout);
    }).then(()=>{return writeMarkdown(markdownText1,timeout)})
}

//code
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
    }
#paperContainer{
    right:1em;
}
#paper{
    background:white; 
    margin:1em;
    padding:1em;
    width:100%;
    height:100%;
    }
/**/
`

// 将code写入animationStyle和codeDisplay
function writeCode(codeText, preCode,timeout) {
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
function writeMarkdown(markdownText,timeout){
    return new Promise(function (resolve) {
        let n=0;
        let paperElement=document.getElementById('paper');
        let clockId=setInterval(()=>{
            n+=1;
            paperElement.innerHTML+=Prism.highlight(markdownText.slice(n-1,n), Prism.languages.markdown, 'markdown');
            if(n>=markdownText.length){
                window.clearInterval(clockId);
                paperElement.innerHTML=markdownToHTML(markdownText);
                resolve();
            }
        },timeout)

    })
}
function markdownToHTML(markdownText) {
    var converter = new showdown.Converter();
    return  converter.makeHtml(markdownText);
}