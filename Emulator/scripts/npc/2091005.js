var itemcode = Array(0, 0, 2022857);

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("#fn나눔고딕 EXtrabold# 여기까지 무사히 잘왔다니 놀랍네. 하지만 앞으로는 쉽지 않을걸? 어때 계속 도전해 보겠어?\r\n#r[현재까지 경과 시간 : " + cm.getPlayer().MulungTimeString(cm.c.getPlayer().MulungTime()) + " ]#k#b\r\n#L1# 회복, 버프 효과를 받고 싶어.\r\n#L2# 계속 도전해볼게.\r\n#L3# 밖으로 나가겠어#k");
        } else if (status == 1) {
            if (selection == 1) {
                //cm.sendUITalk("#0# HP 50% 회복 #1# HP 100% 회복 #2# MaxHP + 10000 (지속시간 : 10분) #3# 공격력/마력 + 30 (지속시간 : 10분) #4# 공격력/마력 + 60 (지속시간 : 10분) #5# 물리/마법방어력 + 2500 (지속시간 : 10분) #6# 물리/마법방어력 + 4000 (지속시간 : 10분) #7# 명중치/회피치 + 2000 (지속시간 : 10분) #8# 이동속도/점프력 MAX (지속시간 : 10분) #9# 공격속도 +1 (지속시간 : 10분)");
            } else if (selection == 2) {
	  if (cm.isMulung(cm.getPlayer().getMapId())) {
	      cm.changeMap(cm.c.getPlayer().getMapId() + 100);
                    cm.c.getPlayer().getMap().mulungStageStart(cm.c.getPlayer());
                    cm.dispose();
	  } else {	      
	      cm.dispose();
	  }
            } else if (selection == 3) {
                cm.changeMap(925020001);
                cm.dispose();
            }
        } else if (status == 2) {
            cm.sendYesNo("#i" + itemcode[selection] + "# #t" + itemcode[selection] + "#을 사용하겠어? 하나의 휴식 스테이지마다 한 번씩 밖에 선택할 수 없으니 신중하게 결정하라구!");
        } else if (status == 3) {
            cm.dispose();
        }
    }
}