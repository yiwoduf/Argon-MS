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
	var sel = 0;
	       var leaf = cm.itemQuantity(4310129);
	       var chat = "#fn������� Extrabold#���� #b��Ӹ��� ����#k ���� ����� ������־��\r\nȤ�� ã���ô°� �����Ű���? � ��� ��ᰡ �ʿ��ϽŰ���?";
	       chat += "\r\n���� #b#h0# ��#k �� #b��Ӹ��� ����#k ������ #r"+ leaf +" ��#k �Դϴ�."
	       chat += "\r\n\r\n#d�Ʒ� ��ǰ�� ����ּ���.#k";
	       chat += "\r\n#b#L21##i4310129# (30 ��)    -    #i1132191# (#z1132191#)"; // ��� ũ����Ʈ ��Ʈ
	       chat += "\r\n#L20##i4310129# (30 ��)    -    #i1112762# (#z1112762#)\r\n"; // ��� ũ����Ʈ ��

	       chat += "\r\n#L1##i4310129# (20 ��)    -    #i4440000# (#z4440000#)";
	       chat += "\r\n#L2##i4310129# (20 ��)    -    #i4441000# (#z4441000#)";
	       chat += "\r\n#L3##i4310129# (20 ��)    -    #i4442000# (#z4442000#)";
	       chat += "\r\n#L4##i4310129# (20 ��)    -    #i4443000# (#z4443000#)\r\n"; // S��

	       chat += "\r\n#L5##i4310129# (15 ��)    -    #i4440100# (#z4440100#)";
	       chat += "\r\n#L6##i4310129# (15 ��)    -    #i4441100# (#z4441100#)";
	       chat += "\r\n#L7##i4310129# (15 ��)    -    #i4442100# (#z4442100#)";
	       chat += "\r\n#L8##i4310129# (15 ��)    -    #i4443100# (#z4443100#)\r\n"; // A��

	       chat += "\r\n#L9##i4310129# (10 ��)    -    #i4440200# (#z4440200#)";
	       chat += "\r\n#L10##i4310129# (10 ��)    -    #i4441200# (#z4441200#)";
	       chat += "\r\n#L11##i4310129# (10 ��)    -    #i4442200# (#z4442200#)";
	       chat += "\r\n#L12##i4310129# (10 ��)    -    #i4443200# (#z4443200#)\r\n"; // B��

	       chat += "\r\n#L13##i4310129# (5 ��)    -    #i4440300# (#z4440300#)";
	       chat += "\r\n#L14##i4310129# (5 ��)    -    #i4441300# (#z4441300#)";
	       chat += "\r\n#L15##i4310129# (5 ��)    -    #i4442300# (#z4442300#)";
	       chat += "\r\n#L16##i4310129# (5 ��)    -    #i4443300# (#z4443300#)\r\n"; // C��

	       chat += "\r\n#L17##i4310129# (10 ��)  - #i2049139# (#z2049139#)";
	       chat += "\r\n#L18##i4310129# (15 ��)  - #i2049140# (#z2049140#)";
	       chat += "\r\n#L19##i4310129# (20 ��)  - #i2049141# (#z2049141#)"; // ��� ũ����Ʈ �ֹ���
	       cm.sendSimple(chat);

	    }  if (selection == 21) {
		if (cm.haveItem(4310129, 30)) {
		    if (cm.canHold(1132191)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #b��� ũ����Ʈ ��Ʈ#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -30);
			cm.gainItem(1132191, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 30 �� �ʿ� ]#k");
		    cm.dispose();

}

	    }  if (selection == 20) {
		if (cm.haveItem(4310129, 30)) {
		    if (cm.canHold(1112762)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #b��� ũ����Ʈ ��#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -30);
			cm.gainItem(1112762, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 30 �� �ʿ� ]#k");
		    cm.dispose();

}

	    }  if (selection == 1) {
		if (cm.haveItem(4310129, 20)) {
		    if (cm.canHold(4440000)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bS�� ���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -20);
			cm.gainItem(4440000, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 20 �� �ʿ� ]#k");
		    cm.dispose();

}	
				
	    }  if (selection == 2) {
		if (cm.haveItem(4310129, 20)) {
		    if (cm.canHold(4441000)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bS�� ����� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -20);
			cm.gainItem(4441000, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 20 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 3) {
		if (cm.haveItem(4310129, 20)) {
		    if (cm.canHold(4442000)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bS�� ������ ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -20);
			cm.gainItem(4442000, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 20 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 4) {
		if (cm.haveItem(4310129, 20)) {
		    if (cm.canHold(4443000)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bS�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -20);
			cm.gainItem(4443000, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 20 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 5) {
		if (cm.haveItem(4310129, 15)) {
		    if (cm.canHold(4440100)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bA�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -15);
			cm.gainItem(4440100, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 15 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 6) {
		if (cm.haveItem(4310129, 15)) {
		    if (cm.canHold(4441100)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bA�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -15);
			cm.gainItem(4441100, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 15 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 7) {
		if (cm.haveItem(4310129, 15)) {
		    if (cm.canHold(4442100)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bA�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -15);
			cm.gainItem(4442100, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 15 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 8) {
		if (cm.haveItem(4310129, 15)) {
		    if (cm.canHold(4443100)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bA�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -15);
			cm.gainItem(4443100, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 15 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 9) {
		if (cm.haveItem(4310129, 10)) {
		    if (cm.canHold(4440200)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bB�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -10);
			cm.gainItem(4440200, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 10 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 10) {
		if (cm.haveItem(4310129, 10)) {
		    if (cm.canHold(4441200)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bB�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -10);
			cm.gainItem(4441200, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 10 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 11) {
		if (cm.haveItem(4310129, 10)) {
		    if (cm.canHold(4442200)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bB�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -10);
			cm.gainItem(4442200, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 10 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 12) {
		if (cm.haveItem(4310129, 10)) {
		    if (cm.canHold(4443200)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bB�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -10);
			cm.gainItem(4443200, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 10 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 13) {
		if (cm.haveItem(4310129, 5)) {
		    if (cm.canHold(4440300)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bC�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -5);
			cm.gainItem(4440300, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 5 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 14) {
		if (cm.haveItem(4310129, 5)) {
		    if (cm.canHold(4441300)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bC�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -5);
			cm.gainItem(4441300, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 5 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 15) {
		if (cm.haveItem(4310129, 5)) {
		    if (cm.canHold(4442300)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bC�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -5);
			cm.gainItem(4442300, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 5 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 16) {
		if (cm.haveItem(4310129, 5)) {
		    if (cm.canHold(4443300)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #bC�� ��ø���� ���#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -5);
			cm.gainItem(4443300, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 5 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 17) {
		if (cm.haveItem(4310129, 10)) {
		    if (cm.canHold(2049139)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #b����� ȥ���� �ֹ��� 60%#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -10);
			cm.gainItem(2049139, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 10 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 18) {
		if (cm.haveItem(4310129, 15)) {
		    if (cm.canHold(2049140)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #b����� ���� ȥ���� �ֹ��� 40%#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -15);
			cm.gainItem(2049140, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 15 �� �ʿ� ]#k");
		    cm.dispose();

}
	    }  if (selection == 19) {
		if (cm.haveItem(4310129, 20)) {
		    if (cm.canHold(2049141)) {
		        cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k ���� #b����� ������ ȥ���� �ֹ��� 30%#k �� �����Ͽ����ϴ�.");

			cm.gainItem(4310129, -20);
			cm.gainItem(2049141, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k �� �����մϴ�.\r\n#r[ ��Ӹ��� ���� 20 �� �ʿ� ]#k");
		    cm.dispose();

}
	 
		}
	}
}