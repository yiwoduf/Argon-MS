/*
����, Lilin_
*/
importPackage(Packages.constants);
importPackage(Packages.packet.creators);
importPackage(Packages.launch.world);

var status = 0;
var correctAnswer = 0;
var getServerName = ServerConstants.serverName; //���� �̸� �̾ƿ���

var map = 109090200; //������ ���� , �������� ����
var npc = 2007; //���Ǿ� �ڵ� ���ּž� �̸��� ��Ȯ�ϰ� ��ϴ�~

var q = new Array//"����#1����#2����#3����#4����#������"
	("Q: " + getServerName + "�� �޼� ������?#3#5#50#55#1",
		"Q: ������ Ʋ������?#���ε� - �� ���#������ - ����#���� - ������#��������- ������ ��.��.��#2",
		"Q: ��� Ƚ���� ���� ��ġ�̴�. ������ �´� ����?#��� 3ȸ ���� 1��#��� 5ȸ ���� 3��#��� 10ȸ ���� 10��#��� 15ȸ ����#1",
		"Q: " + getServerName + "�� ��Ÿ�� �ð���?#���� 2��#���� 10��#���� 12��#���� 2��#4",
		"Q: " + getServerName + "�� ������?#210#219#220#65#3");

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
			if (cm.getPlayer().getMapId() == 10000) { 
				cm.sendNext("#fn������� Extrabold##fs12#�ȳ��ϼ���!\r\n���� #b#p" + npc + "##k����~ ���ݺ��� " + getServerName + "�� ���ؼ� �˷��帱�Կ�~");
			}
		} else if (status == 1) {
			cm.sendSimpleS("(������ �����?)\r\n#L7#�Ұ�\r\n#L1#����\r\n#L2#��Ģ\r\n#L3#��ڴԺе���?\r\n#L4#��ڴԿ���ó\r\n#L5#ī���ּҴ�?\r\n#L6#���������� �����ּ���!", 2);
			//cm.sendNextS("");
		} else if (status == 2) {
			if (selection == 1) {
				cm.sendOk("Exp 50\r\nMeso 3\r\nDrop 5\r\n��� ���� ������ �����ϰ� �ֽ��ϴ�");
				cm.dispose();
			} else if (selection == 2) {
				var chat = "1. �ڸ���ƿ ����\r\n�⺻���� �ų��Դϴ�. �ѵι� ���ǿ��� �������� �ڸ� ��ƿ�ÿ��� ��� ��ġ�ϰڽ��ϴ�\r\n\r\n";
				chat += "2. �� ������\r\n���� �⺻���� ��Ģ�Դϴ�. �����ϰ� �÷����ϴ� Ÿ�������� ���� ���� ������� �����ּ���.\r\n\r\n";
				chat += "���� ��ũ�ε� �ȵ˴ϴ�. ���߽� ��� ������ ó���ϰڽ��ϴ�.\r\n\r\n";
				chat += "3. GM ��Ī ����\r\n ���߽� ��� ���ֹ� ó���ϰڽ��ϴ�\r\n\r\n";
				chat += "4. �ο� ����\r\n�弳�ϸ� �ο��� �����ּ���. Ÿ�����鿡�� ���ظ� �ݴϴ�.[��� 2ȸ]\r\n\r\n";
				chat += "�ذ�� Ƚ���� ���� ��ġ\r\n��� 3ȸ - �������� 1��\r\n��� 5ȸ - �������� 5��\r\n��� 10ȸ - ��������";
				cm.sendOk(chat);
				cm.dispose();
			} else if (selection == 3) {
				cm.sendOk("���ε� - �� ���\r\n������ - �� ���\r\n���� - ������\r\n�������� - #r����#k�� #r��.��.��#k\r\n�̽ö��ϴ�~ ��Ī�� �������ּ���!");
				cm.dispose();
			} else if (selection == 4) {
				cm.sendOk("mindonline  - �� ����̽� ���ε�� ī����̵��Դϴ�.");
				cm.dispose();
			} else if (selection == 5) {
				cm.sendOk("#b���ε�.������.�ѱ�#k �Դϴ�. ���� ����ּ���~");
				cm.dispose();
			} else if (selection == 6) {
				cm.sendYesNo("���� ������ ���Ƿ��� ���� ���� ������ 3�� Ǯ����ؿ�~\r\n�׷� �����غ����?");
			} else if (selection == 7) {
				cm.sendOk("����" + getServerName + "�� KMS 1.2.220 �� ����ϰ� �ֽ��ϴ�.\r\n���ڼ����� ���¸� �ϰ� �ְ�\r\n�ָ� ��Ÿ�� �̺�Ʈ�� ���� 2�ÿ� �����ϰ� �ֽ��ϴ�. ");
				cm.dispose();
			}
		} else if (status == 3) {
			//���� ����
			cm.sendSimple("�׷� �����Դϴ�.\r\n\r\n" + getQuestion(q[Math.floor(Math.random() * q.length)]));
		} else if (status == 4) {
			if (selection == correctAnswer) {
				cm.sendOk("�����Դϴ�. ���� ���� �غ� �Ǽ̽��ϱ�?");
			} else {
				cm.sendOk("ù ��° �������� Ʋ�ȱ���!\r\n�ٽ� �����ϼ���.");
				cm.dispose();
			}
		} else if (status == 5) {
			cm.sendSimple("�׷� �����Դϴ�.\r\n\r\n" + getQuestion(q[Math.floor(Math.random() * q.length)]));
		} else if (status == 6) {
			if (selection == correctAnswer) {
				cm.sendOk("�����Դϴ�. ���� ���� �غ� �Ǽ̽��ϱ�?");
			} else {
				cm.sendOk("�� ��° �������� Ʋ�ȱ���!\r\n�ٽ� �����ϼ���.");
				cm.dispose();
			}
		} else if (status == 7) {
			cm.sendSimple("�׷� �����Դϴ�.\r\n\r\n" + getQuestion(q[Math.floor(Math.random() * q.length)]));
		} else if (status == 8) {
			if (selection == correctAnswer) {
				cm.sendNext("�����Դϴ�.\r\n���� ���������� �����帮�ڽ��ϴ�!");
			} else {
				cm.sendOk("��...������ �������� Ʋ�ȱ���...\r\n�ƽ����� �ٽ� �����ϼ���.");
				cm.dispose();
			}
		} else if (status == 9) {
            //1��//2��Ƽ//3ģ��//4���//5����//6ȸ��//7����(����������)//8�����//9�Ķ���//10����ä��
            //���� 8����
            WorldBroadcasting.broadcast(MainPacketCreator.getGMText(7, "��["+cm.getPlayer().getName()+"]���� Ʃ�丮���� �Ϸ��ϼ̽��ϴ�. ��� �������ּ���!��"));
			cm.warp(map, 0);
			cm.dispose();
		}
	}
}

function getQuestion(qSet) {
	var q = qSet.split("#");
	var qLine = q[0] + "\r\n\r\n#L0#" + q[1] + "#l\r\n#L1#" + q[2] + "#l\r\n#L2#" + q[3] + "#l\r\n#L3#" + q[4] + "#l";
	correctAnswer = parseInt(q[5], 9); // 5���� ������ �� 9�� status �� ��������
	correctAnswer -= 1;
	return qLine;
}