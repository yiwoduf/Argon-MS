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
pi.getPlayer().getMap().startMapEffect("�ǿ����� Ƽ��Ƽ�� �� ���� �������� ȯ���Ѵٳ�!", 5120098);
break;

case 105200300:
pi.resetMap(105200310);
pi.PartyTimeMove(105200000,105200310,1800);
pi.spawnMob(8920100,88,135);
pi.getPlayer().getMap().destroyReactor(100003);
pi.getPlayer().getMap().startMapEffect("����� ������ �̸� �����ص帮����.", 5120102);
break;

case 105200401:
pi.resetMap(105200411);
pi.PartyTimeMove(105200000,105200411,1800);
pi.spawnMob(8930100,-145,443);
break;

}
} else {
pi.getPlayer().Message(6,"�ʿ� �ִ� ���͸� ��� óġ�� �ֽʽÿ�.");
}
}