var status = -1;

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
	var chat = "ȯ���ؿ� ������~ #b�����÷���#k #b�������ǽ�#k#l  �Դϴ�.#r";
        chat += "\r\n#b#L3##i5044000#�λ����#k#l   #L6##i4001713# �޼�#k�����#k#l\r\n";
        chat += "#L4##i1112260#�������#k#l      #b#L5##i1190400# �������#l\r\n";
        chat +="#e#g#L14# �빫�� ������ ��ȭ�� �׸� �Ѵ�.#l";
	cm.sendSpirit(chat,true,0);
    } else if (status == 1) {
     var s = selection;
        cm.dispose();
	if (selection == 0) {
		cm.dispose();
		cm.openNpc(9001014);
 }else if  (selection == 3) {
          cm.dispose();
          cm.openNpc(1012000);
        } else if (selection == 4) {
          cm.dispose();
          cm.warp(200000301);
        } else if (selection == 6) {
          cm.dispose();
          cm.warp(910180000);
   } else if (selection == 5) {
          cm.dispose();
          cm.openNpc(2150007);
      } else if (selection == 14) {
          cm.dispose();
	}
    }
}
