

var status = -1;
var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";

importPackage(Packages.constants);


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
if (cm.getPlayer().getLevel() >= 100) {
        cm.sendGetText("\r\n           #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" ������ ��Ų ���� "+��+"\r\n#fs10##Cgray#                                     ���Ͻô� �޴��� �������ּ���.#k\r\n\r\n#fs11##b������ ��Ų#k �� �ʿ��ϽŰ���?\r\n���Ÿ� ���ؼ��� #i4310175# #bM ����#k #r5 ��#k �� �ʿ��ϸ�\r\n#b������ ��Ų ����#k �� ���½� �������� #b������ ��Ų#k #r1 ��#k �� ���´�ϴ�.\r\n\r\n#i2434981# #fs12##b������ ��Ų ����#k �� #r�� ��#k �����Ͻǰǰ���?");
} else {
cm.sendOk("#fn������� Extrabold##r������ ��Ų ������ ���� 100 �̻� �̿� �����մϴ�.");
cm.dispose();
}
   } else if (status ==1) {
     text = cm.getText();
    if (text <= 0) {
     cm.sendOk("#fn������� Extrabold##r�ּ� ���� 1 �� �̻���� ���Ű� �����ϴ�ϴ�.#k");
     cm.dispose();
    } else {
if (cm.haveItem(4310175, cm.getText() * 5)) {
     if(cm.canHold(2434981)) {
     cm.gainItem(2434981, cm.getText());
     cm.gainItem(4310175, -cm.getText() * 5); 
     cm.sendOk("#fn������� Extrabold##i2434981# #b������ ��Ų ����#k #r"+cm.getText()+" ��#k �� ���� �Ϸ� �Ǿ����.");
    } else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ ���� �� ���ƿ�.#k");
	cm.dispose();
	}
            } else {
                cm.sendOk("#fn������� Extrabold##rM ������ ������ ������� Ȯ�����ּ���.#k");
                cm.dispose();
            }
    }
}
}
