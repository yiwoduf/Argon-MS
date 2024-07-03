var status = 0;
var time = "#fUI/UIToolTip/Item/Equip/Star/Star#"

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
        var jessica = "            #b#fn나눔고딕 Extrabold##fs11##Cgray# 상점시스템 (Shop System)";
        jessica += "\r\n#fs13##L1##i4001812# #b캐시샵접속#k";
        jessica += "#L2##i2431849# #b만능상점#k";
        jessica += "#L3##i3014011# #b후원상점#k#l\r\n";
        jessica += "\r\n───────────────────────────\r\n";
        jessica += "#L4##i4310088# #r홍보상점#k";
        jessica += "#L5##i1004142# #r보스상점#k#l";
	jessica += "#L6##i1322203# #r고렙상점#k#l\r\n";
        jessica += "\r\n───────────────────────────\r\n";
        jessica += "#L7##i1352223# #d보조무기#k";
        jessica += "#L8##i4000038# #d해외캐쉬#k#l";
        jessica += "#L9##i1702565# #d캐시검색#k#l\r\n";
        jessica += "\r\n───────────────────────────\r\n";
        jessica += "#L10##i4001832# #b상자뽑기#k#l";
        jessica += "#L11##i4033923# #b의자뽑기#k#l";
        jessica += "#L12##i5000473# #b펫분양소#k#l\r\n";
		cm.sendSimple(jessica);

        } else if (status == 1) {
	  if (selection == 0) {
	     cm.dispose();
	     cm.openNpc(2143002);
	} else if (selection == 1) {
	     cm.dispose();
	     cm.openCS();
	} else if (selection == 2) {
        cm.dispose();
        cm.openNpc (9000428);
	} else if (selection == 3) {
        cm.dispose();
        cm.openNpc (1052101);
	} else if (selection == 4) {
        cm.dispose();
        cm.openNpc (3003368);
	} else if (selection == 5) {
        cm.dispose();
        cm.openNpc (2131004);
	} else if (selection == 6) {
        cm.dispose();
        cm.openNpc (2150006);
	} else if (selection == 7) {
        cm.dispose();
        cm.openNpc (1012114);
	} else if (selection == 8) {
        cm.dispose();
        cm.openNpc (1530430);
	} else if (selection == 9) {
        cm.dispose();
        cm.openNpc (2100001);
	} else if (selection == 10) {
        cm.dispose();
        cm.openNpc (1043000);
	} else if (selection == 11) {
        cm.dispose();
        cm.openNpc (2400003);
	} else if (selection == 12) {
        cm.dispose();
        cm.openShop (9300003);

             } else if (selection == 50) {
		cm.dispose();
		cm.openNpc(2060002);
		return;
             } else if (selection == 38) {
		cm.dispose();
		cm.openNpc(9201036);
		return;
	} else if (selection == 51) {
		if (cm.haveItem(4001189, 1500)) {
		if (cm.haveItem(4001189, 1500)) {
		if (cm.haveItem(4001189, 1500)) {
		cm.gainItem(4001189, -1500);
		cm.gainItem(4001189, -1500);
		cm.gainItem(4001189, -1500);
		cm.name(1142126, 300,0,3);
		cm.sendOk("마음에 들지 모르겠군.");
		cm.dispose();
	} else {
		cm.sendOk("이런! 물고기가 확실하게 있는게 맞나?");
		cm.dispose();
		}
            }	
         }
      }
   }
  }
}
