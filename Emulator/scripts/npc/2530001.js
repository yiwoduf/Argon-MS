var status = -1;

function start() {
	var vh = cm.itemQuantity(4033975);
	    if (vh >= 1){
		var sel = "#L1##b* 사진을 가저왔습니다.#k#l\r\n\r\n────────────────────────────\r\n";
		} else {
		sel = "#L0##r* 아직 사진을 발견하지 못하였어요.#k#l\r\n\r\n────────────────────────────\r\n";
}
	    var chat = "#fn나눔고딕 Extrabold#이 통로는.. 더 이상 막혀있어요..\r\n"
            chat += "하지만 저에게 #b열쇠#k 가 있답니다...\r\n";
            chat += "이 #b열쇠#k 를 드릴테니 저를 좀 도와주세요..\r\n";
            chat += "더 이상은 보지 못하는 저의 소중한 딸의 사진을\r\n";
            chat += "이 아래 사는.. #d광석 이터#k 가 가지고 가버렸어요..\r\n";
            chat += "많은 놈들중 어느 놈이 가지고 있는지는 모르겠지만..\r\n";
            chat += "저대신... 사진을 부디 찾아와주세요..\r\n";
	    chat += "────────────────────────────\r\n\r\n";
	    chat += "#i4033975# #b#z4033975##k　　　("+vh+"/1)\r\n\r\n";
	    chat += "────────────────────────────\r\n";
	    chat += ""+sel+"";
	    cm.sendSimple(chat);
}

function action(mode, type, selection) {
        cm.dispose();
	if (selection == 0) {
			 cm.sendOk("#fn나눔고딕 Extrabold##r얼른 사진을 가저다 주세요...#k");
		         cm.dispose();
	} else if (selection == 1) {
	    if (cm.haveItem(4033975, 1)) {
	       if (cm.canHold(4031217)) {
			 cm.gainItem(4033975, -1);
			 cm.gainItem(4031217, 1);
                         cm.sendOk("#fn나눔고딕 Extrabold#정말로 감사드려요!..\r\n약속대로 #b열쇠#k 를 드릴게요..\r\n\r\n#d(진행을 위해서 맵의 오른쪽 포탈로 이동해주세요.)#k");
			 cm.dispose();
		} else {		         
			 cm.sendOk("#fn나눔고딕 Extrabold##r기타 창을 한 칸 이상 비워주세요..#k");
		         cm.dispose();	
			}
	    } else {		         
		 cm.sendOk("#fn나눔고딕 Extrabold##r당신에게는 사진이 없네요..#k");
		 cm.dispose();	
		 }
}
}