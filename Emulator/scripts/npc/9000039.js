
function start() {
 if (true) {
	    var chat = "안녕하세요 저는 #e#r퀘스트 요원 W#k#n 입니다!\r\n 원하시는 맵을 선택해주세요 \r\n";
	    //chat += "#L4##b[올라올라]고지를 향해서#k#e#r(난이도:★★★☆☆)#k#n\r\n";
            chat += "#L8##b#v3994115##e#Cyellow# =#k#n #e#r[NEW]#k 낚시 하기!#n";
chat += "\r\n#L10##v3994442# #e#r-#k#n #e#r[보스레이드]#k#r 무릉도장#k#n";
chat += "\r\n#L1##v3994442# #e#r-#k#n #e#r[보스레이드]#k#r 보스레이드 헬 모드 #k#n";
chat += "\r\n#L18##v3994118# #e#d-#k#n #e#r[던전]#k#d 해저의탑 <The Sid>#k#n";
chat += "\r\n#L77##b#v3994115##e#Cyellow# =#k#n #e#r[PVP]#k 서바이벌 PK <랭크전> #n";
chat += "\r\n#L78##b#v3994115##e#Cyellow# =#k#n #e#r[PVP]#k 늑대와 양 술래잡기 <랭크전> #n";
chat += "\r\n#L11##v3994116# #e#g-#k#n #e#r[겨울맞이]#k #g눈사람 잡기#k#n";
chat += "\r\n#L21##v3994118# #e#d-#k#n #e#r[전문기술]#k#d 연금술사의 방#k#n";
chat += "\r\n#L12##v3994116# #e#g-#k#n #e#r[대회]#k #g유물 이벤트 참여하기#k#n"; 
chat += "\r\n#L15##v3994118# #e#d-#k#n #e#r[퀘스트]#k#d 장난감 공장 4구역#k#n";
chat += "\r\n#L17##v3994116# #e#g-#k#n #e#r[이동]#k #g몬스터 파크#k#n";
chat += "\r\n#L9##v3994117# #e#b-#k#n #e#r[올라올라]#k#b 함정 통과 : 미니게임#k#n";	    
chat += "\r\n#L0##v3994117# #e#b-#k#n #e#r[올라올라]#k#b 화산의 숨결#k#n";
	    chat += "\r\n#L2##v3994118# #e#d-#k#n #e#r[올라올라]#k#d 인내의 숲#k#n";
	    chat += "\r\n#L3##v3994118# #e#d-#k#n #e#r[올라올라]#k#d 끈기의 숲#k#n";
            chat += "\r\n#L14##v3994116# #e#g-#k#n #e#r[이동]#k #g대박 보물창고#k#n";
            chat += "\r\n#L7##v3994115# #e#Cyellow#=#k#n #e#r[이동]#k 도박장#n";
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
    




