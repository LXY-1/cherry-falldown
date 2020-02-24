/*
 * @Description: 花瓣自由下落效果
 * ************  1.根据分层大小以及配置参数生成相应数量的樱花花瓣
 * ************  2. 花瓣初始位置问题(模式一随机分布，模式二集中)
 * ************* 3. 花瓣动画执行时间，随机分布，经量使得不同花瓣执行时间不同
 * ************* 4. 花瓣动画延迟时间，只有少量花瓣不延迟，大部分花瓣加如随机延迟时间，使得花瓣下落分布不会太集中
 * @version: 1.0
 * @Author: lxw
 * @Date: 2020-02-23 19:37:32
 * @LastEditors: lxw
 * @LastEditTime: 2020-02-24 21:02:41
 */


const cherryFallen = (function () {
    /**
     * CherryFalldown类  樱花花瓣生成，配置入口：配置数据、挂载id传入 
     * @constructor
     * @param  {Object} opt - 配置参数对象
     * @param {number} opt.width - 花瓣宽度
     * @param {number} opt.height - 花瓣宽度
     * @param {String} opt.baseImgSrc - 花瓣图片地址全局前缀
     * @param {Array} opt.imgs - 花瓣图片资源目录
     * @param {Number} opt.lineNUm - 花瓣需要平铺的行数
     * @param {number} opt.minSpeed - 花瓣下落最慢速度
     * @param {number} opt.maxSpeed - 花瓣下落最快速度
     * @param {String} ele - 过载id。
     */
    function CherryFalldown(opt, ele) {
        let optDefault = {
            width: 60,
            height: 33,
            baseImgSrc: './less/cherry-blossoms-falling/imgs/',
            imgs: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
            lineNUm: 3,
            minSpeed: 30,
            maxSpeed: 80
        }
        this.option = Object.assign(option, opt)
        this.version = '1.0'
        this.descrition = '不兼容ie6、7、8'
        //调用核心模块
        distribution(opt, ele)
    }

    CherryFalldown.prototype.getInfo = () => {
        console.log(`版本${this.version},兼容性:${this.descrition}`)
    }

    /**
      * 花瓣生成、相关随机状态配置实现核心模块
      *  生成花瓣元素，花瓣初始位置随机分布、随机生成动画执行时间随机分布给不同的花瓣、给大部分的花瓣赋值动画延迟
      * 
      */
    function distribution(option, ele) {
        const wrapEle = document.getElementById(ele)
        const wrapWidth = wrapEle.offsetWidth
        const wrapHeight = wrapEle.offsetHeight
        // const width = 90//图片默认宽度
        // const height = 53 // 图片默认高度
        // const baseImgSrc = './less/cherry-blossoms-falling/imgs/'
        // const imgs = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png']
        const num = parseInt(wrapWidth / option.width) - 3
        const lineTotalNum = parseInt(wrapHeight / option.height)
        // const lineNUm = 3 // 需要铺满的行数
        // max min ：分别控制花瓣初始位置：初始花瓣的transfromY的数值，，通过它控制花瓣开始的隐藏位置
        const max = - (option.height * 5) + option.height
        const min = - (8 * option.height)
        // const minSpeed = 60 // px/s
        // const maxSpeed = 120 //px/s
        let minTime = parseInt(wrapHeight / option.maxSpeed)
        let maxTime = parseInt(wrapHeight / option.minSpeed)
        let cnum = 0


        // css3主要实现动画，但是由于很多随机的地方需要控制：css3是不可能实现的：比如每一个花瓣结束动画时间不同：范围：7-10s
        // 每一个花瓣的初始状态：初始位置分布：按照花瓣初始下落特点：范围 -200 - -50
        // 既然是动画是css3实现的，这个动画过程里面改变什么状态也就是百分之多少是什么css属性都是js控制不来的，你要控制，那你只能做多个动画
        // 在通过js随机把这些动画通过动画属性的name属性赋值给那些花瓣元素
        // 切记：css3动画，不过你什么状态：动结束它只会认你给它设置的时间，所以时间控制很重要，随机的地方，取一个合适的随机范围
        // 这里的话：我使用一个下落速度-慢下落变量可以自己控制最；10px/s ，最慢时间就有了，最快下落速度，每秒50px/s，这样时间范围就有了 
        // 这是一个 宽度：11 x 8 的网格系统， 每一个网格的大小：115px x 73px
        //随机left ： 0 - num-1  ， 随机top: 0 - lineTotalNum-1
        for (let j = 0; j < option.lineNUm; j++) {
            for (let i = 0; i < num; i++) {
                cnum++;
                let imgele = document.createElement('img')
                let ind = i % 6;
                imgele.src = option.baseImgSrc + option.imgs[ind]
                imgele.width = option.width + ''
                imgele.height = option.height + ''
                imgele.style.transform = `translateY(${Math.random() * (max - min + 1) + min}px)`
                imgele.style.animationDuration = `${Math.random() * (maxTime - minTime + 1) + minTime}s`
                // 随机取img 赋值带自旋的动画名称：使得一些花瓣下落有自旋效果
                let numAvg = parseInt((option.lineNUm * num) / 2) //
                let randNum = parseInt(Math.random() * numAvg)
                if (cnum < num + 1) {
                    if (i % 2 === 0) {
                        imgele.style.animationName = 'falldown1'
                    } else {
                        imgele.style.animationName = 'falldown2'
                    }
                }
                // 对第二行其的花朵动画进行延迟,，以及第一行部分花瓣进行动画延迟
                if (j > 0) {
                    imgele.style.animationDelay = `${Math.random() * 3 + 1}s`
                } else {
                    if (i % 2 === 0) {
                        imgele.style.animationDelay = `${Math.random() * 3 + 1}s`
                    }
                }

                wrapEle.appendChild(imgele)
            }

        }
    }

    function cherryFalldown(opt, ele) {
        return new CherryFalldown(opt, ele)
    }
    // 闭包返回
    return cherryFalldown

})()

