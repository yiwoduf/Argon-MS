importPackage(Packages.client);
importPackage(java.sql);
importPackage(Packages.database);

var Jessica = 0;

var gun1 = 1000; // ȭ���� �̸�ŭ ������ �̺�Ʈ �ߵ�!


function startc() {
	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM boom WHERE status = ?");
	con.setString(1, "����")
	var eq = con.executeQuery();
	start = 0;
	gun = 0;
	while (eq.next()) {
		start = 1;
		total_gun = eq.getString("gun");
	}
}

function start() {
	Jessica = -1;
	action(1, 0, 0);
}
function action(music, type, girl) {
	(music == 1) ? Jessica++ : (Jessica--, cm.dispose());
	if (Jessica == 0) {
		startc();
		var Jess = "����~ ������ #e#rȭ����#k#n�� �ຸ�ðھ��?\r\n";

		if (start == 0) {
            Jess += "#b#L3#ȭ���� �ֱ�";
		} else {
			Jess += "������� ���� #e#rȭ����#k#n�� ������ #b" + total_gun + "��#k ����~\r\n\r\n";
			Jess += "#b#L1#ȭ���� �ֱ�";
		}
		if (cm.getPlayer().getGMLevel() >= 1) {
        	Jess += "\r\n#r#L2#[GM]���� ���� ����\r\n";
            Jess += "#r#L0#[GM]���� �̺�Ʈ ����\r\n";
            Jess += "#r#L4#[GM]���� �̺�Ʈ ����\r\n";
		}
		cm.sendSimple(Jess);

	} else if (Jessica == 1) {
		if (girl == 2) {
			cm.�Ƹ��̳�();
			cm.dispose();
		}
		if (girl == 0) {
			var insert = MYSQL.getConnection().prepareStatement("INSERT INTO boom(status, gun, date) VALUES(?,?,now())");
			insert.setString(1, "����");
			insert.setString(2, 0);
			insert.executeUpdate();
			cm.sendOk("����~ #r��ΰ� �Բ� ������ ��Ʈ����!!#k �̺�Ʈ�� ���۵Ǿ����~");
			cm.dispose();
		} else if (girl == 1) {
			cm.sendGetNumber("����~ ��� #rȭ����#k�� �ֽðھ��?", 1, 1, 1000);
			Jessica = 1;
		} else if (girl == 3) {
			cm.sendOk("���� ���� �̺�Ʈ�� ���۵��� �ʾҴ�ϴ�~");
			cm.dispose();
		} else if (girl == 4) {
            MYSQL.getConnection().prepareStatement("DELETE FROM boom").executeUpdate();
			cm.sendOk("���� �̺�Ʈ�� �����߽��ϴ�");
			cm.dispose();
		}

	} else if (Jessica == 2) {
        var gun = girl;
		if (cm.haveItem(4001128, gun)) {
			//txt = cm.getText();
			var total_guns = +total_gun;
			var plus_gun = total_guns + gun;
			MYSQL.getConnection().prepareStatement("UPDATE boom SET gun = '" + plus_gun + "' WHERE status = '����'").executeUpdate();
			if (plus_gun >= gun1) {
				cm.sendOk("���~~ ������ ���п� #b���� ����#k�� ��Ʈ�Ⱦ��!!");
				cm.gainItem(4001128, -gun);
				MYSQL.getConnection().prepareStatement("DELETE FROM boom").executeUpdate();
				cm.�Ƹ���();
				cm.dispose();
			} else {
				cm.sendOk(gun + "���� ȭ������ �ּż� #b" + plus_gun + "#k ���� #e#rȭ����#n#k�� �𿴾��~");
				cm.gainItem(4001128, -gun);
				cm.dispose();
			}
		} else {
			cm.sendOk("#e#rȭ����#k#n������ Ȯ���غ��ּ���");
			cm.dispose();
		}
	}
}
