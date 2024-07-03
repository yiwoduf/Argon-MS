/*
	곰고(leehodud302@naver.com)님의  스크립트 파일입니다.
*/
var status = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
        cm.dispose();
    }
    if (status == 0) {
        var chat = "#r#e" + cm.getPlayer().getName() + "#n#k, 강해지고 싶나?#l\r\n";
        chat += "#b#L1##e코어 젬스톤을 사용해 통합공격력을 강화한다.#k#l\r\n";        
        cm.sendSimple(chat);
    } else if (status == 1) {
        slot = selection;
        sel = selection == 0 ? "올스텟" : "공격력/마력";
        var itemid = 0;
        text = "#b#e통합강화#n#k를 선택 하셧습니다.\r\n강화할 아이템을 선택 해 주세요.\r\n";
        for (i = 0; i < 101; i++) {
            if (cm.getEquip(i)) {
                itemid = cm.getEquip(i).getItemId();
		text += "\r\n#L"+i+"##b#i"+itemid+"##t"+itemid+"##k";
            }
        }
        cm.sendSimple(text);
    } else if (status == 2) {
        eq = cm.getEquip(selection);
        if (!cm.haveItem(2435719, 1)) {
            cm.sendOk("강화에 필요한 코어 젬스톤이 부족합니다.");
            cm.dispose();
            return;
        }
        cm.sendYesNo("선택한 스탯 : 통합공격력\r\n다음 강화로 올라갈때 실패확률은 없으며\r\n수치는 데미지 +5% 씩 추가됩니다.\r\n강화를 진행 하시겠습니까?");
    } else if (status == 3) {
        cm.gainItem(2435719, -1);
        eq.setAllDamageP(eq.getAllDamageP() + 5);
	cm.fakeRelog();
	cm.updateChar();
	cm.sendOk("강화에 성공하여 데미지 5%가 추가되었습니다."); 
        cm.dispose();
    }
}