var status = -1;

function start() {
    action (1, 0, 0);
}

//function action(mode, type, selection) {
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
      //    choose+= "��   #fn������� Extrabold##f##e                         #Cgray#�Ʒ��� Ȯ���Ͻʽÿ�.\r\n"
	    choose +="                             �Ŀ����� �ý���";
        choose += "\r\n\r\n#b#L3##i3994825# [�Ŀ�����]#l#r#r#L4##i2430029# [�Ŀ��̱�]#k#l#b#L5##i2470000# [��ȭ]#l\r\n\r\n";
     //   choose += "\r\n\r\n#b#L5##i2470000# �Ŀ���ȭ#l\r\n\r\n";
         
        if (cm.getPlayer().hasGmLevel(10)){
        choose += "";
}
        cm.sendSimple(choose);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.enterCS();
}else if  (selection == 3) {
          cm.dispose();
          cm.openNpc(1540010);
        } else if (selection == 4) {
          cm.dispose();
          cm.openNpc(9300014);
        } else if (selection == 5) {
          cm.dispose();
          cm.openNpc(9300009);
     } else if (selection == 6) {
          cm.dispose();
          cm.openNpc(9100000);
        }
    }
}
        

