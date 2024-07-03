var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
var status = 0;
var tsd = 10000;

importPackage(Packages.constants);

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
if (cm.getPlayer().getLevel() >= 200) {
		var jessica = "#fn나눔고딕 Extrabold##b추가 데미지 타격 횟수#k 를 강화하여 한계의 힘을 발휘해보세요.\r\n\r\n";
		jessica += "                                      #b초월 포인트#k : #r"+cm.getTSD()+" P#k\r\n\r\n";
		jessica += "▶ 강화 진행시 총 #b초월 포인트#k #r"+tsd+" P#k 가 필요하며#k\r\n  #b추가 데미지 타격 횟수#k #r+ 1 타#k 가 강화됩니다.\r\n";
		jessica += "#L0##b추가 데미지 타격 횟수 강화를 진행하겠습니다.#k\r\n";
		cm.sendSimple(jessica);
} else {
cm.sendOk("#fn나눔고딕 Extrabold##r추가 데미지 타격 횟수 강화는 레벨 200 이상만 이용 가능합니다.#k",9062004);
cm.dispose();
}
	} else if (status == 1) {
		if (selection == 0) {
			if (cm.getTSD() >= tsd) {
				cm.gainTSD(-tsd);
                                cm.getPlayer().gainAddDamageSin(1,true,"초월");
				cm.showEffect(false,"mercedes/frame");
				cm.showEffect(false,"mercedes/elfElder");
                                cm.playSound(false,"Field.img/StarPlanet/cashTry");
				cm.sendOk("#fn나눔고딕 Extrabold##b강화된 추가 데미지 타격 횟수 : #r+ 1 타#k\r\n\r\n#d* 나의 추가 데미지 타격 횟수 : "+cm.getPlayer().getAddDamageS()+" 타#k");
                                cm.dispose();
	                } else {
				cm.sendOk("#fn나눔고딕 Extrabold##r당신의 초월 포인트가 부족합니다.#k");
				cm.dispose();
		        } 
}
}
}
}