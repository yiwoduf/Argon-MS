
function start() {
 if (true) {
	    var chat = "#fn나눔고딕 Extrabold# 안녕하세요 저는 #e#rAURORA 요원 W#k#n 입니다!\r\n 원하시는 맵을 선택해주세요 \r\n";
	    //chat += "#L4##b[올라올라]고지를 향해서#k#e#r(난이도:★★★☆☆)#k#n\r\n";
chat += "\r\n#L77##b#v3994115##e#Cyellow# =#k#n #e#r[PVP]#k 디멘션 <랭크전> #n";
chat += "\r\n#L78##b#v3994115##e#Cyellow# =#k#n #e#r[PVP]#k 늑대와 양 술래잡기 <랭크전> #n";
chat += "\r\n#L21##v3994118# #e#d-#k#n #e#r[미니게임]#k#d 미니게임의 방#k#n";
chat += "\r\n#L17##v3994116# #e#g-#k#n #e#r[이동]#k #g몬스터 파크#k#n";
chat += "\r\n#L14##v3994116# #e#g-#k#n #e#r[이동]#k #g대박 폭업사냥터#k#n";
   	    cm.sendSimple(chat);
}
}
function action(mode, type, selection) {
cm.dispose();
        if (selection == 0) {
	cm.warp(280020000,0);
	cm.dispose();
	 } else if (selection == 1) {
	cm.warp(200080101,0);
	cm.dispose();
        } else if (selection == 2) {
	cm.warp(910130000,0);
	cm.dispose();
} else if (selection == 9) {
	cm.warp(301050300,0);
	cm.dispose();
 } else if (selection == 8) {
	cm.warp(141040000,0);
	cm.dispose();
	} else if (selection == 3) {
        cm.warp(910530000,0);
        cm.dispose();
} else if (selection == 7) {
        cm.warp(193000000);
        cm.dispose();
        } else if (selection == 4) {
        cm.warp(109040000,0);
        cm.dispose();
 } else if (selection == 10) {
        cm.warp(925020000,0);
        cm.dispose();
 } else if (selection == 11) {
        cm.warp(914100000,0);
        cm.dispose();
         } else if (selection == 18) {
        cm.warp(992000000,0);
        cm.dispose();
 } else if (selection == 21) {
        cm.warp(910002020,0);
        cm.getPlayer().Message(1, "★:::퀘스트 맵에 오신것을 환영합니다! 젠 엔피시를 클릭해주세요:::★");
        cm.dispose();
 } else if (selection == 15) {
        cm.warp(922030100,0);
        cm.getPlayer().Message(1, "★:::퀘스트 맵에 오신것을 환영합니다! 자하라 엔피시를 클릭해주세요:::★");
        cm.dispose();
         } else if (selection == 78) {
        cm.warp(109090000,0);
        cm.dispose();
 } else if (selection == 17) {
        cm.warp(951000000,0);
        cm.dispose();
 } else if (selection == 14) {
        cm.warp(951000100,0);
        cm.getPlayer().Message(1, "★:::나갈 때는 @광장쳐서 나가주세요~:::★");
        cm.dispose();
        } else if (selection == 12) {
	cm.dispose();
	cm.openNpc(9010026);
	     } else if (selection == 77) {
if(cm.getPlayerCount(940020000) < 20) {
cm.warp(940020000);
cm.dispose();
} else {
cm.sendOk("최대 8명까지 입장할수 있습니다. 다른채널로 가시거나 기다려주시길바랍니다.");
}
	}
	}
    




