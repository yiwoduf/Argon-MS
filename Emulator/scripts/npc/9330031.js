/*
 
  최성우
  sqlstyle...

*/

importPackage(java.lang);
importPackage(Packages.handling.world);
importPackage(Packages.packet.creators);

var status = 0;
var beauty = 0;
var facenew;
var colors;
var hairnew;
var haircolor;
var skin = Array(0, 1, 2, 3, 4, 9, 10, 11, 12, 13);
var mface = Array(20000,20001,20002,20003,20004,20005,20006,20007,20008,20009,20010,20011,20012,20013,20014,20015,20016,20017,20018,20019,20020,20021,20022,20024,20025,20027,20028,20029,20030,20031,20032,20036,20037,20040,20043,20044,20045,20046,20047,20048,20049,20050,20053,20055,20056,20057,20058,20059,20060,20061,20062,20063,20064,20065,20066,20067,20068,20069);
var mhair = Array(30000,30020,30030,30040,30050,30060,30100,30110,30120,30130,30140,30150,30160,30170,30180,30190,30200,30210,30220,30230,30240,30250,30260,30270,30280,30290,30300,30310,30320,30330,30340,30350,30360,30370,30400,30410,30420,30440,30450,30460,30470,30480,30490,30510,30520,30530,30540,30560,30570,30590,30610,30620,30630,30640,30650,30660,30670,30680,30700,30710,30730,30760,30770,30790,30800,30810,30820,30830,30840,30850,30860,30870,30880,30910,30930,30940,30950,33030,33060,33070,33080,33090,33110,33120,33130,33150,33170,33180,33190,33210,33220,33250,33260,33270,33280,33310,33330,33350,33360,33370,33380,33390,33400,33410,33430,33440,33450,33460,33480,33500,33510,33520,33530,33550,33580,33590,33600,33610,33620,33630,33640,33660,33670,33680,33690,33700,33710,33720,33730,33740,33750,33760,33770,33780,33790,33800,33810,33820,33830,33930,33940,33950,33960);
var fface = Array(21000,21001,21002,21003,21004,21005,21006,21007,21008,21009,21010,21011,21012,21013,21014,21015,21016,21017,21018,21019,21020,21021,21023,21024,21026,21027,21028,21029,21030,21031,21033,21035,21036,21038,21041,21042,21043,21044,21045,21046,21047,21048,21052,21053,21054,21055,21056,21057,21058,21059,21060,21061,21062,21063,21064);
var fhair = Array(31000,31010,31020,31030,31040,31050,31060,31070,31080,31090,31100,31110,31120,31130,31140,31150,31160,31170,31180,31190,31200,31210,31220,31230,31240,31250,31260,31270,31280,31290,31300,31310,31320,31330,31340,31350,31400,31410,31420,31440,31450,31460,31470,31480,31490,31510,31520,31530,31540,31550,31560,31590,31610,31620,31630,31640,31650,31670,31680,31690,31700,31710,31720,31740,31750,31780,31790,31800,31810,31820,31840,31850,31860,31880,31890,31910,31920,31930,31940,31950,31990,34040,34070,34080,34090,34100,34110,34120,34130,34140,34150,34160,34170,34180,34190,34210,34220,34230,34240,34250,34260,34270,34310,34320,34330,34340,34360,34370,34380,34400,34410,34420,34430,34440,34450,34470,34480,34490,34510,34540,34560,34590,34600,34610,34620,34630,34640,34660,34670,34680,34690,34700,34710,34720,34730,34740,34750,34760,34770,34780,34790,34800,34810,34820,34830,34840,34850,34860,34870);
var select = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var chat= "장비제작을 하러왔나? 그러면 재료는 충분히 모아왔겠지?\r\n\r\n";
	    chat += "#L1#앱솔랩스 무기제작";
	    //chat += "#L2#앱솔랩스 숄더제작\r\n";
	    //chat += "#L3#재료 구하는법\r\n";
	    cm.sendSimple(chat);
 } else if (selection == 1) {
            var a1= "앱솔랩스 무기 목록\r\n\r\n";
	    a1 += "#L100##i1212115##z1212115# 제작하기\r\n";
	    a1 += "#L101##i1222109##z1222109# 제작하기\r\n";
	    a1 += "#L102##i1232109##z1232109# 제작하기\r\n";
	    a1 += "#L103##i1242116##z1242116# 제작하기\r\n";
	    a1 += "#L104##i1302333##z1302333# 제작하기\r\n";
	    a1 += "#L105##i1312199##z1312199# 제작하기\r\n";
	    a1 += "#L106##i1322250##z1322250# 제작하기\r\n";
	    a1 += "#L107##i1332274##z1332274# 제작하기\r\n";
	    a1 += "#L108##i1342101##z1342101# 제작하기\r\n";
	    a1 += "#L109##i1362135##z1362135# 제작하기\r\n";
	    a1 += "#L110##i1372222##z1372222# 제작하기\r\n";
	    a1 += "#L111##i1382259##z1382259# 제작하기\r\n";
	    a1 += "#L112##i1402251##z1402251# 제작하기\r\n";
	    a1 += "#L113##i1412177##z1412177# 제작하기\r\n";
	    a1 += "#L114##i1422184##z1422184# 제작하기\r\n";
	    a1 += "#L115##i1432214##z1432214# 제작하기\r\n";
	    a1 += "#L116##i1442268##z1442268# 제작하기\r\n";
	    a1 += "#L117##i1452252##z1452252# 제작하기\r\n";
	    a1 += "#L118##i1462239##z1462239# 제작하기\r\n";
	    a1 += "#L119##i1472261##z1472261# 제작하기\r\n";
	    a1 += "#L120##i1482216##z1482216# 제작하기\r\n";
	    a1 += "#L121##i1492231##z1492231# 제작하기\r\n";
	    a1 += "#L122##i1522138##z1522138# 제작하기\r\n";
	    a1 += "#L123##i1532144##z1532144# 제작하기\r\n";
	    cm.sendSimple(a1);
 } else if (selection == 2) {
            var a2= "앱솔랩스 숄더 목록\r\n\r\n";
	    a2 += "#L124##i1152174##z1152174# 제작하기\r\n";
	    a2 += "#L125##i1152176##z1152176# 제작하기\r\n";
	    a2 += "#L126##i1152177##z1152177# 제작하기\r\n";
	    a2 += "#L127##i1152178##z1152178# 제작하기\r\n";
	    a2 += "#L128##i1152179##z1152179# 제작하기\r\n";
	    cm.sendSimple(a2);
 } else if (selection == 3) {
            var a3= "재료 드랍 목록\r\n\r\n";
	    a3 += "#i4310156##z4310156# \r\n 헤이븐 몹에서 드랍\r\n";
	    a3 += "#i4310014##z4310014# \r\n 보스스우사냥시 획득가능\r\n";
	    a3 += "#i4021022##z4021022# \r\n보스레이드or200레벨이상몬스터사냥시 획득가능\r\n";
	    a3 += "#i4310153##z4310154# \r\n보스레이드 보상으로 획득가능\r\n";
	    cm.sendSimple(a3);
 } else if (selection == 100) {
                var a1 = "#i1212115##z1212115# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1212063##z1212063# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L200#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 200) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1212063,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1212063 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1212115, 1);
            cm.sendOk("#i1212115##z1212115#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 101) {
                var a1 = "#i1222109##z1222109# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n #i4310014##z4310014# 10개\r\n#i1222058##z1222058# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L201#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 201) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1222058,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1222058 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1222109, 1);
            cm.sendOk("#i1222109##z1222109#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 102) {
                var a1 = "#i1232109##z1232109# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1232057##z1232057# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L202#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 202) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1232057,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1232057 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1232109, 1);
            cm.sendOk("#i1232109##z1232109#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 103) {
                var a1 = "#i1242116##z1242116# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1242060##z1242060# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L203#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 203) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1242060,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1242060 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1242116, 1);
            cm.sendOk("#i1242116##z1242116#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 104) {
                var a1 = "#i1302333##z1302333# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1302275##z1302275# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L204#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 204) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1302275,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1302275 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1302333, 1);
            cm.sendOk("#i1302333##z1302333#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 105) {
                var a1 = "#i1312199##z1312199# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1312153##z1312153# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L205#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 205) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1312153,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1312153 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1312199, 1);
            cm.sendOk("#i1312199##z1312199#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 106) {
                var a1 = "#i1322250##z1322250# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1322203##z1322203# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L206#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 206) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1322203,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1322203 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1322250, 1);
            cm.sendOk("#i1322250##z1322250#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 107) {
                var a1 = "#i1332274##z1332274# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1332225##z1332225# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L207#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 207) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1332225,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1332225 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1332274, 1);
            cm.sendOk("#i1332274##z1332274#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 108) {
                var a1 = "#i1342101##z1342101# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1342082##z1342082# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L208#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 208) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1342082,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1342082 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1342101, 1);
            cm.sendOk("#i1342101##z1342101#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 109) {
                var a1 = "#i1362135##z1362135# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1362090##z1362090# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L209#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 209) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1362090,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1362090 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1362135, 1);
            cm.sendOk("#i1362135##z1362135#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 110) {
                var a1 = "#i1372222##z1372222# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1372177##z1372177# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L210#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 210) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1372177,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1372177 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1372222, 1);
            cm.sendOk("#i1372222##z1372222#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 111) {
                var a1 = "#i1382259##z1382259# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1382208##z1382208# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L211#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 211) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1382208,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1382208 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1382259, 1);
            cm.sendOk("#i1382259##z1382259#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 112) {
                var a1 = "#i1402251##z1402251# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1402196##z1402196# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L212#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 212) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1402196,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1402196 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1402251, 1);
            cm.sendOk("#i1402251##z1402251#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 113) {
                var a1 = "#i1412177##z1412177# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1412135##z1412135# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L213#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 213) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1412135,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1412135 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1412177, 1);
            cm.sendOk("#i1412177##z1412177#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 114) {
                var a1 = "#i1422184##z1422184# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1422140##z1422140# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L214#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 214) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1422140,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1422140 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1422184, 1);
            cm.sendOk("#i1422184##z1422184#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 115) {
                var a1 = "#i1432214##z1432214# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1432167##z1432167# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L215#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 215) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1432167,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1432167 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1432214, 1);
            cm.sendOk("#i1432214##z1432214#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 116) {
                var a1 = "#i1442268##z1442268# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1442223##z1442223# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L216#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 216) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1442223,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1442223 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1442268, 1);
            cm.sendOk("#i1442268##z1442268#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 117) {
                var a1 = "#i1452252##z1452252# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1452205##z1452205# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L217#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 217) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1452205,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1452205 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1452252, 1);
            cm.sendOk("#i1452252##z1452252#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 118) {
                var a1 = "#i1462239##z1462239# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1462193##z1462193# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L218#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 218) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1462193,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1462193 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1462239, 1);
            cm.sendOk("#i1462239##z1462239#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 119) {
                var a1 = "#i1472261##z1472261# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1472214##z1472214# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L219#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 219) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1472214,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1472214 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1472261, 1);
            cm.sendOk("#i1472261##z1472261#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 120) {
                var a1 = "#i1482216##z1482216# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1482168##z1482168# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L220#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 220) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1482168,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1482168 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1482216, 1);
            cm.sendOk("#i1482216##z1482216#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 121) {
                var a1 = "#i1492231##z1492231# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1492179##z1492179# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L221#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 221) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1492179,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1492179 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1492231, 1);
            cm.sendOk("#i1492231##z1492231#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 122) {
                var a1 = "#i1522138##z1522138# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1522094##z1522094# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L222#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 222) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1522094,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1522094 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1522138, 1);
            cm.sendOk("#i1522138##z1522138#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 123) {
                var a1 = "#i1532144##z1532144# 재료목록\r\n\r\n#i4310156##z4310156# 100개\r\n#i4310014##z4310014# 10개\r\n#i1532098##z1532098# 1개\r\n #i5200002#3000만메소\r\n"
                a1 += "#L223#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 223) {
	if(cm.haveItem(4310156 , 50) && cm.haveItem(4310014,10) && cm.haveItem(1532098,1)) { 
            cm.gainItem(4310156 , -100);
	    cm.gainItem(4310014 , -10);
	    cm.gainItem(1532098 , -1);
	    cm.gainMeso(-30000000);
            cm.gainItem(1532144, 1);
            cm.sendOk("#i1532144##z1532144#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 124) {
                var a1 = "#i1152174##z1152174# 재료목록\r\n\r\n#i4310153##z4310153# 10개\r\n#i5200002#100만메소\r\n"
                a1 += "#L224#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 224) {
	if(cm.haveItem(4310153 , 10)) { 
            cm.gainItem(4310153 , -10);
	    cm.gainMeso(-1000000);
            cm.gainItem(1152174, 1);
            cm.sendOk("#i1152174##z1152174#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 125) {
                var a1 = "#i1152176##z1152176# 재료목록\r\n\r\n#i4310153##z4310153# 10개\r\n#i5200002#100만메소\r\n"
                a1 += "#L225#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 225) {
	if(cm.haveItem(4310153 , 10)) { 
            cm.gainItem(4310153 , -10);
	    cm.gainMeso(-1000000);
            cm.gainItem(1152176, 1);
            cm.sendOk("#i1152176##z1152176#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 126) {
                var a1 = "#i1152177##z1152177# 재료목록\r\n\r\n#i4310153##z4310153# 10개\r\n#i5200002#100만메소\r\n"
                a1 += "#L226#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 226) {
	if(cm.haveItem(4310153 , 10)) { 
            cm.gainItem(4310153 , -10);
	    cm.gainMeso(-1000000);
            cm.gainItem(1152177, 1);
            cm.sendOk("#i1152177##z1152177#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 127) {
                var a1 = "#i1152178##z1152178# 재료목록\r\n\r\n#i4310153##z4310153# 10개\r\n#i5200002#100만메소\r\n"
                a1 += "#L227#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 227) {
	if(cm.haveItem(4310153 , 10)) { 
            cm.gainItem(4310153 , -10);
	    cm.gainMeso(-1000000);
            cm.gainItem(1152178, 1);
            cm.sendOk("#i1152178##z1152178#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
 } else if (selection == 128) {
                var a1 = "#i1152178##z1152178# 재료목록\r\n\r\n#i4310153##z4310153# 10개\r\n#i5200002#100만메소\r\n"
                a1 += "#L228#제작하기"; 
                cm.sendSimple(a1);
 } else if (selection == 228) {
	if(cm.haveItem(4310153 , 10)) { 
            cm.gainItem(4310153 , -10);
	    cm.gainMeso(-1000000);
            cm.gainItem(1152179, 1);
            cm.sendOk("#i1152179##z115219#을 제작하셧습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("재료또는 메소가 부족하여 제작을 할수 없습니다.");
            cm.dispose();
        }
}
}
}