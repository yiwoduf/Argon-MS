/*

    퓨어 소스 팩의 스크립트 입니다. (제작 : 엑시즈)

    엔피시아이디 : ?
    
    엔피시 이름 : 메이플 운영자

    엔피시가 있는 맵 : ?

    엔피시 설명 : 큐브조각 교환


*/
var status;
var select;
var sel = 0;

function start() {
    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
    return;
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var text = "#b#t2431894# #r#c2431894#개#k를 가지고 있습니다. 에디셔널 잠재능력 부여 주문서는 #r20개#k 마스터 에디셔널 미라클 큐브는 #r30개#k가 필요합니다.\r\n";
                text += "#b#L2048307##i2048307# #z2048307##l\r\n";
		text += "#b#L5062500##i5062500# #z5062500##l\r\n";
           	cm.sendSimple(text);
        } else if(status == 1) {
		sel = selection;
		cm.sendYesNo("정말로 #b#z" + sel + "##k로 교환 하시겠습니까?");
	} else if (status == 2) {
		if (!cm.haveItem(2431894, (sel == 2048307 ? 20 : 30))) {
			cm.sendOk("선택하신 아이템으로 교환하기에는 #z" + 2431894 + "#이 부족 합니다.");
			cm.dispose();
			return;
		}
		if (cm.canHold(sel)) {
			cm.gainItem(2431894, -(sel == 2048307 ? 20 : 30));
			cm.gainItem(sel,1);
			cm.sendOk("선택하신 아이템으로 교환이 완료 되었습니다.");
			cm.dispose();
		} else {
			cm.sendOk("인벤토리에 공간이 부족 합니다.");
			cm.dispose();
			return;
		}
        } else { 
            cm.dispose();
	    return;
        }
    }
}
