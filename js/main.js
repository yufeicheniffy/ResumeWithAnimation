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
#codeDisplay{ 
    position:fixed; 
    width:50%; 
    height:100%;
    margin:1em;
    }
#paperContainer{
    width:50%;
    height:100%;
    position:fixed;
    right:0;
}
#paper{
    background:white; 
    margin:1em;
    width:100%;
    height:100%;
    }
/**/
`

mainProgram();

function mainProgram() {
    writeCode(codeTextS1, '', () => {
        preparePaper();
        writeCode(codeTextS2, codeTextS1, () => {
        })
    });
}


// 将code写入animationStyle和codeDisplay
function writeCode(codeText, preCode, callBack) {

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
            callBack();
        }
    }, 10)
}

//创建一张白纸
function preparePaper() {
    let paperContainer = document.createElement('div');
    let paperElement = document.createElement('div');
    paperElement.id = 'paper';
    paperContainer.id = 'paperContainer';
    paperContainer.appendChild(paperElement);
    document.body.appendChild(paperContainer);
}
