学习笔记


一、编写带括号的四则运算产生式

    这个作业，我在第三周练习的时候就已经做过了，当时只是引申出来，比较感兴趣，所以做了一下。（/Week 03/ast.html）


二、现代语言分类

    这个章节对于个人而言不是太重要，了解就行。

        用途分类：
            数据描述语言： JSON HTML XAML CSS SQL
            编程语言： C C++ js PHP Python java dart

        表达方式分类：
            声明式语言：JSON HTML XAML CSS SQL
            命令型语言：C  C++ js PHP Python java dart


三、静态语言/动态语言（强类型语言）

    老师对静态/动态表述的不是太容易理解，容易误导；

    静态语言（强类型语言：一旦变量的类型被确定，就不能转化的语言）

        静态语言是在编译时变量的数据类型即可确定的语言，多数静态类型语言要求在使用变量之前必须声明数据类型。

    动态语言（弱类型语言：一个变量的类型是由其应用上下文确定的）

        动态语言是在运行时确定数据类型的语言。变量使用之前不需要类型声明，通常变量的类型是被赋值的那个值的类型。


四、Number

    这块还要继续了解下；


五、String

    练习：UTF8 对 string 进行遍码：

        1、一个字节时（0XXXXXXX）有效位数为7位，最大为 01111111

        2、二个字节时（110XXXXX 10XXXXXX）有效位数为8-11位，最大为 11111111111

        3、三个字节时（1110XXXX 10XXXXXX 10XXXXXX）有效位数为12-16位，最大为 11111111111，最小为 100000000000

        4、四个字节时（11110XXX 10XXXXXX 10XXXXXX 10XXXXXX）有效位数为17-21位

六、对象

    练习：用 JavaScript 去设计狗咬人的代码

        1、创建公共类 Role （ HP、攻击力、受伤事件、装备《影响攻击力》、...)

        2、创建Dog类，继承 Role （ type、name、 咬击事件<bite>触发目标的受伤事件 ）

        3、创建Person类，继承 Role （ type、name 、脚踢事件<spurn>触发目标的受伤事件 ）

        4、 const dog = new Dog({name:"卡拉"});
            const person = new Person({name:"厨师"});
            dog.bite(person);
            person.spurn(dog);

            // 像是在创建一个游戏