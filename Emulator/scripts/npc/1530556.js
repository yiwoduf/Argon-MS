var status = -1;
var time = "#fUI/UIToolTip/Item/Equip/Star/Star#"
function start() {
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
  
        var choose = "#fn������� Extrabold##fs13# ���ζ�¶����� �̱� ��� ���𿡿� !#k";
           choose += "\r\n#L1##fs 13##i3010097##e#b  ���� ���� �̱�#d ( ���� ���ڸ� ���ڱ�!)#k";
        //   choose += "\r\n#L2##fs 13##i2432291##e#b  �ؿ� ĳ�� �̱�#d (���� �̻� �ؿ�ĳ������?)#n#l#k";

        cm.sendSimple(choose);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.openNpc (1022107);
 } else if (s == 1) {
  cm.openNpc (9040000);

 } else if (s == 2) {
  cm.openNpc (9001132);

        }
    }
}
