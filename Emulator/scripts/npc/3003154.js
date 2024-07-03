
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
            cps = "                     #e<오로라 만능상점>#n\r\n";
            cps = "#fUI/CashShop.img/CSStatus/BtN/normal/0# #fn나눔고딕 Extrabold##fs15##b#h ##k #fn나눔고딕 Extrabold##fs15# 님의 정보입니다.#fn나눔고딕 Extrabold##fs12#\r\n 레벨 : "+ cm.getPlayer().getLevel() +"　메소 : " + cm.getPlayer().getMeso()+ "원#n\r\n\r\n";
            cps += "#L1##fs 13##i2920006##e#r  악세상점#k";
           cps += "#L2##fs 13##i3015433##e#r  의자상점#n\r\n\r\n";
           cps += "#L3##fs 13##i1190900##e#r  엠블럼 #k";
            cm.sendSimple(cps);         


        } else if (selection == 1) {
                cm.sendSimple ("#r#e[ 악세사리 상점 ]#n#k" +
            "\r\n#L69#얼굴장식" +
            "#L70#눈장식" +
            "#L71#펜던트" +
            "#L72#견장" +
            "#L73#반지" +
            "#L74#뱃지");

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