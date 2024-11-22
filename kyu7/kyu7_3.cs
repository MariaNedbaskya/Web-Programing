
public static class Kata  
{  
    public static int Multiples(int n, int limit)  
    {  
        int sum = 0;  
        
        for (int i = n; i < limit; i += n)  
        {  
            sum += i;  
        }  

        return sum;  
    }  
}
