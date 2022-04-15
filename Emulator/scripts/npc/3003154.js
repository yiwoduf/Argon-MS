
var k = "#fUI/UIToolTip/Item/Equip/Star/Star#"

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cps = "                     #e<¿À·Î¶ó ¸¸´É»óÁ¡>#n\r\n";
            cps = "#fUI/CashShop.img/CSStatus/BtN/normal/0# #fn³ª´®°íµñ Extrabold##fs15##b#h ##k #fn³ª´®°íµñ Extrabold##fs15# ´ÔÀÇ Á¤º¸ÀÔ´Ï´Ù.#fn³ª´®°íµñ Extrabold##fs12#\r\n ·¹º§ : "+ cm.getPlayer().getLevel() +"¡¡¸Þ¼Ò : " + cm.getPlayer().getMeso()+ "¿ø#n\r\n\r\n";
            cps += "#L1##fs 13##i2920006##e#r  ¾Ç¼¼»óÁ¡#k";
           cps += "#L2##fs 13##i3015433##e#r  ÀÇÀÚ»óÁ¡#n\r\n\r\n";
           cps += "#L3##fs 13##i1190900##e#r  ¿¥ºí·³ #k";
            cm.sendSimple(cps);         


        } else if (selection == 1) {
                cm.sendSimple ("#r#e[ ¾Ç¼¼»ç¸® »óÁ¡ ]#n#k" +
            "\r\n#L69#¾ó±¼Àå½Ä" +
            "#L70#´«Àå½Ä" +
            "#L71#Ææ´øÆ®" +
            "#L72#°ßÀå" +
            "#L73#¹ÝÁö" +
            "#L74#¹îÁö");

        } else if (selection == 2) {
            cm.dispose();
            cm.openNpc(1530210);

        } else if (selection == 3) {
            cm.dispose();
            cm.openNpc(1002006);

        } else if (selection >= 0) {
            cm.CollectivelyShop(selection, 1530429);
            cm.dispose();


        }
    }
}