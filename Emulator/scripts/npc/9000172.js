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
별 = "#fUI/UIToolTip/Item/Equip/Star/Star#"
var choose ="";
별 = "#fUI/UIToolTip/Item/Equip/Star/Star#"
        choose += "#fn나눔고딕 Extrabold##fs16##fs16#"+별+"#b에이플러스#k#l상점시스템#k"+별+"#l";
        choose += "\r\n#L0##e#i5044000##g 캐시샵 이용하기#l\r\n\r\n#r#L1##i1142744#후원상점#k#l\r\n\r\n#b#L2##i5450011#모든상점#l\r\n\r\n";
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
        
