

/*
�� ��ũ��Ʈ�� ���۱��� FoxDevelopTeam ���� Fox���� �ֽ��ϴ�.
���� : rinus_alt / fox_devel@nate.com / opharks (skype)
*/
var status = -1;

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
�� = "#fUI/UIToolTip/Item/Equip/Star/Star#"
var choose ="";
�� = "#fUI/UIToolTip/Item/Equip/Star/Star#"
        choose += "\r\n#b#L0##i1142744#���ڻ̱�#k#l #L1##i5450011#���λ̱�#l";
        if (cm.getPlayer().hasGmLevel(10)){
        choose += "";
}
        cm.sendSimple(choose);

      } else if (status == 1) {
     var s = selection;
        cm.dispose();
	if (selection == 0) {
		cm.dispose();
		cm.openNpc(9001130);
	} else if (selection == 1) {
		cm.dispose();
                cm.openNpc(9100001);
	} else if (selection == 2) {
		cm.dispose();
		cm.openNpc(9300001);
	} else if (selection == 3) {
		cm.dispose();
	}
	  }
}

        
//