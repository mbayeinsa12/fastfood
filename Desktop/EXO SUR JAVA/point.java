package javaprogram;
public class point {
    private int x;
    private int y;
    public void initialise(int abs,int ord){
    x = abs;
    y = ord;

  }
  public void afficher(){
    System.out.println("les coordonne du point sont x="+x+" et y="+y);
  }
  public static void main(String[] args) {
    point a =new point();
    a.initialise(10,20);
     a.afficher();
     System.out.println(a);
     System.out.println(b);
  }
    
  }
  
