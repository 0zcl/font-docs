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


## 面试三
问：0.1+0.2等于0.3吗? 为什么？ 实际工作中会导致什么BUG? 怎么解决？

答：
https://juejin.cn/post/6927217000112455687


## 面试四
问：实现一：点击li，alert出当前li的内容
```html
  <ul id="test">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  </ul>
```

答：
```js
const ulDom = document.getElementById('test')
ulDom.addEventListener('click', function(e) {
  alert(e.target.innerText)
})
```

问：实现二：点击li，alert出当前li的索引

答：
```js
const ulDom = document.getElementById('test')
ulDom.addEventListener('click', function(e) {
  const liLists = [...document.getElementsByTagName('li')]
  alert(liLists.indexOf(e.target))
})
```

## 面试五
问：add(2) = 2   add(2)(2)(2) = 6     add(3)(3) = 6实现一个类似这样的函数

答：
```js
function add(oldNum) {
  let sum = oldNum
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
技巧：<code>当打印函数时，实际上会执行函数的toString方法</code>

