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
별 = "#fUI/UIToolTip/Item/Equip/Star/Star#"
var choose ="";
별 = "#fUI/UIToolTip/Item/Equip/Star/Star#"
      //    choose+= "　   #fn나눔고딕 Extrabold##f##e                         #Cgray#아래를 확인하십시오.\r\n"
	    choose +="                             후원상점 시스템";
        choose += "\r\n\r\n#b#L3##i3994825# [후원상점]#l#r#r#L4##i2430029# [후원뽑기]#k#l#b#L5##i2470000# [강화]#l\r\n\r\n";
     //   choose += "\r\n\r\n#b#L5##i2470000# 후원강화#l\r\n\r\n";
         
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
        

