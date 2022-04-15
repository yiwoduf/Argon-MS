importPackage(Packages.constants);
var status = 0;
var beauty = 0;
var selectioned = 0;
var selectiones = 0;
var colors;
var hairnew;
var facenew;
var haircolor;
var skin = Array(0, 1, 2, 3, 4, 9, 10, 11, 12, 13);
var mhair = Array(30000, 30010, 30020, 30030, 30040, 30460, 30470, 30480, 30490, 30510, 30520, 30530, 30540, 30560, 30570, 30590, 30610, 30620, 30630, 30640, 30650, 30660, 30670, 30680, 30700, 30710, 30730, 30760, 30770, 30790, 30800, 30810, 30820, 30830, 30840, 30850, 30860, 30870, 30880, 30910, 30930, 30940, 30950, 33030, 33060, 33070, 33080, 33090, 33110, 33120, 33130, 33150, 33170, 33180, 33190, 33210, 33220, 33250, 33260, 33270, 33280, 33310, 33330, 33350, 33360, 33370, 33380, 33390, 33400, 33410, 33430, 33440, 33450, 33460, 33480, 33500, 33510, 33520, 33530, 33550, 33580, 33590, 33600, 33610, 33620, 33630, 33640, 33660, 33670, 33680, 33690, 33700, 33710, 33720, 33730, 33740, 33750, 33760, 33770, 33780, 33790, 33800, 33810, 33820, 33830, 33930, 33940, 33950, 33960, 33990, 36010, 36020, 36030, 36040, 36050, 36070, 36080, 36090, 36100, 36130, 36140, 36150, 36160, 36170, 36180, 36190, 36210, 36220, 36230, 36240, 36250, 36300, 36310, 36330, 36340, 36350, 36380, 36390, 36400, 36410, 36420, 36430, 36440, 36450, 36460, 36470, 36480, 36510, 36520, 36530, 36570, 36580, 36590, 36620, 36630, 36640, 36650, 36670, 36680, 36690, 36700, 36710, 36720, 36730, 36740, 36750, 36760, 36770, 36780, 36790, 36800, 36810, 36820, 36830, 36840, 36850, 36860, 36900, 36910, 36920, 36940, 36950, 36980, 36990,35000,35010,35020,35030,35040,35050,35060,35070,35080,35090,35100,35150,35180,35190,35200,35210,35260,35280,35290,35300,35310,35330,35350,35360,35420,35430,35440,35460,35470,35480,35490,35500,35510,35520,35530,35540,35560,35570,35630,35640,35650,35660, 35680, 35690, 35710, 35720, 35780, 35790, 35950, 35960, 36010, 36020, 36030, 36040, 36050, 36070, 36080, 36090, 36100, 36130, 36140, 36150, 36160, 36170, 36180, 36190, 36200, 36210, 36220, 36230, 36240);
var fhair = Array(31000, 31460, 31470, 31480, 31490, 31510, 31520, 31530, 31540, 31550, 31560, 31590, 31610, 31620, 31630, 31640, 31650, 31670, 31680, 31690, 31700, 31710, 31720, 31740, 31750, 31780, 31790, 31800, 31810, 31820, 31840, 31850, 31860, 31880, 31890, 31910, 31920, 31930, 31940, 31950, 31990, 34040, 34070, 34080, 34090, 34100, 34110, 34120, 34130, 34140, 34150, 34160, 34170, 34180, 34190, 34210, 34220, 34230, 34240, 34250, 34260, 34270, 34310, 34320, 34330, 34340, 34360, 34370, 34380, 34400, 34410, 34420, 34430, 34440, 34450, 34470, 34480, 34490, 34510, 34540, 34560, 34590, 34600, 34610, 34620, 34630, 34640, 34660, 34670, 34680, 34690, 34700, 34710, 34720, 34730, 34740, 34750, 34760, 34770, 34780, 34790, 34800, 34810, 34820, 34830, 34840, 34850, 34860, 34870, 34880, 34900, 34910, 34940, 34950, 34960, 34970, 37000, 37010, 37020, 37030, 37040, 37060, 37070, 37090, 37100, 37110, 37120, 37130, 37140, 37190, 37210, 37220, 37230, 37240, 37250, 37260, 37300, 37310, 37320, 37330, 37340, 37350, 37370, 37380, 37400, 37450, 37460, 37490, 37500, 37510, 37520, 37530, 37560, 37570, 37580, 37610, 37620, 37630, 37640, 37650, 37660, 37670, 37680, 37690, 37700, 37710, 37720, 37730, 37740, 37750, 37760, 37770, 37780, 37790, 37800, 37810, 37820, 37830, 37840, 37850, 37860, 37880, 37910, 37920, 37940, 37950, 37960, 37970, 37980, 37990, 38000, 38010, 38020, 38030, 38040, 38050, 38060, 38070, 38090, 38100, 38110, 38120, 38130, 38270, 38280, 38290, 38300, 38310, 38400, 38410, 38420, 38430, 38440, 38460, 38490,38520, 38560, 38570, 38580, 38590, 38600, 38620, 38630, 38640, 38650, 38660, 38670, 38690, 38740, 38750, 38760, 38800, 38810, 38840, 38860, 38880, 38910, 38940, 39090, 39100, 39110, 39120, 39130, 39150, 39160, 39170, 39180, 39190, 39200, 39210, 39220);
var mface = Array(20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20015, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20024, 20025, 20027, 20028, 20029, 20030, 20031, 20032, 20036, 20037, 20040, 20043, 20044, 20045, 20046, 20047, 20048, 20049, 20050, 20051, 20052, 20053, 20055, 20056, 20057, 20058, 20059, 20060, 20061, 20062, 20063, 20064, 20065, 20066, 20067, 20068, 20069, 20070, 20071, 20072, 20074, 20075, 20076, 20077, 20080, 20081, 20082, 20083, 20084, 20085, 20086, 20087, 20088, 20089, 20090, 20093, 20094, 20095, 20097, 20098, 20099,23000,23001,23002,23003,23005,23006,23008,23010,23011,23012,23016,23019,23020,23023,23024,23025,23026,23027,23028,23029,23031,23032,23033,23034,23035,23038,23039,23040,23041,23042,23043,23044,23053,23054,23056,23057,23060,23061,23062,23063,23067,23068,23069,23072,23073,23074,23075,23079,23080,23081,23082,23084,23085,23087,23088,23089,23090,23091,23092,23095,23096,23097,23099);
var fface = Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21015, 21016, 21017, 21018, 21019, 21020, 21021, 21023, 21024, 21026, 21027, 21028, 21029, 21030, 21031, 21033, 21035, 21036, 21038, 21041, 21042, 21043, 21044, 21045, 21046, 21047, 21048, 21049, 21050, 21052, 21053, 21054, 21055, 21056, 21057, 21058, 21059, 21060, 21061, 21062, 21063, 21064, 21065, 21066, 21067, 21069, 21070, 21071, 21072, 21073, 21074, 21075, 21077, 21078, 21079, 21080, 21081, 21082, 21083, 21084, 21085, 21086, 21089, 21090, 21091, 21092, 21093, 21094, 21095, 21096, 21097, 21098,24001,24002,24003,24004,24007,24008,24012,24015,24016,24018,24019,24020,24021,24022,24023,24024,24026,24027,24028,24029,24031,24035,24036,24037,24038,24039,24040,24041,24050,24051,24054,24055,24058,24059,24060,24062,24066,24067,24068,24071,24072,24073,24074,24075,24077,24078,24080,24082,24083,24084,24085,24086,24091,24092,24093,24094,24095,24097);
var select = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
 cm.sendSimple("안녕하세요…. 혹시 #h #님이 맞으신가요? 위대하신 분을 만나게 되어 영광이에요. 저는  코디네이터 #p9010033#이라고 해요. 특별히 #h #님을 위해 무료로 외형을 바꿔드릴게요…! 물론 꼭 지금 바꾸셔야 된다는게 아니라 나중에 천천히 바꾸셔도 되요. #e#r단, 눈색깔을 바꾸실 때 반드시 기본눈으로 바꾸신 후에 색깔을 바꿔주세요….#b#n\r\n\r\n#L1##i5150057# 머리 모양#l　#L3##i5152057# 얼굴#l#e#n#L0##i5153015# #b피부 색깔\r\n#l#L2##i5151036# 염색     #l#L4##i5152100# 컬러렌즈\r\n\r\n #l#L5# 성 전환하기\r\n");
    } else if (status == 1) {
	if (cm.getPlayer().getGender() == 0) {
	    if (selection == 0) {
		beauty = 1;
	        if (GameConstants.isZero(cm.getPlayer().getJob())) {
		cm.askAvatar("원하는 피부를 선택해주세요.", skin);
                } else {
                cm.askAvatar("원하는 피부를 선택해주세요.", skin);
                }
	    } else if (selection == 1) {
		beauty = 2;
		hairnew = Array();
		for (var i = 0; i < mhair.length; i++) {
		    if (mhair[i] == 30100 || mhair[i] == 30010) {
			hairnew.push(mhair[i]);
		    } else {
			hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair() % 10));
		    }
		}
	        if (GameConstants.isZero(cm.getPlayer().getJob())) {
		cm.askAvatar("원하는 피부를 선택해주세요.", hairnew);
                } else {
                cm.askAvatar("원하는 피부를 선택해주세요.", hairnew);
                }
	    } else if (selection == 2) {
		beauty = 3;
		haircolor = Array();
		var current = parseInt(cm.getPlayer().getHair() / 10) * 10;
		if (current == 30100) {
		    haircolor = Array(current, current + 1, current + 2, current + 3, current + 4, current + 5, current + 6, current + 7);
		} else if (current == 30010) {
		    haircolor = Array(current);
		} else {
		    for (var i = 0; i < 8; i++) {
			haircolor.push(current + i);
		    }
		}
	        if (GameConstants.isZero(cm.getPlayer().getJob())) {
		cm.askAvatar("원하는 피부를 선택해주세요.", haircolor);
                } else {
                cm.askAvatar("원하는 피부를 선택해주세요.", haircolor);
                }
	    } else if (selection == 3) {
		beauty = 4;
		facenew = Array();
		for (var i = 0; i < mface.length; i++) {
		    if (mface[i] == 20021 || mface[i] == 20022) {
			facenew.push(mface[i]);
		    } else {
			facenew.push(mface[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
		    }
		}
	        if (GameConstants.isZero(cm.getPlayer().getJob())) {
		cm.askAvatar("원하는 피부를 선택해주세요.", facenew);
                } else {
                cm.askAvatar("원하는 피부를 선택해주세요.", facenew);
                }
	    } else if (selection == 4) {
		beauty = 5;
		var current = cm.getPlayer().getFace() % 100 + 20000;
		colors = Array();
		if (current == 20021 || current == 20022) {
		    colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 600, current + 700);
		} else if (current == 20041 || current == 20042) {
		    colors = Array(current, current + 100, current + 200, current + 300);
		} else {
		    colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700);
		}
	        if (GameConstants.isZero(cm.getPlayer().getJob())) {
		cm.askAvatar("원하는 피부를 선택해주세요.", colors);
                } else {
                cm.askAvatar("원하는 피부를 선택해주세요.", colors);
                }
	    }
	} else {
	    if (selection == 0) {
		beauty = 1;
	        if (GameConstants.isZero(cm.getPlayer().getJob())) {
		cm.askAvatar("원하는 피부를 선택해주세요.", skin);
                } else {
                cm.askAvatar("원하는 피부를 선택해주세요.", skin);
                }
	    } else if (selection == 1) {
		beauty = 2;
		hairnew = Array();
		for (var i = 0; i < fhair.length; i++) {
		    hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
		}
	        if (GameConstants.isZero(cm.getPlayer().getJob())) {
		cm.askAvatar("원하는 머리를 선택해주세요.", hairnew);
                } else {
                cm.askAvatar("원하는 머리를 선택해주세요.", hairnew);
                }
	    } else if (selection == 2) {
		beauty = 3;
		haircolor = Array();
		var current = parseInt(cm.getPlayer().getHair() / 10) * 10;
		for (var i = 0; i < 8; i++) {
		    haircolor.push(current + i);
		}
	        if (GameConstants.isZero(cm.getPlayer().getJob())) {
		cm.askAvatar("원하는 피부를 선택해주세요.", haircolor);
                } else {
                cm.askAvatar("원하는 피부를 선택해주세요.", haircolor);
                }
	    } else if (selection == 3) {
		beauty = 4;
		facenew = Array();
		for (var i = 0; i < fface.length; i++) {
		    facenew.push(fface[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
		}
	        if (GameConstants.isZero(cm.getPlayer().getJob())) {
		cm.askAvatar("원하는 피부를 선택해주세요.", facenew);
                } else {
                cm.askAvatar("원하는 피부를 선택해주세요.", facenew);
                }
	    } else if (selection == 4) {
		beauty = 5;
		var current = cm.getPlayer().getFace() % 100 + 21000;
		colors = Array();
 		if (current == 21139 || current == 21140) {
		    colors = Array(current, current + 100, current + 200);
		} else {
		colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700);
		} 
                if (GameConstants.isZero(cm.getPlayer().getJob())) {
		cm.askAvatar("원하는 피부를 선택해주세요.", colors);
                } else {
                cm.askAvatar("원하는 피부를 선택해주세요.", colors);
                }
	    }
	}
        if (selection == 5) {
        if(cm.getPlayer().getJob() == 10112) {
        cm.sendOk("제로는 성전환이 불가능합니다");
        return;
        }
            select = selection;
            cm.sendYesNo("성전환을 정말 하시겠습니까?");
            
        }
    } else if (status == 2) {
        selection = selection & 0xFF;
        if (beauty == 1)  {
	   cm.setAvatar(4000000, skin[selection]);
        } else if (beauty == 2 || beauty == 6) {
	    cm.setAvatar(4000000, hairnew[selection]);
        } else if (beauty == 3) {
	    cm.setAvatar(4000000, haircolor[selection]); 
        } else if (beauty == 4 || beauty == 7) {
	    cm.setAvatar(4000000, facenew[selection]);
        } else if (beauty == 5) {
	    cm.setAvatar(4000000, colors[selection]);
        }
         if (select == 5) {
            if (cm.getPlayer().getGender() == 0) {
                cm.getPlayer().setHair(31002);
                cm.getPlayer().setFace(21700);
                cm.getPlayer().setGender(1);
            } else if (cm.getPlayer().getGender() == 1) {
                cm.getPlayer().setHair(30000);
                cm.getPlayer().setFace(20100);
                cm.getPlayer().setGender(0);
            }
            cm.fakeRelog();
            cm.updateChar();
        }
        cm.dispose();
}	   
}