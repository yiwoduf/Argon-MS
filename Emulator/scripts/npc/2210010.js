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
            var text = "#fn나눔고딕 EXtrabold# GM[YOU]는 위대하다#n\r\n\r\n";
            text += "#fUI/UIWindow2.img/UtilDlgEx/list5#\r\n"
            text += "#L2##fn나눔고딕 EXtrabold# 펫을 구매하고 싶습니다.";
            cm.sendSimple(text);

        } else if (status == 1) {
            cm.sendGetText("#fn나눔고딕 EXtrabold# 펫의 이름을 적어 주세요.");
        } else if (status == 2) {
            if (cm.getText().equals(" ")) {
                cm.sendOk("#fn나눔고딕 EXtrabold# 입력한 글자가 너무 짧습니다. 조금 더 자세하게 적어주세요.")
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
                    chat += "#fn나눔고딕 EXtrabold# 검색 결과입니다. 원하시는 아이템을 선택해주세요.#b\r\n";
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
                    chat += "#b#e#fn나눔고딕 EXtrabold# 발견된 펫이 없습니다.#n#k";
                }
                cm.sendSimple(chat);
            }

        } else if (status == 3) {
            itemid = selection;
            if (cm.getPlayer().getMeso() >= mesocost) {
		cm.gainMeso(-mesocost)
                cm.BuyPET(itemid);
                cm.sendOk("#fn나눔고딕 EXtrabold# 완료되었습니다.");
                cm.dispose();
            } else {
                cm.sendOk("#fn나눔고딕 EXtrabold# 메소가 부족합니다.");
                cm.dispose();
            }
        }
}