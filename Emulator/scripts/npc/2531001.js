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
        if(!cm.haveItem(4033802,1)){
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r듀나미스 ::#k 자네.. #r검은 마녀#k 를 찾고 있지!..");
        } else {
        cm.sendOk ("#fn나눔고딕 Extrabold#자네는.. 이미 나에게 #b혈맹 증표#k 를 받은 것 같군!..#k\r\n혈맹 단원으로써 자신감을 가지게! 음하하!~");
        cm.dispose();
        }
    } else if (status == 1) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 네!.. 맞습니다.. 근데.. 그걸..! 어떻게?..",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n#r듀나미스 ::#k 난.. 이번 임무의 선봉.. #r듀나미스#k 라네..");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 아하.. 선봉 대원이시군요.. 그런데 어쩌다가.. 감금을..",2);
    } else if (status == 4) {
	cm.sendNextPrev("#fn나눔고딕 Extrabold##r듀나미스 ::#k 흠.. 트랩에 걸려.. 어쩌다보니 그렇게 되었네..\r\n쨋든 나를 구해준 것도 있고 여기에 온 걸 보면\r\n자네는 일반 대원보다 보통 강한게 아닌 것 같군..\r\n자네를 우리 혈맹 단원으로 임명 하고 싶네..\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i4033802# #b#z4033802##k");
    } else if (status == 5) {
	if (cm.canHold(4033802)) {
        cm.gainItem(4033802, 1);
        cm.sendOk ("#fn나눔고딕 Extrabold#이 #b증표#k 를 가지고.. 오른쪽 포탈로 이동하게나..!");
        cm.dispose();
        } else {
        cm.sendOk("#fn나눔고딕 Extrabold##r기타 창을 한 칸 이상 비워주게나..#k");
        cm.dispose();
        }
        cm.dispose();
    }
}