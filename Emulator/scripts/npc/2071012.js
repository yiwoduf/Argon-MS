importPackage(Packages.constants);

var status = -1;

별보 = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"

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
        var chat = "#b▶ #h0#님의 #z4310172#(#i4310172#)의 갯수는 "+cm.itemQuantity(4310172)+" 개 입니다.#k\r\n";
        chat += "#L6#"+별보+"#d #i4310172#500개 -> #i1142907#1개 \r\n";
	chat += "#L0#"+별보+"#d #i4310172#2개 -> #i4310108#5개\r\n";
        chat += "#L1#"+별보+"#d #i4310172#5개 -> #i4033247#5개\r\n";
        chat += "#L2#"+별보+"#d #i4310172#5개 -> #i2430218#1개\r\n";
        chat += "#L3#"+별보+"#d #i4310172#8개 -> #i2450116#2개\r\n";
        chat += "#L4#"+별보+"#d 아케인 방어구 상점 가기\r\n";
        chat += "#L5#"+별보+"#d 아케인 무기 상점 가기\r\n";
        cm.sendSimple(chat);

    } else if (status == 1) {


     if (selection == 0) {

     if (cm.itemQuantity(4310172) >= 2) {
        cm.gainItem(4310172 ,-2);
        cm.gainItem(4310108 ,5);
        cm.sendOk("구매가 완료되었습니다.");
	cm.dispose();
        }
     else {
        cm.sendOk("코인이 부족합니다.");
        cm.dispose();

		}

    } else if (selection == 1) {

     if (cm.itemQuantity(4310172) >= 5) {
        cm.gainItem(4310172 ,-5);
        cm.gainItem(4033247 ,5);
        cm.sendOk("구매가 완료되었습니다.");
	cm.dispose();
        }
     else {
        cm.sendOk("코인이 부족합니다.");
        cm.dispose();

		}

    } else if (selection == 2) {

     if (cm.itemQuantity(4310172) >= 5) {
        cm.gainItem(4310172 ,-5);
        cm.gainItem(2430218 ,1);
        cm.sendOk("구매가 완료되었습니다.");
	cm.dispose();
        }
     else {
        cm.sendOk("코인이 부족합니다.");
        cm.dispose();

		}

    } else if (selection == 3) {

     if (cm.itemQuantity(4310172) >= 8) {
        cm.gainItem(4310172 ,-8);
        cm.gainItem(2450116 ,2);
        cm.sendOk("구매가 완료되었습니다.");
	cm.dispose();
        }
     else {
        cm.sendOk("코인이 부족합니다.");
        cm.dispose();

		}

    } else if (selection == 4) {
	cm.openShop(2);
        cm.dispose();

    } else if (selection == 5) {
	cm.openShop(1);
        cm.dispose();

    } else if (selection == 6) {

     if (cm.itemQuantity(4310172) >= 500) {
        cm.gainItem(4310172 ,-500);
        cm.gainItem(1142907 ,1);
        cm.sendOk("구매가 완료되었습니다.");
	cm.dispose();
        }
     else {
        cm.sendOk("코인이 부족합니다.");
        cm.dispose();

		}




		}
	}
}