


/*

	퓨어 소스  팩의 스크립트 입니다. (제작 : 주크블랙) - 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	황혼 에 의해 만들어 졌습니다.

	엔피시아이디 : 9010017

	엔피시 이름 : 개발자의 인형

	엔피시가 있는 맵 : 빅토리아로드 : 엘리니아 (180000000)

	엔피시 설명 : MISSINGNO


*/

var status = -1;
importPackage(Packages.launch);
var select = -1;
var time = -1;
var rate = -1;
function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        if (cm.getPlayer().hasGmLevel(6)) {
	var cps = "#e";
	cps +="#L1#경험치 배율수정\r\n";
	cps +="#L2#드랍 배율수정\r\n";
	cps +="#L3#메소 배율수정\r\n";
	cps +="#L9#환포 배율수정\r\n";
	cps +="#L10#후원포인트 얻기\r\n"
	cps +="#L11#환생포인트 얻기\r\n"
	cps +="#L4#아이템 제작하기\r\n";
	cps +="#L5#아이템 복구제작\r\n";
	cps +="#L6#유저정보 알아보기\r\n";
	cps +="#L7#모든 직업코드 보기\r\n";
	//cps +="#L8#금고 비밀번호or아이템설정\r\n#k";
	}
	cm.sendSimple(cps);

   } else if (status == 1) {
        select = selection;
        if (selection == 0) {
            cm.sendGetText("이벤트메세지");
        } else if (selection == 1) {
            cm.sendGetNumber("원하시는 경험치배율을 설정해주세요.",1,1,1000);
        } else if (selection == 2) {
            cm.sendGetNumber("원하시는 드랍배율을 설정해주세요.",1,1,1000);
        } else if (selection == 3) {
            cm.sendGetNumber("원하시는 메소배율을 설정해주세요.",1,1,1000);
        } else if (selection == 9) {
            cm.sendGetNumber("원하시는 환포배율을 설정해주세요.",1,1,1000);
        } else if (selection == 4) {
            cm.dispose();
            cm.openNpc(3000107);
        } else if (selection == 5) {
            cm.dispose();
            cm.openNpc(9090008);
        } else if (selection == 6) {
            cm.dispose();
            cm.openNpc(2470044);
        } else if (selection == 8) {
            cm.dispose();
            cm.openNpc(2420039);
        } else if (selection == 9) {
            cm.dispose();
            cm.openNpc(9900001);
        } else if (selection == 10) {
            cm.sendGetNumber("받고싶은 후원포인트 금액을 적어주세요.",1,1,9999999);
        } else if (selection == 11) {
            cm.sendGetNumber("받고싶은 환생포인트 금액을 적어주세요.",1,1,9999999);
	} else if (selection == 7) {
                var adc1 = "#r#e직업코드 목록입니다. 운영자(900)#n#k\r\n\r\n";
                adc1 += "#e================<#d#e전사(100)#k>===============#n\r\n";
		adc1 += "#r파이터#k(110)#r크루세이더#k(111)#r히어로#k(112)\r\n";
		adc1 += "#b페이지#k(120)#b나이트#k(121)#b팔라딘#k(122)\r\n";
		adc1 += "#g스피어맨#k(130)#g용기사#k(131)#g다크나이트#k(132)\r\n";
		adc1 += "#e================<#d#e마법사(200)#k>===============#n\r\n";
		adc1 += "#r불독#k(210)#r불독#k(211)#r불독#k(212)\r\n";
		adc1 += "#b썬콜#k(220)#b썬콜#k(221)#b썬콜#k(222)\r\n"; 
		adc1 += "#g클레릭#k(230)#g프리스트(231)#g비숍#k(232)\r\n";
		adc1 += "#e================<#d#e궁수(300)#k>===============#n\r\n";
		adc1 += "#r헌터#k(310)#r레인저#k(311)#r보우마스터#k(312)\r\n";
		adc1 += "#b사수#k(320)\r저격수#k(321)#r신궁#k(322)\r\n";
		adc1 += "#e================<#d#e도적(400)#k>===============#n\r\n";
		adc1 += "#r어쌔신#k(410)#r허밋#k(411)#r나이트로드#k(412)\r\n";
		adc1 += "#b시프#k(420)#b시프마스터#k(421)#b섀도어#k(422)\r\n";
		adc1 += "#g듀얼블레이드#k(430,431,432,433,434)\r\n";
		adc1 += "#e================<#d#e해적(500)#k>===============#n\r\n";;
		adc1 += "#r인파이터#k(510)#r버커니어#k(511)#r바이퍼#k(512)\r\n";
		adc1 += "#b건슬링거#k(520)#b발키리#k(521)#b캡틴#k(522)\r\n";
		adc1 += "#g캐논슈터#k(501,530,531,532)\r\n";
		adc1 += "#e==============<#d#e시그너스(1000)#k>=============#n\r\n";;
		adc1 += "#r소울마스터#k(1100,1110,1111,1112)\r\n";
		adc1 += "#r플레임위자드#k(1200,1210,1211,1212)\r\n";
		adc1 += "#r윈드브레이커#k(1300,1310,1311,1312)\r\n";
		adc1 += "#r나이트워커#k(1400,1410,1411,1412)\r\n";
		adc1 += "#r스트라이커#k(1500,1510,1511,1512)\r\n";
		adc1 += "#e================<#d#e에반(2200)#k>===============#n\r\n";;
		adc1 += "#b에반#k(2200,2210,2211,2212,2213,2214,2215,2216,2217,2218)\r\n";
		adc1 += "#e================<#d#e아란(2100)#k>===============#n\r\n";;
		adc1 += "#g아란#k(2100,2110,2111,2112)\r\n";
		adc1 += "#e================<#d#e배틀메이지#k>===============#n\r\n";;
		adc1 += "#r배틀메이지#k(3200,3210,3211,3212)\r\n";
		adc1 += "#e================<#d#e와일드헌터#k>===============#n\r\n";;
		adc1 += "#r와일드헌터#k(3300,3310,3311,3312)\r\n";
		adc1 += "#e==================<#d#e메카닉#k>=================#n\r\n";;
		adc1 += "#r메카닉#k(3500,3510,3511,3512)\r\n";
		adc1 += "#e================<#d#e데몬슬레이어#k>===============#n\r\n";;
		adc1 += "#b데몬슬레이어#k(3100,3110,3111,3112)\r\n";
		adc1 += "#e================<#d#e데몬어벤져#k>===============#n\r\n";;
		adc1 += "#b데몬어벤져#k(3101,3120,3121,3122)\r\n";
		adc1 += "#e================<#d#e메르세데스#k>===============#n\r\n";;
		adc1 += "#g메르세데스#k(2300,2310,2311,2312)\r\n";
		adc1 += "#e================<#d#e팬텀#k>===============#n\r\n";;
		adc1 += "#b팬텀#k(2400,2410,2411,2412)\r\n";
		adc1 += "#e================<#d#e미하일#k>===============#n\r\n";;
		adc1 += "#r미하일#k(5100,5110,5111,5112)\r\n";
		adc1 += "#e================<#d#e카이저#k>===============#n\r\n";;
		adc1 += "#r카이저#k(6100,6110,6111,6112)\r\n";
		adc1 += "#e================<#d#e엔젤릭버스터#k>===============#n\r\n";;
		adc1 += "#r엔젤릭버스터#k(6500,6510,6511,6512)\r\n";
		adc1 += "#e================<#d#e루미너스#k>===============#n\r\n";;
		adc1 += "#b루미너스#k(2700,2710,2711,2712)\r\n";
		adc1 += "#e================<#d#e제논#k>===============#n\r\n";;
		adc1 += "#b제논#k(3600,3610,3611,3612)\r\n";
		adc1 += "#e================<#d#e은월#k>===============#n\r\n";;
		adc1 += "#b은월#k(2500,2510,2511,2512)\r\n";
		adc1 += "#e================<#d#e키네시스#k>===============#n\r\n";;
		adc1 += "#b키네시스#k(14200,14210,14211,14212)\r\n";
                cm.sendSimple(adc1);
        }
    } else if (status == 2) {
        if (select == 0) {
            var text = cm.getText();
            LoginServer.getInstance().setEventMessage(text);
            cm.dispose();
            cm.sendOk("ok");
        } else if (select == 1) {
            rate = selection;
            cm.sendGetNumber("얼마나 하시겠습니까? 지속시간(초)",1,1,300000);
        } else if (select == 2) {
            rate = selection;
            cm.sendGetNumber("얼마나 하시겠습니까?지속시간(초)",1,1,300000);
        } else if (select == 3) {
            rate = selection;
            cm.sendGetNumber("얼마나 하시겠습니까?지속시간(초)",1,1,300000);
        } else if (select == 9) {
            rate = selection;
            cm.sendGetNumber("얼마나 하시겠습니까?지속시간(초)",1,1,300000);
        } else if (select == 10) {
	cm.gainRC(selection);
	cm.sendOk("후원포인트가 지급되었습니다.");
	cm.dispose();
        
        } else if (select == 11) {
	cm.getPlayer().setReborns(selection);
	cm.sendOk("환생포인트가 지급되었습니다.");
	cm.dispose();
        }
    } else if (status == 3) {
        if (select == 1) {
            time = selection;
            cm.setExpEvent(rate, time);
            cm.sendOk("경험치 배율이 수정되었습니다.");
        } else if (select == 2) {
            time = selection;
            cm.setDropEvent(rate, time);
            cm.sendOk("드랍 배율이 수정되었습니다.");
        } else if (select == 3) {
            time = selection;
            cm.setMesoEvent(rate, time);
            cm.sendOk("메소 배율이 수정되었습니다.");
        } else if (select == 9) {
            time = selection;
            cm.setMesoEvent(rate, time);
            cm.sendOk("환포 배율이 수정되었습니다.");
        }
        cm.dispose();
    }
}

