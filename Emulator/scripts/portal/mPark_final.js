/*
 * 퓨어온라인 소스 스크립트 입니다.
 * 
 * 포탈위치 : 
 * 포탈설명 : 
 * 
 * 제작 : 주크블랙
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
        if(pi.getPlayer().몬파()) {
           pi.getPlayer().set몬파(false);
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

       // eim.removePlayer(pi.getPlayer());// 이거같은데? 함해봄 본섭이란다
        return true;
    } else {
        pi.getPlayer().send(UIPacket.showInfo("던전 내의 몬스터를 모두 잡아야 다음 스테이지로 이동할 수 있습니다."));
        pi.getPlayer().message(5, "몬스터를 모두 잡으신 후 다음 포탈로 이동해 주세요.");
        return false;
    }
}