/*
	����(leehodud302@naver.com)����  ��ũ��Ʈ �����Դϴ�.
*/
var status = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
        cm.dispose();
    }
    if (status == 0) {
        var chat = "#r#e" + cm.getPlayer().getName() + "#n#k, �������� �ͳ�?#l\r\n";
        chat += "#b#L1##e�ھ� �������� ����� ���հ��ݷ��� ��ȭ�Ѵ�.#k#l\r\n";        
        cm.sendSimple(chat);
    } else if (status == 1) {
        slot = selection;
        sel = selection == 0 ? "�ý���" : "���ݷ�/����";
        var itemid = 0;
        text = "#b#e���հ�ȭ#n#k�� ���� �ϼ˽��ϴ�.\r\n��ȭ�� �������� ���� �� �ּ���.\r\n";
        for (i = 0; i < 101; i++) {
            if (cm.getEquip(i)) {
                itemid = cm.getEquip(i).getItemId();
		text += "\r\n#L"+i+"##b#i"+itemid+"##t"+itemid+"##k";
            }
        }
        cm.sendSimple(text);
    } else if (status == 2) {
        eq = cm.getEquip(selection);
        if (!cm.haveItem(2435719, 1)) {
            cm.sendOk("��ȭ�� �ʿ��� �ھ� �������� �����մϴ�.");
            cm.dispose();
            return;
        }
        cm.sendYesNo("������ ���� : ���հ��ݷ�\r\n���� ��ȭ�� �ö󰥶� ����Ȯ���� ������\r\n��ġ�� ������ +5% �� �߰��˴ϴ�.\r\n��ȭ�� ���� �Ͻðڽ��ϱ�?");
    } else if (status == 3) {
        cm.gainItem(2435719, -1);
        eq.setAllDamageP(eq.getAllDamageP() + 5);
	cm.fakeRelog();
	cm.updateChar();
	cm.sendOk("��ȭ�� �����Ͽ� ������ 5%�� �߰��Ǿ����ϴ�."); 
        cm.dispose();
    }
}