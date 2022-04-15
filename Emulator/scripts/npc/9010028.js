importPackage(Packages.client);
importPackage(Packages.constants);
importPackage(Packages.packet.creators);
importPackage(Packages.launch.world);

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
	chat += "#L1112001# #i1112001# #b#z1112001##k #e: #r100000 ����Ʈ#n#b#l\r\n";
	chat += "#L1112002# #i1112002# #b#z1112002##k #e: #r100000 ����Ʈ#n#b#l\r\n";
	chat += "#L1112003# #i1112003# #b#z1112003##k #e: #r100000 ����Ʈ#n#b#l\r\n";
	cm.sendSimple(chat);
    } else if (status == 1) {
	if (cm.getRC() < 100000) {
		cm.sendOk(cm.getPlayer().getName() + "���� �Ŀ�����Ʈ�δ� ������ �����Ҽ� ������ ������");
		cm.dispose();
		return;
	}
	sel = selection;
	cm.sendGetText("Ŀ���� �� ����� �г����� �����ּ���.");
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
      
        WorldBroadcasting.broadcast(MainPacketCreator.getGMText(7, "[�˸�] "+ cm.getPlayer().getName()+" �԰� "+cm.getText()+" ���� Ŀ���� �Ǿ����ϴ�. ��� �������ּ��� !!"));
	cm.makeRing(sel,chr);
	cm.loseRC(100000);
	cm.dispose();
    }
}
