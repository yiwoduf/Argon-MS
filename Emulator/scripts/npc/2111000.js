
/* �� ���ǽô� ��ħ�� ���� ���ǽ� �Դϴ�. */

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
	if(cm.getPlayer().getMapId() != 234567899) {
	cm.dispose(); return;
	}
	map = cm.getClient().getChannelServer().getMapFactory().getMap(234567899);
	if(map.nightnumber == 0) {
		cm.sendOk("ù���� ��ǥ�� �� ���� ����..");
		cm.dispose(); return;
	}
		if(cm.getPlayer().isDead) {
			cm.dispose(); return;
		}
			if(cm.getPlayer().isVoting) {
			names = map.names.split(",");
				var text = "ó�� ��Ű�� ���� ����� ������ ���Գ�...\r\n";
					for(i=0;i< names.length; i++) {
						text += "#L"+i+"##b"+names[i]+"#k";
					try { 
						if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[i]).isDead) {
							text += "[���]#l\r\n";
						} else {
							text += "#l\r\n";
						}
					} catch(e) {
					}
					}
			} else {
				cm.sendOk("����� ��ǥ�ð��� �ƴ϶� ��ǥ�� ���� ���ٳ�.");
				cm.dispose(); return;
			}
			cm.sendSimple(text);
    } else if(status == 1) {
	sel = selection;
	if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[sel]).isDead) {
		cm.sendOk("����� ����� �����Ҽ��� ����."); cm.dispose(); return;
	} else {
		cm.sendYesNo("���� #b"+names[sel]+"#k ��(��) �����ϰڳ�? Ȥ�� ������ �ڸ� �������� �����ư��°� �ƴ��� �� �����غ���.");
	}
    } else if(status == 2) {
	if(cm.getPlayer().isVoting) {
		cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[sel]).voteamount += 1;
		cm.getPlayer().isVoting = false;
		map.broadcastMessage(MainPacketCreator.serverNotice(5, names[sel]+"���� ��ǥ�� �����̽��ϴ�."));
		cm.sendOk("���������� ó���Ǿ���.");
		cm.dispose(); return;
	} else {
		cm.sendOk("�ڳ� ��ǥ���� ���׸�..");
		cm.dispose(); return;
	}
    }
}