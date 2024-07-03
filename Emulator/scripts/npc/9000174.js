var status = -1;
var id = "";
var pw = "";
var accid = 0;
var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";

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
	cm.sendOk("#fn나눔고딕 Extrabold#그대여... 각성하여라..");
	cm.dispose();
	} else {
        cm.sendGetText("            #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 현재 접속 해제 "+별+"\r\n#fs10##Cgray#                         원하시는 현재 접속 해제 계정을 입력해주세요.#k\r\n\r\n#fs11##b접속을 해제할 계정의 아이디를 입력 해 주세요.#k");
        }
    } else if (status == 1) {
	id = cm.getText();
	cm.sendGetText("            #fn나눔고딕 Extrabold##fs17#"+별+""+ServerConstants.serverName+" 현재 접속 해제 "+별+"\r\n#fs10##Cgray#                         원하시는 현재 접속 해제 계정을 입력해주세요.#k\r\n\r\n#fs11##b해당 계정의 비밀번호를 입력 해 주세요.#k");
    } else if (status == 2) {
	pw = cm.getText();
	cm.sendYesNo("#fn나눔고딕 Extrabold##r아이디 :#k " + id + " \r\n#d해당 계정을 접속 해제 하시겠습니까?#k");
    } else if (status == 3) {
	accid = cm.getAccountId(id, pw);
	if (accid == -1) {
		cm.sendOk("#fn나눔고딕 Extrabold##r아이디 또는 비밀번호를 잘못 입력 하였습니다.\r\n계정을 다시 한번 확인 해 주세요.#k");
		cm.dispose();
		return;
	}
	cm.setLoggedin(accid);
	cm.sendOk("#fn나눔고딕 Extrabold##r아이디 :#k " + id + " #d\r\n해당 계정을 성공적으로 접속 해제 하였습니다.#k");
	cm.dispose();
    }
}