var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}
    세팅 = "";
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        if(cm.getPlayer().getMapId() == 262030100 || cm.getPlayer().getMapId() == 262030110 || cm.getPlayer().getMapId() == 262030200 || cm.getPlayer().getMapId() == 262030210) {
                세팅 = "미완"
                cm.sendYesNo("이대로 포기하시겠어요?");
        } else {
                   세팅 = "힐라없음"
            for (i=0; i<cm.getMonsterCount(cm.getPlayer().getMapId()); i++) {
               if (cm.getMap(cm.getPlayer().getMapId()).getAllMonster().get(i).getId() == 8870000 || cm.getMap(cm.getPlayer().getMapId()).getAllMonster().get(i).getId() == 8870200 || cm.getMap(cm.getPlayer().getMapId()).getAllMonster().get(i).getId() == 8870100) {
                   세팅 = "힐라있음"
               }
            }
         cm.sendYesNo("도전을 마치고 퇴장하시겠습니까?");
        }
    } else if (status == 1) {
        if (세팅 == "힐라있음") {
            cm.sendYesNo("아직 힐라를 물리치지 못했는데, 정말 포기하고 나가시겠어요?");
        } else if (세팅 == "힐라없음") {
            cm.warp(262030000,1);
            cm.dispose();
        } else {
            cm.sendNext("어쩔 수 없군요. 여기까지 도와주셔서 감사했어요.");
        }
    } else if (status == 2) {
        cm.warp(262030000, 1);
        cm.dispose();
    }
}