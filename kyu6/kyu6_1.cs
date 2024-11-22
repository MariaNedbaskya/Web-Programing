
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
