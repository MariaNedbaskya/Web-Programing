using System;  
using System.Collections.Generic;  
//Возьмите массив и удалите каждый второй элемент из массива. Всегда сохраняйте первый элемент и начинайте удаление со следующего элемента.
//Пример:
//["Keep", "Remove", "Keep", "Remove", "Keep", ...]-->["Keep", "Keep", "Keep", ...]
//Ни один из массивов не будет пустым, так что вам не о чем беспокоиться!
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
