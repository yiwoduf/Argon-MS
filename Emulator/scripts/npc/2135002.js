importPackage(Packages.constants);

var status = -1;

var howmuch = 30000; // 환생포인트
var item = 2431838; // 아이템코드 
var itemqty = 1000; // 아이템개수
var job = [122];

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
        var chat = "  #fn나눔고딕 Extrabold#"+ServerConstants.serverName+"의 변생 시스템 (Reinstatement System) 입니다.\r\n\r\n";
        chat += "---------------------------------------------------------------------------------\r\n\r\n";
        chat += "#r▶ 환생포인트  "+howmuch+" 원, #v"+item+"# #z"+item+"# 가 "+itemqty+" 개 필요합니다.#k\r\n";
        chat += "#b▶ #h0# 님의 환생포인트는 "+cm.getPlayer().getGP()+" 원 입니다.#k\r\n\r\n";
        chat += "---------------------------------------------------------------------------------\r\n";
        chat += "#L0##d 저는 다크팔라딘으로 직업을 변경하겠습니다.#k#l\r\n\r\n";
        chat += "---------------------------------------------------------------------------------\r\n";
        cm.sendSimple(chat);

    } else if (status == 1) {
        if (cm.getPlayer().getGP() < howmuch || "+cm.getItemQuantity(item)+" < itemqty) {
            cm.sendOk("#fn나눔고딕 Extrabold#* 변생을 아쉽지만 실패했습니다.\r\n#r▶ 현재 #h0# 님은 #v"+item+"# #z2431838#을 "+cm.itemQuantity(4310064)+" 개를 소유중입니다.#k\r\n#b▶ 현재 #h0# 님의 환생포인트는 "+cm.getGP()+" 포인트 입니다.");
            cm.dispose();
            return;
        }

        var it = cm.getPlayer().getSkills().keySet().iterator();
        var resetskill = [];
        var i = 0;
        while (it.hasNext()) {
            var lskill = it.next();
            if (lskill.getId() >= 80000000) {
                continue;
            }
            resetskill[i] = lskill.getId();
            i++;
        }

        for (var j = 0; j < resetskill.length; j ++) {
            cm.getPlayer().changeSkillLevel(resetskill[j], 0, 0);
        }
        cm.haveItem(2431838, 500);
        cm.resetStats(4, 4, 4, 4);
        cm.changeJob(job[selection]);
        cm.getPlayer().gainGP(-howmuch);
        cm.gainItem(item, -itemqty);
        cm.sendOk("#fn나눔고딕 Extrabold##r▶ 변생이 성공적으로 완료되었습니다.#k\r\n#b▶ @스킬마스터로 스킬을 모두 장착해주세요.#k");
        cm.dispose();
        } else {
        cm.sendOk("#fn나눔고딕 Extrabold#재료가 부족합니다.");
        cm.dispose();

	}
}