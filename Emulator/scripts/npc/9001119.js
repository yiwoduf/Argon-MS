importPackage(Packages.constants);

var status = -1;

���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"

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
        var chat = "#fn������� ExtraBold#         #b"+ServerConstants.serverName+"#k�� �Һ� ������ ���Ű��� ȯ���մϴ� :)\r\n\r\n\r\n";
        chat += "#L1#"+"#d 10% ������ �ֹ�������\r\n";
        chat += "#L2#"+"#d 60% ������ �ֹ�������\r\n";
        chat += "#L3#"+"#d ����&��Ÿ ���� �����ۥ�\r\n";
        chat += "#L4#"+"#d ��Ÿ ���� �����ۥ�\r\n";
        chat += "#L5#"+"#d ť�� ���� ������\r\n";
        cm.sendSimple(chat);

    } else if (status == 1) {
    if (selection == 1) {
       cm.dispose();
       cm.openNpc(3003352);

    } else if (selection == 2) {
        cm.dispose();
        cm.openNpc(3003353);

    } else if (selection == 3) {
        cm.dispose();
        cm.openNpc(3003354);

    } else if (selection == 4) {
        cm.dispose();
        cm.openNpc(3003355);

    } else if (selection == 5) {
        cm.dispose();
        cm.openNpc(3003356);

    } else if (selection == 6) {
        cm.dispose();
        cm.openNpc(2400010);

    } else if (selection == 7) {
        cm.dispose();
        cm.openNpc(1032100);

		}
	}
}