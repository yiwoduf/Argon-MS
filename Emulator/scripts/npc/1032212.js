/* ���Ǿ� �� ���� ���ǽ� �Դϴ�. */
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
	if(cm.getPlayer().getMapId() != 234567896) {
	cm.dispose(); return;
	}
	map = cm.getClient().getChannelServer().getMapFactory().getMap(234567899);
	names = map.names.split(",");
		if(cm.getPlayer().isDead) {
			cm.dispose(); return;
		}
			if(cm.getPlayer().isMapiaVote) {
					for(a=0;a<names;a++) {
					 try {
						if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[a]).getmapiavote == 1) {
						cm.sendOk("�̹� ������ �������Ͽ� ���̻� �����Ͻ� �� �����ϴ�."); cm.dispose(); return;
						}
					}catch(e){					
					}
					}
				var text = "�ϻ��ϰ� ���� ����� ���� �� �ּ���.\r\n";
					for(i=0;i< names.length; i++) {
					try {
						if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[i]).mapiajob != "���Ǿ�") {
							text += "#L"+i+"##b"+names[i]+"#k";
						}
						if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[i]).isDead) {
							text += "[���]#l\r\n";
						} else {
							text += "#l\r\n";
						}
					}catch(e){
						text += "";
					}
					}
			} else {
				cm.sendOk("�̹� ������ �ϼż� �����Ͻ� �� �����ϴ�.");
				cm.dispose(); return;
			}
			cm.sendSimple(text);
    } else if(status == 1) {
	sel = selection;
	if(cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[sel]).isDead) {
		cm.sendOk("����� ����� ������ �� �����ϴ�."); cm.dispose(); return;
	} else {
		cm.sendYesNo("���� #b"+names[sel]+"#k�� ��(��) �����Ͻðڽ��ϱ�? �ѹ� �����Ͻø� ������ �����鵵 ������ �� �����ϴ�.");
	}
    } else if(status == 2) {
	if(cm.getPlayer().isMapiaVote) {
		cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(names[sel]).getmapiavote = 1;
		cm.getPlayer().isMapiaVote = false;
		map.broadcastMessage(MainPacketCreator.serverNotice(5, cm.getPlayer().getName()+"���� "+names[sel]+"���� �����ϼ̽��ϴ�."));
		cm.sendOk("������ �Ϸ��Ͽ����ϴ�.");
		cm.dispose(); return;
	} else {
		cm.sendOk("����� �����Ͻ� �� �����ϴ�.");
		cm.dispose(); return;
	}
    }
}