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
        choose += "#fn������� Extrabold##fs16##fs16#"+��+"#b�����÷���#k#l�����ý���#k"+��+"#l";
        choose += "\r\n#L0##e#i5044000##g ĳ�ü� �̿��ϱ�#l\r\n\r\n#r#L1##i1142744#�Ŀ�����#k#l\r\n\r\n#b#L2##i5450011#������#l\r\n\r\n";
        if (cm.getPlayer().hasGmLevel(10)){
        choose += "";
}
	if (selection == 0) {
		cm.dispose();
		cm.openCS();
  } else if (selection == 1) {
          cm.dispose();
          cm.openNpc(1540010);
        } else if (selection == 2) {
          cm.dispose();
          cm.openNpc(9000428);
        }
    }
}
        
