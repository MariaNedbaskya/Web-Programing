
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
