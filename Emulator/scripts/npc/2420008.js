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
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r에레스카 ::#k 거기! 너! 조용히 좀 할 수 없겠니..?");
    } else if (status == 1) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 네?.. 나.. 나요?..",2);
    } else if (status == 2) {
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r에레스카 ::#k 그래!.. 너 말야..");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 엥?.. 내가 뭘..\r\n\r\n#d(이 년이.. 괜한 사람한테 시비네..)#k",2);
    } else if (status == 4) {
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r에레스카 ::#k 정말.. 답답하기는.. 조용히! 잘 들어봐..\r\n파라오의 분노와 많은이들이 슬퍼하는 소리가.. 들리지 않니?");
    } else if (status == 5) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 아.. 예.. 뭐.. 자세히 들어보면..\r\n들리는거 같기도 하고.. 아닌 것 같기도 하고..\r\n\r\n#d(이 년이.. 무슨 귀신이 씌었나..)#k",2);
    } else if (status == 6) {
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r에레스카 ::#k 그래! 바로 그거야!!\r\n이건 분명히 파라오가 잠든 피라미드에 무슨일이 생긴게 틀림없어!");
    } else if (status == 7) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 아.. 네.. 그럼.. 얼른 댁이 구하러 가보세요.~\r\n전 몹시! 바쁜 사람인지라.. 이만..\r\n\r\n#d(어휴.. 피하든가 해야지..)#k",2);
    } else if (status == 8) {
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r에레스카 ::#k 잠깐!.. 애! 너 어딜 가려고 그러니..\r\n정말 파라오의 분노와 사람들의.. 슬픔을 외면할거야!?");
    } else if (status == 9) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 아니.. 글세.. 저는 파라오인가 머시긴가..\r\n전혀.. 관심이 없다니까 그러네요..\r\n\r\n#d(어휴.. 정말.. 피곤한 스타일이야..)#k",2);
    } else if (status == 10) {
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r에레스카 ::#k 아.. 그래..? 그거 참 아쉽네..\r\n#fs15#파라오의 보물 #fs12#이.. 그렇게 가치가 높다던데..\r\n뭐.. 바쁘다니.. 가는 길 어서.. 마저 가렴..~^^");
    } else if (status == 11) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 소인.. 세상의 어둠을 외면할 수 없는자..\r\n날 필요로 하는 사람이 있다면.. 이 한 몸을 바치겠나이다..\r\n\r\n#d(파.. 파라오의 보.. 보물..?..)#k",2);
    } else if (status == 12) {
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r에레스카 ::#k 하.. 거참.. 영웅님의 등장에 눈물겹구만.. 그래..\r\n뭐.. 이건.. 비즈니스니까.. 별 다른 상관은 없겠지..\r\n나같이 이쁘고 연약한 여자는.. 영웅을 필요로 하는 법이자나?");
    } else if (status == 13) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 아.. 그건.. 그렇다 치고.. 뭘 하면 되는데요.?",2);
    } else if (status == 14) {
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r에레스카 ::#k 방법은 아주! 간단해!\r\n피라미드에 가서 무슨일이 생긴건지 알아보면 되거든..?\r\n무슨일이 생겼다면.. 도와도 좀 주고.. 그래봐..");
    } else if (status == 15) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 하.. 그거 참..\r\n대충 말로만 들어도 대단히..; 간단하네요.. 아주 그냥.. 확..;",2);
    } else if (status == 16) {
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r에레스카 ::#k 하하.. 진정하고.. 지금 바로 보내줄게..\r\n\r\n#d(다음을 누르면 바로 이동합니다.)#k");
    } else if (status == 17) {
        cm.warp(926010000,0);
        cm.dispose();  
    }
}