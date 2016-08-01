import crypto.*;

public class test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
        String key = AES.keyGenerator();
        
        System.out.println("key : "+ key);
        
        String salt = AES.generateSalt();
        
        System.out.println("salt : " + salt);
        
        String cryptedKey = AES.encryptUserKey(key, "f�lixCUnB�__goss", salt);
        
        System.out.println("crypted key : " + cryptedKey);
        
        String decryptedKey = AES.decryptUserKey(cryptedKey, "f�lixCUnB�__goss", salt);
        
        System.out.println("decrypted key : " + decryptedKey);
        
        cryptedKey = AES.encryptUserKey(key, "nouveau-M0-2-p�$", salt);
        
        System.out.println("crypted key : " + cryptedKey);
        
        decryptedKey = AES.decryptUserKey(cryptedKey, "nouveau-M0-2-p�$", salt);
        
        System.out.println("decrypted key : " + decryptedKey);
        		
        String plainText = "Le code � chiffrer";
        
        String cryptedText = AES.encrypt(plainText, decryptedKey);
        
        System.out.println("crypted text : "+ cryptedText);
        
        String decryptedText = AES.decrypt(cryptedText, decryptedKey);
        
        System.out.println("decrypted text : "+ decryptedText);
        
	}

}
