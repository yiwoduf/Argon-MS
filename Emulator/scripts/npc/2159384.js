/* ���� ���� �� ���ǽ� �Դϴ�. */
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);
importPackage(java.util);
importPackage(java.lang);

var status = -1;

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
	return;
    }
    if (mode == 0) {
        status--;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
	if(cm.getPlayer().getMapId() != 234567897) {
	cm.dispose(); return;
	}
	map = cm.getClient().getChannelServer().getMapFactory().getMap(234567899);
	names = map.names.split(",");
		if(cm.getPlayer().isDead) {
			cm.dispose(); return;
		}
			if(cm.getPlayer().isPoliceVote) {
				var text = "���Ǿ� �ϰͰ��� ����� ������ �ּ���.\r\n";
					for(i=0;i< names.length; i++) {
					try {
						if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[i]).mapiajob != "����") {
						//text += cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[i]).mapiajob+ "";
							text += "#L"+i+"##b"+names[i]+"#k";
						}
						if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[i]).isDead) {
							text += "[���]#l\r\n";
						} else {
							text += "#l\r\n";
						}
					    } catch(e) {
							text += "";
					    }
					}
				cm.sendSimple(text);
			} else {
				cm.sendOk("���̻� �����Ͻ� �� �����ϴ�.");
				cm.dispose(); return;
			}
    } else if(status == 1) {
	sel = selection;
	if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[sel]).isDead) {
		cm.sendOk("����� ����� �츱 �� �����ϴ�."); cm.dispose(); return;
	} else {
		cm.sendYesNo("���� #b"+names[sel]+"#k�� ��(��) ���ǾƷ� �����Ͻðڽ��ϱ�?");
	}
    } else if(status == 2) {
					for(a=0;a<names.length;a++) {
						if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[a]).getpolicevote == 1) {
						cm.sendOk("�̹� ������ �������Ͽ� ���̻� �����Ͻ� �� �����ϴ�."); cm.dispose(); return;
						}
					}
	if(cm.getPlayer().isPoliceVote) {
		cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[sel]).getpolicevote = 1;
		cm.getPlayer().isPoliceVote = false;
		cm.getClient().getChannelServer().getMapFactory().getMap(234567897).broadcastMessage(MainPacketCreator.serverNotice(5, cm.getPlayer().getName()+"���� "+names[sel]+"���� ���ǾƷ� ���ü̽��ϴ�. ���Ǿ� ���� �ƴ����� ��ħ�� ��ǥ�˴ϴ�."));
		//map.broadcastMessage(MainPacketCreator.serverNotice(5, cm.getPlayer().getName()+"���� "+names[sel]+"���� ���ǾƷ� ���ü̽��ϴ�. ���Ǿ� ���� �ƴ����� ��ħ�� ��ǥ�˴ϴ�."));
		cm.sendOk(names[sel]+"���� ���ǾƷ� �����ϼ̽��ϴ�.");
		cm.dispose(); return;
	} else {
		cm.sendOk("���̻� �����Ͻ� �� �����ϴ�.");
		cm.dispose(); return;
	}
    }
}