using System;  
using System.Linq;  
public class Kata  
{  
    public static int SquareSum(int[] numbers)  
    {  
        return numbers.Sum(n => n * n);  
    }  
}
