
/*
����:�� ����:����
*/
importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);

var cost = 50000; // ��ȯ����
var status = -1;

function start() {
 action(1, 0, 0);
}

function action(mode, type, selection) {
 status++;
 if (status == 0) {
  cm.sendSimple("#L1##e#b����� [��ȯ�� ���]#l#k\r\n\r\n(������尡��#r*���ѽð� 5��*#k)\r\n#i4001431##z4001431# 1�� �Һ�");
 } else if(status == 1) {
  if(selection == 10) {
  if (cm.getPlayer().getLevel() >= 10) {
  cm.sendOk("10 �̻��̶�ϱ�?.");
  cm.dispose();
 } else {    
cm.warp(1040400002, 0);

 cm.dispose();
}
  } else if (selection == 1) {
            if (cm.itemQuantity(4001431) >= 1 && cm.getPlayerCount(109060001) == 0) {
                cm.TimeMoveMap(109060001,100000000,300); // 9302039
                cm.sendOk("#e#r���� ����Ʈ#k���� ���� �ɾ��ֽʽÿ�.");

            } else if(cm.getPlayerCount(109060001) >= 0) {
                cm.sendOk("#e#b�ٸ� ä��#k�� �̿����ֽʽÿ�.\r\n������ �̿����Դϴ�.");

            } else if(cm.itemQuantity(4001431) <= 1) {
                cm.sendOk("#e#r����Ƽ��#k�� �����ϴ�.\r\nƼ���� 1���̻� �������ֽʽÿ�.");


            }
cm.dispose();



cm.dispose();
  } else {
   cm.dispose();
  }
 } else {
  cm.dispose();
 }
}