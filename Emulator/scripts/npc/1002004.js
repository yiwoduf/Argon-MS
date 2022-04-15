importPackage(Packages.server.named);

var status = 0;
var sel = -1;
var mesos = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
	var chat = cm.getPlayer().getName() + "�� �ݰ����ϴ�. ���ӵ� Ȧ,¦ ������ ����,����,�� ��ڶ�� �մϴ�.\r\n";
	chat += "#b#e���ӵ� Ȧ,¦ " + Named.nextTime + "ȸ�� ��� ���� " + Named.namedTime + "#k#n\r\n";
	//if (cm.isNamedTimeOver()) {
	//	chat += "#L3##b���ӵ� Ȧ,¦ ������ �ϰ� �ͽ��ϴ�.(#r�ð��ʰ�#b)#l\r\n";
	//} else {
		chat += "#L0##b���ӵ� Ȧ,¦�� ������ �ϰ� �ͽ��ϴ�.#l\r\n";
	//}
	chat += "#L2#���ӵ� Ȧ,¦ ���� ������ �ް� �ͽ��ϴ�.#l\r\n";
	chat += "#L1#���ӵ� Ȧ,¦�� ���ؼ� ������ ��� �ͽ��ϴ�.#l";
	cm.sendSimple(chat);
    } else if (status == 1) {
	sel = selection;
	if (selection == 0) {
		if (Named.isCheck(cm.getPlayer().getId(), Named.nextDate + "-" + Named.nextTime)) {
			cm.sendOk(cm.getPlayer().getName() + "���� " + Named.nextTime + "ȸ���� �̹� ������ �ϼ̽��ϴ�.");
			cm.dispose();
			return;
		}
		if (Named.isCheck(cm.getPlayer().getId())) {
			cm.sendOk("���� ���� ������ ȸ�� �Ͻ��� �̿��� �ֽñ� �ٶ��ϴ�.");
			cm.dispose();
			return;
		}
		cm.sendSimple("� ������ ���� �Ͻðڽ��ϱ�?\r\n#b#L0#�޼Ҹ� ���� �ϰڽ��ϴ�.#l");
	} else if (selection == 1) {
		cm.sendOk("���ӵ��ٸ�(Ȧ,¦)����� ����ϴ� ����̸� �޼ҿ� ��Ÿ�������� ���� �� �� �ֽ��ϴ�.\r\n\r\n#e#b<Ȧ,¦ ����>#n#k\r\nȦ / ¦ 1.8��\r\n���� ���� 4��  3�� / 1.6��\r\n��3 ��3 ��4 ��4 /2.5\r\n\r\n#e#r<���ӵ� ��ٸ� ���>#n#k\r\n���� / ���ʿ��� ���\r\n���� / �����ʿ��� ���\r\n3�� / ��ٸ� ����\r\n4�� / ��ٸ� ����\r\n��3 / ���ʿ��� ����ؼ� ��ٸ� ����\r\n��3 / �����ʿ��� ����ؼ� ��ٸ� ����\r\n��4 / ���ʿ��� ����ؼ� ��ٸ� ����\r\n��4 / �����ʿ��� ����ؼ� ��ٸ� ����\r\n\r\n���߷� 100%! ���÷� 100%!�� ����մϴ�!!\r\n#rȦ,¦ ����� http://named.com������ Ȯ�� �����մϴ�.");
		cm.dispose();
	} else if (selection == 2) {
		cm.sendYesNo("���� ����� ������ �ʾ��� ��� ���ñ���� ���� �˴ϴ�. \r\n#e#rex)1ȸ���� ���� �� �� 1ȸ���� ������ �ʾ����� ������ �������� �Ҷ�#n#k ������ ������ �����ðڽ��ϱ�?");
	} else if (selection ==3 ){
		cm.dispose();
		return;
	}
    } else if (status == 2) {
	if (sel == 2) {
		if (!Named.isCheck(cm.getPlayer().getId())) {
			cm.sendOk("�˼������� ���� �� �ִ� ������ �����ϴ�.");
			cm.dispose();
			return;
		} else {
			cm.sendSimple("������ ������ ������ ������ �ּ���.\r\n#b" + Named.getText(cm.getPlayer().getId()));
		}
	} else if (sel == 0 ) {
		cm.sendGetNumber("�����Ͻ� �޼Ҹ� �Է��� �ּ���",1,1,cm.getMeso() > 200000000 ? 200000000 : cm.getMeso());
	}
    } else if (status == 3) {
	if (sel == 2) {
		if (Named.giveItemorMeso(selection,cm.getPlayer())) {
			cm.sendOk("���� ������ �� �����̳���? �������� �� �̿����ֽø� ���� �ϰڽ��ϴ�.");
			cm.dispose();
			return;
		} else {
			cm.sendOk("�κ��丮�� �� ������ Ȯ�� �� �� �ٽ� �õ��� �ֽñ� �ٶ��ϴ�.");
			cm.dispose();	
			return;
		}
	} else if (sel == 0) {
		mesos = selection;
		cm.sendYesNo("������ " + cm.Comma(mesos) + "�޼Ҹ� ���� �Ͻðڽ��ϱ�?");
	}
    } else if (status == 4) {
	if (mesos > 30000000) {
		cm.sendOk("�ִ� ���� �ݾ��� 3õ�� �޼� �Դϴ�.");
		cm.dispose();
		return;
	}
	cm.sendSimple("�����Ͻ� ���� ���� �ϼ���.\r\n#b#L0#Ȧ #r(1.8��)#b#l\r\n#L1#¦ #r(1.8��)#b#l\r\n#L2#���� #r(1.6��)#b#l\r\n#L3#���� #r(1.6��)#b#l\r\n#L4#3�� #r(1.6��)#b#l\r\n#L5#4�� #r(1.6��)#b#l\r\n#L6#��3 #r(2.5��)#b#l\r\n#L7#��3 #r(2.5��)#b#l\r\n#L8#��4 #r(2.5��)#b#l\r\n#L9#��4 #r(2.5��)#b#l");
    } else if (status == 5) {
	cm.installNamed(mesos,selection);
    }
}
