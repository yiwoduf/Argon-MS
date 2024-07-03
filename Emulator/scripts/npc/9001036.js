var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
var status = 0;
var ad = new Array(10000000,15000000,20000000,25000000,30000000);
var tsd = 1000;

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
		var jessica = "#fn나눔고딕 Extrabold##b추가 데미지#k 를 강화하여 더욱 강력한 힘을 발휘해보세요.\r\n\r\n";
		jessica += "                                      #b초월 포인트#k : #r"+cm.getTSD()+" P#k\r\n\r\n";
		jessica += "▶ 강화 진행시 총 #b초월 포인트#k #r"+tsd+" P#k 가 필요하며#k\r\n     #r최소 + 1 천만 ~ 최대 + 3 천만#k 까지 #d오백만 단위#k 로 강화됩니다.\r\n";
		jessica += "#L0##b추가 데미지 강화를 진행하겠습니다.#k\r\n";
		cm.sendSimple(jessica);
} else {
cm.sendOk("#fn나눔고딕 Extrabold##r추가 데미지 강화는 레벨 200 이상만 이용 가능합니다.#k",9062004);
cm.dispose();
}
	} else if (status == 1) {
		if (selection == 0) {
			var adinfo = ad[Math.floor(Math.random() * ad.length)];
			if (cm.getTSD() >= tsd) {
				cm.gainTSD(-tsd);
                                cm.getPlayer().gainAddDamagein(adinfo,true);
				cm.showEffect(false,"mercedes/frame");
				cm.showEffect(false,"mercedes/elfElder");
                                cm.playSound(false,"Field.img/StarPlanet/cashTry");
				cm.sendOk("#fn나눔고딕 Extrabold##b강화된 추가 데미지#k : #r+ "+adinfo+"#k\r\n\r\n#d* 나의 추가 데미지 합계 : "+cm.getPlayer().getAddDamage()+"#k");
                                cm.dispose();
	                } else {
				cm.sendOk("#fn나눔고딕 Extrabold##r당신의 초월 포인트가 부족합니다.#k");
				cm.dispose();
		        } 
}
}
}
}