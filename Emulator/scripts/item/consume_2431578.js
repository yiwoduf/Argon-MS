importPackage(Packages.client.items);
var status = -1;
var sel = 0;

function start() {
    status = -1;
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
	var list = cm.getCashEquipList();
	if (list == "") {
		cm.sendOk("�������� ĳ�� ��� �����ϴ�.");
		cm.dispose();
		return;
	}
	var chat = "����ɷ��� ����,�缳���� ĳ�� ��� ������ �ּ���\r\n#b";
	chat += list;
	cm.sendSimple(chat);
    } else if (status == 1) {
	sel = selection;
	cm.sendYesNo("������ �����Ͻ� ������ #b#t" + cm.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(sel).getItemId() + "##k�� ����ɷ��� ����,�缳�� �Ͻðڽ��ϱ�?");
    } else if (status == 2) {
	cm.renewCashPotential(sel);
	cm.gainItem(2431578,-1);
	cm.sendOk("����ɷ� ����,�缳���� �Ϸ� �Ͽ����ϴ�. �������� Ȯ���� �ּ���");
	cm.dispose();
    }
}
