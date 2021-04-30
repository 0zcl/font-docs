## CSS画0.5px 细线
```css
  .line {
    height: 0.5px;
    width: 200px;
    background: red;
  }
```
<div class="line"></div>

```css
  .line {
    height: 1px;
    width: 200px;
    background: red;
    transform: scaleY(0.5)
  }
```
<div class="line_2"></div>
Chrome的效果如下：

![1px](@assets/css/3.png)


## 单行／多行文本溢出的省略

<!-- 两行溢出省略号 -->
<!-- overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical -->

<style scoped>
  .line {
    height: 0.5px;
    width: 200px;
    background: red;
  }
  .line_2 {
    height: 1px;
    width: 200px;
    background: red;
    transform: scaleY(0.5)
  }
</style>