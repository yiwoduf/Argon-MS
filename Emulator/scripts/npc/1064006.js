


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	에반 에 의해 만들어 졌습니다.

	엔피시아이디 : 1064001

	엔피시 이름 : 의문의 소녀

	엔피시가 있는 맵 : 루타비스 : 서쪽정원 (105200200)

	엔피시 설명 : MISSINGNO


*/


var status = -1;
function start() {
    status = -1;
    action (1, 0, 0);
}
partypass = 0
h = 0;
check = "카오스 피에르";//보스몹
level = 200//요구레벨
var map = 105200610;//맵코드
var hp = "4860 억";
var hp1 = "1620 억";
var hp2 = "1620 억";
var hp3 = "1620 억";

function action(mode, type, selection) {

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
    if (status == -1) {
        cm.dispose();
    }

   if (status == 0) {
    if (cm.getPlayer().getMapId() == 105200200) {
        cm.sendSimple("#fn나눔고딕 Extrabold##fs13##d"+check+"#k 를 격파하기 위해 이동 하시겠습니까?\r\n#rLv."+level+"#k 부터 입장이 가능합니다.\r\n\r\n#d체력#k : #r"+hp1+"#k + #r"+hp2+"#k + #r"+hp3+"#k = #r"+hp+"#k\r\n\r\n#fs11##L1##b"+check+" 를 격파하기 위해 이동한다.");
    } else {
   cm.dispose();
}
     } 
        if (selection == 1) {
        if (cm.getPlayer().getParty() == null) {
            cm.sendOk("#fn나눔고딕 Extrabold##r파티가 존재하지 않습니다.#k");
            cm.dispose();
        } else if (!cm.isLeader()) {
            cm.sendOk("#fn나눔고딕 Extrabold##r파티장이 아닙니다.#k")
            cm.dispose();
        } else if (cm.getPlayerCount(map) > 0) {
            cm.sendOk("#fn나눔고딕 Extrabold#이미 누군가가 #d"+check+"#k 에 도전하고 있습니다.\r\n#b다른 채널을 이용해 주세요.#k");
            cm.dispose();
        }
        if (partypass == 0) {
            말 = "#fn나눔고딕 Extrabold#파티원 중 #b"
            for (i = 0; i < cm.getPartyMembers().size(); i++) {
                if (cm.getPlayer().getParty().getMembers().get(i).getLevel() < level){
                    partypass = 1;
                    h++
                    말 += cm.getPlayer().getParty().getMembers().get(i).getName()
                    if (h != cm.getPartyMembers().size()) {
                        if (!h == i) {
                            말 += ", "
                        }
                    }
                }
            }
            말 += "#fn나눔고딕 Extrabold##k 님은\r\n레벨이 만족하지 않아서 불가능 합니다.\r\n\r\n#rLv."+level+"#k 부터 입장이 가능합니다."
            if (partypass == 1) {
                cm.sendOk(말);
                cm.dispose();
            } else {
          cm.warpParty(map);
	  cm.dispose();
    }
}
}
}