importPackage(java.lang);
var status = -1;
var point = 100000;
var damage = 1000000000;
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
        cm.sendSimple("#fs13# #d 안녕하세요 리플온라인 추가데미지를 담당하는 브론즈입니다 #fs13# #l\r\n #fn맑은고딕# #fs12# #g추가데미지란 21억이상의 데미지를 뚫고 무제한으로 데미지를 사는시스템입니다#l\r\n  #h #  #r님 보유 후원포인트 : " + cm.getPlayer().getRC() + "#L2##r\r\n\r\n\r\n\r\n" + damage + "추가 데미지를 후원포인트 " + point + "로 구매하기");
    } else if (status == 1) {
        if (Long.parseLong(cm.getPlayer().getKeyValue("maxdamage")!=null? cm.getPlayer().getKeyValue("maxdamage"):0)+damage > 999999000100000000)
            cm.sendOk("21억이 최대입니다.");
        else if (cm.getRC() > point) {
            cm.getPlayer().loseRC(point);
            cm.getPlayer().setKeyValue("maxdamage", Long.parseLong(cm.getPlayer().getKeyValue("maxdamage")!=null? cm.getPlayer().getKeyValue("maxdamage"):0)+damage);
            cm.sendOk("교환 완료");
        } else
            cm.sendOk("후원 포인트가 부족합니다");
    }
}