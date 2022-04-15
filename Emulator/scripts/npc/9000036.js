var status = -1;

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1 && type != 1) {
        status++;
    } else {
        if (type == 1 && mode == 1) {
            status++;
            selection = 1;
        } else if (type == 1 && mode == 0) {
            status++;
            selection = 0;
        } else {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
        var chat = "#fn나눔고딕 Extrabold##fs13# 당신의 강함을 에이플러스에 알려보지 않으시겠습니까?";
	chat += "\r\n#b#L0#딜량 미터기가 무엇인지 궁금합니다.#l";
	chat += "\r\n#L1#딜량 미터기를 업데이트 하겠습니다.#l";
	chat += "\r\n#L2#딜량 미터기 랭킹을 확인하고 싶습니다.#l";
	cm.sendSimple(chat);
    } else if (status == 1) {
	if (selection == 0) {
		cm.sendOk("#fn나눔고딕 Extrabold##fs13# 딜량 미터기란 체력이 무제한인 주황 버섯을 3분동안 모든 화력을 쏟아부어 줘팸한 누적데미지를 저장하는 시스템입니다. 딜량 미터기의 누적 데미지는 랭킹으로 나누어 지며 랭킹 1위에게는 지존좋은 훈장이 지급됩니다.");
		cm.dispose();
	} else if (selection == 1) {
		if (cm.getPlayerCount(120000102) > 0) {
			cm.sendOk("이미 다른 유저가 딜량 미터기를 업데이트 하고 있습니다.");
			cm.dispose();
			return;
		}
		cm.startDamageMeter();
		cm.sendOk("#fn나눔고딕 Extrabold##fs13# 제한 시간 내에 맵을 벗어나거나 게임을 종료 할 시 딜량 미터기가 업데이트 되지 않습니다.");
		cm.dispose();
	} else if (selection == 2) {
		cm.sendOk(cm.DamageMeterRank());
		cm.dispose();
	}
    }
}