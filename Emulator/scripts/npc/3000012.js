/*

	만든 이 : Rian Story Team

	엔피시아이디 : 3000012

	엔피시 이름 : 디멘션 게이트

	엔피시가 있는 맵 : 판테온 - 대신전 내부 (400000001)

	엔피시 설명 : 메이플 월드이동

*/

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
         cm.sendSimple("#L1# 헤네시스#L2# 엘리니아#L3# 페리온#L4#커닝시티\r\n#L5# 리스항구#L6#슬리피우드#L7#노틸러스#L8# 에레브#L9#리엔\r\n#L10#오르비스#L11#엘나스#L12#루디브리엄#L15#아쿠아리움\r\n#L16#리프레#L17#무릉#L18# 백초마을#L19#아리안트#L20#마가티아\r\n#L21#에델슈타인#L22#에우렐#L23#크리티아스#L24# 헤이븐");
	    } else if (status == 0) {
		cm.warp(104020000);
		cm.dispose();

	    } else if(selection == 1) {
		cm.warp(100000000);
		cm.dispose();

	    } else if(selection == 2) {
		cm.warp(101000000);
		cm.dispose();

	    } else if(selection == 3) {
		cm.warp(102000000);
		cm.dispose();

	    } else if(selection == 4) {
		cm.warp(103000000);
		cm.dispose();

	    } else if(selection == 5) {
		cm.warp(104000000);
		cm.dispose();

	    } else if(selection == 6) {
		cm.warp(105000000);
		cm.dispose();

	    } else if(selection == 7) {
		cm.warp(120000000);
		cm.dispose();

	    } else if(selection == 8) {
		cm.warp(130000000);
		cm.dispose();

	    } else if(selection == 9) {
		cm.warp(140000000);
		cm.dispose();

	    } else if(selection == 10) {
		cm.warp(200000000);
		cm.dispose();

	    } else if(selection == 11) {
		cm.warp(211000000);
		cm.dispose();

	    } else if(selection == 12) {
		cm.warp(220000000);
		cm.dispose();

	    } else if(selection == 15) {
		cm.warp(230000000);
		cm.dispose();

	    } else if(selection == 16) {
		cm.warp(240000000);
		cm.dispose();

	    } else if(selection == 17) {
		cm.warp(250000000);
		cm.dispose();

	    } else if(selection == 18) {
		cm.warp(251000000);
		cm.dispose();

	    } else if(selection == 19) {
		cm.warp(260000000);
		cm.dispose();

	    } else if(selection == 20) {
		cm.warp(261000000);
		cm.dispose();

	    } else if(selection == 21) {
		cm.warp(310000000);
		cm.dispose();

	    } else if(selection == 22) {
		cm.warp(910150300);
		cm.dispose();

	    } else if(selection == 23) {
		cm.warp(241000000);
		cm.dispose();

	    } else if(selection == 24) {
		cm.warp(310070000);
		cm.dispose();
	}
}
