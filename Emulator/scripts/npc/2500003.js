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
	if (cm.getPlayer().getMapId() == 304090310) { 
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r리타 ::#k 안녕하세요.. 저는 #r탈레스#k 님의 충실한 수하입니다..\r\n");
        } else {
        cm.sendOk("#fn나눔고딕 Extrabold#흐음.. 졸리네..");
        }
    } else if (status == 1) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 으흠.. 그렇군요..\r\n헌데.. 다들.. 어떻게 된거조..?\r\n돌로 변해버리고 말았는데..\r\n",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n#r리타 ::#k 덕분에.. 모두 월래대로 무사히 돌아왔어요..\r\n또한.. 부탁 한 것이.. 이리 큰 일인줄 모르셧다고\r\n#r탈레스#k 님도 매우 미안해하세요..\r\n");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 하하..! 생각보다.. 힘들었지만..\r\n모두에게 도움이 되었다니.. 만족합니다..",2);
    } else if (status == 4) {
	cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n#r리타 ::#k #r탈레스#k 님의 소중한 #b가족 사진#k 도\r\n덕분에.. 아주.. 무사히 되찾으셨어요...\r\n신세를 많이지셨다면서.. 보상을 주시겠다더군요..!");
    } else if (status == 5) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 하하.. 뭐 보상까지.. 바라고 한건 아닌데..\r\n뭐.. 주신다니.. 그럼.. 사양.. 않고 받겠습니다..~^^*",2);
    } else if (status == 6) {
        if (cm.getQuestStatus(200) == 0) {
	cm.sendNextPrev("#fn나눔고딕 Extrabold##r리타 ::#k 하하..! 당연히.. 그러시겠지요..!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i1122017# #b#z1122017##k #r2 일권#k\r\n#i4080000# #b#z4080000##k\r\n#i4080100# #b#z4080100##k\r\n#i4310129# #b썸머리밋 코인#k #r40 개#k\r\n\r\n#d(다음을 누르면 보상을 받고 퀘스트의 전당 으로 이동합니다.)#k");
        } else {
	cm.sendNextPrev("#fn나눔고딕 Extrabold##r리타 ::#k 하하..! 당연히.. 그러시겠지요..!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i4310129# #b썸머리밋 코인#k #r20 개#k\r\n\r\n#d(다음을 누르면 보상을 받고 퀘스트의 전당 으로 이동합니다.)#k");
        }
    } else if (status == 7) {
        if (cm.getQuestStatus(200) == 0) {
	if (cm.canHold(4080000) && cm.canHold(4080100) && cm.canHold(4310129) && cm.canHold(1122017)) {
	cm.gainItemPeriod(1122017, 1, 2);
        cm.gainItem(4080000, 1);
        cm.gainItem(4080100, 1);
        cm.gainItem(4310129, 40);
	cm.forceStartQuest(200);
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
	cm.warp(100030301,0);
	cm.showEffect(false,"monsterPark/clear");
        cm.playSound(false,"Field.img/Party1/Clear");
               } else {
               cm.sendOk("#fn나눔고딕 Extrabold##r장비 또는 기타 창을 한 칸 이상 비워주세요..#k");
               cm.dispose();
                }
        } else {
	if (cm.canHold(4310129)) {
        cm.gainItem(4310129, 20);
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
	cm.warp(100030301,0);
	cm.showEffect(false,"monsterPark/clear");
        cm.playSound(false,"Field.img/Party1/Clear");
               } else {
               cm.sendOk("#fn나눔고딕 Extrabold##r기타 창을 한 칸 이상 비워주세요..#k");
               cm.dispose();
                }
        }
        cm.dispose();  
    }
}