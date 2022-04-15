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
var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
var status = 0;
var giveTSD = Math.floor(Math.random()*100);
var check = "초월s";

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
		var jessica = "                #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 초월 진행 "+별+"\r\n#fs10##Cgray#                          원하시는 초월 진행 여부를 선택해주세요.#k\r\n\r\n#fs12#";
		jessica += "                                    #b초월 횟수 랭킹#k : #r"+getTSRank()+" 위#k\r\n\r\n";
		jessica += "#L0##b초월이란 뭔가요?\r\n";
		jessica += "#L1##r초월을 부탁드립니다.#k";
		cm.sendSimple(jessica);
		} else {
		cm.sendOk("#fn나눔고딕 Extrabold##r초월은 광장에서만 이용이 가능합니다.#k");
		cm.dispose();
		}
	} else if (status == 1) {
		if (selection == 0) {
			var jessica2 = "#fn나눔고딕 Extrabold#* #b초월#k 이란?\r\n\r\n";
			jessica2 += "#fs14#1. #b레벨#k #rLv.250 > Lv.201#k 변경\r\n";
			jessica2 += "2. #b소모 비용#k #r5 천만 메소#k 차감\r\n";
			jessica2 += "3. #b일일 초월 횟수#k #r5 회#k 제한\r\n";
			jessica2 += "4. #b어빌리티 포인트#K #r1 ~ 3 P#k 랜덤 지급\r\n";
			jessica2 += "5. #b초월 포인트#k #r0 ~ 100 P#k 랜덤 지급#k#fs12#\r\n\r\n";
			jessica2 += "* #b초월#k 을 통해 다시 태어나는 #d환생#k 기능\r\n";
			jessica2 += "* #b초월 포인트#k 로 다양한 #d강화 or 교환#k 가능\r\n\r\n";
			jessica2 += "&. 초월 진행 후 기존 스탯이 초기화 되지 않으므로\r\n";
			jessica2 += "&. 추 후 Level UP 때마다 얻는 AP 를 감안하면 캐릭터가\r\n&. 점점 강한 성장을 할 수 있게 됩니다.";
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
                                BOSZ18.Broadcast.broadcastSmega(CField.getGameMessage(12,cm.getPlayer().getName()+" 님이 초월을 진행하였습니다. [ 초월 포인트 합계 : "+ cm.getPlayer().getTSD() +" ]"));
				cm.sendOk("#fn나눔고딕 Extrabold##b초월 포인트#k #r+ " + giveTSD + "#k\r\n\r\n#d초월 포인트 합계 : "+cm.getPlayer().getTSD()+"#k\r\n\r\n#r당신에게서 더욱 잠재적인 힘이 느껴집니다.#k");
                                cm.dispose();
	                } else {
				cm.sendOk("#fn나눔고딕 Extrabold##b→ 초월 진행 충족 조건#k\r\n\r\n#r1. 레벨 250\r\n2. 5 천만 메소#k\r\n\r\n#d* 조건에 부합된 후 재 시도 해주세요.#k");
				cm.dispose();
		        } 
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r오늘의 초월 제한 횟수를 다 사용하였습니다.#k");
	cm.dispose();
	} 
}
}
}
}