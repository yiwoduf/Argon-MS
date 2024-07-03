var status = -1;
var etc;
var selFirstJob;
var selFinal;

var r = "#fs11.5##Cgray#(";
var s = ")#fs12#\r\n";

var talk;


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
            cm.sendSimple("Welcom! I am#b Argon Online#k job NPC.\r\n#b#h ##k Let's get started!\r\n#b" + "#L1##kI#r#e AGREE#n#k to terms of use and I want to start the game!#l");
            if (cm.getPlayer().getJob() == 2004) {
                cm.teachSkill(27000106, 5, 5);
                cm.teachSkill(27000207, 5, 5);
                cm.teachSkill(27001201, 20, 20);
                cm.teachSkill(27001100, 20, 20);
            }
            if (cm.getPlayer().getJob() == 2007) {
                cm.teachSkill(25001002, 25, 25);
                cm.teachSkill(25000003, 25, 25);
            }
            if (cm.getPlayer().getJob() == 3001) {
                cm.teachSkill(30010111, 1, 1);
                cm.teachSkill(30010185, 1, 1);
                cm.teachSkill(30010112, 2, 2);
            }
	    if (cm.getPlayer().getJob() == 2005) {
		cm.teachSkill(20051284, 1, 1);
		cm.teachSkill(20050285, 1, 1);
		cm.teachSkill(25001000, 30,30);
	 	cm.teachSkill(25001002, 30, 30);
	    }
	    if (cm.getPlayer().getJob() == 1000) {
		cm.teachSkill(10001251, 1, 1);
		cm.teachSkill(10001252, 1, 1);
		cm.teachSkill(10001253, 1, 1);
		cm.teachSkill(10001254, 1, 1);
		cm.teachSkill(10001255, 1, 1);
	    }
        } else if (status == 1) {
            FirstJob(cm.getPlayer().getJob());
        } else if (status == 2) {
            selFirstJob = selection;
            if (selection < 1000) {
                SecondJob(selection);
            } else if (selection ==  2100) {
				cm.sendYesNo("#fUI/UIWindow5/HofM_Switch/Large/Normal/1/0\r\nDo you want to start the game with this job?\r\n추후 같은 계열 직업군으로 변생이 가능합니다.\r\n\r\n#r⑴ 본 서버의 운영정책을 읽지않아 생기는 모든 불이익은\r\n    '예'를 누름으로서 본인의 책임입니다.\r\n\r\n#b⑵ 정책에 동의하지 않으신다면, 대화창을 닫고 게임을\r\n    종료하시기 바랍니다.");
                etc = 1;
			} else if (selection ==  2200) {
				cm.sendYesNo("#fUI/UIWindow5/HofM_Switch/Large/Normal/4/0\r\nDo you want to start the game with this job?\r\n추후 같은 계열 직업군으로 변생이 가능합니다.\r\n\r\n#r⑴ 본 서버의 운영정책을 읽지않아 생기는 모든 불이익은\r\n    '예'를 누름으로서 본인의 책임입니다.\r\n\r\n#b⑵ 정책에 동의하지 않으신다면, 대화창을 닫고 게임을\r\n    종료하시기 바랍니다.");
                etc = 1;
			} else if (selection ==  2300) {
				cm.sendYesNo("#fUI/UIWindow5/HofM_Switch/Large/Normal/0/0\r\nDo you want to start the game with this job?\r\n추후 같은 계열 직업군으로 변생이 가능합니다.\r\n\r\n#r⑴ 본 서버의 운영정책을 읽지않아 생기는 모든 불이익은\r\n    '예'를 누름으로서 본인의 책임입니다.\r\n\r\n#b⑵ 정책에 동의하지 않으신다면, 대화창을 닫고 게임을\r\n    종료하시기 바랍니다.");
                etc = 1;
			} else if (selection ==  2400) {
				cm.sendYesNo("#fUI/UIWindow5/HofM_Switch/Large/Normal/3/0\r\nDo you want to start the game with this job?\r\n추후 같은 계열 직업군으로 변생이 가능합니다.\r\n\r\n#r⑴ 본 서버의 운영정책을 읽지않아 생기는 모든 불이익은\r\n    '예'를 누름으로서 본인의 책임입니다.\r\n\r\n#b⑵ 정책에 동의하지 않으신다면, 대화창을 닫고 게임을\r\n    종료하시기 바랍니다.");
                etc = 1;
			} else if (selection ==  2500) {
				cm.sendYesNo("#fUI/UIWindow5/HofM_Switch/Large/Normal/2/0\r\nDo you want to start the game with this job?\r\n추후 같은 계열 직업군으로 변생이 가능합니다.\r\n\r\n#r⑴ 본 서버의 운영정책을 읽지않아 생기는 모든 불이익은\r\n    '예'를 누름으로서 본인의 책임입니다.\r\n\r\n#b⑵ 정책에 동의하지 않으신다면, 대화창을 닫고 게임을\r\n    종료하시기 바랍니다.");
                etc = 1;
			} else if (selection ==  2600) {
				cm.sendYesNo("#fUI/UIWindow5/HofM_Switch/Large/Normal/5/0\r\nDo you want to start the game with this job?\r\n추후 같은 계열 직업군으로 변생이 가능합니다.\r\n\r\n#r⑴ 본 서버의 운영정책을 읽지않아 생기는 모든 불이익은\r\n    '예'를 누름으로서 본인의 책임입니다.\r\n\r\n#b⑵ 정책에 동의하지 않으신다면, 대화창을 닫고 게임을\r\n    종료하시기 바랍니다.");
                etc = 1;
			} else {
                cm.sendYesNo("Do you want to start the game with this job?\r\n추후 같은 계열 직업군으로 변생이 가능합니다.\r\n\r\n#r⑴ 본 서버의 운영정책을 읽지않아 생기는 모든 불이익은\r\n    '예'를 누름으로서 본인의 책임입니다.\r\n\r\n#b⑵ 정책에 동의하지 않으신다면, 대화창을 닫고 게임을\r\n    종료하시기 바랍니다.");
                etc = 1;
            }

        } else if (status == 3) {
            selFinal = selection;
            switch (etc) {
                case 1:
                    for (var i = cm.getPlayer().getLevel(); i < 10; i++) {
                        cm.getPlayer().levelUp();
                    }
                    if (cm.getPlayer().getExp() < 0)
                        cm.getPlayer().gainExp(-cm.getPlayer().getExp(), false, false, true);
                    
                    AutoJob();
		    cm.sendGuide();

        	    if (!cm.isCheckMeso()) {
                        cm.gainMeso(100000000);
                    }
                    cm.setCheckMeso();
	 	    cm.gainItemAllStat(1005001, 1, 500, 50);
		    cm.gainItemAllStat(1053215, 1, 500, 50);
                    cm.getPlayer().changeJob(selFirstJob);
	  	    cm.resetStats(4, 4, 4, 4);
		    cm.warp(100000000, 0);
	    	    if (cm.getPlayer().getJob() == 3500) {
			cm.teachSkill(30001068, 1, 1);
	    	    }
                    cm.dispose();
		    cm.openNpc(9010031);
                    break;
                default:
                    cm.sendYesNo("Do you want to start the game with this job? 해당 직업군은 메소 소모를 통한 자유전직을 통해 다른 클래스의 다른 직업으로 바꿀 수 있습니다.\r\n\r\n#r⑴ 이용 약관의 구독 여부와 관계없이 해당 창에서 예 버튼을 누르시면 게임 이용 약관에 동의한 것으로 간주됩니다.\r\n\r\n#b⑵ 이에 대해 동의하지 않으신다면, 대화를 종료한 뒤 ESC를 눌러 게임을 종료하시면 됩니다.");
            }
        } else if (status == 4) {
	    if (!cm.isCheckMeso()) {
                cm.gainMeso(100000000);
            }
            cm.setCheckMeso();
	    cm.gainItemAllStat(1005001, 1, 500, 50);
	    cm.gainItemAllStat(1053215, 1, 500, 50);
            for (var i = cm.getPlayer().getLevel(); i < 10; i++) {
                cm.getPlayer().levelUp();
            }
            if (cm.getPlayer().getExp() < 0)
                cm.getPlayer().gainExp(-cm.getPlayer().getExp(), false, false, true);
	    if (selFinal == 532) {
                cm.getPlayer().changeJob(501);
            } else if (selFinal == 434) {
                cm.getPlayer().changeJob(430);
                for (var i = cm.getPlayer().getLevel(); i < 20; i++) {
                    cm.getPlayer().levelUp();
                }
                if (cm.getPlayer().getExp() < 0)
                    cm.getPlayer().gainExp(-cm.getPlayer().getExp(), false, false, true);
            } else {
                cm.getPlayer().changeJob(selFirstJob);
            }
	    cm.resetStats(4, 4, 4, 4);
            AdvAutoJob();
	    cm.sendGuide();
            if (cm.getPlayer().getJob() >= 1000 && cm.getPlayer().getJob() <= 1500) {
                cm.teachSkill(10000252, 1, 1);
                cm.teachSkill(10001253, 1, 1);
                cm.teachSkill(10001254, 1, 1);
            }
	    cm.warp(100000000, 0);
	    if (cm.getPlayer().getJob() == 3500) {
		cm.teachSkill(30001068, 1, 1);
	    }
	    cm.dispose();
	    cm.openNpc(9010031);
        }
    }
}

function FirstJob(i) {

    talk = "#fs12##b#h ##k Which job do you want to start the game with?\r\n";
    switch (i) {
        case 0:
            talk += "#L100##b전사　  " + r + "→ 히어로, 다크나이트" + s + "";
            talk += "#L200##b마법사  " + r + "→ 아크메이지(불, 독), 아크메이지(썬, 콜), 비숍" + s + "";
            talk += "#L300##b궁수　  " + r + "→ 보우마스터, 신궁" + s + "";
            talk += "#L400##b도적　  " + r + "→ 나이트로드, 섀도어, 듀얼블레이더" + s + "";
            talk += "#L500##b해적　  " + r + "→ 바이퍼, 캡틴, 캐논슈터" + s + "";
            break;

        case 1000:
            talk += "#L1100##b소울마스터　  " + r + "→ 전사 계열" + s + "";
            talk += "#L1200##b플레임위자드  " + r + "→ 마법사 계열" + s + "";
            talk += "#L1300##b윈드브레이커  " + r + "→ 궁수 계열" + s + "";
            talk += "#L1400##b나이트워커　  " + r + "→ 도적 계열" + s + "";
            talk += "#L1500##b스트라이커　  " + r + "→ 해적 계열" + s + "";
            break;


        case 2000:
            talk += "#L2100##fUI/UIWindow5/HofM_Switch/Large/Normal/1/0";
            break;
        case 2001:
            talk += "#L2200##fUI/UIWindow5/HofM_Switch/Large/Normal/4/0";
            break;
        case 2002:
            talk += "#L2300##fUI/UIWindow5/HofM_Switch/Large/Normal/0/0";
            break;
        case 2003:
            talk += "#L2400##fUI/UIWindow5/HofM_Switch/Large/Normal/2/0";
            break;
        case 2005:
            talk += "#L2500##fUI/UIWindow5/HofM_Switch/Large/Normal/5/0";
            break;
        case 2004:
            talk += "#L2700##fUI/UIWindow5/HofM_Switch/Large/Normal/3/0";
            break;

        case 3000:
            talk += "#L3200##b배틀메이지  " + r + "→ 마법사 계열" + s + ""
            talk += "#L3300##b와일드헌터  " + r + "→ 궁수 계열" + s + "";
            talk += "#L3500##b메카닉　　  " + r + "→ 해적 계열" + s + "";
            talk += "#L3700##b블래스터　  " + r + "→ 전사 계열" + s + "";
            break;

        case 3001:
            talk += "#L3100##b데몬슬레이어  " + r + "→ 공격력 계열" + s + "";
            talk += "#L3101##b데몬어벤져　  " + r + "→ MaxHP 계열" + s + "";
            break;

        case 3002:
            talk += "#L3600##b제논";
            break;


        case 5000:
            talk += "#L5000#미하일은 변생퀘스트로 가능합니다.";
            break;
        case 6000:
            talk += "#L6100##b카이저";
            break;
        case 6001:
            talk += "#L6500##b엔젤릭버스터";
            break;
        case 14000:
            talk += "#L14200##b키네시스";
            break;
	case 10112:
	    talk += "#L10112##b제로";
	    break;
    }
    cm.sendSimple(talk);
}


function SecondJob(i) {
    etc = 0;
    var v1 = i == 100 ? "전사" : i == 200 ? "마법사" : i == 300 ? "궁수" : i == 400 ? "도적" : "해적"
    var v2  = "#e" + v1 + " 직업#n을 고르셨습니다. 이제 #h #님의 #b최종 전직을 골라주세요.#k 전직 레벨인 30, 60, 100에 달성하면 #r자동으로 전직#k이 됩니다.\r\n";
    switch (i) {
        case 100:
            v2 += "#L112##b히어로　　  " + r + "파이터 → 크루세이더 → 히어로" + s + "";
            v2 += "#L132##b다크나이트  " + r + "스피어맨 → 버서커 → 다크나이트" + s + "";
            break;

        case 200:
            v2 += "#L212##b아크메이지(불, 독)  " + r + "위자드 → 메이지 → 아크메이지" + s + "";
            v2 += "#L222##b아크메이지(썬, 콜)  " + r + "위자드 → 메이지 → 아크메이지" + s + "";
            v2 += "#L232##b비숍#e　　#n　　　　　" + r + "클레릭 → 프리스트 → 비숍" + s + "";
            break;

        case 300:
            v2 += "#L312##b보우마스터  " + r + "헌터 → 레인저 → 보우마스터" + s + "";
            v2 += "#L322##b신궁　　　  " + r + "사수 → 저격수 → 신궁" + s + "";
            break;

        case 400:
            v2 += "#L412##b나이트로드　  " + r + "어쌔신 → 허밋 → 나이트로드" + s + "";
            v2 += "#L422##b섀도어　　　  " + r + "시프 → 시프마스터 → 섀도어" + s + "";
            v2 += "#L434##b듀얼블레이더  " + r + "듀어러 → 슬래셔 → 듀얼블레이더" + s + "";
            break;

        case 500:
            v2 += "#L512##b바이퍼　　  " + r + "인파이터 → 버커니어 → 바이퍼" + s + "";
            v2 += "#L522##b캡틴　　　  " + r + "건슬링거 → 발키리 → 캡틴" + s + "";
            v2 += "#L532##b캐논마스터  " + r + "캐논슈터 → 캐논블래스터 → 캐논마스터" + s + "";
            break;
    }

    cm.sendSimple(v2);

}


function AutoJob() {
    switch (selFirstJob) {
        case 570:
            cm.getPlayer().setKeyValue("AutoJob", "571");
            break;
        case 1100:
            cm.getPlayer().setKeyValue("AutoJob", "1110");
            break;
        case 1200:
            cm.getPlayer().setKeyValue("AutoJob", "1210");
            break;
        case 1300:
            cm.getPlayer().setKeyValue("AutoJob", "1310");
            break;
        case 1400:
            cm.getPlayer().setKeyValue("AutoJob", "1410");
            break;
        case 1500:
            cm.getPlayer().setKeyValue("AutoJob", "1510");
            break;
        case 2100:
            cm.getPlayer().setKeyValue("AutoJob", "2110");
            break;
        case 2200:
            cm.getPlayer().setKeyValue("AutoJob", "2210");
            break;
        case 2300:
            cm.getPlayer().setKeyValue("AutoJob", "2310");
            break;
        case 2400:
            cm.getPlayer().setKeyValue("AutoJob", "2410");
            break;
        case 2500:
            cm.getPlayer().setKeyValue("AutoJob", "2510");
            break;
        case 2700:
            cm.getPlayer().setKeyValue("AutoJob", "2710");
            break;
        case 3100:
            cm.getPlayer().setKeyValue("AutoJob", "3110");
            break;
        case 3101:
            cm.getPlayer().setKeyValue("AutoJob", "3120");
            break;
        case 3200:
            cm.getPlayer().setKeyValue("AutoJob", "3210");
            break;
        case 3300:
            cm.getPlayer().setKeyValue("AutoJob", "3310");
            break;
        case 3500:
            cm.getPlayer().setKeyValue("AutoJob", "3510");
            break;
        case 3600:
            cm.getPlayer().setKeyValue("AutoJob", "3610");
            break;
        case 3700:
            cm.getPlayer().setKeyValue("AutoJob", "3710");
            break;
        case 4100:
            cm.getPlayer().setKeyValue("AutoJob", "4110");
            break;
        case 4200:
            cm.getPlayer().setKeyValue("AutoJob", "4210");
            break;
        case 6100:
            cm.getPlayer().setKeyValue("AutoJob", "6110");
            break;
        case 6500:
            cm.getPlayer().setKeyValue("AutoJob", "6510");
            break;
        case 14200:
            cm.getPlayer().setKeyValue("AutoJob", "14200");
            break;

    }
}


function AdvAutoJob() {
    switch (selFinal) {
        case 112:
            cm.getPlayer().setKeyValue("AutoJob", "110");
            break;
        case 122:
            cm.getPlayer().setKeyValue("AutoJob", "120");
            break;
        case 132:
            cm.getPlayer().setKeyValue("AutoJob", "130");
            break;
        case 212:
            cm.getPlayer().setKeyValue("AutoJob", "210");
            break;
        case 222:
            cm.getPlayer().setKeyValue("AutoJob", "220");
            break;
        case 232:
            cm.getPlayer().setKeyValue("AutoJob", "230");
            break;
        case 312:
            cm.getPlayer().setKeyValue("AutoJob", "310");
            break;
        case 322:
            cm.getPlayer().setKeyValue("AutoJob", "320");
            break;
        case 412:
            cm.getPlayer().setKeyValue("AutoJob", "410");
            break;
        case 422:
            cm.getPlayer().setKeyValue("AutoJob", "420");
            break;
        case 434:
            cm.getPlayer().setKeyValue("AutoJob", "430");
            break;
        case 512:
            cm.getPlayer().setKeyValue("AutoJob", "510");
            break;
        case 522:
            cm.getPlayer().setKeyValue("AutoJob", "520");
            break;
        case 532:
            cm.getPlayer().setKeyValue("AutoJob", "530");
            break;
    }
}