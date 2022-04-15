
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
        var chat = "#e<파티퀘스트 : 여신의 흔적>#n\r\n안녕? 난 요정 윙키라고 해. 여신의 탑을 모험하고 싶으면 나에게 이야기 하라고~ 참, 파티에 전사, 마법사, 도적, 궁수, 해적이 각각 1명 이상 있으면 윙키의 축복을 걸어 줄게.\r\n\r\n";
	chat += "#b";
	chat += "#L1#입장을 신청한다.\r\n";
	chat += "#L2#여신의 탑에 대해 묻는다.\r\n";
	chat += "#L3#윙키에게 먹을 것을 준다.\r\n";
	chat += "#L4#여신의 깃털을 다른 아이템과 바꾼다.\r\n";
	chat += "#L5#함께 할 파티원을 찾는다.\r\n";
	chat += "#L6#오늘의 남은 도전 횟수를 확인한다.\r\n";
	cm.sendSimple(chat);
	} else if (status == 1) {
	if (selection == 0) {
	      if (cm.getParty() != null) {
                     if (cm.isLeader() == true) {
                         if (cm.getParty().getMembers().size() >= 3) {
                             if (cm.checkLevel(70,250)) {
                                 if (cm.allMembersHere() == true) {
                                         var em = cm.getEventManager("PartyQuest");
				var eim = em.readyInstance();
                                         eim.setProperty("Global_StartMap","920010400");
                                         eim.setProperty("Global_ExitMap","920011200");
                                         eim.startEventTimer(240000);
                                         eim.registerParty(cm.getParty(),cm.getMap()); 
                                         cm.getEventInstance().setProperty("DavyzonePQ_Gate","0");
                                         cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(925100000).respawn(false, 0);
                                         cm.dispose();
                                 } else {
                                     cm.sendYesNo("자네가 속한 파티의 파티원이 3명이상이 아니라서 퀘스트를 할 수 없네. 3명이상으로 맞춰 주게. 파티원을 모으려면 파티 찾기를 이용해 보는건 어떤가?");
                                 }
                             } else {
                                 cm.sendNext("대화가 없습니다.");
                                 cm.dispose();
                             }
                         } else {
                             cm.sendYesNo("자네가 속한 파티의 파티원이 3명이상이 아니라서 퀘스트를 할 수 없네. 3명이상으로 맞춰 주게. 파티원을 모으려면 파티 찾기를 이용해 보는건 어떤가?");
                         }
                     } else {
                         cm.sendNext("자네들의 대표가 말을 걸어 주게나.");
                         cm.dispose();
                     }
                 } else {
                     cm.sendNext("자네들의 대표가 말을 걸어 주게나.");
                     cm.dispose();
         }
    }
}
