学习笔记

一、运算符和表达式

    1、**  为右结合  例：  2**3**1 === 2**(3**1) 
    
    2、 = 表达式：左侧与右测是不同的操作
    
        左侧：当出现赋值操作时，试图找到变量的容器本身，从而可以对其赋值
        
        右侧：取到它的源值
        

二、类型转换

    尽量使用 === ，少用不用 ==
    
    问题集：
    
        0 == false  // true
        1 == true  // true
        "0" == false // true
        "1" == true // true 
        0=="0" //true

三、声明

    尽量不使用 var ，预处理：先创建变量，运行时赋值 
    
    例：
    
        var a=10;
        function test(){
            a=100;
            alert(a);   // 100
            alert(this.a); // 10
            var a;
            alert(a); // 100
        }
        test()
        
   
四、JS函数调用

    Realm API 提供沙箱功能、隔离代码；
    
    iframe 方式：
    
        const globalOne = window;
        let iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        const globalTwo = iframe.contentWindow;
    
    Realm 方式：
    
        const globalOne = window;
        const globalTwo = new Realm().global;
        
