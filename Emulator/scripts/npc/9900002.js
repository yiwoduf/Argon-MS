


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
        chat += "#fn������� Extrabold##fs16##fs16#"+��+"#b�����÷����̵��ý���#k"+��+"#l";
        chat += "#r#L6##i2431267# ��Ծ��#l\r\n\r\n#r#L7##i4310058# ��������#l\r\n\r\n#r#L8##i3800350# ���������#l\r\n\r\n";

        if (cm.getPlayer().hasGmLevel(10)){
        choose += "";
}
        cm.sendSimple(chat);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.openNpc(9000019);
        } else if (selection == 1) {
          cm.dispose();
          cm.openNpc (2300000);
 } else if (selection == 2) {
          cm.dispose();
          cm.openNpc (2010011);
        } else if (selection == 3) {
          cm.dispose();
          cm.openNpc (9110001);
 } else if (selection == 5) {
          cm.dispose();
          cm.warp (3000500);
        } else if (selection == 6) {
          cm.dispose();
          cm.warp (931000500, 0);
        } else if (selection == 7) {
          cm.dispose();
          cm.openNpc (2411023);
        } else if (selection ==8) {
          cm.dispose();
          cm.openNpc(9001009);
        } else if (selection ==9) {
          cm.dispose();
          cm.warp(100000003);
        } else if (selection ==59) {
          cm.dispose();
          cm.warp(101070000);
     } else if (selection ==10) {
          cm.dispose();
          cm.openNpc(9300008);
     } else if (selection == 4) {
          cm.dispose();
          cm.openNpc (9000158);
        }
    }
}
