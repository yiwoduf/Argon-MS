var status = 0;

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
		var jessica = "#fn나눔고딕 Extrabold#저희.. 페어리들의 보금자리에 오신 걸 환영해요..\r\n\r\n";
                if (cm.haveItem(4032801,1) && cm.haveItem(4033338,1) && cm.haveItem(4034075,1)) {
		jessica += "#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n#L2##d엘프들의 인정 받기..(완료 가능)#k\r\n";
                } else if (cm.haveItem(4034075,1)) {
		jessica += "#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n#L1##d엘프들의 인정 받기..(진행중)#k\r\n";
                } else {
		jessica += "#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n#L0##d엘프들의 인정 받기..(시작 가능)#k\r\n";
                }
		cm.sendSimple(jessica);
	} else if (status == 1) {
        if (selection == 0 ) {
	cm.sendNext("#fn나눔고딕 Extrabold#제가! #r탈레스#k 님의 #b가족 사진#k 이 어디있는지 알고있어요..\r\n단!, 항상.. 가는게 있어야.. 나에게도 오는게 있는법..\r\n저희 페어리들은 절대 손해보는 일을 하지 않지요.\r\n다만.. 저희 페어리들은 인간을 별로 좋아하지 않는답니다..\r\n적어도.. 저의 시종들은 당신을 별로 반가워 하지 않을거예요..\r\n일단! 저의 주변에 있는 시종들을 찾아가 도움을 주세요.\r\n도움을 주신 후 시종들에게 아이템을 받아오세요..");
        cm.gainItem(4034075, 1);
        cm.dispose();
        } else if (selection == 1 ) {
        cm.sendOk("#fn나눔고딕 Extrabold#얼른 가서.. 저희 페어리들의 인정을 받아오세요.");
        cm.dispose();
	} else if (selection == 2) {
               if(cm.haveItem(4032801,1) && cm.haveItem(4033338,1) && cm.haveItem(4034075,1)){
               cm.gainItem(4032801,-1);
               cm.gainItem(4033338,-1);
               cm.gainItem(4034075,-1);
               cm.warp(302090220);
               cm.sendOk("#fn나눔고딕 Extrabold#저의 페어리들에게 인정을 받으셨군요!..\r\n그럼 제가 아는 정보를 최대한 말씀 드리도록 하지요..\r\n방금.. 검은 그림자가 #b사진#k 같은 걸 가지고 이곳을 지나갔어요..\r\n더 이상의.. 정보는 없으니 #r아린#k 을 만나보세요!..");
               cm.dispose();
               } else {
               cm.sendOk("#fn나눔고딕 Extrabold##r당신은 아직.. 저희 페어리들의 인정을 받지 못하셨군요..#k");
               cm.dispose();
                }
}    
}
}
}