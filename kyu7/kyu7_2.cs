//Добро пожаловать. В этом ката вам предлагается возвести в квадрат каждую цифру числа и сложить их.
//Например, если мы пропустим 9119 через функцию, то получим 811181, потому что 9 2 — это 81, а 1 2 — это 1. (81-1-1-81)
//Пример №2: Ввод 765 вернет/должен вернуть 493625, потому что 7 2 равно 49, 6 2 равно 36, а 5 2 равно 25. (49-36-25)
//Примечание: функция принимает целое число и возвращает целое число.
//Удачного кодирования!
using System;  
using System.Linq;  
public class Kata  
{  
    public static int SquareDigits(int num)  
    {  
        string result = string.Concat(num.ToString().Select(digit =>   
            (int.Parse(digit.ToString()) * int.Parse(digit.ToString())).ToString()));  
        return int.Parse(result);  
    }  
}
