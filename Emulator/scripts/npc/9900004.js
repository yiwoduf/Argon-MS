importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);

var status = -1;
var mapiamaps = [234567899, 234567890,234567891,234567892,234567893,234567894,234567895,234567896,234567897,234567898];
function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0 && status == 0) {
	cm.dispose();
	return;sd
    }
    if (mode == 0) {
        status--;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {	
	//cm.sendOk("���Ǿ� �������� ��ø� ���"); cm.dispose(); return;
	if(cm.getPlayer().getMapId() == 310000004) {
	var text = "#fs11##e< ������ : ���Ǿ� >#n\r\n�ȳ��Ͻʴϱ�, ������. ���� �� ������ ���� #b����Ż�#k ��� �մϴ�. �� ���� ���ο� �Ŵ��� �������� �����մϴ�. �ٷ� #b���Ǿ� ������#k ����. �ѹ� #b���Ǿ� ������#k �� �̿��� ������ �ʰڽ��ϱ�?\r\n\r\n#e- �������� : 10 ���� �̻� -\r\n- ���� �ο� : 5�� ~ 10�� (��Ƽ X)#n";
	if(!cm.getClient().getChannelServer().getMapFactory().getMap(234567899).MapiaIng) {
		text += "\r\n#b#L0#���Ǿ� ������ ��������?\r\n#b#L1#���Ǿ� ������ �̿� �غ��ڽ��ϴ�. (���� �̿� ����)";
	} else {
		text += "\r\n#b#L0#���Ǿ� ������ ��������?\r\n#r#L1#���Ǿ� ������ �̿� �غ��ڽ��ϴ�. (���� �̿� �Ұ���)#k";
	}
	cm.sendSimple(text);
	} else {
	cm.warp(234567888); cm.dispose(); return;
	}
    } else if(status == 1) {
	sel = selection;
	if(selection == 0) {
	var text = "#e���Ǿ� �����̶� ?#n\r\n#fs11#���Ǿ� ������ 1986�� ��ũ�� ���б��� �ɸ��к� ���� �� �ٺ����� â���Ͽ�����, ������� ���鼭 ��Ģ�� ���� �ٲ��������";
	text += "���� ���� #b�������ڶ�#k�� ��� ���ϸ� ������ �����ϴ�.\r\n";
	text += "#b10��#k�� �������� #b�ù� 4��, �ǻ� 1��, ���� 2��, ���Ǿ� 3��#k �Դϴ�.\r\n";
	text += "#b�ù�#k�� ������ ���̵Ǹ� ��ȭ�� ���� ���ǾƸ� ã�Ƴ� ��ǥ�� �����Ͽ� ó�� ���� #b���ǾƸ� ��� ó��#k��Ű�� ���ӿ��� �¸��մϴ�. �ٸ�, �ù��� �㿡 �ƹ� �ɷµ� �����ϴ�.\r\n";
	text += "#b���Ǿ�#k�� ������ ���� �ڽ��� ���Ǿƶ�°� ��Ű�� �ȵǸ�, ���̵Ǹ� #b�ùε��� ��� �ϻ�#k��Ű�� ���ӿ��� ���Ǿư� �¸��մϴ�.\r\n";
	text += "#b�ǻ�#k�� ���Ǿư� �ϻ��Ϸ��� #b����� �㸶�� �츱 �� ������#k, ���Ǿƿ��� �ڽ��� �ǻ��� ��ǵ� ��Ű�� �Ҹ������ϴ�.\r\n";
	text += "#b����#k�� ���Ǿư� �´��� Ȯ���� Ȯ���ϱ� ���� �����ϸ�, �㿡�� ���Ǿư��� ����� �����ϸ� #b���Ǿ� ���� �ƴ���#k�� �� �� �ֽ��ϴ�.";
	cm.sendOk(text); cm.dispose(); return;
	} else if(selection == 1) {
	if(cm.getClient().getChannelServer().getMapFactory().getMap(234567899).MapiaIng) {
		cm.sendOk("������ ���ǾƸ� �����Ͻ� �� �����ϴ�. ��� �� �ٽ� �õ��� �ּ���."); cm.dispose(); return;
	}
	cm.sendYesNo("���� ���ǾƸ� �ϱ����� ��ٸ��� �ִ� ����� "+cm.getPlayerCount(cm.getPlayer().getMapId())+" �� �Դϴ�. ������ �����ϰڽ��ϱ�?");
	} 
   } else if(status == 2) {
	for(i=0;i<mapiamaps.length;i++) {
		if(cm.getPlayerCount(mapiamaps[i]) > 0) {
			cm.sendOk("���� ���ǾƸ� �̿��ϰ� �ִ� ����� �ֽ��ϴ�. �ٽ� �õ��� �ּ���."); cm.dispose(); return;
		}
	}
	if(cm.getClient().getChannelServer().getMapFactory().getMap(234567899).MapiaIng) {
		cm.sendOk("������ ���ǾƸ� �����Ͻ� �� �����ϴ�. ��� �� �ٽ� �õ��� �ּ���."); cm.dispose(); return;
	}
	if(cm.getPlayerCount(cm.getPlayer().getMapId()) > 4 && cm.getPlayerCount(cm.getPlayer().getMapId()) < 11) { 
		cm.MapiaStart(cm.getPlayer(), 5, 234567899, 234567890,234567891,234567892,234567893,234567894,234567895,234567896,234567897,234567898, 120,45,30);
	if(cm.getPlayer().getClient().getChannel() == 1) {
	WorldBroadcasting.broadcast(MainPacketCreator.getGMText(10, "[���Ǿ� �˸�] "+20+"���̻� ä�ο��� ���ӿ� �����Ͽ����ϴ�."));
	} else {
	WorldBroadcasting.broadcast(MainPacketCreator.getGMText(10, "[���Ǿ� �˸�] "+-(-cm.getPlayer().getClient().getChannel()-1)+" ä�ο��� ���ӿ� �����Ͽ����ϴ�."));
	}
		cm.dispose(); return;
	} else {
		cm.sendOk("�ּ� 5���� �ִ� 10����� ���� �����մϴ�.");
		cm.dispose(); return;
	}
   }
}