/*


	���ǽþ��̵� : 

	���ǽ� �̸� : 

	���ǽð� �ִ� �� :  :  ()

	���ǽ� ���� : ��Ÿ�� ä������


*/
var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status--;
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        var text = ""
        text += "��Ÿ�� ���\r\n#b"
        if (cm.getPlayer().getGMLevel() > 0) {
            text += "#L0##i5121040# ������ �Ѹ���#l\r\n"
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        var text = ""
        text += "������ ������ �ڵ带 �Է��ϼ���.\r\n"
        cm.sendGetNumber(text, 0, 0, 9999999);
    } else if (status == 2) {
        var text = ""
        ItemId = selection;
        if (ItemId >= 1000000 && ItemId < 2000000) {
            text += "�Էµ� ������\r\n\r\n"
            text += "#i" + ItemId + "# #b#t" + ItemId + "##k\r\n\r\n"
            text += "���� ä���� �����鿡�� �����Ͻðڽ��ϱ�?"
            cm.sendYesNo(text);
        } else {
            text += "�Էµ� ������\r\n\r\n"
            text += "#i" + ItemId + "# #b#z" + ItemId + "##k\r\n\r\n"
            text += "�����Ͻ� ������ �Է��� �ּ���.\r\n"
            cm.sendGetNumber(text, 1, 1, 99);
        }
    } else if (status == 3) {
        var text = ""
        if (ItemId >= 1000000 && ItemId < 2000000) {
            var it = cm.getClient().getChannelServer().getPlayerStorage().getAllCharacters().values().iterator();
            while (it.hasNext()) {
                var chr = it.next();
                chr.gainItem(ItemId, 1, false, -1, "��Ÿ�� ����");
                chr.message(5, "��Ÿ�� �������� �����߽��ϴ�. �κ��丮�� Ȯ���� �ּ���!");
            }
            cm.dispose();
            return;
        } else {
            ItemQuantity = selection;
            text += "�Էµ� ������\r\n\r\n"
            text += "#i" + ItemId + "# #b#t" + ItemId + "##k "
            text += "(#b" + ItemQuantity + "#k��)\r\n\r\n"
            text += "���� ä���� �����鿡�� �����Ͻðڽ��ϱ�?"
            cm.sendYesNo(text);
        }
    } else if (status == 4) {
        var it = cm.getClient().getChannelServer().getPlayerStorage().getAllCharacters().values().iterator();
        while (it.hasNext()) {
            var chr = it.next();
            chr.gainItem(ItemId, ItemQuantity, false, -1, "��Ÿ�� ����");
            chr.message(5, "��Ÿ�� �Ӷ� �κ�Ȯ��");
        }
        cm.dispose();
    }
}