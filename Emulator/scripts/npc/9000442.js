/*
@by.���� (m_m_m_m_m_99911111@nate.com) �� �����߽��ϴ�.

*/

importPackage(Packages.database);
importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.client.items);

var status = -1;
var text ;

var time = new Date();
var day = time.getDay();

var year = time.getFullYear();
var month = time.getMonth() + 1;
var date = time.getDate();
var hour = time.getHours();
var min = time.getMinutes();

var days = year+"�� "+month+"�� "+date+"�� "+hour+"�� "+min+"�� ";

function start() {
    status = -1;
    action (1, 0, 0);
}

function Listdays() {
	 var con = MYSQL.getConnection().prepareStatement("SELECT * FROM ItemEquip WHERE Name = ?");
 	 con.setString(1, cm.getName());
 	  eq = con.executeQuery();
 	   if (eq.next()) {
                return eq.getString("days");
	} 

}
function ItemLimit(text , table , types , typ) {
	 
	var chat  ="#fn�������##b���� " + text +" ����� ������ ����Դϴ� ���� ������ : " + Listdays() +"\r\n\r\n#k";
          var  con = MYSQL.getConnection().prepareStatement("SELECT * FROM "+table+" WHERE accountid = "+cm.getPlayer().getAccountID()+" ORDER BY ItemId DESC LIMIT 300").executeQuery();
  	 while (con.next()) {
	if (con.getInt(typ) == types) {
	chat +="#i"+con.getInt("ItemId") + "# #z"+con.getInt("ItemId") + "# ���� : #e" + con.getInt("Quantity")+" #n��\r\n";
	}
	}
	cm.sendSimple(chat);


}
function Itemlist () {
      var insert = MYSQL.getConnection().prepareStatement("INSERT INTO ItemEquip(Name,ItemId,Str,Dex,Inter,Luker,Hp,Mp,Watk,Matk,Mdef,Acc,Avoid,Hands,Speed,Jump,HpR,MpR,IgnoreWdef,SoulName,SoulEnchanter,SoulPotential,CharmEXP,StarForce,BossDamage,AllDamageP,AllStatP,Enhance,Potential1,Potential2,Potential3,Potential4,Potential5,Potential6,quantity,type,days,accountid,stats) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    inv = cm.getPlayer().getInventory(MapleInventoryType.EQUIP);
		for (i = 0; i<100;i++) {
		if (inv.getItem(i) !=null) {
                        Item = inv.getItem(i);
                        equip  = Item;
                        insert.setString(1,cm.getPlayer().getName());
                        insert.setInt(2,equip.getItemId());
                        insert.setInt(3,equip.getStr());
                        insert.setInt(4,equip.getDex());
                        insert.setInt(5,equip.getInt());
                        insert.setInt(6,equip.getLuk());
                        insert.setInt(7,equip.getHp());
                        insert.setInt(8,equip.getMp());
                        insert.setInt(9,equip.getWatk());
                        insert.setInt(10,equip.getMatk());
                        insert.setInt(11,equip.getMdef());
                        insert.setInt(12,equip.getAcc());
                        insert.setInt(13,equip.getAvoid());
                        insert.setInt(14,equip.getHands());
                        insert.setInt(15,equip.getSpeed());
                        insert.setInt(16,equip.getJump());
                        insert.setInt(17,equip.getHpR());
                        insert.setInt(18,equip.getMpR());
                        insert.setInt(19,equip.getIgnoreWdef());
                        insert.setInt(20,equip.getSoulName());
                        insert.setInt(21,equip.getSoulEnchanter());
                        insert.setInt(22,equip.getSoulPotential());
                        insert.setInt(23,equip.getCharmEXP());
                        insert.setInt(24,equip.getStarForce()); 
                        insert.setInt(25,equip.getBossDamage());
                        insert.setInt(26,equip.getAllDamageP());
                        insert.setInt(27,equip.getAllStatP());
                        insert.setInt(28,equip.getEnhance());
                        insert.setInt(29,equip.getPotential1());
                        insert.setInt(30,equip.getPotential2());
                        insert.setInt(31,equip.getPotential3());
                        insert.setInt(32,equip.getPotential4());
                        insert.setInt(33,equip.getPotential5());
                        insert.setInt(34,equip.getPotential6());
                        insert.setInt(35,Item.getQuantity());
                        insert.setInt(36,1);
                        insert.setString(37,days);
                        insert.setInt(38,cm.getPlayer().getAccountID());
                        insert.setInt(39,equip.getState());
 	               insert.executeUpdate();
		}
	}

  var insert = MYSQL.getConnection().prepareStatement("INSERT INTO itemuse(Name,ItemId,quantity,types,days,accountid) VALUES(?,?,?,?,?,?)");
    inv = cm.getInventory(2);
		for (i = 0; i<cm.getInventory(2).getSlotLimit();i++) {
		if (inv.getItem(i) !=null) {
                        Item = inv.getItem(i);
		equip = Item;
                        insert.setString(1,cm.getPlayer().getName());
                        insert.setInt(2,Item.getItemId());
                        insert.setInt(3,Item.getQuantity());
                        insert.setInt(4,2);
                        insert.setString(5,days);
                        insert.setInt(6, cm.getPlayer().getAccountID());
 	           insert.executeUpdate();
		}
	}
  var insert = MYSQL.getConnection().prepareStatement("INSERT INTO itemuse(Name,ItemId,quantity,types,days,accountid) VALUES(?,?,?,?,?,?)");
    inv = cm.getInventory(3);
		for (i = 0; i<cm.getInventory(3).getSlotLimit();i++) {
		if (inv.getItem(i) !=null) {
                         Item = inv.getItem(i);
		equip = Item;
                        insert.setString(1,cm.getPlayer().getName());
                        insert.setInt(2,Item.getItemId());
                        insert.setInt(3,Item.getQuantity());
                        insert.setInt(4,3);
                        insert.setString(5,days);
                        insert.setInt(6, cm.getPlayer().getAccountID());
 	           insert.executeUpdate();
		}
	}
  var insert = MYSQL.getConnection().prepareStatement("INSERT INTO itemuse(Name,ItemId,quantity,types,days,accountid) VALUES(?,?,?,?,?,?)");
    inv = cm.getInventory(4);
		for (i = 0; i<cm.getInventory(4).getSlotLimit();i++) {
		if (inv.getItem(i) !=null) {
                        Item = inv.getItem(i);
		equip = Item;
                        insert.setString(1,cm.getPlayer().getName());
                        insert.setInt(2,Item.getItemId());
                        insert.setInt(3,Item.getQuantity());
                        insert.setInt(4,4);
                        insert.setString(5,days);
                        insert.setInt(6, cm.getPlayer().getAccountID());
 	           insert.executeUpdate();
		}
	}
  var insert = MYSQL.getConnection().prepareStatement("INSERT INTO itemuse(Name,ItemId,quantity,types,days,accountid) VALUES(?,?,?,?,?,?)");
    inv = cm.getInventory(5);
		for (i = 0; i<cm.getInventory(5).getSlotLimit();i++) {
		if (inv.getItem(i) !=null) {
                        Item = inv.getItem(i);
                        insert.setString(1,cm.getPlayer().getName());
                        insert.setInt(2,Item.getItemId());
                        insert.setInt(3,Item.getQuantity());
                        insert.setInt(4,5);
                        insert.setString(5,days);
                        insert.setInt(6, cm.getPlayer().getAccountID());
 	           insert.executeUpdate();
		}
	}
	

}
function Delequip (){ 
  var del = MYSQL.getConnection().prepareStatement("DELETE FROM ItemEquip WHERE name = ?");
  del.setString(1,cm.getName());
  del.executeUpdate();

}
function Deleuse (){ 
  var del = MYSQL.getConnection().prepareStatement("DELETE FROM Itemuse WHERE name = ?");
  del.setString(1,cm.getName());
  del.executeUpdate();
}
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
	var chat = "#fn�������#�� �÷��� ������ �������Դϴ�.\r\n#r�켱! �����ϰ������������ �����ֽð� �̿����ּ��� !#k\r\n  ������ �������̶� �������� �ʱ�ȭ�ǰų� �������°� ������ �������� ���Ƿ� ������� �ʱ�ȭ�� �������� �������� ����Ƚ����� �����۵��� �����޴� �ý����Դϴ�\r\n#r�������� �����ϼ̴µ� �������� �ʱ�ȭ �Ǽ������ īī���� : ddkk131 �� ���� �ּ��� !! \r\n#L1##b���ݹٷ� ���������� �����ϰڽ��ϴ�\r\n";
	cm.sendSimple(chat);
	} else if (status == 1) {
	var chat ="#fn�������#������ �������� �������ּ���.\r\n";
	chat +="#L1#������ #b���#k ������ Ȯ���ϱ�\r\m";
	chat +="#L2#������ #b�Һ�#k ������ Ȯ���ϱ�\r\m";
	chat +="#L3#������ #b��Ÿ#k ������ Ȯ���ϱ�\r\n";
	chat +="#L4#������ #b��ġ#k ������ Ȯ���ϱ�\r\n";
	chat +="#L5#������ #bĳ��#k ������ Ȯ���ϱ�\r\n";
	chat +="#L6##b"+Listdays()+" ���� �����ͻ��� �� �� �����ϰڽ��ϴ�.";
	cm.sendSimple(chat);
	} else if (status == 2) {
	sel = selection;
	 if (sel == 1) {
 	ItemLimit("���" , "itemequip",1,"Type");
	cm.dispose();
	} else if (sel == 2) {
 	ItemLimit("�Һ�", "itemuse",2,"types");
	cm.dispose();
	} else if (sel == 3) {
 	ItemLimit("��ġ" ,  "itemuse",4,"types");
	cm.dispose();
	} else if (sel == 4) {
 	ItemLimit("��Ÿ" , "itemuse",3,"types");
	cm.dispose();
	} else if (sel == 5) {
 	ItemLimit("ĳ��" , "itemuse",5,"types");
	cm.dispose();
	} else if (sel == 6) {
	Delequip (cm.getPlayer().getName());
	Deleuse (cm.getPlayer().getName());
	Itemlist();
	cm.sendOk("#fn�������##b��� �����۵��� ���������� �������ϴ?");
	cm.dispose();return;
	} 
	} else if (status == 3) {
	 Itemlist ();
	cm.sendOk("#fn�������##b��� �����۵��� ���������� �������ϴ?");
	cm.dispose();return;
	} 
      } 


