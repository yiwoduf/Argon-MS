var status = 0;
var sel;

function start() {
    cm.sendSimple("본인의 길드를 만들어 보시겠어요?\r\n#b#L0#길드를 만들고 싶어요.#l\r\n#L1#길드를 해체하고 싶어요.#l\r\n#L2#길드 인원수를 늘리고 싶어요.#l#k");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status < 2)) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            sel = selection;
            if (selection == 0) {
                if (cm.getPlayer().getGuildId() > 0) {
                    cm.sendOk("이미 길드가 있으시네요. 길드를 해체하시거나 탈퇴하고 와주세요");
                    cm.dispose();
                } else
                    cm.sendYesNo("길드를 만들어 보실려구요? 길드를 등록하려면 #b150만 메소#k가 필요하답니다. 준비가 다 되셨다면 #b'예'#k버튼을 눌러주세요.");
            } else if (selection == 1) {
                if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk("길드장만이 길드를 해체할 수 있습니다.");
                    cm.dispose();
                } else
                    cm.sendYesNo("길드를 정말 해체하고 싶으신건가요? 한번 해체를 해버리면 길드는 영원히 삭제되어 버린답니다. 여러가지 길드 특권도 물론 함께 사라지죠. 그래도 하시겠어요?");
            } else if (selection == 2) {
                if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk("길드장만이 길드를 확장할 수 있습니다.");
                    cm.dispose();
                } else
                    cm.sendYesNo("길드원 수를 #b5#k명 확장하는데 #b500만 메소#k가 필요합니다. 준비가 다 되셨다면 #b'예'#k버튼을 눌러주세요.");
            }
        } else if (status == 2) {
            if (sel == 0 && cm.getPlayer().getGuildId() <= 0) {
                cm.genericGuildMessage(3);
            } else if (cm.getPlayer().getGuildId() > 0 && cm.getPlayer().getGuildRank() == 1) {
                if (sel == 1) {
                    cm.disbandGuild();
                } else if (sel == 2) {
                    cm.increaseGuildCapacity();
                }
            }
            cm.dispose();
        }
    }
}
