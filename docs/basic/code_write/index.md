::: warning
如何使 if(a==1&&a==2&&a==3) {console.log('true')}; 正确打印'true'

请写出a
:::

答：
```js
const a = {
  value: 0
  toString() {
    this.value++
    return this.value
  }
}
```


对象转原始类型，会调用内置的[ToPrimitive]函数，对于该函数而言，其逻辑如下：

* 是否已经是原始类型，是则直接返回
* 调用<code>valueOf()</code>，如果转换为原始类型，则返回
* 调用<code>toString()</code>，如果转换为原始类型，则返回
* 也可以重写<code>Symbol.toPrimitive()</code>方法，优先级别最高
* 如果都没有返回原始类型，会报错
```js
var obj = {
  value: 0,
  valueOf() {
    return 1;
  },
  toString() {
    return '2'
  },
  [Symbol.toPrimitive]() {
    return 3
  }
}
console.log(obj + 1); // 输出4
```