package universe;
import java.util.Random;

public class main_test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Grid grid = new Grid(1000);
		
		Random rand = new Random();

		for(int k = 0;k<1000;k++){
			for(int l = 0;l<1000;l++){
				grid.set(k,l,rand.nextInt(2));
			}
		}
		
		for(int i = 0;i<10;i++){
			System.out.println();
			System.out.println("GRID NUMBER " + (i+1));
			//grid.print();
			grid = grid.next();
		}
	}

}
