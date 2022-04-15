

importPackage(Packages.packet.creators);

/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Hina Online Development Source Script)

	테라 에 의해 만들어 졌습니다.

	엔피시아이디 : 3000022

	엔피시 이름 : 보석

	엔피시가 있는 맵 :  :  (400000002)

	엔피시 설명 : MISSINGNO


*/

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
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
    if (cm.getPlayer().getMapId() == 109090100) {
    
    						cm.getPlayer().addSpiritPoint(5);
    						cm.warp(109090000);
                cm.getPlayer().send(MainPacketCreator.sendHint("#b술래잡기 보상#k이 지급되었습니다.\r\n#e#r누적킬 +6점#k#n을 획득하셨습니다.",300,20));
                cm.dispose();
                } else if (cm.getPlayer().getMapId() == 109090101) {
                cm.getPlayer().addSpiritPoint(1);
                cm.warp(109090000);
                cm.getPlayer().send(MainPacketCreator.sendHint("#b술래잡기 보상#k이 지급되었습니다.\r\n#e#r누적킬 +1점#k#n을 획득하셨습니다.",300,20));
                cm.dispose();
                } else if (cm.getPlayer().getMapId() == 109090200) {
                   cm.getPlayer().addSpiritPoint(6);
                cm.warp(109090000);
                cm.getPlayer().send(MainPacketCreator.sendHint("#b술래잡기 보상#k이 지급되었습니다.\r\n#e#r누적킬 +5점#k#n을 획득하셨습니다.",300,20));
                cm.dispose();
                } else if (cm.getPlayer().getMapId() == 109090201) {
                cm.getPlayer().addSpiritPoint(1);
                cm.warp(109090000);
                cm.getPlayer().send(MainPacketCreator.sendHint("#b술래잡기 보상#k이 지급되었습니다.\r\n#e#r누적킬 +1점#k#n을 획득하셨습니다.",300,20));
                cm.dispose();

}
}
}