importPackage(Packages.packet.creators);
importPackage(Packages.handler.channel);

function enter(pi) {
if(pi.getMonsterCount(pi.getPlayer().getMapId()) == 0) {
switch(pi.getPlayer().getMapId()) {

case 105200100:
pi.resetMap(105200110);
pi.PartyTimeMove(105200000,105200110,1800);
pi.spawnMob(8910100,-91,-455);
break;

case 105200200:
pi.resetMap(105200210);
pi.PartyTimeMove(105200000,105200210,1800);
pi.spawnMob(8900100,517,551);
//pi.getPlayer().send(UIPacket.showWZEffect("Map/Effect.img/WU_PartyQuest/RankedIn", 1));
pi.getPlayer().send(MainPacketCreator.showEffect("rootabyss/firework"));
pi.getPlayer().send(MainPacketCreator.playSound("rootabyss/firework"));
pi.getPlayer().getMap().startMapEffect("피에르의 티파티에 온 것을 진심으로 환영한다네!", 5120098);
break;

case 105200300:
pi.resetMap(105200310);
pi.PartyTimeMove(105200000,105200310,1800);
pi.spawnMob(8920100,88,135);
pi.getPlayer().getMap().destroyReactor(100003);
pi.getPlayer().getMap().startMapEffect("당신의 죽음을 미리 슬퍼해드리지요.", 5120102);
break;

case 105200401:
pi.resetMap(105200411);
pi.PartyTimeMove(105200000,105200411,1800);
pi.spawnMob(8930100,-145,443);
break;

}
} else {
pi.getPlayer().Message(6,"맵에 있는 몬스터를 모두 처치해 주십시오.");
}
}