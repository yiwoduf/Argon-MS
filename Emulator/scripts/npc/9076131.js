
/*
����:�� ����:����
*/
importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);

var item = 4310034; // ��ȯ��
var count = 500; //�ʿ��� ������ ����
var count2 = 800; //�ʿ��� ������ ����
var status = -1;

function start() {
 action(1, 0, 0);
}

function action(mode, type, selection) {
 status++;
 if (status == 0) {
  cm.sendSimple("������ ��ȯ�� �� �ֽ��ϴ�.\r\n#L1##i"+item+"# #r"+count+"��#k�� ī���� ���� ���� ��ȯ [�� 250��]#l\r/ #l#k\r\n#L2#�������� ����#l#k\r\n");
 } else if(status == 1) {
  if(selection == 1) {
 if (cm.getMonsterCount(933037000) > 0) {
  cm.sendOk("��� ���͸� ������Ѿ� �մϴ�.");
  cm.dispose();
		} else if (!cm.haveItem(item, count)) {
			cm.sendOk("ī���� ���� �� �� ��ȯ�Ϸ��� #i"+item+"#"+count+"���� �ʿ��մϴ�.");
			cm.dispose();
 } else {    
WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(6, "[���÷���] ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ī���� ���� �� �� ��ȯ�ϼ̽��ϴ�. [SMART]")); 
 cm.gainItem(item,-count); // �޼� ������Ű��

 cm.spawnMob(8920000,0,260);
 cm.dispose();
}
  } else if(selection == 3) {
 if (cm.getMonsterCount(920011200) > 0) {
  cm.sendOk("��� ���͸� ������Ѿ� �մϴ�.");
  cm.dispose();
		} else if (!cm.haveItem(item, count2)) {
			cm.sendOk("�ϵ� ���츦 ��ȯ�Ϸ��� #i"+item+"#"+count2+"���� �ʿ��մϴ�.");
			cm.dispose();
 } else {    
WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(6, "[SMART] ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� �ϵ� ���츦 ��ȯ�ϼ̽��ϴ�. [SMART]")); 
 cm.gainItem(item,-count2); // �޼� ������Ű��

 cm.spawnMob(8240099,0,260);
 cm.dispose();
 }
  } else if (selection == 2) {
   cm.warp(100050001, 0);
   cm.dispose();
  } else {
   cm.dispose();
  }
 } else {
  cm.dispose();
 }
}

