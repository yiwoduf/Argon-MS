importPackage(java.lang);
var status = -1;
var point = 2000; // 후포
var point2 = 1500; // 환포
var damage = 10000000; //추가데미지 양
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    }
    if (mode == 0 || mode == -1) {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple("#fs13##d#fn나눔고딕 EXtrabold# 안녕하세요! AURORA ONLINE 추가데미지 구매 추가데미지란 21억이상의 데미지를 뚫고 무제한으로 데미지를 사는시스템입니다. 구매당  " + damage + "증가\r\n\r\n 현재 추가 데미지 : ("+cm.getPlayer().getAddDamage()+")#l#k\r\n\r\n#L3#환생포인트 " + point2 + "로 구매하기\r\n#l\r\n(현재 포인트 : "+cm.getPlayer().getGP()+")\r\n#r#L5#후원포인트 구매문의\r\n#r");
    } else if (status == 1) {
if (selection == 2) {
        if (cm.getPlayer().getAddDamage() + damage > 999999000100000000) {
            cm.sendOk("21억이 최대입니다.");
            cm.dispose();
        } else if (cm.getRC() > point) {
            cm.getPlayer().loseRC(point);
            cm.getPlayer().gainAddDamage(damage);
            cm.sendOk("교환 완료");
            cm.dispose();
        } else {
            cm.sendOk("후원 포인트가 부족합니다");
            cm.dispose();
        }
} else if (selection == 3) {
        if (cm.getPlayer().getAddDamage() + damage > 999999000100000000) {
            cm.sendOk("21억이 최대입니다.");
            cm.dispose();
        } else if (cm.getPlayer().getGP() > point2) {
            cm.getPlayer().gainGP(-point2);
            cm.getPlayer().gainAddDamage(damage);
            cm.sendOk("교환 완료");
            cm.dispose();
        } else {
            cm.sendOk("환생 포인트가 부족합니다");
cm.dispose();
        }
} else if (selection == 4) {
        if (Long.parseLong(cm.getPlayer().getKeyValue("maxdamage")!=null? cm.getPlayer().getKeyValue("maxdamage"):0)+damage > 999999000100000000) {
            cm.sendOk("21억이 최대입니다.");
cm.dispose();
        } else if (cm.haveItem(4310088,20)) { // 코인 코드와 갯수 입력.
            cm.gainItem(4310088,-20);
            cm.getPlayer().setKeyValue("maxdamage", Long.parseLong(cm.getPlayer().getKeyValue("maxdamage")!=null? cm.getPlayer().getKeyValue("maxdamage"):0)+damage);
            cm.sendOk("교환 완료");
cm.dispose();
        } else {
            cm.sendOk("홍코20개있는지 맞나요?");
cm.dispose();
        }
} else if (selection == 5) {
	cm.sendOk("카카오톡 : @오로라온라인 \r\n네이트온 : saracen_dev@nate.com");
	cm.dispose();
}
}
}