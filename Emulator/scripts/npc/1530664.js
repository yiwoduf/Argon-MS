var status = -1;
var cost = 972000000; // ��ȯ����
var mob = 8900000; //��ȯ�� �� �ڵ�
var mob2 = 8900001;
var mob3 = 8900002;
var check = "ī���� �ǿ���";//üũ�� �� �̸�
map = 105200610;//�� �ڵ�
var x = 494;//x��ǥ
var y = 551;//y��ǥ
var hp = "4860 ��";
var hp1 = "1620 ��";
var hp2 = "1620 ��";
var hp3 = "1620 ��";

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
    if (cm.getPlayer().getMapId() == 105200610) {
  cm.sendSimple(" #fn������� Extrabold##d"+check+"#k �� �Ϸ縶��#Cgray##fs10#(12�� ����) #fs15##r2��#k #fs12#�� ��ȯ�� �����մϴ�.\r\n\r\n       #fs13##dü��#k : #r"+hp1+"#k + #r"+hp2+"#k + #r"+hp3+"#k = #r"+hp+"#k\r\n\r\n         #L1##r" + cost + " �޼�#k - #d"+check+" ��ȯ#k#l\r\n                   #L2##fs11##b"+ServerConstants.serverName+" ���� �������� ����#k#l\r\n");
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
 if(cm.BossCheck(""+check+"", 2)) {
 if(cm.getMeso() >= cost) {
 cm.gainMeso(-cost); // �޼� ������Ű��
 cm.spawnMob(mob, x, y);
 cm.spawnMob(mob2, x, y);
 cm.spawnMob(mob3, x, y);
 cm.BossAdd(""+check+"");
 cm.playerMessage(-1,"[�˸�] ���� ��ȯ�� �Ϸ� �Ǿ����ϴ�.");
 cm.dispose();
} else {
	cm.sendOk("#fn������� Extrabold##fs13#                           #r�޼Ұ� �����մϴ�.#k");
	cm.dispose();
}
} else {
	cm.sendOk(" #fn������� Extrabold##d"+check+"#k �� �Ϸ縶��#Cgray##fs10#(12�� ����) #fs15##r2��#k #fs12#�� ��ȯ�� �����մϴ�.");
	cm.dispose();
	}
	}
  } else if (selection == 2) {
   cm.warp(680000000, 0);
   cm.dispose();
  }
}
