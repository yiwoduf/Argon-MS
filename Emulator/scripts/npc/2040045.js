
/*
����:�� ����:����
*/
importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);

var item = 4001254; // ��ȯ��
var count = 0; //�ʿ��� ������ ����
var count2 = 0; //�ʿ��� ������ ����
var status = -1;

function start() {
 action(1, 0, 0);
}

function action(mode, type, selection) {
 status++;
 if (status == 0) {
  cm.sendSimple("������ ��ȯ�� �� �ֽ��ϴ�.#l\r\n#L3##i"+item+"# #r"+count2+"��#k�� �˸����� �� ��ȯ [�� 30��] #l#k\r\n#L2#�������� ����#l#k\r\n");
 } else if(status == 1) {
  if(selection == 1) {
 if (cm.getMonsterCount(105200719) > 0) {
  cm.sendOk("��� ���͸� ������Ѿ� �մϴ�.");
  cm.dispose();
		} else if (!cm.haveItem(item, count)) {
			cm.sendOk("���� ���츦 ��ȯ�Ϸ��� #i"+item+"#"+count+"���� �ʿ��մϴ�.");
			cm.dispose();
 } else {    
WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(6, "[SMART] ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���� ���츦 ��ȯ�ϼ̽��ϴ�. [SMART]")); 
 cm.gainItem(item,-count); // �޼� ������Ű��

 cm.spawnMob(8240098,0,260);
 cm.dispose();
}
  } else if(selection == 3) {
 if (cm.getMonsterCount(922010900) > 0) {
  cm.sendOk("��� ���͸� ������Ѿ� �մϴ�.");
  cm.dispose();
		} else if (!cm.haveItem(item, count2)) {
			cm.sendOk("�ϵ� ���츦 ��ȯ�Ϸ��� #i"+item+"#"+count2+"���� �ʿ��մϴ�.");
			cm.dispose();
 } else {    
WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(6, "[SMART] ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ������� �˸������� ��ȯ�ϼ̽��ϴ�. [SMART]")); 
 cm.gainItem(item,-count2); // �޼� ������Ű��

 cm.spawnMob(9300012,0,260);
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

