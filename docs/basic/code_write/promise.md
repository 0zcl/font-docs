问：Promise 解决了什么问题？

答：解决了多个异步请求嵌套过多，嵌套地狱问题；Promise把嵌套调用改为链式调用

问：Promise 中是如何实现回调函数返回值穿透的？

答: Promise.prototype.then方法返回的是一个新的Promise实例，因此可以采用链式写法，即then方法后面再调用另一个then方法。

问：Promise 出错后，是怎么通过“冒泡”传递给最后那个捕获异常的函数？

答：Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。
1. 被.then的第二个回调函数捕获取。
2. 被.catch捕获。.catch()实际上是.then(null, rejection)或.then(undefined, rejection)的别名
```js
// 1. 被catch捕获
new Promise((resolve, reject) => {
    throw Error('abc')
}).then(res => {
    console.log('res', res)
}).catch(e => {
    console.log('e', e)
})
// e Error: abc

// 2. 被.then的第二个回调函数捕获取
new Promise((resolve, reject) => {
    throw Error('abc')
}).then(
res => {
    console.log('res', res)
},
error => {
    console.log('error', error)
}
).catch(e => {
    console.log('e', e)
})
// error Error: abc
```

## 生成器Generator
helloWorldGenerator是一个生成器函数。调用 Generator 函数后，会返回一个[迭代器(遍历器)](./for_of.md)
```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

hw.next() // { value: 'hello', done: false }
hw.next() // { value: 'world', done: false }
hw.next() // { value: 'ending', done: true }
hw.next() // { value: undefined, done: true }
```
即然helloWorldGenerator()返回的是一个迭代器，那就可以用for...of
```js
for (item of helloWorldGenerator()) {
  console.log(item)
}
// hello
// world
```
:::tip
一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的`ending`，不包括在for...of循环之中
:::

### next方法的参数
yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
```js
function* gen(x) {
  var y = yield new Promise((resolve, reject) => {
    resolve(444)
    })
    console.log('y', y)
  return y;
}

var g = gen(1);
// 测试一
g.next() // {value: Promise, done: false}
// y undefined  yield表达式本身没有返回值
g.next() // {value: undefined, done: true}

// 测试二
g.next() // {value: Promise, done: false}
g.next('zcl')
// y zcl
{value: 'zcl', done: true}
```


## co与Generator
先说下异步编程的发展历史：
1. 回调函数：回调地狱。多个回调函数嵌套问题
2. Promise：将回调函数的嵌套，改成链式调用。代码冗余，代码看上去有一堆then
3. Generator生成器：yield表达式是暂停执行的标记，而next方法可以恢复执行
* 遇到yield表达式，就暂停执行后面的操作，并将yield后面表达式的值，作为返回对象的value值
4. co模块：用于自动执行 Generator 函数。当异步操作有了结果，能够自动交回执行权
```js
// co源码是下面自动执行器的扩展
function run(gen) {
  const g = gen()
  const next = data => {
    const result = g.next(data)
    if (result.done) return result.value
    result.value.then(res => next(res))
  }
  next()
}

// 测试
function* gen(x) {
  var y = yield new Promise((resolve, reject) => {
    resolve(444)
    })
    console.log('y', y)
  return y;
}

run(gen)
// y 444
```
5. async/await：async函数是Generator的语法糖。相当于生成器的*号，换成async; yield换成await。async/await相比生成器，有以下三点改进：
* async函数内置执行器。不用像Generator需要调next, 或者用co来执行
* 适用性更好。<code>co</code>+<code>Generator</code>方案，yield后面只能是Thunk函数(暂不了解。。)或Promise对象; 而async函数的await后面，除了Promise对象还可以是原始数据类型的值(Number, String, Array..., 会自动转成立即 resolved 的 Promise 对象)
* async函数返回值是Promise对象 

## 对async/await的理解以及内部原理
async/await的理解：见上面第5点


## 手写async函数
```js
// 测试用例
function getData() {
  return new Promise(resolve => {
    setTimeout(() => resolve('zcl'), 1000)
  })
}

async function test() {
  const data = await getData()
  console.log('data', data)
  const data2 = await getData()
  console.log('data2', data2)
  return 'success'
}
test().then(res => console.log('res', res))

// 输出
// data zcl
// data2 zcl
// res success
```
手写async函数

```js
function* test() {
  const data = yield getData()
  console.log('data', data)
  const data2 = yield getData()
  console.log('data2', data2)
  return 'success'
}

function generatorToAsync(genFunc) {
  return function() {  // 1. 返回方法
    return new Promise((resolve, reject) => {  // 2. 返回Promise
      const gen = genFunc() // 生成器对象
      const next = data => {
        const result = gen.next(data)
        if (result.done) return resolve(result.value)
        Promise.resolve(result.value).then(  // 3. await后面是原始类型，会返回状态为resolve的Promise对象
          res => next(res),
          error => reject(error)
        )
      }
      next()
    })
  }
}

const myAsync = generatorToAsync(test)
myAsync().then(res => console.log('res', res))

// 输出
// data zcl
// data2 zcl
// res success
```
思路：
1. async函数是 Generator + 自动执行器
2. async函数返回Promise对象
3. await后面是原始类型，会返回状态为resolve的Promise对象


## 手写Promise


## 手写promise.all

## 题一
```js
new Promise(resolve=>resolve())
  .then(() => console.log(1))
  .then(() => console.log(2))
  .then(() => console.log(3))

new Promise(resolve=>resolve())
  .then(() => console.log(4))
  .then(() => console.log(5))
  .then(() => console.log(6))
```
答案：1 4 2 5 3 6

* Promise.prototype.then() 会隐式返回一个新 Promise

## 题二
```js
// https://juejin.cn/post/6973817105728667678#heading-8
setTimeout(() => {
  console.log('0');
}, 0)
new Promise((resolve, reject) => {
  console.log('1');
  resolve();
}).then(() => {
  console.log('2');
  new Promise((resolve, reject) => {
    console.log('3');
    resolve();
  }).then(() => {     // 📌
    console.log('4');
  }).then(() => {
    console.log('5');
  })
}).then(() => {
  console.log('6');   // 📌
})

new Promise((resolve, reject) => {
  console.log('7');
  resolve()
}).then(() => {        
  console.log('8');
})
```
代码分析：
```js
1. 先执行同步代码
2. setTimeout 为宏任务，先不执行
3. new Promise里的代码作为同步代码，要执行 console.log('1'); 而then作为微任务，先不执行
4. 又是一个new Promise,所以和第三步同理。只执行 console.log('7');
5. 开始执行异步代码
6. 执行第一个new Promise里的then 即console.log('2');以及new Promise的同步代码 console.log('3');
7. 这步有点意思，这里不是执行console.log('4'); 而是执行console.log('8'); 
8. 注释为📌的两个then是同层级的，所以按照执行顺序来打印
9. 执行第三个层级的then，所有微任务代码完成
10. 执行宏任务代码，即console.log('0');

代码结果：1 7 2 3 8 4 6 5 0
```
## 题三
```js
let v = new Promise(resolve => {
    console.log("v-begin"); // 1
    resolve("v-then");
});
// 1、new Promise(resolve => resolve(v))
new Promise(resolve => resolve(v))
// 2、Promise.resolve(v)
// Promise.resolve(v)
.then((v) => {
    console.log(v) // 5
});

new Promise(resolve => {
    console.log(1); // 2
    resolve();
})
.then(() => {
    console.log(2); // 3
})
.then(() => {
    console.log(3); // 4
})
.then(() => {
    console.log(4); // 6
});
```
1. 使用new Promise(resolve => resolve(v))，输出: v-begin 1 2 3 v-then 4
* 按照输出可以看出微任务队列如下：[ console.log(2) -> console.log(3) -> console.log(v) -> console.log(4) ]
2. 使用Promise.resolve(v)，输出：v-begin 1 v-then 2 3 4
* 按照输出可以看出微任务队列如下：[ console.log(v) -> console.log(2) -> console.log(3) -> console.log(4) ]

Promise.resolve(v)，参数v是一个 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
* 按照输出可以看出微任务队列如下：[ console.log(v) -> console.log(2) -> console.log(3) -> console.log(4) ]

new Promise(resolve => resolve(v)) v为promise对象时，then会推迟两个时序
```js
// Promise里的resolve() 
// 1 2 3 v-then 4 可以发现then推迟了两个时序
// 推迟原因：浏览器会创建一个 PromiseResolveThenableJob 去处理这个 Promise 实例，这是一个微任务。
// 等到下次循环到来这个微任务会执行，也就是PromiseResolveThenableJob 执行中的时候，因为这个Promise 实例是fulfilled状态，所以又会注册一个它的.then()回调
// 又等一次循环到这个Promise 实例它的.then()回调执行后，才会注册下面的这个.then(),于是就被推迟了两个时序
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
// 等价于
function async1(){
  console.log('async1 start')
  return new Promise(resolve => resolve(async2()))
    .then(() => {
      console.log('async1 end')
    });
}
// 等价于
function async1() {
  console.log('async1 start');
  const p = async2();
  return new Promise((resolve) => {
    Promise.resolve().then(() => {
      p.then(resolve)
    })
  })
  .then(() => {
    console.log('async1 end') // 推迟了两个时序
  });
}
```

## 题四
* async修饰的函数必定返回一个 Promise 对象；
* async修饰的函数若没有返回值时，Promise的resolve方法会传递一个undefined值；
* async修饰的函数若有返回值时，Promise的resolve方法会传递这个值；
* async修饰的函数若抛出异常，Promise的reject方法会传递这个异常值；
```js
async function add(){}
add().then(res=>console.log(res))
// 等价于
// Promise.resolve().then(res=>console.log(res))
// undefined

async function add(){
	return 1 
}
add().then(res=>console.log(res))
// 等价于
// Promise.resolve(1).then(res=>console.log(res))
// 1

```
```js
console.log('script start')

async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
    return Promise.resolve().then(()=>{
        console.log('async2 end1')
    })
}
async1()

setTimeout(function() {
    console.log('setTimeout')
})

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
.then(function() {
    console.log('promise1')
})
.then(function() {
    console.log('promise2')
})
.then(function() {
    console.log('promise3')
})
Promise.resolve().then(function() {
    console.log('promise4')
})

console.log('script end')

```
答案： script start -> async2 end -> Promise -> script end -> async2 end1 -> promise1 -> promise4 -> promise2 -> async1 end -> promise3 -> setTimeout

## 题五
Await 规范的更新: await v 在语义上将等价于 Promise.resolve(v)，而不再是现在的 new Promise(resolve => resolve(v))

```js
console.log('script start') // 1

async function async1() {
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2') // 2
}

/*
function async1(){
  console.log('async1 start');
  async2().then(() => {
    console.log('async1 end')
  })
}
    
function async2(){
  console.log('async2');
  return Promise.resolve();
}
*/

async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
.then(function() {
  console.log('promise1')
})
.then(function() {
  console.log('promise2')
})

console.log('script end')
```
答案：async1 start -> async2 -> Promise -> script end -> async1 end -> promise1 -> promise2 -> setTimeout


参考：
[async函数的实现原理](https://es6.ruanyifeng.com/#docs/async#async-%E5%87%BD%E6%95%B0%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
<!-- [BAT前端经典面试问题：史上最最最详细的手写Promise教程](https://juejin.cn/post/6844903625769091079)
[面试官：“你能手写一个 Promise 吗”](https://zhuanlan.zhihu.com/p/183801144)
[关于async/await、promise和setTimeout的执行顺序](https://juejin.cn/post/6968815596393725983)

[令人费解的 async/await 执行顺序](https://juejin.cn/post/6973817105728667678#heading-2)

[从一道面试题解读Promise/async/await执行顺序](https://juejin.cn/post/6941023062833758222#heading-0)
[async await 和 promise微任务执行顺序问题](https://segmentfault.com/q/1010000016147496)
[面试题：说说事件循环机制(满分答案来了)](https://mp.weixin.qq.com/s?__biz=MzI0MzIyMDM5Ng==&mid=2649826653&idx=1&sn=9e5e2de78a8ef4de3820769ff3ab7c02&chksm=f175ef9ec60266880a86f33085ff43f95e3180846c5f139cb9b1b33c3245201157f39d949e9a&scene=21#wechat_redirect) -->