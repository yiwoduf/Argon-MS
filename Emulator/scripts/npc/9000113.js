/*
    @Author ���ǵ���(dla3753@naver.com)
*/

importPackage(java.lang);
importPackage(Packages.client.items);

var apink = -1;
/* �ʿ��� ������ / ���� */
var jungeunji = [4001254,1];
var kk = -1;

function action(mode,type,selection) { (mode != 1) ? (cm.dispose() + apink--) : apink++;
    if (apink == 0) {
        var chat = "#e25����ȭ#k�� ����ϴ� ���� ����Դϴ�.   ��ȭ�� ���� �����ϴ�. ��ŵ� �����غ�����\r\n��ȭ���� #i4001254#�Դϴ�.#b";
        chat += "\r\n#L0#��� ��ȭ";
        cm.sendSimple(chat);
    } else if (apink == 1) {
        var list = cm.getPlayer().getInventory(MapleInventoryType.EQUIP);
        var string = new StringBuilder();
        var check = false;
        for (var i = 0; i < list.getSlotLimit(); i++) {
             if (list.getItem(i) != null){
                 check = true;
                 string.append("#L" + i + "# #i").append(list.getItem(i).getItemId() + "# #b#t").append(list.getItem(i).getItemId() + "#").append("\r\n");
             }
        }   
        check == true ? cm.sendSimple("��ȭ�Ͻ� ��� �������� �������ּ���.\r\n" + string.toString()) : (cm.sendOk("��ȭ�� �����ϴ�.") , cm.dispose());
    } else if (apink == 2) {
        kk = selection;
        var equip = cm.getPlayer().getInventory(MapleInventoryType.EQUIP);
        var eunji = equip.getItem(selection);
        var string = new StringBuilder();
        string.append("#e������ ������ : #n#i" + eunji.getItemId() + "##b#t" + eunji.getItemId() + "# #k\r\n").append("#eSTR : #n").append(eunji.getStr() + "\r\n").append("#eDEX : #n").append(eunji.getDex() + "\r\n").append("#eINT : #n").append(eunji.getInt() + "\r\n").append("#eLuk : #n").append(eunji.getLuk() + "\r\n");
        cm.sendYesNo(string.toString() + "\r\n������ �������� ��ȭ �Ͻðڽ��ϱ�? �������� ��ȭ�ҽ� ��ȭ�� �����ۿ� #b�ý���#k�� 500�� ���� 600�� �ο��Ǹ� �������� ��ȭ �Ϸ��� #r25������#k 1���� �ʿ� �մϴ�.");
    } else if (apink == 3) {
        if (cm.haveItem(jungeunji[0],jungeunji[1]) == true) {
            var selected = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(kk);
            selected.setStr(selected.getStr() + 500);
            selected.setDex(selected.getDex() + 500);
            selected.setInt(selected.getInt() + 500);
            selected.setLuk(selected.getLuk() + 500);
            selected.setWatk(selected.getWatk() + 600);
            selected.setMatk(selected.getMatk() + 600);
            cm.gainItem(jungeunji[0],-jungeunji[1]);
            cm.sendOk("������ �������� ��ȭ �Ͽ����ϴ�. #r(�ý��� + 500)(���� + 600)#k");
        } else {
            cm.sendOk("�������� ��ȭ�Ϸ��� #r��¦�̴� ������ ����#k�� �ʿ��մϴ�.");
        }
        cm.dispose();
    }
}