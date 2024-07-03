
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
	str += "#b#e #h #님의 현재 추가 데미지 : [ " + cm.getPlayer().getAddDamage() + " ]#n\r\n\r\n";
	str += "#b#e #h #님의 현재 후원 포인트 : [ "+cm.getRC()+" ]#n\r\n";
	str += "\r\n#L0# #r#i4310016# 1,000 후원 포인트로 #g추가데미지 천만 부여하기#k";
	str += "\r\n#L1# #r#i4310016# 2,000 후원 포인트로 #g추가데미지 1억만 부여하기#k";
	str += "\r\n#L2# #r#i4310016# 20,000 후원 포인트로 #g추가데미지 10억 부여하기#k";
	str += "\r\n#L3# #r#i4310016# 200,000 후원 포인트로 #g추가데미지 100억 부여하기#k";
	str += "\r\n#L4# #r#i4310016# 2,000,000 후원 포인트로 #g추가데미지 1000억 부여하기#k";
	cm.sendSimple(str);

    } else if (selection == 0) {
        if (cm.getPlayer().getAddDamage() > 999999000100000000) {
            cm.sendOk("21억이 최대입니다.");
            cm.dispose();
        } else if (cm.getRC() >= 1000) {
            cm.getPlayer().loseRC(1000);
            cm.getPlayer().gainAddDamage(10000000);
            cm.sendOk("교환 완료");
            cm.dispose();
        } else {
            cm.sendOk("후원 포인트가 부족합니다");
            cm.dispose();
        }



    } else if (selection == 1) {
        if (cm.getPlayer().getAddDamage() > 999999000100000000) {
            cm.sendOk("21억이 최대입니다.");
            cm.dispose();
        } else if (cm.getRC() >= 2000) {
            cm.getPlayer().loseRC(2000);
            cm.getPlayer().gainAddDamage(100000000);
            cm.sendOk("교환 완료");
            cm.dispose();
        } else {
            cm.sendOk("후원 포인트가 부족합니다");
            cm.dispose();
        }


    } else if (selection == 2) {
        if (cm.getPlayer().getAddDamage() > 999999000100000000) {
            cm.sendOk("21억이 최대입니다.");
            cm.dispose();
        } else if (cm.getRC() >= 20000) {
            cm.getPlayer().loseRC(20000);
            cm.getPlayer().gainAddDamage(1000000000);
            cm.sendOk("교환 완료");
            cm.dispose();
        } else {
            cm.sendOk("후원 포인트가 부족합니다");
            cm.dispose();
        }


    } else if (selection == 3) {
        if (cm.getPlayer().getAddDamage() > 999999000100000000) {
            cm.sendOk("21억이 최대입니다.");
            cm.dispose();
        } else if (cm.getRC() >= 200000) {
            cm.getPlayer().loseRC(200000);
            cm.getPlayer().gainAddDamage(10000000000);
            cm.sendOk("교환 완료");
            cm.dispose();
        } else {
            cm.sendOk("후원 포인트가 부족합니다");
            cm.dispose();
        }

    } else if (selection == 4) {
        if (cm.getPlayer().getAddDamage() > 999999000100000000) {
            cm.sendOk("21억이 최대입니다.");
            cm.dispose();
        } else if (cm.getRC() >= 2000000) {
            cm.getPlayer().loseRC(2000000);
            cm.getPlayer().gainAddDamage(100000000000);
            cm.sendOk("교환 완료");
            cm.dispose();
        } else {
            cm.sendOk("후원 포인트가 부족합니다");
            cm.dispose();
        }

    }
}
