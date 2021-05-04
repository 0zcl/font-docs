## 事件循环

## 浏览器中的事件循环
JavaScript代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列(task queue)来搞定另外一些代码的执行。整个执行过程，我们称为事件循环过程。一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。任务队列又分为macro-task（宏任务）与micro-task（微任务）

macro-task大概包括：
* script(整体代码)
* setTimeout
* setInterval
* setImmediate
* I/O
* UI render

micro-task大概包括:
* process.nextTick
* Promise
* Async/Await(实际就是promise)
* MutationObserver(html5新特性)

流程图: 

![evenloop](@assets/basic/4.png)

### 总结
执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环

### async/await执行顺序
```js
console.log('script start')

async function async1() {
await async2()
console.log('async1 end')
}
async function async2() {
console.log('async2 end')
}
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
chrome优化了,await变得更快了.

如果await 后面直接跟的为一个变量，比如：await 1；
这种情况的话相当于直接把await后面的代码注册为一个微任务，可以简单理解为promise.then(await下面的代码)。然后跳出async1函数，执行其他代码，当遇到promise函数的时候，会注册promise.then()函数到微任务队列，注意此时微任务队列里面已经存在await后面的微任务。所以这种情况会先执行await后面的代码（async1 end），再执行async1函数后面注册的微任务代码(promise1,promise2)

执行顺序：
script start -> async2 end -> Promise -> script end -> async1 end -> promise1 -> promise2 -> setTimeout


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

如果await后面跟的是一个异步函数的调用

此时执行完awit并不先把await后面的代码注册到微任务队列中去，而是执行完await之后，直接跳出async1函数，执行其他代码。然后遇到promise的时候，把promise.then注册为微任务。其他代码执行完毕后，需要回到async1函数去执行剩下的代码，然后把await后面的代码注册到微任务队列当中，注意此时微任务队列中是有之前注册的微任务的。所以这种情况会先执行async1函数之外的微任务(promise1,promise2)，然后才执行async1内注册的微任务(async1 end). 可以理解为，这种情况下，await 后面的代码会在本轮循环的最后被执行

执行顺序：
script start -> async2 end -> Promise -> script end -> async2 end1 -> promise1 -> promise2 -> async1 end -> setTimeout

## node事件循环
### 整体理解
node 事件循环简化图
![node_evenloop](@assets/basic/5.png)
图中的每个框被称为事件循环机制的一个阶段，每个阶段都有一个 FIFO 队列来执行回调。虽然每个阶段都是特殊的，但通常情况下，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后执行该阶段队列中的回调，直到队列用尽或最大回调数已执行。当该队列已用尽或达到回调限制，事件循环将移动到下一阶段。

### 阶段概述
* 定时器检测阶段(timers)：本阶段执行 timer 的回调，即 setTimeout、setInterval 里面的回调函数。
* I/O事件回调阶段(I/O callbacks)：执行延迟到下一个循环迭代的 I/O 回调，即上一轮循环中未被执行的一些I/O回调。
* 闲置阶段(idle, prepare)：仅系统内部使用。
* 轮询阶段(poll)：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
* 检查阶段(check)：setImmediate() 回调函数在这里执行
* 关闭事件回调阶段(close callback)：一些关闭的回调函数，如：socket.on('close', ...)

### 重点阶段
重点看poll、check、timers 这3个阶段
* timers: setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。同样，在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行
* poll: 至关重要的阶段，poll 阶段的执行逻辑流程图如下
* 如果当前已经存在定时器，而且有定时器到时间了，拿出来执行，eventLoop 将回到 timers 阶段。
* 如果没有定时器, 会去看回调函数队列。
    * 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
    * 如果 poll 队列为空时，会有两件事发生
        * 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
        * 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去,一段时间后自动进入 check 阶段。
* check: 直接执行 setImmdiate 的回调
![poll](@assets/basic/6.png)

### process.nextTick
```js
setImmediate(() => {
    console.log('timeout1')
    Promise.resolve().then(() =>console.log('promise resolve'))
    process.nextTick(() =>console.log('next tick1'))
});
setImmediate(() => {
    console.log('timeout2')
    process.nextTick(() =>console.log('next tick2'))
});
setImmediate(() =>console.log('timeout3'));
setImmediate(() =>console.log('timeout4'));
```
process.nextTick 是一个独立于 eventLoop 的任务队列。

在每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行。

在 node11 之后，process.nextTick 是微任务的一种,因此上述代码是先进入 check 阶段，执行一个 setImmediate 宏任务，然后执行其微任务队列，再执行下一个宏任务及其微任务

因此输出为: 
timeout1=>next tick1=>promise resolve=>timeout2=>next tick2=>timeout3=>timeout4

### timers 阶段的执行时机变化
```js
setTimeout(()=>{
    console.log('timer1')
    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)
setTimeout(()=>{
    console.log('timer2')
    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)
```
node11及其之后 版本，一旦执行一个阶段里的一个宏任务(setTimeout,setInterval和setImmediate)就立刻执行微任务队列，这就跟浏览器端运行一致，最后的结果为： timer1=>promise1=>timer2=>promise2

### 总结
node11及其之后 版本一旦执行一个阶段里的一个宏任务(setTimeout,setInterval和setImmediate)就立刻执行对应的微任务队列

## node 和 浏览器 eventLoop的主要区别
两者最主要的区别在于浏览器中的微任务是在每个相应的宏任务中执行的，而nodejs中的微任务是在不同阶段之间执行的。


参考：
https://www.yuque.com/yanghui-xazj3/uu7edw/wnhh46
https://mp.weixin.qq.com/s?__biz=MzI0MzIyMDM5Ng==&mid=2649826653&idx=1&sn=9e5e2de78a8ef4de3820769ff3ab7c02&chksm=f175ef9ec60266880a86f33085ff43f95e3180846c5f139cb9b1b33c3245201157f39d949e9a&scene=21#wechat_redirect