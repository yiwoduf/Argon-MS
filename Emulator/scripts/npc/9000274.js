/*
     @Author ���ǵ���(kjun3753@nate.com)
*/

importPackage(java.util);
importPackage(java.lang);

var time = new Date();
var day = time.getDay();

/*
var d = day == 0 ? "�Ͽ��� " : 
    day == 1 ? "������ " :
    day == 2 ? "ȭ���� " :
    day == 3 ? "������ " :
    day == 4 ? "����� " :
    day == 5 ? "�ݿ��� " : "����� ";
*/

var year = time.getFullYear();
var month = time.getMonth() + 1;
var date = time.getDate();
var hour = time.getHours();
var min = time.getMinutes();
var sec = time.getSeconds();
var ��ý������ = 4033247;

var today = year+"�� "+month+"�� "+date+"�� "+hour+"�� "+min+"�� "+sec+"��";

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode,type,selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else
        status++;
    if (status == 0) {
        if (cm.getPlayer().getKeyValue("Check_Point") == null) {
            cm.getPlayer().setKeyValue("Check_Point","0");
        }
        if (cm.getPlayer().getKeyValue("Apink") == null) {
            cm.getPlayer().setKeyValue("Apink","0");
        }
        var chat = "#b�����ý��丮#k�� ���Ű��� ȯ���մϴ�.\r\n";
        chat += "\r\n#b#h ##k ���� �⼮ ����Ʈ : " + "#r" + cm.getPlayer().getKeyValue("Check_Point") + "#k";
        if (cm.getPlayer().getKeyValue("Check_Date") != null) {
            chat += "\r\n#b#h ##k ���� �⼮ ��Ȳ : " + "#r" + cm.getPlayer().getKeyValue("Check_Date") + "#k";
        }
        chat += "\r\n#b#h ##k ���� �⼮�� : " + "#r" + cm.getPlayer().getKeyValue("Apink") + "#k";
        if (cm.getPlayer().getKeyValue("Check_Time") != null) {
            if (getTime() > 0) {
                chat += "\r\n#b#h ##k ���� ���� �⼮ üũ�� �Ұ��� �մϴ�.";
            } else {
                chat += "\r\n#b#h ##k ���� ���� �⼮ üũ�� ���� �մϴ�."
            }
        }
        chat += "\r\n#b#L0#�⼮ üũ�� �Ѵ�.";
        cm.sendSimple(chat); 
    } else if (status == 1) {
        if (cm.getPlayer().getKeyValue("Check_Time") != null) {
            var time = getTime();
            var sec = time % 60;
            var total = (time - sec);
            var min = (total / 60) % 60;
            var hour = Math.floor((total - (sec + min)) / 3600);
            hour = hour % 24;
            sec = Math.floor(sec);
            var expiration = hour+"�ð� "+min+"�� "+sec+"��";
            if (time > 0) { 
                cm.sendOk("�⼮ üũ�� �Ϸ翡 �ѹ��� �����մϴ�.\r\n#r���� �ð� : " + expiration + "#k");
                cm.dispose();
            } else {
                cm.sendYesNo("������ �⼮üũ�� �Ͻðڽ��ϱ�?");
            }
        } else {
            cm.getPlayer().setKeyValue("Check_Time",(Long.parseLong(System.currentTimeMillis() + 1000 * 60 * 60 * 24)));
            cm.getPlayer().setKeyValue("Check_Date",today);
            cm.getPlayer().setKeyValue("Apink","1");
            cm.getPlayer().setKeyValue("Check_Point",(Integer.parseInt(cm.getPlayer().getKeyValue("Check_Point")) + 30) + "");
	    cm.getPlayer().gainItem(��ý������,1);
            cm.sendOk("#b" + today + "#k\r\n�⼮ üũ�� �Ϸ�Ǿ����ϴ�.\r\n" + "#b#h ##k ���� �̹��� ù���� �⼮ üũ �̽ñ��� ! �⼮üũ�� ó���� ��� Ư���� #b30����Ʈ#k�� ���� �帮�� �ִ�ϴ�.");
            cm.dispose();
        }
    } else if (status == 2) { 
        cm.getPlayer().setKeyValue("Check_Time",(Long.parseLong(System.currentTimeMillis() + 1000 * 60 * 60 * 24)));
        cm.getPlayer().setKeyValue("Check_Date",today);
        cm.getPlayer().setKeyValue("Apink",(Integer.parseInt(cm.getPlayer().getKeyValue("Apink")) + 1) + "");
        cm.getPlayer().setKeyValue("Check_Point",(Integer.parseInt(cm.getPlayer().getKeyValue("Check_Point")) + 10) + ""); 
        cm.sendOk("#b" + today + "#k\r\n�⼮ üũ�� �Ϸ�Ǿ����ϴ�. #r(����Ʈ + 10)#k");
        cm.dispose();
    }
}

function getTime() {
    var time = cm.getPlayer().getKeyValue("Check_Time");
    time -= System.currentTimeMillis(); // ����� �ð����� ����ð��� ���ش�
    time /= 1000; // ����ð��� ���� ������ �� 1000(1��)�� �����ش� 
    return time; // time�� ��ȯ�Ѵ�.
}