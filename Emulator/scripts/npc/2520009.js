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
	if (cm.getPlayer().getLevel() >= 160 && cm.getPlayer().getMapId() == 100030301) {
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n#r키샤 ::#k 안녕하세요.. 반가워요..\r\n차원의 도서관의 #r탈레스#k 님이 당신께 도움을 바라고 있어요..");
        } else {
	cm.sendOk("#fn나눔고딕 Extrabold##r* 플레이 조건#k\r\n\r\n#d- 레벨 160 이상 의 캐릭터\r\n- 퀘스트의 전당 에서 플레이 가능#k",9062004);
	cm.dispose();
        }
    } else if (status == 1) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n#b#h?# ::#k 흠.. 저에게요?.. 무슨일로..?",2);
    } else if (status == 2) {
        cm.sendNext("#fn나눔고딕 Extrabold##r키샤 ::#k 일단은.. #r탈레스#k 님께 여쭤보세요..\r\n지금 바로 이동하시겠어요?\r\n\r\n#d(다음을 누르면 바로 이동합니다.)#k");
    } else if (status == 3) {
        cm.warp(302000000,0);
	cm.getPlayer().dropMessage(-1, "도서관장 탈레스 와 대화하세요.");
	cm.getPlayer().dropMessage(5, "도서관장 탈레스 와 대화하세요.");
        cm.dispose();  
    }
}