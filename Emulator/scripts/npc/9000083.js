var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";
var ������ = "#fUI/UIToolTip/Item/Equip/Star/Star#";

importPackage(Packages.constants);

var status = 0;

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
if (cm.getPlayer().getLevel() >= 200) {
		var jessica = "                #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" �պ� ���� "+��+"\r\n#fs10##Cgray#                                  ���Ͻô� �޴��� �������ּ���.#k#fs12#\r\n\r\n";
		jessica += "-------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L100##i4033364# #b#z4033364##k #r10 ��#k#l\r\n\r\n       * #i3992025# #r- 1000 �� ����#k\r\n\r\n-------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L0##i1012478# #b#z1012478##k #d�ý��� 600 / ��, �� 350#k#l\r\n\r\n       * #i3992025# #r- 9000 �� ����#k\r\n\r\n-------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L1##i1022231# #b#z1022231##k #d�ý��� 300 / ��, �� 200#k#l\r\n\r\n       * #i3992025# #r- 3000 �� ����#k\r\n\r\n-------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L2##i1022232# #b#z1022232##k #d�ý��� 500 / ��, �� 300#k#l\r\n\r\n       * #i3992025# #r- 7000 �� ����#k\r\n\r\n-------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L3##i1032136# #b#z1032136##k #d�ý��� 300 / ��, �� 200#k#l\r\n\r\n       * #i3992025# #r- 3000 �� ����#k\r\n\r\n-------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L4##i1032241# #b#z1032241##k #d�ý��� 500 / ��, �� 300#k#l\r\n\r\n       * #i3992025# #r- 7000 �� ����#k\r\n\r\n-------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L5##i1113149# #b#z1113149##k #d�ý��� 600 / ��, �� 300#k#l\r\n\r\n       * #i3992025# #r- 8000 �� ����#k\r\n\r\n-------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L6##i1122254# #b#z1122254##k #d�ý��� 300 / ��, �� 200#k#l\r\n\r\n       * #i3992025# #r- 3000 �� ����#k\r\n\r\n-------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L7##i1122150# #b#z1122150##k #d�ý��� 500 / ��, �� 300#k#l\r\n\r\n       * #i3992025# #r- 7000 �� ����#k\r\n\r\n-------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L8##i1132272# #b#z1132272##k #d�ý��� 600 / ��, �� 300#k#l\r\n\r\n       * #i3992025# #r- 8000 �� ����#k\r\n\r\n-------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L9##i1152170# #b#z1152170##k #d�ý��� 600 / ��, �� 300#k#l\r\n\r\n       * #i3992025# #r- 8000 �� ����#k\r\n\r\n-------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L10##i1182087# #b#z1182087##k #d�ý��� 600 / ��, �� 350#k#l\r\n\r\n       * #i3992025# #r- 9000 �� ����#k\r\n\r\n-------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L11##i1672077# #b#z1672077##k #d��, �� 500#k#l\r\n\r\n       * #i3992025# #r- 12000 �� ����#k\r\n\r\n-------------------------------------------------------------------------------\r\n";
		cm.sendSimple(jessica);
} else {
cm.sendOk("#fn������� Extrabold##r�պ� ������ ���� 200 �̻� �̿� �����մϴ�.",9062004);
cm.dispose();
}
	} else if (status == 1) {
	if (selection == 0) {
           if(cm.haveItem(3992025, 9000)) {
	   if (cm.canHold(1012478)) {
              cm.gainItem(3992025, -9000);
              cm.setAllStat(1012478,600,350,0);
	      cm.sendOk("#fn������� Extrabold##i1012478# #b#z1012478##k #d�ý��� 600 / ��, �� 350#k �� ���� �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �պ� �� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 1) {
           if(cm.haveItem(3992025, 3000)) {
	   if (cm.canHold(1022231)) {
              cm.gainItem(3992025, -3000);
              cm.setAllStat(1022231,300,200,0);
	      cm.sendOk("#fn������� Extrabold##i1022231# #b#z1022231##k #d�ý��� 300 / ��, �� 200#k �� ���� �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �պ� �� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 2) {
           if(cm.haveItem(3992025, 7000)) {
	   if (cm.canHold(1022232)) {
              cm.gainItem(3992025, -7000);
              cm.setAllStat(1022232,500,300,0);
	      cm.sendOk("#fn������� Extrabold##i1022232# #b#z1022232##k #d�ý��� 500 / ��, �� 300#k �� ���� �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �պ� �� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 3) {
           if(cm.haveItem(3992025, 3000)) {
	   if (cm.canHold(1032136)) {
              cm.gainItem(3992025, -3000);
              cm.setAllStat(1032136,300,200,0);
	      cm.sendOk("#fn������� Extrabold##i1032136# #b#z1032136##k #d�ý��� 300 / ��, �� 200#k �� ���� �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �պ� �� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 4) {
           if(cm.haveItem(3992025, 7000)) {
	   if (cm.canHold(1032241)) {
              cm.gainItem(3992025, -7000);
              cm.setAllStat(1032241,500,300,0);
	      cm.sendOk("#fn������� Extrabold##i1032241# #b#z1032241##k #d�ý��� 500 / ��, �� 300#k �� ���� �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �պ� �� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 5) {
           if(cm.haveItem(3992025, 8000)) {
	   if (cm.canHold(1113149)) {
              cm.gainItem(3992025, -8000);
              cm.setAllStat(1113149,600,300,0);
	      cm.sendOk("#fn������� Extrabold##i1113149# #b#z1113149##k #d�ý��� 600 / ��, �� 300#k �� ���� �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �պ� �� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 6) {
           if(cm.haveItem(3992025, 3000)) {
	   if (cm.canHold(1122254)) {
              cm.gainItem(3992025, -3000);
              cm.setAllStat(1122254,300,200,0);
	      cm.sendOk("#fn������� Extrabold##i1122254# #b#z1122254##k #d�ý��� 300 / ��, �� 200#k �� ���� �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �պ� �� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 7) {
           if(cm.haveItem(3992025, 7000)) {
	   if (cm.canHold(1122150)) {
              cm.gainItem(3992025, -7000);
              cm.setAllStat(1122150,500,300,0);
	      cm.sendOk("#fn������� Extrabold##i1122150# #b#z1122150##k #d�ý��� 500 / ��, �� 300#k �� ���� �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �պ� �� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 8) {
           if(cm.haveItem(3992025, 8000)) {
	   if (cm.canHold(1132272)) {
              cm.gainItem(3992025, -8000);
              cm.setAllStat(1132272,600,300,0);
	      cm.sendOk("#fn������� Extrabold##i1132272# #b#z1132272##k #d�ý��� 600 / ��, �� 300#k �� ���� �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �պ� �� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 9) {
           if(cm.haveItem(3992025, 8000)) {
	   if (cm.canHold(1152170)) {
              cm.gainItem(3992025, -8000);
              cm.setAllStat(1152170,600,300,0);
	      cm.sendOk("#fn������� Extrabold##i1152170# #b#z1152170##k #d�ý��� 600 / ��, �� 300#k �� ���� �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �պ� �� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 10) {
           if(cm.haveItem(3992025, 9000)) {
	   if (cm.canHold(1182087)) {
              cm.gainItem(3992025, -9000);
              cm.setAllStat(1182087,600,350,0);
	      cm.sendOk("#fn������� Extrabold##i1182087# #b#z1182087##k #d�ý��� 600 / ��, �� 350#k �� ���� �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �պ� �� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 11) {
           if(cm.haveItem(3992025, 12000)) {
	   if (cm.canHold(1672077)) {
              cm.gainItem(3992025, -12000);
              cm.setAllStat(1672077,0,500,0);
	      cm.sendOk("#fn������� Extrabold##i1672077# #b#z1672077##k #d��, �� 500#k �� ���� �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �պ� �� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 100) {
           if(cm.haveItem(3992025, 1000)) {
	   if (cm.canHold(4033364)) {
              cm.gainItem(3992025, -1000);
              cm.gainItem(4033364,10);
	      cm.sendOk("#fn������� Extrabold##i4033364# #b#z4033364##k #d10 ��#k �� ���� �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �պ� �� �����մϴ�.#k");
		cm.dispose();
	   }

}
}
}
}