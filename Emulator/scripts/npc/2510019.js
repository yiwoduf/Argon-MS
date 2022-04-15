importPackage(Packages.packet.creators);

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
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r마르스 ::#k 으으으.... 그.. 그 녀석이이.. 나타났어..");
    } else if (status == 1) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 괜찮으세요!! #r마르스#k 님!",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n#r마르스 ::#k 우..우린.. 그 녀석의 함정에 빠지고 말았어..");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 아아.. 정신 차려보세요...",2);
    } else if (status == 4) {
        cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n#r마르스 ::#k 나의 힘이 얼마 남지 않았다네..\r\n자네가 부디.. 그를 쫓아주게나.. 그는.. 그는..");
    } else if (status == 5) {
        cm.warp (303090020,0);
	cm.showEffect(false,"Ereb/attack");
        cm.playSound(false,"Field.img/rootabyss/undo");
        cm.getPlayer().dropMessage(-1,"[오로라 워프] 신성한 땅 에레브.. 에 도착하였습니다.");
        cm.getPlayer().dropMessage(5,"[오로라 워프] 신성한 땅 에레브.. 에 도착하였습니다.");
        cm.sendNext("#fn나눔고딕 Extrabold#그는.. 분명 이 곳으로 갔다네..\r\n우리의 정보원이 소식을 남기고 간.. 이 곳 에레브..\r\n\r\n더 이상.. #r마르스#k 의 소리는 들리지 않는다.\r\n\r\n#d(각 교관들을 클릭해 상황을 알아보자.)#k");
        cm.dispose();
    }
}