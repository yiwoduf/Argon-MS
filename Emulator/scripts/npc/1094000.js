var status = -1;

function start() {
	status = -1;
	action (1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == 1) {
		status++;
	} else {
		status--;
		cm.dispose();
	}
	if (status == 0) {
		if(mode == 0)
			cm.dispose();
		else
		cm.sendGetText("#fn������� Extrabold#\r\n#d#h ##k �� �ȳ��ϼ���.\r\n\r\n#b�˻�#k #fs14##r1��#k#fs11# �� ���� #b��� ĳ�� ������#k �� ���� �غ�����.\r\n#Cgray#(#Cgray# �����ۿ� �߰��ɼ� �ý��� + 200 �� �����մϴ�.#fs12#");
	} else if (status == 1) {
		var itemid = cm.getText();
		cm.SearchItem(itemid);
	} else if (status == 2) {
                if(cm.getRC() >= 5000){
		cm.sendOk("#fn������� Extrabold##i"+selection+"# #fs14##e#b#t"+selection+"##n#k#fs12#��(��) ȹ���ϼ̽��ϴ�.");
		cm.gainSponserItem(selection ,1,0,200,0);
		cm.loseRC(5000);
		cm.dispose(); 
		}else{
		cm.sendOk("#fn������� Extrabold#�Ŀ�����Ʈ�� �����մϴ�.");
		}
		}else{
		cm.dispose();

	}
}