importPackage(Packages.client);importPackage(Packages.constants);

var status = -1;
var sel = 0;
var name = "";

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
	var chat= "����� ������ ������ ��ƺ�����. �ϴ��� �����ٵ� �Ƹ��ٿ� ������ ������� �Ŷ��ϴ�.";
	chat += "\r\n\r\n";
	chat += "���� #b#h #���� ���� �Ŀ�����Ʈ : #e#r"+cm.getRC()+"#n#k#b\r\n";
	chat += "#L1112803# #i1112803# #b#z1112803##k #e: #r10000 ����Ʈ#n#b#l\r\n";
	chat += "#L1112806# #i1112806# #b#z1112806##k #e: #r10000 ����Ʈ#n#b#l\r\n";
	chat += "#L1112807# #i1112807# #b#z1112807##k #e: #r10000 ����Ʈ#n#b#l\r\n";
	chat += "#L1113279# #i1113279# #b#z1113279##k #e: #r10000 ����Ʈ#n#b#l\r\n";
	chat += "#L1113281# #i1113281# #b#z1113281##k #e: #r10000 ����Ʈ#n#b#l\r\n";
	chat += "#L1112013# #i1112013# #b#z1112013##k #e: #r10000 ����Ʈ#n#b#l\r\n";
	chat += "#L1112015# #i1112015# #b#z1112015##k #e: #r10000 ����Ʈ#n#b#l\r\n";
	cm.sendSimple(chat);
    } else if (status == 1) {
	if (cm.getRC() < 2500) {
		cm.sendOk(cm.getPlayer().getName() + "���� �Ŀ�����Ʈ�δ� ������ �����Ҽ� ������ ������");
		cm.dispose();
		return;
	}
	sel = selection;
	cm.sendGetText("������ �ǳ��� ���� �̸��� �Է��� �ֽʽÿ�");
    } else if (status == 2) {
	name = cm.getText();
	cm.sendYesNo("�����Ͻ� ���� [#b#i" + sel + "# #z" + sel + "##k](��)�� ������ ���� �Ͻðڽ��ϱ�?");
    } else if (status == 3) {
	var id = MapleCharacterUtil.getIdByName(cm.getText());
	if (id <= 0) {
		cm.sendOk("�Է��Ͻ� " + name + "���� �������� ������ ���Դϴ�. �г����� �ٽ� �ѹ� Ȯ���� �ֽñ� �ٶ��ϴ�.");
		cm.dispose();
		return;
	}
	var chr = cm.getChar(id);
	if (chr == null) {
		cm.sendOk("������ �����Ǻ��� ���������� �ʱ��� " + name + "���� �����Ͻø� �ٽ� ã�ƿ� �ֽñ� �ٶ��ϴ�.");
		cm.dispose();
		return;
	}
	if (!(chr.getInventory(GameConstants.getInventoryType(sel)).getNextFreeSlot() > -1)) {
		cm.sendOk("������ �����Ǻ��� �κ��丮 ������ �����մϴ�.");
		cm.dispose();
		return;
	}
	if (!cm.canHold(sel)) {
		cm.sendOk("������ �ޱ����ؼ� �κ��丮�� ��ĭ �̻��� �� ������ �ʿ� �մϴ�.");
		cm.dispose();
		return;
	}
	cm.makeRing(sel,chr);
	cm.gainRC(-2500);
	cm.dispose();
    }
}
