## 组件里的 data 必须是一个函数返回的对象，而不能就只是一个对象?
由于组件可以多次复用，因此需要通过工厂函数模式返回一个对象，组件每次实例化时(复用组件)调用data()函数返回新的数据对象.

如果data 仍然是一个纯粹的对象，则组件每次实例时将引用同一个数据对象

源码简析
```js
export function initState (vm: Component) {
  const opts = vm.$options
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
}

function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  const keys = Object.keys(data)
  let i = keys.length
  while (i--) {
    const key = keys[i]
    // data属性的命名不能和props、methods中的命名冲突
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        // ....warn
      }
    }
    if (props && hasOwn(props, key)) {
      // ....warn
      // 是不能以$或者_开头
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  observe(data, true /* asRootData */)
}
export function getData (data: Function, vm: Component): any {
  // 执行data函数, 执行新的数据对象
  return data.call(vm, vm)
}
```

## proxy代理
我们经常会直接使用this.xxx的形式直接访问props或者data中的值，这是因为Vue为props和data默认做了proxy代理
```js
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}
// proxy(vm, `_data`, key)执行
export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```
Vue中为什么使用this.xxx就能直接访问data, props中的属性?

因为在初始化State中, 会使用proxy对vm做数据劫持, 当访问this.xxx实际上是访问this._data.xxx或者this._props.xxx
```js
const name = this.name
this.name = 'BBB'
// 等价于
const name = this._data.name
this._data.name = 'BBB'
```

## Vue 中的 key 有什么用?
<code>高效的更新虚拟DOM</code>

Vnode进行patch时会调用sameNode方法, 判断两个Vnode是否为同一个. sameNode方法使用key值是否相等来进行判断：
```js
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)))
  );
}
```
### 举例:
![key](@assets/vue/vnode/1.png)

我们希望可以在B和C之间加一个F，Diff算法默认执行起来是这样的：
![key](@assets/vue/vnode/2.png)

C更新成F，D更新成C，E更新成D，最后再插入E，发生了 4 次 vnode 结构变化. 是不是很没有效率？

使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点。

![key](@assets/vue/vnode/3.png)

只需 发生 1次 vnode 结构变化 

[v-for为什么要加key，能用index作为key么](https://www.cnblogs.com/youhong/p/11327062.html)