/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package constants.programs;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.Charset;
import server.items.ItemInformation;
import tools.Pair;

/**
 *
 * @author SEUNGHYEON
 */
public class CommodityItemUpdate {

    public static void main(String args[]) throws FileNotFoundException, IOException {
        FileOutputStream fos = new FileOutputStream(new File("property/Wz/Commodity_.img.xml"), false);
        int[] sn = {140000325, 140100697, 140200206, 140300460, 140400285, 140500217, 140600236, 140700065, 140800232, 140900087, 141000086, 160000237, 160100268};
        int idx = 0;
        int id = 9660;
        for (Pair<Integer, String> item : ItemInformation.getInstance().getAllItems()) {
            int itemid = item.left;
            //   if (ItemInformation.getInstance().isCash(itemid)) {
            switch (itemid / 10000) {
                case 170:
                    idx = 0;
                    break;
                case 100:
                    idx = 1;
                    break;
                case 110:
                    idx = 2;
                    break;
                case 105:
                    idx = 3;
                    break;
                case 104:
                    idx = 4;
                    break;
                case 106:
                    idx = 5;
                    break;
                case 107:
                    idx = 6;
                    break;
                case 108:
                    idx = 7;
                    break;
                case 101:
                case 103:
                    idx = 8;
                    break;
                case 102:
                    idx = 9;
                    break;
                case 501:
                    idx = 10;
                    break;
                case 500:
                    idx = 11;
                    break;
                case 180:
                    idx = 12;
                    break;
                default:
                    idx = -1;
                    break;
            }
            if (idx == -1) {
                continue;
            }
            if (ItemInformation.getInstance().isCash(itemid)) {
                /*
                   <imgdir name="9659">
      <int name="SN" value="94000002"/>
      <int name="ItemId" value="5121040"/>
      <int name="Count" value="3"/>
      <int name="Price" value="0"/>
      <int name="Bonus" value="0"/>
      <int name="Period" value="7"/>
      <int name="OnSale" value="0"/>
      <int name="Refundable" value="0"/>
      <int name="WebShop" value="0"/>
   </imgdir>
                 */
                fos.write(("    <imgdir name=\"" + id + "\">\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"SN\" value=\"" + sn[idx] + "\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"ItemId\" value=\"" + itemid + "\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"Count\" value=\"" + 1 + "\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"Price\" value=\"" + 0 + "\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"Priority\" value=\"" + 100 + "\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"Period\" value=\"" + 0 + "\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"Gender\" value=\"" + 2 + "\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"OnSale\" value=\"" + 1 + "\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"ReqPOP\" value=\"" + 0 + "\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"ReqLEV\" value=\"" + 0 + "\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"Class\" value=\"" + 3 + "\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"PbCash\" value=\"30\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"PbPoint\" value=\"30\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("        <int name=\"PbGift\" value=\"30\"/>\r\n").getBytes(Charset.forName("MS949")));
                fos.write(("    </imgdir>\r\n").getBytes(Charset.forName("MS949")));
                System.out.println("sn [" + sn[idx] + "] itemid [" + itemid + "]");
                sn[idx]++;
                id ++;
            }
        }
        fos.close();
        System.out.println("끝");
    }
}
