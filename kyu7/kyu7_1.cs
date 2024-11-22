//Implement a function that takes two numbers m and n and returns an array of the first m multiples of the real number n. Assume that m is a positive integer.
//Ex.
//(3, 5.0) --> [5.0, 10.0, 15.0]
using System.Linq;
public class Kata  
{  
    public static string Disemvowel(string str)  
    {  
        char[] vowels = new char[] { 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U' };  
        return new string(str.Where(c => !vowels.Contains(c)).ToArray());  
    }  
}
