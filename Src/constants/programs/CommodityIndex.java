package constants.programs;

import constants.GameConstants;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author SEUNGHYEON
 */
public class CommodityIndex {
    public static void main(String[] args) throws FileNotFoundException, IOException {
        FileReader fr;
        String text_ = "";
        fr = new FileReader("property/Wz/Etc.wz/Commodity.img.xml");
        BufferedReader buffer = new BufferedReader(fr);
        int i = 0;
        FileOutputStream fos = new FileOutputStream(new File("property/Wz/Commodity_.img.xml"), false);
        while (text_ != null) {
            text_ = buffer.readLine();
            if (text_ != null) {
                if (text_.contains("<imgdir name=\"") && !text_.contains("<imgdir name=\"Commodity.img\">")) {
                    System.out.println("INDEX OF " + i);
                    text_ = "   <imgdir name=\"" + i + "\">";
                    i++;
                }
                fos.write((text_ + "\r\n").getBytes());
            }
        }
        buffer.close();
        fr.close();
        fos.close();
        System.out.println("캐시샵 컨버팅을 끝냈습니다.");
    }
}
