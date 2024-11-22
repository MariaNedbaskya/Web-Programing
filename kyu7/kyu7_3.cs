//Реализуйте функцию, которая принимает два числа mи nвозвращает массив первых mкратных действительного числа n. Предположим, что mэто положительное целое число.
//Бывший
//(3, 5.0) --> [5.0, 10.0, 15.0]
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
