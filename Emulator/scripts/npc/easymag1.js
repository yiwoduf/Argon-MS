var status = -1;

pass = true;

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
        if (cm.getPlayer().getQuestStatus(31851) == 2) {
             cm.sendNext("그 포탈을 통해 매그너스와의 모의전을 체험해 보실 수 있어요. 물론 매그너스의 본래 힘엔 턱없이 못미치겠지만 노바의 현재 기술로는 그게 한계군요.");
        } else {
             cm.dispose();
             return;
        }
    } else if (status == 1) {
        cm.sendYesNo("매그너스와의 모의전(이지 모드)을 위해 이동하실건가요?\r\n#b"
                    +"<< 매그너스 모의전은 1일에 3회 클리어 가능합니다.>>\r\n"
                    +"<< 115 레벨 이상 유저 간 파티로 입장하실 수 있습니다.>>");
    } else if (status == 2) {
        cm.sendNext("최대한 비슷한 환경을 조성하기 위해 폭군의 성채를 재현해 두었어요. 그 곳에서 왕좌에 진입할 수 있어요.")
    } else if (status == 3) {
        cm.warp(401060399, "west00");
        cm.dispose();
    }
}