
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
            cps = "                     #e<���ζ� ���ɻ���>#n\r\n";
            cps = "#fUI/CashShop.img/CSStatus/BtN/normal/0# #fn������� Extrabold##fs15##b#h ##k #fn������� Extrabold##fs15# ���� �����Դϴ�.#fn������� Extrabold##fs12#\r\n ���� : "+ cm.getPlayer().getLevel() +"���޼� : " + cm.getPlayer().getMeso()+ "��#n\r\n\r\n";
            cps += "#L1##fs 13##i2920006##e#r  �Ǽ�����#k";
           cps += "#L2##fs 13##i3015433##e#r  ���ڻ���#n\r\n\r\n";
           cps += "#L3##fs 13##i1190900##e#r  ���� #k";
            cm.sendSimple(cps);         


        } else if (selection == 1) {
                cm.sendSimple ("#r#e[ �Ǽ��縮 ���� ]#n#k" +
            "\r\n#L69#�����" +
            "#L70#�����" +
            "#L71#���Ʈ" +
            "#L72#����" +
            "#L73#����" +
            "#L74#����");

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