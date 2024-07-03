function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("#fn나눔고딕 EXtrabold# 우리 사부님은 무릉에서 최고로 강한 분이지. 그런 분에게 네가 도전하겠다고? 나중에 후회하지마. #b\r\n#L0# 무릉 도장에 도전해볼게.#l\r\n#L1# 무릉도장 안내를 듣고싶어");
        } else if (status == 1) {
            if (selection == 0) {
                cm.sendSimple("무릉 도장에는 #b랭킹 모드#k로 선택해서 도전할 수 있어.  랭킹 모드는 #r130레벨 이상#k이어야 도전할 수 있어. 어떤 모드에 도전하겠어?#b\r\n\r\n#L10# 노말 모드로 도전할래<준비중>#l\r\n#L11# 하드 모드로 도전할래<준비중>#l\r\n#L13##r 랭킹 모드로 도전할래#l");
            } else if (selection == 1) {
            }
        } else if (status == 2) {
            if (selection == 13) {
                cm.changeMap(925060100);
                cm.c.getPlayer().getMap().mulungStageStart(cm.c.getPlayer());
                cm.dispose();
            }
        }
    }
}