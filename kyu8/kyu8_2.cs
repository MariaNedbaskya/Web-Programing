public static class Kata  
{  
    public static int Enough(int cap, int on, int wait)  
    {  
        int availableSpace = cap - on;
        int needToFit = wait - availableSpace; 
        return needToFit > 0 ? needToFit : 0;   
    }  
}
