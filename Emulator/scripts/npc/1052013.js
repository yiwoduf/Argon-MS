
/*

	MapleStory 1.2.246 Varon Team Script Maker	Scripted By Varon Team :: MelnoK


	SCRIPT MAKER : �ٷ�

	NPC ID : 2491000

	NPC NAME : �ȳ���

*/

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
���� = 50; // �޼� ����� ĳ�� 1��?
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
    if (status == -1) {
       cm.dispose();
    }
    if (status == 0) {
        if(cm.getPlayer().getMeso() * ���� >= 2147483647) {
        �Ѱ� = 2147483647 / ����
        } else {
        �Ѱ� = cm.getPlayer().getMeso() / ����
        }
        cm.sendGetNumber("ĳ�������� �Ͻ÷� ���̱���!\r\n#r�����Ͻ� ĳ�� �ݾ��� ���� �ּ���#k\r\n���� #b"+����+" �޼�#k�� #b1 ĳ��#k�� ��ð� �ֽ��ϴ�!",1,1,�Ѱ�)
    } else if (status == 1) {
        cm.gainMeso(-selection * ����);
        cm.gainNX(selection);
        cm.dispose();
    } 
}
