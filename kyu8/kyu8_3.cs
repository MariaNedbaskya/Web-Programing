using System;  
using System.Linq;  
//Дополните функцию квадратной суммы так, чтобы она возводила в квадрат каждое переданное ей число, а затем суммировала результаты.
//Например, [1, 2, 2]он должен вернуться 9, потому что

public class Kata  
{  
    public static int SquareSum(int[] numbers)  
    {  
        return numbers.Sum(n => n * n);  
    }  
}
