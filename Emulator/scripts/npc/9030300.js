importPackage(Packages.server.items);
var status = 0;
var sel = -1;
var status2 = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else {
        if (status <= 2 && mode == 0) {
            cm.dispose();
            return;
        }  
        if (mode == 0) {
            cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("�Ͼ�... ���� ������ ������ ��絵�ȵǰ�..\r\n\r\n#b#L0#����� �̿��ϱ�#l\r\n#L1#����� ��ǰ, �޼� ȸ���ϱ�#l");
        } else if (status == 1) {
            if (selection == 1) {	
				if (cm.getPlayer().getLevel() < 120) {
					cm.sendOk("���� 120�̻��� ������ ������� �̿��� �� �ִٳ�.");
					cm.dispose();
					return;
				}
			cm.sendSimple("ȸ���� ��ǰ�� �������ְԳ�.\r\n\r\n#b#L0#�޼� ȸ��#l\r\n#L1#������ ȸ��#l");
           } else if (selection == 0) {
				if (cm.getPlayer().getLevel() < 120) {
					cm.sendOk("���� 120�̻��� ������ ������� �̿��� �� �ִٳ�.");
					cm.dispose();
					return;
				}
				cm.openAuction();
           } else if (selection == 2) {
				if (cm.getPlayer().getLevel() < 251) {
					cm.sendOk("����忡�� ������ �Ǹ��� �޼�ȸ���ÿ� �κ��丮 ���ִ� �޼ҿ� ���Ͽ� Ǯ�޼�(99��)�� �Ѿ�� �޼�ȸ���������ʽ��ϴ�. ���� ���� �Ͻð� ����ϼ���.");
					cm.dispose();
					return;
				}
				cm.openUI(0xA1);
				cm.dispose()
}
        } else if (status == 2) {
            sel = selection;
			if (sel == 0) {
				if (MapleAuction.�����޼�ȸ��(cm.getPlayer().getName()) == 0) {
					cm.sendOk("�ڳ״� ȸ���� �޼Ұ� ���°� ����.");
					cm.dispose();
				} else {
					cm.gainMeso(MapleAuction.�����޼�ȸ��(cm.getPlayer().getName()));
					cm.sendOk(MapleAuction.�����޼�ȸ��(cm.getPlayer().getName()) + "�޼Ҹ� ȸ�� �Ϸ� �Ͽ���.");
					MapleAuction.�޼�ȸ���Ϸ�(cm.getPlayer().getName());
					cm.getPlayer().saveToDB(false, false);
					cm.dispose();
				}
			} else if (sel == 1) {
				cm.sendSimple(MapleAuction.����������ȸ��(cm.getPlayer().getName()));
				status = 2;
			}
		} else if (status == 3) {
			MapleAuction.������ȸ��(cm.getClient(),selection);
			cm.getPlayer().saveToDB(false, false);
			cm.dispose();
		}
    }
}