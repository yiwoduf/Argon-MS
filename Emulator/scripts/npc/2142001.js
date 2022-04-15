importPackage(Packages.constants);

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
    if (status == 10 && mode == 0) {
	cm.sendOk("그러면 저 마을에는 보내줄수 없어 다시 잘 생각해봐.");
	cm.dispose();
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
    if (cm.getPlayer().getMapId() == 4000041) {
    if (cm.getQuestStatus(9) == 1) {
       	cm.sendOk("오..자네구먼 그 낙타가 말한 자가.. 기다렸다고..\r\n#r오랜만에 보는 모험가#k로군 반갑네 \r\n나는 이 마을의 장로 #b알렉스#k라고 한다네\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0##k  840 exp");
	cm.gainExp(840);
	cm.playerMessage(5, "[알림] 장로 알렉스에게 말을 다시 걸어서 퀘스트를 진행 하세요.");
	cm.forceCompleteQuest(9);
	cm.dispose();
	} else {
	cm.sendNext("말세야 말세.. 어디서 용사님이라도 안오시려나 후우..\r\n\r\n  #fUI/UIWindow2.img/UtilDlgEx/list0#\r\n#e#r#L1#[필수]#k#n (Lv.9) 세계의 진실");
	}
    } else {
	cm.sendOk("말세야.. 말세..");
	cm.dispose();
    }
    } else if (status ==1) {
	cm.sendNext("정말 반갑구먼, #b#h ##k 우리 마을에 온 것을 환영하네! 자네는 어디서 온 것인가?");
    } else if (status ==2) {
	cm.sendNextPrevS("그동안 있었던 일들을 전부 설명드렸다.",2);
    } else if (status ==3) {
	cm.sendNext("흠.. 그런 일이 있었던 거로군 역시 #b내가 아는것#k과 똑같구먼");
    } else if (status ==4) {
      	cm.sendNextPrevS("응? 그런 일이 있으셨던 걸 알고 계셨군요? \r\n#r몬스터들이 이상#k해진 것들도 다 그것들과 #e관련#n이 있을까요?",2);
    } else if (status ==5) {
       	cm.sendNextPrev("그럼, 내가 아는것을 얘기 해주겟네 흐음.. 지금으로부터 1주일 전이였을 거야 그날은 다른 날보다 #b유난히 춥고#k #e하늘에도 구름#n이 잔뜩 낀 상태였지");
    } else if (status ==6) {
       	cm.sendNextPrev("그러다 마른하늘에서 불현듯 #e엄청난 소리#n와 함께 #b강력한 천둥#k이 쳤다네 그로 인해 #b"+ServerConstants.serverName+"#k 에는 강력한 균열이 생겨버렸고 현재는 그 균열이 다른 월드로 이어져 있는 것 같다네");
    } else if (status ==7) {
       	cm.sendNextPrevS("흐음.. 그렇다면 그 #r강력한 천둥#k은 누가 한 짓인지 혹시 아시나요?",2);
    } else if (status ==8) {
       cm.sendNextPrev("내 생각엔 분명 #fs15##r#e아스타로드#n#k#fs12#를 우두머리로한 그의 추종 세력들 짓이야.. #d국왕#k 을 없애고 #b"+ServerConstants.serverName+"#k 을 자신들 것으로 만들기 위한 계략의 첫 걸음인거지..");
    } else if (status ==9) {
       cm.sendNextPrev("아무래도 영웅이 필요한데 현재는 #r영웅#k이 있질 않다네, 하지만 #b#h ##k! 자네가 바로 #b"+ServerConstants.serverName+"#k 을 구해줄 영웅 이라고 난 굳게 믿고 있지!");
    } else if (status ==10) {
       cm.sendNextPrevS("하지만 저는.. #b레벨#k도 낮고 #r힘#k도 없는걸요..?");
    } else if (status ==11) {
       cm.sendYesNo("레벨이야 지금부터 열심히 #e수련#n을 해서 #r힘#k을 기르면 된다네, 아직 시간적 여유가 있어\r\n#b#h ##k, 자네가 힘을 키우고 있으면 내가 때가 되면 연락 하겠네\r\n#fs15##fn나눔고딕 Extrabold#자, #h #여  모험을 시작 해보겠는가?");
    } else if (status ==12) {
       cm.warp(0,0);
       cm.gainExp(1242);
       cm.playerMessage(-1,"[알림] 슈가에게 말을 걸어 계속 진행 하세요.");
       cm.playerMessage(5,"[알림] 슈가에게 말을 걸어 계속 진행 하세요.");
    }
}
