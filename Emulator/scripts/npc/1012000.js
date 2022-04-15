/*
위 스크립트의 저작권은 FoxDevelopTeam 팀장 Fox에게 있습니다.
문의 : rinus_alt / fox_devel@nate.com / opharks (skype)
*/
importPackage(java.sql);
importPackage(java.util);
importPackage(java.lang);
importPackage(Packages.database);
importPackage(Packages.client);
importPackage(Packages.constants);

var status = 0;
var select = -1;
var number = 5; // 보스 하루 입장횟수
var bossornot = false; 
function start() {
    status = -1;
    action(1, 0, 0);
}
function z(i, z)
{
	switch(z)
	{
		case 1:
		return "#fn돋움체#"+i+"  #fn돋움#";

		case 2:
		return "#fn돋움체#"+i+" #fn돋움#";

		default:
		return "#fn돋움체#"+i+"#fn돋움#";
	}
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
			//cm.showWZEffect("UI/SoulUI.img/DungeonEffect/start", 1);
			var warp = "원하시는 곳으로 데려다드리는 택시랍니다!\r\n";
			warp += "#L2##r#e적정레벨 사냥터#k#l";
			if (cm.getPlayer().getJob() >= 3300 && cm.getPlayer().getJob() <= 3312) {
				warp += "\r\n#L9##e재규어 서식지#n를 선택한다#l\r\n\r\n"
			}
				warp += "\r\n#L5##r별이 떨어진 곳#k으로 이동하고싶습니다#l";
			
			//warp += "\r\n\r\n#e#r*#b 서#g버#r 마#b스#g코#r트#b :#g 은#r별";
			cm.sendSimple(warp);

		} else if (status == 1) {
		       if (selection == 1) {
		             cm.dispose();
                             cm.warp(910000001);
				cm.sendSimple(warp);

			} else if (selection == 2) {
				var level = "#r레벨 "+cm.getPlayer().getLevel()+"#k에 맞는 사냥터를 출력합니다\r\n";
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L101020100#Lv."+z( 10, 2)+" │ 솟아오른나무　  │ 새들과 가까운 곳#l\r\n"
					level += "#b#L103010000#Lv."+z( 10, 2)+" │ 공사장　　　　  │ 추락주의#l\r\n"
					level += "#b#L100040000#Lv."+z( 15, 2)+" │ 골렘사원　　　  │ 골렘의 사원 입구#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L102020000#Lv."+z( 20, 2)+" │ 북쪽바위산　　  │ 페리온 북쪽령#l\r\n"
					level += "#b#L101030000#Lv."+z( 26, 2)+" │ 북쪽숲　　　　  │ 거대한 나무#l\r\n"
					level += "#b#L101030200#Lv."+z( 28, 2)+" │ 북쪽숲　　　　  │ 북쪽숲공터#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L101070100#Lv."+z( 30, 2)+" │ 한여름 밤의 숲　│ 빛나는 호숫길1#l\r\n"
					level += "#b#L101072200#Lv."+z( 33, 2)+" │ 요정학원 엘리넬 │ 2층 서재#l\r\n"
					level += "#b#L120040300#Lv."+z( 35, 2)+" │ 골드비치　　　  │ 해변가 풀숲3#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L120041800#Lv."+z( 42, 2)+" │ 골드비치　　　  │ 거친 파도#l\r\n"
					level += "#b#L103020410#Lv."+z( 45, 2)+" │ 커닝시티지하철  │ 2호선 2구간#l\r\n"
					level += "#b#L103030200#Lv."+z( 47, 2)+" │ 늪지대　　　　  │ 위험한 크로코#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L103030400#Lv."+z( 50, 2)+" │ 늪지대　　　　  │ 깊은 수렁#l\r\n"
					level += "#b#L102030000#Lv."+z( 55, 2)+" │ 불타버린땅　　  │ 와일드보어의 땅#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L102040301#Lv."+z( 62, 2)+" │ 유적발굴지　　  │ 제1군영#l\r\n"
					level += "#b#L105010000#Lv."+z( 66, 2)+" │ 습지　　　　　  │ 조용한 습지#l\r\n"
					level += "#b#L105020000#Lv."+z( 67, 2)+" │ 드레이크의 동굴 │ 빛이 들지 않는 곳#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L200010200#Lv."+z( 71, 2)+" │ 스카이로드　　  │ 하늘계단1#l\r\n"
					level += "#b#L200080000#Lv."+z( 76, 2)+" │ 스카이로드　　  │ 구름공원6#l\r\n"
					level += "#b#L211040001#Lv."+z( 79, 2)+" │ 히든스트리트　  │ 왕관을 휘날리며#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L211040200#Lv."+z( 81, 2)+" │ 엘나스 산맥　　 │ 얼음골짜기2#l\r\n"
					level += "#b#L310060120#Lv."+z( 85, 2)+" │ 겔리메르 연구소 │ 안드로이드 연구소3#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L260020600#Lv."+z( 90, 2)+" │ 선셋로드　　　  │ 사헬지대2#l\r\n"
					level += "#b#L261020400#Lv."+z( 95, 2)+" │ 알카드노 연구소 │ 연구소 C-2 구역#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L300030300#Lv."+z(100, 3)+" │ 엘린 숲　　　　 │ 페어리의 숲2#l\r\n"
					level += "#b#L240010200#Lv."+z(105, 3)+" │ 미나르숲　　　  │ 심술쟁이의 숲#l\r\n"
					level += "#b#L230040000#Lv."+z(107, 3)+" │ 아쿠아로드　　  │ 깊은 바다 협곡1#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L220011000#Lv."+z(113, 3)+" │ 루디브리엄성　  │ 하늘테라스<5>#l\r\n"
					level += "#b#L220020000#Lv."+z(114, 3)+" │ 루디브리엄성　  │ 장난감공장<1공정>1구역#l\r\n"
					level += "#b#L220020600#Lv."+z(114, 3)+" │ 루디브리엄성　  │ 장난감공장<기계실>#l\r\n"
					level += "#b#L252010000#Lv."+z(118, 3)+" │ 황금사원　　　  │ 수행자의 숲1#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L211041000#Lv."+z(123, 3)+" │ 폐광　　　　　  │ 늑대의영역3#l\r\n"
					level += "#b#L250020000#Lv."+z(126, 3)+" │ 무릉사원　　　  │ 초급 수련장#l\r\n"
					level += "#b#L251010402#Lv."+z(126, 3)+" │ 무릉사원　　　  │ 빨간코 해적단 소굴2#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L224000100#Lv."+z(130, 3)+" │ 아랫마을　　　  │ 까막산 입구#l\r\n"
					level += "#b#L224000131#Lv."+z(137, 3)+" │ 아랫마을　　　  │ 달 고개#l\r\n"
					level += "#b#L224000141#Lv."+z(139, 3)+" │ 아랫마을　　　  │ 깊은 산 흉가#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L240030104#Lv."+z(142, 3)+" │ 히든스트리트　  │ 숨겨진 용의 무덤2#l\r\n"
					level += "#b#L240040520#Lv."+z(145, 3)+" │ 미나르숲　　　  │ 망가진 용의 둥지#l\r\n"
					level += "#b#L270010500#Lv."+z(148, 3)+" │ 타임로드　　　  │ 추억의 길5#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L240040521#Lv."+z(150, 3)+" │ 미나르숲　　　  │ 위험한 용의 둥지#l\r\n"
					level += "#b#L270020100#Lv."+z(151, 3)+" │ 타임로드　　　  │ 후회의 길1#l\r\n"
					level += "#b#L240091100#Lv."+z(157, 3)+" │ 콜로서스　　　  │ 벌떼의 서식지 1#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L270030100#Lv."+z(161, 3)+" │ 타임로드　　　  │ 망각의 길1#l\r\n"
					level += "#b#L271010100#Lv."+z(162, 3)+" │ 파괴된 헤네시스 │ 파괴된 헤네시스 시장#l\r\n"
					level += "#b#L271020100#Lv."+z(164, 3)+" │ 파괴된 헤네시스 │ 음산한 콧노래 오솔길#l\r\n"
					level += "#b#L271010301#Lv."+z(167, 3)+" │ 파괴된 니은숲　 │ 수상한 언덕#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L271030100#Lv."+z(170, 3)+" │ 기사단 요새　　 │ 기사단 제 1구역#l\r\n"
					level += "#b#L271030400#Lv."+z(176, 3)+" │ 기사단 요새　　 │ 기사단 제 4구역#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L271030530#Lv."+z(182, 3)+" │ 기사단 요새　　 │ 기사의 전당4#l\r\n"
					level += "#b#L241000218#Lv."+z(188, 3)+" │ 킹덤로드　　　  │ 빙점의 숲2#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L241000211#Lv."+z(190, 3)+" │ 킹덤로드　　　  │ 시작되는 비극의 숲5#l\r\n"
					level += "#b#L273060300#Lv."+z(198, 3)+" │ 황혼의 페리온　 │ 전사들의 결전지#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L241000201#Lv."+z(200, 3)+" │ 킹덤로드　　　  │ 깊어지는 비극의 숲5#l\r\n"
					level += "#b#L241000216#Lv."+z(200, 3)+" │ 킹덤로드　　　  │ 타락한 마력의 숲1#l\r\n"
					level += "#b#L241000206#Lv."+z(205, 3)+" │ 킹덤로드　　　  │ 타락한 마력의 숲2#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L241000226#Lv."+z(210, 3)+" │ 킹덤로드　　　  │ 타락한 마력의 숲3#l\r\n"
					level += "#b#L241000221#Lv."+z(210, 3)+" │ 킹덤로드　　　  │ 끝나지 않는 비극의 숲5#l\r\n"
					level += "#b#L105300203#Lv."+z(218, 3)+" │ 타락한 세계수　 │ 중하단 줄기 갈림길#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L310070200#Lv."+z(222, 3)+" │ 스카이라인　　  │ 스카이라인 올라가는 길#l\r\n"
					level += "#b#L310070230#Lv."+z(222, 3)+" │ 스카이라인　　  │ 스카이라인2#l\r\n"
					level += "#b#L310070400#Lv."+z(226, 3)+" │ 블랙헤븐　　　  │ 블랙헤븐 교차로1#l\r\n"
					level += "#b#L105300301#Lv."+z(228, 3)+" │ 타락한 세계수　 │ 상단 줄기 갈림길#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L310070470#Lv."+z(230, 3)+" │ 블랙헤븐　　　  │ 블랙헤븐 교차로3#l\r\n"
					level += "#b#L310070490#Lv."+z(230, 3)+" │ 블랙헤븐　　　  │ 블랙헤븐 내부 미로7#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L450002006#Lv."+z(240, 3)+" │ 츄릅 포레스트　 │ 길쭉 동글숲1#l\r\n"
					level += "#b#L450002007#Lv."+z(240, 3)+" │ 츄릅 포레스트　 │ 길쭉 동글숲2#l\r\n"
					level += "#b#L450002008#Lv."+z(240, 3)+" │ 츄릅 포레스트　 │ 몽땅 동글숲1#l\r\n"
					level += "#b#L450002009#Lv."+z(240, 3)+" │ 츄릅 포레스트　 │ 몽땅 동글숲2#l\r\n"
					level += "#b#L450002010#Lv."+z(240, 3)+" │ 츄릅 포레스트　 │ 츄릅포레스트 깊은 곳#l\r\n"
				}
				cm.sendSimple(level);
				
			} else if (selection == 4) {
				var boss = "보스를 잡으러 떠나시겠습니까?\r\n";
				//boss += "#L211042300##fUI/UIWindow2.img/UserList/Main/Boss/BossList/1/Icon/normal/0#"
				//boss += "#fs11#[ 현재 남은 입장 횟수 : #r "+getRemain(211042300)+"#k ]#fs12##l\r\n";

				boss += "#L211042402##fUI/UIWindow2.img/UserList/Main/Boss/BossList/1/Icon/normal/0#"
				boss += "#fs11#[ 현재 남은 입장 횟수 : #r "+getRemain(211042402)+"#k ]#fs12##l\r\n";

				boss += "#L240050400##fUI/UIWindow2.img/UserList/Main/Boss/BossList/2/Icon/normal/0#"
				boss += "#fs11#[ 현재 남은 입장 횟수 : #r "+getRemain(240050400)+"#k ]#fs12##l\r\n";

				boss += "#L270050000##fUI/UIWindow2.img/UserList/Main/Boss/BossList/11/Icon/normal/0#"
				boss += "#fs11#[ 현재 남은 입장 횟수 : #r "+getRemain(270050000)+"#k ]#fs12##l\r\n";

				boss += "#L272020210##fUI/UIWindow2.img/UserList/Main/Boss/BossList/9/Icon/normal/0#"
				boss += "#fs11#[ 현재 남은 입장 횟수 : #r "+getRemain(272020210)+"#k ]#fs12##l\r\n";

				boss += "#L271040000##fUI/UIWindow2.img/UserList/Main/Boss/BossList/12/Icon/normal/0#"
				boss += "#fs11#[ 현재 남은 입장 횟수 : #r "+getRemain(271040000)+"#k ]#fs12##l\r\n";

				boss += "#L401060000##fUI/UIWindow2.img/UserList/Main/Boss/BossList/10/Icon/normal/0#"
				boss += "#fs11#[ 현재 남은 입장 횟수 : #r "+getRemain(401060000)+"#k ]#fs12##l\r\n";

				boss += "#L211070000##fUI/UIWindow2.img/UserList/Main/Boss/BossList/8/Icon/normal/0#"
				boss += "#fs11#[ 현재 남은 입장 횟수 : #r "+getRemain(211070000)+"#k ]#fs12##l\r\n";
				bossornot = true;
                cm.sendSimple(boss);
			} else if (selection == 5) {
				picStar = "#fUI/UIWindow2.img/ToolTip/Equip/Star/Star#";
				var star = "#r스타포스#k 사냥터로 떠나시겠습니까?\r\n";
					star += "#L240010600##rLv."+z(107, 3)+" │ "+picStar+"×"+z(  5, 1)+" │ 하늘 둥지2#l\r\n"
					star += "#L240010520##bLv."+z(107, 3)+" │ "+picStar+"×"+z(  5, 1)+" │ 하늘 둥지3#l\r\n"
					star += "#L240010510##bLv."+z(109, 3)+" │ "+picStar+"×"+z(  5, 1)+" │ 산양의 골짜기2#l\r\n"
					star += "#L240020200##bLv."+z(110, 3)+" │ "+picStar+"×"+z( 15, 2)+" │ 검은 켄타우로스의 영역#l\r\n"
					star += "#L240020210##bLv."+z(110, 3)+" │ "+picStar+"×"+z( 15, 2)+" │ 어둠과 불의 전장#l\r\n"
					star += "#L240020300##bLv."+z(110, 3)+" │ "+picStar+"×"+z( 15, 2)+" │ 물과 어둠의 전장#l\r\n"
					star += "#L220060000##rLv."+z(116, 3)+" │ "+picStar+"×"+z( 25, 2)+" │ 뒤틀린 시간의 길<1>#l\r\n"
					star += "#L220070000##rLv."+z(116, 3)+" │ "+picStar+"×"+z( 25, 2)+" │ 잊혀진 시간의 길<1>#l\r\n"
					star += "#L220060100##rLv."+z(117, 3)+" │ "+picStar+"×"+z( 25, 2)+" │ 뒤틀린 시간의 길<2>#l\r\n"
					star += "#L220070100##rLv."+z(117, 3)+" │ "+picStar+"×"+z( 25, 2)+" │ 잊혀진 시간의 길<2>#l\r\n"
					star += "#L220060200##bLv."+z(118, 3)+" │ "+picStar+"×"+z( 26, 2)+" │ 뒤틀린 시간의 길<3>#l\r\n"
					star += "#L220070200##bLv."+z(118, 3)+" │ "+picStar+"×"+z( 26, 2)+" │ 잊혀진 시간의 길<3>#l\r\n"
					star += "#L220060300##bLv."+z(119, 3)+" │ "+picStar+"×"+z( 27, 2)+" │ 뒤틀린 시간의 길<4>#l\r\n"
					star += "#L220070300##bLv."+z(119, 3)+" │ "+picStar+"×"+z( 27, 2)+" │ 잊혀진 시간의 길<4>#l\r\n"
					star += "#L220060400##bLv."+z(120, 3)+" │ "+picStar+"×"+z( 28, 2)+" │ 뒤틀린 회랑#l\r\n"
					star += "#L220070400##rLv."+z(122, 3)+" │ "+picStar+"×"+z( 28, 2)+" │ 잊혀진 회랑#l\r\n"
					star += "#L211041500##bLv."+z(132, 3)+" │ "+picStar+"×"+z( 50, 2)+" │ 폐광1#l\r\n"
					star += "#L211041600##bLv."+z(132, 3)+" │ "+picStar+"×"+z( 50, 2)+" │ 폐광2#l\r\n"
					star += "#L211041700##bLv."+z(132, 3)+" │ "+picStar+"×"+z( 50, 2)+" │ 폐광3#l\r\n"
					star += "#L211041800##bLv."+z(132, 3)+" │ "+picStar+"×"+z( 50, 2)+" │ 폐광4#l\r\n"
					star += "#L211042000##bLv."+z(132, 3)+" │ "+picStar+"×"+z( 55, 2)+" │ 시련의 동굴1#l\r\n"
					star += "#L211042100##bLv."+z(135, 3)+" │ "+picStar+"×"+z( 55, 2)+" │ 시련의 동굴2#l\r\n"
					star += "#L211042200##bLv."+z(136, 3)+" │ "+picStar+"×"+z( 55, 2)+" │ 시련의 동굴3#l\r\n"
					star += "#L240040300##rLv."+z(141, 3)+" │ "+picStar+"×"+z( 65, 2)+" │ 협곡의 서쪽길#l\r\n"
					star += "#L240040320##rLv."+z(141, 3)+" │ "+picStar+"×"+z( 65, 2)+" │ 검은 와이번의 둥지#l\r\n"
					star += "#L240040510##rLv."+z(150, 3)+" │ "+picStar+"×"+z( 65, 2)+" │ 죽은 용의 둥지#l\r\n"
					star += "#L240040511##bLv."+z(150, 3)+" │ "+picStar+"×"+z( 70, 2)+" │ 남겨진 용의 둥지1#l\r\n"
					star += "#L240040512##bLv."+z(150, 3)+" │ "+picStar+"×"+z( 70, 2)+" │ 남겨진 용의 둥지2#l\r\n"
					star += "#L270030600##bLv."+z(160, 3)+" │ "+picStar+"×"+z( 90, 2)+" │ 또 다른 망각의 길1#l\r\n"
					star += "#L270030610##bLv."+z(161, 3)+" │ "+picStar+"×"+z( 90, 2)+" │ 또 다른 망각의 길2#l\r\n"
					star += "#L270030620##bLv."+z(162, 3)+" │ "+picStar+"×"+z( 90, 2)+" │ 또 다른 망각의 길3#l\r\n"
					star += "#L270030630##rLv."+z(164, 3)+" │ "+picStar+"×"+z( 90, 2)+" │ 또 다른 망각의 길4#l\r\n"
					star += "#L271030101##bLv."+z(169, 3)+" │ "+picStar+"×"+z(120, 3)+" │ 제 1연무장#l\r\n"
					star += "#L271030102##bLv."+z(169, 3)+" │ "+picStar+"×"+z(120, 3)+" │ 제 2연무장#l\r\n"
					star += "#L271030310##bLv."+z(173, 3)+" │ "+picStar+"×"+z(120, 3)+" │ 무기고1#l\r\n"
					star += "#L271030320##rLv."+z(175, 3)+" │ "+picStar+"×"+z(120, 3)+" │ 무기고2#l\r\n";
				cm.sendSimple(star);
			} else if (selection == 9) {
				cm.dispose();
				cm.openNpc(2159314);
			}
			
			
		} else if (status == 2) {
			var map = selection;
			if (map >= 100000000) {
				if(bossornot) {
					if(getRemain(map) == 0) {
						cm.sendOk("선택하신 보스는 입장횟수를 모두 소진하여 입장이 불가합니다.");
						cm.dispose();
						return;
					}
					takeRemain(map);
				}
				cm.warp(map,0);
				cm.dispose();
			} else {
				cm.sendOk("이 #b보스#k는 아직 이용하실 수 없습니다.\r\n\r\n이용 불가능한 보스 : \r\n#r 반반 , 스우 , 블러디 퀸 , 데미안 , 피에르 , \r\n 벨룸\r\n #b이 보스들은 현재 구현중입니다.#k#l");
				cm.dispose();
			}
		}
	}
}

function getRemain(boss) { //남은 입장횟수 보여주기
	var remain = number;
	var con = MYSQL.getConnection();
	var ps = con.prepareStatement("SELECT * FROM bossremain WHERE charid = "+cm.getPlayer().getId()+" AND bossid = "+boss);
	var rs = ps.executeQuery();
		if(rs.next()) {
			remain = rs.getByte("remain");
		}
		con.close();
		ps.close();
		rs.close();
	return remain;	
}

function takeRemain(boss) {
	var con = MYSQL.getConnection();
	var ps = con.prepareStatement("SELECT * FROM bossremain WHERE charid = "+cm.getPlayer().getId()+" AND bossid = "+boss);
	var rs = ps.executeQuery();
		if(rs.next()) {
			var take = con.prepareStatement("UPDATE bossremain SET remain = ? WHERE charid = ? AND bossid = ?");
			take.setByte(1, (getRemain(boss) - 1));
			take.setInt(2, cm.getPlayer().getId());
			take.setInt(3, boss);
			take.executeUpdate();
			take.close();
		} else {
			var insert = con.prepareStatement("INSERT INTO bossremain(charid, bossid, remain) VALUES(?, ?, ?)");
			insert.setInt(1, cm.getPlayer().getId());
			insert.setInt(2, boss);
			insert.setByte(3, number-1);
			insert.executeUpdate();
			insert.close();
		}
	con.close();
	ps.close();
	rs.close();
}
