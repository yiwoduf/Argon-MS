


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	�Ʒ� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 1512003

	���ǽ� �̸� : �Ʊ� �����Ʈ

	���ǽð� �ִ� �� : ������ ���� : ���� �ٹٶ��� �� (141040000)

	���ǽ� ���� : MISSINGNO


*/

var status = -1;

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
        var str = "#b#h0##k�� �ȳ��ϼ��� ���ζ� ���� ���� �����Դϴ�.\r\n���Ÿ� ���Ͻô� ���� ���⸦ �������ּ���.\r\n";
        str += "#r�������� ȫ�� ���� ���� : "+cm.Comma(cm.itemQuantity(4310129))+"��#k\r\n\r\n";
        str += "#L0##b#i1402214#(#z1402214#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50��)\r\n";
        str += "#L1##b#i1422156#(#z1422156#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50��)\r\n";
        str += "#L2##b#i1472230#(#z1472230#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50��)\r\n";
        str += "#L3##b#i1332242#(#z1332242#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50��)\r\n";
        str += "#L4##b#i1342087#(#z1342087#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50��)\r\n";
        str += "#L5##b#i1382226#(#z1382226#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50��)\r\n";
        str += "#L6##b#i1492194#(#z1492194#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50��)\r\n";
        str += "#L7##b#i1462208#(#z1462208#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50��)\r\n";
        str += "#L8##b#i1452220#(#z1452220#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50��)\r\n";
        str += "#L9##b#i1532112#(#z1532112#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50��)\r\n";
        str += "#L10##b#i1432182#(#z1432182#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50��)\r\n";
        str += "#L11##b#i1482183#(#z1482183#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50��)\r\n";

        cm.sendSimple(str);
    } else if (status == 1) {
        if (selection >= 0) {
            cm.RadWeaponShopGain(selection);
            cm.dispose();
        }
    }
}
