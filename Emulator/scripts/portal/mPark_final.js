/*
 * ǻ��¶��� �ҽ� ��ũ��Ʈ �Դϴ�.
 * 
 * ��Ż��ġ : 
 * ��Ż���� : 
 * 
 * ���� : ��ũ��
 * 
 */
importPackage(java.lang);
importPackage(Packages.packet.creators);
importPackage(Packages.constants);
importPackage(Packages.tools.RandomStream);

function enter(pi) {
    var eim = pi.getPlayer().getEventInstance();
    if (eim == null) {
        pi.warp(140020300);
        return true;
    }
    if (eim.getProperty("CurrentStage").equals("7")) {
        pi.getPlayer().gainExp(eim.getProperty("totalExp"), true, true, true); 
        if(pi.getPlayer().����()) {
           pi.getPlayer().set����(false);
        if (pi.getPlayer().getLevel() >= 200 && pi.getPlayer().getStoneP() == 9) {
          pi.getPlayer().TheMPClear();
        } else if (pi.getPlayer().getStoneP() <= 4) {
          pi.getPlayer().gainExp(((GameConstants.getExpNeededForLevel(pi.getPlayer().getLevel()) / 10) * (pi.getPlayer().getStoneP() + 1)), true, true, true);
          pi.getPlayer().TheMPClear();
        } else if (pi.getPlayer().getLevel() >= 240 && pi.getPlayer().getStoneP() > 4) {
          pi.getPlayer().gainExp((GameConstants.getExpNeededForLevel(pi.getPlayer().getLevel()) / 37), true, true, true);
          pi.getPlayer().TheMPClear();
        } else if (pi.getPlayer().getLevel() >= 230 && pi.getPlayer().getStoneP() > 4) {
          pi.getPlayer().gainExp((GameConstants.getExpNeededForLevel(pi.getPlayer().getLevel()) / 35), true, true, true);
          pi.getPlayer().TheMPClear();  
        } else if (pi.getPlayer().getLevel() >= 220 && pi.getPlayer().getStoneP() > 4) {
          pi.getPlayer().gainExp((GameConstants.getExpNeededForLevel(pi.getPlayer().getLevel()) / 33), true, true, true);
          pi.getPlayer().TheMPClear(); 
        } else if (pi.getPlayer().getLevel() >= 210 && pi.getPlayer().getStoneP() > 4) {
          pi.getPlayer().gainExp((GameConstants.getExpNeededForLevel(pi.getPlayer().getLevel()) / 30), true, true, true);
          pi.getPlayer().TheMPClear(); 
        } else if (pi.getPlayer().getLevel() >= 200 && pi.getPlayer().getStoneP() > 4) {
          pi.getPlayer().gainExp((GameConstants.getExpNeededForLevel(pi.getPlayer().getLevel()) / 28), true, true, true);
          pi.getPlayer().TheMPClear(); 
        } else {
          pi.getPlayer().gainExp((GameConstants.getExpNeededForLevel(pi.getPlayer().getLevel()) / 20), true, true, true);
          pi.getPlayer().TheMPClear(); 
        }

         
          eim.unregisterPlayer(pi.getPlayer()); 
        } else {
if (pi.getPlayer().getStoneP() <= 4) {
          pi.gainItem(4001832, Randomizer.rand(50,150));
}
          pi.getPlayer().gainExp(eim.getProperty("totalExp") / 10, true, true, true);
          eim.unregisterPlayer(pi.getPlayer()); 
         
        }

       // eim.removePlayer(pi.getPlayer());// �̰Ű�����? ���غ� �����̶���
        return true;
    } else {
        pi.getPlayer().send(UIPacket.showInfo("���� ���� ���͸� ��� ��ƾ� ���� ���������� �̵��� �� �ֽ��ϴ�."));
        pi.getPlayer().message(5, "���͸� ��� ������ �� ���� ��Ż�� �̵��� �ּ���.");
        return false;
    }
}