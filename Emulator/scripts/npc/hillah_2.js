importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);
var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.getPlayer().getKeyValue("hillah1") == null) {;
        cm.getPlayer().setKeyValue("hillah1", 0);
    }
    mobx = [-426, -234, 5, 214, 449, 642, 881, 1126]
    moby = 198
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status--;
    }
    if (mode == 1) {
        status++;
    }
 
    if (status == 0) {
        if (!cm.isLeader()) {
            cm.getPlayer().getMap().broadcastMessage(UIPacket.showInfo("��Ƽ���� �����û�� �� �� �ֽ��ϴ�."))
            cm.dispose();
        } else {
            if (cm.getPlayer().getMapId() == 262030100 || cm.getPlayer().getMapId() == 262031100) {
            if (cm.getPlayer().getKeyValue("hillah1") == 0) {
                if (cm.getMonsterCount(cm.getPlayer().getMapId()) == 0) {
                    cm.getPlayer().getMap().broadcastMessage(UIPacket.showInfo("���������� �츮�� ħ���� ��ġë���ϴ�!!! ���������� ����ġ����."));
                    if (cm.getPlayer().getMapId() == 262030100) {
                        bloodid = 8870003;
                    } else {
                        bloodid = 8870103;
                    }
                    cm.spawnMob(bloodid, 781, 198);
                    cm.spawnMob(bloodid, 781, 198);
                    cm.spawnMob(bloodid, 781, 198);
                    cm.getPlayer().setKeyValue("hillah1",1);
                    cm.dispose();
                } else {
                    cm.getPlayer().getMap().broadcastMessage(UIPacket.showInfo("���� �ִ� ž �ֻ������� ���� ���ؼ��� ���̷��� ����Ʈ���� ��� �����ľ� �մϴ�."));
                    cm.dispose();
                }
            } else {
                if (cm.getMonsterCount(cm.getPlayer().getMapId()) == 0) {
                    cm.warpParty(Number(cm.getPlayer().getMapId()) + 100);
                    if (cm.getPlayer().getMapId() == 262030200) {
                        mobid = 8870002;
                    } else {
                        mobid = 8870102;
                    }
                    for (i = 0; i < mobx.length; i++) {
                        cm.spawnMob(mobid, mobx[i], 198);
                    }
                    
                    cm.dispose();
                } else {
                    cm.getPlayer().getMap().broadcastMessage(UIPacket.showInfo("���������� ���ط� ���� ��ҷ� �̵��� �� �����ϴ�."));
                    cm.dispose();
                }
            }
        } else {
                  if (cm.getPlayer().getKeyValue("hillah2") == 0) {
                if (cm.getMonsterCount(cm.getPlayer().getMapId()) == 0) {
                    cm.getPlayer().getMap().broadcastMessage(UIPacket.showInfo("���������� �츮�� ħ���� ��ġë���ϴ�!!! ���������� ����ġ����."));
                    if (cm.getPlayer().getMapId() == 262030200) {
                        bloodid = 8870004;
                    } else {
                        bloodid = 8870104;
                    }
                    cm.spawnMob(bloodid, 781, 198);
                    cm.spawnMob(bloodid, 781, 198);
                    cm.spawnMob(bloodid, 781, 198);
                    cm.getPlayer().setKeyValue("hillah2",1);
                    cm.dispose();
                } else {
                    cm.getPlayer().getMap().broadcastMessage(UIPacket.showInfo("���� �ִ� ž �ֻ������� ���� ���ؼ��� ���̷��� ����Ʈ���� ��� �����ľ� �մϴ�."));
                    cm.dispose();
                }
            } else {
                if (cm.getMonsterCount(cm.getPlayer().getMapId()) == 0) {
                    cm.warpParty(Number(cm.getPlayer().getMapId()) + 100);
                    if (cm.getPlayer().getMapId() == 262030300) {
                        mobid = 8870000;
                    } else {
                        mobid = 8870100;
                    }
                        cm.spawnMob(mobid, 165, 198);
                        cm.dispose();
                } else {
                    cm.getPlayer().getMap().broadcastMessage(UIPacket.showInfo("���������� ���ط� ���� ��ҷ� �̵��� �� �����ϴ�."));
                    cm.dispose();
                }
            }
        }
      }
   }
 }
 
