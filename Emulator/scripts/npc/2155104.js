
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
  cm.sendSpirit("��������͸� �̿��Ͻðڽ��ϱ�? \r\n#i4310016# #z4310016# �������=50���ʿ� �ʿ�/���ѽð��� 3���Դϴ�.\r\n #g#L2#���� ���������#l#k#l#k#r#L5#�� ���������#l#k\r\n#L3#��ȭ�� �׸��Ѵ�.",true,0);
 } else if(status == 1) {
  if(selection == 10) {
  if (cm.getPlayer().getLevel() >= 30) {
  cm.sendOk("#fn������� Extrabold##fs16#30 �̻��̶�ϱ�?.");
  cm.dispose();
 } else {    
cm.warp(910160000, 0);

 cm.dispose();
}
  } else if (selection == 2) {
             if (cm.getClient().getChannelServer().getMapFactory().getMap(910180000).getCharactersSize() > 0) {
             cm.sendOk("#fn������� Extrabold##fs16#�̹� �ٸ� ���谡�� �����Ͽ����ϴ�. �ٸ�ä���� �̿����ֽðų� ����Ŀ� �ٽ� ã�ƿ� �ֽʽÿ�.");
             cm.dispose();
             return;
	     }
        if (cm.getPlayerStat("LVL") <= 29) {
	cm.sendOk("#fn������� Extrabold##fs16#30 �̻� �����ϽǼ� �ֽ��ϴ�.");
        cm.dispose();
        return;
        }
        if (cm.getPlayerStat("LVL") >= 120) {
	cm.sendOk("#fn������� Extrabold##fs16#120�̻��� �����ϽǼ� �����ϴ�.");
        cm.dispose();
        return;
        }
	     if (cm.haveItem(4310016,0)) {
            cm.TimeMoveMap(910180000,100050001,180);
            cm.gainItem(4310016, -0);
            cm.dispose();
            } else {
            cm.sendSpirit("\r\n#fn������� Extrabold##fs16##i4310016##b#z4310016##k �����ѰŰ�������?",false,2008);
            cm.dispose();
}
  } else if (selection == 4) {
             if (cm.getClient().getChannelServer().getMapFactory().getMap(951000240).getCharactersSize() > 0) {
             cm.sendOk("�̹� �ٸ� ���谡�� �����Ͽ����ϴ�. �ٸ�ä���� �̿����ֽðų� ����Ŀ� �ٽ� ã�ƿ� �ֽʽÿ�.");
             cm.dispose();
             return;
	     }
        if (cm.getPlayerStat("LVL") <= 120) {
	cm.sendOk("120 �̻� �����ϽǼ� �ֽ��ϴ�.");
        cm.dispose();
        return;
        }
        if (cm.getPlayerStat("LVL") >= 200) {
	cm.sendOk("200�̻��� �����ϽǼ� �����ϴ�.");
        cm.dispose();
        return;
        }
	     if (cm.haveItem(4310016,50)) {
            cm.TimeMoveMap(951000240,100050001,180);
            cm.gainItem(4310016, -50);
            cm.dispose();
            } else {
            cm.sendSpirit("\r\n#fn������� Extrabold##fs16##i4310016##b#z4310016##k �����ѰŰ�������?",false,2008);
            cm.dispose();
}
  } else if (selection == 5) {
             if (cm.getClient().getChannelServer().getMapFactory().getMap(951000270).getCharactersSize() > 0) {
             cm.sendOk("#fn������� Extrabold##fs16#�̹� �ٸ� ���谡�� �����Ͽ����ϴ�. �ٸ�ä���� �̿����ֽðų� ����Ŀ� �ٽ� ã�ƿ� �ֽʽÿ�.");
             cm.dispose();
             return;
	     }
        if (cm.getPlayerStat("LVL") <= 199) {
	cm.sendOk("200 �̻� �����ϽǼ� �ֽ��ϴ�.");
        cm.dispose();
        return;
        }
	     if (cm.haveItem(4310016,50)) {
            cm.TimeMoveMap(951000270,100050001,180);
            cm.gainItem(4310016, -50);
            cm.dispose();
            } else {
            cm.sendSpirit("\r\n#fn������� Extrabold##fs16##i4310016##b#z4310016##k �����ѰŰ�������?",false,2008);
            cm.dispose();
}
  } else if (selection == 3) {
cm.sendOk("#fn������� Extrabold##fs17#�̿��� �׸��ϰ�ͳ�����. �׷� ��������~");
cm.dispose();
  } else {
   cm.dispose();
  }
 } else {
  cm.dispose();
 }
}