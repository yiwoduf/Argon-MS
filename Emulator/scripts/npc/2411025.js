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
        chat += "#L1#"+"#d ����&��Ÿ ���� �����ۥ�\r\n";
        chat += "#L2#"+"#d ��Ÿ ���� �����ۥ�\r\n";
        chat += "#L3#"+"#d ť�� ���� ������\r\n";
        cm.sendSimple(chat);

    } else if (status == 1) {

     if (selection == 1) {
        cm.dispose();
        cm.openShop(100001);

    } else if (selection == 2) {
        cm.dispose();
        cm.openShop(100002);

    } else if (selection == 3) {
        cm.dispose();
        cm.openShop(100003);


		}
	}
}