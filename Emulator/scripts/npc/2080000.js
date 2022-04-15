
importPackage(java.util);
importPackage(java.lang);
importPackage(Packages.tools);


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	GM시아 에 의해 만들어 졌습니다.

	엔피시아이디 : 1011100

	엔피시 이름 : 루나

	엔피시가 있는 맵 : 헤네시스 : 헤네시스잡화상점 (100000102)

	엔피시 설명 : 잡화 상인


*/

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
	var str = "안녕하세요 #h #님 저는 오로라 온라인에 추가데미지 부여 엔피시입니다\r\n";
	str += "#b#e #h #님의 현재 추가 데미지 : [ " + cm.getPlayer().getAddDamage() + " ]#n#k입니다\r\n\r\n";
	str += "#L1# #b#i4310129# #z4310129# 30개로 추가데미지 천만 부여하기#k - 소지중인 갯수 ("+cm.itemQuantity(4310129)+")";
	str += "\r\n#L2# #b#i4310129# #z4310129# 60개로 추가데미지 2천만 부여하기#k - 소지중인 갯수 ("+cm.itemQuantity(4310129)+")";
	str += "\r\n#L3# #b#i4310129# #z4310129# 90개로 추가데미지 3천만 부여하기#k - 소지중인 갯수 ("+cm.itemQuantity(4310129)+")";
	cm.sendSimple(str);
    } else if (selection == 1) {

         if (cm.itemQuantity(4310129) > 30) {
	cm.gainItem(4310129, -30);
	cm.getPlayer().gainAddDamage(10000000);
	cm.sendOk("추가데미지를 구입해주셔서 감사합니다.");
	cm.dispose();
	}

	else{
	cm.sendOk("홍보코인의 갯수가 부족합니다.\r\n31개 이상 있어야지 구입 가능합니다.");
	}

    } else if (selection == 2) {

         if (cm.itemQuantity(4310129) > 60) {
	cm.gainItem(4310129, -60);
	cm.getPlayer().gainAddDamage(20000000);
	cm.sendOk("추가데미지를 구입해주셔서 감사합니다.");
	cm.dispose();
	}

	else{
	cm.sendOk("홍보코인의 갯수가 부족합니다.\r\n61개 이상 있어야지 구입 가능합니다.");
	}

    } else if (selection == 3) {

         if (cm.itemQuantity(4310129) > 90) {
	cm.gainItem(4310129, -90);
	cm.getPlayer().gainAddDamage(30000000);
	cm.sendOk("추가데미지를 구입해주셔서 감사합니다.\r\n91개 이상 있어야지 구입 가능합니다.");
	cm.dispose();
	}

	else{
	cm.sendOk("홍보코인의 갯수가 부족합니다.");
	}

    }
}
