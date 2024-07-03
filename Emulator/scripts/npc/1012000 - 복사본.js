var status = 0;
var select = -1;

var names = Array("피아누스의 동굴", "자쿰의 제단", "반 레온 알현실", "혼테일의 동굴", "신들의 황혼", "힐라의 탑", "아카이럼의 제단", "시그너스의 전당","폭군의 왕좌");
var boss = Array("피아누스","자쿰, 카오스 자쿰", "반 레온", "혼테일, 카오스 혼테일", "핑크빈", "힐라", "아카이럼", "타락한 시그너스", "매그너스");
var mid = Array("230040420","280030100", "211070100", "240060200", "270050100", "262031300", "272020200", "271040100", "401060100");
var m = -1;
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
	var chat = "안녕하세요~! #p1012000#입니다. 다른 곳으로 안전하고 빠르게 이동하고 싶으신가요? 그렇다면 고객 만족을 최우선으로 생각하는 #b#p1012000##k을 이용해 해보세요. 특별히 무료로! 원하시는 곳까지 친절하게 셔다 드리고 있습니다.\r\n";
	    chat += "#b#L1200#이 곳을 떠나 다른 곳으로 가고 싶습니다.#l\r\n";
	    cm.sendSimple(chat);


		
        } else if (status == 1) {
	if (selection == 9071003) {
	cm.dispose();
	cm.openNpc(selection);
	} else if (selection == 1200) {
	var warpmain = "#b#h ##k님 환영합니다~♬ 목적지를 선택해주세요.\r\n\r\n";
	warpmain += "#e#r[캐릭터 육성 관련 이동]#k#n";
	warpmain += "\r\n#L5##r단풍잎(코인)사냥터#b이동";
	//warpmain += "#L11##r보스#b 퇴치하러 가겠습니다#l\r\n";
	warpmain += "#L100##r앱솔랩스 코인#b 사냥터이동#l";
	warpmain += "\r\n\r\n\r\n#r#e[마을 관련 이동]#k#n";
	warpmain += "\r\n#L14##r다른마을#b로 가고싶습니다.#l";
	warpmain += "#L931000500##r재규어 헌터#b로 가겠습니다.#l";
	warpmain += "\r\n\r\n\r\n#r#e[게임 편의 이동]#k#n\r\n";
	warpmain += "#L15##b무릉도장(준비중)#b";
	warpmain += "#L10##bvip사냥터(준비중)#b";
	warpmain += "#L7##b길드의 전당#b";
	warpmain += "#L12##b미스틱게이트#b#l";
	warpmain += "\r\n\r\n#r#e[파티퀘스트 이동]#k#n\r\n";
	warpmain += "#L16##r[Lv120이상]#k#b파티퀘스트:탈출(준비중)#k";
	cm.sendSimple(warpmain);
	}else {
	cm.dispose();
}

	} else if (status == 2) {
           if (selection == 5) {
        if(cm.getPlayer().getLevel() > 199) {
	var hunt = "#b#h ##k님 환영합니다~♬ 사냥터를 선택해주세요.\r\n\r\n"
	hunt += "#r#e[레벨업 길라잡이]#k#n (몬스터 평균레벨, #b신규#k, #r인기 사냥터#k)\r\n";
	hunt += "#L100020100#(Lv.#Cgray#0#k13) │ #b버섯노래숲 　　　  #k │ #b콧노래 오솔길#k\r\n"
	hunt += "#L100040000#(Lv.#Cgray#0#k20) │ #r골렘사원 　　　　  #k │ #r골렘의 사원 입구#k\r\n"
	hunt += "#L101030300#(Lv.#Cgray#0#k20) │ #r북쪽숲　 　　　　  #k │ #r어린 나무숲#k\r\n"
	hunt += "#L101073000#(Lv.#Cgray#0#k35) │ #b요정학원　 　　　  #k │ #b양파재배밭#k\r\n"
	hunt += "#L120040300#(Lv.#Cgray#0#k35) │ #b골드비치　 　　　  #k │ #b해변가 풀숲3#k\r\n"
	hunt += "#L120041800#(Lv.#Cgray#0#k42) │ #b골드비치 　　　　  #k │ #b거친 파도#k\r\n"
	hunt += "#L103030300#(Lv.#Cgray#0#k46) │ #b늪지대 　　　　     #k │ #b보이지않는 위험#k\r\n"
	hunt += "#L103030400#(Lv.#Cgray#0#k49) │ #b늪지대 　　　　     #k │ #b깊은 수렁#k\r\n"
	hunt += "#L102040300#(Lv.#Cgray#0#k55) │ #r불타버린땅 　　　  #k │ #r와일드보어의 땅#k\r\n"
	hunt += "#L102040500#(Lv.#Cgray#0#k57) │ #b유적발굴지 　　　  #k │ #r폐쇄지역#k\r\n"
	hunt += "#L102030000#(Lv.#Cgray#0#k62) │ #b유적발굴지 　　　  #k │ #b발굴 중단지역#k\r\n"
	hunt += "#L105010300#(Lv.#Cgray#0#k65) │ #b어두운 동굴　　　  #k │ #b개미굴1#k\r\n"
	hunt += "#L105010000#(Lv.#Cgray#0#k66) │ #b습지　　　 　　　  #k │ #b조용한 습지#k\r\n"
	hunt += "#L200010300#(Lv.#Cgray#0#k71) │ #r스카이로드 　　　  #k │ #r하늘계단1#k\r\n"
	hunt += "#L105030500#(Lv.#Cgray#0#k75) │ #b저주받은신전 　    #k │ #b금지된 제단#k\r\n"
	hunt += "#L211040001#(Lv.#Cgray#0#k79) │ #r히든스트리트 　　  #k │ #r왕관을휘날리며#k\r\n"
	hunt += "#L230010400#(Lv.#Cgray#0#k83) │ #b아쿠아로드 　　    #k │ #b서족 바다 갈림길#k\r\n"
	hunt += "#L211040200#(Lv.#Cgray#0#k86) │ #b선셋로드 　　      #k │ #b얼음골짜기2#k\r\n"
	hunt += "#L260020600#(Lv.#Cgray#0#k90) │ #r선셋로드 　　　　  #k │ #r사헬지대2#k\r\n"
	hunt += "#L261020400#(Lv.#Cgray#0#k95) │ #r알카드노 연구소　  #k │ #r연구소 C-2 구역#k\r\n"
	hunt += "#L261010102#(Lv.#Cgray#0#k96) │ #b제뉴미스트 연구소  #k │ #b연구소 202호#k\r\n"
	hunt += "#L240010200#(Lv.104) │ #b미나르숲 　　　　  #k │ #b심술쟁이의 숲#k\r\n"
	hunt += "#L240020500#(Lv.110) │ #b미나르숲 　　　　  #k │ #b불과 물의 전장#k\r\n"
	hunt += "#L220010500#(Lv.112) │ #b루디브리엄성 　　  #k │ #b테라스홀#k\r\n"
	hunt += "#L220020600#(Lv.114) │ #r루디브리엄성 　　  #k │ #r장난감공장<기계실>#k\r\n"
	hunt += "#L401053001#(Lv.115) │ #r폭군의 성채　　　  #k │ #r폭군의 성채 3층#k\r\n"
	hunt += "#L220060201#(Lv.119) │ #r히든스트리트 　　  #k │ #r삐뚤어진 시간#k\r\n"
	hunt += "#L223020200#(Lv.123) │ #b판타스틱 테마파크  #k │ #b익스트림 스테이션#k\r\n"
	hunt += "#L250020000#(Lv.126) │ #b무릉사원 　　　 　 #k │ #b초급 수련장#k\r\n"
	hunt += "#L240030100#(Lv.128) │ #b미나르숲 　　　　  #k │ #b용의 숲1#k\r\n"
	hunt += "#L251010402#(Lv.131) │ #r무릉도원 　　　　  #k │ #r빨간코 해적단 소굴2#k\r\n"
	hunt += "#L240040400#(Lv.137) │ #b미나르숲 　　　　  #k │ #b와이번의 협곡#k\r\n"
	hunt += "#L270010500#(Lv.142) │ #b타임로드 　　　　  #k │ #b추억의 길5#k\r\n"
	hunt += "#L240040510#(Lv.150) │ #r미나르숲 　　　　  #k │ #r죽은 용의 둥지#k\r\n"
	hunt += "#L270020500#(Lv.156) │ #b타임로드 　　　　  #k │ #b후회의 길5#k\r\n"
	hunt += "#L271010000#(Lv.164) │ #b파괴된 헤네시스　  #k │ #b파괴된 헤네시스#k\r\n"
	hunt += "#L270030500#(Lv.167) │ #b타임로드 　　　　  #k │ #b망각의 길5#k\r\n"
	cm.sendSimple(hunt);
	} else {
	var hunt1 = "#b#h ##k님 환영합니다~♬ 사냥터를 선택해주세요.\r\n\r\n"
	hunt1 += "#r#e[레벨업 길라잡이]#k#n (몬스터 평균레벨, #b신규#k, #r인기 사냥터#k)\r\n";
	hunt1 += "#L100020100#(Lv.#Cgray#0#k13) │ #b버섯노래숲 　　　  #k │ #b콧노래 오솔길#k\r\n"
	hunt1 += "#L100040000#(Lv.#Cgray#0#k20) │ #r골렘사원 　　　　  #k │ #r골렘의 사원 입구#k\r\n"
	hunt1 += "#L101030300#(Lv.#Cgray#0#k20) │ #r북쪽숲　 　　　　  #k │ #r어린 나무숲#k\r\n"
	hunt1 += "#L101072600#(Lv.#Cgray#0#k35) │ #b요정학원　 　　　  #k │ #b3층 서재#k\r\n"
	hunt1 += "#L120040300#(Lv.#Cgray#0#k35) │ #b골드비치　 　　　  #k │ #b해변가 풀숲3#k\r\n"
	hunt1 += "#L120041800#(Lv.#Cgray#0#k42) │ #b골드비치 　　　　  #k │ #b거친 파도#k\r\n"
	hunt1 += "#L103030300#(Lv.#Cgray#0#k46) │ #b늪지대 　　　　    #k │ #b보이지않는 위험#k\r\n"
	hunt1 += "#L103030400#(Lv.#Cgray#0#k49) │ #b늪지대 　　　　    #k │ #b깊은 수렁#k\r\n"
	hunt1 += "#L102040300#(Lv.#Cgray#0#k55) │ #r불타버린땅 　　　  #k │ #r와일드보어의 땅#k\r\n"
	hunt1 += "#L102040500#(Lv.#Cgray#0#k57) │ #b유적발굴지 　　　  #k │ #r폐쇄지역#k\r\n"
	hunt1 += "#L102030000#(Lv.#Cgray#0#k62) │ #b유적발굴지 　　　  #k │ #b발굴 중단지역#k\r\n"
	hunt1 += "#L105010300#(Lv.#Cgray#0#k65) │ #b어두운 동굴　　　  #k │ #b개미굴1#k\r\n"
	hunt1 += "#L105010000#(Lv.#Cgray#0#k66) │ #b습지　　　 　　　  #k │ #b조용한 습지#k\r\n"
	hunt1 += "#L200010300#(Lv.#Cgray#0#k71) │ #r스카이로드 　　　  #k │ #r하늘계단1#k\r\n"
	hunt1 += "#L105030500#(Lv.#Cgray#0#k75) │ #b저주받은신전 　    #k │ #b금지된 제단#k\r\n"
	hunt1 += "#L211040001#(Lv.#Cgray#0#k79) │ #r히든스트리트 　　  #k │ #r왕관을휘날리며#k\r\n"
	hunt1 += "#L230010400#(Lv.#Cgray#0#k83) │ #b아쿠아로드 　　    #k │ #b서족 바다 갈림길#k\r\n"
	hunt1 += "#L211040200#(Lv.#Cgray#0#k86) │ #b선셋로드 　　      #k │ #b얼음골짜기2#k\r\n"
	hunt1 += "#L260020600#(Lv.#Cgray#0#k90) │ #r선셋로드 　　　　  #k │ #r사헬지대2#k\r\n"
	hunt1 += "#L261020400#(Lv.#Cgray#0#k95) │ #r알카드노 연구소　  #k │ #r연구소 C-2 구역#k\r\n"
	hunt1 += "#L261010102#(Lv.#Cgray#0#k96) │ #b제뉴미스트 연구소  #k │ #b연구소 202호#k\r\n"
	hunt1 += "#L240010200#(Lv.104) │ #b미나르숲 　　　　  #k │ #b심술쟁이의 숲#k\r\n"
	hunt1 += "#L240020500#(Lv.110) │ #b미나르숲 　　　　  #k │ #b불과 물의 전장#k\r\n"
	hunt1 += "#L220010500#(Lv.112) │ #b루디브리엄성 　　  #k │ #b테라스홀#k\r\n"
	hunt1 += "#L220020600#(Lv.114) │ #r루디브리엄성 　　  #k │ #r장난감공장<기계실>#k\r\n"
	hunt1 += "#L401053001#(Lv.115) │ #r폭군의 성채　　　  #k │ #r폭군의 성채 3층#k\r\n"
	hunt1 += "#L220060201#(Lv.119) │ #r히든스트리트 　　  #k │ #r삐뚤어진 시간#k\r\n"
	hunt1 += "#L223020200#(Lv.123) │ #b판타스틱 테마파크  #k │ #b익스트림 스테이션#k\r\n"
	hunt1 += "#L250020000#(Lv.126) │ #b무릉사원 　　　 　 #k │ #b초급 수련장#k\r\n"
	hunt1 += "#L240030100#(Lv.128) │ #b미나르숲 　　　　  #k │ #b용의 숲1#k\r\n"
	hunt1 += "#L251010402#(Lv.131) │ #r무릉도원 　　　　  #k │ #r빨간코 해적단 소굴2#k\r\n"
	hunt1 += "#L240040400#(Lv.137) │ #b미나르숲 　　　　  #k │ #b와이번의 협곡#k\r\n"
	hunt1 += "#L270010500#(Lv.142) │ #b타임로드 　　　　  #k │ #b추억의 길5#k\r\n"
	hunt1 += "#L240040510#(Lv.150) │ #r미나르숲 　　　　  #k │ #r죽은 용의 둥지#k\r\n"
	hunt1 += "#L270020500#(Lv.156) │ #b타임로드 　　　　  #k │ #b후회의 길5#k\r\n"
	hunt1 += "#L271010000#(Lv.164) │ #b파괴된 헤네시스　  #k │ #b파괴된 헤네시스#k\r\n"
	hunt1 += "#L270030500#(Lv.167) │ #b타임로드 　　　　  #k │ #b망각의 길5#k\r\n"
		cm.sendSimple(hunt1);
}
	} else if (selection == 7) {
	cm.dispose();
	cm.warp(200000301,0);
           } else if (selection == 9) {
                 cm.dispose();
                 cm.warp (940020000, 0);
            	} else if (selection == 12) {
            cm.dispose();
	    cm.openNpc (9070010);
	} else if (selection == 10) {
            cm.dispose();
	    cm.openNpc (9000213);
	} else if (selection == 11) {
            cm.dispose();
	    cm.openNpc (9010022);
	} else if (selection == 931000500) {
            cm.dispose();
	    cm.warp (931000500);;
	} else if (selection == 14) {
            cm.dispose();
	    cm.openNpc (3000012);
	} else if (selection == 15) {
	cm.dispose();
	cm.warp(925020000, 0);
	} else if (selection == 16) {
                 cm.dispose();
                 cm.warp (921160000, 0);
	} else if (selection == 17) {
            cm.dispose();
	    cm.openNpc (1530120);
	} else if (selection == 8) {
	var hunt = "#b#h ##k님 환영합니다~♬ 미션맵를 선택해주세요.\r\n\r\n"
	hunt += "#r#e[펫 산책로]\r\n#k#n";
	hunt += "#L100000202##b헤네시스#l";
	hunt += "#L220000006##b루디브리엄#l\r\n\r\n\r\n";
	hunt += "#r#e[인내의 숲]#k#n\r\n";
	hunt += "#L901030000##b1단계#l#e　 #n";
	hunt += "#L901030001##b2단계#l#e　 #n";
	hunt += "#L901030100##b3단계#l#e　 #n";
	hunt += "#L901030101##b4단계#l#e　 #n";
	hunt += "#L901030102##b5단계#l\r\n\r\n\r\n";
	cm.sendSimple(hunt);

	} else if (selection == 100) {
	var hunt = "#b#h ##k님 환영합니다~♬ 앱솔랩스 코인 사냥터 를 선택해주세요.\r\n\r\n"
	hunt += "#r#e[앱솔랩스 코인 사냥터]\r\n#k#n";
	hunt += "#L271030310#(Lv.173) │ #r기사단 요새　　　  #k │ #r무기고1#k\r\n"
	hunt += "#L271030400#(Lv.173) │ #r기사단 요새　　　  #k │ #r기사단 제 4구역#k\r\n"
	hunt += "#L273000000#(Lv.190) │ #b황혼의 페리온　　  #k │ #b황혼의 페리온#k\r\n"
	hunt += "#L273050000#(Lv.197) │ #r황혼의 페리온　　  #k │ #r원주민들의 피난처#k\r\n"
	hunt += "#L241020205#(Lv.203) │ #b크리티아스　　      #k │ #b비극의숲#k\r\n"
	hunt += "#L241020217#(Lv.205) │ #b크리티아스　　      #k │ #b빙점의숲#k\r\n"
	hunt += "#L241020207#(Lv.205) │ #b크리티아스　　      #k │ #b작열의숲#k\r\n"
	hunt += "#L241010227#(Lv.205) │ #b크리티아스　　      #k │ #b암흑의숲#k\r\n"
	hunt += "#L241010226#(Lv.205) │ #b크리티아스　　      #k │ #b마력의숲#k\r\n"
	hunt += "#L310070110#(Lv.210) │ #b기계무덤　　         #k │ #b기계무덤 언덕1#k\r\n"
	hunt += "#L310070150#(Lv.210) │ #b기계무덤　　         #k │ #b기계무덤 공터#k\r\n"
	hunt += "#L310070220#(Lv.215) │ #b스카이라인　　      #k │ #b 가장자리#k\r\n"
	hunt += "#L310070200#(Lv.215) │ #b스카이라인　　      #k │ #b 올라가는길#k\r\n"
	//hunt += "#L310070300#(Lv.222) │ #b블랙헤븐 갑판       #k │ #b 블랙헤븐 갑판 1#k\r\n"
	cm.sendSimple(hunt);

            } else if (selection == 6) {
 	var text = "보스와의 짜릿한 전투를 즐겨보시는 것은 어떠신지요? 높은 등급의 아이템을 획득할 수 있습니다.\r\n"; 
            for (var i = 0; i < names.length; text += "#L"+i+"##b"+names[i]+"#k <보스 : #r"+boss[i]+"#k>\r\n#l", i++); 
            cm.sendSimple(text);
	m = 1;
   }
	} else if (status == 3) {

	/* 사냥터 이동 시작*/
	var s = selection;
	if(s >=100000000) {
	cm.dispose();
	cm.warp(s,0);
	/* 사냥터 이동 끝 */

	/* 보스 이동 시작 */
	} else if (m == 1) {
	cm.sendNext("#r"+boss[selection]+"#k 보스를 잡기 위해 #b"+names[selection]+"#k으로 이동합니다. 이동을 원치 않으시면 ESC를 눌러 주세요.");
            map = mid[selection];
}
	  } else if (status == 4) {
            cm.warp(map, 0);
            cm.dispose();
		}
    	}
}