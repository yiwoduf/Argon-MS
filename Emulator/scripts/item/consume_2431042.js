
/*
������ : Ÿ�� (time_amd@nate.com)
*/

importPackage(Packages.client.items);
importPackage(java.lang);
importPackage(Packages.tools.RandomStream);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);
var status = 0;
var ran = 300;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    
    if (status == 0) {
        var leftslot = cm.getPlayer().getInventory(MapleInventoryType.ETC).getNumFreeSlot();
        if (leftslot < 1) {
            cm.sendOk("��Ÿâ �κ��丮�� 1ĭ ����ּ���.");
            cm.dispose();
            return;
        }
	ran = Randomizer.rand(300,300);
        if (Randomizer.nextInt(300) <= 50) {
            cm.sendOk("#i4440300# #b#z4440300##k�� ���Խ��ϴ�. \r\n#rB�� ���#k�� ��������� !");
            cm.gainItem(4440300, 1);
        } else if (Randomizer.nextInt(300) <= 50) {
            cm.sendOk("#i4441300# #b#z4441300##k�� ���Խ��ϴ�. \r\n#rB�� ���#k�� ��������� !");
            cm.gainItem(4441300, 1);
        } else if (Randomizer.nextInt(300) <= 50) {
            cm.sendOk("#i4442300# #b#z4442300##k�� ���Խ��ϴ�. \r\n#rB�� ���#k�� ��������� !");
            cm.gainItem(4442300, 1);
        } else if (Randomizer.nextInt(300) <= 50) {
            cm.sendOk("#i4443300# #b#z4443300##k�� ���Խ��ϴ�. \r\n#rB�� ���#k�� ��������� !");
            cm.gainItem(4443300, 1); // C�� ��
	} else if (Randomizer.nextInt(300) <= 30) {  
            cm.sendOk("#i1112762# #b#z1112762##k�� ���Խ��ϴ�. \r\n����������?!");
            cm.gainItem(1112762, 1);
	} else if (Randomizer.nextInt(300) <= 30) {
            cm.sendOk("#i1132191# #b#z1132191##k�� ���Խ��ϴ�. \r\n����������?!");
            cm.gainItem(1132191, 1);
	} else if (Randomizer.nextInt(300) <= 25) {  
            cm.sendOk("#i4440200# #b#z4440200##k�� ���Խ��ϴ�. \r\n����������? #rA�� ���#k�� ��������� !");
            cm.gainItem(4440200, 1);
	} else if (Randomizer.nextInt(300) <= 25) {
            cm.sendOk("#i4441200# #b#z4441200##k�� ���Խ��ϴ�. \r\n����������? #rA�� ���#k�� ��������� !");
            cm.gainItem(4441200, 1);
	} else if (Randomizer.nextInt(300) <= 25) {
            cm.sendOk("#i4442200# #b#z4442200##k�� ���Խ��ϴ�. \r\n����������? #rA�� ���#k�� ��������� !");
            cm.gainItem(4442200, 1);
	} else if (Randomizer.nextInt(300) <= 25) {
            cm.sendOk("#i4443200# #b#z4443200##k�� ���Խ��ϴ�. \r\n����������? #rA�� ���#k�� ��������� !"); 
            cm.gainItem(4443200, 1); // B�� ��
	} else if (Randomizer.nextInt(300) <= 20) {
            cm.sendOk("#i4440100# #b#z4440100##k�� ���Խ��ϴ�. \r\n�������ƿ� ! �׷�����  #rS�� ���#k�� ���� !");
            cm.gainItem(4440100, 1); 
	} else if (Randomizer.nextInt(300) <= 20) {
            cm.sendOk("#i4441100# #b#z4441100##k�� ���Խ��ϴ�. \r\n�������ƿ� ! �׷�����  #rS�� ���#k�� ���� !");
            cm.gainItem(4441100, 1); 
	} else if (Randomizer.nextInt(300) <= 20) {
            cm.sendOk("#i4442100# #b#z4442100##k�� ���Խ��ϴ�. \r\n�������ƿ� ! �׷�����  #rS�� ���#k�� ���� !");
            cm.gainItem(4442100, 1); 
	} else if (Randomizer.nextInt(300) <= 20) {
	    cm.sendOk("#i4443100# #b#z4443100##k�� ���Խ��ϴ�. \r\n�������ƿ� ! �׷�����  #rS�� ���#k�� ���� !");
            cm.gainItem(4443100, 1); 
	} else if (Randomizer.nextInt(300) <= 3) {
	    cm.sendOk("#i4440000# #b#z4440000##k�� ���Խ��ϴ�. \r\n���� ���ϵ���� ����� #b��Ű#k����!");
	    WorldBroadcasting.broadcast(MainPacketCreator.getGMText(8, "[TIME] "+cm.getPlayer().getName()+"���� [�ź��� ������]���� S�� ���� ����� ȹ�� �ϼ̽��ϴ�. �ٵ� ������ �ּ���!"));
            cm.gainItem(4440000, 1); 
	} else if (Randomizer.nextInt(300) <= 3) {
            cm.sendOk("#i4441000# #b#z4441000##k�� ���Խ��ϴ�. \r\n���� ���ϵ���� ����� #b��Ű#k����!");
            WorldBroadcasting.broadcast(MainPacketCreator.getGMText(8, "[TIME] "+cm.getPlayer().getName()+"���� [�ź��� ������]���� S�� ����� ����� ȹ�� �ϼ̽��ϴ�. �ٵ� ������ �ּ���!"));
	    cm.gainItem(4441000, 1); 
	} else if (Randomizer.nextInt(300) <= 3) {
            cm.sendOk("#i4442000# #b#z4442000##k�� ���Խ��ϴ�. \r\n���� ���ϵ���� ����� #b��Ű#k����!"); 
            WorldBroadcasting.broadcast(MainPacketCreator.getGMText(8, "[TIME] "+cm.getPlayer().getName()+"���� [�ź��� ������]���� S�� ������ ����� ȹ�� �ϼ̽��ϴ�. �ٵ� ������ �ּ���!"));
cm.gainItem(4442000, 1); 
	} else if (Randomizer.nextInt(300) <= 3) {
            cm.sendOk("#i4443000# #b#z4443000##k�� ���Խ��ϴ�. \r\n���� ���ϵ���� ����� #b��Ű#k����!");
            WorldBroadcasting.broadcast(MainPacketCreator.getGMText(8, "[TIME] "+cm.getPlayer().getName()+"���� [�ź��� ������]���� S�� ��ø���� ����� ȹ�� �ϼ̽��ϴ�. �ٵ� ������ �ּ���!"));
cm.gainItem(4443000, 1); // S�� ��
	} else {
	    cm.sendOk("��Ÿ������ #r��#k ! ������ȸ��....");
}
	cm.gainItem(2431042, -1);
        cm.dispose();
    }
}

