/*
	����(leehodud302@naver.com)����  ��ũ��Ʈ �����Դϴ�.
*/
var status = -1;
 var itemlist = new Array();
function start() {
    status = -1;
    action(1, 0, 0);
}

//function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
        cm.dispose();
    }
    if (status == 0) {
        if (mode == 0)
            cm.dispose();
        else
            cm.sendGetText("#r#e[����ĳ�ð˻�]#n#k \r\n\r\nĳ�þ����� �α��� �̻� �Է����ּ���.");
    } else if (status == 1) {
        var itemid = cm.getText();
        cm.SearchItem(itemid);
    } else if (status == 2) {
        for (var i = 0; i < itemlist.length; i++) {
            if (selection == itemlist[i]) {
                cm.sendOk("�̾������� �Ŀ��� ȫ���� ���Ű������մϴ�.");
                cm.dispose();
                return;
            }
        }
        cm.sendOk("#i" + selection + "# #fs14##e#b#t" + selection + "##n#k#fs12#��(��) ȹ���ϼ̽��ϴ�.");
        cm.gainItem(selection, 1);
        cm.dispose();
    }
}