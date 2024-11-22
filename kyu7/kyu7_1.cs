
using System.Linq;
public class Kata  
{  
    public static string Disemvowel(string str)  
    {  
        char[] vowels = new char[] { 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U' };  
        return new string(str.Where(c => !vowels.Contains(c)).ToArray());  
    }  
}
