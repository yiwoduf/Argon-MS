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
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r키단 ::#k 우리의 희망.. #r마르스#k 님 까지.. 이렇게 되시다니..\r\n");
    } else if (status == 1) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 정말.. 유감입니다.. 제가 지켜드렸어야하는건데..",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n#r키단 ::#k 괜찮다.. 자네는 자책하지 말게..\r\n그 자를 막지 못한.. 우리 책임이지..\r\n그래도!.. 드디어 우리가 그 자의 정체를 알아냈다네..!");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 대체 그 자가 누구지요?\r\n당장.. 제가 #r마르스#k 님의 원수를 갚을게요..!",2);
    } else if (status == 4) {
        cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n#r키단 ::#k 그건.. 바로.. 사악한 #r검은 마녀#k 라는 녀석이지..\r\n일단 자넨 섣불리 행동하진 말게..\r\n자네 사정이라면 저번에 #r마르스#k 님께 대충 애기들었네..\r\n#r탈레스#k 님의 #b가족 사진#k 을 찾으러 왔다지..?\r\n일단은!.. 자네가 아무래도.. 대신 임무를 수행해줘야할 것 같아..");
    } else if (status == 5) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 저는.. 모든 준비가 되어있습니다..!\r\n\r\n#d(다음을 누르면 임부를 수행하러 바로 이동합니다.)#k",2);
    } else if (status == 6) {
        cm.warp (303090030,0);
        cm.sendOk("#fn나눔고딕 Extrabold#일단 우리의 리더.. #r나인하트#k 를 찾아가보게나..");
        cm.dispose();
    }
}