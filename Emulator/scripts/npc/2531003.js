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
        if(!cm.haveItem(4032743,1)){
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r듀나미스 ::#k 광산을 올라 오느라 수고했네..");
        } else {
        cm.sendOk ("#fn나눔고딕 Extrabold#자네는.. 이미 나에게 #b카드키#k 를 받은 것 같군!..");
        cm.dispose();
        }
    } else if (status == 1) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 아닙니다.. 별로 힘들지 않았습니다.\r\n아직 #r검은 마녀#k 는 멀리가지 못했겠지요?",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n#r듀나미스 ::#k 안그래도 방금 둘어온 소식에 의하면\r\n#r검은 마녀#k 가 지금 에레브로 향하고 있다는 소식이 들왔네..");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 으흠... 벌써.. 거기까지나..!\r\n어쩌면 제가 좀 늦겠는걸요?..",2);
    } else if (status == 4) {
	cm.sendNextPrev("#fn나눔고딕 Extrabold##r듀나미스 ::#k 생각보다 그렇게 늦지 않았으니..\r\n안심하고 서서히 쫓아가게나!..\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i4032743# #b#z4032743##k");
    } else if (status == 5) {
	if (cm.canHold(4032743)) {
        cm.gainItem(4032743, 1);
        cm.sendOk ("#fn나눔고딕 Extrabold#이 #b카드키#k 를 가지고.. 어서 왼쪽 승강기를 탑승하게나!..");
        cm.dispose();
        } else {
        cm.sendOk("#fn나눔고딕 Extrabold##r기타 창을 한 칸 이상 비워주게나..#k");
        cm.dispose();
        }
        cm.dispose();
    }
}