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
    if (cm.getPlayer().getMapId() == 302090220) {
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r아린 ::#k 누구시조..? 엇!.. 인사는 필요 없어요.. 조용히 해주세요..\r\n전.. 사악한 숲의 관리자 #d오멘#k 에게 모든 것을 감시 받고 있어요..");
    } else {
        cm.sendOk("#fn나눔고딕 Extrabold#매우.. 피곤하군요..");
        cm.dispose();
    }
    } else if (status == 1) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 흠.. 뭐지... #d오멘#k 이라면.. 어디서 들어 본 것 같은데..",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n#r아린 ::#k 혹시.. 당신은 강하신가요?..\r\n그렇다면.. 저를 부디.. 자유#롭게 해주세요. 부탁드려요..");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 그 정도야 전혀 어렵지 않지! 우하하.. 난 강하거든!\r\n어서 나를 #d오멘#k 이 있는 곳으로 안내해!!",2);
    } else if (status == 4) {
        cm.sendNextPrev("#fn나눔고딕 Extrabold##r아린 ::#k 정말이신가요..? 그럼.. 부탁드릴게요..#k\r\n\r\n#d(다음을 누르면 바로 오멘을 잡으러 이동합니다.)#k");
    } else if (status == 5) {
	if (cm.getPlayerCount(302090240) > 0) {
        cm.sendOk("#fn나눔고딕 Extrabold#이미.. 누군가가 먼저 #d오멘#k 을 만나고 있어.. 잠시.. 기다려..");
        cm.dispose();
        } else {
	cm.warp (302090240,0);
	cm.killAllMob();
        cm.sendNext("#fn나눔고딕 Extrabold##r아린 ::#k #d오멘#k 을 퇴치 후 이 것들을 저에게 가저와주세요..\r\n\r\n#i4009157# #b#z4009157##k "+cm.itemQuantity(4009157)+"/1\r\n#i4009158# #b#z4009158##k "+cm.itemQuantity(4009158)+"/1");
	cm.spawnMob(8230011, -650, 185);
	cm.spawnMob(8230012, -400, 185);
	cm.showEffect(false,"pepeKing/chat/nugu");
        cm.playSound(false,"Field.img/hekaton/enter00");
        cm.dispose();
        }
    }
}