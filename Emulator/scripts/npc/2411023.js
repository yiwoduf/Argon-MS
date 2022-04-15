var status = -1;
importPackage(Packages.java.awt);
importPackage(Packages.packet.creators);
function start() {
    action (1, 0, 0);
}


function action(mode, type, selection) {
    settings = [[240020401, 80, 10], [240020102, 80, 10], [280030100, 100, 10], [240060200, 105, 10], [230040420, 110, 10], [220080001, 125, 10], [240060201, 160, 10], [270050100, 180, 10], [271040100, 190, 10], [105200710, 190, 10], [105200800, 190, 10], [105200610, 190, 10], [105200410, 190, 10], [262031300, 200, 10], [211070100, 200, 10], [401060100, 210, 10], [993000500, 230, 10], [272020210, 240, 10], [262031300, 240, 10], [350060716, 245, 10], [209000100, 240, 10], [350160140, 250, 10]]
    partypass = 0;
    h = 0;
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
        말 = "#fn나눔고딕##fs15##r어느 보스와 대련하시겠습니까?#k#b#fs12\r\n\r\n";
        말 += "#L0##r마뇽#k과 대련하러 이동하겠습니다. #b(레벨 80이상)#k\r\n";
        말 += "#L1##r그리프#k과 대련하러 이동하겠습니다. #b(레벨 80이상)#k\r\n";
        말 += "#L2##r자쿰/카오스 자쿰#k과 대련하러 이동하겠습니다. #b(레벨 100이상)#K\r\n";
        말 += "#L3##r혼테일#k과 대련하러 이동하겠습니다. #b(레벨 105이상)#k\r\n";
        말 += "#L4##r피아누스#k와 대련하러 이동하겠습니다. #b(레벨 110이상)#K\r\n";
        말 += "#L5##r파폴라투스#k와 대련하러 이동하겠습니다. #b(레벨 125이상)#k\r\n";
        말 += "#L6##r카오스 혼테일#k과 대련하러 이동하겠습니다. #b(레벨 160이상)#k\r\n";
        말 += "#L7##r핑크빈#k과 대련하러 이동하겠습니다. #b(레벨 180이상)#k\r\n";
        말 += "#L8##r시그너스#k와 대련하러 이동하겠습니다. #b(레벨 190이상)#k\r\n";
        말 += "#L9##r카오스 블러디 퀸#k과 대련하러 이동하겠습니다. #b(레벨 190이상)#k\r\n";
        말 += "#L10##r카오스 반반#k과 대련하러 이동하겠습니다. #b(레벨 190이상)#k\r\n";
        말 += "#L11##r카오스 붉은 피에르#k와 대련하러 이동하겠습니다. #b(레벨 190이상)#k\r\n";
        말 += "#L12##r카오스 벨룸#k과 대련하러 이동하겠습니다. #b(레벨 190이상)#k\r\n";
        말 += "#L13##r힐라#k와 대련하러 이동하겠습니다. #b(레벨 200이상)#k\r\n";
        말 += "#L14##r반레온#k과 대련하러 이동하겠습니다. #b(레벨 200이상)#K\r\n";
        말 += "#L15##r매그너스#k와 대련하러 이동하겠습니다. #b(레벨 210이상)#k\r\n";
        말 += "#L16##r불꽃늑대#k와 대련하러 이동하겠습니다. #b(레벨 230이상)#k\r\n";
        말 += "#L17##r아카이럼#k과 대련하러 이동하겠습니다. #b(레벨 240이상)#k\r\n";
        말 += "#L18##r위대한 힐라#k와 대련하러 이동하겠습니다. #b(레벨 240이상)#k\r\n";
        말 += "#L19##r위대한 스우#k와 대련하러 이동하겠습니다. #b(레벨 245이상)#k\r\n";      
        말 += "#L20##r루시드#k와 대련하러 이동하겠습니다. #b(레벨 250이상)#k\r\n";
        말 += "#L21##r데미안#k과 대련하러 이동하겠습니다. #b(레벨 250이상)#k\r\n";
        말 += "#L22#대화를 종료합니다.\r\n";
        cm.sendSimple(말);       
    } else if (status == 1) {
        if (selection == 21) {
            cm.dispose();
        } else {
            if (cm.getParty() == null) {
                cm.sendOk("파티를 생성한 후 도전해 주세요.");
                cm.dispose();
            } else if (cm.getPlayerCount(settings[selection][0]) >= 1) {
                cm.sendOk("이미 다른 파티가 보스에 도전중에 잇습니다.\r\n다른 채널을 이용 해 주세요.");
                cm.dispose();
            } else if (!cm.isLeader()) {
                cm.sendOk("파티장만이 입장을 신청할 수 있습니다.");
                cm.dispose();
            }
            if (partypass == 0) {
                말 = "파티원 중 #b#e"
                for (i = 0; i < cm.getPartyMembers().size(); i++) {
                    if (cm.getPlayer().getParty().getMembers().get(i).getLevel() <= settings[selection][1]) {
                        partypass = 1;
                        h++
                        말 += cm.getPlayer().getParty().getMembers().get(i).getName()
                        if (h != cm.getPartyMembers().size()) {
                            if (!h == i) {
                                말 += ", "
                            }
                        }
                    }
                }
                말 += "#n#k(은)는 레벨이 만족하지 않아서 입장을 할 수 없습니다." 
            if (partypass == 1) {
                cm.sendOk(말);
                cm.dispose();
            } else {
                cm.resetMap(settings[selection][0]);
                cm.warpParty(settings[selection][0]);
                cm.setPartyDeathCount(settings[selection][2]);
            }
        }
    }
}
}