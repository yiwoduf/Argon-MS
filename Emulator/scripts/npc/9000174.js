var status = -1;
var id = "";
var pw = "";
var accid = 0;
var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";

importPackage(Packages.constants);

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
        if (cm.getPlayer().getMapId() == 211070000 || cm.getPlayer().getMapId() == 270050000) {
	cm.sendOk("#fn������� Extrabold#�״뿩... �����Ͽ���..");
	cm.dispose();
	} else {
        cm.sendGetText("            #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" ���� ���� ���� "+��+"\r\n#fs10##Cgray#                         ���Ͻô� ���� ���� ���� ������ �Է����ּ���.#k\r\n\r\n#fs11##b������ ������ ������ ���̵� �Է� �� �ּ���.#k");
        }
    } else if (status == 1) {
	id = cm.getText();
	cm.sendGetText("            #fn������� Extrabold##fs17#"+��+""+ServerConstants.serverName+" ���� ���� ���� "+��+"\r\n#fs10##Cgray#                         ���Ͻô� ���� ���� ���� ������ �Է����ּ���.#k\r\n\r\n#fs11##b�ش� ������ ��й�ȣ�� �Է� �� �ּ���.#k");
    } else if (status == 2) {
	pw = cm.getText();
	cm.sendYesNo("#fn������� Extrabold##r���̵� :#k " + id + " \r\n#d�ش� ������ ���� ���� �Ͻðڽ��ϱ�?#k");
    } else if (status == 3) {
	accid = cm.getAccountId(id, pw);
	if (accid == -1) {
		cm.sendOk("#fn������� Extrabold##r���̵� �Ǵ� ��й�ȣ�� �߸� �Է� �Ͽ����ϴ�.\r\n������ �ٽ� �ѹ� Ȯ�� �� �ּ���.#k");
		cm.dispose();
		return;
	}
	cm.setLoggedin(accid);
	cm.sendOk("#fn������� Extrabold##r���̵� :#k " + id + " #d\r\n�ش� ������ ���������� ���� ���� �Ͽ����ϴ�.#k");
	cm.dispose();
    }
}