package com.active.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by Administrator on 2016/1/26.
 */
public class SendApi {

    public static String send(String apiUrl){
        BufferedReader in=null;
        String line = null;
        try {
            URL url=new URL(apiUrl);
            HttpURLConnection con=(HttpURLConnection)url.openConnection();
            con.setDoOutput(true);
            in=new BufferedReader(new InputStreamReader(con.getInputStream(),"UTF-8"));
            line=in.readLine();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }finally{
            if(in!=null){
                try {
                    in.close();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        }
        return line;
    }
}
