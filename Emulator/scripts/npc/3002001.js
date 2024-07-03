/*
    베스티아(beseutia@naver.com)님의 스크립트 파일입니다.
*/
var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
        cm.dispose();
    }
    
    if (status == 0) {
        if (mode == 0) {
            cm.dispose();
        } else {
            cm.sendGetText("#r#e[후포 10000 필요] #b공/마 200#k#n#k\r\n캐시아이템 두글자 이상 입력해주세요.");
        }
    } else if (status == 1) {
        var itemid = cm.getText();
        cm.SearchItem(itemid);        
    } else if (status == 2) {
        if (cm.getRC() >= 10000) {
            cm.sendOk("#i"+selection+"# #fs12##e#b#t"+selection+"##n#k#fs10#을(를) 획득하셧습니다.");
            cm.gainSponserItem(selection, 1, 0, 200, 0);
            cm.loseRC(10000);
            cm.dispose();
        } else {
            cm.sendOk("후원포인트가 부족합니다.");            
        }
    }
}