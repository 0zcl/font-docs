## 面试一
```html
<ul id="test">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```
问：实现 点击li，alert出当前li的内容

答：
```js
  const container = document.getElementById('test')
  container.addEventListener('click', e => {
    console.log(e, e.target, e.target.innerText)
    alert(e.target.innerText)
  })

  // container.onclick = function(e) {
  //   console.log(e, e.target, e.target.innerText)
  //   alert(e.target.innerText)
  // }

```

再问：实现 点击li，alert出当前li的索引
```js
const container = document.getElementById('test')
container.addEventListener('click', e => {
  const allLiTag = [...document.getElementsByTagName('li')]
  alert(allLiTag.indexOf(e.target))
})
```

## 面试二
问： add(2)(2)(2) = 6     add(3)(3) = 6实现一个类似这样的函数

答：
```js
function addNum(sum) {
  const fn = (newNum) => {
    sum += newNum
    return fn
  }
  fn.toString = () => {
    return sum
  }
  return fn
}
```
打印函数时会自动调用 toString()方法

![toString](@assets/basic/1.png)
