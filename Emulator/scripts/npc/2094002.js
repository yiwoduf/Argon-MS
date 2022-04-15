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
                 cm.sendNext("다시 잘 생각해 보고 말을 걸어 주게.");
             }
             cm.dispose();
             return;
         }
         if (mode == 1)
             status++;
         else
             status--;
         if (status == 0) {
	if (cm.getMapId() == 925100700) {
	cm.warp(910002000,0);
	cm.removeAll(4001120);
	cm.removeAll(4001121);
	cm.removeAll(4001122);
	cm.removeAll(4001117);
	cm.dispose();
	} else {
             var main = "무엇을 하겠나?#b\r\n";
	if (cm.getMapId() != 925100000 || cm.getMapId() != 925100700) {
             main += "\r\n#L0#구옹의 이야기를 듣는다.";
}
             main += "\r\n#L1#해적선에서 내린다.";
             cm.sendSimple(main);
}
         } else if (status == 1) {
             if (selection == 0) {
                  if (cm.getMapId() == 925100100) {
                     if (cm.getPlayer().getEventInstance().getProperty("DavyzonePQ_Monster") == 9999) {
                         cm.sendNext("조심하게! 이곳에서는 언제 해적들이 몰려나올지 모르니 말일세. 하지만 그렇다고 이곳을 그냥 지나갈 순 없네. 데비존이 다음 장소로 가는 포탈에 세가지 봉인을 걸어 두었으니 말이지.");
}
                 } else if (cm.getMapId() == 925100400 && cm.getPlayer().getEventInstance().getProperty("DavyzonePQ_Door") == null) {
                    // cm.worldMessage(6,"열쇠를 찾아 해적들이 나올 수 없도록 갑판의 문을 닫아야 합니다.");
                     cm.sendNext("자네들이 해적선에 올라탄 것을 모든 해적이 알게 되었다네. 비번이었던 녀석들까지 지금 몰려나오고 있지. 이대로라면 끝이 없을테니 우선 해적들이 나오는 문을 닫아야 할걸세.");
                 } else {
                     cm.sendNext("대화가 없습니다.");
                     cm.dispose();
                 }

             } else if (selection == 1) {
                 cm.sendYesNo("퀘스트를 중단하고 이 곳에서 나가겠나?");
             }
             rudy = selection;
         } else if (status == 2) {
             if (rudy == 0) {
                 if (cm.getMapId() == 925100100) {
                     cm.sendNextPrev("봉인을 푸는데 필요한 것은 #b해적의 증표#k라네. 해적임을 입증하는 물건이지. 데비존의 봉인 앞에 해적임을 입증하면 봉인은 자연히 풀릴걸세. 그러니 이곳에 있는 해적들을 무찌르고 #b해적의 증표#k를 내게 가져다 주면, 포탈의 봉인을 풀어 보겠네.");
                 } else if (cm.getMapId() == 925100400 && cm.getPlayer().getEventInstance().getProperty("DavyzonePQ_Door") == null) {
		cm.getPlayer().getEventInstance().setProperty("DavyzonePQ_Door","1");
                     cm.sendNextPrev("문을 닫는데 필요한 #b오래된 쇠열쇠#k는 해적들이 가지고 있을걸세. 그들을 물리치고 해적선의 문을 닫게나! 닫으려거든 나에게 부탁하면 된다네.");
                     cm.dispose();
                 }
             } else if (rudy == 1) {
                 cm.getEventInstance().unregisterPlayer(cm.getPlayer());
                 cm.warp(925100700,0);
                 cm.dispose();
             }
         } else if (status == 3) {
             cm.sendNextPrev("이제 곧 해적들이 몰려나올 걸세. 그들을 물리치면 #b증표#k가 나올텐데, 각각 정해진 증표 수를 모으면 자동으로 미션이 완료되니 걱정 마시게.");
         } else if (status == 4) {
	cm.getPlayer().spawn게비알();
             cm.getEventInstance().setProperty("DavyzonePQ_Monster","0");
	cm.getEventInstance().setProperty("Token_1","0"); // 신입 해적증표
	cm.getEventInstance().setProperty("DavyzonePQ_Token","0"); // 증표모으기 시작
             cm.dispose();
         }
     }
 }



