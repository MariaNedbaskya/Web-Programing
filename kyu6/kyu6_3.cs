using System;
namespace WebProg
{
    internal class Kyu6_3
    {
  public static int Add(int n)  
    {  
        if (n < 10)  
        {  
            return n;  
        }  
        int sum = 0;  
        while (n > 0)  
        {  
            sum += n % 10; 
            n /= 10;
        }  
        return Add(sum);  
    }  
    }
}
