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
           cm.sendSimple("#e<보스: 아카이럼>#n\r\n"
                        +"위대한 용사여, 검은 마법사의 사악한 군단장에게 맞설 준비를 마치셨습니까?\r\n\r\n"
                        +"#L0##b <보스: 아카이럼> 입장을 신청한다.");
       } else if (cm.getPlayer().getMapId() == 272020200) {
           cm.sendYesNo("퇴장하시겠습니까?");
       }
    } else if (status == 1) {
       if(selection == 0) {
          if (cm.getParty() == null) {
              cm.sendOk("파티를 생성한 후 도전해 주세요.");
              cm.dispose();
          } else if (cm.getPlayerCount(272020200) >= 1) {
              cm.sendOk("이미 누군가가 아카이럼에 도전하고 있습니다.\r\n다른 채널을 이용해 주세요.");
              cm.dispose();
          } else if (!cm.isLeader()) {
              cm.sendOk("파티장만이 입장을 신청할 수 있습니다.");
              cm.dispose();
          }
       cm.resetMap(272020200)
       cm.warpParty(272020200);
       cm.getPlayer().getMap().broadcastMessage(Packages.packet.creators.MainPacketCreator.removeNPC(cm.getPlayer().getMap().containsNPC(2144016)));
       cm.getPlayer().getMap().broadcastMessage(Packages.packet.creators.MainPacketCreator.removeNPCController(cm.getPlayer().getMap().containsNPC(2144016)));
       cm.getPlayer().getMap().startMapEffect("용기와 만용을 구분하지 못하는 자들이여. 목숨이 아깝지 않다면 내게 덤비도록. 후후.", 5120056);
       cm.playSound(false,"Sound/Voice.img/akayrum/2");
       cm.spawnNpc(2144010, 313, -179);
       cm.dispose();
     } else {
       cm.warp(272020110,2);
       cm.dispose();
     }
    }
}