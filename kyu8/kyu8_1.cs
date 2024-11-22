using System;  
using System.Collections.Generic;  
public class Kata  
{  
    public static object[] RemoveEveryOther(object[] inputArray)  
    {  
        List<object> resultList = new List<object>();  
        for (int i = 0; i < inputArray.Length; i++)  
        {  
            if (i % 2 == 0)  
            {  
                resultList.Add(inputArray[i]);  
            }  
        }  
        return resultList.ToArray();  
    }  
}  
    static void Main(string[] args)  
    {  
        object[] inputArray = { "Keep", "Remove", "Keep", "Remove", "Keep", "Remove" };  
        object[] resultArray = Kata.RemoveEveryOther(inputArray);  
        Console.WriteLine(string.Join(", ", resultArray));  
    }
