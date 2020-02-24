<!--
 * @Description: 
 * @version: 
 * @Author: lxw
 * @Date: 2020-02-23 19:55:56
 * @LastEditors: lxw
 * @LastEditTime: 2020-02-23 21:19:25
 -->
### 花瓣自由下落效果
`自旋`、`下落`、`飘落`

### 简易使用说明
##### 具体使用可以clone此demo查看例子
1. 样式部分
  - index.less 可以根据自己的需要，修改后重新编译生成idnex.css，切记不要直接在index.html或者是其他地方修改父层的宽度和高度
  - 根据自己在less文件修改父层宽度和高度，可以实现全屏或者是局部的花瓣飘落
2. 脚本部分,调用如下
```js
 let option = {
    width: 60,//花瓣宽度
    height: 33,// 花瓣高度
    baseImgSrc: './imgs/',// 花瓣全局地址前缀
    imgs: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
    lineNUm: 3,// 花瓣行数
    minSpeed: 30, // 最慢速度
    maxSpeed: 80 // 最快速度
}
 const cherryObj = cherryFallen(option, 'cherry-img-wrap')
```  

### 动画过程涉及css3属性
`transfrom属性`
补充：整个花瓣飘落动画，有些是自旋、飘落，有些是自旋、竖直下落，通过css3动画过渡`transform:`属性，涉及transform如下属性值
`translateX`,`translateY`,`rotate`

### 实现方案
1. 我采用的方案 
> js控制花瓣生成、初始位置随机分布、不同花瓣赋值随机动画执行时间、大部分花瓣赋值随机动画延迟时间、不同类的花瓣赋值不同的css3动画
> css3 animation 实现整个花瓣动画，这里主要提供3个css3 动画，主要区别是 花瓣飘落的方向、自旋的程度

2.参考方案
ps:单纯使用css3来实现这个花瓣飘落，由于css3 animation采用百分比控制动画每一帧，使得如果需要花瓣做更复杂运动，很难实现、很用css3动画控制
 - js 部分利用setimeInterval控制花瓣的left、top值以及css 的transiton属性
 -  css3 通过动画来控制花瓣的自旋
 结果:花瓣飘落更自然

### 插件架构
1. css样式使用less开发，可以基于less提供的几个配置变量进行修改后重新编译成自己需要的css文件
2. js部分使用组合面向对象 + 闭包模式开发，配合jsdoc生成插件说明文档


