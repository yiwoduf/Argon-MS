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
	cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r탈레스 ::#k 흠.. 걱정이야.. 걱정..\r\n매우.. 걱정이야.. 도저히.. 안심을 할 수 없구만..");
    } else if (status == 1) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 어르신.. 무슨일 있으신가요?..\r\n스트레스는 건강에 좋지 않은데..",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n#r탈레스 ::#k 내가.. 요즘 도서관의 초딩.. 시발년들 때문에..\r\n심각하게 고민을 안할래야 안할 수 없어.. 정말이지..");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 시..시발련들이요?..ㄷㄷㄷ",2);
    } else if (status == 4) {
	cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n#r탈레스 ::#k 도서관의 물품이 얼마전부터 자꾸 사라지기\r\n시작한다네.. 물론.. 어느 정도 것 하면 이해를 하겠다만..\r\n내가! 가장 아끼고 사랑하는 #b가족 사진#k 을 가져갔지! 뭔가!!..\r\n이.. 쇠약한.. 늙은이 앞으로 살 날이 얼마남지 않았거늘..\r\n정말 너무한다고 생각안하나? .. 어떻게.. 이럴수가..");
    } else if (status == 5) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 흠.. 그럼 제가 어떻게 도움을 좀 드려볼까요..?",2);
    } else if (status == 6) {
        cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n#r탈레스 ::#k 자네.. 정말인가?\r\n정말로 그래도 되겠는가?..");
    } else if (status == 7) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 네.. 머 어차피 할 일도 없었는걸요..",2);
    } else if (status == 8) {  
        cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n#r탈레스 ::#k 과연 젊은 힘이 느껴지는구만...\r\n아주 용기가 남다르군.. 자네가.. 매우 맘에 들어..");
    } else if (status == 9) {
        cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 머.. 이런일로 용기까지야.. 하하..;;",2);
    } else if (status == 10) {
        cm.sendNextPrev("#fn나눔고딕 Extrabold##r탈레스 ::#k 그럼.. 자네에게.. 부탁하지!..\r\n지금 바로 떠나보겠나?...\r\n\r\n#d(다음을 누르면 바로 이동합니다.)#k");
    } else if (status == 11) {
	if (cm.getPlayerCount(302010100) > 0) {
        cm.sendOk("#fn나눔고딕 Extrabold##r이미.. 누군가.. 들어가있군.. 잠시 기다려 주게나..#k");
        cm.dispose();
        } else {
	cm.removeAll(4032801);
	cm.removeAll(4033338);
	cm.removeAll(4034075);
	cm.removeAll(4009151);
	cm.removeAll(4009152);
	cm.removeAll(4009078);
	cm.removeAll(4009150);
	cm.removeAll(4009157);
	cm.removeAll(4009158);
	cm.removeAll(4033220);
	cm.removeAll(4033972);
	cm.removeAll(4009155);
	cm.removeAll(4033966);
	cm.removeAll(4033975);
	cm.removeAll(4031217);
	cm.removeAll(4033976);
	cm.removeAll(4033977);
	cm.removeAll(4033802);
	cm.removeAll(4032743);
        cm.warp(302010100,0);
	cm.killAllMob();
	cm.getPlayer().dropMessage(-1, "[주의] 초딩들이 고용한 몬스터에게 데미지를 입을경우.. 곧바로 쫓겨납니다.");
	cm.getPlayer().dropMessage(5, "[주의] 초딩들이 고용한 몬스터에게 데미지를 입을경우.. 곧바로 쫓겨납니다.");
        cm.dispose();
        }
    }
}