/*
    ����Ƽ��(beseutia@naver.com)���� ��ũ��Ʈ �����Դϴ�.
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
            cm.sendGetText("#r#e[���� 10000 �ʿ�] #b��/�� 200#k#n#k\r\nĳ�þ����� �α��� �̻� �Է����ּ���.");
        }
    } else if (status == 1) {
        var itemid = cm.getText();
        cm.SearchItem(itemid);        
    } else if (status == 2) {
        if (cm.getRC() >= 10000) {
            cm.sendOk("#i"+selection+"# #fs12##e#b#t"+selection+"##n#k#fs10#��(��) ȹ���ϼ˽��ϴ�.");
            cm.gainSponserItem(selection, 1, 0, 200, 0);
            cm.loseRC(10000);
            cm.dispose();
        } else {
            cm.sendOk("�Ŀ�����Ʈ�� �����մϴ�.");            
        }
    }
}