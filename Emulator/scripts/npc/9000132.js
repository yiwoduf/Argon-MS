var count;

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
	 {
            var chat = "#fn������� Extrabold##r��� ũ����Ʈ �ý���#k �� ���� �˰� �;�?\r\n";
	    chat += "#b#L102#��� ũ����Ʈ#k ��?\r\n";
	    chat += "#L104#�ռ��� �ʿ��� #b����#k �� ������?\r\n";
	    chat += "#b#L100#��� ��#k ���� �ϱ�\r\n";
	    chat += "#b#L101#���Ʈ#k ���� �ϱ�";
	    cm.sendSimple(chat);
	}
        } else if (status == 1) {
	    if (selection == 100) {
	       var chat = "#fn������� Extrabold#�ȳ��ϼ��� #b#h0# ��!#k ���� ���� #r���#k �� ������־��.\r\n#r��� ũ����Ʈ ��#k �� #r���#k �� ��ġ�� #r�̻� ���#k �� ź�� !!";
	       chat += "\r\n\r\n#d�Ʒ� ��ǰ�� ����ּ���.#k";
	       chat += "\r\n#L1##i4440000#  +  #i1112762#  =  #i1112763#   (#z1112763#)";
	       chat += "\r\n#L2##i4441000#  +  #i1112762#  =  #i1112767#   (#z1112767#)";
	       chat += "\r\n#L3##i4442000#  +  #i1112762#  =  #i1112771#   (#z1112771#)";
	       chat += "\r\n#L4##i4443000#  +  #i1112762#  =  #i1112775#   (#z1112775#)\r\n"; // S�� ��
	       chat += "\r\n#L5##i4440100#  +  #i1112762#  =  #i1112764#   (#z1112764#)";
	       chat += "\r\n#L6##i4441100#  +  #i1112762#  =  #i1112768#   (#z1112768#)";
	       chat += "\r\n#L7##i4442100#  +  #i1112762#  =  #i1112772#   (#z1112772#)";
	       chat += "\r\n#L8##i4443100#  +  #i1112762#  =  #i1112776#   (#z1112776#)\r\n"; // A�� ��
	       chat += "\r\n#L9##i4440200#  +  #i1112762#  =  #i1112765#   (#z1112765#)";
	       chat += "\r\n#L10##i4441200#  +  #i1112762#  =  #i1112769#    (#z1112769#)";
	       chat += "\r\n#L11##i4442200#  +  #i1112762#  =  #i1112773#    (#z1112773#)";
	       chat += "\r\n#L12##i4443200#  +  #i1112762#  =  #i1112777#    (#z1112777#)\r\n"; // B�� ��
	       chat += "\r\n#L13##i4440300#  +  #i1112762#  =  #i1112766#    (#z1112766#)";
	       chat += "\r\n#L14##i4441300#  +  #i1112762#  =  #i1112770#    (#z1112770#)";
	       chat += "\r\n#L15##i4442300#  +  #i1112762#  =  #i1112774#    (#z1112774#)";
	       chat += "\r\n#L16##i4443300#  +  #i1112762#  =  #i1112778#    (#z1112778#)\r\n"; // C�� ��
	       cm.sendSimple(chat);

	 } else if (selection == 101) {
	       var chatt = "#fn������� Extrabold#�ȳ��ϼ��� #b#h0# ��!#k ���� ���� #r���Ʈ#k �� ������־��.\r\n#r��� ũ����Ʈ ��Ʈ#k �� #r���#k �� ��ġ�� #r�̻� ���Ʈ#k �� ź�� !!";
	       chatt += "\r\n\r\n#d�Ʒ� ��ǰ�� ����ּ���.#k";
	       chatt += "\r\n#L17##i4440000#  +  #i1132191#  =  #i1132192#   (#z1132192#)";
	       chatt += "\r\n#L18##i4441000#  +  #i1132191#  =  #i1132196#   (#z1132196#)";
	       chatt += "\r\n#L19##i4442000#  +  #i1132191#  =  #i1132200#   (#z1132200#)";
	       chatt += "\r\n#L20##i4443000#  +  #i1132191#  =  #i1132204#   (#z1132204#)\r\n"; // S�� ��Ʈ
	       chatt += "\r\n#L21##i4440100#  +  #i1132191#  =  #i1132193#   (#z1132193#)";
	       chatt += "\r\n#L22##i4441100#  +  #i1132191#  =  #i1132197#   (#z1132197#)";
	       chatt += "\r\n#L23##i4442100#  +  #i1132191#  =  #i1132201#   (#z1132201#)";
	       chatt += "\r\n#L24##i4443100#  +  #i1132191#  =  #i1132205#   (#z1132205#)\r\n"; // A�� ��Ʈ
	       chatt += "\r\n#L25##i4440200#  +  #i1132191#  =  #i1132194#   (#z1132194#)";
	       chatt += "\r\n#L26##i4441200#  +  #i1132191#  =  #i1132198#   (#z1132198#)";
	       chatt += "\r\n#L27##i4442200#  +  #i1132191#  =  #i1132202#   (#z1132202#)";
	       chatt += "\r\n#L28##i4443200#  +  #i1132191#  =  #i1132206#   (#z1132206#)\r\n"; // B�� ��Ʈ
	       chatt += "\r\n#L29##i4440300#  +  #i1132191#  =  #i1132195#   (#z1132195#)";
	       chatt += "\r\n#L30##i4441300#  +  #i1132191#  =  #i1132199#   (#z1132199#)";
	       chatt += "\r\n#L31##i4442300#  +  #i1132191#  =  #i1132203#   (#z1132203#)";
	       chatt += "\r\n#L32##i4443300#  +  #i1132191#  =  #i1132207#   (#z1132207#)\r\n"; // C�� ��Ʈ
	       cm.sendSimple(chatt);

             } else if (selection == 102) { // ��� ũ����Ʈ ��?
           	cm.sendOk("#fn������� Extrabold#��� ũ����Ʈ�� �ƹ��� �ɷ��� ���� �����ۿ� Ư���� ���� ���� ������ �ռ��ϸ�, ������ ������ �ִ� �ɷ�ġ�� ��� ���������� ���� �����ִ� Ư���� ��ġ��.");
		cm.dispose();
             } else if (selection == 103) { // ��� �ó��� ��?
           	cm.sendOk("#fn������� Extrabold##i2048402# �̰� �ٷ� ��� �ó�����. Ȥ�� ������ �ʿ����� ���� ��� �� �ΰ� �̻� �ִٸ�, ��� �ó����� �̿��غ�. ������ �ʿ� ���� �ΰ��� ����� �ռ��Ͽ� �װ� ���ϴ� ����� ���� �� �������� ����.");
		cm.dispose();
             } else if (selection == 104) { // �ռ��� �ʿ��� ������?
           	cm.sendOk("#fn������� Extrabold##i1112762# ��� ũ����Ʈ ���� �ɷ�ġ�� �ռ��ϱ� ���ؼ� Ư���� ������ �ʿ���. �ɷ�ġ�� ��鿩�� ������ �ο��� Ư���� ����. �װ� �츮�� ����̶�� �ҷ�.");
		cm.dispose();
             } else if (selection == 105) { // �ó��� �ý���
		cm.dispose();
                cm.openNpc(9000040);
		return;

}
        } else if (status == 2) {
	    }  if (selection == 1) {
		if (cm.haveItem(4440000, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112763)) {
		        cm.sendOk("#fn������� Extrabold##bS�� ���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4440000, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112763, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}	
				
	    }  if (selection == 2) {
		if (cm.haveItem(4441000, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112767)) {
		        cm.sendOk("#fn������� Extrabold##bS�� ����� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4441000, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112767, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 3) {
		if (cm.haveItem(4442000, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112771)) {
		        cm.sendOk("#fn������� Extrabold##bS�� ������ ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4442000, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112771, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 4) {
		if (cm.haveItem(4443000, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112775)) {
		        cm.sendOk("#fn������� Extrabold##bS�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4443000, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112775, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 5) {
		if (cm.haveItem(4440100, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112764)) {
		        cm.sendOk("#fn������� Extrabold##bA�� ���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4440100, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112764, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 6) {
		if (cm.haveItem(4441100, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112768)) {
		        cm.sendOk("#fn������� Extrabold##bA�� ����� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4441100, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112768, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 7) {
		if (cm.haveItem(4442100, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112772)) {
		        cm.sendOk("#fn������� Extrabold##bA�� ������ ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4442100, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112772, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 8) {
		if (cm.haveItem(4443100, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112776)) {
		        cm.sendOk("#fn������� Extrabold##bA�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4443100, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112776, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 9) {
		if (cm.haveItem(4440200, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112765)) {
		        cm.sendOk("#fn������� Extrabold##bB�� ���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4440200, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112765, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 10) {
		if (cm.haveItem(4441200, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112769)) {
		        cm.sendOk("#fn������� Extrabold##bB�� ����� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4441200, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112769, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 11) {
		if (cm.haveItem(4442200, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112773)) {
		        cm.sendOk("#fn������� Extrabold##bB�� ������ ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4442200, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112773, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 12) {
		if (cm.haveItem(4443200, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112777)) {
		        cm.sendOk("#fn������� Extrabold##bB�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4443200, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112777, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 13) {
		if (cm.haveItem(4440300, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112766)) {
		        cm.sendOk("#fn������� Extrabold##bC�� ���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4440300, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112766, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 14) {
		if (cm.haveItem(4441300, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112770)) {
		        cm.sendOk("#fn������� Extrabold##bC�� ����� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4441300, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112770, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 15) {
		if (cm.haveItem(4442300, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112774)) {
		        cm.sendOk("#fn������� Extrabold##bC�� ������ ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4442300, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112774, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 16) {
		if (cm.haveItem(4443300, 1) && (cm.haveItem(1112762, 1))) {
		    if (cm.canHold(1112778)) {
		        cm.sendOk("#fn������� Extrabold##bC�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4443300, -1);
			cm.gainItem(1112762, -1);
			cm.gainItem(1112778, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}	

        } else if (status == 3) {
	    }  if (selection == 17) {
		if (cm.haveItem(4440000, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132192)) {
		        cm.sendOk("#fn������� Extrabold##bS�� ���� ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4440000, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132192, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}	
				
	    }  if (selection == 18) {
		if (cm.haveItem(4441000, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132196)) {
		        cm.sendOk("#fn������� Extrabold##bS�� ����� ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4441000, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132196, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 19) {
		if (cm.haveItem(4442000, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132200)) {
		        cm.sendOk("#fn������� Extrabold##bS�� ������ ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4442000, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132200, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 20) {
		if (cm.haveItem(4443000, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132204)) {
		        cm.sendOk("#fn������� Extrabold##bS�� ��ø���� ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4443000, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132204, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 21) {
		if (cm.haveItem(4440100, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132193)) {
		        cm.sendOk("#fn������� Extrabold##bA�� ���� ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4440100, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132193, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 22) {
		if (cm.haveItem(4441100, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132197)) {
		        cm.sendOk("#fn������� Extrabold##bA�� ����� ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4441100, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132197, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 23) {
		if (cm.haveItem(4442100, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132201)) {
		        cm.sendOk("#fn������� Extrabold##bA�� ������ ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4442100, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132201, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 24) {
		if (cm.haveItem(4443100, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132205)) {
		        cm.sendOk("#fn������� Extrabold##bA�� ��ø���� ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4443100, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132205, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 25) {
		if (cm.haveItem(4440200, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132194)) {
		        cm.sendOk("#fn������� Extrabold##bB�� ���� ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4440200, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132194, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 26) {
		if (cm.haveItem(4441200, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132198)) {
		        cm.sendOk("#fn������� Extrabold##bB�� ����� ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4441200, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132198, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 27) {
		if (cm.haveItem(4442200, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132202)) {
		        cm.sendOk("#fn������� Extrabold##bB�� ������ ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4442200, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132202, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 28) {
		if (cm.haveItem(4443200, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132206)) {
		        cm.sendOk("#fn������� Extrabold##bB�� ��ø���� ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4443200, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132206, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 29) {
		if (cm.haveItem(4440300, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132195)) {
		        cm.sendOk("#fn������� Extrabold##bC�� ���� ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4440300, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132195, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 30) {
		if (cm.haveItem(4441300, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132199)) {
		        cm.sendOk("#fn������� Extrabold##bC�� ����� ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4441300, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132199, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 31) {
		if (cm.haveItem(4442300, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132203)) {
		        cm.sendOk("#fn������� Extrabold##bC�� ������ ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4442300, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132203, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}
	    }  if (selection == 32) {
		if (cm.haveItem(4443300, 1) && (cm.haveItem(1132191, 1))) {
		    if (cm.canHold(1132207)) {
		        cm.sendOk("#fn������� Extrabold##bC�� ��ø���� ���Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4443300, -1);
			cm.gainItem(1132191, -1);
			cm.gainItem(1132207, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r���ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##r���� ��ᰡ �����մϴ�.#k");
		    cm.dispose();

}	
		}
	}
}




