


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	���� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 2161014

	���ǽ� �̸� : �� ����

	���ǽð� �ִ� �� : ���ڿ��� �� : ������ (211070200)

	���ǽ� ���� : ���ڿ�


*/

var status = -1;
var cost = 88200000; // ��ȯ����
var mob = 8840000; //��ȯ�� �� �ڵ�
var check = "�� ����";//üũ�� �� �̸�
map = 211070102;//�� �ڵ�
var x = -1;//x��ǥ
var y = -181;//y��ǥ`
var hp = "1 4 7 ��";

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
    if (cm.getPlayer().getMapId() == 211070102) {
  cm.sendSimple("     #fn������� Extrabold##d"+check+"#k �� �Ϸ縶��#Cgray##fs10#(12�� ����) #fs15##r6��#k #fs12#�� ��ȯ�� �����մϴ�.\r\n\r\n                                        #fs13##dü��#k : #r"+hp+"#k\r\n\r\n              #L1##r" + cost + " �޼�#k - #d"+check+" ��ȯ#k#l\r\n                   #L2##fs11##b"+ServerConstants.serverName+" ���� �������� ����#k#l\r\n");
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
 if(cm.BossCheck(""+check+"", 6)) {
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
	cm.sendOk("     #fn������� Extrabold##d"+check+"#k �� �Ϸ縶��#Cgray##fs10#(12�� ����) #fs15##r6��#k #fs12#�� ��ȯ�� �����մϴ�.");
	cm.dispose();
	}
	}
  } else if (selection == 2) {
   cm.warp(680000000, 0);
   cm.dispose();
  }
}
