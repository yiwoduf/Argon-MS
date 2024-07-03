var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (status == 2 && mode == 0) {
        status --;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        if(cm.getPlayer().getLevel() < 250) {
            cm.sendYesNo("#fs11#파워 성장비약은 더 높은 레벨일 때 사용할 수록 도움이 됩니다.\r\n"
                        +"지금 사용하시겠습니까?\r\n\r\n"
                        +"1~100 레벨 : 1 레벨업\r\n"
                        +"101~120 레벨 : 다음 레벨업까지 필요한 경험치 60%\r\n"
                        +"121~140 레벨 : 다음 레벨업까지 필요한 경험치 50%\r\n"
                        +"141~160 레벨 : 다음 레벨업까지 필요한 경험치 40%\r\n"
                        +"161~180 레벨 : 다음 레벨업까지 필요한 경험치 30%\r\n"
                        +"181~200 레벨 : 다음 레벨업까지 필요한 경험치 20%\r\n"
                        +"201~220 레벨 : 다음 레벨업까지 필요한 경험치 10%\r\n"
                        +"221~249 레벨 : 다음 레벨업까지 필요한 경험치 5%");
       } else {
           cm.sendOk("만렙 캐릭터는 사용하실 수 없습니다.");
           cm.gainItem(2430632,-1);
           cm.dispose();
       }
    } else if (status == 1) {
        ㄹ = cm.getPlayer().getLevel();
        if(ㄹ<=100) {
            비율 = 1
        } else if (ㄹ<=120) {
            비율 = 0.6
        } else if (ㄹ<=140) {
            비율 = 0.5
        } else if (ㄹ<=160) {
            비율 = 0.4
        } else if (ㄹ<=180) {
            비율 = 0.3
        } else if (ㄹ<=200) {
            비율 = 0.2
        } else if (ㄹ<=220) {
            비율 = 0.1
        } else if (ㄹ<=249) {
            비율 = 0.05
        } else {
            비율 = 0
        }
        ㅇ = Packages.constants.GameConstants.getExpNeededForLevel(ㄹ) * 비율
        if (ㅇ <= 2147483647) {
            cm.gainExp(ㅇ);
        } else {
            ㅁ = 버림(ㅇ / 2147483647, 0)
            ㄴㅁㅈ = ㅇ % 2147483647
                for(i=0; i<ㅁ; i++) {
                    cm.gainExp(2147483647);
                }
            cm.gainExp(ㄴㅁㅈ);
        }
        cm.gainItem(2430632, -1);
        cm.dispose();
    }
}

function 버림(n, pos) {
    var digits = Math.pow(10, pos);
    var num = Math.floor(n * digits) / digits;
    return num.toFixed(pos);
}