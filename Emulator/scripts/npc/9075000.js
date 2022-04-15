var status = -1;
var coin = 80;
var mob = 8240104; //소환될 몹 코드
var check = "하드 스우";//체크될 몹 이름
map = 350060900;//맵 코드
var x = -20;//x좌표
var y = -16;//y좌표
var hp = "75 조";
var hp1 = "30 조";
var hp2 = "45 조";

importPackage(Packages.constants);

function start() {
 action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

 if (status == 0) {
    if (cm.getPlayer().getMapId() == 350060900) {
  cm.sendSimple("    #fn나눔고딕 Extrabold##d"+check+"#k 는 하루마다#Cgray##fs10#(12시 기준) #fs15##r1번#k #fs12#만 소환이 가능합니다.\r\n\r\n         #d등급 :#k #r프리미엄#k          #fs13##d체력#k : #r"+hp1+"#k + #r"+hp2+"#k = #r"+hp+"#k\r\n\r\n        #L1##b창조된 빛의 정수#k #r" + coin + " 개#k - #d"+check+" 소환#k#l\r\n                  #L2##fs11##b"+ServerConstants.serverName+" 전용 광장으로 가기#k#l\r\n");
    } else {
   cm.dispose();
}
  } else if(selection == 1) {
            if (cm.getPlayer().getParty() == null) {
            cm.sendOk("#fn나눔고딕 Extrabold##fs13##r                   소환하려면 파티가 필요합니다.");
            cm.dispose();
            }
            if (!cm.isLeader()) {
	  cm.sendOk("#fn나눔고딕 Extrabold##fs13##r                    파티장만 소환이 가능합니다.");
                cm.dispose();
            }
            if (!cm.allMembersHere()) {
	cm.sendOk("#fn나눔고딕 Extrabold##fs13##r                파티원 전원이 이곳에 있어야 합니다.");
                cm.dispose();
           }
           if (cm.getMonsterCount(map) > 0) {
	cm.dispose();
	cm.openNpc(9010017);
            } else {
 if(cm.BossCheck(""+check+"", 1)) {
 if(cm.haveItem(4033364,coin)) {
 cm.gainItem(4033364,-coin);
 cm.spawnMob(mob, x, y);
 cm.BossAdd(""+check+"");
 cm.playerMessage(-1,"[알림] 보스 소환이 완료 되었습니다.");
 cm.dispose();
} else {
	cm.sendOk("#fn나눔고딕 Extrabold##fs13#                   #r창조된 빛의 정수가 부족합니다.#k");
	cm.dispose();
}
} else {
	cm.sendOk("    #fn나눔고딕 Extrabold##d"+check+"#k 는 하루마다#Cgray##fs10#(12시 기준) #fs15##r1번#k #fs12#만 소환이 가능합니다.");
	cm.dispose();
	}
	}
  } else if (selection == 2) {
   cm.warp(680000000, 0);
   cm.dispose();
  }
}
