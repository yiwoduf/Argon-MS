var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
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
       if(cm.getPlayer().getMapId() == 272020110) {
           cm.sendSimple("#e<����: ��ī�̷�>#n\r\n"
                        +"������ ��翩, ���� �������� ����� �����忡�� �¼� �غ� ��ġ�̽��ϱ�?\r\n\r\n"
                        +"#L0##b <����: ��ī�̷�> ������ ��û�Ѵ�.");
       } else if (cm.getPlayer().getMapId() == 272020200) {
           cm.sendYesNo("�����Ͻðڽ��ϱ�?");
       }
    } else if (status == 1) {
       if(selection == 0) {
          if (cm.getParty() == null) {
              cm.sendOk("��Ƽ�� ������ �� ������ �ּ���.");
              cm.dispose();
          } else if (cm.getPlayerCount(272020200) >= 1) {
              cm.sendOk("�̹� �������� ��ī�̷��� �����ϰ� �ֽ��ϴ�.\r\n�ٸ� ä���� �̿��� �ּ���.");
              cm.dispose();
          } else if (!cm.isLeader()) {
              cm.sendOk("��Ƽ�常�� ������ ��û�� �� �ֽ��ϴ�.");
              cm.dispose();
          }
       cm.resetMap(272020200)
       cm.warpParty(272020200);
       cm.getPlayer().getMap().broadcastMessage(Packages.packet.creators.MainPacketCreator.removeNPC(cm.getPlayer().getMap().containsNPC(2144016)));
       cm.getPlayer().getMap().broadcastMessage(Packages.packet.creators.MainPacketCreator.removeNPCController(cm.getPlayer().getMap().containsNPC(2144016)));
       cm.getPlayer().getMap().startMapEffect("���� ������ �������� ���ϴ� �ڵ��̿�. ����� �Ʊ��� �ʴٸ� ���� ���񵵷�. ����.", 5120056);
       cm.playSound(false,"Sound/Voice.img/akayrum/2");
       cm.spawnNpc(2144010, 313, -179);
       cm.dispose();
     } else {
       cm.warp(272020110,2);
       cm.dispose();
     }
    }
}