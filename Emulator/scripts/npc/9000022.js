
function start() {
 if (true) {
	    var chat = "안녕하세요, "+ cm.getPlayer().getName() +" 님도 저와 같은 궁극의 패션을 가지고 싶으신가요? #b크리스탈#k만 있으면 당신도 가능합니다. \r\n";
	    //chat += "#L4##b[올라올라]고지를 향해서#k#e#r(난이도:★★★☆☆)#k#n\r\n";
            chat += "#L0##b#v4251202#x3 으로 최신 캐시아이템 구매!";
chat += "\r\n#L1##v4251002#x40 으로 최신 캐시아이템 구매!";
   	    cm.sendSimple(chat);
}
}
function action(mode, type, selection) {
cm.dispose();
        if (selection == 0) {
        	cm.dispose();
	cm.openNpc(9310016);

	 } else if (selection == 1) {
	 	cm.dispose();
	cm.openNpc(9310017);

	}
	}
    




