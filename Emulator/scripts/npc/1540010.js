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
        var chat = "   #i3120000##fn������� Extrabold##fs13# ���ζ�¶��� �Ŀ������Դϴ�!#i3120000##n#k\r\n#fs11##Cgray#                   ���ζ�¶��ο��� ��ſ� �ð� �ǽñ� �ٶ��ϴ�.\r\n\r\n\r\n";
        chat += "#r�� #h0#���� �Ŀ�����Ʈ�� "+cm.getPlayer().getRC()+" �� �Դϴ�.#k\r\n";
        chat += "#b�� #h0#���� #z4001254#�� ������ "+cm.itemQuantity(4001254)+" �� �Դϴ�.#k\r\n";
	chat += "#L0#"+����+"#d [HOT] �߰� ����\r\n";
        chat += "#L1#"+����+"#d [HOT] �Ŀ� ����\r\n";
        chat += "#L2#"+����+"#d [HOT] Ư�� �г��� �����\r\n";
        chat += "#L3#"+����+"#d �ڵ� �Ŀ�����A\r\n";
        chat += "#L4#"+����+"#d �ڵ� �Ŀ�����B\r\n";
        chat += "#L6#"+����+"#d �Ŀ� ���� (���ڼ�Ʈ)\r\n";
        chat += "#L7#"+����+"#d �Ŀ� ���� (���ڼ�Ʈ)\r\n";
        chat += "#L8#"+����+"#d �Ŀ� ������\r\n";
        chat += "#L9#"+����+"#d �Ŀ�����Ʈ ��ȯ\r\n";
        cm.sendSimple(chat);

    } else if (status == 1) {
    if (selection == 0) {
       cm.dispose();
     //  cm.openNpc(2520002);
       cm.openNpc(9010029);

    } else if (selection == 1) {
        cm.dispose();
        cm.openNpc(9072200);

    } else if (selection == 2) {
	cm.sendOk("īī���� : @���ζ�¶���\r\n����Ʈ�� : saracen_dev@nate.com\r\nƯ�� �Ŀ��� 1:1 ����� �̿����ּ���!");
	cm.dispose();

    } else if (selection == 3) {
        cm.dispose();
        cm.openNpc(1032005);

    } else if (selection == 4) {
        cm.dispose();
        cm.openNpc(2030001);

    } else if (selection == 5) {
        cm.dispose();
        cm.openNpc(1094000);

    } else if (selection == 6) {
        cm.dispose();
        cm.openNpc(2400010);

    } else if (selection == 7) {
        cm.dispose();
        cm.openNpc(1032100);

    } else if (selection == 8) {
	cm.dispose();
	cm.openNpc(2182002);

    } else if (selection == 9) {
	cm.dispose();
	cm.openNpc(1102003);

		}
	}
}