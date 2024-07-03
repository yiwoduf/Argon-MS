importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);
importPackage(Packages.provider);
importPackage(Packages.tools);
importPackage(Packages.client);
importPackage(Packages.client.items);
importPackage(Packages.server.items);
importPackage(Packages.tools.packet);
importPackage(Packages.server);
importPackage(Packages.system);


var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}
변수1 = 0;
변수2 = 0;
변수3 = 0;
변수4 = 0;
변수5 = 0;
function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        if(변수1 == 0) {
        말1 = "#Cgray#아직 아이템이 선택되지 않았습니다." ;
        } else {
        말1 = "#i"+변수1+"# #b#z"+변수1+"##k 아이템이 선택되었습니다." 
              }
             if(변수2 == 0) {
        말2 = "#Cgray#아직 아이템이 선택되지 않았습니다." ;
        } else {
        말2 = "#i"+변수2+"# #b#z"+변수2+"##k 아이템이 선택되었습니다." 
              }
        if(변수3 == 0) {
        말3 = "#Cgray#아직 아이템이 선택되지 않았습니다." ;
        } else {
        말3 = "#i"+변수3+"# #b#z"+변수3+"##k 아이템이 선택되었습니다." 
              }
        if(변수4 == 0) {
        말4 = "#Cgray#아직 아이템이 선택되지 않았습니다." ;
        } else {
        말4 = "#i"+변수4+"# #b#z"+변수4+"##k 아이템이 선택되었습니다." 
              }
        if(변수5 == 0) {
        말5 = "#Cgray#아직 아이템이 선택되지 않았습니다." ;
        } else {
        말5 = "#i"+변수5+"# #b#z"+변수5+"##k 아이템이 선택되었습니다." 
              }
        말 = "안녕하세요? 에이플러스에 오신 #b#h ##k님 환영합니다!\r\n";
        말+= "저는 유저님한테 초기자금을 드리기 위해서 왔답니다.\r\n\r\n";
        말+= "#L0#"+말1+"#l\r\n"
        말+= "#L1#"+말2+"#l\r\n";
        말+= "#L2#"+말3+"#l\r\n";
        말+= "#L3#"+말4+"#l\r\n";
        말+= "#L4#"+말5+"#l\r\n\r\n";
        말+= "#k#L5#선택 완료! 이 아이템을 받을래요!"
        cm.sendSimple(말);
    } else if (status == 1) {
       선택 = selection;
       if(selection !=5) {
       cm.sendGetText(" \r\n초기템으로 원하시는 #r#e캐시 장비템#k#n의 이름을 검색해보세요!\r\n네? 아이템의 정확한 명칭을 모른신다고요?\r\n#b걱정 마세요, 일부분만 입력해도 검색이 가능하답니다.\r\n\r\n#e#r예) 죽음의 데스 → 데스로 검색이 가능합니다.\r\n\r\n");
       } else {
       if(변수1 != 0 && 변수2 != 0 && 변수3 != 0 && 변수4 != 0 && 변수5 != 0) {
       givePeriodItem(변수1,50,50,50,50,10,10,8,240);
       givePeriodItem(변수2,50,50,50,50,10,10,8,240);
       givePeriodItem(변수3,50,50,50,50,10,10,8,240);
       givePeriodItem(변수4,50,50,50,50,10,10,8,240);
       givePeriodItem(변수5,50,50,50,50,10,10,8,240);
       cm.gainMeso(100000000);
       cm.sendOk("자~ #b#h #님#k께서 선택하신 아이템들을 드렸어요! 아이템에는 #b소정의 스텟#k을 붙여 드렸고요, #b메소#k도 조금 드렸답니다. 앞으로 바론스토리를 열심히 플레이 해 주세요!");
       cm.gainItem(2431855,-1)
       cm.dispose();
       } else {
       cm.sendOk("어라? #b아이템을 다 선택하지 않으신 것#k 같은데요?\r\n아이템을 다 선택 하셨는지 #b다시 확인#k해 주세요!");
       cm.dispose();
       }
        }
    } else if (status == 2) {
       if(선택 !=5) {
       if(cm.getText().equals(" ")) {
	cm.sendOk("입력한 글자가 너무 짧습니다. 조금 더 자세하게 적어주세요.")
	cm.dispose();
	} else {
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,2);
		var dataProvider = MapleDataProviderFactory.fileInWZPath("String.wz");
		var retItems = new ArrayList();
		var it = ItemInformation.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "검색 결과입니다. 원하시는 아이템을 선택해주세요.#b\r\n";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
					chat += "";
					}
				}
			}
		else {
		chat += "#b#e발견된 아이템이 없습니다.#n#k";
	}
       
	cm.sendSimple(chat);
	}
       }
       } else if (status == 3) {
        if (선택 == 0) {
        변수1 = selection;
        cm.sendOk("오~ #i"+변수1+"# #b#z"+변수1+"##k 아이템을 고르시다니~\r\n역시 #h #님은 안목이 매우 뛰어나시군요!");
        } else if (선택 == 1) {
        변수2 = selection;
         cm.sendOk("오~ #i"+변수2+"# #b#z"+변수2+"##k 아이템을 고르시다니~\r\n역시 #h #님은 안목이 매우 뛰어나시군요!");
 } else if (선택 == 2) {
        변수3 = selection;
         cm.sendOk("오~ #i"+변수3+"# #b#z"+변수3+"##k 아이템을 고르시다니~\r\n역시 #h #님은 안목이 매우 뛰어나시군요!");
 } else if (선택 == 3) {
        변수4 = selection;
         cm.sendOk("오~ #i"+변수4+"# #b#z"+변수4+"##k 아이템을 고르시다니~\r\n역시 #h #님은 안목이 매우 뛰어나시군요!");
 } else {
        변수5 = selection;
         cm.sendOk("오~ #i"+변수5+"# #b#z"+변수5+"##k 아이템을 고르시다니~\r\n역시 #h #님은 안목이 매우 뛰어나시군요!");
         }
        status -=4;
     }
    
}

function givePeriodItem(ItemNum, Str, Dex, Int, Luk, Watk, Matk, Flag, Hour) {
	Item = ItemInformation.getInstance().getEquipById(ItemNum);
	Item.setStr(Str);
	Item.setDex(Dex);
	Item.setInt(Int);
	Item.setLuk(Luk);
	Item.setWatk(Watk);
	Item.setMatk(Matk);
	Item.setFlag(Flag);
	Item.setExpiration(Number(System.currentTimeMillis()) + Number(3600 * Hour * 1000));
	InventoryManipulator.addFromDrop(cm.getClient(), Item, false);
}