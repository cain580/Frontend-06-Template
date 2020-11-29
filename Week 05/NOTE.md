学习笔记

一、 proxy与双向绑定

    老师讲的就是 vue的computed：

        1、computed 初次运行时会记录运行时调用的 data中的数据，

        2、这个数据 会保存运行的computed函数

        2、当这个数据get 触发时，调用这个computed函数

    存在的问题：

        1、当前案例中，每次绑定 一个computed函数，都需要遍历一次 useReactivties，useReactivties 数据量一大，性能问题如何解决？

            尝试解决：由于js是单线程，且computed函数是同步执行，只需要在函数运行前 赋值给一个全局变量，数据get触发时，数据保存下全局变量即可。

            尝试解决后出现的问题：如果这么做，同样会引申出一个问题，computed所在的组件实例销毁后，数据保存的computed函数如何卸载。


二、使用Range实现DOM精确操作 _ 基本拖拽

    重要知识点：只绑定目标的mousedown事件，mousedown事件触发时，才在document绑定mousemove/mouseup事件

    存在的问题：

        1、由于在每个索引下都添加了renge，范围很小，导致拖动时方块过于敏感，抖动的厉害

        2、insertNode执行后，导致插入后的renge位置都改变了，同时触发mousemove事件，导致方块抖动bug

    思考：是否需要加个触发间隔，防止抖动？