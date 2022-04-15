importPackage(Packages.constants);
var status = 0;
var beauty = 0;
var facenew;
var facenew_;
var colors;
var colors_;
var hairnew;
var hairnew_;
var haircolor;
var haircolor_;
var skin = Array(0, 1, 2, 3, 4, 9, 10, 11, 12, 13);
var mhair = Array(44396, 35000, 35010, 35020, 35030, 35040, 35050, 35060, 35070, 35080, 35090, 35100, 35150, 35180, 35190, 35200, 35210, 35250, 35260, 35280, 35290, 35300, 35310, 35330, 35350, 35360, 35420, 35430, 35440, 35460, 35470, 35480, 35490, 35500, 35510, 35520, 35530, 35540, 35550, 35560, 35570, 35600, 35620, 35630, 35640, 35650, 35660, 35680, 35690, 35710, 35720, 35780, 35790, 35950, 35960, 36010, 36020, 36030, 36040, 36050, 36070, 36080, 36090, 36100, 36130, 36140, 36150, 36160, 36170, 36180, 36190, 36200, 36210, 36220, 36230, 36240, 36250, 36300, 36310, 36330, 36340, 36350, 36380, 36390, 36400, 36410, 36420, 36430, 36440, 36450, 36460, 36470, 36480, 36510, 36520, 36530, 36570, 36580, 36590, 36620, 36630, 36640, 36650, 36670, 36680, 36690, 36700, 36710, 36720, 36730, 36740, 36750, 36760, 36770, 36780, 36790, 36800, 36810, 36820, 36830, 36840, 36850, 36860, 36900, 36910, 36920, 36940, 36950, 36980, 36990, 40000, 40010, 40020, 40050, 40060, 40090, 40100, 40120, 40250, 40260, 40270, 40280, 40290, 40300, 40310, 40320, 40330, 40390, 40400, 40410, 40420, 40440, 40450, 40470, 40480, 40500, 40510, 41060, 41070, 40720, 40600, 40670,36310,35660,  40600, 40640, 40660, 40670, 40690, 40720, 40730, 40740, 40820, 40930, 43020, 43140, 43150, 44140, 44150, 44160, 44170, 44360, 40780, 43290, 43300, 43310, 43320, 43350);

var fhair = Array(38000, 38010, 38020, 38030, 38040, 38050, 38060, 38070, 38090, 38100, 38110, 38120, 38130, 38270, 38280, 38290, 38300, 38310, 38390, 38400, 38410, 38420, 38430, 38440, 38460, 38470, 38490, 38520, 38540, 38550, 38560, 38570, 38580, 38590, 38600, 38610, 38620, 38630, 38640, 38650, 38660, 38670, 38680, 38690, 38700, 38730, 38740, 38750, 38760, 38800, 38810, 38820, 38840, 38880, 38910, 38940, 39090, 41080, 41090, 41100, 41110, 41120, 41150, 41160, 41200, 41220, 41340, 41350, 41370, 41380, 41390, 41400, 41470, 41480, 41490, 41510, 41520, 41560, 41570, 41590, 41600, 41750, 41950, 38490, 41700, 41860, 41890, 40610, 40780, 40810, 40940, 40950, 40960, 40970, 40980, 41600, 41670, 41700, 41720, 41730, 41740, 41750, 41850, 41860, 44010, 44120, 44130, 44200, 44290, 44320, 44330, 44460, 44461, 44462, 44463, 44464, 44465, 40780, 41900, 44470, 44480, 44490, 44500);

var mface = Array(23000, 23001, 23002, 23003, 23005, 23006, 23008, 23010, 23011, 23012, 23015, 23016, 23017, 23018, 23019, 23020, 23023, 23024, 23025, 23026, 23027, 23028, 23029, 23031, 23032, 23033, 23035, 23038, 23039, 23040, 23041, 23042, 23043, 23044, 23053, 23054, 23056, 23057, 23060, 23061, 23062, 23063, 23067, 23068, 23069, 23072, 23073, 23074, 23075, 23079, 23080, 23081, 23082, 23083, 23084, 23085, 23086, 23087, 23088, 23089, 23090, 23091, 23092, 23095, 23096, 23097, 23099, 25000, 25004, 25005, 25006, 25007, 25008, 25011, 25014, 25015, 25016, 25017, 25020, 25021, 25022, 25023, 25024, 25025, 25026, 25027, 25029, 25033, 25043, 25044, 25045, 25046, 25047, 25048, 25049, 25051, 25053, 25057, 25063, 25062);
var fface = Array(24001, 24002, 24003, 24004, 24007, 24008, 24011, 24012, 24014, 24015, 24018, 24020, 24021, 24023, 24027, 24031, 24035, 24038, 24039, 24041, 24050, 24058, 24060, 24068, 24071, 24072, 24073, 24077, 24084, 24087, 24088, 24091, 24097, 24099, 25006, 25008, 26003, 26004, 26005, 26008, 26009, 26014, 26017, 26022, 26023, 26026, 26027, 26028, 26029, 26030, 26031, 26032, 26034, 26046, 26047, 26048, 26049, 26050, 26051, 26053, 26056, 26058, 26764, 26763, 26762, 26761, 26760, 26759, 25057, 25157, 26066, 26067);

var select = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection, selection2) {
    if (status >= 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
        var change = "좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?#b";
        change += "#L1##i5150057#머리 모양#l";
        change += "#L2##i5151036#염색#l\r\n";
        change += "#L4##i5152100#컬러 렌즈#l";
        change += " #L3##i5152057#얼굴#l";
        cm.sendSpirit(change, true, 0);
    } else if (status == 1) {
        if (cm.getPlayer().getJob() == 10112) {
            if (selection == 0) {
                beauty = 1;
                cm.askAvatarZero("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", skin, skin);
            } else if (selection == 1) {
                beauty = 2;
                hairnew = Array();
                for (var i = 0; i < mhair.length; i++) {
                    hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                        hairnew[i] = mhair[i];
                }
                hairnew_ = Array();
                for (var i = 0; i < fhair.length; i++) {
                    hairnew_.push(fhair[i] + parseInt(cm.getPlayer().getSecondHair() % 10));
                        hairnew_[i] = fhair[i];
                }
                cm.askAvatarZero("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", hairnew, hairnew_);
            } else if (selection == 2) {
                beauty = 3;
                haircolor = Array();
                haircolor_ = Array();
                var current = parseInt(cm.getPlayer().getHair() / 10) * 10;
                var current_ = parseInt(cm.getPlayer().getSecondHair() / 10) * 10;
                for (var i = 0; i < 8; i++) {
                    haircolor.push(current + i);
                }
                for (var i = 0; i < 8; i++) {
                    haircolor_.push(current_ + i);
                }
                cm.askAvatarZero("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", haircolor, haircolor_);
            } else if (selection == 3) {
                beauty = 4;
                facenew = Array();
                for (var i = 0; i < mface.length; i++) {
                    facenew.push(mface[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                        facenew[i] = mface[i];
                }
                facenew_ = Array();
                for (var i = 0; i < fface.length; i++) {
                    facenew_.push(fface[i] + cm.getPlayer().getSecondFace() % 1000 - (cm.getPlayer().getSecondFace() % 100));
                        facenew_[i] = fface[i];
                }
                cm.askAvatarZero("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", facenew, facenew_);
            } else if (selection == 4) {
                beauty = 5;
				컬러 = cm.getPlayer().getFace() % 100 + (20000 + ((cm.getPlayer().getFace() % 10000) - (cm.getPlayer().getFace() % 1000)));
				렌즈 = [컬러, 컬러+100, 컬러+200, 컬러+300, 컬러+400, 컬러+500, 컬러+600, 컬러+700];
				렌즈C = [];
				컬러A = cm.getPlayer().getSecondFace() % 100 + (20000 + ((cm.getPlayer().getSecondFace() % 10000) - (cm.getPlayer().getSecondFace() % 1000)));
				렌즈A = [컬러A, 컬러A+100, 컬러A+200, 컬러A+300, 컬러A+400, 컬러A+500, 컬러A+600, 컬러A+700];
				렌즈AC = [];
			for (i = 0; i < 렌즈.length; i ++) {
				if (EHF(렌즈[i])) {
					렌즈C.push(렌즈[i]);
				}
			}
			for (i = 0; i < 렌즈A.length; i ++) {
				if (EHF(렌즈A[i])) {
					렌즈AC.push(렌즈A[i]);
				}
			}
                cm.askAvatarZero("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?" + 컬러, 렌즈, 렌즈A);
            }
        } else if (cm.getPlayer().getGender() == 0) {
            if (selection == 0) {
                beauty = 1;
                cm.askAvatar("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", skin);
            } else if (selection == 1) {
                beauty = 2;
                hairnew = Array();
                for (var i = 0; i < mhair.length; i++) {
                    hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                        hairnew[i] = mhair[i];
                }
                cm.askAvatar("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", hairnew);
            } else if (selection == 2) {
                beauty = 3;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair() / 10) * 10;
                for (var i = 0; i < 8; i++) {
                    haircolor.push(current + i);
                        haircolor[i] = current;
                }
                cm.askAvatar("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", haircolor);
            } else if (selection == 3) {
                beauty = 4;
                facenew = Array();
                for (var i = 0; i < mface.length; i++) {
                    facenew.push(mface[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                        facenew[i] = mface[i];
                }
                cm.askAvatar("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", facenew);
            } else if (selection == 4) {
                beauty = 5;
                var current = cm.getPlayer().getFace() % 100 + (20000 + ((cm.getPlayer().getFace() % 10000) - (cm.getPlayer().getFace() % 1000)));
                colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700, current + 800);
                for (var i = 0; i < colors.length; i++) {
                        colors[i] = current;
                }
                cm.askAvatar("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", colors);
            }
        } else {
            if (selection == 0) {
                beauty = 1;
                cm.askAvatar("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", skin);
            } else if (selection == 1) {
                beauty = 2;
                hairnew = Array();
                for (var i = 0; i < fhair.length; i++) {
                    hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                        hairnew[i] = fhair[i];
                }
                cm.askAvatar("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", hairnew);
            } else if (selection == 2) {
                beauty = 3;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair() / 10) * 10;
                for (var i = 0; i < 8; i++) {
                    haircolor.push(current + i);
                        haircolor[i] = current;
                }
                cm.askAvatar("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", haircolor);
            } else if (selection == 3) {
                beauty = 4;
                facenew = Array();
                for (var i = 0; i < fface.length; i++) {
                    facenew.push(fface[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                        facenew[i] = fface[i];
                }
                cm.askAvatar("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", facenew);
            } else if (selection == 4) {
                beauty = 5;
                var current = cm.getPlayer().getFace() % 100 + (20000 + ((cm.getPlayer().getFace() % 10000) - (cm.getPlayer().getFace() % 1000)));
                colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700, current + 800);
                for (var i = 0; i < colors.length; i++) {
                        colors[i] = current;
                }
                cm.askAvatar("좀더 유니크한 코디를 하고싶다면 나에게 맞겨보는건 어때?", colors);
            }
        }
    } else if (status == 2) {
        selection = selection & 0xFF;
        selection2 = selection2 & 0xFF;
        if (cm.getPlayer().getJob() == 10112) {
            if (beauty == 1)
                cm.setAvatar(4000000, skin[selection], skin[selection2]);
            else if (beauty == 2 || beauty == 6)
                cm.setAvatar(4000000, hairnew[selection], hairnew_[selection2]);
            else if (beauty == 3)
                cm.setAvatar(4000000, haircolor[selection], haircolor_[selection2]);
            else if (beauty == 4 || beauty == 7)
                cm.setAvatar(4000000, facenew[selection], facenew_[selection2]);
            else if (beauty == 5)
                cm.setAvatar(4000000, 렌즈[selection], 렌즈A[selection2]);
            //cm.reloadChar();
        } else {
            if (beauty == 1)
                cm.setAvatar(4000000, skin[selection]);
            else if (beauty == 2 || beauty == 6)
                cm.setAvatar(4000000, hairnew[selection]);
            else if (beauty == 3)
                cm.setAvatar(4000000, haircolor[selection]);
            else if (beauty == 4 || beauty == 7)
                cm.setAvatar(4000000, facenew[selection]);
            else if (beauty == 5)
                cm.setAvatar(4000000, colors[selection]);
        }
        //cm.reloadChar();

        cm.dispose();

    }
}

function EHF(i) {
	return ServerConstants.real_face_hair.contains("" + i);
}