
/*
제작:모름 수정:에덴
*/
importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);

var item = 4001254; // 소환템
var count = 0; //필요한 아이템 갯수
var count2 = 0; //필요한 아이템 갯수
var status = -1;

function start() {
 action(1, 0, 0);
}

function action(mode, type, selection) {
 status++;
 if (status == 0) {
  cm.sendSimple("보스를 소환할 수 있습니다.#l\r\n#L3##i"+item+"# #r"+count2+"개#k로 알리샤르 를 소환 [피 30억] #l#k\r\n#L2#광장으로 가기#l#k\r\n");
 } else if(status == 1) {
  if(selection == 1) {
 if (cm.getMonsterCount(105200719) > 0) {
  cm.sendOk("모든 몬스터를 전멸시켜야 합니다.");
  cm.dispose();
		} else if (!cm.haveItem(item, count)) {
			cm.sendOk("이지 스우를 소환하려면 #i"+item+"#"+count+"개가 필요합니다.");
			cm.dispose();
 } else {    
WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(6, "[SMART] ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 이지 스우를 소환하셨습니다. [SMART]")); 
 cm.gainItem(item,-count); // 메소 차감시키기

 cm.spawnMob(8240098,0,260);
 cm.dispose();
}
  } else if(selection == 3) {
 if (cm.getMonsterCount(922010900) > 0) {
  cm.sendOk("모든 몬스터를 전멸시켜야 합니다.");
  cm.dispose();
		} else if (!cm.haveItem(item, count2)) {
			cm.sendOk("하드 스우를 소환하려면 #i"+item+"#"+count2+"개가 필요합니다.");
			cm.dispose();
 } else {    
WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(6, "[SMART] ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 루디파퀘 알리샤르를 소환하셨습니다. [SMART]")); 
 cm.gainItem(item,-count2); // 메소 차감시키기

 cm.spawnMob(9300012,0,260);
 cm.dispose();
 }
  } else if (selection == 2) {
   cm.warp(100050001, 0);
   cm.dispose();
  } else {
   cm.dispose();
  }
 } else {
  cm.dispose();
 }
}

