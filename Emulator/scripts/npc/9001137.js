var status = 0;

importPackage(Packages.constants);

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
           var chat = "#fn������� Extrabold#	    #b"+ServerConstants.serverName+"#k�� ��� �ý��� (Function System)�Դϴ�.#fs10#\r\n";

           chat += "				             #Cgray# "+ServerConstants.serverName+"�� ���Ű��� ȯ���մϴ�.#fs12##k\r\n\r\n"
           chat += "               #k������ �����÷����� #b" + cm.getConnect() + "#k��� �Բ��ϰ��ֽ��ϴ١�\r\n";
	chat += "#L1##v2434625# ���� ����#l";
	chat += "#L2##v3700338# ��� ���#l";
	chat += "#L3##v1402259# ���� �̿�#l\r\n";
	chat += "#L4##v4001861# �޼� ��ȯ#l";
	chat += "  #L5##v4032279# �巡 ���#l";
	chat += "#L6##v2434620# ���� �ϱ�#l\r\n";
	chat += "#L7##v2702000# ��� ��Ƽ#l";
	chat += " #L8##v4009029# ���� ���#l";
	chat += " #L9##v3014005# ���� ��ŷ#l\r\n";
	chat += "#L10##v4031286# â�� �̿�";
	chat += " #L11##v2501000# �ɼ� ����#l"
	chat += "#L12##v1702445# ĳ�� ����\r\n";
	chat += "#L13##v1112763# ��� ����";
	chat += "  #L14##v5050100# AP ��ȭ";
	chat += " #L15##v2430205# ���� ����\r\n";
	cm.sendSimple(chat);

	} else if (status == 1) {

	if (selection == 1) {
	cm.dispose();
	cm.openNpc(2159473);
	
	} else if (selection == 2) {
	cm.dispose();
	cm.openNpc(9000217);

	} else if (selection == 3) {
	cm.dispose();
	cm.openNpc(1540101);

	} else if (selection == 4) {
	cm.dispose();
	cm.openNpc(1012112);

	} else if (selection == 5) {
	cm.dispose();
	cm.openNpc(1540315);

	} else if (selection == 6) {
	cm.dispose();
	cm.openNpc(9010009);

	} else if (selection == 7) {
	cm.dispose();
	cm.openNpc(1100004);

	} else if (selection == 8) {
	cm.dispose();
	cm.openNpc(1012121);

	} else if (selection == 9) {
	cm.dispose();
	cm.openNpc(2192002);

	} else if (selection == 10) {
	cm.dispose();
	cm.openNpc(2400002);

	} else if (selection == 11) {
	cm.dispose();
	cm.openNpc(1013001);

	} else if (selection == 12) {
	cm.dispose();
	cm.openNpc(2081010);
	
	} else if (selection == 13) {
	cm.dispose();
	cm.openNpc(9010015);

	} else if (selection == 14) {
	cm.dispose();
	cm.openNpc(2161005);

	} else if (selection == 15) {
	cm.dispose();
	cm.warp(910370100, 0);

			}
		}
	}
}