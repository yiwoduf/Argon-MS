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
	if (cm.haveItem(4032335, 1)) {
	var jessica = "#fn나눔고딕 Extrabold#정말 너무.. 너무.. 기뻐용~!!\r\n저의 #b틀니#k 를 결국 찾아주셨군용~!!\r\n저를 도와주셨는데 감히 제가 보상을 안드릴 수 없지용~..!\r\n아..참! #d에코 그린 박스#k 를 열면 #r1 천만 메소#k 가 차감되지만\r\n#b프리미엄 악세서리 주문서#k 를 획득할 수 있어용~!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i2430460# #b#z2430460##k\r\n#i4310129# #b썸머리밋 코인#k #r5 개#k\r\n\r\n#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n#L100##b보상을 받고 퀘스트의 전당 으로 이동하기#k";
        cm.sendSimple(jessica);
    } else if(cm.haveItem(4033012, 1)) {
        cm.sendSimple("#fn나눔고딕 Extrabold#저를.. 도와주신다니.. 정말.. 고마워용~!\r\n대충.. 의심가는 용의자가 이 다섯명 정도 인데..\r\n누가.. 갖고있는지는 저도 도저히 모르겠어용~..\r\n용의자들끼리 제 #b틀니#k 를 서로 옮겨가며.. 숨기고 있나봐용..\r\n꼭.. 제 소중한 특제 #b틀니#k 를 찾아와주세용~!\r\n\r\n#fs14##r* 용의자 HP - 100 억#k#fs12#\r\n#r   (단, 기타 창이 꽉 차있을경우 틀니를 회수하지 못합니다.)#k\r\n\r\n#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n#b#L20#도둑질이 취미인.. 고대 파랑 거북이\r\n#L21#도둑의 달인.. 고대 파랑 슬라임\r\n#L22#생계형 베테랑.. 도둑 블루 플라워 카우\r\n#L23#완벽 범죄 마스터.. 오렌지 고대 슬라임\r\n#L24#절도 지명 수배범.. 플라워 골렘");
        } else {
	cm.sendNext("#fn나눔고딕 Extrabold#\r\n#b#h ##k 님 안녕하세용~\r\n당신이 그렇게 강하다고 들었어용~..\r\n소문대로 그게 정말인가용~?");
	}
    } else if (status == 1) {
    if (selection == 20) {
	if (cm.getPlayerCount(326090310) > 0) {
	cm.sendOk("#fn나눔고딕 Extrabold##r이미.. 누군가가 수색중이예요.. 잠시 기다리세용~#k");
	cm.dispose();
	} else {
	cm.GayQuest(1);
	cm.dispose();
	}
    } else if (selection == 21) {
	if (cm.getPlayerCount(326090310) > 0) {
	cm.sendOk("#fn나눔고딕 Extrabold##r이미.. 누군가가 수색중이예요.. 잠시 기다리세용~#k");
	cm.dispose();
	} else {
	cm.GayQuest(2);
	cm.dispose();
	}
    } else if (selection == 22) {
	if (cm.getPlayerCount(326090310) > 0) {
	cm.sendOk("#fn나눔고딕 Extrabold##r이미.. 누군가가 수색중이예요.. 잠시 기다리세용~#k");
	cm.dispose();
	} else {
	cm.GayQuest(3);
	cm.dispose();
	}
    } else if (selection == 23) {
	if (cm.getPlayerCount(326090310) > 0) {
	cm.sendOk("#fn나눔고딕 Extrabold##r이미.. 누군가가 수색중이예요.. 잠시 기다리세용~#k");
	cm.dispose();
	} else {
	cm.GayQuest(4);
	cm.dispose();
	}
    } else if (selection == 24) {
	if (cm.getPlayerCount(326090310) > 0) {
	cm.sendOk("#fn나눔고딕 Extrabold##r이미.. 누군가가 수색중이예요.. 잠시 기다리세용~#k");
	cm.dispose();
	} else {
	cm.GayQuest(5);
	cm.dispose();
	}
    } else if (selection == 100) {
	if (cm.haveItem(4032335, 1)) {
	if (cm.canHold(2430460) && cm.canHold(4310129)) {
        cm.removeAll(4032335);
        cm.removeAll(4033012);
        cm.gainItem(2430460, 1);
        cm.gainItem(4310129, 5);
        cm.warp(100030301,0);
        cm.sendOk("#fn나눔고딕 Extrabold##b우리의 영웅님!! 안녕히! 잘가세용~!!#k\r\n\r\n#d* 에코 그린 상자 를 개봉시 1 천만 메소가 차감 됩니다.\r\n* 에코 그린 상자 를 개봉시 꼭 소비 창을 한 칸 이상 비워두세요.#k");
	cm.showEffect(false,"monsterPark/clear");
        cm.playSound(false,"Field.img/Party1/Clear");
	cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 또는 기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##r틀니가 없는데.. 범인을 잡으신게 맞나요..?..#k");
		    cm.dispose();
                }
    } else {
    cm.sendNextPrevS("#fn나눔고딕 Extrabold#맞아!.. 내가 그렇게나 강하지!!~ #fs15##b음하하!#k#fs12#\r\n\r\n#d(이것들이.. 보기보다 사람 볼 줄 아는구먼..)", 2);
    }
    } else if (status == 2) {
    cm.sendNextPrev("#fn나눔고딕 Extrabold#\r\n정말이지.. #b#h ##k 님은 멋지기도 해용~!!\r\n\r\n이러다가 정말 반해버릴 것 같아용~!\r\n그런 의미에서 #b#h ##k 님.. 부탁 한가지만 할께용~!\r\n\r\n#r#fs15#거부는 없어용~~ Boy♂!#k#fs12#");
    } else if (status == 3) {
    cm.sendNext("#fn나눔고딕 Extrabold#\r\n#fs14#그게 바로! 무엇이냐~!!#fs12#\r\n\r\n제가.. 요즘 나이를 먹어서인지 제 '이'가 빠져용~..ㅠㅅㅠ\r\n그레서 할 수 없이 저번 주에 병원을 갔다 왔지용~!!\r\n그랬더니!!.. 의사 선생님께서 #b틀니#k 를 사라더군용~…");
    } else if (status == 4) {
    cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n그래서 어떻게 되었는데...? #b틀니#k 는 산거야..?\r\n\r\n#d(수상하다.. 새우를 1 톤쯤..은 가뿐히 처먹게 생겨가지고..\r\n혹시 개구라일 수도 있으니 조심해야지...)#k", 2);
    } else if (status == 5) {
    cm.askAcceptDecline("#fn나눔고딕 Extrabold#당연히..!! #d늑대의 이빨#k 로 만든 특제 #b틀니#k 를 샀지용~!\r\n그런데.. 제가 잠든 사이에 어떤 #fs14##r개 가튼#k#fs12# 녀석이\r\n제 소중한 #b틀니#k 를 훔쳐가 버린 것이에용~...\r\n하이간.. 잡히기만 하면 물개밥으로 만들어 버리겠어용~!!\r\n그래서 말인데.. 제 #b틀니#k 를 좀 찾아주시면 안될까용~?!");
    } else if (status == 6) {
           if (cm.canHold(4033012)) {
           cm.sendOkS("#fn나눔고딕 Extrabold##d(일단… 사기는 아닌 것 같으니.. 다시 말을 걸어보자..)#k", 2);
           cm.gainItem(4033012, 1);      
           cm.dispose();
           } else {
           cm.sendOk("#fn나눔고딕 Extrabold##r기타 창에 빈 공간이 없습니다. 한 칸 이상 비워주세요.#k");
           cm.dispose();
           }
    }
}