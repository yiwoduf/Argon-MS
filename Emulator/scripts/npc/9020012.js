importPackage(Packages.packet.creators);
importPackage(Packages.client);
importPackage(Packages.constants);
importPackage(Packages.launch.world);

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
    if (mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
	if(cm.getPlayer().getMapId() == 401060200) {
	if(status == 0) {
	cm.sendSimple("#L0#�븻�ű׳ʽ� ��ȯ�ϱ�#l#k\r\n#L1#��������#l#k\r\n\r\n#L2##r#e(������ȯ�� �ȵɽ� Ŭ��)#l#k\r\n");
	} else if (status == 1) {
	if(selection == 0) {
 if (cm.getMonsterCount(401060200) > 0) {
  cm.sendOk("��� ���͸� ������Ѿ� �մϴ�.");
  cm.dispose();
} else { 
 cm.spawnMob(8880000,2341,-1345);
 cm.dispose();
}
	} else if (selection == 1) {
	cm.allPartyWarp(100050001,true);
	cm.dispose();
	} else if (selection == 2) {
	if (cm.getMonsterCount(401060200) > 0){
    	cm.killAllMob();
	}else {
	cm.sendOk("���� �Ѹ����� ��ȯ�Ǿ� ���� �ʽ��ϴ�.");
	}
			}
		}


	} else if (cm.getPlayer().getMapId() == 401060300) {
	if(status == 0) {
	cm.sendSimple("#L0#�ϵ�ű׳ʽ� ��ȯ�ϱ�#l#k\r\n#L1#��������#l#k\r\n\r\n#L2##r#e(������ȯ�� �ȵɽ� Ŭ��)#l#k\r\n");
		} else if (status == 1) {
	if(selection == 0) {
 if (cm.getMonsterCount(401060300) > 0) {
  cm.sendOk("��� ���͸� ������Ѿ� �մϴ�.");
  cm.dispose();
} else { 
 cm.spawnMob(9300854,2341,-1345);
 cm.dispose();
}
	} else if (selection == 1) {
	cm.allPartyWarp(100050001,true);
	cm.dispose();
	} else if (selection == 2) {
	if (cm.getMonsterCount(401060300) > 0){
    	cm.killAllMob();
	}else {
	cm.sendOk("���� �Ѹ����� ��ȯ�Ǿ� ���� �ʽ��ϴ�.");
}
			}
		}


	} else if (cm.getPlayer().getMapId() == 280030000) {
	if(status == 0) {
cm.sendSimple("#L0#ī�������� ��ȯ�ϱ�#l#k\r\n#L1#��������#l#k\r\n\r\n#L2##r#e(������ȯ�� �ȵɽ� Ŭ��)#l#k\r\n");
		} else if (status == 1) {
	if(selection == 0) {
 if (cm.getMonsterCount(280030000) > 0) {
  cm.sendOk("��� ���͸� ������Ѿ� �մϴ�.");
  cm.dispose();
} else { 
 cm.spawnMob(8800103,0,-387);
 cm.spawnMob(8800104,0,-387);
 cm.spawnMob(8800105,0,-387);
 cm.spawnMob(8800106,0,-387);
 cm.spawnMob(8800107,0,-387); 
 cm.spawnMob(8800108,0,-387); 
 cm.spawnMob(8800109,0,-387); 
 cm.spawnMob(8800110,0,-387);
 cm.spawnMob(8800100,0,-387);
 cm.dispose();
}
	} else if (selection == 1) {
	cm.allPartyWarp(100050001,true);
	cm.dispose();
	} else if (selection == 2) {
	if (cm.getMonsterCount(280030000) > 0){
    	cm.killAllMob();
	}else {
	cm.sendOk("���� �Ѹ����� ��ȯ�Ǿ� ���� �ʽ��ϴ�.");
}			
}
		}
}
}