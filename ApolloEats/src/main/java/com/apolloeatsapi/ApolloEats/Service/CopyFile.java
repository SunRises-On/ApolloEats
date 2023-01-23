package com.apolloeatsapi.ApolloEats.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class CopyFile {

    public void copyFile(File a, File b) throws IOException {
        FileInputStream in = new FileInputStream(a);
        FileOutputStream out = new FileOutputStream(b);

        try{
            int n;
            //read() function reading bytes of data
            while ((n = in.read()) != -1){
                //write() function to write the bytes of data
                out.write(n);
            }
        }
        finally {
            if (in != null){
                //close() function to close the stream
                in.close();
            }
            if( out != null){
                out.close();
            }
        }
        System.out.println("File Copied");
        //return b;
    }
}
