 importPackage(java.util);
 importPackage(java.lang);


 function start() {
     status = -1;
     action(1, 0, 0);
 }

 

 function action(mode, type, selection) {
     if (mode == -1) {
         cm.dispose();
     } else {
         if (mode == 0) {
             if (status == 1) {
                 cm.sendNext("대화가 없습니다.");
             }
             cm.dispose();
             return;
         }
         if (mode == 1)
             status++;
         else
             status--;
         if (status == 0) {
             var chat = "#e<파티퀘스트 : 해적 데비존>#n\r\n\r\n무엇을 원하는건가?#b\r\n";
             chat += "\r\n#L0#파티퀘스트를 하고 싶어요.";
             chat += "\r\n#L1#함께 할 파티원을 찾고 싶어요.";
             chat += "\r\n#L2#설명을 듣고 싶어요.";
             chat += "\r\n#L3#데비존의 모자를 받고 싶어요.";
             chat += "\r\n#L4#오늘의 남은 도전 횟수를 알고 싶어요.";
             cm.sendSimple(chat);
         } else if (status == 1) {
             if (selection == 0) {
                 if (cm.getParty() != null) {
                     if (cm.isLeader() == true) {
                         if (cm.getParty().getMembers().size() >= 0) {
                             if (cm.checkLevel(100,250)) {
                                 if (cm.allMembersHere() == true) {
                                  /*   if (cm.getDayKeyParty("7") != 10) {
                                         cm.setDayKeyParty("7",(cm.getDayKey("7") + 1) + ""); */
                                         var em = cm.getEventManager("PartyQuest");
				var eim = em.readyInstance();
                                         eim.setProperty("Global_StartMap","925100000");
                                         eim.setProperty("Global_ExitMap","925100700");
                                         eim.startEventTimer(240000);
                                         eim.registerParty(cm.getParty(),cm.getMap()); 
                                         cm.setKeyValueParty("DavyzonePQ_Gift","0");
                                         cm.setKeyValueParty("DavyzonePQ_KillMonster","0");
                                         cm.getEventInstance().setProperty("DavyzonePQ_Gate","0");
                                         cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(925100000).respawn(false, 0);
                                         cm.killAllMonsters(925100000);
			/*	for (var i = 100015; i < 100029; i++) {
				cm.getPlayer().getMap().getReactorByOid(i).hitReactor(cm.getClient());
			} */
                                         cm.dispose();
                              /*       } else {
                                         cm.sendNext("대화가 없습니다.");
                                         cm.dispose();
                                     } */
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
             } else if (selection == 1) {
                 cm.getPlayer().dropMessage(5,"파티찾기(단축키 O)를 이용하면 언제 어디서든 원하는 파티를 찾을 수 있습니다.");
                 cm.dispose();
             } else if (selection == 2) {
                 var notice = "도라지들이 사는 #b백초마을#k에 #r해적 데비존#k이 습격해왔다네. 도라지들의 왕인 #b우양#k님이 납치되셨어. 동료들과 해적선에 침투해 데비존을 몰아내주시오. 부탁하네";
                 notice += "\r\n#e- 레벨#n : 100레벨 이상 #r( 추천레벨 : 100 ~ 129 )#k";
                 notice += "\r\n#e- 참가인원#n : 3 ~ 6명";
                 notice += "\r\n#e- 최종 보장#n : #i1003856# #b흔한 데비존의 모자#k";
                 cm.sendNext(notice);
                 cm.dispose();
             } else if (selection == 3) {
                 var hat = "#b데비존#k을 물리치고 #b우양#k님을 구해줘서 정말 고맙네. 답례로 모자 조각을 내게 가져오면 #b데비존의 모자#k로 만들어주지. 어떤 모자를 원하는가?\r\n";
                 hat += "\r\n#L0##i1003856# #b흔한 데비존의 모자#k\r\n#r(데비존의 모자 조각 100개 필요)#k";
                 hat += "\r\n#L1##i1003857# #b진부한 데비존의 모자#k\r\n#r(흔한 데비존의 모자 1개, 데비존의 모자 조각 200개 필요)#k";
                 hat += "\r\n#L2##i1003858# #b탐욕의 데비존의 모자#k\r\n#r(진부한 데비존의 모자 1개, 데비존의 모자 조각 1000개 필요)#k";
                 cm.sendSimple(hat);
             } else if (selection == 4) {
	var ten = 10;
	var total = ten - cm.getDayKey("7");
                // cm.sendOk("오늘 남은 도전 횟수는 " + total + "회일세.");
	cm.sendOk("테스트 기간 전까지는 무제한 입니다.");
                 cm.dispose();
             }
         } else if (status == 2) {
             if (selection == 0) {
                 cm.sendNext("데비존의 모자를 만들겠는가? 모자 조각은 충분히 가져왔겠지?");
             } else if (selection == 1) {
                 cm.sendNext("가지고 있는 #b흔한 데비존의 모자#k를 좀 더 강화하겠나? 강화시, 잠재 옵션이 다시 초기화 되는데, 상관없겠지?");
             } else if (selection == 2) {
                 cm.sendNext("가지고 있는 #b진부한 데비존의 모자#k를 좀 더 강화하겠나? 강화시, 잠재 옵션이 다시 초기화 되는데, 상관없겠지?");
             }
             rudy = selection;
         } else if (status == 3) {
             if (rudy == 0) {
                 if (cm.haveItem(4001455,100)) {
		cm.gainItem(4001455,-100);
		cm.gainItem(1003856,1);
	cm.sendOk("교환이 완료되었네.");
	cm.dispose();
                 } else {
                     cm.sendNextPrev("으음? 그걸로는 데비존의 모자로 만들 수가 없네. 데비존의 모자를 원한다면 모자 조각 100개가 필요하네.");
                     cm.dispose();
                 }
             } else if (rudy == 1) {
                 if (cm.haveItem(4001455,200) && cm.haveItem(1003856,1)) {
		cm.gainItem(1003856,-1);
		cm.gainItem(4001455,-200);
		cm.gainItem(1003857,1);
	cm.sendOk("교환이 완료되었네.");
	cm.dispose();
                 } else {
                     cm.sendNextPrev("으음? 그걸로는 데비존의 모자를 강화할 수 없네. 데비존의 모자를 강화하길 원한다면 모자 조각 200개와 #i1003856# 흔한 데비존의 모자 1개가 필요하다네.");
                     cm.dispose();
                 }
             } else if (rudy == 2) {
                 if (cm.haveItem(4001455,1000) && cm.haveItem(1003857,1)) {
		cm.gainItem(4001455,-1000);
		cm.gainItem(1003857,-1);
		cm.gainItem(1003858,1);
	cm.sendOk("교환이 완료되었네.");
	cm.dispose();
             } else {
                     cm.sendNextPrev("으음? 그걸로는 데비존의 모자를 강화할 수 없네. 데비존의 모자를 강화하길 원한다면 모자 조각 1000개와 #i1003857# 진부한 데비존의 모자 1개가 필요하다네.");
                     cm.dispose();
                 }
             }
         }
     }
 }



