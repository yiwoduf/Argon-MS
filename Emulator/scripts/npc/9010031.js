importPackage(Packages.packet.creators);
importPackage(Packages.client.items);
importPackage(Packages.server.items);
importPackage(Packages.launch.world);
importPackage(Packages.main.world);
importPackage(Packages.database);
importPackage(java.lang);
// cm.gainItem(item4[0], item4[1]);
//cm.gainItem(item5[0], item5[1]);
/* (명) 추천인에게 지급할 아이템 */
var item = 0;
var item4 = new Array(0, 0);
var item5 = new Array(0, 0);
/* 추천을 했을 때 지급할 아이템 */
var item2 = new Array(0, 0);
var item3 = new Array(0, 0);
var item6 = new Array(0, 0)
var status = -1;

/* 추천인 등록 체크 */
function overlab_recom(name, name2) {
	var c = MYSQL.getConnection();
	var con = c.prepareStatement("SELECT * FROM recom_log WHERE name LIKE '"+name+"%'").executeQuery();

	overlab = true;
	if (!con.next()) overlab = false;

	con.close();
	c.close();
	return overlab;
}

function getAccIdFromDB(name) {
	var c = MYSQL.getConnection();
	var con = c.prepareStatement("SELECT * FROM characters WHERE name LIKE '" + name + "%'").executeQuery();
	var ret = -1;
	if (con.next()) {
		ret = con.getInt("accountid");
	}
	con.close();
	c.close();
	return ret;
}

/* 추천인 등록 */
function join_recom(name, name2, recom) {
	var con = MYSQL.getConnection();
	var insert = con.prepareStatement("INSERT INTO recom_log(name, recom, state, date) VALUES(?,?,?,now())");
	insert.setString(1, name+"%"+name2);
	insert.setString(2, recom);
	insert.setString(3, 0);
	insert.executeUpdate();
	insert.close();
	con.close();
}

/* 추천인 랭킹 */
function recom_log() {
	var txt = new StringBuilder();
	var c = MYSQL.getConnection();
	var con = c.prepareStatement("SELECT id, recom, count(*) AS player FROM recom_log GROUP BY recom ORDER BY player DESC").executeQuery();
	var rank = 0;
	while(con.next()) {
		txt.append("#L"+con.getInt("id")+"#")


		.append("추천인 코드 #k: ").append(con.getString("recom")).append(" | ")
		.append("추천 수 #k: #e").append(con.getString("player")).append("#n\r\n");
		rank++;
	}
	con.close();
	c.close();
	return txt.toString();
}

/* 추천인 리스트 */
function recom_list(id) {
	var txt = new StringBuilder();
	var c = MYSQL.getConnection();
	var idcon = c.prepareStatement("SELECT * FROM recom_log WHERE id = '"+id+"'").executeQuery();
	idcon.next(), recom_per = idcon.getString("recom");

	var con = c.prepareStatement("SELECT * FROM recom_log WHERE recom = '"+recom_per+"'").executeQuery();
	txt.append(recom_per+"님을 추천하신 플레이어들 입니다.\r\n\r\n");
	while(con.next()) {
		var con_name = con.getString("name").split("%");
		txt.append("닉네임 : #e").append(con_name[1]).append("#n | ")
		.append("날짜 : ").append(con.getDate("date")+" "+con.getTime("date")).append("\r\n");
	}
	con.close();
	c.close();
	return txt.toString();
}

/* 추천인 수 불러오기 */
function recom_num(name) {
	var c = MYSQL.getConnection();
	var con = c.prepareStatement("SELECT COUNT(*) AS player FROM recom_log WHERE recom = '"+name+"' and state = 0").executeQuery();
	con.next();
	recoms_num = con.getString("player");
	con.close();
	c.close();
}

/* 추천인 닉네임 불러오기 */
function recom_person(name) {
	var txt = new StringBuilder();
	var c = MYSQL.getConnection();
	var con = c.prepareStatement("SELECT * FROM recom_log WHERE recom = '"+name+"' and state = 0").executeQuery();

	while(con.next()) {
		var con_name = con.getString("name").split("%");
		txt.append("#b["+con_name[1]+"] ");
	}
	con.close();
	c.close();
	return txt.toString();
}

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {

/* 스크립트 시작 설정 */
if (mode == 1) { status++;
} else { cm.dispose(); return; }

/* 스크립트 메인 부분 */
if (status == 0) {
	cm.sendSimple("#fn나눔고딕 Extrabold# #b"+cm.getPlayer().getName()+"#k님은 어떤 분에게 소개를 받고 오셨나요? 그분에게 보답하기 위해 이번에는 #b"+cm.getPlayer().getName()+"#k님께서 소개를 해보시는 건 어떠세요? 만약, "+cm.getPlayer().getName()+"님의 소개를 받고 오신 분이 있다면, 작은 아이템을 드리도록 할게요! #r#e(추천인은 추천해주신분의 게임닉네임을 적어주시면 됩니다)#n.\r\n\r\n#fUI/UIWindow.img/UtilDlgEx/list1#\r\n#L0##b추천인#k 등록하기\r\n#L1##b추천인#k 랭킹보기#l\r\n\r\n\r\n#fUI/UIWindow.img/UtilDlgEx/list0#\r\n#L2##b추천인#k 아이템 받기");

} else if (status == 1) {
if (selection == 0) {
	if (!overlab_recom(cm.getClient().getAccID(), cm.getPlayer().getName())) {
		cm.sendGetText("#b"+cm.getPlayer().getName()+"#k님은 어떤 분의 소개로 오셨나요? 항상 그분에게 보답하고 싶으셨죠? 이곳에 그분의 #b이름#k을 쓰신다면, 제가 조금 도와 드릴게요. 하지만, #r한번 입력 하시면 되돌릴 수 없으니#k 신중하게 입력 해주세요.");

	} else {
		cm.sendOk("#b"+cm.getPlayer().getName()+"#k님이 항상 감사하는 마음을 가지고 계신 것… 잘 알고 있지만, 더이상은 도와 드릴 수가 없어요….");
		cm.dispose();
	}

} else if (selection == 1) {
	cm.sendSimple("이곳은 많은 분들에게 지지를 받고 계신 분들의 목록이에요. #b"+cm.getPlayer().getName()+"#k님께서도 한번쯤은 이곳에 등록 되어보고 싶지 않으세요?\r\n"+recom_log());
	status = 2;

} else if (selection == 2) {
	recom_num(cm.getPlayer().getName());
	if (recoms_num == 0) cm.sendOk("…아쉽지만, 이번에는 #b"+cm.getPlayer().getName()+"#k님을 지지하신 분이 계시지 않네요. 하지만… 곧 생기실 것이니, 크게 실망하지 않으셨으면 좋겠어요. 사실 지지율 이라는게…. 별 것 아니거든요."), cm.dispose();
	else {
		cm.sendOk("역시나… 정말 대단하시네요. #b"+cm.getPlayer().getName()+"#k님은 절 찾아 오실때마다 더 많은 지지를 받고 계신 것 같아요. 이번에는 "+recoms_num+"명 "+recom_person(cm.getPlayer().getName())+"#k의 지지를 받으셨어요.\ ");
		//cm.gainItem(item4[0], item4[1]*Integer.parseInt(recoms_num));
      	        //cm.gainItem(item5[0], item5[1]*Integer.parseInt(recoms_num));
		//cm.gainRC(item*Integer.parseInt(recoms_num));
		//cm.getPlayer().dropMessage(1, item*Integer.parseInt(recoms_num) + "후원 포인트를 지급 받았습니다.");
		var c = MYSQL.getConnection();
		c.prepareStatement("UPDATE recom_log SET state = 1 WHERE recom = '"+cm.getPlayer().getName()+"'").executeUpdate();
		c.close();
		cm.dispose();
	}
}

} else if (status == 2) {
	if (cm.getText().equals("") || cm.getText().equals(cm.getPlayer().getName()) || getAccIdFromDB(cm.getText()) == getAccIdFromDB(cm.getPlayer().getName())) {
		cm.sendOk(cm.getText().equals("") ? "입력을 잘못 하셨습니다." : "자기 자신을 추천 할 수는 없습니다.");
		cm.dispose();
	} else {
		join_recom(cm.getClient().getAccID(), cm.getPlayer().getName(), cm.getText());
		//cm.gainItem(item2[0], item2[1]);
		//cm.gainItem(item3[0], item3[1]);
		//cm.gainItem(item6[0], item6[1]);
		//cm.sendOk("이건 #b"+cm.getPlayer().getName()+"#k님에게 드리는 저의 작은 성의입니다. 앞으로의 여행에 큰 도움이 될 거예요.");
		WorldBroadcasting.broadcast(MainPacketCreator.getGMText(7, "[알림] "+ cm.getPlayer().getName()+" 님이 "+cm.getText()+" 님을 추천인으로 등록하셨습니다."));

		cm.dispose();
	}

} else if (status == 3) {
	cm.sendOk(recom_list(selection));
	cm.dispose();
}
}
