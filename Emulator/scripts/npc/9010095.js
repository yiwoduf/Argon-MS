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
        var jessica = "            #b#fn������� Extrabold##fs11##Cgray# �����ý��� (Shop System)";
        jessica += "\r\n#fs13##L1##i4001812# #bĳ�ü�����#k";
        jessica += "#L2##i2431849# #b���ɻ���#k";
        jessica += "#L3##i3014011# #b�Ŀ�����#k#l\r\n";
        jessica += "\r\n������������������������������������������������������\r\n";
        jessica += "#L4##i4310088# #rȫ������#k";
        jessica += "#L5##i1004142# #r��������#k#l";
	jessica += "#L6##i1322203# #r������#k#l\r\n";
        jessica += "\r\n������������������������������������������������������\r\n";
        jessica += "#L7##i1352223# #d��������#k";
        jessica += "#L8##i4000038# #d�ؿ�ĳ��#k#l";
        jessica += "#L9##i1702565# #dĳ�ð˻�#k#l\r\n";
        jessica += "\r\n������������������������������������������������������\r\n";
        jessica += "#L10##i4001832# #b���ڻ̱�#k#l";
        jessica += "#L11##i4033923# #b���ڻ̱�#k#l";
        jessica += "#L12##i5000473# #b��о��#k#l\r\n";
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
		cm.sendOk("������ ���� �𸣰ڱ�.");
		cm.dispose();
	} else {
		cm.sendOk("�̷�! ����Ⱑ Ȯ���ϰ� �ִ°� �³�?");
		cm.dispose();
		}
            }	
         }
      }
   }
  }
}
