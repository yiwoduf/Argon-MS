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
            cm.sendSimple("#fn������� EXtrabold# �츮 ��δ��� �������� �ְ�� ���� ������. �׷� �п��� �װ� �����ϰڴٰ�? ���߿� ��ȸ������. #b\r\n#L0# ���� ���忡 �����غ���.#l\r\n#L1# �������� �ȳ��� ���;�");
        } else if (status == 1) {
            if (selection == 0) {
                cm.sendSimple("���� ���忡�� #b��ŷ ���#k�� �����ؼ� ������ �� �־�.  ��ŷ ���� #r130���� �̻�#k�̾�� ������ �� �־�. � ��忡 �����ϰھ�?#b\r\n\r\n#L10# �븻 ���� �����ҷ�<�غ���>#l\r\n#L11# �ϵ� ���� �����ҷ�<�غ���>#l\r\n#L13##r ��ŷ ���� �����ҷ�#l");
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