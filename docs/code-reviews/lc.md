1. 1 & 3 === 1  注意：=== 的优先级比 & 高  [运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)、[318. 最大单词长度乘积](https://leetcode-cn.com/problems/maximum-product-of-word-lengths/)

2.  当n=2^31^ - 1时，计算 n+1 会导致溢出，因此我们可以使用整数除法 Math.floor(n/2)+1, Math.floor(n/2) 分别计算 (n+1)/2，(n-1)/2  [397. 整数替换](https://leetcode-cn.com/problems/integer-replacement/solution/zheng-shu-ti-huan-by-leetcode-solution-swef/)

3. 遍历map  [594. 最长和谐子序列](https://leetcode-cn.com/problems/longest-harmonious-subsequence/)
```js
const map = new Map()
map.set('a', 1)
map.set('b', 2)
map.size // 2
map.forEach((value, key) => {
  console.log(value, key)
})
// 1 'a'
// 2 'b'
map.has('a') // true
map.has('aa') // false
map.get('aa') // undefined
```
4. [859. 亲密字符串](https://leetcode-cn.com/problems/buddy-strings/)
* 对于字符串s，s[index] ='xx' 实际上不会改变s
```js
s = 'zcl'
s.split('') // ['z', 'c', 'l']
['z', 'c', 'l'].join() // 'z,c,l' 默认用,合并
['z', 'c', 'l'].join('') // 'zcl'
```
## ASI
* ASI(automatic semicolon insertion)自动分号插入是一种程序解析技术.  JavaScript 程序的语法分析 (parsing) 阶段起作用

用数组解析交换变量，出现错误。

![ssi](@assets/code-reviews/15.png)

利用自动分号插入，JS会自动为代码行补上缺失的分号；ASI 只在换行符处起作用；如果 JavaScript 解析器发现代码行可能因为缺失分号而导致错误，那么它就会自动补上分号。

实际应用上，本人不习惯也分号。不过也要注意，以中括号<code>[</code>, 小括号<code>(</code>开头的代码行，的前一行要加分号

[备胎的自我修养——趣谈 JavaScript 中的 ASI (Automatic Semicolon Insertion)](https://segmentfault.com/a/1190000002955405)

6. String.prototype.repeat()
```js
'z'.repeat(3) // 'zzz'
```