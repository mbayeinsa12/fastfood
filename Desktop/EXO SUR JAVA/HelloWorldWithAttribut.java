public class HelloWorldWithAttribut {

    String maChaine;
    public void Hello(){
        System.out.println(this.maChaine);
    }
    public static void main(String[] args) {
        HelloWorldWithAttribut s = new HelloWorldWithAttribut();
        s.maChaine = "salut";
        s.Hello();
    }
}