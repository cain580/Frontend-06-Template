学习笔记

乘除运算表达式 = ( Number | MultiplicationExpression ) *|/ ( Number | MultiplicationExpression )

加减运算表达式 = ( AdditiveExpression | MultiplicationExpression ) +|- ( AdditiveExpression | MultiplicationExpression )

表达式 = AdditiveExpression EOF


理解：

乘除 运算优先级大于 加减

乘除 运算优先级一致 左先于右

加减 运算优先级一致 左先于右

故：词法分析从左到右，先乘除后加减


老师的做法：

1、所有数字包在乘除表达式中

2、加减只处理 乘除表达式与加减表达式

3、至EOF结束运算



思考：

1、如诺添加 （） ，（）的优先级最高，改如何处理？

	添加组合运算表达式 （用于处理 <（）>内的逻辑） 输出 AdditiveExpression

	乘除运算表达式<MultiplicationExpression> = ( Number | MultiplicationExpression | AdditiveExpression<组合运算表达式输出> ) *|/ ( Number | MultiplicationExpression | AdditiveExpression<组合运算表达式输出>)

	加减运算表达式<AdditiveExpression> = ( AdditiveExpression | MultiplicationExpression ) +|- ( AdditiveExpression | MultiplicationExpression )
	
	组合运算表达式<GroupingExpression>逻辑 ：
		1、如果遇到 “（” ，创建 node = { type:"GroupingExpression",children:[]} 并删除“（”；
			运行 while 继续寻找下一个：
				如果是“（” (说明嵌套了<（）>) 运行 GroupingExpression 方法并添加至children数组内;
				如果是“）” 运行 AdditiveExpression 方法，入参children数组；并且退出；
				如果不是“）” 添加组合运算表达式的children数组内；
				如果没有值 退出；
			赋值node
			返回 GroupingExpression（source）
		2、如果遇到 “GroupingExpression” ，返回 children[0]; (为了减少嵌套 改为输出 组合分析完毕后的 AdditiveExpression)		
			
	
2、在4则运算中只有加减乘除 故这种方式可以实现，如添加（）、==、!=、||、&& 等词法分析中使用这种方案是否太累赘？



