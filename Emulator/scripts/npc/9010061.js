/*

제작자 : 타임 (time_amd@nate.com)

*/

 

var status = -1;
var time = "#fUI/UIToolTip/Item/Equip/Star/Star#"
function start() {
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
        /*
        상점 셀렉션은 0부터 99까지
        이동 셀렉션은 100부터 199까지
        컨텐츠 셀렉션은 200부터 299까지
        운영자 설렉션은 300부터 399까지
        */
        var choose = "#k#e#d《《『 상 점 시 스 템 』》》#k#n\r\n";
        choose += "#e#r#L9999#"+time+""+time+""+time+""+time+""+time+""+time+" GM모자 상점 "+time+""+time+""+time+""+time+""+time+""+time+"#k#n\r\n";
        choose += "#d#L0#"+time+" 캐시상점#k";
        choose += "#g#L1#"+time+" 캐시충전#k";
        choose += "#r#L2#"+time+" 만능상점#k";
        choose += "#b#L10#"+time+" 초기지원#k";
        choose += "#d#L11#"+time+" 컨텐츠샵#k";
        choose += "#g#L12#"+time+" 돌림판샵#k";
        choose += "#r#L3#"+time+" 후원상점#k";
        choose += "#b#L4#"+time+" 최신캐쉬#k";
        choose += "#d#L35#"+time+" 최신캐시#k";
        choose += "#g#L7#"+time+" 어빌리티#k";
        choose += "#r#L8#"+time+" 라이딩샵#k";
        choose += "#b#L32#"+time+" 주문서샵#k";
        choose += "#d#L19#"+time+" 뎀지스킨#k";
        choose += "#g#L29#"+time+" 편의상점#k";
        choose += "#r#L16#"+time+" 보조무기#k";
        choose += "#b#L5#"+time+" 펫교환샵#k";
        choose += "#d#L20#"+time+" 창고지기#k";
        choose += "#g#L6#"+time+" 이벤트샵#k";
        choose += "#r#L17#"+time+" 의자상점#k";
        choose += "#b#L30#"+time+" 코인상점#k";
        choose += "#d#L31#"+time+" 펫아이템#k";
        choose += "#g#L33#"+time+" 고렙상점#k";
        choose += "#r#L34#"+time+" 포션상점#k";
        choose += "#b#L36#"+time+" 건의상점#k";
        choose += "#d#L37#"+time+" 예전상점#k";
        choose += "#g#L38#"+time+" 모루상점#k";
        choose += "#r#L39#"+time+" 컨텐상점#k";
        choose += "#b#L40#"+time+" 낚시상점#k";
        choose += "#b#L41#"+time+" NEW 10주년상점#k#n\r\n";
        choose += "#e#r#L42#"+time+""+time+""+time+""+time+""+time+""+time+" 크리스마스 상점 "+time+""+time+""+time+""+time+""+time+""+time+"#k#n\r\n";       


        
        choose += "\r\n\r\n\r\n#k#n#e#b《《『 이 동 시 스 템 』》》#k#n\r\n";
        choose += "#d#L100#"+time+" 만능이동#k";
        choose += "#g#L101#"+time+" 눈송사냥#k";
        choose += "#r#L102#"+time+" 단풍사냥#k";
        choose += "#b#L103#"+time+" 황단사냥#k";
        choose += "#d#L104#"+time+" 메소사냥#k";
        choose += "#g#L105#"+time+" 보스깨기#k";
        choose += "#r#L106#"+time+" 작방가기#k";
        choose += "#b#L116#"+time+" 재규어맵#k";
        choose += "#d#L119#"+time+" 길드업무#k";
        choose += "#g#L120#"+time+" 놀이방일#k";
        choose += "#r#L121#"+time+" 놀이방이#k";
        choose += "#b#L108#"+time+" 추억의맵#k";
        choose += "#b#L107#"+time+" 컨텐츠 시스템#k";
        choose += "\r\n\r\n\r\n#k#n#e#r《《『 편 의 시 스 템 』》》#k#n\r\n";
        choose += "#d#L130#"+time+" 초월강화#k";
        choose += "#g#L9#"+time+" 스킬학습#k";
        choose += "#d#L86#"+time+" 환생하기#k";
        choose += "#r#L81#"+time+" 성형헤어#k";
        choose += "#d#L110#"+time+" 출석체크#k";
        choose += "#g#L89#"+time+" 서버랭킹#k";
        choose += "#r#L208#"+time+" 옵초기화#k";
        choose += "#b#L90#"+time+" 템버리기#k";
        choose += "#g#L201#"+time+" 친구확장#k";
        choose += "#r#L202#"+time+" 전구제거#k";
        choose += "#b#L203#"+time+" 선물하기#k";
        choose += "#d#L204#"+time+" 로또복권#k";
        choose += "#g#L205#"+time+" 무한강화#k";
        choose += "#r#L207#"+time+" 브금변경#k";
        choose += "#b#L206#"+time+" 장래희망#k";
        choose += "#d#L209#"+time+" 엔버성형#k";
        choose += "#d#L210#"+time+" 안드성형#k";
        choose += "#g#L211#"+time+" 팅맵해제#k";
        choose += "#g#L212#"+time+" 랭킹보기#k";
        if (cm.getPlayer().hasGmLevel(6)){
        choose += "\r\n\r\n\r\n#k#n#e《《『 지 엠 시 스 템 』》》#k#n #r(운영자만 보이는 메뉴)#k#n\r\n";
        choose += "#d#L300#"+time+" 후원제작#k";
        choose += "#g#L301#"+time+" 복구제작#k";
        choose += "#r#L302#"+time+" 운영자맵#k";
        choose += "#b#L303#"+time+" 유저정보#k\r\n";
        choose += "#d#L304#"+time+" 이름변경#k";
        choose += "#g#L305#"+time+" 서버변경#k";
        choose += "#r#L306#"+time+" 비번변경#K";
        choose += "#b#L307#"+time+" 모두소환#K";
        choose += "#d#L308#"+time+" 팅맵해제#K";
        choose += "#g#L309#"+time+" 코드이동#k";
        choose += "#r#L310#"+time+" 코드버프#k";
        
  }
        cm.sendSimple(choose);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.EnterCS();
            cm.dispose();
 } else if (s == 1) {
  cm.openNpc (2084006);
 } else if (s == 2) {
  cm.openNpc (9000185);
 } else if (s == 3) {
  cm.openNpc (9001003);
 } else if (s == 4) {
  cm.openShop (1530001); 
 } else if (s == 5) {
  cm.openNpc (1040001); 
 } else if (s == 6) {
  cm.openNpc (2008);
 } else if (s == 7) {
  cm.openNpc (9201020);
 } else if (s == 8) {
  cm.openNpc (1103002);
 } else if (s == 9) {
  cm.openNpc (1012117);
 } else if (s == 10) {
  cm.openNpc (9062000); 
 } else if (s == 11) {
  cm.openNpc (9075302); 
 } else if (s == 12) {
  cm.openNpc (9000155); 
 } else if (s == 13) {
cm.warp (262000300, 0); 
 } else if (s == 14) {
  cm.openNpc (9000131);
 } else if (s == 15) {
  cm.openNpc (9073008);
 } else if (s == 16) {
  cm.openNpc (9000143);
 } else if (s == 17) {
  cm.openShop (2400004); //9390013
 } else if (s == 19) {
  cm.openNpc(1033105);
 } else if (s == 20) {
  cm.openNpc (1012009);
 } else if (s == 22) {
cm.warp (271000000, 0);
 } else if (s == 23) {
cm.warp (270000000, 0);
 } else if (s == 24) {
  cm.warp(100000001, 0);
 } else if (s == 25) {
cm.warp (910000000, 0);
 } else if (s == 26) {
  cm.openNpc (1063016);
 } else if (s == 27) {
cm.warp (109090000, 0);
 } else if (s == 28) {
cm.warp (910530000, 0);
 } else if (s == 29) {
  cm.openNpc (9000159);  
 } else if (s == 30) {
  cm.openShop (113322);
 } else if (s == 31) {
  cm.openNpc (9000178);  
 } else if (s == 32) {
  cm.openShop (9201007);
 } else if (s == 33) {
  cm.openNpc (9072201);
 } else if (s == 34) {
  cm.openShop (9020004);
 } else if (s == 35) {
  cm.openNpc(1103001);
 } else if (s == 36) {
  cm.openNpc(11000);
  } else if (s == 38) {
  cm.openShop(1002100); 
  } else if (s == 39) {
  cm.openNpc(9075302); 
 } else if (s == 40) {
  cm.openNpc(1530013);
 } else if (s == 41) {
  cm.openShop(9300014); 
 } else if (s == 42) {
  cm.openNpc(9072301); 
 } else if (s == 37) {
  cm.openNpc(2411026);                 
 } else if (s == 80) {
  cm.openNpc (1104313); 
 } else if (s == 81) {
  cm.openNpc (1540011); 
 } else if (s == 83) {
  cm.openNpc (3001011);  
 } else if (s == 84) {
  cm.openNpc (2102002);
 } else if (s == 85) {
  cm.openNpc (1094000);
 } else if (s == 86) {
  cm.openNpc (2142930);
 } else if (s == 87) {
  cm.openNpc (3001108);
 } else if (s == 89) {
  cm.openNpc (1530210); 
 } else if (s == 90) {
  cm.openNpc (1012121); 
 } else if (s == 92) {
  cm.openNpc (9050009);
 } else if (s == 93) {
  cm.openNpc (9050009);
 } else if (s == 94) {
  cm.openNpc (1032201);
 } else if (s == 100) {
  cm.openNpc (9000019); 
 } else if (s == 101) {
  cm.openNpc (9000158);
 } else if (s == 102) {
  cm.warp (910160000);
 } else if (s == 103) {
  cm.warp (100010001);
 } else if (s == 104) {
  cm.warp (910170000);
 } else if (s == 105) {
  cm.openNpc (2460023);
 } else if (s == 106) {
cm.warp (100000003, 0);
 } else if (s == 107) {
  cm.openNpc(2540017);
 } else if (s == 108) {
  cm.openNpc(9001000);
 } else if (s == 109) {
  cm.openNpc (22000);
 } else if (s == 110) {
  cm.openNpc (9000274);
 } else if (s == 111) {
  cm.openNpc (1012107);
 } else if (s == 112) {
  cm.openNpc (1032200);
 } else if (s == 113) {
  cm.openNpc (2142001);
 } else if (s == 114) {
  cm.openNpc (9072200);
 } else if (s == 115) {
  cm.openNpc (2041022);
 } else if (s == 116) {
cm.warp(931000500, 0);
 } else if (s == 118) {
  cm.openNpc (9900003);
 } else if (s == 119) {
cm.openNpc (2010011);
 } else if (s == 120) {
cm.warp (169696969);
 } else if (s == 121) {
cm.warp (910000000);
 } else if (s == 130) {
  cm.openNpc (1052125);
 } else if (s == 200) {
  cm.openNpc(2040028);
 } else if (s == 201) {
  cm.openNpc(1002003);
 } else if (s == 202) {
  cm.openNpc(12101);
 } else if (s == 203) {
  cm.openNpc(9310001);
 } else if (s == 204) {
  cm.openNpc(9250022);
 } else if (s == 205) {
  cm.openNpc(1032201);
 } else if (s == 206) {
  cm.openNpc(9900002);
 } else if (s == 207) {
  cm.openNpc(1081001);
 } else if (s == 208) {
  cm.openNpc (2084000);
 } else if (s == 209) {
  cm.openNpc (1540419);
 } else if (s == 210) {
  cm.openNpc (1012123);
 } else if (s == 211) {
  cm.openNpc (9001050);
 } else if (s == 212) {
  cm.openNpc (1530210);
 } else if (s == 300) {
  cm.openNpc(3000107);
 } else if (s == 301) {
  cm.openNpc(9090008);
 } else if (s == 302) {
cm.warp (100000034, 0);
 } else if (s == 303) {
  cm.openNpc(2470044);
 } else if (s == 304) {
  cm.openNpc(9201022);
 } else if (s == 305) {
  cm.openNpc(9010017);
 } else if (s == 306) {
  cm.openNpc(9250009);
 } else if (s == 307) {
  cm.openNpc(9010044);
 } else if (s == 308) {
  cm.openNpc(1012002);
 } else if (s == 309) {
  cm.openNpc(9000143);
 } else if (s == 310) {
  cm.openNpc(1402301);
 } else if (s == 311) {
  cm.openNpc(9900001);
 } else if (s == 9999) {
  cm.openNpc(9390013);

        }
    }
}
