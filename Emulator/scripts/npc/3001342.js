
var status = -1;var k = "#fNpc/9000000/stand/0#";
var k1 = "#fNpc/9000000/stand/0#";
function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
	var chat = "�ȳ��ϼ��� �帲�÷����� #b�Ŀ�����#k������ϰ� �ִ� ������մϴ�.#b";
	chat += "\r\n#L4##i1004808# �����ο���#l #Cyellow##L3##i4310070# �Ŀ�����#l  #d#L9##s5321054# �Ŀ�����#l#L10##b#i1702445# �˻�ĳ��#l";
	chat += "\r\n#b#L11##i2450064# ���������Ű��#l  #L12##r#i1142840# ��ũ������#l            #k#L5# ��ȭ�� �׸� �Ѵ�.#l";



	cm.sendSpirit(chat,true,0);
    } else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
		cm.openNpc(2150007);
	} else if (selection == 1) {
		cm.warp(410000000);
		cm.dispose();
	} else if (selection == 2) {
		cm.dispose();
		cm.openNpc(1530667);
	} else if (selection == 3) {
		cm.dispose();
		cm.openNpc(1530065);
	} else if (selection == 4) {
                cm.dispose();
		cm.openNpc(2182002);
	} else if (selection == 6) {
                cm.dispose();
		cm.openNpc(9075002);
	} else if (selection == 7) {
                cm.dispose();
		cm.openNpc(2220002);
	} else if (selection == 8) {
                cm.dispose();
		cm.openNpc(2159450);
	} else if (selection == 9) {
		cm.dispose();
		cm.openNpc(9072200);
	} else if (selection == 10) {
		cm.dispose();
		cm.openNpc(9201013);
	} else if (selection == 11) {
		cm.dispose();
		cm.openNpc(1540629);
	} else if (selection == 12) {
		cm.dispose();
		cm.openNpc(9072303);
	} else if (selection == 5) {
		cm.dispose();
	}
    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
