var select = -1;
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
            boss = "#fn������� Extrablod##fs19##e #b#h0##k���� ������ !#b\r\n";
            boss += "#fn������� Extrablod##fs12##L0#���� ������#r(100�̻� ���� ����)#k\r\n";
            boss += "#fn������� Extrablod##fs12##L1##b�׸��� ������#r(100�̻� ���� ����)#k\r\n";
            boss += "#fn������� Extrablod##fs12##L2##b�Ǿƴ��� ������#r(100�̻� ���� ����)#k\r\n";
            boss += "#fn������� Extrablod##fs12##L3##b���������� ������#r(100�̻� ���� ����)#k\r\n";
            boss += "#fn������� Extrablod##fs12##L4##b���� ������#r(�߰���)#k\r\n";
            boss += "#fn������� Extrablod##fs12##L5##bī���� ���� ������#r(�߰���)#k\r\n";
            boss += "#fn������� Extrablod##fs12##L6##bȥ���� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L7##bī���� ȥ���� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L8##b��ũ�� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L9##b�ñ׳ʽ� ������#r(100�̻� ���� ����)\r\n";
            //boss += "#fn������� Extrablod##fs12##L10##b���� �� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L11##bī���� ���� �� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L12##b�ݹ� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L13##bī���� �ݹ� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L14##b���� �ǿ��� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L15##bī���� ���� �ǿ��� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L16##b���� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L17##bī���� ���� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L18##b���� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L19##b������ ���� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L20##b�� ���� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L21##b�ű׳ʽ� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L22##b��ī�̷� ������#r(100�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L23##b�Ҳɴ��� ������#r(220�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L24##b���� ������#r(220�̻� ���� ����)\r\n";
            //boss += "#fn������� Extrablod##fs12##L25##b��õ� ������#r(220�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L26##b���̾� ������#r(220�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L27##b�Ƿ� ������#r(220�̻� ���� ����)\r\n";
            boss += "#fn������� Extrablod##fs12##L28##b�츣�� ������#r(220�̻� ���� ����)\r\n";


            cm.sendSimple(boss);              
        } else if (status == 1) {
            if (selection >= 0) {
                cm.ChaosBossSpawn(selection);
                cm.dispose();
            } else {
                cm.dispose();
            }
        }
    }
}
