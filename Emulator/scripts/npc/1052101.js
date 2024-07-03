/*

그랜드스토리 프로젝트

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
        var choose = "#fn나눔고딕 ExtraBold##fs 16##e< 에이플러스 후원상점 >#n#k\r\n";
        choose += "#L4##fn나눔고딕 ExtraBold##fs 13##e#r[HOT]#k#b추뎀AND벅샷#k#n\r\n\r\n";
		choose += "#L5##fn나눔고딕 ExtraBold##fs 13##e#r[HOT]#n#e#b후원 강화[25성]#k#n\r\n\r\n";
        choose += "#L1##fn나눔고딕 ExtraBold##fs 13##b후원 상점(세트)#k\r\n\r\n";     
        choose += "#L9##b[New]후원 상점#k\r\n\r\n";    
        choose += "#L19##b[HOT]검색식 후원 상점#k\r\n\r\n";    
        choose += "#L2##b[New]후원 상점 (남자세트)#k\r\n\r\n";
        choose += "#L3##b[New]후원 상점 (여자세트)#k\r\n";

        if (cm.getPlayer().hasGmLevel(100)){

  }
        cm.sendSimple(choose);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.EnterCS
();
            cm.dispose();
 } else if (s == 1) {
  cm.openNpc (1032005);
   } else if (s == 5000003) {
  cm.openNpc (5000003);
     } else if (s == 9000344) {
  cm.openNpc (9000344);
 } else if (s == 2) {
  cm.openNpc (2400010);
 } else if (s == 3) {
  cm.openNpc (1032100);
 } else if (s == 4) {
  cm.openNpc (1081001);
 } else if (s == 5) {
  cm.openNpc (9010060);
 } else if (s == 9) {
  cm.openNpc (2030001);
 } else if (s == 1032206) {
  cm.openNpc (1032206);
 } else if (s == 19) {
  cm.openNpc (1094000);
        }
    }
}