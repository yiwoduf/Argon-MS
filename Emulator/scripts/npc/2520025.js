var status = -1;

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
        말 = "#e#r현재#n#k #b#h0##k님의 #k #e#b후원포인트 #r"+cm.getRC()+"#b원#n#k\r\n\r\n#r　　 #b#h0##k님의 #k #e#r추가데미지#n#k #e#d"+cm.getPlayer().getRCDamage()+"#b#n#k\r\n\r\n#e후원 포인트로 데미지를 높혀 드리고 있습니다.#k\r\n#e#r#n#k\r\n\r\n";
        말+= "#L0# 추가데미지를 구매하겠습니다."
        cm.sendSimple(말);
    } else if (status == 1) {
        if (Number(cm.getPlayer().getRCDamage()) + Number(cm.getRC() * 10000) >= 9220000000000000000) {
            한계 = (9220000000000000000 - cm.getPlayer().getRCDamage()) / 10000;
        } else {
             한계 = cm.getRC()
        }
        말 = "사용하시고 싶은 후원포인트의 양을 입력해 주세요.\r\n가격은 #b#e1#k#n 후원포인트당 #b#e10000#k#n 추가 데미지입니다.\r\n\r\n"
        말+= "현재 #h #님이 구매 가능한 추가데미지의 양은\r\n				[#r#e"+한계+"#k#n입니다.]";
        cm.sendGetNumber(말,1,1,한계)
    } else if (status == 2) {
        cm.loseRC((selection));
        plus = Number(cm.getPlayer().getRCDamage()) + Number(selection * 10000)
        cm.getPlayer().setKeyValue("rc_damage", plus);
        cm.sendOk(""+selection+"후원포인트를 사용하여 "+selection * 10000+"데미지를 추가하였습니다.\r\n총 데미지 : "+plus);
        cm.dispose();
    }
}