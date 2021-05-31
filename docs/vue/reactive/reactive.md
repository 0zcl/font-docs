## 响应式原理
原理简述：采用数据劫持+发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者Watcher，触发相应的监听回调。
* 数据监听器Observer: 对vue实例的data所有属性进行监听，如有变动可拿到属性最新值并通知订阅者Watcher
* 指令解析器Compile: 对每个元素节点的指令进行扫描和解析，实例化Watcher，绑定Watcher回调函数，通过回调函数来将指令模板替换成数据
* Watcher: 连接Observer和Compile的桥梁，能订阅并收到每个属性变动的通知，执行Watcher相应的回调函数，从而更新视图。

observe数据劫持在beforeCreate之后，created之前

在编译Compile阶段时，首先会执行update来第一次初始化视图；接着会实例化Watcher，将Dep.target赋值为watcher实例，并触依赖收集，将watcher实例添加到属性对应的dep实例中(defineProperty数据劫持时一个属性会实例化一个Dep对象)。当watcher实例收到通知时，会比较新值 、旧值，如果不相等，则触发 watcher 实例的回调来更新视图

![reactive](@assets/vue/reactive/2.png)

## 核心角色
![reactive](@assets/vue/reactive/3.png)

## 核心代码
<code>observer</code>
::: details
```js
// 遍历对象
function observer(value) {
  // 递归终止条件
  if (!isObject(value)) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (Array.isArray(value) || isPlainObject(value)) {
    ob = new Observer(value)
  }
  return ob
}

class Observer {
  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      // 处理数组
      <!-- this.observeArray(value) -->
    } else {
      // 处理对象
      this.walk(value)
    }
  }

  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  <!-- observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  } -->
}

// 用defineProperty监听当前属性
function defineReactive(obj: Object, key: string, val: any) {
  const dep = new Dep()

  // 如果属性是不可配置的，则return。会导致该属性无法做依赖依集与数据劫持
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  const getter = property && property.get
  const setter = property && property.set

  // 递归
  observer(val)
  Object.defineProperty(obj, key, {
    enumerable: true, // 是否可以for in
    configurable: true,
    get: function() {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        // 依赖收集
        dep.depend()
        <!-- if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        } -->
      }
      return val
    },
    set: function(newVal) {
      const value = getter ? getter.call(obj) : val
      // 新旧值相同，不触发watcher更新
      if (newVal === value) {
        return
      }
      // 更新值
      setter.call(obj, newVal)
      // 派发更新
      dep.notify()
    }
  })
}
```
:::

<code>Dep</code>
::: details
```js
class Dep {
  constructor() {
    // 初始化订阅队列
    this.subs = []
  }

  // 增加订阅
  addSub(sub) {
    this.subs.push(sub)
  }

  // 依赖收集
  depend () {
    if (Dep.target) {
      // 让watcher调用addDep，添加watcher到dep实例，参数为属性对应的dep实例
      Dep.target.addDep(this)
    }
  }

  // 通知订阅者watcher
  notify() {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```
:::


<code>Watcher</code>
::: details
```js
class Watcher {
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    ......
  ) {
    this.vm = vm
    <!-- if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this) -->
    this.cb = cb
    this.deps = []
    this.newDeps = []
    // 集合。不重复
    this.depIds = new Set()
    this.newDepIds = new Set()
  }

  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        // 依赖收集
        dep.addSub(this)
      }
    }
  }

  update () {
    this.run()
  }

  run () {
    if (this.active) {
      const value = this.get()
      // 新值不等于旧值，触发watcher回调函数cb
      if (value !== this.value) {
        const oldValue = this.value
        this.value = value
        this.cb.call(this.vm, value, oldValue)
      }
    }
  }
}
```
:::


## Vue的响应式对数组是如何处理？


参考：
[剖析Vue原理&实现双向绑定MVVM](https://segmentfault.com/a/1190000006599500)

<style scoped>
pre {
  max-height: 1500px!important;
}
</style>