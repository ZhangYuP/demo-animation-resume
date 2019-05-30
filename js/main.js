/* 把 code 写到 #code 和 style 标签里 */
function writeCode(prefix, code, fn){
  let domCode = document.querySelector('#code')
  domCode.innerHTML = prefix || ''
  let n = 0
  let id = setInterval(()=>{
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css, 'css')
    styleTag.innerHTML = prefix + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight 
    if(n >= code.length){
      window.clearInterval(id)
      fn && fn.call()
    }
  },10)
}

function writeMarkdown(markdown, fn){
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(()=>{
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight 
    if(n >= markdown.length){
      window.clearInterval(id)
      fn && fn.call()
    }
  },30)
}


var result1 = `/*
 * 面试官你好，我是XXX
 * 我将以动画的形式来介绍我自己
 * 只用文字介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

*{
  transition: all 1s;
}
html{
  background: #EEE;
  font-size: 16px;
}
#code{
  border: 1px solid #999;
  padding: 16px;
}

/* 我需要一点代码高亮 */

.token.comment{
  color: slategray;
}
.token.selector{
  color: #690;
}
.token.property{
  color: #905;
}
.token.punctuation{
  color: #999;
}
.token.function{
  color: #DD4A68;
}

/* 加一个呼吸效果 */

#code{
  animation: breath 0.5s infinite alternate-reverse;
}

/* 加点 3D 效果 */

#code-wrapper{
  -webkit-perspective: 1500px;
}
#code{
  transform: rotateY(15deg);
}


/* 不玩了，我来介绍一下我自己吧 */

/* 我需要一张白纸 */

#code-wrapper{
  position: fixed;
  left: 0;
  width: 50%;
  height: 100%;
}

#paper > .content{
  display: block;
}
`

var result2 = `
/* 好了，现在我可以在纸上写字了 */
`

var result3 = `
/* 接下来把 Markdown 变成 HTML */
`

var result4 = `
/* 这就是我的会动的简历 */

/* 谢谢观看 */
`

var md = `
# 自我介绍

我叫 XXX
1992 年 4 月出生
XXX 学校毕业
自学前端一年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式

- QQ xxxxxxxxx
- Email xxxxxxxxxxxxxxx
- 手机 xxxxxxxxxxx
`

writeCode('', result1, ()=>{
  createPaper(()=>{
    writeCode(result1, result2, ()=>{
      writeMarkdown(md, ()=>{
        writeCode(result1 + result2, result3, ()=>{
          markdownToHtml(md, ()=>{
            writeCode(result1 + result2 + result3, result4)
          })
        })
      })
    })
  })
})

function createPaper(fn){
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function markdownToHtml(markdown, fn){
  var html = document.querySelector('#paper>.content')
  html.innerHTML = marked(markdown)
  html.className = 'content markdown-body'
  fn && fn.call()
}