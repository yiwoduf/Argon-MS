importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);

var first = new Array("불쌍한","남장한","여장한","뚱뚱한","흑인","날씬한","가벼운","멍청한", "똑똑한", "착한", "멍청한","미련한","어리석은","먹을것을 좋아하는","남자를 좋아하는","여자를 좋아하는","여자를 밝히는","똥을 먹는","냄새나는","사랑스러운","시크한","진격의","잘생긴","못생긴","섹시한","울퉁불퉁한","하찮은","구타당하는","도발하는","우락부락한","알바하는","요리하는","허접한","도박하는","전자발찌를 찬","대리운전하는","귀여운","역겨운","귀여운척 하는", "장미무늬가 세겨진","남자를 좋아하는","돌로 만든","백마탄","나뭇잎마을의","앙증맞은","꽃을든","원탁의","전설의","성전환수술을 한", "오로라", "사라센을 닮은", "불쌍한","남장한","여장한","뚱뚱한","흑인","날씬한","가벼운","멍청한", "똑똑한", "착한", "멍청한","미련한","어리석은","먹을것을 좋아하는","남자를 좋아하는","여자를 좋아하는","여자를 밝히는","똥을 먹는","냄새나는","사랑스러운","시크한","진격의","잘생긴","못생긴","섹시한","울퉁불퉁한","하찮은","구타당하는","도발하는","우락부락한","알바하는","요리하는","허접한","도박하는","전자발찌를 찬","대리운전하는");
var second = new Array("겨드랑이털","사람","짐승","미생물","단세포","소방관","경찰관","국회의원","돼지","게이","트랜스젠더","강아지","앵무새","의사","변호사","판사","가수","김기사","게이바 주인","아프리카BJ","명탐정","거인","노예","엉덩이","회사원","요리킹 조리킹","장미칼","롱스톤","AV배우","라운드걸","토마토","근육몬","아구몬","마왕","여동생","남동생","아빠","엄마","폐인","강간범","고영욱","로리콘","오타쿠","행운의 당첨쟈","민물장어","트롤","선생님","왕자님","공주님","스님","파워레인져","오크","호카게","의자왕","대통령","기사", "미녀","미남","오빠", "이벤트 당첨자","오빠","오빠","오빠","오빠","오빠","오빠","오빠","오빠","오빠","오빠","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인","폐인", "쓰레기", "겨드랑이털","사람","짐승","미생물","단세포","소방관","경찰관","국회의원","돼지","게이","트랜스젠더","강아지","앵무새","의사","변호사","판사","가수","김기사","게이바 주인","아프리카BJ","명탐정","거인","노예");


function start() {
	if(cm.getPlayer().getGMLevel() > 0){
		cm.getPlayer().send(MainPacketCreator.sendHint("#fn나눔고딕 Extrabold# 오로라 이벤트 당첨자가 당첨되면 아이템이 지급된다구?!", 400, 20));
	}

	var str = "";
	cm.sendYesNo("#fn나눔고딕 Extrabold# 당신의 장래희망을 보고싶으세요? #r후회할수도 있어요...#k\r\n현재 당신의 장래희망 : #b"+selectHope()+"#k\r\n#Cgray#장래희망을 확인하거나 교체하려면 10,000,000메소가 필요합니다.");
}

function getRand(len){
	return Math.floor(Math.random()*len);
}

function shuffle() {
	return first[getRand(first.length)]+" "+second[getRand(second.length)];
}

function updateHope(str){
	var insert = MYSQL.getConnection().prepareStatement("INSERT INTO futurehope(cid,hope) VALUES(?,?)");
	insert.setInt(1,cm.getPlayer().getId());
	insert.setString(2,str);
	deleteHope(cm.getPlayer().getId());
	insert.executeUpdate();
}

function selectHope(){
	var sq = MYSQL.getConnection().prepareStatement("SELECT * FROM futurehope WHERE cid = ?");
	sq.setInt(1,cm.getPlayer().getId());
	var eq = sq.executeQuery();
	var string = new StringBuilder();
	if(eq.next()){
	string.append("[").append(eq.getString("hope")).append("]\r\n");
	}
	return string.toString();
}

function deleteHope(cid) {
	var dq = MYSQL.getConnection().prepareStatement("DELETE FROM futurehope where cid = ?");
	dq.setInt(1,cid);
	dq.executeUpdate();
}

var status=-1;

function action(m,t,s) {
	m==1?status++:cm.dispose();
	if(status==0){
	var text = shuffle();
	cm.getPlayer().send(MainPacketCreator.sendHint("장래희망 : "+text,200,20))||cm.getMeso()>10000000?cm.sendOk("당신의 장래희망은 "+text+"입니다.")||cm.gainMeso(-10000000)||updateHope(text)||WorldBroadcasting.broadcast(UIPacket.detailShowInfo("["+cm.getPlayer().getName()+"]님의 장래희망은 "+text+"입니다.",false)):cm.sendOk("10,000,000메소가 부족합니다.")||cm.dispose();
	cm.dispose();
	}else{
	cm.dispose();
	}
}