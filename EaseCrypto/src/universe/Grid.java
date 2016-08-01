package universe;

public class Grid {
	
	private int size; //coté du carré
	private int[][] grid;//
	
	public Grid(int size){
		this.size = size;
		grid = new int[size][size];
		for (int i = 0;i<size;i++){
			for (int j = 0;j<size;j++){
				grid[i][j]=0;
			}
		}
	}
	
	public void set(int abs, int ord, int color){
		abs = abs%size;
		ord = ord%size;
		
		if(color>=0 && color < 5) {
			grid[abs][ord]=color;
		}
	}
	
	public int get(int abs, int ord){
		abs = abs%size;
		ord = ord%size;
		return grid[abs][ord];
	}
	
	public int next_square(int abs, int ord, int color){
		abs = abs%size;
		ord = ord%size;
		int[] count = new int[5];
		for(int l =0;l<5;l++){
			count[l]=0;
		}
		
		for(int i = abs-1; i<abs+2; i++){
			for(int j = ord-1;j<ord+2;j++){
				
				if(i!=abs || j!=ord){
					
					int a=i%size;
					if(a<0){a=a+size;}
					int b=j%size;
					if(b<0){b=b+size;}
					
					count[grid[a][b]]+=1;
				}
			}
		}
		
		if (count[0]>6 || count[0]<5){
			return 0;
		}
		
		if(count[0]==6){
			return color;
		}
		if(count[0]==5){
			if(color!=0){
				return color;
			}
			else{
				int not_used = 1;
				for(int k=1;k<5;k++){
					if(count[k]==2||count[k]==3){
						return k;
					}
					if(count[k]==0){
						not_used = k;
					}
				}
				
				return not_used;
				
			}
		}
		return 0;
		
	}
	
	public void print(){
		for(int i = 0;i<size;i++){
			for(int j = 0;j<size;j++){
				System.out.print(grid[i][j]);
				
			}
			System.out.println();
		}
	}
	
	public Grid next(){
		Grid new_grid = new Grid(size);

		for(int i = 0;i<size;i++){
			for(int j = 0;j<size;j++){
				new_grid.set(i,j,this.next_square(i,j,grid[i][j]));
				
			}
		}
		
		return new_grid;
		
	}
	
}
