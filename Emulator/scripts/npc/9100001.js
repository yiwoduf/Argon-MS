


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	���÷��� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 9900002

	���ǽ� �̸� : �ſ���������

	���ǽð� �ִ� �� : ���丮�Ʒε� : �����Ͼ� (180000000)

	���ǽ� ���� : MISSINGNO


*/

var status = -1;

function start() {
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
 �� = "#fUI/UIToolTip/Item/Equip/Star/Star##fs16##fs16# "
var chat ="";
        chat += "#fn������� Extrabold##fs16##fs16#"+��+"#b�̱�ý���#k"+��+"#l";
        chat += "\r\n#g#L60# ���ڻ̱�";  
        chat += "#g#L66# ������ű��̱�#l\r\n\r\n#g#L67# ���Ʈ�̱� #k#l\r\n";

        cm.sendSimple(chat);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.openNpc(9000019);
        } else if (selection == 1) {
          cm.dispose();
          cm.openNpc (2300000);
  } else if (selection == 62) {
          cm.dispose();
          cm.openNpc(9300011);
} else if (selection == 67) {
		cm.dispose();
                cm.openNpc(2100);
} else if (selection == 66) {
		cm.dispose();
                cm.openNpc(10000);
} else if (selection == 65) {
           cm.dispose();
           cm.openNpc(9300012);
  } else if (selection == 60) {
          cm.dispose();
          cm.openNpc (9300003);
        }
    }
}
