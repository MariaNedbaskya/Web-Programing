//Вам будет дано число, и вам нужно будет вернуть его как строку в развернутой форме . Например:
  // 12 --> "10 + 2"
   //45 --> "40 + 2"
//70304 --> "70000 + 300 + 4"
//ПРИМЕЧАНИЕ: Все числа будут целыми числами больше 0.
using System;  
using System.Text;  
public class Kata  
{  
    public static string ExpandedForm(long number)  
    {  
        var numberString = number.ToString();  
        var parts = new StringBuilder();  
        
        for (int i = 0; i < numberString.Length; i++)  
        {  
            int digit = numberString[i] - '0';
            long positionValue = (long)Math.Pow(10, numberString.Length - 1 - i); 
            
            if (digit != 0)
            {  
                if (parts.Length > 0)  
                {  
                    parts.Append(" + ");  
                }  
                parts.Append(digit * positionValue);  
            }  
        }  
        return parts.ToString();  
    }  
}
