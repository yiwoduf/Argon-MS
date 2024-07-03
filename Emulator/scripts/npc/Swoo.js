var status;
function start() {
    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {

    datecheck = true, 1540446;
    levelcheck = true, 1540446;
    pcount = true, 1540446;

    setting = [["HardSwoo", [350060170, 350060190, 350060210]], ["Swoo", [350060160, 350060180, 350060200]]]

    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSpirit("스우를 쓰러뜨리기 위해 블랙헤븐 코어로 이동할까?\r\n"
                + "#L0#블랙헤븐 코어(하드모드)로 이동한다.(레벨 190이상)\r\n"
                + "#L1#블랙헤븐 코어(노말모드)로 이동한다.(레벨 190이상)\r\n"
                + "#L2#이동하지 않는다.", true, 1540446)
    } else if (status == 1) {
        if (selection != 2) {
            if (cm.getPlayer().getParty() == null) {
                cm.sendSpirit("1인이상의 파티만 입장이 가능합니다.", false, 1540446);
                cm.dispose();
            } else if (!cm.isLeader) {
                cm.sendSpirit("파티장만 입장을 신청하실 수 있습니다.", false, 1540446);
                cm.dispose();
            } else {
                for (i = 0; i < cm.getPartyMembers().size(); i++) {
                    target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getParty().getMembers().get(i).getName())
                    if (target.getDateKey(setting[selection][0]) == null) {
                        target.setDateKey(setting[selection][0], 3);
                    }
                    if (target.getDateKey(setting[selection][0]) <= 0) {
                        datecheck = false
                    }
                    if (target.getLevel() < 190) {
                        levelcheck = false
                    }
                }
                if (!datecheck) {
                    cm.sendSpirit("오늘 이미 스우를 3번 도전하신 파티원이 있습니다.", false, 1540446);
                    cm.dispose();
                    return;
                } else if (!levelcheck) {
                    cm.sendSpirit("스우를 도전하기 위한 레벨이 부족한 파티원이 있습니다.", false, 1540446);
                    cm.dispose();
                } else {
                    for (i = 0; i < setting[selection][1].length; i++) {
                        if (cm.getPlayerCount(setting[selection][1][i]) >= 1) {
                            pcount = false
                        } else {
                            cm.resetMap(setting[selection][1][i]);
                        }
                    }
                    if (!pcount) {
                        cm.sendSpirit("누군가가 이미 스우에 도전하고 있습니다.", false, 1540446);
                        cm.dispose();
                    } else {
                        for (i = 0; i < cm.getPartyMembers().size(); i++) {
                            target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getParty().getMembers().get(i).getName())
                            target.setDateKey(setting[selection][0], target.getDateKey(setting[selection][0]) - 1);
                        }
                        em = cm.getEventManager(setting[selection][0]);
                        eim = em.readyInstance();
                        eim.setProperty("Stage", "0");
                        eim.setProperty("nextWarp", "false");
                        eim.setProperty("Global_MinPerson", cm.getParty().getMembers().size());
                        eim.registerParty(cm.getParty(), cm.getMap());
                        cm.dispose();
                    }
                }
            }
        } else {
            cm.dispose();
        }
    }
}