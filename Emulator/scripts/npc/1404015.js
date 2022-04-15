importPackage(java.sql);

importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);

importPackage(Packages.constants.programs);
importPackage(Packages.tools.packet);
importPackage(Packages.database);
importPackage(Packages.constants);

function getTSRank(){
	var ts = 0;
	var rank = DatabaseConnection.getConnection().prepareStatement("SELECT COUNT(*) FROM characters where gm = 0 and `ts` > ?");

        rank.setInt(1, cm.getPlayer().getTS());
        eq = rank.executeQuery();
        if (eq.next()) {
			return eq.getInt("count(*)")+1;
	}
}
var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";
var status = 0;
var giveTSD = Math.floor(Math.random()*100);
var check = "�ʿ�s";

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
		if (cm.getPlayer().getMapId() == 680000000) {
		var jessica = "                #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" �ʿ� ���� "+��+"\r\n#fs10##Cgray#                          ���Ͻô� �ʿ� ���� ���θ� �������ּ���.#k\r\n\r\n#fs12#";
		jessica += "                                    #b�ʿ� Ƚ�� ��ŷ#k : #r"+getTSRank()+" ��#k\r\n\r\n";
		jessica += "#L0##b�ʿ��̶� ������?\r\n";
		jessica += "#L1##r�ʿ��� ��Ź�帳�ϴ�.#k";
		cm.sendSimple(jessica);
		} else {
		cm.sendOk("#fn������� Extrabold##r�ʿ��� ���忡���� �̿��� �����մϴ�.#k");
		cm.dispose();
		}
	} else if (status == 1) {
		if (selection == 0) {
			var jessica2 = "#fn������� Extrabold#* #b�ʿ�#k �̶�?\r\n\r\n";
			jessica2 += "#fs14#1. #b����#k #rLv.250 > Lv.201#k ����\r\n";
			jessica2 += "2. #b�Ҹ� ���#k #r5 õ�� �޼�#k ����\r\n";
			jessica2 += "3. #b���� �ʿ� Ƚ��#k #r5 ȸ#k ����\r\n";
			jessica2 += "4. #b�����Ƽ ����Ʈ#K #r1 ~ 3 P#k ���� ����\r\n";
			jessica2 += "5. #b�ʿ� ����Ʈ#k #r0 ~ 100 P#k ���� ����#k#fs12#\r\n\r\n";
			jessica2 += "* #b�ʿ�#k �� ���� �ٽ� �¾�� #dȯ��#k ���\r\n";
			jessica2 += "* #b�ʿ� ����Ʈ#k �� �پ��� #d��ȭ or ��ȯ#k ����\r\n\r\n";
			jessica2 += "&. �ʿ� ���� �� ���� ������ �ʱ�ȭ ���� �����Ƿ�\r\n";
			jessica2 += "&. �� �� Level UP ������ ��� AP �� �����ϸ� ĳ���Ͱ�\r\n&. ���� ���� ������ �� �� �ְ� �˴ϴ�.";
			cm.sendPrev(jessica2);
			cm.dispose();
		} else if (selection == 1) {
		if(cm.CountCheck(check, 5)) {
			if (cm.getPlayer().getLevel() == 250 && cm.getMeso() >= 50000000) {
				cm.gainMeso(-50000000);
				cm.getPlayer().setLevel(202); //-1
				cm.CountAdd(check);
				cm.getPlayer().gainTS(1);
                                cm.getPlayer().gainTSD(giveTSD);
			        cm.getPlayer().fakeRelog();
				cm.showEffect(false,"tdAnbur/idea_hyperMagic");
                                cm.playSound(false,"Field.img/flowervioleta/openning");
                                BOSZ18.Broadcast.broadcastSmega(CField.getGameMessage(12,cm.getPlayer().getName()+" ���� �ʿ��� �����Ͽ����ϴ�. [ �ʿ� ����Ʈ �հ� : "+ cm.getPlayer().getTSD() +" ]"));
				cm.sendOk("#fn������� Extrabold##b�ʿ� ����Ʈ#k #r+ " + giveTSD + "#k\r\n\r\n#d�ʿ� ����Ʈ �հ� : "+cm.getPlayer().getTSD()+"#k\r\n\r\n#r��ſ��Լ� ���� �������� ���� �������ϴ�.#k");
                                cm.dispose();
	                } else {
				cm.sendOk("#fn������� Extrabold##b�� �ʿ� ���� ���� ����#k\r\n\r\n#r1. ���� 250\r\n2. 5 õ�� �޼�#k\r\n\r\n#d* ���ǿ� ���յ� �� �� �õ� ���ּ���.#k");
				cm.dispose();
		        } 
	} else {
	cm.sendOk("#fn������� Extrabold##r������ �ʿ� ���� Ƚ���� �� ����Ͽ����ϴ�.#k");
	cm.dispose();
	} 
}
}
}
}