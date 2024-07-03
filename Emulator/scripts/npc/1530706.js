var status = 0;
var select = -1;
var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
별빨 = "#fUI/GuildMark.img/Mark/Pattern/00004001/1#"
별파 = "#fUI/GuildMark.img/Mark/Pattern/00004001/11#"
별보 = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"
별회 = "#fUI/GuildMark.img/Mark/Pattern/00004001/15#"
importPackage(Packages.constants);

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
	    var chat = "#b#fn나눔고딕 Extrabold##fs14#  ▶ #h #, your level is "+cm.getPlayer().getLevel()+"#k\r\n";
	    chat += "  #r▶ Please use a field that fits your level.#k\r\n";
	    chat += "\r\n#L1##fs 13##e#r  Warp Town#d ( Henesys,Ereve, Etc)#k";
	    chat += "\r\n#L2##fs 13##e#r  Warp Field#d ( Farm by LEVEL )#n#l#k";
	    chat += "\r\n#L7##fs 13##e#r  Fishing Field#d ( Fishing Map )#n#l#k";
	    chat += "\r\n#L9##fs 13##e#r  Scrolling Field#d ( Easy Scrolling, Use Shop)#n#l#k";
	    chat += "\r\n#L3##fs 13##e#r  Warp Event#d ( Event Maps, Etc )#n#l#k";
	    chat += "\r\n#L10##fs 13##e#r  Mini Dungeon#d ( Contents Field )#n#l#k";
	    chat += "\r\n#L4##fs 13##e#r  Warp Boss#d ( Boss by LEVEL )#n#l#k";   
            cm.sendSimple(chat);

        } else if (status == 1) {
            if (selection == 1) {
                var vlig = "#fn나눔고딕 Extrabold##r[알림]#k #h #님 원하시는 마을을 선택해주세요.#b\r\n";
                vlig += "#L230040401#이상한 난파선 어딘가로 이동을 하겠습니다.\r\n";
                vlig += "#L200090001#오르비스 선실로 이동을 하겠습니다.\r\n";
                vlig += "#L200110020#비행 데이트장으로 이동을 하겠습니다.\r\n";
                vlig += "#L100000000#헤네시스로 이동을 하겠습니다.\r\n";
                vlig += "#L103000000#커닝시티로 이동을 하겠습니다.\r\n";
                vlig += "#L101000000#엘리니아로 이동을 하겠습니다.\r\n";
                vlig += "#L102000000#페리온으로 이동을 하겠습니다.\r\n";
                vlig += "#L310000000#에델슈타인으로 이동을 하겠습니다.\r\n"; 
                vlig += "#L105000000#슬리피우드로 이동을 하겠습니다.\r\n"; 
                vlig += "#L130000000#에레브로 이동을 하겠습니다.\r\n";
                vlig += "#L101050000#에우렐로 이동을 하겠습니다.\r\n";
                vlig += "#L140000000#리엔으로 이동을 하겠습니다.\r\n"; 
                vlig += "#L200000000#오르비스로 이동을 하겠습니다.\r\n";
                vlig += "#L211000000#엘나스로 이동을 하겠습니다.\r\n"
                vlig += "#L220000000#루디브리엄으로 이동을 하겠습니다.\r\n";
                vlig += "#L240000000#리프레로 이동을 하겠습니다.\r\n";
                vlig += "#L260000000#아리안트로 이동을 하겠습니다.\r\n";
                vlig += "#L261000000#마가티아로 이동을 하겠습니다.\r\n";
                vlig += "#L252000000#황금사원으로 이동을 하겠습니다.\r\n";
                vlig += "#L100040000#암벽 거인으로 이동을 하겠습니다.\r\n";
                vlig += "#L273000000#황혼의 페리온으로 이동을 하겠습니다.\r\n";
                vlig += "#L219000000#코-크 타운으로 이동을 하겠습니다.\r\n";
                vlig += "#L105200000#루타비스로 이동을 하겠습니다.\r\n";
                vlig += "#L931050810#판테온으로 이동을 하겠습니다.\r\n";
                vlig += "#L105300000#타락한 세계수로 이동을 하겠습니다.\r\n";
                vlig += "#L450003330#레헬른으로 이동을 하겠습니다.\r\n";
                vlig += "#L103041000#커닝타워 로비로 이동을 하겠습니다.\r\n";
                vlig += "#L450005000#아르카나로 이동을 하겠습니다.\r\n";
                vlig += "#L450002000#츄츄아일랜드로 이동을 하겠습니다.\r\n";
                vlig += "#L450006130#모라스 트뤼에페 광장으로 이동을 하겠습니다.\r\n";
                cm.sendSimple(vlig);

       } else if (selection == 2) {
 		var level = "#fn나눔고딕 Extrabold##r[알림]#k #h #님 원하시는 사냥터를 선택해주세요.\r\n#r모든 사냥터에서 메소 코인이 확률적으로 드롭 됩니다.#b\r\n";
		level += "#b#L101020100#Lv.10 │ 솟아오른나무　  │ 새들과 가까운 곳#l\r\n"
		level += "#b#L103010000#Lv.10 │ 공사장　　　　  │ 추락주의#l\r\n"
		level += "#b#L100040000#Lv.15 │ 골렘사원　　　  │ 골렘의 사원 입구#l\r\n"
		level += "#b#L102020000#Lv.20 │ 북쪽바위산　　  │ 페리온 북쪽령#l\r\n"
		level += "#b#L101030000#Lv.26 │ 북쪽숲　　　　  │ 거대한 나무#l\r\n"
		level += "#b#L101030200#Lv.28 │ 북쪽숲　　　　  │ 북쪽숲공터#l\r\n"
		level += "#b#L101070100#Lv.30 │ 한여름 밤의 숲　│ 빛나는 호숫길1#l\r\n"
		level += "#b#L101072200#Lv.33 │ 요정학원 엘리넬 │ 2층 서재#l\r\n"
		level += "#b#L120040300#Lv.35 │ 골드비치　　　  │ 해변가 풀숲3#l\r\n"
		level += "#b#L120041800#Lv.42 │ 골드비치　　　  │ 거친 파도#l\r\n"
		level += "#b#L103020410#Lv.45 │ 커닝시티지하철  │ 2호선 2구간#l\r\n"
		level += "#b#L103030200#Lv.47 │ 늪지대　　　　  │ 위험한 크로코#l\r\n"
		level += "#b#L103030400#Lv.50 │ 늪지대　　　　  │ 깊은 수렁#l\r\n"
		level += "#b#L102030000#Lv.55 │ 불타버린땅　　  │ 와일드보어의 땅#l\r\n"
		level += "#b#L102040301#Lv.62 │ 유적발굴지　　  │ 제1군영#l\r\n"
		level += "#b#L105010000#Lv.66 │ 습지　　　　　  │ 조용한 습지#l\r\n"
		level += "#b#L105020000#Lv.67 │ 드레이크의 동굴 │ 빛이 들지 않는 곳#l\r\n"
		level += "#b#L200010200#Lv.71 │ 스카이로드　　  │ 하늘계단1#l\r\n"
		level += "#b#L200080000#Lv.76 │ 스카이로드　　  │ 구름공원6#l\r\n"
		level += "#b#L211040001#Lv.79 │ 히든스트리트　  │ 왕관을 휘날리며#l\r\n"
		level += "#b#L211040200#Lv.81 │ 엘나스 산맥　　 │ 얼음골짜기2#l\r\n"
		level += "#b#L310060120#Lv.85 │ 겔리메르 연구소 │ 안드로이드 연구소3#l\r\n"
		level += "#b#L260020600#Lv.90 │ 선셋로드　　　  │ 사헬지대2#l\r\n"
		level += "#b#L261020400#Lv.95 │알카드노 연구소  │ 연구소 C-2 구역#l\r\n"
		level += "#b#L300030300#Lv.100 │ 엘린 숲　　　　 │ 페어리의 숲2#l\r\n"
		level += "#b#L240010200#Lv.105 │ 미나르숲　　　  │ 심술쟁이의 숲#l\r\n"
		level += "#b#L230040000#Lv.107 │ 아쿠아로드　　  │ 깊은 바다 협곡1#l\r\n"
		level += "#b#L220011000#Lv.113 │ 루디브리엄성　  │ 하늘테라스<5>#l\r\n"
		level += "#b#L220020000#Lv.114 │ 루디브리엄성　  │ 장난감공장<1공정>1구역#l\r\n"
		level += "#b#L220020600#Lv.114 │ 루디브리엄성　  │ 장난감공장<기계실>#l\r\n"
		level += "#b#L252010000#Lv.118 │ 황금사원　　　  │ 수행자의 숲1#l\r\n"
		level += "#b#L211041000#Lv.123 │ 폐광　　　　　  │ 늑대의영역3#l\r\n"
		level += "#b#L250020000#Lv.126 │ 무릉사원　　　  │ 초급 수련장#l\r\n"
		level += "#b#L251010402#Lv.126 │ 무릉사원　　　  │ 빨간코 해적단 소굴2#l\r\n"
		level += "#b#L224000100#Lv.130 │ 아랫마을　　　  │ 까막산 입구#l\r\n"
		level += "#b#L224000131#Lv.137 │ 아랫마을　　　  │ 달 고개#l\r\n"
		level += "#b#L224000141#Lv.139 │ 아랫마을　　　  │ 깊은 산 흉가#l\r\n"
		level += "#b#L240030104#Lv.142 │ 히든스트리트　  │ 숨겨진 용의 무덤2#l\r\n"
		level += "#b#L240040520#Lv.145 │ 미나르숲　　　  │ 망가진 용의 둥지#l\r\n"
		level += "#b#L270010500#Lv.148 │ 타임로드　　　  │ 추억의 길5#l\r\n"
		level += "#b#L240040521#Lv.150 │ 미나르숲　　　  │ 위험한 용의 둥지#l\r\n"
		level += "#b#L270020100#Lv.151 │ 타임로드　　　  │ 후회의 길1#l\r\n"
		level += "#b#L240091100#Lv.157 │ 콜로서스　　　  │ 벌떼의 서식지 1#l\r\n"
		level += "#b#L270030100#Lv.161 │ 타임로드　　　  │ 망각의 길1#l\r\n"
		level += "#b#L271010100#Lv.162 │ 파괴된 헤네시스 │ 파괴된 헤네시스 시장#l\r\n"
		level += "#b#L271020100#Lv.164 │ 파괴된 헤네시스 │ 음산한 콧노래 오솔길#l\r\n"
		level += "#b#L271010301#Lv.167 │ 파괴된 니은숲　 │ 수상한 언덕#l\r\n"
		level += "#b#L271030100#Lv.170 │ 기사단 요새　　 │ 기사단 제 1구역#l\r\n"
		level += "#b#L271030400#Lv.176 │ 기사단 요새　　 │ 기사단 제 4구역#l\r\n"
		level += "#b#L271030530#Lv.182 │ 기사단 요새　　 │ 기사의 전당4#l\r\n"
		level += "#b#L241000218#Lv.188 │ 킹덤로드　　　  │ 빙점의 숲2#l\r\n"
		level += "#b#L241000211#Lv.190 │ 킹덤로드　　　  │ 시작되는 비극의 숲5#l\r\n"
		level += "#b#L273060300#Lv.198 │ 황혼의 페리온　 │ 전사들의 결전지#l\r\n"
		level += "#b#L241000201#Lv.200 │ 킹덤로드	  │ 깊어지는 비극의 숲5#l\r\n"
		level += "#b#L241000216#Lv.200 │ 킹덤로드　　　  │ 타락한 마력의 숲1#l\r\n"
		level += "#b#L241000206#Lv.205 │ 킹덤로드　　　  │ 타락한 마력의 숲2#l\r\n"
		level += "#b#L241000226#Lv.210 │ 킹덤로드　　　  │ 타락한 마력의 숲3#l\r\n"
		level += "#b#L241000221#Lv.210 │ 킹덤로드　　　  │ 끝나지 않는 비극의 숲5#l\r\n"
		level += "#b#L105300203#Lv.218 │ 타락한 세계수　 │ 중하단 줄기 갈림길#l\r\n"
		level += "#b#L310070200#Lv.222 │ 스카이라인　　  │ 스카이라인 올라가는 길#l\r\n"
		level += "#b#L310070230#Lv.222 │ 스카이라인　　  │ 스카이라인2#l\r\n"
		level += "#b#L310070400#Lv.226 │ 블랙헤븐　　　  │ 블랙헤븐 교차로1#l\r\n"
		level += "#b#L105300301#Lv.228 │ 타락한 세계수　 │ 상단 줄기 갈림길#l\r\n"
		level += "#b#L310070470#Lv.230 │ 블랙헤븐　　　  │ 블랙헤븐 교차로3#l\r\n"
		level += "#b#L310070490#Lv.230 │ 블랙헤븐　　　  │ 블랙헤븐 내부 미로7#l\r\n"
		level += "#b#L450002006#Lv.240 │ 츄릅 포레스트　 │ 길쭉 동글숲1#l\r\n"
		level += "#b#L450002007#Lv.240 │ 츄릅 포레스트　 │ 길쭉 동글숲2#l\r\n"
		level += "#b#L450002008#Lv.240 │ 츄릅 포레스트　 │ 몽땅 동글숲1#l\r\n"
		level += "#b#L450002009#Lv.240 │ 츄릅 포레스트　 │ 몽땅 동글숲2#l\r\n"
	        level += "#b#L450003420#Lv.240,│ 레헬른　              | 본색을 드러내는 곳3#l\r\n"
                level += "#b#L450003310#Lv.240,│ 레헬른 야시장　 | 닭이 뛰노는 곳2#l\r\n"
                level += "#b#L450003500#Lv.240,│ 레헬른 시계탑　 | 악몽의 시계탑1층#l\r\n"
                level += "#b#L450003510#Lv.240,│ 레헬른 시계탑　 | 악몽의 시계탑2층#l\r\n"
		level += "#b#L450005430#Lv.245 │ 아르카나             │ 동굴 아랫길#l\r\n"
		level += "#b#L450005500#Lv.245 │ 아르카나             │ 다섯 갈래 동굴#l\r\n"
                level += "#b#L450006020#Lv.250,│ 모라스　              | 산호 숲으로 가는길#l\r\n"
                level += "#b#L450006310#Lv.250,│ 모라스　              | 폐쇄구역#l\r\n"
		cm.sendSimple(level);

         } else if (selection == 3) {
                var a = "#fn나눔고딕 Extrabold##r[알림]#k #h #님 원하시는 이벤트맵을 선택해주세요.#b\r\n#r다 올라가셨으면 #b'OOO 꽃 무더기'#r에게 말걸어주세요~^^#k\r\n";
                a += "#L109020001# OX퀴즈맵을 선택하겠습니다.\r\n"; 
                a += "#L910530201# 끈기의 숲(6단계)을(를) 선택하겠습니다.\r\n";
                a += "#L910130100# 인내의 숲(3단계)을(를) 선택하겠습니다.\r\n";
                a += "#L109040000# 고지를 향해서를 선택하겠습니다.\r\n";   
                a += "#L220000006# 루디 펫 산책로를 선택하겠습니다.\r\n"; 
                a += "#L100000202# 헤네 펫 산책로를 선택하겠습니다.\r\n"; 
                a += "#L180010002# 하얀 쉼터로를 선택하겠습니다.\r\n";   
                cm.sendSimple(a);



         } else if (selection == 4) {
	    cm.dispose();
	    cm.openNpc(2411024);

            } else if (selection == 7) {
            cm.warp(3000500, 0);
            cm.dispose();

	    } else if (selection == 8) {
	    cm.dispose();
	    cm.openNpc(9001061);


	    } else if (selection == 9) {
	    cm.dispose();
            cm.warp(100000001, 0);

	    } else if (selection == 10) {
	    cm.dispose();
	    cm.openNpc(2144013);



}   
        } else if (status == 2) {
		var s = selection;
		if(s >=100000000) {
		cm.dispose();
		cm.warp(s,0);
		}

            }	
	   	   
      }
}
    