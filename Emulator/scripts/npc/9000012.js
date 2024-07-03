/*
위 스크립트의 저작권은 FoxDevelopTeam 팀장 Fox에게 있습니다.
문의 : rinus_alt / fox_devel@nate.com / opharks (skype)
*/

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
	var chat = "반갑다. #b에이플러스#k 컨텐츠 담당 #r요원B#k라고 한다.\r\n";
        chat += "#g#L3##i4001861# 사다리 타기#l";
		chat += "#L4##i2470000# 강화 시스템#l";
		chat += "#L12##i4001101# 인내 보스#l";
        chat += "#L13##i2430029# 대박 뽑기#l";
		chat += "\r\n#L11##i1012076# #d[N]#g 마피아 게임#l";
		//chat += "#L20##d[테스트]#g 보스 레이드#l";
        chat += "#e#r#L14# 대화 끝내기#l";
	cm.sendSpirit(chat,true,0);
    } else if (status == 1) {
     var s = selection;
        cm.dispose();
	if (selection == 0) {
		cm.dispose();
		cm.openNpc(9001014);
		}else if  (selection == 3) {
          cm.dispose();
          cm.openNpc(1002004);
        } else if (selection == 4) {
          cm.dispose();
          cm.openNpc(9300009);
		} else if (selection == 11) {
		  cm.warp(310000004);
		} else if (selection == 12) {
		  cm.dispose();
		  cm.openNpc (9300010);
		} else if (selection == 13) {
          cm.dispose();
          cm.openNpc(9300014);
		} else if (selection == 14) {
          cm.dispose();
		} else if (selection == 20) {
		  cm.dispose();
		  cm.openNpc(9000208);
		}
    }
}
