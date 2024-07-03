importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);
importPackage(Packages.tools);
var status = -1;
var mob = [9305504, 9305504, 9305504, 9305504, 9305401, 9305401, 9305401, 9305410, 9305410, 9305410, 9305408, 9305402, 9305402, 9305402, 9305406, 9305406, 9305406, 2600118, 2600118]
var mcount = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 25, 25, 25, 25, 25, 25, 25, 2]
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var stage = 0;
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status--;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        if (cm.getPlayer().getMapId() == 926010000) {
            cm.sendSimple("나는 네트신의 피라미드를 지키는 두아트라고 하네.\r\n\r\n#L0##b#e 피라미드로 들어간다");
        } else {
            cm.warp(926010000);
            cm.dispose();
        }
    } else if (status == 1) {
        if (selection == 0) {
            if (cm.getPlayer().getParty() == null) {
                cm.sendOk("파티를 생성하신 후 입장 신청을 하게나");
                cm.dispose();
            } else if (!cm.isLeader()) {
                cm.sendOk("파티장만 입장 신청을 하실 수 있습니다.");
                cm.dispose();
            } else if (!cm.allMembersHere()) {
                cm.sendOk("파티원 전원이 이 곳에 모여 있어야 합니다.");
                cm.dispose();
            } else if (cm.getPlayerCount(926010300) > 0) {
                cm.sendOk("이미 다른 파티가 피라미드에 도전하고 있습니다");
                cm.dispose();
            } else {
                chr = cm.getPlayer();
                cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(926010300).killAllMonsters(false);
                var count = 0;
                cm.allPartyWarp(926010300, false);
                if (count == 0) {
                    cm.getPlayer().send(UIPacket.showInfo("피라미드에 입장하셨습니다."));
                    Thread.sleep(1000);
                }
                Thread.sleep(2000);
                cm.showEffect(true, "Gstar/start");
                Thread.sleep(700);
                var schedule = Timer.EtcTimer.getInstance().register(function () {
                    if (chr != cm.getPlayer() || cm.getPlayer().getMapId() != 926010300) {
                        cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(926010300).killAllMonsters(false);
                        cm.dispose();
                        return;
                    }
                    var infocount = 0;
                    if (count < mcount[stage] && stage <= 19) {
                        if (stage != 19) {
                            cm.spawnMob(mob[stage], 983, 157)
                        }
                        cm.spawnMob(mob[stage], 983, -23)
                        if (stage != 19) {
                            cm.spawnMob(mob[stage], 983, -203)
                        }
                        cm.spawnMob(mob[stage], 983, -383)
                        count++;
                    }
                    if (stage >= 19) {
                        cm.allPartyWarp(926010300, false);
                        cm.getPlayer().send(UIPacket.showInfo("모든 웨이브를 격파하셨습니다."));
                        cm.sendOk("격파완료~");
                        schedule.cancel(true);
                    }
                    if (cm.getMonsterCount(cm.getPlayer().getMapId()) == 0 && infocount == 0 && stage < 19) {
                        cm.getPlayer().send(UIPacket.showInfo("웨이브를 격파하셨습니다. 다음 웨이브를 준비해 주세요."));
                        count = 0;
                        infocount++;
                        stage++;
                        Thread.sleep(2000);
                        cm.showEffect(true, "Gstar/start");
                        cm.getPlayer().dropMessage(5, "" + stage + "단계 도전을 시작합니다.");
                        Thread.sleep(1000);
                    }
                    if (cm.getPlayer().getParty() == null) {
                        cm.warp(926010000);
                    }
                }, 1000);

                cm.dispose();
            }
        } else if (selection == 1) {
        }
    }
}
