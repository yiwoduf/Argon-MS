var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
	if (status == 0) {
		var chat = "#fn������� Extrabold#������ �׻� ������ �̲��� ��ȭ�� ����������..\r\n";
		chat += "��ŵ� ��� ���鿡 �ִ� ������ ����ϰ� �����Ű���?\r\n";
		chat += "���Ͻø�.. ���� ���� �����帮���� ������..\r\n\r\n";
		chat += "[ #b������ �귿#k ���� ���� : #b��Ӹ��� ����#k #r30 ��#k ]\r\n";
		chat += "\r\n#Cgray#1. 30 ~ 40 �� = ���� ���ݷ�, ������, �ý��� 5 % ����\r\n2. 50 ~ 60 �� = ���� ���ݷ�, ������, �ý��� 7 % ����\r\n3. 60 ~ 70 �� �̻� = ���� ���ݷ�, ������, �ý��� 11 % ����#k";
		
                chat += "\r\n\r\n                                           #d[������ ��]#k\r\n";
		chat += "\r\n                                #i1112585#     #i1112586#     #i1112663#";
		chat += "\r\n                                  #i1112318#     #i1112319#     #i1112320#";
                chat += "\r\n\r\n                                       #d[������ ���Ʈ]#k\r\n";
		chat += "\r\n                   #i1123007#(STR)     #i1123008#(DEX)     #i1123009#(INT)";
		chat += "\r\n                   #i1123010#(LUK)     #i1123011#(MHP)   #i1123012#(AST)";
		chat += "\r\n\r\n#L0##b��, ���� ���� �����ϰ� �;��.#k#l";
		chat += "\r\n\r\n   #r* ��, ��� â�� �� 1 ĭ �̻� ����� ���� ������ �����մϴ�.#k";
		cm.sendSimple(chat);
        } else if (status == 1) {
		if (cm.haveItem(4310129,30)) {
			cm.sendOk("#fn������� Extrabold#����� #b������ ��#k �� �Ͼ����.\r\n���� ũ�� �߰� #r�귿 ����#k �� #dȮ��#k ���ּ���.");
	   	} else {
			cm.sendOk("#fn������� Extrabold##r��Ӹ��� ������ �����ϸ� ����� ������ �ٶ� �� �����.#k");
			cm.dispose();
		}
	} else if (status == 2) {
		cm.gainItem(4310129,-30);
		cm.getPlayer().�����Ƿ귿();
		cm.dispose();
	} else {
		cm.dispose();
	}
    }
}