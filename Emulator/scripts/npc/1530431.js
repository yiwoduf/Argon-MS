var status = -1;

function start() {
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {        
        var contents = "";
        contents += "#h0# �� �����÷����� ���Ű��� ȯ���մϴ�.\r\n�Ʒ����� ���Ͻô� �޴��� �����Ͽ� �ּ���\r\n\r\n\r\n";

        contents += "                         #e[�Ϲ�������]#n\r\n";
        contents += "#b#L2192002#������ŷ#l#d#n";
        contents += "#b#L1540011#�����ϱ�#l#d#n";
        contents += "#b#L1012112#�޼ҹ���#l#d#n";
        contents += "#b#L9000036#��������#l#d#n\r\n";
        contents += "#b#L4#��ȥ�ϱ�#l#d#n";
        contents += "#b#L2520002#�ߵ�����#l#d#n";
        contents += "#b#L1022003#���Ǻ���#l#d#n";
        contents += "#b#L1000000#ĳ���̵�#l#d#n\r\n";
        contents += "#b#L999999#��������#l#d#n";
        contents += "#b#L2010011#������#l#d#n";
        contents += "#b#L3#�����ϱ�#l#d#n";
        contents += "#b#L2510012#���̽���#l#d#n\r\n\r\n";
        
        contents += "                         #e#r[����������]#d#l#n\r\n";
        contents += "#g#L2400006#�ζǱ���#l#d#n";
        contents += "#g#L1012103#��������#l#d#n";
        contents += "#g#L9300005#�޼Ұ�ȭ#l#d#n";
        contents += "#g#L1012101#�ʿ���ȭ#l#d#n\r\n";
        contents += "#g#L2470018#���Ѱ�ȭ#l#d#n";
        contents += "#g#L9000018#���ù�ŷ#l#d#n";
        contents += "#g#L1052107#��������#l#d#n";
        contents += "#g#L9062004#��������#l#d#n\r\n\r\n\r\n";

        contents += "                         #e[����������]#n\r\n";
        contents += "#r#L2411023#��������#l#d#n";
        contents += "#r#L2411024#��ֿ���#l#d#n";
        contents += "#r#L1530051#����Żȯ#l#d#n";
        contents += "#r#L9001061#���뺭��#l#d#n\r\n";
        contents += "#r#L9070010#�̽��ʵ�#l#d#n";
        contents += "#r#L0000005#��������#l#d#n\r\n\r\n";

        /*contents += "                         #e#b[��ȭ������]#d#l#n\r\n";
        contents += "#e#d#L9300005#�޼Ұ�ȭ#l#d#n";
        contents += "#e#d#L1012101#�ʿ���ȭ#l#d#n";
        contents += "#e#d#L2470018#���Ѱ�ȭ#l#d#n";*/
        cm.sendSimple(contents);

    } else if (status == 1) {
        var s = selection;   
        if (s > 1000000) {
            cm.dispose();
            cm.openNpc(s);
        } else if (s == 1000000) {
            cm.dispose();
            cm.openCS();
        } else if (s == 999999) {
            cm.warp(910000001, 0);
            cm.dispose();
        } else if (s == 3) {
            cm.warp(3000500, 0);
            cm.dispose();
        } else if (s == 4) {
            cm.warp(680000300, 0);
            cm.dispose();
        }
    }
}
        
