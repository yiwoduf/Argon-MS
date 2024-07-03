/*

제작자 : ljw5992@naver.com / dbg_yeane@nate.com
기능 수정 : time_amd@nate.com

*/

 

var status = -1;

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
        var choose = "　　　　　　　　　　　　　#fUI/CashShop.img/CSEffect/new/0##fn나눔고딕 Extrabold##fs13#\r\n";
        choose += "　　　　　　#b < 쇼핑의 끝판 왕!! 상점시스템!! >#k\r\n\r\n";
        choose += "#L0##i5450010# #b캐시 상점#k";
        choose += "#L12##i2431938# #b파프 상점#k";
        choose += "#L2##i1902000# #b라이딩#k#l\r\n";
        choose += "\r\n───────────────────────────\r\n";
        choose += "#L3##i1352223# #r보조무기#l#k";
        choose += "#L4##i4310119# #r코인 상점#l#k";
	choose += "#L9##i4310015# #r증표 교환#l#k\r\n";
        choose += "\r\n───────────────────────────\r\n";
	choose += "#L5##i3010576# 잡화 상점#l#k";
	choose += "#L6##i4310016# 단추 상점#l#k";
	choose += "#L10##i4021019# 꿈의 돌#l#k\r\n";
        choose += "\r\n───────────────────────────\r\n";
        choose += "#L7##i5030034# #d후원 상점#k";
	choose += "#L11##i5030034# #d홍보 상점#k";	
        choose += "#L8##i2460005# #d검색 캐시#k#l\r\n";
        if (cm.getPlayer().hasGmLevel(6)){
        choose += "\r\n#l#k\r\n\r\n#d#e『 지 엠 시 스 템 』#n #r(운영자만 보이는 메뉴)#k\r\n";
        choose += "#e#d#L300#후원제작#k";
        choose += "#e#g#L301#복구제작#k";
        choose += "#e#r#L302#운영자맵#k";
        choose += "#e#b#L303#유저정보#k\r\n";
        choose += "#e#d#L304#닉변하기#k";
        choose += "#e#g#L305#총메세지#k";
        choose += "#e#r#L306#비번번경#K";
  }
        cm.sendSimple(choose);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.openCS();
            cm.dispose();
 } else if (s == 1) {
  cm.openNpc (1052013);
 } else if (s == 2) {
  cm.openNpc (2135002);
 } else if (s == 3) {
  cm.openShop (9072100);
 } else if (s == 4) {
  cm.openNpc (9072200); 
 } else if (s == 5) {
  cm.openShop (9000069); 
 } else if (s == 6) {
  cm.openNpc (9000041);
 } else if (s == 7) {
  cm.openNpc (2084001);
 } else if (s == 8) {
  cm.openNpc (9000217);
 } else if (s == 9) {
  cm.openNpc (9070001); 
 } else if (s == 10) {
  cm.openNpc (1512000); 
 } else if (s == 11) {
  cm.openNpc (9001127); 
 } else if (s == 12) {
  cm.openNpc (9001121); 
 } else if (s == 13) {
cm.warp (262000300, 0); 
 } else if (s == 14) {
  cm.openNpc (9000131);
 } else if (s == 15) {
  cm.openNpc (9073008);
 } else if (s == 2001) {
  cm.openNpc (1033210);
 } else if (s == 16) {
  cm.openNpc (22000);
 } else if (s == 17) {
  cm.openNpc (2010011);
 } else if (s == 18) {
  cm.openNpc (9071003);
 } else if (s == 20) {
  cm.openNpc (1012009);
 } else if (s == 21) {
  cm.openNpc (1063016);
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
 } else if (s == 2000) {
cm.openNpc (9000143);
 } else if (s == 29) {
  cm.openNpc (9072200);  
 } else if (s == 30) {
  cm.openNpc (9010022);
 } else if (s == 31) {
  cm.openNpc (9000158);
 } else if (s == 32) {
  cm.openNpc (2530009);
 } else if (s == 34) {
  cm.openNpc(2101014);
 } else if (s == 35) {
  cm.openNpc(2159415);                 
 } else if (s == 36) {
  cm.openNpc (1032101);
 } else if (s == 80) {
  cm.openNpc (1104313); 
 } else if (s == 81) {
  cm.openNpc (2300000); 
 } else if (s == 82) {
  cm.openNpc (9000155); 
 } else if (s == 83) {
  cm.openNpc (2191005);  
 } else if (s == 84) {
  cm.openNpc (9040011);
 } else if (s == 85) {
  cm.openNpc (1094000);
 } else if (s == 86) {
  cm.openNpc (2040052);
 } else if (s == 87) {
  cm.openNpc (3001108);
 } else if (s == 89) {
  cm.openNpc (2192002); 
 } else if (s == 90) {
  cm.openNpc (1012121); 
 } else if (s == 92) {
  cm.openNpc (9050009);
 } else if (s == 93) {
  cm.openNpc (9050009);
 } else if (s == 94) {
  cm.openNpc (1032201);
 } else if (s == 100) {
cm.warp (109090000, 0);
 } else if (s == 101) {
  cm.openNpc (9000100);
 } else if (s == 102) {
cm.warp (100000002, 0);
 } else if (s == 103) {
  cm.openNpc (1012006);
 } else if (s == 104) {
  cm.openNpc (3001108);
 } else if (s == 105) {
  cm.openNpc (2180000);
 } else if (s == 106) {
cm.warp (101000100, 0);
 } else if (s == 107) {
  cm.warp(105200000, 0);
 } else if (s == 108) {
cm.warp (910028300, 0);
 } else if (s == 109) {
  cm.openNpc (22000);
 } else if (s == 110) {
  cm.openNpc (1012115);
 } else if (s == 111) {
  cm.openNpc (1012107);
 } else if (s == 112) {
  cm.openNpc (2040029);
 } else if (s == 113) {
  cm.openNpc (2142001);
 } else if (s == 114) {
  cm.openNpc (9072200);
 } else if (s == 115) {
  cm.openNpc (2041022);
 } else if (s == 116) {
cm.warp(931000500, 0);
 } else if (s == 117) {
  cm.openNpc (2084000);
 } else if (s == 118) {
  cm.openNpc (9900003);
 } else if (s == 130) {
  cm.openNpc (2131002);
 } else if (s == 200) {
  cm.openNpc(1033105);
 } else if (s == 201) {
  cm.openNpc(1002003);
 } else if (s == 202) {
  cm.openNpc(12101);
 } else if (s == 203) {
  cm.openNpc(9310001);
 } else if (s == 204) {
  cm.openNpc(9250022);
} else if (s == 205) {
  cm.openNpc(9010008);
} else if (s == 206) {
  cm.openNpc(9072101);
 } else if (s == 300) {
  cm.openNpc(3000107);
 } else if (s == 301) {
  cm.openNpc(9090008);
 } else if (s == 302) {
cm.warp (180000000, 0);
 } else if (s == 303) {
  cm.openNpc(2470044);
 } else if (s == 304) {
  cm.openNpc(9201022);
 } else if (s == 305) {
  cm.openNpc(9010017);
 } else if (s == 306) {
  cm.openNpc(9250009);
 } else if (s == 9999){
  cm.openNpc(1052013);
 } else if (s == 19999){
  cm.openNpc(9076004);
 } else if (s == 5555){
  cm.openShop(6784); 
 } else if (s == 5556){
  cm.openShop(10651);
 } else if (s == 5557){
  cm.openShop(9020004);
 } else if (s == 1541) {
  cm.openNpc(9072201);
        }
    }
}
