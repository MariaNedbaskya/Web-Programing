public static class Kata  
{  
//Вам необходимо написать функцию, которая принимает три параметра:
//capколичество людей, которое может вместить автобус, не считая водителя.
//onколичество людей в автобусе, не считая водителя.
//waitколичество людей, ожидающих посадки в автобус, не считая водителя.
//Если места достаточно, вернуть 0, а если нет, вернуть количество пассажиров, которых он не может взять.
    public static int Enough(int cap, int on, int wait)  
    {  
        int availableSpace = cap - on;
        int needToFit = wait - availableSpace; 
        return needToFit > 0 ? needToFit : 0;   
    }  
}
