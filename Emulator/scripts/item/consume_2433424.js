var status;

function start() {
    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
    return;
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            //cm.gainSponserItem(1112943,'[타임]',300,50,0);
	    //cm.gainRC(100000); //후원포인트
	    //cm.gainItem(4032101, 15); //해외의자 상자
            //cm.gainItem(4310198, 120); //해외캐시 상자[한벌,무기]
	    //cm.gainItem(2434981, 3); //검색캐시 유료 코인
	    //cm.gainItem(2430143, 10); //영원한 환생의 불꽃
	    //cm.gainItem(2433424,-1);
	    cm.dispose();
        } else { 
            cm.dispose();
        }
    }
}