
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
  cm.sendSpirit("ĳ�� ������ ����͸� �̿��Ͻðڽ��ϱ�? ���ѽð��� 5�� �Դϴ�.\r\n#i4310014# #z4310014# 10�� �ʿ� \r\n #g#L2#ĳ�� ������ �����#l#k#l#k#r#L3#��ȭ�� �׸��Ѵ�.",true,0);
 } else if(status == 1) {
  if(selection == 10) {
  if (cm.getPlayer().getLevel() >= 11) {
  cm.sendOk("#fn������� Extrabold##fs16#11 �̻��̶�ϱ�?.");
  cm.dispose();
 } else {    
cm.warp(910160000, 0);

 cm.dispose();
}
  } else if (selection == 2) {
             if (cm.getClient().getChannelServer().getMapFactory().getMap(910160000).getCharactersSize() > 0) {
             cm.sendOk("#fn������� Extrabold##fs16#�̹� �ٸ� ���谡�� �����Ͽ����ϴ�. �ٸ�ä���� �̿����ֽðų� ����Ŀ� �ٽ� ã�ƿ� �ֽʽÿ�.");
             cm.dispose();
             return;
	     }
        if (cm.getPlayerStat("LVL") <= 29) {
	cm.sendOk("#fn������� Extrabold##fs16#30�̻� �����ϽǼ� �ֽ��ϴ�.");
        cm.dispose();
        return;
        }
        if (cm.getPlayerStat("LVL") >= 220) {
	cm.sendOk("#fn������� Extrabold##fs16#220�̻��� �����ϽǼ� �����ϴ�.");
        cm.dispose();
        return;
        }
	     if (cm.haveItem(4310014,10)) {
            cm.TimeMoveMap(910160000,100050001,300);
            cm.gainItem(4310014, -10);
            cm.dispose();
            } else {
            cm.sendSpirit("\r\n#fn������� Extrabold##fs16##i4310014,##b#z4310014,##k �����ѰŰ�������?",false,2008);
            cm.dispose();
}
  } else if (selection == 4) {
             if (cm.getClient().getChannelServer().getMapFactory().getMap(910160000).getCharactersSize() > 0) {
             cm.sendOk("�̹� �ٸ� ���谡�� �����Ͽ����ϴ�. �ٸ�ä���� �̿����ֽðų� ����Ŀ� �ٽ� ã�ƿ� �ֽʽÿ�.");
             cm.dispose();
             return;
	     }
        if (cm.getPlayerStat("LVL") <= 220) {
	cm.sendOk("120 �̻� �����ϽǼ� �ֽ��ϴ�.");
        cm.dispose();
        return;
        }
        if (cm.getPlayerStat("LVL") >= 200) {
	cm.sendOk("200�̻��� �����ϽǼ� �����ϴ�.");
        cm.dispose();
        return;
        }
	     if (cm.haveItem(4310016,150)) {
            cm.TimeMoveMap(951000240,100050001,180);
            cm.gainItem(4310016, -150);
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
	     if (cm.haveItem(4310016,200)) {
            cm.TimeMoveMap(951000270,100050001,180);
            cm.gainItem(4310016, -200);
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