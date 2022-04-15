importPackage(Packages.client);
importPackage(Packages.constants);
importPackage(Packages.packet.creators);
importPackage(Packages.launch.world);

var status = -1;
var sel = 0;
var name = "";

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
	var chat= "당신의 마음을 반지에 담아보세요. 하늘의 별보다도 아름다운 반지가 만들어질 거랍니다.";
	chat += "\r\n\r\n";
	chat += "　◆ #b#h #님의 보유 후원포인트 : #e#r"+cm.getRC()+"#n#k#b\r\n";
	chat += "#L1112001# #i1112001# #b#z1112001##k #e: #r100000 포인트#n#b#l\r\n";
	chat += "#L1112002# #i1112002# #b#z1112002##k #e: #r100000 포인트#n#b#l\r\n";
	chat += "#L1112003# #i1112003# #b#z1112003##k #e: #r100000 포인트#n#b#l\r\n";
	cm.sendSimple(chat);
    } else if (status == 1) {
	if (cm.getRC() < 100000) {
		cm.sendOk(cm.getPlayer().getName() + "님의 후원포인트로는 반지를 제작할수 없을것 같군요");
		cm.dispose();
		return;
	}
	sel = selection;
	cm.sendGetText("커플이 될 상대의 닉네임을 적어주세요.");
    } else if (status == 2) {
	name = cm.getText();
	cm.sendYesNo("선택하신 반지 [#b#i" + sel + "# #z" + sel + "##k](을)를 정말로 제작 하시겠습니까?");
    } else if (status == 3) {
	var id = MapleCharacterUtil.getIdByName(cm.getText());
	if (id <= 0) {
		cm.sendOk("입력하신 " + name + "님은 존재하지 않으신 분입니다. 닉네임을 다시 한번 확인해 주시길 바랍니다.");
		cm.dispose();
		return;
	}
	var chr = cm.getChar(id);
	if (chr == null) {
		cm.sendOk("반지를 받으실분이 접속해있지 않군요 " + name + "님이 접속하시면 다시 찾아와 주시길 바랍니다.");
		cm.dispose();
		return;
	}
	if (!(chr.getInventory(GameConstants.getInventoryType(sel)).getNextFreeSlot() > -1)) {
		cm.sendOk("반지를 받으실분의 인벤토리 공간이 부족합니다.");
		cm.dispose();
		return;
	}
	if (!cm.canHold(sel)) {
		cm.sendOk("반지를 받기위해선 인벤토리에 한칸 이상의 빈 공간이 필요 합니다.");
		cm.dispose();
		return;
	}
      
        WorldBroadcasting.broadcast(MainPacketCreator.getGMText(7, "[알림] "+ cm.getPlayer().getName()+" 님과 "+cm.getText()+" 님이 커플이 되었습니다. 모두 축하해주세요 !!"));
	cm.makeRing(sel,chr);
	cm.loseRC(100000);
	cm.dispose();
    }
}
