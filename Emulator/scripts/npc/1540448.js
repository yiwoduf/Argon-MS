var status = -1;
var cost = 384300000; // ��ȯ����
var mob = 8850011; //��ȯ�� �� �ڵ�
var check = "�ñ׳ʽ�";//üũ�� �� �̸�
map = 384300000;//�� �ڵ�
var x = -372;//x��ǥ
var y = 115;//y��ǥ
var hp = "1 2 8 1 ��";

importPackage(Packages.constants);

function start() {
 action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

 if (status == 0) {
    if (cm.getPlayer().getMapId() == 271040100) {
  cm.sendSimple("    #fn������� Extrabold##d"+check+"#k �� �Ϸ縶��#Cgray##fs10#(12�� ����) #fs15##r3��#k #fs12#�� ��ȯ�� �����մϴ�.\r\n\r\n                                      #fs13##dü��#k : #r"+hp+"#k\r\n\r\n             #L1##fs13##r" + cost + " �޼�#k - #d"+check+" ��ȯ#k#l\r\n                   #L2##fs11##b"+ServerConstants.serverName+" ���� �������� ����#k#l\r\n");
    } else {
   cm.dispose();
}
  } else if(selection == 1) {
            if (cm.getPlayer().getParty() == null) {
            cm.sendOk("#fn������� Extrabold##fs13##r                   ��ȯ�Ϸ��� ��Ƽ�� �ʿ��մϴ�.");
            cm.dispose();
            }
            if (!cm.isLeader()) {
	  cm.sendOk("#fn������� Extrabold##fs13##r                    ��Ƽ�常 ��ȯ�� �����մϴ�.");
                cm.dispose();
            }
            if (!cm.allMembersHere()) {
	cm.sendOk("#fn������� Extrabold##fs13##r                ��Ƽ�� ������ �̰��� �־�� �մϴ�.");
                cm.dispose();
           }
           if (cm.getMonsterCount(map) > 0) {
	cm.dispose();
	cm.openNpc(9010017);
            } else {
 if(cm.BossCheck(""+check+"", 3)) {
 if(cm.getMeso() >= cost) {
 cm.gainMeso(-cost); // �޼� ������Ű��
 cm.spawnMob(mob, x, y);
 cm.BossAdd(""+check+"");
 cm.playerMessage(-1,"[�˸�] ���� ��ȯ�� �Ϸ� �Ǿ����ϴ�.");
 cm.dispose();
} else {
	cm.sendOk("#fn������� Extrabold##fs13#                           #r�޼Ұ� �����մϴ�.#k");
	cm.dispose();
}
} else {
	cm.sendOk("    #fn������� Extrabold##d"+check+"#k �� �Ϸ縶��#Cgray##fs10#(12�� ����) #fs15##r3��#k #fs12#�� ��ȯ�� �����մϴ�.");
	cm.dispose();
	}
	}
  } else if (selection == 2) {
   cm.warp(680000000, 0);
   cm.dispose();
  }
}
