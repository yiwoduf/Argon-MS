var status = -1;
var point = 10000;//후포
importPackage(Packages.constants);
importPackage(Packages.client.skills);

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        var chat = "안녕 #b#h0##k, 악마와 계약을맺어볼래? \r\n#e#r#l#h0#님의 현재 후원포인트 "+cm.getRC()+"원#k#l\r\n        ";
   	chat += "\r\n#L0##s5321054##b 벅샷 (추가타) #r[특별 후원]#k#r#n#l\r\n";
   	chat += "#L1##e#s80001140##b 빛의 수호 (버프) #r [특별 후원]#k#r#n#l\r\n";
        chat += "#L2##e#s2311003##b 홀리 심볼 (버프) #r [특별 후원]#k#r#n#l\r\n";
        chat += "#L3##e#s3121002##b 샤프 아이즈 (버프) #r [특별 후원]#k#r#n#l\r\n";
        chat += "#L4##e#s5121009##b 윈드 부스터 (버프) #r [특별 후원]#k#r#n#l\r\n";
        chat += "#L5##e#s4331002##b 미러 이미징 (도적) #r [특별 후원]#k#r#n#l\r\n";
        chat += "#L6##e#s13101022##b 트라이플링 윔||| #r [특별 후원]#k#r#n#l\r\n";
        chat += "#L7##e#s3100010##b 마법 화살 #r [특별 후원]#k#r#n#l\r\n";
        chat += "#L8##e#s24120002##b 느와르 카르트#r [특별 후원]#k#r#n#l\r\n";
        chat += "#L9##e#s24100003##b 블링 카르트#r [특별 후원]#k#r#n#l\r\n";
	chat += "#L10##e#s142110011##b텔레 키네시스#r [특별 후원]#k#r#n#l#r#n";
        cm.sendSimple(chat);         
    } else if (selection >= 0) {
	//cm.moneyBuff(selection);
	cm.sendOk("카카오톡 : @오로라온라인\r\n네이트온 : saracen_dev@nate.com\r\n특별 후원은 1:1 상담을 이용해주세요!");
	cm.dispose();
	}
}