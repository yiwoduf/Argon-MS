
var status = -1;var k = "#fNpc/9000000/stand/0#";
var k1 = "#fNpc/9000000/stand/0#";
function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
	var chat = "�ݰ����� �����ý����Դϴ� #b"+ cm.getPlayer().getName() + "#k  ����ִ� ���ÿ���Ǽ���~!#r";
	chat += "\r\n#g#L0##i5044000# ����̵�#l #b#L1##i1002524# �λ����#l #g#L2##i5121041# ������#l";
        chat += "\r\n#r#L6##i2431267# ��Ծ��#l #r#L9##i3700182# �۹氡��#l #d#L10# ��ȭ�� �׸� �Ѵ�.";
        cm.sendSpirit(chat,true,0);
      } else if (status == 1) {
        if (selection == 0) {
          cm.dispose();
          cm.openNpc (9000019);
        } else if (selection == 1) {
          cm.dispose();
          cm.openNpc (1012000);
        } else if (selection == 2) {
          cm.dispose();
          cm.openNpc (2010011);
        } else if (selection == 3) {
          cm.dispose();
          cm.openNpc (9110001);
        } else if (selection == 4) {
          cm.dispose();
          cm.openNpc (9000158);
        } else if (selection == 5) {
          cm.dispose();
          cm.warp (123456789);
        } else if (selection == 6) {
          cm.dispose();
          cm.warp (931000500, 0);
        } else if (selection == 7) {
          cm.dispose();
          cm.openNpc (9071004);
        } else if (selection ==8) {
          cm.dispose();
          cm.openNpc(9001009);
        } else if (selection ==9) {
          cm.dispose();
          cm.warp(100000003);
	} else if (selection == 10) {
	  cm.dispose();
      }
    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
