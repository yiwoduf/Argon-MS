var status = -1;
var coin = 200;
var mob = 8880130; //��ȯ�� �� �ڵ�
var check = "�ϵ� ���̾�";//üũ�� �� �̸�
map = 180000000;//�� �ڵ�
var x = 800;//x��ǥ
var y = 17;//y��ǥ
var hp = "235 �� 7 ��"
var hp1 = "105 �� 3 �� 5 õ";
var hp2 = "135 �� 3 �� 5 õ";

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
    if (cm.getPlayer().getMapId() == 180000000) {
  cm.sendSimple("  #fn������� Extrabold##d"+check+"#k �� �Ϸ縶��#Cgray##fs10#(12�� ����) #fs15##r1��#k #fs12#�� ��ȯ�� �����մϴ�.\r\n\r\n                                         #d��� :#k #r�����̾�#k\r\n      #dü��#k : #r"+hp1+"#k + #r"+hp2+"#k = #r"+hp+"#k#fs13#\r\n\r\n      #L1##bâ���� ���� ����#k #r" + coin + " ��#k - #d"+check+" ��ȯ#k#l\r\n                  #L2##fs11##b"+ServerConstants.serverName+" ���� �������� ����#k#l\r\n");
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
 if(cm.BossCheck(""+check+"", 1)) {
 if(cm.haveItem(4033364,coin)) {
 cm.gainItem(4033364,-coin);
 cm.spawnMob(mob, x, y);
 cm.BossAdd(""+check+"");
 cm.playerMessage(-1,"[�˸�] ���� ��ȯ�� �Ϸ� �Ǿ����ϴ�.");
 cm.dispose();
} else {
	cm.sendOk("#fn������� Extrabold##fs13#                   #râ���� ���� ������ �����մϴ�.#k");
	cm.dispose();
}
} else {
	cm.sendOk("  #fn������� Extrabold##d"+check+"#k �� �Ϸ縶��#Cgray##fs10#(12�� ����) #fs15##r1��#k #fs12#�� ��ȯ�� �����մϴ�.");
	cm.dispose();
	}
	}
  } else if (selection == 2) {
   cm.warp(680000000, 0);
   cm.dispose();
  }
}
