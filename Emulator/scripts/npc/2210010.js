importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);

importPackage(Packages.constants);
importPackage(Packages.provider);
importPackage(Packages.tools);
importPackage(Packages.client);
importPackage(Packages.server.items);


var status = -1;

mesocost = 100000000;

var oldsel = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    if (mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
        if (status == 0) {
            var text = "#fn������� EXtrabold# GM[YOU]�� �����ϴ�#n\r\n\r\n";
            text += "#fUI/UIWindow2.img/UtilDlgEx/list5#\r\n"
            text += "#L2##fn������� EXtrabold# ���� �����ϰ� �ͽ��ϴ�.";
            cm.sendSimple(text);

        } else if (status == 1) {
            cm.sendGetText("#fn������� EXtrabold# ���� �̸��� ���� �ּ���.");
        } else if (status == 2) {
            if (cm.getText().equals(" ")) {
                cm.sendOk("#fn������� EXtrabold# �Է��� ���ڰ� �ʹ� ª���ϴ�. ���� �� �ڼ��ϰ� �����ּ���.")
                cm.dispose();
            } else {
                var chat = "";
                var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0, 2);
                var dataProvider = MapleDataProviderFactory.getDataProvider(new File("property/wz/String.wz"));
                var retItems = new ArrayList();
                var it = ItemInformation.getInstance().getAllItems().iterator();
                while (it.hasNext()) {
                    var itemPair = it.next();
                    if (itemPair.getLeft() >= 5000000 && itemPair.getLeft() <= 5999999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
                        retItems.add(itemPair.getLeft());
                    }
                }
                if (retItems != null && retItems.size() > 0) {
                    chat += "#fn������� EXtrabold# �˻� ����Դϴ�. ���Ͻô� �������� �������ּ���.#b\r\n";
                    var it2 = retItems.iterator();
                    while (it2.hasNext()) {
                        var singleRetItem = it2.next();
                        if (GameConstants.isPet(singleRetItem)) {
                            chat += "#L" + singleRetItem + "##i" + singleRetItem + "# #z" + singleRetItem + "#\r\n";
                        } else {
                            chat += ""
                        }
                    }
                } else {
                    chat += "#b#e#fn������� EXtrabold# �߰ߵ� ���� �����ϴ�.#n#k";
                }
                cm.sendSimple(chat);
            }

        } else if (status == 3) {
            itemid = selection;
            if (cm.getPlayer().getMeso() >= mesocost) {
		cm.gainMeso(-mesocost)
                cm.BuyPET(itemid);
                cm.sendOk("#fn������� EXtrabold# �Ϸ�Ǿ����ϴ�.");
                cm.dispose();
            } else {
                cm.sendOk("#fn������� EXtrabold# �޼Ұ� �����մϴ�.");
                cm.dispose();
            }
        }
}