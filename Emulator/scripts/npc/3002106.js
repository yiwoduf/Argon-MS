var status = -1;
var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
var time = "#fUI/UIToolTip/Item/Equip/Star/Star#"

importPackage(Packages.constants);

function start() { status = -1; action(1, 0, 0); }

function action(모, 타, 셀) {
	if (모 == -1) { cm.dispose(); } else {
        if (모 == 0)  { cm.dispose(); return; }
        if (모 == 1)  status++; else status--;

	if (status == 0) {
	////cm.스킬마스터();
	cm.sendSimple("                #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 직업선택 "+별+"\r\n#fs10##Cgray#                                    당신의 직업을 선택해주세요.\r\n#k#fs12#\r\n#r▶ "+ServerConstants.serverName+"#k 에 오신 것을 환영합니다.\r\n#b▶ #h ##k 님의 직업을 설정해주세요. \r\n#b"
	+ "#L1##r게임을 시작하겠습니다.#l");
		if(cm.getPlayer().getJob() == 2004) {
		cm.teachSkill(27000106, 5, 5);
		cm.teachSkill(27000207, 5, 5);
		cm.teachSkill(27001201, 20, 20);
		cm.teachSkill(27001100, 20, 20);
		}

		if(cm.getPlayer().getJob() == 2003) {
		cm.teachSkill(20031207, 1, 1);
		}

		if(cm.getPlayer().getJob() == 2007) {
		cm.teachSkill(25001002, 25, 25);
		cm.teachSkill(25000003, 25, 25);
		}


		if(cm.getPlayer().getJob() == 3001) {
		cm.teachSkill(30010111, 1, 1);
		cm.teachSkill(30010185, 1, 1);
		cm.teachSkill(30010112, 2, 2);
		}

	} else if (status == 1) {

	일차(cm.getPlayer().getJob());
	}

	else if (status == 2) {
	일차전직 = 셀;
		if(셀 < 1000) { 이차(셀); } else {
		cm.sendYesNo("#fn나눔고딕 Extrabold#해당 직업으로 게임을 시작하시겠습니까? 한 번 직업을 선택하시면 더 이상 직업을 바꿀 수 없습니다. \r\n\r\n#r⑴ 이용 약관의 구독 여부와 관계없이 해당 창에서 예 버튼을 누르시면 게임 이용 약관에 동의한 것으로 간주됩니다.\r\n\r\n#b⑵ 이에 대해 동의하지 않으신다면, 대화를 종료한 뒤 ESC를 눌러 게임을 종료하시면 됩니다.");
		기타 = 1;
		}
//cm.giveAllStatItemwatk(1142282,2000,200);
	} else if (status == 3) {
	파이널  = 셀;
		switch(기타) {
		case 1:
		for (var i = cm.getPlayer().getLevel(); i < 10; i++) { cm.gainExp(Packages.constants.GameConstants.getExpNeededForLevel(i)); }
		cm.dispose(); cm.warp(410000000, 0); cm.gainMeso(5000000); cm.giveAllStatItemwatk(1142282,300,50); 자동전직(); cm.getPlayer().changeJob(일차전직);/*cm.스킬마스터();*/ 

		break;

		default:
		cm.sendYesNo("#fn나눔고딕 Extrabold#해당 직업으로 게임을 시작하시겠습니까? 해당 직업군은 메소 소모를 통한 자유전직을 통해 다른 클래스의 다른 직업으로 바꿀 수 있습니다.\r\n\r\n#r⑴ 이용 약관의 구독 여부와 관계없이 해당 창에서 예 버튼을 누르시면 게임 이용 약관에 동의한 것으로 간주됩니다.\r\n\r\n#b⑵ 이에 대해 동의하지 않으신다면, 대화를 종료한 뒤 ESC를 눌러 게임을 종료하시면 됩니다.");
		}

	} else if (status == 4) {
		for (var i = cm.getPlayer().getLevel(); i < 10; i++) { cm.gainExp(Packages.constants.GameConstants.getExpNeededForLevel(i)); }
		cm.dispose(); cm.dispose(); cm.warp(410000000, 0); cm.gainMeso(5000000); cm.giveAllStatItemwatk(1142282,300,50); 모험가자동전직(); //cm.스킬마스터(); 
 
			if(파이널 == 532) {
			cm.getPlayer().changeJob(501);
			} else {
			cm.getPlayer().changeJob(일차전직);
			}
	}
}
}






function 일차(i) {
	ㄱ = "#fs11.5##Cgray#(";
	ㄴ = ")#fs12#\r\n";
	
	텍 = "#fn나눔고딕 Extrabold##fs12##h #님 아래의 직업리스트를 선택하세요.\r\n";
	switch(i) {
	case 0:
	텍 += "#L100##b전사　  "+ㄱ+"→ 히어로, 다크나이트, 팔라딘"+ㄴ+"";
	텍 += "#L200##b마법사  "+ㄱ+"→ 아크메이지(불, 독), 아크메이지(썬, 콜), 비숍"+ㄴ+"";
	텍 += "#L300##b궁수　  "+ㄱ+"→ 보우마스터, 신궁"+ㄴ+"";
	텍 += "#L400##b도적　  "+ㄱ+"→ 나이트로드, 섀도어, 듀얼블레이더"+ㄴ+"";
	텍 += "#L500##b해적　  "+ㄱ+"→ 바이퍼, 캡틴, 캐논슈터"+ㄴ+""; break;

	case 1000:
	텍 += "#L1100##b소울마스터　  "+ㄱ+"→ 전사 계열"+ㄴ+"";
	텍 += "#L1200##b플레임위자드  "+ㄱ+"→ 마법사 계열"+ㄴ+"";
	텍 += "#L1300##b윈드브레이커  "+ㄱ+"→ 궁수 계열"+ㄴ+"";
	텍 += "#L1400##b나이트워커　  "+ㄱ+"→ 도적 계열"+ㄴ+"";
	텍 += "#L1500##b스트라이커　  "+ㄱ+"→ 해적 계열"+ㄴ+""; break;


	case 2000: 텍 += "#L2100##b아란"; break;
	case 2001: 텍 += "#L2200##b에반"; break;
	case 2002: 텍 += "#L2300##b메르세데스"; break;
	case 2003: 텍 += "#L2400##b팬텀"; break;
	case 2005: 텍 += "#L2500##b은월"; break;
	case 2004: 텍 += "#L2700##b루미너스"; break;

	case 3000:
	텍 += "#L3200##b배틀메이지  "+ㄱ+"→ 마법사 계열"+ㄴ+"";
	텍 += "#L3300##b와일드헌터  "+ㄱ+"→ 궁수 계열"+ㄴ+"";
	텍 += "#L3500##b메카닉　　  "+ㄱ+"→ 해적 계열"+ㄴ+""; break;

	case 3001:
	텍 += "#L3100##b데몬슬레이어  "+ㄱ+"→ 공격력 계열"+ㄴ+"";
	텍 += "#L3101##b데몬어벤져　  "+ㄱ+"→ MaxHP 계열"+ㄴ+""; break;

	case 3002: 텍 += "#L3600##b제논"; break;


	case 5000: 텍 += "#L5100##b미하일"; break;
	case 6000: 텍 += "#L6100##b카이저"; break;
	case 6001: 텍 += "#L6500##b엔젤릭버스터"; break;
        case 14000: 텍 += "#L14200##b키네시스"; break;
	}
	cm.sendSimple(텍);
}


function 이차(i) {
	기타 = 0;
	직 = i == 100 ? "전사" : i == 200 ? "마법사" : i == 300 ? "궁수" : i == 400 ? "도적" : "해적"
	이 = "#fn나눔고딕 Extrabold##e"+직+" 직업#n을 고르셨습니다.이제 #h #님의 #b최종 전직#k을 골라주세요.#k 전직 레벨인 30, 60, 100에 달성하면 #r자동으로 전직#k이 됩니다.\r\n";

	switch(i) {
	case 100:
	이 += "#L112##b히어로　　  "+ㄱ+"파이터 → 크루세이더 → 히어로"+ㄴ+"";
	이 += "#L122##b팔라딘　　  "+ㄱ+"페이지 → 나이트 → 팔라딘"+ㄴ+"";
	이 += "#L132##b다크나이트  "+ㄱ+"스피어맨 → 버서커 → 다크나이트"+ㄴ+"";
	break;

	case 200:
	이 += "#L212##b아크메이지(불, 독)  "+ㄱ+"위자드 → 메이지 → 아크메이지"+ㄴ+"";
	이 += "#L222##b아크메이지(썬, 콜)  "+ㄱ+"위자드 → 메이지 → 아크메이지"+ㄴ+"";
	이 += "#L232##b비숍#e　　#n　　　　　"+ㄱ+"클레릭 → 프리스트 → 비숍"+ㄴ+"";
	break;

	case 300:
	이 += "#L312##b보우마스터  "+ㄱ+"헌터 → 레인저 → 보우마스터"+ㄴ+"";
	이 += "#L322##b신궁　　　  "+ㄱ+"사수 → 저격수 → 신궁"+ㄴ+"";
	break;

	case 400:
	이 += "#L412##b나이트로드　  "+ㄱ+"어쌔신 → 허밋 → 나이트로드"+ㄴ+"";
	이 += "#L422##b섀도어　　　  "+ㄱ+"시프 → 시프마스터 → 섀도어"+ㄴ+"";
	이 += "#L434##b듀얼블레이더  "+ㄱ+"듀어러 → 슬래셔 → 듀얼블레이더"+ㄴ+"";
	break;

	case 500:
	이 += "#L512##b바이퍼　　  "+ㄱ+"인파이터 → 버커니어 → 바이퍼"+ㄴ+"";
	이 += "#L522##b캡틴　　　  "+ㄱ+"건슬링거 → 발키리 → 캡틴"+ㄴ+"";
	이 += "#L532##b캐논마스터  "+ㄱ+"캐논슈터 → 캐논블래스터 → 캐논마스터"+ㄴ+"";
	break;
	}

	cm.sendSimple(이);

}


function 자동전직() {
	switch(일차전직) {
	case 570:  cm.getPlayer().setKeyValue("AutoJob", "571"); break;
	case 1100: cm.getPlayer().setKeyValue("AutoJob", "1110"); break;
	case 1200: cm.getPlayer().setKeyValue("AutoJob", "1210"); break;
	case 1300: cm.getPlayer().setKeyValue("AutoJob", "1310"); break;
	case 1400: cm.getPlayer().setKeyValue("AutoJob", "1410"); break;
	case 1500: cm.getPlayer().setKeyValue("AutoJob", "1510"); break;

	case 2100: cm.getPlayer().setKeyValue("AutoJob", "2110"); break;
	case 2200: cm.getPlayer().setKeyValue("AutoJob", "2210"); break;
	case 2300: cm.getPlayer().setKeyValue("AutoJob", "2310"); break;
	case 2400: cm.getPlayer().setKeyValue("AutoJob", "2410"); break;
	case 2500: cm.getPlayer().setKeyValue("AutoJob", "2510"); break;
	case 2700: cm.getPlayer().setKeyValue("AutoJob", "2710"); break;

	case 3100: cm.getPlayer().setKeyValue("AutoJob", "3110"); break;
	case 3101: cm.getPlayer().setKeyValue("AutoJob", "3120"); break;
	case 3200: cm.getPlayer().setKeyValue("AutoJob", "3210"); break;
	case 3300: cm.getPlayer().setKeyValue("AutoJob", "3310"); break;
	case 3500: cm.getPlayer().setKeyValue("AutoJob", "3510"); break;
	case 3600: cm.getPlayer().setKeyValue("AutoJob", "3610"); break;
	case 4100: cm.getPlayer().setKeyValue("AutoJob", "4110"); break;
	case 4200: cm.getPlayer().setKeyValue("AutoJob", "4210"); break;


	case 5100: cm.getPlayer().setKeyValue("AutoJob", "5110"); break;

	case 6100: cm.getPlayer().setKeyValue("AutoJob", "6110"); break;
	case 6500: cm.getPlayer().setKeyValue("AutoJob", "6510"); break;
	case 14200: cm.getPlayer().setKeyValue("AutoJob", "14200"); break;

	}
}


function 모험가자동전직() {
	switch(파이널) {
	case 112: cm.getPlayer().setKeyValue("AutoJob", "110"); break;
	case 122: cm.getPlayer().setKeyValue("AutoJob", "120"); break;
	case 132: cm.getPlayer().setKeyValue("AutoJob", "130"); break;
	case 212: cm.getPlayer().setKeyValue("AutoJob", "210"); break;
	case 222: cm.getPlayer().setKeyValue("AutoJob", "220"); break;
	case 232: cm.getPlayer().setKeyValue("AutoJob", "230"); break;
	case 312: cm.getPlayer().setKeyValue("AutoJob", "310"); break;
	case 322: cm.getPlayer().setKeyValue("AutoJob", "320"); break;
	case 412: cm.getPlayer().setKeyValue("AutoJob", "410"); break;
	case 422: cm.getPlayer().setKeyValue("AutoJob", "420"); break;
	case 434: cm.getPlayer().setKeyValue("AutoJob", "430"); break;
	case 512: cm.getPlayer().setKeyValue("AutoJob", "510"); break;
	case 522: cm.getPlayer().setKeyValue("AutoJob", "520"); break;
	case 532: cm.getPlayer().setKeyValue("AutoJob", "530"); break;
	}
}