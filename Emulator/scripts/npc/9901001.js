importPackage(Packages.server.items);
var status = 0;
var sel = -1;
var itemList = Array (5030000, 5030002, 5030004, 5030008); // ������ ��� 
var day = Array (7,1,7,1,7,1,7,1);
var pch = Array (7900,7900,7900,7900,7900,7900,7900,1200);
var status2 = 0;
var sel2 = -1;

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
            cm.sendSimple("�Ͼ�.. ������ ����.. ��絵�ȵǰ�..\r\n#b#L1#����� �̿��ϱ�#l\r\n#L3#����� ������ �����ϱ�#l\r\n#L0#����� ��ǰ,�޼� ȸ���ϱ�#l\r\n");
        } else if (status == 1) {
	    sel2 = selection;
            if (selection == 0) {	
		cm.sendSimple("��� �̿� �ϰڳ�\r\n\r\n#b#L0#�޼� ȸ��#l\r\n#L1#������ ȸ��#l");	
           } else if (selection == 1) {
		if (cm.getPlayer().isDumeGM()) {
			cm.sendOk("�� ĳ���ͷδ� ������� �̿� �� �� �����ϴ�.");
			cm.dispose();
			return;
		}
		cm.openUI(161);
		MapleAuction.��������(cm.getClient());
		cm.dispose();
            } else if (selection == 3) {
		var text = MapleAuction.����峫������Ʈ(cm.getPlayer().getName());
		cm.sendSimple(text);
		if (text == "�ڳ״� ������� �������� ���°� ����...\r\n\r\n#r�������� �������� ���� ����Ʈ���� ��µ��� �����Ƿ�\r\n���� ��û�̿��� ȸ���Ͽ� ���� ���� �ŷ��ϼ���.") cm.dispose();
	    }
        } else if (status == 2) {
		if (sel2 == 3) {
			cm.sendOk(MapleAuction.���������۳���(cm.getPlayer(),selection));
			cm.dispose();
		} else {
            	sel = selection;
		if (sel == 0) {
			if (MapleAuction.�����޼�ȸ��(cm.getPlayer().getName()) == 0) {
				cm.sendOk("�ڳ״� ȸ���� �޼Ұ� ���°� ����");
				cm.dispose();
			} else {
				cm.gainMeso(MapleAuction.�����޼�ȸ��(cm.getPlayer().getName()));
				cm.sendOk(MapleAuction.�����޼�ȸ��(cm.getPlayer().getName()) + "�޼Ҹ� ȸ�� �Ϸ� �Ͽ���");
				MapleAuction.�޼�ȸ���Ϸ�(cm.getPlayer().getName());
				cm.getPlayer().saveToDB(false,false);
				cm.dispose();
			}
		} else if (sel == 1) {
			cm.sendSimple(MapleAuction.����������ȸ��(cm.getPlayer().getName()));
		}
		}
	} else if (status == 3) {
			MapleAuction.������ȸ��(cm.getClient(),selection);
			cm.getPlayer().saveToDB(false,false);
			cm.dispose();
	}
    }
}